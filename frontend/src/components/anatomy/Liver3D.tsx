import React, { useRef, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { ExplorationMode, CuttingPlaneConfig } from '../../types/anatomy';
import { AnatomicalLeaderLabel } from './AnatomicalLeaderLabel';

interface Liver3DProps {
  mode: ExplorationMode;
  selectedStructureId?: string;
  onSelectStructure?: (id: string) => void;
  hoveredStructureId?: string;
  onHoverStructure?: (id: string | null) => void;
  cuttingConfig: CuttingPlaneConfig;
  explodeFactor: number;
  showLabels?: boolean;
  isolateMode?: boolean;
  xrayOpacity?: number;
}

interface LiverMeshPart {
  id: string;
  name: string;
  latinName: string;
  explodeDir: [number, number, number];
  labelPos: [number, number, number];
}

const LIVER_PARTS: Record<string, LiverMeshPart> = {
  'liver': {
    id: 'right_lobe',
    name: 'Hepatic Lobes (Parenchyma)',
    latinName: 'Lobi hepatis dexter et sinister',
    explodeDir: [0, 0.1, -0.2],
    labelPos: [0, 0.4, 0]
  },
  'gallbladder': {
    id: 'gallbladder',
    name: 'Gallbladder',
    latinName: 'Vesica biliaris (fellea)',
    explodeDir: [0.35, -0.7, 0.5],
    labelPos: [0.35, -0.55, 0.4]
  },
  'inferior vena cava': {
    id: 'inferior_vena_cava',
    name: 'Inferior Vena Cava (IVC)',
    latinName: 'Vena cava inferior',
    explodeDir: [0.0, 0.8, -0.4],
    labelPos: [0.0, 0.75, -0.3]
  },
  'hepatic artery': {
    id: 'hepatic_artery',
    name: 'Proper Hepatic Artery',
    latinName: 'Arteria hepatica propria',
    explodeDir: [-0.4, -0.6, 0.45],
    labelPos: [-0.35, -0.45, 0.4]
  },
  'portal vein': {
    id: 'portal_triad',
    name: 'Hepatic Portal Vein',
    latinName: 'Vena portae hepatis',
    explodeDir: [0.25, -0.6, 0.45],
    labelPos: [0.2, -0.45, 0.4]
  }
};

export const Liver3D: React.FC<Liver3DProps> = ({
  mode,
  selectedStructureId,
  onSelectStructure,
  hoveredStructureId,
  onHoverStructure,
  cuttingConfig,
  explodeFactor,
  showLabels = true,
  isolateMode = false,
  xrayOpacity = 1.0
}) => {
  // Load real textured 3D Liver Model with Gallbladder and Major Vasculature
  const gltf = useGLTF('/models/textured_liver.glb');
  const rootRef = useRef<THREE.Group>(null);

  const clippingPlanes = useMemo(() => {
    if (mode !== 'cut' || !cuttingConfig.active) return [];
    const normal = new THREE.Vector3(
      cuttingConfig.axis === 'x' ? 1 : 0,
      cuttingConfig.axis === 'y' ? 1 : 0,
      cuttingConfig.axis === 'z' ? 1 : 0
    );
    if (cuttingConfig.invert) normal.negate();
    return [new THREE.Plane(normal, cuttingConfig.position)];
  }, [mode, cuttingConfig]);

  // Extract individual anatomical structures with real PBR materials
  const parsedParts = useMemo(() => {
    const parts: {
      name: string;
      meta: LiverMeshPart;
      mesh: THREE.Mesh;
    }[] = [];

    gltf.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const lower = mesh.name.toLowerCase();

        let meta = LIVER_PARTS['liver'];
        if (lower.includes('gall')) {
          meta = LIVER_PARTS['gallbladder'];
        } else if (lower.includes('vena') || lower.includes('cava')) {
          meta = LIVER_PARTS['inferior vena cava'];
        } else if (lower.includes('artery')) {
          meta = LIVER_PARTS['hepatic artery'];
        } else if (lower.includes('portal')) {
          meta = LIVER_PARTS['portal vein'];
        }

        parts.push({
          name: mesh.name,
          meta,
          mesh: mesh.clone(true)
        });
      }
    });

    return parts;
  }, [gltf]);

  const MODEL_SCALE = 1.35;
  const CENTER_OFFSET: [number, number, number] = [0.0, -0.2, 0.0];

  return (
    <group
      ref={rootRef}
      position={CENTER_OFFSET}
      rotation={[0.1, Math.PI * 0.85, 0]}
      scale={[MODEL_SCALE, MODEL_SCALE, MODEL_SCALE]}
    >
      {parsedParts.map((item, idx) => {
        const isSelected = selectedStructureId === item.meta.id;
        const isHovered = hoveredStructureId === item.meta.id;

        const exX = item.meta.explodeDir[0] * explodeFactor * 0.9;
        const exY = item.meta.explodeDir[1] * explodeFactor * 0.9;
        const exZ = item.meta.explodeDir[2] * explodeFactor * 0.9;

        // Apply cloned material with clipping plane and luminous highlight
        const mat = (Array.isArray(item.mesh.material) ? item.mesh.material[0] : item.mesh.material) as THREE.MeshStandardMaterial;
        const customizedMat = mat.clone();
        customizedMat.clippingPlanes = clippingPlanes;
        customizedMat.clipShadows = true;
        customizedMat.side = THREE.DoubleSide;

        const isIsolatedOut = isolateMode && Boolean(selectedStructureId) && !isSelected;
        const finalOpacity = isIsolatedOut ? 0.08 : (isSelected ? 1.0 : xrayOpacity);

        if (isIsolatedOut || xrayOpacity < 1.0) {
          customizedMat.transparent = true;
          customizedMat.opacity = finalOpacity;
          customizedMat.depthWrite = finalOpacity > 0.6;
        }

        if (isSelected) {
          customizedMat.emissive = new THREE.Color('#06b6d4');
          customizedMat.emissiveIntensity = 0.4;
        } else if (isHovered) {
          customizedMat.emissive = new THREE.Color('#38bdf8');
          customizedMat.emissiveIntensity = 0.25;
        } else {
          customizedMat.emissive = new THREE.Color('#000000');
          customizedMat.emissiveIntensity = 0;
        }

        return (
          <group
            key={idx}
            position={[exX, exY, exZ]}
            onClick={(e) => {
              e.stopPropagation();
              onSelectStructure?.(item.meta.id);
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              onHoverStructure?.(item.meta.id);
            }}
            onPointerOut={() => onHoverStructure?.(null)}
          >
            <mesh
              geometry={item.mesh.geometry}
              material={customizedMat}
              castShadow
              receiveShadow
            />

            {/* 3D Medical Label with Leader Line */}
            {showLabels && (explodeFactor > 0.3 || isSelected || isHovered) && (
              <AnatomicalLeaderLabel
                name={item.meta.name}
                isSelected={isSelected}
                isHovered={isHovered}
                position={item.meta.labelPos}
                direction={item.meta.labelPos[0] >= 0 ? 'right' : 'left'}
                distanceFactor={6}
                onClick={() => onSelectStructure?.(item.meta.id)}
              />
            )}
          </group>
        );
      })}
    </group>
  );
};

useGLTF.preload('/models/textured_liver.glb');

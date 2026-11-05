import React, { useRef, useMemo } from 'react';
import { useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';
import { ExplorationMode, CuttingPlaneConfig } from '../../types/anatomy';

interface Brain3DProps {
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

const BRAIN_REGIONS = [
  {
    id: 'frontal_lobe',
    name: 'Frontal Lobe',
    latinName: 'Lobus frontalis',
    labelPos: [0, 0.45, 0.8] as [number, number, number]
  },
  {
    id: 'parietal_lobe',
    name: 'Parietal Lobe',
    latinName: 'Lobus parietalis',
    labelPos: [0, 0.8, -0.15] as [number, number, number]
  },
  {
    id: 'occipital_lobe',
    name: 'Occipital Lobe',
    latinName: 'Lobus occipitalis',
    labelPos: [0, 0.2, -0.85] as [number, number, number]
  },
  {
    id: 'temporal_lobe',
    name: 'Temporal Lobes',
    latinName: 'Lobi temporales',
    labelPos: [-0.85, -0.1, 0.1] as [number, number, number]
  },
  {
    id: 'cerebellum',
    name: 'Cerebellum',
    latinName: 'Cerebellum',
    labelPos: [0, -0.55, -0.65] as [number, number, number]
  },
  {
    id: 'brainstem',
    name: 'Brainstem (Pons & Medulla)',
    latinName: 'Truncus encephali',
    labelPos: [0, -0.9, 0.0] as [number, number, number]
  }
];

export const Brain3D: React.FC<Brain3DProps> = ({
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
  // Load real Allen Institute Human Brain 3D Model (283 cortical & subcortical regions)
  const gltf = useGLTF('/models/brain.glb');
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

  // Center offset for Allen Brain: [0.0, 0.83, -0.001]
  const centerOffset = useMemo(() => new THREE.Vector3(0, -0.83, 0), []);
  const MODEL_SCALE = 14.0;

  // Extract meshes and map them to cortical regions with medical tissue palette
  const brainMeshes = useMemo(() => {
    const list: {
      name: string;
      id: string;
      geometry: THREE.BufferGeometry;
      baseColor: string;
      highlightColor: string;
      dir: [number, number, number];
    }[] = [];

    gltf.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const name = mesh.name.toLowerCase();

        let id = 'cerebrum';
        // Medical atlas tissue tones: subtle anatomical differentiation
        let baseColor = '#e2d5cb';
        let highlightColor = '#38bdf8';
        let dir: [number, number, number] = [0, 0, 0];

        if (name.includes('frontal')) {
          id = 'frontal_lobe';
          baseColor = '#cbd5e1'; // Anterior prefrontal grey-matter
          highlightColor = '#38bdf8';
          dir = [0, 0.3, 0.9];
        } else if (name.includes('temporal')) {
          id = 'temporal_lobe';
          baseColor = '#d8b4e2'; // Lateral neocortex
          highlightColor = '#c084fc';
          dir = [name.includes('_l') ? -0.8 : 0.8, -0.2, 0.1];
        } else if (name.includes('parietal')) {
          id = 'parietal_lobe';
          baseColor = '#fed7aa'; // Somatosensory cortex
          highlightColor = '#fb923c';
          dir = [0, 0.8, -0.3];
        } else if (name.includes('occipital')) {
          id = 'occipital_lobe';
          baseColor = '#fbcfe8'; // Visual cortex
          highlightColor = '#f472b6';
          dir = [0, 0.1, -0.9];
        } else if (name.includes('cerebell')) {
          id = 'cerebellum';
          baseColor = '#fca5a5'; // Foliated cerebellar cortex
          highlightColor = '#ef4444';
          dir = [0, -0.8, -0.6];
        } else if (name.includes('stem') || name.includes('pons') || name.includes('medulla')) {
          id = 'brainstem';
          baseColor = '#fef08a'; // White-matter ascending/descending tracts
          highlightColor = '#eab308';
          dir = [0, -1.0, 0];
        } else if (name.includes('ventricle') || name.includes('caudate')) {
          id = 'ventricular_system';
          baseColor = '#bae6fd';
          highlightColor = '#0284c7';
          dir = [0, 0, 0];
        }

        list.push({
          name: mesh.name,
          id,
          geometry: mesh.geometry.clone(),
          baseColor,
          highlightColor,
          dir
        });
      }
    });
    return list;
  }, [gltf]);

  return (
    <group ref={rootRef}>
      <group scale={[MODEL_SCALE, MODEL_SCALE, MODEL_SCALE]} position={[0, 0, 0]}>
        {brainMeshes.map((mesh, idx) => {
          const isSelected = selectedStructureId === mesh.id;
          const isHovered = hoveredStructureId === mesh.id;

          const exX = mesh.dir[0] * explodeFactor * 0.08;
          const exY = mesh.dir[1] * explodeFactor * 0.08;
          const exZ = mesh.dir[2] * explodeFactor * 0.08;

          const color = isSelected
            ? '#06b6d4'
            : isHovered
            ? mesh.highlightColor
            : mesh.baseColor;

          const isIsolatedOut = isolateMode && Boolean(selectedStructureId) && !isSelected;
          const finalOpacity = isIsolatedOut ? 0.08 : (isSelected ? 1.0 : xrayOpacity);

          const emissive = isSelected ? '#0891b2' : isHovered ? '#0284c7' : '#000000';
          const emissiveIntensity = isSelected ? 0.45 : isHovered ? 0.25 : 0;

          return (
            <group
              key={idx}
              position={[centerOffset.x + exX, centerOffset.y + exY, centerOffset.z + exZ]}
              onClick={(e) => {
                e.stopPropagation();
                onSelectStructure?.(mesh.id);
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                onHoverStructure?.(mesh.id);
              }}
              onPointerOut={() => onHoverStructure?.(null)}
            >
              <mesh geometry={mesh.geometry} castShadow receiveShadow>
                <meshStandardMaterial
                  color={color}
                  roughness={0.55}
                  metalness={0.08}
                  clippingPlanes={clippingPlanes}
                  clipShadows
                  side={THREE.DoubleSide}
                  emissive={emissive}
                  emissiveIntensity={emissiveIntensity}
                  transparent={isIsolatedOut || xrayOpacity < 1.0}
                  opacity={finalOpacity}
                  depthWrite={finalOpacity > 0.6}
                />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* 3D Anatomical Labels in Exploded Mode */}
      {showLabels && (explodeFactor > 0.35 || selectedStructureId) && (
        <group>
          {BRAIN_REGIONS.map((region) => {
            const isSelected = selectedStructureId === region.id;
            const isHovered = hoveredStructureId === region.id;

            return (
              <Html
                key={region.id}
                position={region.labelPos}
                center
                distanceFactor={7}
                style={{ pointerEvents: 'none' }}
              >
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectStructure?.(region.id);
                  }}
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap backdrop-blur-md transition-all border pointer-events-auto cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500 text-black font-bold border-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.5)] scale-110'
                      : isHovered
                      ? 'bg-[#1e222d] text-amber-300 border-amber-500/50 scale-105'
                      : 'bg-[#0d0f14]/90 text-[#d1d5db] border-[#20242e] shadow-md hover:border-amber-500/40'
                  }`}
                >
                  {region.name}
                </div>
              </Html>
            );
          })}
        </group>
      )}
    </group>
  );
};

useGLTF.preload('/models/brain.glb');

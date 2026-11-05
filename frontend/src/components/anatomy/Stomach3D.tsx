import React, { useRef, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { ExplorationMode, CuttingPlaneConfig } from '../../types/anatomy';
import { AnatomicalLeaderLabel } from './AnatomicalLeaderLabel';

interface Stomach3DProps {
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

const STOMACH_REGIONS = [
  {
    id: 'cardia_fundus',
    name: 'Cardia & Gastric Fundus',
    latinName: 'Cardia et Fundus gastricus',
    description: 'Superior dome-shaped reservoir capturing swallowed air and initial food bolus',
    dir: [0.3, 0.9, 0.2] as [number, number, number],
    labelPos: [0.3, 0.8, 0.2] as [number, number, number]
  },
  {
    id: 'gastric_body',
    name: 'Gastric Corpus (Body)',
    latinName: 'Corpus gastricum',
    description: 'Central enzymatic reservoir where parietal and chief cells secrete gastric acid and pepsinogen',
    dir: [-0.4, 0.0, 0.8] as [number, number, number],
    labelPos: [-0.3, 0.0, 0.5] as [number, number, number]
  },
  {
    id: 'pylorus_antrum',
    name: 'Pyloric Antrum & Canal',
    latinName: 'Antrum pyloricum et Canalis pyloricus',
    description: 'Muscular outflow tract regulating gastric emptying into duodenum via pyloric sphincter',
    dir: [-0.9, -0.7, -0.4] as [number, number, number],
    labelPos: [-0.7, -0.6, -0.2] as [number, number, number]
  },
  {
    id: 'gastric_rugae',
    name: 'Gastric Rugae (Mucosal Folds)',
    latinName: 'Plicae gastricae',
    description: 'Internal mucosal and submucosal rugal folds permitting dramatic luminal expansion',
    dir: [0.0, 0.0, 0.0] as [number, number, number],
    labelPos: [0.0, 0.1, 0.0] as [number, number, number]
  }
];

export const Stomach3D: React.FC<Stomach3DProps> = ({
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
  // Load real photorealistic 3D stomach model with PBR textures
  const gltf = useGLTF('/models/stomach.glb');
  const rootRef = useRef<THREE.Group>(null);

  // Clipping plane for Cut View (Mode 2)
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

  // Clone scene and apply clipping planes, X-Ray transparency, and medical lighting response
  const clonedScene = useMemo(() => {
    const scene = gltf.scene.clone(true);

    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if (mesh.material) {
          const origMat = (Array.isArray(mesh.material) ? mesh.material[0] : mesh.material) as THREE.MeshStandardMaterial;
          const mat = origMat.clone();
          mat.clippingPlanes = clippingPlanes;
          mat.clipShadows = true;
          mat.side = THREE.DoubleSide;
          mat.roughness = Math.min(mat.roughness ?? 0.45, 0.55);
          mat.metalness = 0.05;

          if (xrayOpacity < 1.0) {
            mat.transparent = true;
            mat.opacity = xrayOpacity;
            mat.depthWrite = xrayOpacity > 0.6;
          }

          // If a structure is highlighted, apply glowing rim accent without destroying textures
          if (selectedStructureId) {
            mat.emissive = new THREE.Color('#06b6d4');
            mat.emissiveIntensity = 0.35;
          } else if (hoveredStructureId) {
            mat.emissive = new THREE.Color('#38bdf8');
            mat.emissiveIntensity = 0.2;
          } else {
            mat.emissive = new THREE.Color('#000000');
            mat.emissiveIntensity = 0;
          }

          mesh.material = mat;
        }
      }
    });

    return scene;
  }, [gltf, clippingPlanes, selectedStructureId, hoveredStructureId, xrayOpacity]);

  // Center & Scale calculation focused directly on the stomach & gastric chamber
  const SCALE = 3.6;
  const OFFSET: [number, number, number] = [-0.08, -0.65, 0.0];

  return (
    <group ref={rootRef}>
      <group
        scale={[SCALE, SCALE, SCALE]}
        position={OFFSET}
        onClick={(e) => {
          e.stopPropagation();
          onSelectStructure?.('gastric_body');
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHoverStructure?.('gastric_body');
        }}
        onPointerOut={() => onHoverStructure?.(null)}
      >
        <primitive object={clonedScene} />
      </group>

      {/* Exploded / Highlighted Anatomical Labels */}
      {showLabels && (explodeFactor > 0.3 || selectedStructureId) && (
        <group>
          {STOMACH_REGIONS.map((region) => {
            const isSelected = selectedStructureId === region.id;
            const isHovered = hoveredStructureId === region.id;

            const posX = region.labelPos[0] + region.dir[0] * explodeFactor * 0.7;
            const posY = region.labelPos[1] + region.dir[1] * explodeFactor * 0.7;
            const posZ = region.labelPos[2] + region.dir[2] * explodeFactor * 0.7;

            return (
              <AnatomicalLeaderLabel
                key={region.id}
                name={region.name}
                isSelected={isSelected}
                isHovered={isHovered}
                position={[posX, posY, posZ]}
                direction={posX >= 0 ? 'right' : 'left'}
                distanceFactor={7}
                onClick={() => onSelectStructure?.(region.id)}
              />
            );
          })}
        </group>
      )}
    </group>
  );
};

useGLTF.preload('/models/stomach.glb');

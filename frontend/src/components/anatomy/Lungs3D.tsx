import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { ExplorationMode, CuttingPlaneConfig } from '../../types/anatomy';
import { AnatomicalLeaderLabel } from './AnatomicalLeaderLabel';

interface Lungs3DProps {
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

const LUNG_PARTS = [
  {
    id: 'trachea',
    name: 'Trachea & Bronchial Tree',
    latinName: 'Trachea et Arbor bronchialis',
    labelPos: [0, 0.85, 0] as [number, number, number],
    explodeDir: [0, 0.8, 0] as [number, number, number]
  },
  {
    id: 'right_lung',
    name: 'Right Lung (3 Lobes)',
    latinName: 'Pulmo dexter',
    labelPos: [0.65, 0, 0] as [number, number, number],
    explodeDir: [0.85, 0, 0.1] as [number, number, number]
  },
  {
    id: 'left_lung',
    name: 'Left Lung (2 Lobes & Cardiac Notch)',
    latinName: 'Pulmo sinister',
    labelPos: [-0.65, 0, 0] as [number, number, number],
    explodeDir: [-0.85, 0, 0.1] as [number, number, number]
  },
  {
    id: 'alveoli',
    name: 'Alveolar Units (Gas Exchange)',
    latinName: 'Alveoli pulmonis',
    labelPos: [0.35, -0.4, 0.2] as [number, number, number],
    explodeDir: [0.4, -0.4, 0.4] as [number, number, number]
  }
];

export const Lungs3D: React.FC<Lungs3DProps> = ({
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
  // Load real photorealistic textured 3D Respiratory Model
  const gltf = useGLTF('/models/textured_lung.glb');
  const rootRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

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

  // Dynamic rhythmic breathing cycle
  useFrame((_, delta) => {
    timeRef.current += delta;
    const breath = Math.sin(timeRef.current * 1.5);
    const scaleY = 1.0 + breath * 0.035;
    const scaleXZ = 1.0 + breath * 0.025;

    if (rootRef.current && explodeFactor < 0.2) {
      rootRef.current.scale.set(scaleXZ, scaleY, scaleXZ);
    }
  });

  // Extract trachea/airway vs lung parenchyma
  const parsedMeshes = useMemo(() => {
    const list: {
      name: string;
      mesh: THREE.Mesh;
      isAirway: boolean;
      id: string;
    }[] = [];

    gltf.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const lower = mesh.name.toLowerCase();
        const isAirway = lower.includes('part01');

        list.push({
          name: mesh.name,
          mesh: mesh.clone(true),
          isAirway,
          id: isAirway ? 'trachea' : 'lungs'
        });
      }
    });

    return list;
  }, [gltf]);

  // Center offset for textured_lung: center is [0.21, 9.37, -3.83], max_dim 25.16
  const SCALE = 0.105;
  const CENTER_OFFSET: [number, number, number] = [-0.02, -0.98, 0.4];

  return (
    <group ref={rootRef}>
      <group position={CENTER_OFFSET} scale={[SCALE, SCALE, SCALE]}>
        {parsedMeshes.map((item, idx) => {
          const isSelected = selectedStructureId === item.id || (selectedStructureId === 'right_lung' && !item.isAirway) || (selectedStructureId === 'left_lung' && !item.isAirway);
          const isHovered = hoveredStructureId === item.id;

          const exY = item.isAirway ? (explodeFactor * 6.0) : 0;
          const exX = !item.isAirway ? (explodeFactor * 4.0) : 0;

          const origMat = (Array.isArray(item.mesh.material) ? item.mesh.material[0] : item.mesh.material) as THREE.MeshStandardMaterial;
          const mat = origMat.clone();
          mat.clippingPlanes = clippingPlanes;
          mat.clipShadows = true;
          mat.side = THREE.DoubleSide;

          const isIsolatedOut = isolateMode && Boolean(selectedStructureId) && !isSelected;
          const finalOpacity = isIsolatedOut ? 0.08 : (isSelected ? 1.0 : xrayOpacity);

          if (isIsolatedOut || xrayOpacity < 1.0) {
            mat.transparent = true;
            mat.opacity = finalOpacity;
            mat.depthWrite = finalOpacity > 0.6;
          }

          if (isSelected) {
            mat.emissive = new THREE.Color('#06b6d4');
            mat.emissiveIntensity = 0.38;
          } else if (isHovered) {
            mat.emissive = new THREE.Color('#38bdf8');
            mat.emissiveIntensity = 0.22;
          } else {
            mat.emissive = new THREE.Color('#000000');
            mat.emissiveIntensity = 0;
          }

          return (
            <group
              key={idx}
              position={[exX, exY, 0]}
              onClick={(e) => {
                e.stopPropagation();
                onSelectStructure?.(item.id);
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                onHoverStructure?.(item.id);
              }}
              onPointerOut={() => onHoverStructure?.(null)}
            >
              <mesh
                geometry={item.mesh.geometry}
                material={mat}
                castShadow
                receiveShadow
              />
            </group>
          );
        })}
      </group>

      {/* 3D Anatomical Labels */}
      {showLabels && (explodeFactor > 0.3 || selectedStructureId) && (
        <group>
          {LUNG_PARTS.map((part) => {
            const isSelected = selectedStructureId === part.id;
            const isHovered = hoveredStructureId === part.id;

            const posX = part.labelPos[0] + part.explodeDir[0] * explodeFactor * 0.6;
            const posY = part.labelPos[1] + part.explodeDir[1] * explodeFactor * 0.6;
            const posZ = part.labelPos[2] + part.explodeDir[2] * explodeFactor * 0.6;

            return (
              <AnatomicalLeaderLabel
                key={part.id}
                name={part.name}
                isSelected={isSelected}
                isHovered={isHovered}
                position={[posX, posY, posZ]}
                direction={posX >= 0 ? 'right' : 'left'}
                distanceFactor={7}
                onClick={() => onSelectStructure?.(part.id)}
              />
            );
          })}
        </group>
      )}
    </group>
  );
};

useGLTF.preload('/models/textured_lung.glb');

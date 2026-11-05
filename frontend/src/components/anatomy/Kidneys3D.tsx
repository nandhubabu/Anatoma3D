import React, { useRef, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { ExplorationMode, CuttingPlaneConfig } from '../../types/anatomy';
import { AnatomicalLeaderLabel } from './AnatomicalLeaderLabel';

interface Kidneys3DProps {
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

interface KidneyPartConfig {
  id: string;
  name: string;
  latinName: string;
  color: string;
  roughness: number;
  metalness: number;
  transparent?: boolean;
  opacity?: number;
  explodeDir: [number, number, number];
  labelPos: [number, number, number];
}

export const Kidneys3D: React.FC<Kidneys3DProps> = ({
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
  // Load real Visible Human Left Kidney and Vasculature Models
  const kidneyGltf = useGLTF('/models/kidney_l.glb');
  const vascGltf = useGLTF('/models/vasculature.glb');
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

  // Center offset for Visible Human kidney: [-0.072, -0.303, 0.027]
  const centerOffset = useMemo(() => new THREE.Vector3(-0.072, -0.303, 0.027), []);
  const MODEL_SCALE = 22.0;

  // Categorize meshes into anatomically accurate zones
  const kidneyMeshes = useMemo(() => {
    const list: {
      name: string;
      geometry: THREE.BufferGeometry;
      config: KidneyPartConfig;
    }[] = [];

    kidneyGltf.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const name = mesh.name.toLowerCase();

        let config: KidneyPartConfig;

        if (name.includes('capsule')) {
          config = {
            id: 'renal_capsule',
            name: 'Fibrous Renal Capsule',
            latinName: 'Capsula fibrosa renis',
            color: '#cbd5e1',
            roughness: 0.25,
            metalness: 0.1,
            transparent: true,
            opacity: mode === 'cut' ? 0.95 : 0.28,
            explodeDir: [0.8, 0.3, 0.5],
            labelPos: [0.08, 0.05, 0.03]
          };
        } else if (name.includes('pyramid')) {
          config = {
            id: 'renal_medulla_pyramids',
            name: 'Renal Pyramids (Medulla)',
            latinName: 'Pyramides renales',
            color: '#580510',
            roughness: 0.55,
            metalness: 0.05,
            explodeDir: [-0.2, 0.0, -0.7],
            labelPos: [-0.02, 0.0, -0.02]
          };
        } else if (name.includes('column')) {
          config = {
            id: 'renal_columns',
            name: 'Renal Columns (Bertin)',
            latinName: 'Columnae renales',
            color: '#991b1b',
            roughness: 0.5,
            metalness: 0.08,
            explodeDir: [0.0, 0.0, -0.4],
            labelPos: [0.01, 0.02, 0.0]
          };
        } else if (name.includes('papilla')) {
          config = {
            id: 'renal_papillae',
            name: 'Renal Papillae & Minor Calyces',
            latinName: 'Papillae renales',
            color: '#fca5a5',
            roughness: 0.35,
            metalness: 0.1,
            explodeDir: [-0.4, 0.0, -0.2],
            labelPos: [-0.04, 0.0, 0.0]
          };
        } else if (name.includes('hilum') || name.includes('pelvis')) {
          config = {
            id: 'renal_pelvis',
            name: 'Renal Pelvis & Hilum',
            latinName: 'Pelvis renalis',
            color: '#d97706',
            roughness: 0.4,
            metalness: 0.12,
            explodeDir: [-0.7, -0.5, 0.3],
            labelPos: [-0.06, -0.03, 0.01]
          };
        } else {
          // Outer cortex
          config = {
            id: 'renal_cortex',
            name: 'Renal Cortex',
            latinName: 'Cortex renalis',
            color: '#881337',
            roughness: 0.45,
            metalness: 0.1,
            explodeDir: [0.3, 0.1, 0.2],
            labelPos: [0.05, 0.04, 0.02]
          };
        }

        list.push({
          name: mesh.name,
          geometry: mesh.geometry.clone(),
          config
        });
      }
    });

    return list;
  }, [kidneyGltf, mode]);

  // Extract Left Renal Artery & Vein from vasculature.glb
  const renalVessels = useMemo(() => {
    const list: {
      name: string;
      geometry: THREE.BufferGeometry;
      config: KidneyPartConfig;
    }[] = [];

    vascGltf.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.name === 'VH_M_left_renal_artery') {
          list.push({
            name: mesh.name,
            geometry: mesh.geometry.clone(),
            config: {
              id: 'renal_artery',
              name: 'Left Renal Artery',
              latinName: 'Arteria renalis sinistra',
              color: '#dc2626',
              roughness: 0.35,
              metalness: 0.2,
              explodeDir: [-0.8, 0.2, 0.1],
              labelPos: [-0.07, 0.02, 0.0]
            }
          });
        } else if (mesh.name === 'VH_M_renal_vein_L') {
          list.push({
            name: mesh.name,
            geometry: mesh.geometry.clone(),
            config: {
              id: 'renal_vein',
              name: 'Left Renal Vein',
              latinName: 'Vena renalis sinistra',
              color: '#2563eb',
              roughness: 0.35,
              metalness: 0.2,
              explodeDir: [-0.8, -0.2, 0.2],
              labelPos: [-0.07, -0.02, 0.01]
            }
          });
        }
      }
    });

    return list;
  }, [vascGltf]);

  const allMeshes = [...kidneyMeshes, ...renalVessels];

  return (
    <group ref={rootRef}>
      <group scale={[MODEL_SCALE, MODEL_SCALE, MODEL_SCALE]}>
        {allMeshes.map((item, idx) => {
          const cfg = item.config;
          const isSelected = selectedStructureId === cfg.id;
          const isHovered = hoveredStructureId === cfg.id;

          const exX = cfg.explodeDir[0] * explodeFactor * 0.06;
          const exY = cfg.explodeDir[1] * explodeFactor * 0.06;
          const exZ = cfg.explodeDir[2] * explodeFactor * 0.06;

          // Material highlighting
          let emissive = '#000000';
          let emissiveIntensity = 0;
          if (isSelected) {
            emissive = '#06b6d4';
            emissiveIntensity = 0.5;
          } else if (isHovered) {
            emissive = '#38bdf8';
            emissiveIntensity = 0.3;
          }

          const isIsolatedOut = isolateMode && Boolean(selectedStructureId) && !isSelected;
          const baseOpacity = cfg.opacity ?? 1.0;
          const finalOpacity = isIsolatedOut ? 0.08 : (isSelected ? baseOpacity : Math.min(baseOpacity, xrayOpacity));

          return (
            <group
              key={idx}
              position={[centerOffset.x + exX, centerOffset.y + exY, centerOffset.z + exZ]}
              onClick={(e) => {
                e.stopPropagation();
                onSelectStructure?.(cfg.id);
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                onHoverStructure?.(cfg.id);
              }}
              onPointerOut={() => onHoverStructure?.(null)}
            >
              <mesh geometry={item.geometry} castShadow receiveShadow>
                <meshStandardMaterial
                  color={cfg.color}
                  roughness={cfg.roughness}
                  metalness={cfg.metalness}
                  clippingPlanes={clippingPlanes}
                  clipShadows
                  transparent={cfg.transparent || isIsolatedOut || xrayOpacity < 1.0}
                  opacity={finalOpacity}
                  depthWrite={finalOpacity > 0.6}
                  side={THREE.DoubleSide}
                  emissive={emissive}
                  emissiveIntensity={emissiveIntensity}
                />
              </mesh>

              {/* 3D Anatomical Label with Leader Line */}
              {showLabels && (explodeFactor > 0.35 || isSelected || isHovered) && (
                <AnatomicalLeaderLabel
                  name={cfg.name}
                  isSelected={isSelected}
                  isHovered={isHovered}
                  position={cfg.labelPos}
                  direction={cfg.labelPos[0] >= 0 ? 'right' : 'left'}
                  distanceFactor={6}
                  onClick={() => onSelectStructure?.(cfg.id)}
                />
              )}
            </group>
          );
        })}
      </group>
    </group>
  );
};

useGLTF.preload('/models/kidney_l.glb');
useGLTF.preload('/models/vasculature.glb');

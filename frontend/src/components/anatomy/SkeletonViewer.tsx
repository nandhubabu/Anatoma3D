import React, { useRef, useMemo } from 'react';
import { useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';

interface SkeletonViewerProps {
  selectedBone?: string | null;
  onSelectBone?: (boneId: string) => void;
  hoveredBone?: string | null;
  onHoverBone?: (boneId: string | null) => void;
  filterRegion?: 'all' | 'axial' | 'appendicular';
  explodeFactor?: number;
  showLabels?: boolean;
}

export const SkeletonViewer: React.FC<SkeletonViewerProps> = ({
  selectedBone,
  onSelectBone,
  hoveredBone,
  onHoverBone,
  filterRegion = 'all',
  explodeFactor = 0,
  showLabels = true
}) => {
  // Load real high-detail anatomical human skeleton GLB
  const gltf = useGLTF('/models/skeleton.glb');
  const rootRef = useRef<THREE.Group>(null);

  // Clone and prepare the skeleton scene
  const skeletonClone = useMemo(() => {
    const scene = gltf.scene.clone();
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.material = new THREE.MeshStandardMaterial({
          color: '#f8fafc',
          roughness: 0.45,
          metalness: 0.1,
          side: THREE.DoubleSide
        });
      }
    });
    return scene;
  }, [gltf]);

  // Exploded separation displacement
  const explodeOffset = explodeFactor * 0.4;

  return (
    <group ref={rootRef} position={[0, -0.2, 0]}>
      {/* Authentic Anatomical Skeleton */}
      <primitive
        object={skeletonClone}
        scale={[0.048, 0.048, 0.048]}
        position={[0, 0.3 + (explodeFactor * 0.2), 0]}
      />

      {/* Interactive Raycast Hit Areas for Anatomical Regions */}
      {[
        { id: 'skull', name: 'Cranium & Facial Skeleton', pos: [0, 1.55, 0], size: [0.35, 0.42, 0.35] },
        { id: 'vertebral_column', name: 'Vertebral Column (Spine)', pos: [0, 0.45, -0.05], size: [0.15, 0.95, 0.15] },
        { id: 'thoracic_cage', name: 'Thoracic Rib Cage & Sternum', pos: [0, 0.65, 0.05], size: [0.55, 0.6, 0.35] },
        { id: 'pelvis', name: 'Pelvic Girdle (Hip Bones)', pos: [0, -0.15, 0], size: [0.55, 0.35, 0.3] },
        { id: 'femur', name: 'Femur (Thigh Bones)', pos: [0.22, -0.75, 0], size: [0.15, 0.85, 0.15] },
        { id: 'tibia_fibula', name: 'Tibia & Fibula (Leg Bones)', pos: [0.22, -1.55, 0], size: [0.14, 0.8, 0.14] },
        { id: 'humerus', name: 'Humerus (Arm Bones)', pos: [0.55, 0.5, 0], size: [0.12, 0.7, 0.12] },
      ].map((b) => {
        const isSelected = selectedBone === b.id;
        const isHovered = hoveredBone === b.id;

        return (
          <group
            key={b.id}
            position={[b.pos[0], b.pos[1] + (b.pos[1] > 0 ? explodeOffset : -explodeOffset), b.pos[2]]}
            onClick={(e) => {
              e.stopPropagation();
              onSelectBone?.(b.id);
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              onHoverBone?.(b.id);
            }}
            onPointerOut={() => onHoverBone?.(null)}
          >
            {/* Invisible or highlighted selection bounds */}
            <mesh>
              <boxGeometry args={b.size as [number, number, number]} />
              <meshStandardMaterial
                transparent
                opacity={isSelected ? 0.35 : isHovered ? 0.2 : 0.0}
                color={isSelected ? '#06b6d4' : '#38bdf8'}
                wireframe={isSelected}
              />
            </mesh>

            {/* 3D Anatomical Label */}
            {showLabels && (isSelected || isHovered || explodeFactor > 0.3) && (
              <Html
                position={[0, b.size[1] / 2 + 0.1, 0]}
                center
                distanceFactor={7}
                style={{ pointerEvents: 'none' }}
              >
                <div
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap backdrop-blur-md transition-all border ${
                    isSelected
                      ? 'bg-amber-500 text-black font-bold border-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.5)] scale-110'
                      : isHovered
                      ? 'bg-[#1e222d] text-amber-300 border-amber-500/50 scale-105'
                      : 'bg-[#0d0f14]/90 text-[#d1d5db] border-[#20242e] shadow-md'
                  }`}
                >
                  {b.name}
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
};

useGLTF.preload('/models/skeleton.glb');

import React, { useMemo } from 'react';
import { useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';
import { LayerVisibility } from '../../types/anatomy';

interface HumanBodyViewerProps {
  layers: LayerVisibility;
  selectedStructure?: string | null;
  onSelectStructure?: (id: string, type: 'organ' | 'system' | 'bone' | 'muscle') => void;
  hoveredStructure?: string | null;
  onHoverStructure?: (id: string | null) => void;
  gender?: 'male' | 'female';
}

export const HumanBodyViewer: React.FC<HumanBodyViewerProps> = ({
  layers,
  selectedStructure,
  onSelectStructure,
  hoveredStructure,
  onHoverStructure,
  gender = 'male'
}) => {
  // Load real Visible Human models
  const skinGltf = useGLTF('/models/skin.glb');
  const skeletonGltf = useGLTF('/models/skeleton.glb');
  const vascGltf = useGLTF('/models/vasculature.glb');
  const cordGltf = useGLTF('/models/spinal_cord.glb');
  const heartGltf = useGLTF('/models/heart_hubmap.glb');
  const lungsGltf = useGLTF('/models/lungs.glb');
  const liverGltf = useGLTF('/models/liver.glb');
  const kidneyLGltf = useGLTF('/models/kidney_l.glb');
  const kidneyRGltf = useGLTF('/models/kidney_r.glb');
  const intestineGltf = useGLTF('/models/intestines.glb');
  const musclesGltf = useGLTF('/models/muscles.glb');

  // Prepare cloned skin scene with translucent medical shader material
  const skinScene = useMemo(() => {
    const scene = skinGltf.scene.clone();
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new THREE.MeshStandardMaterial({
          color: '#38bdf8',
          transparent: true,
          opacity: 0.18,
          roughness: 0.3,
          metalness: 0.1,
          side: THREE.DoubleSide
        });
      }
    });
    return scene;
  }, [skinGltf]);

  // Prepare vasculature with rich arterial/venous materials
  const vascScene = useMemo(() => {
    const scene = vascGltf.scene.clone();
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const name = mesh.name.toLowerCase();
        const isArtery = name.includes('arter') || name.includes('aorta');
        mesh.material = new THREE.MeshStandardMaterial({
          color: isArtery ? '#dc2626' : '#2563eb',
          roughness: 0.4,
          metalness: 0.15,
          side: THREE.DoubleSide
        });
      }
    });
    return scene;
  }, [vascGltf]);

  // Scale multiplier for Visible Human coordinate system (height ~1.83m)
  const VH_SCALE = 2.2;
  const VH_OFFSET: [number, number, number] = [0, -0.9, 0];

  return (
    <group position={VH_OFFSET} scale={[VH_SCALE, VH_SCALE, VH_SCALE]}>
      {/* 1. Integumentary (Skin) Layer */}
      {layers.skin && (
        <primitive object={skinScene} />
      )}

      {/* 2. Skeletal System Layer */}
      {layers.skeletal && (
        <group position={[0, 0.26, 0]}>
          <primitive
            object={skeletonGltf.scene.clone()}
            scale={[0.027, 0.027, 0.027]}
          />
        </group>
      )}

      {/* Muscular System Layer */}
      {layers.muscular && (
        <group position={[0, -0.915, 0]} scale={[0.001045, 0.001045, 0.001045]}>
          <primitive object={musclesGltf.scene.clone()} />
        </group>
      )}

      {/* 3. Circulatory System Layer */}
      {layers.circulatory && (
        <primitive object={vascScene} />
      )}

      {/* 4. Nervous System (Spinal Cord & Brain) */}
      {layers.nervous && (
        <primitive object={cordGltf.scene.clone()} />
      )}

      {/* 5. Internal Organs Layer */}
      {layers.organs && (
        <group>
          {/* Heart */}
          <group
            onClick={(e) => {
              e.stopPropagation();
              onSelectStructure?.('heart', 'organ');
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              onHoverStructure?.('heart');
            }}
            onPointerOut={() => onHoverStructure?.(null)}
          >
            <primitive object={heartGltf.scene.clone()} />
          </group>

          {/* Lungs */}
          <group
            onClick={(e) => {
              e.stopPropagation();
              onSelectStructure?.('lungs', 'organ');
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              onHoverStructure?.('lungs');
            }}
            onPointerOut={() => onHoverStructure?.(null)}
          >
            <primitive object={lungsGltf.scene.clone()} />
          </group>

          {/* Liver */}
          <group
            onClick={(e) => {
              e.stopPropagation();
              onSelectStructure?.('liver', 'organ');
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              onHoverStructure?.('liver');
            }}
            onPointerOut={() => onHoverStructure?.(null)}
          >
            <primitive object={liverGltf.scene.clone()} />
          </group>

          {/* Kidneys */}
          <group
            onClick={(e) => {
              e.stopPropagation();
              onSelectStructure?.('kidneys', 'organ');
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              onHoverStructure?.('kidneys');
            }}
            onPointerOut={() => onHoverStructure?.(null)}
          >
            <primitive object={kidneyLGltf.scene.clone()} />
            <primitive object={kidRGltfClone(kidneyRGltf.scene)} />
          </group>

          {/* Intestines */}
          <group
            onClick={(e) => {
              e.stopPropagation();
              onSelectStructure?.('digestive', 'system');
            }}
          >
            <primitive object={intestineGltf.scene.clone()} />
          </group>
        </group>
      )}

      {/* Interactive Floating Labels for Organs */}
      {layers.organs && [
        { id: 'heart', name: 'Heart', pos: [0.02, 0.48, 0.12] },
        { id: 'lungs', name: 'Lungs', pos: [0.15, 0.55, 0.08] },
        { id: 'liver', name: 'Liver', pos: [-0.08, 0.36, 0.1] },
        { id: 'kidneys', name: 'Kidneys', pos: [0.08, 0.3, -0.06] },
      ].map((item) => {
        const isSelected = selectedStructure === item.id;
        const isHovered = hoveredStructure === item.id;

        if (!isSelected && !isHovered) return null;

        return (
          <Html
            key={item.id}
            position={item.pos as [number, number, number]}
            center
            distanceFactor={4}
            style={{ pointerEvents: 'none' }}
          >
            <div className="px-3 py-1.5 rounded-lg bg-[#0d0f14]/95 text-amber-300 font-bold text-xs shadow-2xl border border-amber-500/60 scale-110 flex items-center gap-2 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>{item.name}</span>
            </div>
          </Html>
        );
      })}
    </group>
  );
};

function kidRGltfClone(scene: THREE.Group) {
  const clone = scene.clone();
  clone.traverse((c) => {
    if ((c as THREE.Mesh).isMesh) {
      c.castShadow = true;
      c.receiveShadow = true;
    }
  });
  return clone;
}

useGLTF.preload('/models/skin.glb');
useGLTF.preload('/models/skeleton.glb');
useGLTF.preload('/models/vasculature.glb');
useGLTF.preload('/models/spinal_cord.glb');
useGLTF.preload('/models/heart_hubmap.glb');
useGLTF.preload('/models/lungs.glb');
useGLTF.preload('/models/liver.glb');
useGLTF.preload('/models/kidney_l.glb');
useGLTF.preload('/models/kidney_r.glb');
useGLTF.preload('/models/intestines.glb');
useGLTF.preload('/models/muscles.glb');

import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';

interface MuscleViewerProps {
  selectedMuscle?: string | null;
  onSelectMuscle?: (id: string) => void;
  hoveredMuscle?: string | null;
  onHoverMuscle?: (id: string | null) => void;
  layerFilter?: 'all' | 'superficial' | 'deep';
  isContracting?: boolean;
  showLabels?: boolean;
}

const SLUG_TO_KEYWORDS: Record<string, string[]> = {
  'biceps_brachii': ['biceps brachii'],
  'triceps_brachii': ['triceps brachii'],
  'deltoid': ['deltoid'],
  'pectoralis_major': ['pectoralis major'],
  'rectus_abdominis': ['rectus abdominis'],
  'latissimus_dorsi': ['latissimus dorsi'],
  'trapezius': ['trapezius'],
  'gluteus_maximus': ['gluteus maximus'],
  'quadriceps_femoris': ['rectus femoris', 'vastus'],
  'gastrocnemius': ['gastrocnemius'],
  'external_oblique': ['obliquus externus', 'external oblique']
};

export const MuscleViewer: React.FC<MuscleViewerProps> = ({
  selectedMuscle,
  onSelectMuscle,
  hoveredMuscle,
  onHoverMuscle,
  layerFilter = 'all',
  isContracting = true,
  showLabels = true
}) => {
  // Load real Z-Anatomy 3D Human Musculature Model (462 real anatomical muscles)
  const gltf = useGLTF('/models/muscles.glb');
  const rootRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  // Organic contraction wave across muscle bellies
  useFrame((_, delta) => {
    if (isContracting && rootRef.current) {
      timeRef.current += delta * 2.2;
      const pulse = Math.sin(timeRef.current);
      const scaleXZ = 0.00125 * (1.0 + pulse * 0.018);
      rootRef.current.scale.set(scaleXZ, 0.00125, scaleXZ);
    }
  });

  // Prepare cloned scene with anatomical materials and interactive selection
  const sceneClone = useMemo(() => {
    const scene = gltf.scene.clone(true);

    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const extras = (mesh.userData as any) || (child.parent?.userData as any) || {};
        const rawConcept = extras.concept || mesh.name || '';
        const cleanName = rawConcept.replace(/[()]/g, '').trim();
        const lowerName = cleanName.toLowerCase();

        let slugMatch: string | null = null;
        for (const [slug, keywords] of Object.entries(SLUG_TO_KEYWORDS)) {
          if (keywords.some((kw) => lowerName.includes(kw))) {
            slugMatch = slug;
            break;
          }
        }

        const isSelected = selectedMuscle && (slugMatch === selectedMuscle || lowerName.includes(selectedMuscle.toLowerCase()));
        const isHovered = hoveredMuscle && (slugMatch === hoveredMuscle || lowerName.includes(hoveredMuscle.toLowerCase()));

        const baseColor = isSelected
          ? '#06b6d4'
          : isHovered
          ? '#f87171'
          : '#991b1b';

        const emissive = isSelected
          ? '#06b6d4'
          : isHovered
          ? '#b91c1c'
          : '#000000';

        const emissiveIntensity = isSelected ? 0.6 : isHovered ? 0.35 : 0;

        mesh.material = new THREE.MeshStandardMaterial({
          color: baseColor,
          roughness: 0.45,
          metalness: 0.12,
          emissive,
          emissiveIntensity,
          side: THREE.DoubleSide
        });

        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });

    return scene;
  }, [gltf, selectedMuscle, hoveredMuscle]);

  // Click & Hover raycasting on muscles
  const handlePointerOver = (e: any) => {
    e.stopPropagation();
    const mesh = e.object as THREE.Mesh;
    const extras = (mesh.userData as any) || (mesh.parent?.userData as any) || {};
    const rawConcept = extras.concept || mesh.name || '';
    const cleanName = rawConcept.replace(/[()]/g, '').trim();
    const lowerName = cleanName.toLowerCase();

    for (const [slug, keywords] of Object.entries(SLUG_TO_KEYWORDS)) {
      if (keywords.some((kw) => lowerName.includes(kw))) {
        onHoverMuscle?.(slug);
        return;
      }
    }
    onHoverMuscle?.(cleanName);
  };

  const handleClick = (e: any) => {
    e.stopPropagation();
    const mesh = e.object as THREE.Mesh;
    const extras = (mesh.userData as any) || (mesh.parent?.userData as any) || {};
    const rawConcept = extras.concept || mesh.name || '';
    const cleanName = rawConcept.replace(/[()]/g, '').trim();
    const lowerName = cleanName.toLowerCase();

    for (const [slug, keywords] of Object.entries(SLUG_TO_KEYWORDS)) {
      if (keywords.some((kw) => lowerName.includes(kw))) {
        onSelectMuscle?.(slug);
        return;
      }
    }
    if (cleanName) {
      onSelectMuscle?.(cleanName);
    }
  };

  const SCALE = 0.00125;
  const OFFSET: [number, number, number] = [0, -1.05, 0];

  return (
    <group
      ref={rootRef}
      position={OFFSET}
      scale={[SCALE, SCALE, SCALE]}
      onPointerOver={handlePointerOver}
      onPointerOut={() => onHoverMuscle?.(null)}
      onClick={handleClick}
    >
      <primitive object={sceneClone} />
    </group>
  );
};

useGLTF.preload('/models/muscles.glb');

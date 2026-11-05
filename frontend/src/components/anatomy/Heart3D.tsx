import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';
import { ExplorationMode, CuttingPlaneConfig } from '../../types/anatomy';

interface Heart3DProps {
  mode: ExplorationMode;
  selectedStructureId?: string;
  onSelectStructure?: (id: string) => void;
  hoveredStructureId?: string;
  onHoverStructure?: (id: string | null) => void;
  cuttingConfig: CuttingPlaneConfig;
  explodeFactor: number;
  isBeating?: boolean;
  beatSpeed?: number;
  showBloodFlow?: boolean;
  showLabels?: boolean;
  isolateMode?: boolean;
  xrayOpacity?: number;
}

// Mapping of Visible Human meshes to structure IDs and explosion vectors
interface PartMapping {
  id: string;
  name: string;
  latinName: string;
  color: string;
  highlightColor: string;
  dir: [number, number, number];
  internal: boolean;
}

const MESH_MAPPINGS: Record<string, PartMapping> = {
  'VH_M_heart_left_ventricle': {
    id: 'left_ventricle',
    name: 'Left Ventricle',
    latinName: 'Ventriculus sinister',
    color: '#991b1b',
    highlightColor: '#ef4444',
    dir: [-1.2, -0.6, 0.4],
    internal: false
  },
  'VH_M_heart_right_ventricle': {
    id: 'right_ventricle',
    name: 'Right Ventricle',
    latinName: 'Ventriculus dexter',
    color: '#1d4ed8',
    highlightColor: '#3b82f6',
    dir: [1.1, -0.5, 0.6],
    internal: false
  },
  'VH_M_left_cardiac_atrium': {
    id: 'left_atrium',
    name: 'Left Atrium',
    latinName: 'Atrium sinistrum',
    color: '#b91c1c',
    highlightColor: '#f87171',
    dir: [-1.1, 0.8, -0.6],
    internal: false
  },
  'VH_M_right_cardiac_atrium': {
    id: 'right_atrium',
    name: 'Right Atrium',
    latinName: 'Atrium dextrum',
    color: '#2563eb',
    highlightColor: '#60a5fa',
    dir: [1.2, 0.7, -0.3],
    internal: false
  },
  'VH_M_interventricular_septum': {
    id: 'interventricular_septum',
    name: 'Interventricular Septum',
    latinName: 'Septum interventriculare',
    color: '#831843',
    highlightColor: '#f43f5e',
    dir: [0.0, -0.1, 0.0],
    internal: true
  },
  'VH_M_mitral_valve': {
    id: 'mitral_valve',
    name: 'Mitral (Bicuspid) Valve',
    latinName: 'Valva mitralis',
    color: '#f8fafc',
    highlightColor: '#38bdf8',
    dir: [-0.6, 0.2, 0.1],
    internal: true
  },
  'VH_M_tricuspid_valve': {
    id: 'tricuspid_valve',
    name: 'Tricuspid Valve',
    latinName: 'Valva tricuspidalis',
    color: '#f8fafc',
    highlightColor: '#38bdf8',
    dir: [0.6, 0.1, 0.2],
    internal: true
  },
  'VH_M_aortic_valve': {
    id: 'aortic_valve',
    name: 'Aortic Semilunar Valve',
    latinName: 'Valva aortae',
    color: '#f8fafc',
    highlightColor: '#38bdf8',
    dir: [-0.1, 0.5, 0.1],
    internal: true
  },
  'VH_M_pulmonary_valve': {
    id: 'pulmonary_valve',
    name: 'Pulmonary Valve',
    latinName: 'Valva trunci pulmonalis',
    color: '#f8fafc',
    highlightColor: '#38bdf8',
    dir: [0.2, 0.6, 0.4],
    internal: true
  },
  'VH_M_papillary_muscle_of_heart_anterior': {
    id: 'papillary_muscles',
    name: 'Papillary Muscles',
    latinName: 'Musculi papillares',
    color: '#fda4af',
    highlightColor: '#ffffff',
    dir: [-0.4, -0.7, 0.2],
    internal: true
  },
  'VH_M_papillary_muscle_of_heart_anterolateral': {
    id: 'papillary_muscles',
    name: 'Papillary Muscles',
    latinName: 'Musculi papillares',
    color: '#fda4af',
    highlightColor: '#ffffff',
    dir: [-0.4, -0.7, 0.2],
    internal: true
  },
  'VH_M_papillary_muscle_of_heart_posterior': {
    id: 'papillary_muscles',
    name: 'Papillary Muscles',
    latinName: 'Musculi papillares',
    color: '#fda4af',
    highlightColor: '#ffffff',
    dir: [-0.4, -0.7, 0.2],
    internal: true
  },
  'VH_M_papillary_muscle_of_heart_posteromedial': {
    id: 'papillary_muscles',
    name: 'Papillary Muscles',
    latinName: 'Musculi papillares',
    color: '#fda4af',
    highlightColor: '#ffffff',
    dir: [-0.4, -0.7, 0.2],
    internal: true
  },
  'VH_M_papillary_muscle_of_heart_medial': {
    id: 'papillary_muscles',
    name: 'Papillary Muscles',
    latinName: 'Musculi papillares',
    color: '#fda4af',
    highlightColor: '#ffffff',
    dir: [-0.4, -0.7, 0.2],
    internal: true
  }
};

const VASC_CARDIAC_MESHES: Record<string, { id: string; name: string; color: string; dir: [number, number, number] }> = {
  'VH_M_ascending_aorta': {
    id: 'aorta',
    name: 'Ascending Aorta & Arch',
    color: '#dc2626',
    dir: [-0.2, 1.6, -0.2]
  },
  'VH_M_superior_vena_cava': {
    id: 'superior_vena_cava',
    name: 'Superior Vena Cava',
    color: '#1d4ed8',
    dir: [0.8, 1.5, -0.4]
  },
  'VH_M_inferior_vena_cava_a': {
    id: 'inferior_vena_cava',
    name: 'Inferior Vena Cava',
    color: '#1e3a8a',
    dir: [0.7, -1.5, -0.4]
  },
  'VH_M_inferior_vena_cava_b': {
    id: 'inferior_vena_cava',
    name: 'Inferior Vena Cava',
    color: '#1e3a8a',
    dir: [0.7, -1.5, -0.4]
  },
  'VH_M_pulmonary_trunk': {
    id: 'pulmonary_trunk',
    name: 'Pulmonary Trunk',
    color: '#0284c7',
    dir: [0.2, 1.2, 0.9]
  },
  'VH_M_pulmonary_artery_L': {
    id: 'pulmonary_trunk',
    name: 'Left Pulmonary Artery',
    color: '#0284c7',
    dir: [-0.6, 1.0, 0.4]
  },
  'VH_M_pulmonary_artery_R': {
    id: 'pulmonary_trunk',
    name: 'Right Pulmonary Artery',
    color: '#0284c7',
    dir: [0.6, 1.0, 0.4]
  },
  'VH_M_left_coronary_artery': {
    id: 'coronary_arteries',
    name: 'Coronary Arteries',
    color: '#f43f5e',
    dir: [0.0, -0.1, 1.4]
  },
  'VH_M_right_coronary_artery': {
    id: 'coronary_arteries',
    name: 'Right Coronary Artery',
    color: '#f43f5e',
    dir: [0.0, -0.1, 1.4]
  },
  'VH_M_coronary_sinus': {
    id: 'coronary_arteries',
    name: 'Coronary Sinus',
    color: '#3b82f6',
    dir: [0.0, -0.1, 1.4]
  }
};

const NUM_PARTICLES = 140;

export const Heart3D: React.FC<Heart3DProps> = ({
  mode,
  selectedStructureId,
  onSelectStructure,
  hoveredStructureId,
  onHoverStructure,
  cuttingConfig,
  explodeFactor,
  isBeating = true,
  beatSpeed = 1.0,
  showBloodFlow = true,
  showLabels = true,
  isolateMode = false,
  xrayOpacity = 1.0
}) => {
  // Load real GLB models from the National Library of Medicine & HuBMAP Visible Human Project
  const heartGltf = useGLTF('/models/heart_hubmap.glb');
  const vascGltf = useGLTF('/models/vasculature.glb');

  const rootGroupRef = useRef<THREE.Group>(null);
  const bloodParticlesRef = useRef<THREE.InstancedMesh>(null);
  const timeRef = useRef(0);

  // Setup Three.js clipping plane for Cut View
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

  // Particles for dual-circuit blood flow visualization
  const particles = useMemo(() => {
    return Array.from({ length: NUM_PARTICLES }, (_, i) => ({
      circuit: i < NUM_PARTICLES / 2 ? 'venous' : 'arterial',
      t: Math.random(),
      speed: 0.18 + Math.random() * 0.12,
      offset: (Math.random() - 0.5) * 0.08
    }));
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Frame loop: Organic cardiac cycle contraction morphing & blood particles
  useFrame((_, delta) => {
    timeRef.current += delta * beatSpeed;
    const t = timeRef.current;
    const cycle = (t * 1.15) % 1.0;
    const isSystole = cycle < 0.35;
    const systoleProgress = cycle / 0.35;

    let vScale = 1.0;
    if (isBeating) {
      if (isSystole) {
        const s = Math.sin(systoleProgress * Math.PI);
        vScale = 1.0 - s * 0.08;
      } else {
        const diastoleProgress = (cycle - 0.35) / 0.65;
        const s = Math.sin(diastoleProgress * Math.PI);
        vScale = 1.0 + s * 0.03;
      }
    }

    if (rootGroupRef.current && isBeating && explodeFactor < 0.2) {
      rootGroupRef.current.scale.set(vScale, (vScale + 1) / 2, vScale);
    }

    // Update blood flow particles
    if (showBloodFlow && bloodParticlesRef.current) {
      particles.forEach((p, idx) => {
        p.t = (p.t + delta * p.speed * beatSpeed) % 1.0;
        let pos = new THREE.Vector3();

        if (p.circuit === 'venous') {
          // Venous: SVC (y: 1.5, x: 0.6) -> RA -> RV -> Pulmonary Trunk (y: 1.2, x: 0.1)
          if (p.t < 0.35) {
            const subT = p.t / 0.35;
            pos.lerpVectors(
              new THREE.Vector3(0.5 + p.offset, 1.4, -0.2),
              new THREE.Vector3(0.4 + p.offset, 0.3, 0.1),
              subT
            );
          } else if (p.t < 0.7) {
            const subT = (p.t - 0.35) / 0.35;
            pos.lerpVectors(
              new THREE.Vector3(0.4 + p.offset, 0.3, 0.1),
              new THREE.Vector3(0.3 + p.offset, -0.6, 0.3),
              subT
            );
          } else {
            const subT = (p.t - 0.7) / 0.3;
            pos.lerpVectors(
              new THREE.Vector3(0.3 + p.offset, -0.6, 0.3),
              new THREE.Vector3(0.1 + p.offset, 1.2, 0.2),
              subT
            );
          }
        } else {
          // Arterial: Pulmonary Veins -> Left Atrium -> LV -> Aorta (y: 1.6, x: -0.1)
          if (p.t < 0.35) {
            const subT = p.t / 0.35;
            pos.lerpVectors(
              new THREE.Vector3(-0.7 + p.offset, 0.5, -0.5),
              new THREE.Vector3(-0.3 + p.offset, 0.2, -0.1),
              subT
            );
          } else if (p.t < 0.7) {
            const subT = (p.t - 0.35) / 0.35;
            pos.lerpVectors(
              new THREE.Vector3(-0.3 + p.offset, 0.2, -0.1),
              new THREE.Vector3(-0.2 + p.offset, -0.7, 0.2),
              subT
            );
          } else {
            const subT = (p.t - 0.7) / 0.3;
            pos.lerpVectors(
              new THREE.Vector3(-0.2 + p.offset, -0.7, 0.2),
              new THREE.Vector3(-0.1 + p.offset, 1.5, -0.1),
              subT
            );
          }
        }

        dummy.position.copy(pos);
        dummy.scale.setScalar(0.04);
        dummy.updateMatrix();
        bloodParticlesRef.current!.setMatrixAt(idx, dummy.matrix);
      });
      bloodParticlesRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  // Extract and prepare realistic meshes from the Visible Human GLB
  const parsedHeartMeshes = useMemo(() => {
    const list: {
      name: string;
      geometry: THREE.BufferGeometry;
      mapping: PartMapping;
    }[] = [];

    heartGltf.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const mapping = MESH_MAPPINGS[mesh.name] || {
          id: mesh.name.toLowerCase(),
          name: mesh.name.replace(/_/g, ' '),
          latinName: '',
          color: '#b91c1c',
          highlightColor: '#ef4444',
          dir: [0, 0, 0],
          internal: false
        };

        list.push({
          name: mesh.name,
          geometry: mesh.geometry.clone(),
          mapping
        });
      }
    });
    return list;
  }, [heartGltf]);

  // Extract cardiac great vessels from vasculature.glb
  const parsedVascMeshes = useMemo(() => {
    const list: {
      name: string;
      geometry: THREE.BufferGeometry;
      meta: { id: string; name: string; color: string; dir: [number, number, number] };
    }[] = [];

    vascGltf.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const meta = VASC_CARDIAC_MESHES[mesh.name];
        if (meta) {
          list.push({
            name: mesh.name,
            geometry: mesh.geometry.clone(),
            meta
          });
        }
      }
    });
    return list;
  }, [vascGltf]);

  // Center offset for the Visible Human heart models: [0.019, 0.476, 0.038]
  const centerOffset = useMemo(() => new THREE.Vector3(-0.019, -0.476, -0.038), []);
  const MODEL_SCALE = 18.0;

  return (
    <group ref={rootGroupRef}>
      {/* Container centered & scaled */}
      <group scale={[MODEL_SCALE, MODEL_SCALE, MODEL_SCALE]} position={[0, 0, 0]}>
        {/* Visible Human Real Heart Meshes */}
        {parsedHeartMeshes.map((item, idx) => {
          const mapping = item.mapping;
          const isHiddenInExternal = mapping.internal && mode === 'external' && explodeFactor < 0.1;
          if (isHiddenInExternal) return null;

          const isSelected = selectedStructureId === mapping.id;
          const isHovered = hoveredStructureId === mapping.id;

          // Exploded view translation vector
          const exX = (mapping.dir[0] * explodeFactor * 0.08);
          const exY = (mapping.dir[1] * explodeFactor * 0.08);
          const exZ = (mapping.dir[2] * explodeFactor * 0.08);

          const isIsolatedOut = isolateMode && Boolean(selectedStructureId) && !isSelected;
          const finalOpacity = isIsolatedOut ? 0.08 : (isSelected ? 1.0 : xrayOpacity);

          const activeColor = isSelected
            ? '#f59e0b'
            : isHovered
            ? mapping.highlightColor
            : mapping.color;

          return (
            <group
              key={idx}
              position={[centerOffset.x + exX, centerOffset.y + exY, centerOffset.z + exZ]}
              onClick={(e) => {
                e.stopPropagation();
                onSelectStructure?.(mapping.id);
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                onHoverStructure?.(mapping.id);
              }}
              onPointerOut={() => onHoverStructure?.(null)}
            >
              <mesh geometry={item.geometry} castShadow receiveShadow>
                <meshStandardMaterial
                  color={activeColor}
                  roughness={isSelected ? 0.2 : 0.4}
                  metalness={isSelected ? 0.3 : 0.1}
                  clippingPlanes={clippingPlanes}
                  clipShadows
                  side={THREE.DoubleSide}
                  emissive={isSelected ? '#d97706' : isHovered ? '#b45309' : '#000000'}
                  emissiveIntensity={isSelected ? 0.4 : isHovered ? 0.2 : 0}
                  transparent={isIsolatedOut || xrayOpacity < 1.0}
                  opacity={finalOpacity}
                  depthWrite={finalOpacity > 0.6}
                />
              </mesh>

              {/* Exploded 3D Anatomical Label */}
              {showLabels && (explodeFactor > 0.35 || isSelected || isHovered) && (
                <Html
                  position={[0, 0.04, 0]}
                  center
                  distanceFactor={6}
                  style={{ pointerEvents: 'none' }}
                >
                  <div
                    className={`px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap backdrop-blur-md transition-all border ${
                      isSelected
                        ? 'bg-amber-500 text-black font-bold border-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.5)] scale-110'
                        : isHovered
                        ? 'bg-[#1e222d] text-amber-300 border-amber-500/50 scale-105'
                        : 'bg-[#0d0f14]/90 text-[#d1d5db] border-[#20242e] shadow-md'
                    }`}
                  >
                    {mapping.name}
                  </div>
                </Html>
              )}
            </group>
          );
        })}

        {/* Visible Human Real Great Vessels & Coronary Tree */}
        {parsedVascMeshes.map((item, idx) => {
          const meta = item.meta;
          const isSelected = selectedStructureId === meta.id;
          const isHovered = hoveredStructureId === meta.id;

          const exX = (meta.dir[0] * explodeFactor * 0.08);
          const exY = (meta.dir[1] * explodeFactor * 0.08);
          const exZ = (meta.dir[2] * explodeFactor * 0.08);

          const isIsolatedOut = isolateMode && Boolean(selectedStructureId) && !isSelected;
          const finalOpacity = isIsolatedOut ? 0.08 : (isSelected ? 1.0 : xrayOpacity);

          const activeColor = isSelected
            ? '#f59e0b'
            : isHovered
            ? '#fbbf24'
            : meta.color;

          return (
            <group
              key={`vasc_${idx}`}
              position={[centerOffset.x + exX, centerOffset.y + exY, centerOffset.z + exZ]}
              onClick={(e) => {
                e.stopPropagation();
                onSelectStructure?.(meta.id);
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                onHoverStructure?.(meta.id);
              }}
              onPointerOut={() => onHoverStructure?.(null)}
            >
              <mesh geometry={item.geometry} castShadow receiveShadow>
                <meshStandardMaterial
                  color={activeColor}
                  roughness={isSelected ? 0.2 : 0.4}
                  metalness={isSelected ? 0.3 : 0.15}
                  clippingPlanes={clippingPlanes}
                  clipShadows
                  side={THREE.DoubleSide}
                  emissive={isSelected ? '#d97706' : isHovered ? '#b45309' : '#000000'}
                  emissiveIntensity={isSelected ? 0.4 : isHovered ? 0.2 : 0}
                  transparent={isIsolatedOut || xrayOpacity < 1.0}
                  opacity={finalOpacity}
                  depthWrite={finalOpacity > 0.6}
                />
              </mesh>

              {showLabels && (explodeFactor > 0.35 || isSelected || isHovered) && (
                <Html
                  position={[0, 0.04, 0]}
                  center
                  distanceFactor={6}
                  style={{ pointerEvents: 'none' }}
                >
                  <div
                    className={`px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap backdrop-blur-md transition-all border ${
                      isSelected
                        ? 'bg-amber-500 text-black font-bold border-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.5)] scale-110'
                        : isHovered
                        ? 'bg-[#1e222d] text-amber-300 border-amber-500/50 scale-105'
                        : 'bg-[#0d0f14]/90 text-[#d1d5db] border-[#20242e] shadow-md'
                    }`}
                  >
                    {meta.name}
                  </div>
                </Html>
              )}
            </group>
          );
        })}
      </group>

      {/* Dual-Circuit Blood Flow Stream Particles */}
      {showBloodFlow && (
        <instancedMesh
          ref={bloodParticlesRef}
          args={[undefined, undefined, NUM_PARTICLES]}
        >
          <sphereGeometry args={[1, 12, 12]} />
          <meshStandardMaterial
            color="#ef4444"
            emissive="#dc2626"
            emissiveIntensity={0.6}
            roughness={0.2}
          />
        </instancedMesh>
      )}
    </group>
  );
};

useGLTF.preload('/models/heart_hubmap.glb');
useGLTF.preload('/models/vasculature.glb');

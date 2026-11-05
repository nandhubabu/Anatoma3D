import React, { useRef, useMemo } from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { ExplorationMode, CuttingPlaneConfig, OrganSubcomponent } from '../../types/anatomy';

interface GenericOrgan3DProps {
  slug: string;
  subcomponents?: OrganSubcomponent[];
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

export const GenericOrgan3D: React.FC<GenericOrgan3DProps> = ({
  subcomponents = [],
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

  // If no subcomponents provided, generate a fallback sculpted anatomical mass
  const items = subcomponents.length > 0 ? subcomponents : [
    {
      id: 'main_parenchyma',
      name: 'Main Organ Parenchyma',
      description: 'Primary functional tissue mass of the organ',
      function: 'Metabolic, mechanical, or filtration role',
      explosionDir: [0, 0, 0] as [number, number, number],
      color: '#e11d48'
    }
  ];

  return (
    <group ref={rootRef}>
      {items.map((part, index) => {
        const isHiddenInExternal = part.internal && mode === 'external' && explodeFactor < 0.1;
        if (isHiddenInExternal) return null;

        const isSelected = selectedStructureId === part.id;
        const isHovered = hoveredStructureId === part.id;

        const dir = part.explosionDir || [
          (index % 3 - 1) * 0.8,
          Math.floor(index / 3) * 0.5 - 0.5,
          (index % 2 === 0 ? 0.6 : -0.6)
        ];

        const exX = dir[0] * explodeFactor * 1.5;
        const exY = dir[1] * explodeFactor * 1.5;
        const exZ = dir[2] * explodeFactor * 1.5;

        const color = isSelected
          ? '#06b6d4'
          : isHovered
          ? '#38bdf8'
          : part.color || '#e11d48';

        const isIsolatedOut = isolateMode && Boolean(selectedStructureId) && !isSelected;
        const finalOpacity = isIsolatedOut ? 0.08 : (isSelected ? 1.0 : xrayOpacity);

        return (
          <group
            key={part.id}
            name={part.id}
            position={[exX, exY, exZ]}
            onClick={(e) => {
              e.stopPropagation();
              onSelectStructure?.(part.id);
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              onHoverStructure?.(part.id);
            }}
            onPointerOut={() => onHoverStructure?.(null)}
          >
            <mesh castShadow receiveShadow>
              <sphereGeometry args={[0.55 + (index % 3) * 0.15, 24, 20]} />
              <meshStandardMaterial
                color={color}
                roughness={0.45}
                metalness={0.15}
                clippingPlanes={clippingPlanes}
                clipShadows
                side={THREE.DoubleSide}
                transparent={isIsolatedOut || xrayOpacity < 1.0}
                opacity={finalOpacity}
                depthWrite={finalOpacity > 0.6}
              />
            </mesh>

            {showLabels && (explodeFactor > 0.35 || isSelected || isHovered) && (
              <Html
                position={[0, 0.4, 0]}
                center
                distanceFactor={10}
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
                  {part.name}
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
};


import React from 'react';
import { Html } from '@react-three/drei';

interface AnatomicalPin {
  id: string;
  name: string;
  latinName?: string;
  pos: [number, number, number];
}

interface AnatomicalPinsProps {
  pins: AnatomicalPin[];
  selectedId?: string;
  onSelectPin: (id: string) => void;
  hoveredId?: string | null;
  onHoverPin?: (id: string | null) => void;
  visible?: boolean;
}

export const AnatomicalPins: React.FC<AnatomicalPinsProps> = ({
  pins,
  selectedId,
  onSelectPin,
  hoveredId,
  onHoverPin,
  visible = true
}) => {
  if (!visible || pins.length === 0) return null;

  return (
    <group>
      {pins.map((pin) => {
        const isSelected = selectedId === pin.id;
        const isHovered = hoveredId === pin.id;
        // Project leader line outside: right for x >= 0, left for x < 0
        const isRight = pin.pos[0] >= 0;

        const dx = isRight ? 46 : -46;
        const dy = -28;
        const hx = isRight ? 24 : -24;
        const totalX = dx + hx;

        return (
          <group key={pin.id} position={pin.pos}>
            {/* Minimal Reticle Anchor Beacon on Organ Surface */}
            <mesh
              onClick={(e) => {
                e.stopPropagation();
                onSelectPin(pin.id);
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                onHoverPin?.(pin.id);
              }}
              onPointerOut={() => onHoverPin?.(null)}
            >
              <sphereGeometry args={[0.026, 16, 16]} />
              <meshStandardMaterial
                color={isSelected ? '#f59e0b' : isHovered ? '#fbbf24' : '#e2e8f0'}
                emissive={isSelected ? '#f59e0b' : isHovered ? '#d97706' : '#64748b'}
                emissiveIntensity={isSelected ? 1.0 : isHovered ? 0.8 : 0.3}
                roughness={0.2}
              />
            </mesh>

            {/* Subtle beacon pulse aura */}
            <mesh>
              <ringGeometry args={[0.034, 0.046, 24]} />
              <meshBasicMaterial
                color={isSelected ? '#f59e0b' : '#fbbf24'}
                transparent
                opacity={isSelected ? 0.85 : 0.35}
                side={2}
              />
            </mesh>

            {/* Precision Anatomical Leader Line Callout (Written outside organ) */}
            <Html
              position={[0, 0, 0]}
              style={{ pointerEvents: 'none' }}
              distanceFactor={8}
            >
              <div className="relative select-none" style={{ width: 0, height: 0 }}>
                {/* SVG Pointer / Leader Line */}
                <svg
                  className="absolute pointer-events-none overflow-visible"
                  style={{ left: 0, top: 0 }}
                >
                  <circle
                    cx="0"
                    cy="0"
                    r="2.5"
                    fill={isSelected ? '#f59e0b' : isHovered ? '#fbbf24' : '#ffffff'}
                  />
                  <polyline
                    points={`0,0 ${dx},${dy} ${totalX},${dy}`}
                    fill="none"
                    stroke={isSelected ? '#f59e0b' : isHovered ? '#fbbf24' : 'rgba(226, 232, 240, 0.7)'}
                    strokeWidth={isSelected ? '2' : '1.3'}
                    strokeDasharray={isSelected ? 'none' : '3,2'}
                  />
                </svg>

                {/* Short Compact Anatomical Label written cleanly OUTSIDE the organ */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectPin(pin.id);
                  }}
                  onMouseEnter={() => onHoverPin?.(pin.id)}
                  onMouseLeave={() => onHoverPin?.(null)}
                  className={`absolute pointer-events-auto cursor-pointer transition-all duration-150 ${
                    isRight
                      ? 'left-[74px] -top-[40px] text-left'
                      : 'right-[74px] -top-[40px] text-right'
                  }`}
                  style={{
                    transform: isRight ? 'none' : 'translateX(0)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <div
                    className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md backdrop-blur-md transition-all ${
                      isSelected
                        ? 'bg-[#181b24]/95 border border-amber-400 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.4)]'
                        : isHovered
                        ? 'bg-[#14161f]/90 border border-amber-500/50 text-white'
                        : 'bg-[#090a0d]/85 border border-[#272b38]/70 text-slate-200 hover:text-white hover:border-slate-400'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                        isSelected ? 'bg-amber-400' : isHovered ? 'bg-amber-300' : 'bg-slate-400'
                      }`}
                    />
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      {pin.name}
                    </span>
                  </div>

                  {pin.latinName && isSelected && (
                    <div className={`text-[9px] text-amber-400/90 font-serif italic mt-0.5 ${isRight ? 'pl-1' : 'pr-1'}`}>
                      {pin.latinName}
                    </div>
                  )}
                </div>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
};

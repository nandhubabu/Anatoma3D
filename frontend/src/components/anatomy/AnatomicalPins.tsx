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

        return (
          <group key={pin.id} position={pin.pos}>
            {/* Glowing 3D Landmark Beacon */}
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
              <sphereGeometry args={[0.045, 16, 16]} />
              <meshStandardMaterial
                color={isSelected ? '#f59e0b' : isHovered ? '#fbbf24' : '#ffffff'}
                emissive={isSelected ? '#f59e0b' : isHovered ? '#d97706' : '#94a3b8'}
                emissiveIntensity={isSelected ? 0.9 : isHovered ? 0.6 : 0.25}
                roughness={0.2}
              />
            </mesh>

            {/* Pulsing outer aura ring */}
            <mesh>
              <ringGeometry args={[0.06, 0.08, 24]} />
              <meshBasicMaterial
                color={isSelected ? '#f59e0b' : '#fbbf24'}
                transparent
                opacity={isSelected ? 0.85 : 0.35}
                side={2}
              />
            </mesh>

            {/* High-Legibility Titanium/Obsidian Tooltip Pill */}
            <Html
              position={[0, 0.08, 0]}
              center
              distanceFactor={8}
              style={{ pointerEvents: 'none' }}
            >
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectPin(pin.id);
                }}
                className={`pointer-events-auto cursor-pointer px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap backdrop-blur-md transition-all border flex items-center gap-1.5 shadow-xl ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 border-amber-300 font-bold scale-110 shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                    : isHovered
                    ? 'bg-[#1e222e] text-amber-300 border-amber-500/60 scale-105'
                    : 'bg-[#0f1117]/95 text-slate-200 border-[#282d3c] hover:border-amber-400 hover:text-white'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-slate-950' : 'bg-amber-400 animate-pulse'}`} />
                <span>{pin.name}</span>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
};

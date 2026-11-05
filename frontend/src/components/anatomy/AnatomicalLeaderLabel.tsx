import React from 'react';
import { Html } from '@react-three/drei';

interface AnatomicalLeaderLabelProps {
  name: string;
  latinName?: string;
  isSelected?: boolean;
  isHovered?: boolean;
  position?: [number, number, number];
  direction?: 'auto' | 'left' | 'right';
  distanceFactor?: number;
  onClick?: () => void;
}

export const AnatomicalLeaderLabel: React.FC<AnatomicalLeaderLabelProps> = ({
  name,
  latinName,
  isSelected = false,
  isHovered = false,
  position = [0, 0, 0],
  direction = 'auto',
  distanceFactor = 6,
  onClick
}) => {
  // Determine if leader line projects to the right or left
  const isRight = direction === 'right' ? true : direction === 'left' ? false : (position[0] >= 0);

  // Pixel coordinates for SVG leader line
  const dx = isRight ? 42 : -42;
  const dy = -24;
  const hx = isRight ? 20 : -20;
  const totalX = dx + hx;

  return (
    <Html
      position={position}
      distanceFactor={distanceFactor}
      style={{ pointerEvents: 'none' }}
    >
      <div className="relative select-none" style={{ width: 0, height: 0 }}>
        {/* SVG Leader Line connecting from anchor dot to outside text */}
        <svg
          className="absolute pointer-events-none overflow-visible"
          style={{ left: 0, top: 0 }}
        >
          {/* Surface anchor dot */}
          <circle
            cx="0"
            cy="0"
            r={isSelected ? 3 : 2}
            fill={isSelected ? '#f59e0b' : isHovered ? '#fbbf24' : '#e2e8f0'}
          />
          {/* Angled leader line */}
          <polyline
            points={`0,0 ${dx},${dy} ${totalX},${dy}`}
            fill="none"
            stroke={isSelected ? '#f59e0b' : isHovered ? '#fbbf24' : 'rgba(226, 232, 240, 0.7)'}
            strokeWidth={isSelected ? '2' : '1.2'}
            strokeDasharray={isSelected ? 'none' : '3,2'}
          />
        </svg>

        {/* Short, crisp label placed OUTSIDE the organ mesh */}
        <div
          onClick={(e) => {
            if (onClick) {
              e.stopPropagation();
              onClick();
            }
          }}
          className={`absolute ${onClick ? 'pointer-events-auto cursor-pointer' : 'pointer-events-none'} transition-all duration-150 ${
            isRight ? 'left-[66px] -top-[34px] text-left' : 'right-[66px] -top-[34px] text-right'
          }`}
          style={{
            transform: isRight ? 'none' : 'translateX(0)',
            whiteSpace: 'nowrap'
          }}
        >
          <div
            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md backdrop-blur-md transition-all ${
              isSelected
                ? 'bg-[#181b24]/95 border border-amber-400 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.4)] font-bold'
                : isHovered
                ? 'bg-[#14161f]/90 border border-amber-500/50 text-white font-semibold'
                : 'bg-[#090a0d]/85 border border-[#272b38]/70 text-slate-200 hover:text-white'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                isSelected ? 'bg-amber-400' : isHovered ? 'bg-amber-300' : 'bg-slate-400'
              }`}
            />
            <span className="text-[10px] font-bold uppercase tracking-wider">
              {name}
            </span>
          </div>

          {latinName && isSelected && (
            <div className={`text-[9px] text-amber-400/90 font-serif italic mt-0.5 ${isRight ? 'pl-1' : 'pr-1'}`}>
              {latinName}
            </div>
          )}
        </div>
      </div>
    </Html>
  );
};

import React from 'react';
import { Html, useProgress } from '@react-three/drei';
import { Activity } from 'lucide-react';

export const ModelLoader: React.FC = () => {
  const { active, progress } = useProgress();

  if (!active && progress === 100) return null;

  const rounded = Math.round(progress);

  return (
    <Html center zIndexRange={[100, 0]} style={{ pointerEvents: 'none' }}>
      <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-[#0d0f14]/95 border border-[#232734] shadow-2xl backdrop-blur-xl w-64 text-center select-none animate-fadeIn">
        <div className="w-10 h-10 rounded-xl bg-[#141720] border border-[#282e3e] flex items-center justify-center text-amber-400 mb-3 shadow-inner">
          <Activity className="w-5 h-5 animate-pulse text-amber-400" />
        </div>

        <div className="text-xs font-bold uppercase tracking-wider text-white mb-1">
          Loading 3D Anatomy
        </div>

        <div className="text-[10px] text-[#9ca3af] font-mono mb-3">
          Calibrating high-precision mesh
        </div>

        {/* Precision Progress Bar */}
        <div className="w-full bg-[#181a24] h-1.5 rounded-full overflow-hidden border border-[#242938]">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-200 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.6)]"
            style={{ width: `${Math.max(rounded, 5)}%` }}
          />
        </div>

        <div className="flex items-center justify-between w-full mt-2 text-[10px] font-mono text-[#6b7280]">
          <span>PBR MESH</span>
          <span className="text-amber-400 font-bold">{rounded}%</span>
        </div>
      </div>
    </Html>
  );
};


import React from 'react';
import { Activity } from 'lucide-react';

export const PageLoader: React.FC = () => {
  return (
    <div className="flex-1 min-h-[calc(100vh-4rem)] bg-[#090a0d] flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="w-14 h-14 rounded-2xl bg-[#12141b] border border-[#20242e] flex items-center justify-center text-amber-400 mb-4 shadow-2xl">
        <Activity className="w-7 h-7 animate-pulse text-amber-400" />
      </div>
      <h2 className="text-sm font-bold uppercase tracking-widest text-white mb-1.5">
        Loading Workstation
      </h2>
      <p className="text-xs text-[#9ca3af] font-mono">
        Streaming anatomical shader pipeline...
      </p>
    </div>
  );
};


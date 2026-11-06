import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import {
  Activity,
  Play,
  Pause,
  Tag,
  Menu,
  X,
  Compass
} from 'lucide-react';
import { MuscleViewer } from '../components/anatomy/MuscleViewer';
import { CameraControls } from '../components/anatomy/CameraControls';
import { ModelLoader } from '../components/anatomy/ModelLoader';
import { MuscleStructureData, CameraPreset } from '../types/anatomy';
import { anatomyApi } from '../services/anatomyApi';

export const MusclesPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialMuscleParam = searchParams.get('muscle');

  const [muscles, setMuscles] = useState<MuscleStructureData[]>([]);
  const [selectedMuscleId, setSelectedMuscleId] = useState<string | null>(initialMuscleParam || null);
  const [hoveredMuscleId, setHoveredMuscleId] = useState<string | null>(null);
  const [layerFilter, setLayerFilter] = useState<'all' | 'superficial' | 'deep'>('all');
  const [isContracting, setIsContracting] = useState<boolean>(true);
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('front');
  const [panelOpen, setPanelOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 768;
    }
    return false;
  });

  useEffect(() => {
    anatomyApi.getMuscles().then((data) => {
      setMuscles(data);
      if (initialMuscleParam) {
        setSelectedMuscleId(initialMuscleParam);
      }
    });
  }, [initialMuscleParam]);

  const selectedMuscle = muscles.find((m) => m.slug === selectedMuscleId) || null;

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] bg-[#090a0d] overflow-hidden flex">
      {/* Mobile panel toggle button */}
      <button
        onClick={() => setPanelOpen(!panelOpen)}
        className="md:hidden absolute top-4 left-4 z-30 p-2.5 rounded-xl bg-[#12141b]/95 border border-[#222633] text-rose-400 shadow-xl"
        title="Toggle Muscle List"
      >
        {panelOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Left Muscular Controls & Muscle Directory */}
      <div className={`absolute top-16 md:top-4 left-4 z-20 flex flex-col gap-2 max-w-xs w-[calc(100vw-2rem)] sm:w-auto transition-all ${
        panelOpen ? 'opacity-100 pointer-events-auto scale-100' : 'opacity-0 pointer-events-none scale-95 md:opacity-100 md:pointer-events-auto md:scale-100'
      }`}>
        <div className="p-4 rounded-2xl border border-[#222633] bg-[#12141b]/95 backdrop-blur-xl shadow-2xl space-y-3">
          <div className="flex items-center justify-between border-b border-[#1f232d] pb-2">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-rose-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                Muscular Explorer
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#181a24] border border-[#242936] text-slate-300">
              600+ Muscles
            </span>
          </div>

          {/* Layer Filter (Superficial vs Deep) */}
          <div className="flex rounded-xl bg-[#181a24] border border-[#242936] p-0.5 text-xs font-semibold">
            <button
              onClick={() => setLayerFilter('all')}
              className={`flex-1 py-1 rounded-lg transition-colors ${
                layerFilter === 'all' ? 'bg-rose-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Layers
            </button>
            <button
              onClick={() => setLayerFilter('superficial')}
              className={`flex-1 py-1 rounded-lg transition-colors ${
                layerFilter === 'superficial' ? 'bg-rose-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Superficial
            </button>
            <button
              onClick={() => setLayerFilter('deep')}
              className={`flex-1 py-1 rounded-lg transition-colors ${
                layerFilter === 'deep' ? 'bg-rose-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Deep
            </button>
          </div>

          {/* Contraction Simulation Toggle */}
          <button
            onClick={() => setIsContracting(!isContracting)}
            className={`w-full py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
              isContracting
                ? 'bg-rose-950/80 border-rose-700 text-rose-300 shadow-sm'
                : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
          >
            {isContracting ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isContracting ? 'Pause Muscle Contraction' : 'Simulate Contraction'}</span>
          </button>

          {/* Muscle quick list */}
          <div className="max-h-52 overflow-y-auto space-y-1 pt-1 pr-1">
            {muscles.map((muscle) => (
              <button
                key={muscle.slug}
                onClick={() => {
                  setSelectedMuscleId(muscle.slug);
                  if (window.innerWidth < 768) setPanelOpen(false);
                }}
                className={`w-full text-left p-2 rounded-lg text-xs transition-colors flex items-center justify-between border ${
                  selectedMuscleId === muscle.slug
                    ? 'bg-rose-950/80 text-rose-300 border-rose-700 shadow-sm'
                    : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:bg-slate-800'
                }`}
              >
                <span>{muscle.name}</span>
                <span className="text-[10px] text-slate-500 font-mono capitalize">
                  {muscle.region}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main 3D Canvas */}
      <div className="flex-1 h-full relative cursor-grab active:cursor-grabbing min-w-0">
        <Canvas
          shadows
          camera={{ position: [0, 0, 4.8], fov: 45 }}
          gl={{ antialias: true }}
        >
          <ambientLight intensity={0.9} color="#f8fafc" />
          <directionalLight position={[6, 10, 6]} intensity={1.8} castShadow color="#ffffff" />
          <directionalLight position={[-6, -2, -4]} intensity={0.65} color="#fffcf5" />

          <Suspense fallback={<ModelLoader />}>
            <MuscleViewer
              selectedMuscle={selectedMuscleId}
              onSelectMuscle={setSelectedMuscleId}
              hoveredMuscle={hoveredMuscleId}
              onHoverMuscle={setHoveredMuscleId}
              layerFilter={layerFilter}
              isContracting={isContracting}
              showLabels={showLabels}
            />
          </Suspense>

          <CameraControls
            preset={cameraPreset}
            distance={4.8}
            target={[0, 0, 0]}
          />
        </Canvas>

        {/* Top Right Labels Toggle */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={() => setShowLabels(!showLabels)}
            className={`p-2 rounded-lg border transition-colors ${
              showLabels
                ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                : 'bg-[#12141a] border-[#20242e] text-[#9ca3af] hover:text-white'
            }`}
            title="Toggle 3D Labels"
          >
            <Tag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Desktop Selected Muscle Inspector Panel */}
      {selectedMuscle && (
        <aside className="hidden md:block w-80 shrink-0 border-l border-[#20242e] bg-[#0d0f14]/98 p-5 overflow-y-auto space-y-4 shadow-2xl custom-scrollbar z-20">
          <div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#181b22] text-rose-400 border border-rose-500/30">
              {selectedMuscle.region} • {selectedMuscle.layer} layer
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight mt-1.5">
              {selectedMuscle.name}
            </h2>
            {selectedMuscle.latin_name && (
              <p className="text-xs italic text-rose-400 font-serif">
                {selectedMuscle.latin_name}
              </p>
            )}
          </div>

          <div>
            <h4 className="text-xs font-bold text-[#e5e7eb] uppercase tracking-wider mb-1">
              Muscle Action & Biomechanics
            </h4>
            <p className="text-xs text-[#d1d5db] leading-relaxed bg-[#14161f] p-3 rounded-lg border border-[#20242e] font-medium">
              {selectedMuscle.action}
            </p>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-lg bg-[#14161f] border border-[#20242e]">
              <span className="font-bold text-amber-400 block mb-0.5">Origin (Proximal Attachment):</span>
              <span className="text-[#d1d5db] leading-relaxed">{selectedMuscle.origin}</span>
            </div>

            <div className="p-3 rounded-lg bg-[#14161f] border border-[#20242e]">
              <span className="font-bold text-emerald-400 block mb-0.5">Insertion (Distal Attachment):</span>
              <span className="text-[#d1d5db] leading-relaxed">{selectedMuscle.insertion}</span>
            </div>

            <div className="p-3 rounded-lg bg-[#14161f] border border-[#20242e]">
              <span className="font-bold text-amber-400 block mb-0.5">Nerve Innervation:</span>
              <span className="text-[#d1d5db] leading-relaxed">{selectedMuscle.innervation}</span>
            </div>

            {selectedMuscle.antagonist && (
              <div className="p-3 rounded-lg bg-[#14161f] border border-[#20242e]">
                <span className="font-bold text-rose-400 block mb-0.5">Antagonist Muscle:</span>
                <span className="text-[#d1d5db] leading-relaxed">{selectedMuscle.antagonist}</span>
              </div>
            )}
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              Anatomical Context
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedMuscle.description}
            </p>
          </div>
        </aside>
      )}

      {/* Mobile Selected Muscle Bottom Sheet (< md) */}
      {selectedMuscle && (
        <div className="md:hidden fixed inset-x-0 bottom-0 z-40 bg-[#101218]/98 border-t border-[#232736] rounded-t-3xl p-4 shadow-2xl max-h-[60vh] overflow-y-auto space-y-3 animate-in slide-in-from-bottom duration-200 backdrop-blur-xl">
          <div className="flex items-center justify-between pb-2 border-b border-[#1f232d]">
            <div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#181b22] text-rose-400 border border-rose-500/30">
                {selectedMuscle.region} • {selectedMuscle.layer} layer
              </span>
              <h3 className="text-base font-bold text-white mt-1">{selectedMuscle.name}</h3>
            </div>
            <button
              onClick={() => setSelectedMuscleId(null)}
              className="p-1.5 rounded-xl bg-[#181b24] border border-[#272c3b] text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-[#d1d5db] leading-relaxed">{selectedMuscle.action}</p>
        </div>
      )}
    </div>
  );
};


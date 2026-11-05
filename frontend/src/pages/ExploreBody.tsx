import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import {
  Layers,
  Eye,
  RotateCcw,
  Compass,
  ArrowRight
} from 'lucide-react';
import { HumanBodyViewer } from '../components/anatomy/HumanBodyViewer';
import { CameraControls } from '../components/anatomy/CameraControls';
import { LayerVisibility, CameraPreset } from '../types/anatomy';

const BODY_TARGET: [number, number, number] = [0, 0, 0];

export const ExploreBody: React.FC = () => {
  const navigate = useNavigate();

  // Layer visibility state
  const [layers, setLayers] = useState<LayerVisibility>({
    skin: true,
    muscular: true,
    skeletal: true,
    circulatory: true,
    nervous: true,
    organs: true
  });

  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('isometric');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<'organ' | 'system' | 'bone' | 'muscle' | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const toggleLayer = (layer: keyof LayerVisibility) => {
    setLayers((prev) => ({ ...prev, [layer]: !prev[layer] }));
  };

  const handleSelectStructure = (id: string, type: 'organ' | 'system' | 'bone' | 'muscle') => {
    setSelectedId(id);
    setSelectedType(type);
  };

  const handleNavigateToSelected = () => {
    if (!selectedId) return;
    if (selectedType === 'organ') {
      navigate(`/organs/${selectedId}`);
    } else if (selectedType === 'bone') {
      navigate(`/skeleton?bone=${selectedId}`);
    } else if (selectedType === 'muscle') {
      navigate(`/muscles?muscle=${selectedId}`);
    } else if (selectedType === 'system') {
      navigate(`/systems`);
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] bg-[#090a0d] overflow-hidden flex">
      {/* Left Layer Visibility & Filters Floating Panel */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 max-w-xs">
        <div className="p-4 rounded-2xl border border-[#222633] bg-[#12141b]/95 backdrop-blur-xl shadow-2xl space-y-3">
          <div className="flex items-center justify-between border-b border-[#1f232d] pb-2">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                Anatomical Layers
              </span>
            </div>

            {/* Gender Toggle */}
            <div className="flex bg-[#181b24] border border-[#272c3b] rounded-xl p-0.5 text-[11px]">
              <button
                onClick={() => setGender('male')}
                className={`px-2.5 py-0.5 rounded-lg font-semibold transition-colors ${
                  gender === 'male' ? 'bg-[#222736] text-amber-300 border border-amber-500/30' : 'text-slate-400 hover:text-white'
                }`}
              >
                Male
              </button>
              <button
                onClick={() => setGender('female')}
                className={`px-2.5 py-0.5 rounded-lg font-semibold transition-colors ${
                  gender === 'female' ? 'bg-[#222736] text-amber-300 border border-amber-500/30' : 'text-slate-400 hover:text-white'
                }`}
              >
                Female
              </button>
            </div>
          </div>

          {/* Layer toggles */}
          <div className="space-y-1.5 text-xs">
            {[
              { id: 'skin', label: 'Integumentary (Skin)', color: 'border-slate-500/50 text-slate-300' },
              { id: 'muscular', label: 'Muscular System', color: 'border-red-500/50 text-red-400' },
              { id: 'skeletal', label: 'Skeletal System', color: 'border-slate-400/50 text-slate-300' },
              { id: 'circulatory', label: 'Circulatory (Vessels)', color: 'border-rose-500/50 text-rose-400' },
              { id: 'nervous', label: 'Nervous System', color: 'border-amber-500/50 text-amber-400' },
              { id: 'organs', label: 'Internal Organs', color: 'border-amber-500/50 text-amber-300' },
            ].map((layerItem) => {
              const key = layerItem.id as keyof LayerVisibility;
              const isVisible = layers[key];
              return (
                <button
                  key={layerItem.id}
                  onClick={() => toggleLayer(key)}
                  className={`w-full px-3 py-2 rounded-xl text-left font-medium transition-all flex items-center justify-between border ${
                    isVisible
                      ? 'bg-[#1a1d27] text-white border-amber-500/30 shadow-sm'
                      : 'bg-[#14161f]/50 text-slate-500 border-[#1c1f28]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${isVisible ? 'bg-amber-400' : 'bg-slate-700'}`} />
                    <span>{layerItem.label}</span>
                  </span>
                  <Eye className={`w-3.5 h-3.5 ${isVisible ? 'text-amber-400' : 'text-slate-600'}`} />
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-[#1f232d] flex items-center justify-between text-[11px] text-slate-400">
            <button
              onClick={() =>
                setLayers({
                  skin: true,
                  muscular: true,
                  skeletal: true,
                  circulatory: true,
                  nervous: true,
                  organs: true
                })
              }
              className="hover:text-amber-400 transition-colors"
            >
              Show All
            </button>
            <button
              onClick={() =>
                setLayers({
                  skin: false,
                  muscular: false,
                  skeletal: false,
                  circulatory: false,
                  nervous: false,
                  organs: true
                })
              }
              className="hover:text-amber-400 transition-colors"
            >
              Isolate Organs
            </button>
          </div>
        </div>
      </div>

      {/* Center 3D Human Body Canvas */}
      <div className="flex-1 w-full h-full relative cursor-grab active:cursor-grabbing">
        <Canvas
          shadows
          camera={{ position: [0, 0, 4.8], fov: 45 }}
          gl={{ antialias: true }}
        >
          {/* True-Color Studio Lighting */}
          <ambientLight intensity={0.9} color="#f8fafc" />
          <directionalLight position={[6, 10, 6]} intensity={1.8} castShadow color="#ffffff" />
          <directionalLight position={[-6, -2, -4]} intensity={0.65} color="#fffcf5" />
          <pointLight position={[0, 4, 3]} intensity={0.5} color="#ffffff" />

          <HumanBodyViewer
            layers={layers}
            selectedStructure={selectedId}
            onSelectStructure={handleSelectStructure}
            hoveredStructure={hoveredId}
            onHoverStructure={setHoveredId}
            gender={gender}
          />

          <CameraControls
            preset={cameraPreset}
            distance={4.8}
            target={BODY_TARGET}
          />
        </Canvas>

        {/* Selected Structure Info Overlay Card */}
        {selectedId && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-full max-w-md px-4">
            <div className="p-4 rounded-2xl border border-[#272c3b] bg-[#12141c]/95 shadow-2xl backdrop-blur-xl flex items-center justify-between gap-4 animate-fadeIn">
              <div>
                <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                  Selected Anatomical Structure
                </div>
                <div className="text-lg font-bold text-white capitalize">
                  {selectedId.replace(/_/g, ' ')}
                </div>
                <div className="text-xs text-slate-300">
                  Category: <span className="text-amber-300 capitalize">{selectedType}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleNavigateToSelected}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
                >
                  <span>Explore 3D Lab</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setSelectedId(null)}
                  className="px-2 py-2 rounded-xl bg-[#1d212c] text-slate-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        )}

        {/* View Presets HUD Bar */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 p-1.5 rounded-xl border border-[#232733] bg-[#12141c]/90 backdrop-blur-md text-xs text-slate-300">
          <Compass className="w-3.5 h-3.5 text-amber-400 ml-1.5 mr-1" />
          <button
            onClick={() => setCameraPreset('front')}
            className="px-2 py-1 rounded hover:bg-slate-800 transition-colors"
          >
            Front
          </button>
          <button
            onClick={() => setCameraPreset('back')}
            className="px-2 py-1 rounded hover:bg-slate-800 transition-colors"
          >
            Back
          </button>
          <button
            onClick={() => setCameraPreset('left')}
            className="px-2 py-1 rounded hover:bg-slate-800 transition-colors"
          >
            Left
          </button>
          <button
            onClick={() => setCameraPreset('right')}
            className="px-2 py-1 rounded hover:bg-slate-800 transition-colors"
          >
            Right
          </button>
          <button
            onClick={() => setCameraPreset('isometric')}
            className="p-1 rounded text-amber-400 hover:bg-[#1f2330] transition-colors"
            title="Reset View"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};


import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import {
  Bone,
  Split,
  CheckCircle2,
  AlertCircle,
  Tag
} from 'lucide-react';
import { SkeletonViewer } from '../components/anatomy/SkeletonViewer';
import { ModelLoader } from '../components/anatomy/ModelLoader';
import { BoneStructureData } from '../types/anatomy';
import { anatomyApi } from '../services/anatomyApi';

export const SkeletonPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialBoneParam = searchParams.get('bone');

  const [bones, setBones] = useState<BoneStructureData[]>([]);
  const [selectedBoneId, setSelectedBoneId] = useState<string | null>(initialBoneParam || 'femur');
  const [hoveredBoneId, setHoveredBoneId] = useState<string | null>(null);
  const [filterRegion, setFilterRegion] = useState<'all' | 'axial' | 'appendicular'>('all');
  const [explodeFactor, setExplodeFactor] = useState<number>(0);
  const [showLabels, setShowLabels] = useState<boolean>(true);

  useEffect(() => {
    anatomyApi.getSkeleton().then((data) => {
      setBones(data);
      if (initialBoneParam) {
        setSelectedBoneId(initialBoneParam);
      }
    });
  }, [initialBoneParam]);

  const selectedBone = bones.find((b) => b.slug === selectedBoneId) || null;

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] bg-[#090a0d] overflow-hidden flex">
      {/* Left Skeleton Controls & Bone List */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 max-w-xs">
        <div className="p-4 rounded-xl border border-[#20242e] bg-[#12141a]/95 backdrop-blur-md shadow-2xl space-y-3">
          <div className="flex items-center justify-between border-b border-[#20242e] pb-2">
            <div className="flex items-center gap-2">
              <Bone className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                Skeletal Explorer
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#181b22] text-[#9ca3af] border border-[#262a36]">
              206 Bones
            </span>
          </div>

          {/* Axial vs Appendicular Filter */}
          <div className="flex rounded-lg bg-[#181b22] border border-[#20242e] p-0.5 text-xs font-medium">
            <button
              onClick={() => setFilterRegion('all')}
              className={`flex-1 py-1 rounded-md transition-colors ${
                filterRegion === 'all' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 font-semibold' : 'text-[#9ca3af] hover:text-white'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterRegion('axial')}
              className={`flex-1 py-1 rounded-md transition-colors ${
                filterRegion === 'axial' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 font-semibold' : 'text-[#9ca3af] hover:text-white'
              }`}
            >
              Axial (80)
            </button>
            <button
              onClick={() => setFilterRegion('appendicular')}
              className={`flex-1 py-1 rounded-md transition-colors ${
                filterRegion === 'appendicular' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 font-semibold' : 'text-[#9ca3af] hover:text-white'
              }`}
            >
              Appendicular (126)
            </button>
          </div>

          {/* Explode Skeleton Slider */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#9ca3af] flex items-center gap-1.5">
                <Split className="w-3.5 h-3.5 text-amber-500" />
                Explode Skeleton:
              </span>
              <span className="text-amber-400 font-mono">{Math.round(explodeFactor * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={explodeFactor}
              onChange={(e) => setExplodeFactor(parseFloat(e.target.value))}
              className="w-full accent-amber-500 h-1.5 bg-[#181b22] rounded-lg cursor-pointer"
            />
          </div>

          {/* Bone quick list */}
          <div className="max-h-52 overflow-y-auto space-y-1 pt-1 pr-1 custom-scrollbar">
            {bones.map((bone) => (
              <button
                key={bone.slug}
                onClick={() => setSelectedBoneId(bone.slug)}
                className={`w-full text-left p-2 rounded-lg text-xs transition-colors flex items-center justify-between border ${
                  selectedBoneId === bone.slug
                    ? 'bg-amber-500/15 text-amber-300 border-amber-500/40 shadow-sm font-medium'
                    : 'bg-[#14161f] text-[#d1d5db] border-[#20242e] hover:bg-[#1a1d28]'
                }`}
              >
                <span>{bone.name}</span>
                <span className="text-[10px] text-[#6b7280] font-mono capitalize">
                  {bone.category}
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
          <ambientLight intensity={1.2} />
          <directionalLight position={[6, 8, 6]} intensity={1.8} castShadow />
          <directionalLight position={[-6, -4, -4]} intensity={0.6} color="#fffcf5" />

          <Suspense fallback={<ModelLoader />}>
            <SkeletonViewer
              selectedBone={selectedBoneId}
              onSelectBone={setSelectedBoneId}
              hoveredBone={hoveredBoneId}
              onHoverBone={setHoveredBoneId}
              filterRegion={filterRegion}
              explodeFactor={explodeFactor}
              showLabels={showLabels}
            />
          </Suspense>

          <OrbitControls
            enableDamping
            dampingFactor={0.12}
            rotateSpeed={0.38}
            zoomSpeed={0.28}
            panSpeed={0.4}
            minDistance={1.2}
            maxDistance={8.5}
            makeDefault
          />
        </Canvas>

        {/* Top Right Labels Toggle */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={() => setShowLabels(!showLabels)}
            className={`p-2 rounded-lg border transition-colors ${
              showLabels
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                : 'bg-[#12141a] border-[#20242e] text-[#9ca3af] hover:text-white'
            }`}
            title="Toggle 3D Labels"
          >
            <Tag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Right Selected Bone Inspector Panel */}
      {selectedBone && (
        <aside className="w-80 shrink-0 border-l border-[#20242e] bg-[#0d0f14]/98 p-5 overflow-y-auto space-y-4 shadow-2xl custom-scrollbar z-20">
          <div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#181b22] text-amber-400 border border-amber-500/30">
              {selectedBone.region} Skeleton • {selectedBone.category} Bone
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight mt-1.5">
              {selectedBone.name}
            </h2>
            {selectedBone.latin_name && (
              <p className="text-xs italic text-[#9ca3af] font-serif">
                {selectedBone.latin_name}
              </p>
            )}
          </div>

          <div>
            <h4 className="text-xs font-bold text-[#e5e7eb] uppercase tracking-wider mb-1">
              Anatomical Description
            </h4>
            <p className="text-xs text-[#d1d5db] leading-relaxed bg-[#14161f] p-3 rounded-xl border border-[#20242e]">
              {selectedBone.description}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-[#e5e7eb] uppercase tracking-wider mb-1">
              Primary Biomechanical Function
            </h4>
            <p className="text-xs text-[#d1d5db] leading-relaxed bg-[#14161f] p-3 rounded-xl border border-[#20242e]">
              {selectedBone.primary_function}
            </p>
          </div>

          {selectedBone.articulations && selectedBone.articulations.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1.5">
                Joint Articulations
              </h4>
              <ul className="space-y-1 text-xs text-[#d1d5db]">
                {selectedBone.articulations.map((art, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 p-2 rounded-lg bg-[#14161f] border border-[#20242e]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <span>{art}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {selectedBone.landmarks && selectedBone.landmarks.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-[#e5e7eb] uppercase tracking-wider mb-1.5">
                Key Anatomical Landmarks
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedBone.landmarks.map((mark, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md text-[11px] bg-[#181b22] border border-[#262a36] text-[#d1d5db] font-medium"
                  >
                    {mark}
                  </span>
                ))}
              </div>
            </div>
          )}

          {selectedBone.clinical_notes && (
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-1 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-amber-400">
                <AlertCircle className="w-4 h-4" />
                <span>Clinical Notes</span>
              </div>
              <p className="text-[#d1d5db] leading-relaxed">
                {selectedBone.clinical_notes}
              </p>
            </div>
          )}
        </aside>
      )}
    </div>
  );
};


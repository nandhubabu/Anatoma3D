import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import {
  Heart,
  Brain,
  Bone,
  Activity,
  Wind,
  Utensils,
  Droplet,
  Zap,
  Shield,
  Layers,
  Users,
  Award,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import { BodySystemData } from '../types/anatomy';
import { anatomyApi } from '../services/anatomyApi';
import { Heart3D } from '../components/anatomy/Heart3D';
import { Brain3D } from '../components/anatomy/Brain3D';
import { Lungs3D } from '../components/anatomy/Lungs3D';
import { Kidneys3D } from '../components/anatomy/Kidneys3D';
import { Stomach3D } from '../components/anatomy/Stomach3D';
import { SkeletonViewer } from '../components/anatomy/SkeletonViewer';
import { MuscleViewer } from '../components/anatomy/MuscleViewer';

const SYSTEM_ICONS: Record<string, React.ElementType> = {
  cardiovascular: Heart,
  nervous: Brain,
  skeletal: Bone,
  muscular: Activity,
  respiratory: Wind,
  digestive: Utensils,
  urinary: Droplet,
  endocrine: Zap,
  lymphatic: Shield,
  integumentary: Layers,
  reproductive: Users,
  immune: Award
};

export const BodySystems: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const [systems, setSystems] = useState<BodySystemData[]>([]);
  const [activeSlug, setActiveSlug] = useState<string>(slug || 'cardiovascular');

  useEffect(() => {
    anatomyApi.getSystems().then((data) => {
      setSystems(data);
      if (slug && data.some((s) => s.slug === slug)) {
        setActiveSlug(slug);
      }
    });
  }, [slug]);

  const activeSystem = systems.find((s) => s.slug === activeSlug) || systems[0];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#090a0d] text-[#e5e7eb] flex flex-col">
      {/* Top System Selector Carousel */}
      <div className="border-b border-[#20242e] bg-[#0d0f14]/95 px-4 py-3 sticky top-16 z-30 backdrop-blur-md overflow-x-auto custom-scrollbar">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          {systems.map((sys) => {
            const Icon = SYSTEM_ICONS[sys.slug] || Heart;
            const isActive = sys.slug === activeSlug;
            return (
              <button
                key={sys.slug}
                onClick={() => setActiveSlug(sys.slug)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-amber-500/20 text-amber-400 border-amber-500/50 shadow-sm'
                    : 'bg-[#14161f] text-[#9ca3af] border-[#20242e] hover:bg-[#1a1d28] hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{sys.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {activeSystem ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-8">
          {/* Main System Banner & 3D Interactive Visualization */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left System Info */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-[#181b22] text-amber-400 border border-amber-500/30">
                  Human Body System
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
                  {activeSystem.name}
                </h1>
                {activeSystem.latin_name && (
                  <p className="text-sm italic text-[#9ca3af] font-serif mt-0.5">
                    {activeSystem.latin_name}
                  </p>
                )}
              </div>

              <p className="text-sm sm:text-base text-[#d1d5db] leading-relaxed">
                {activeSystem.full_overview}
              </p>

              {/* Key Functions */}
              <div>
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2.5">
                  Core System Functions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeSystem.key_functions?.map((func, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-[#14161f] border border-[#20242e] text-xs text-[#d1d5db] flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>{func}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Main Organs within this System */}
              <div>
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2.5">
                  Primary Organs & Structures
                </h3>
                <div className="flex flex-wrap gap-2">
                  {activeSystem.main_organs?.map((organName, idx) => {
                    const organSlug = organName.toLowerCase().replace(/\s+/g, '_');
                    return (
                      <Link
                        key={idx}
                        to={`/organs/${organSlug === 'heart' ? 'heart' : organSlug === 'brain' ? 'brain' : organSlug === 'lungs' ? 'lungs' : 'heart'}`}
                        className="px-3 py-1.5 rounded-lg bg-[#14161f] hover:bg-[#1a1d28] border border-[#20242e] hover:border-amber-500/40 text-[#d1d5db] hover:text-amber-400 text-xs font-semibold transition-colors flex items-center gap-1.5 group"
                      >
                        <span>{organName}</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform text-amber-500" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right 3D Interactive Model Preview */}
            <div className="lg:col-span-5 relative">
              <div className="w-full h-[420px] rounded-2xl border border-[#20242e] bg-[#0c0e12] overflow-hidden shadow-2xl relative">
                <Canvas
                  shadows
                  camera={{ position: [0, 0, 4.2], fov: 45 }}
                  gl={{ antialias: true }}
                >
                  <ambientLight intensity={1.2} />
                  <directionalLight position={[5, 8, 5]} intensity={1.8} castShadow />
                  <directionalLight position={[-5, -4, -4]} intensity={0.6} color="#fffcf5" />

                  {/* Render 3D preview model based on active system */}
                  {activeSystem.slug === 'cardiovascular' && (
                    <Heart3D
                      mode="external"
                      cuttingConfig={{ active: false, axis: 'x', position: 0, invert: false }}
                      explodeFactor={0}
                      isBeating={true}
                      beatSpeed={1.0}
                      showBloodFlow={true}
                      showLabels={false}
                    />
                  )}
                  {activeSystem.slug === 'nervous' && (
                    <Brain3D
                      mode="external"
                      cuttingConfig={{ active: false, axis: 'x', position: 0, invert: false }}
                      explodeFactor={0}
                      showLabels={false}
                    />
                  )}
                  {activeSystem.slug === 'skeletal' && (
                    <SkeletonViewer
                      filterRegion="all"
                      explodeFactor={0}
                      showLabels={false}
                    />
                  )}
                  {activeSystem.slug === 'muscular' && (
                    <MuscleViewer
                      layerFilter="all"
                      isContracting={true}
                      showLabels={false}
                    />
                  )}
                  {activeSystem.slug === 'respiratory' && (
                    <Lungs3D
                      mode="external"
                      cuttingConfig={{ active: false, axis: 'x', position: 0, invert: false }}
                      explodeFactor={0}
                      showLabels={false}
                    />
                  )}
                  {activeSystem.slug === 'digestive' && (
                    <Stomach3D
                      mode="external"
                      cuttingConfig={{ active: false, axis: 'x', position: 0, invert: false }}
                      explodeFactor={0}
                      showLabels={false}
                    />
                  )}
                  {activeSystem.slug === 'urinary' && (
                    <Kidneys3D
                      mode="external"
                      cuttingConfig={{ active: false, axis: 'x', position: 0, invert: false }}
                      explodeFactor={0}
                      showLabels={false}
                    />
                  )}
                  {['endocrine', 'lymphatic', 'integumentary', 'reproductive', 'immune'].includes(activeSystem.slug) && (
                    <Heart3D
                      mode="external"
                      cuttingConfig={{ active: false, axis: 'x', position: 0, invert: false }}
                      explodeFactor={0}
                      isBeating={false}
                      showBloodFlow={false}
                      showLabels={false}
                    />
                  )}

                  <OrbitControls
                    enableDamping
                    dampingFactor={0.12}
                    rotateSpeed={0.38}
                    zoomSpeed={0.28}
                    panSpeed={0.4}
                    autoRotate
                    autoRotateSpeed={0.7}
                    minDistance={1.8}
                    maxDistance={8}
                  />
                </Canvas>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-[#9ca3af] bg-[#12141a]/95 p-2 rounded-lg backdrop-blur-md border border-[#20242e]">
                  <span>Interactive 3D Anatomy Preview</span>
                  <Link
                    to={`/organs/${activeSystem.slug === 'nervous' ? 'brain' : activeSystem.slug === 'respiratory' ? 'lungs' : activeSystem.slug === 'skeletal' ? '../skeleton' : activeSystem.slug === 'muscular' ? '../muscles' : 'heart'}`}
                    className="text-amber-400 font-semibold hover:underline"
                  >
                    Open Full 3D Lab →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Interrelationships with Other Systems & Clinical Correlates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#20242e]">
            {/* System Interrelationships */}
            <div className="p-6 rounded-xl border border-[#20242e] bg-[#12141a] space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-amber-500" />
                Interrelationships with Other Systems
              </h3>
              <div className="space-y-2.5">
                {activeSystem.interrelationships?.map((rel, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-[#14161f] border border-[#20242e] text-xs">
                    <span className="font-bold text-amber-400">{rel.system}: </span>
                    <span className="text-[#d1d5db] leading-relaxed">{rel.relationship}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Clinical Correlates & Pathology */}
            <div className="p-6 rounded-xl border border-[#20242e] bg-[#12141a] space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                Clinical Notes & Pathophysiology
              </h3>
              <div className="space-y-2.5">
                {activeSystem.clinical_notes?.map((note, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs text-[#d1d5db] leading-relaxed">
                    {note}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Learning Objectives & Quiz Jump */}
          <div className="p-6 rounded-xl border border-[#20242e] bg-[#12141a] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-base font-bold text-white">
                Test Your Knowledge on the {activeSystem.name}
              </h4>
              <p className="text-xs text-[#9ca3af]">
                Practice multi-level multiple choice questions and identify structures in interactive 3D!
              </p>
            </div>

            <Link
              to={`/quiz?topic=${activeSystem.slug === 'cardiovascular' ? 'heart' : activeSystem.slug === 'nervous' ? 'brain' : activeSystem.slug}`}
              className="px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs shadow-lg shadow-amber-500/20 transition-all hover:scale-105 whitespace-nowrap"
            >
              Start System Quiz →
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
};


import React, { useState, useEffect, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import {
  Heart,
  Brain,
  Wind,
  Droplet,
  Utensils,
  Layers,
  Sparkles,
  ArrowRight,
  Crosshair,
  Activity,
  Scissors,
  Split,
  Eye,
  Bone,
  Gauge
} from 'lucide-react';
import { Heart3D } from '../components/anatomy/Heart3D';
import { Brain3D } from '../components/anatomy/Brain3D';
import { Lungs3D } from '../components/anatomy/Lungs3D';
import { Kidneys3D } from '../components/anatomy/Kidneys3D';
import { Stomach3D } from '../components/anatomy/Stomach3D';
import { MuscleViewer } from '../components/anatomy/MuscleViewer';
import { SkeletonViewer } from '../components/anatomy/SkeletonViewer';
import { ModelLoader } from '../components/anatomy/ModelLoader';
import { BodySystemData } from '../types/anatomy';
import { anatomyApi } from '../services/anatomyApi';

// Preload primary hero model for instantaneous rendering
try {
  useGLTF.preload('/models/heart_hubmap.glb');
} catch (e) {
  // Silent fail if offline or running in mock env
}

type ShowcaseTab = 'heart' | 'brain' | 'lungs' | 'kidneys' | 'stomach' | 'muscles' | 'skeleton';

export const Home: React.FC = () => {
  const [systems, setSystems] = useState<BodySystemData[]>([]);
  const [showcaseTab, setShowcaseTab] = useState<ShowcaseTab>('heart');
  const [activeHeartBeating, setActiveHeartBeating] = useState(true);

  useEffect(() => {
    anatomyApi.getSystems().then((data) => setSystems(data));
  }, []);

  const featuredSuites = [
    {
      slug: 'heart',
      name: 'Human Heart & Great Vessels',
      latinName: 'Cor humanum',
      system: 'Cardiovascular',
      cavity: 'Middle Mediastinum (Thoracic)',
      mass: '280 – 340 grams',
      micro: '14 Anatomical Meshes + 10 Great Vessels',
      desc: 'Complete 4-chamber cardiac architecture with dual-circuit blood circulation, coronary arterial tree, and dynamic systolic/diastolic contraction.',
      icon: Heart,
      color: 'bg-rose-950/40 border-rose-800/40 text-rose-400'
    },
    {
      slug: 'brain',
      name: 'Human Brain & Cortical Lobes',
      latinName: 'Encephalon',
      system: 'Nervous',
      cavity: 'Cranial Cavity',
      mass: '1,300 – 1,400 grams',
      micro: '283 Cortical & Subcortical Nuclei',
      desc: 'Allen Institute 3D reconstruction segmenting frontal, temporal, parietal, and occipital lobes, cerebellum, brainstem, and deep ventricular pathways.',
      icon: Brain,
      color: 'bg-amber-950/40 border-amber-800/40 text-amber-400'
    },
    {
      slug: 'lungs',
      name: 'Lungs & Bronchial Tree',
      latinName: 'Pulmones et Trachea',
      system: 'Respiratory',
      cavity: 'Pleural Cavities (Thorax)',
      mass: '1,000 – 1,100 grams (combined)',
      micro: '300 Million Alveolar Units',
      desc: 'Photorealistic PBR tracheobronchial arborization, cartilaginous rings, primary bronchi, right (3 lobes) and left (2 lobes) lung tissue with tidal breathing.',
      icon: Wind,
      color: 'bg-sky-950/40 border-sky-800/40 text-sky-400'
    },
    {
      slug: 'kidneys',
      name: 'Kidneys & Renal Vasculature',
      latinName: 'Renes et Vasa renalia',
      system: 'Urinary',
      cavity: 'Retroperitoneal Space (T12 – L3)',
      mass: '130 – 150 grams each',
      micro: '1.25 Million Nephrons per Kidney',
      desc: 'Visible Human dissection revealing translucent fibrous capsule, vascular cortex, dark medullary pyramids, columns of Bertin, renal pelvis, and renal vessels.',
      icon: Droplet,
      color: 'bg-rose-950/40 border-rose-800/40 text-rose-400'
    },
    {
      slug: 'stomach',
      name: 'Stomach & Gastrointestinal Lumen',
      latinName: 'Gaster et Tractus digestivus',
      system: 'Digestive',
      cavity: 'Epigastric & Left Hypochondriac',
      mass: '50 mL resting (expands to 2.0 L)',
      micro: 'Mucosa, Submucosa, 3 Muscular Layers',
      desc: 'Photorealistic 3D digestive model detailing cardiac orifice, fundus, gastric body with mucosal rugae folds, pyloric antrum, sphincter, and duodenal loop.',
      icon: Utensils,
      color: 'bg-emerald-950/40 border-emerald-800/40 text-emerald-400'
    },
    {
      slug: 'liver',
      name: 'Liver & Biliary Apparatus',
      latinName: 'Hepar et Vesica biliaris',
      system: 'Digestive',
      cavity: 'Right Hypochondrium & Epigastrium',
      mass: '1.4 – 1.8 kilograms',
      micro: 'Couinaud Segments & Portal Triads',
      desc: 'High-resolution hepatic architecture with Right and Left lobes, quadrate and caudate lobes, gallbladder, IVC, proper hepatic artery, and portal vein.',
      icon: Sparkles,
      color: 'bg-amber-950/40 border-amber-800/40 text-amber-500'
    }
  ];

  return (
    <div className="min-h-screen bg-[#090a0d] text-slate-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      {/* Precision Surgical Command Hero */}
      <section className="relative overflow-hidden border-b border-[#1c1f28] bg-[#0c0e14] pt-12 pb-20 lg:pt-16 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Strategic Copy & Controls */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#161821] border border-[#262b38] text-amber-300 text-xs font-semibold shadow-sm">
                <Crosshair className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
                <span>Precision 3D Anatomical Dissection & Virtual Clinical Suite</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Master Human Anatomy in{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-amber-300">
                  Full 3D Precision
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                A professional interactive digital anatomy workstation. Inspect photorealistic PBR anatomical structures from the outside and inside, slice open cross-sections with the virtual scalpel, deconstruct organs in exploded view, and discover exact physiological mechanisms down to microscopic details.
              </p>

              {/* Primary Launch Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/explore"
                  className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-sm font-bold shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 group"
                >
                  <Layers className="w-4 h-4 text-slate-950 group-hover:scale-110 transition-transform" />
                  <span>Launch 3D Body Explorer</span>
                  <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/organs/heart"
                  className="px-5 py-3 rounded-2xl bg-[#14161f] hover:bg-[#1c202a] border border-[#252936] text-slate-200 hover:text-white text-sm font-semibold transition-all flex items-center gap-2"
                >
                  <Heart className="w-4 h-4 text-rose-400 animate-pulse" />
                  <span>Enter Cardiac Lab</span>
                </Link>
              </div>

              {/* Technical Metrics */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#1e222d]">
                <div className="p-3 rounded-2xl bg-[#12141b] border border-[#202430]">
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Mapped Meshes</div>
                  <div className="text-xl font-extrabold text-amber-400">1,200+</div>
                  <div className="text-[10px] text-slate-400">Sub-mm precision</div>
                </div>
                <div className="p-3 rounded-2xl bg-[#12141b] border border-[#202430]">
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Skeletal Units</div>
                  <div className="text-xl font-extrabold text-white">206 Bones</div>
                  <div className="text-[10px] text-slate-400">Axial & appendicular</div>
                </div>
                <div className="p-3 rounded-2xl bg-[#12141b] border border-[#202430]">
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Muscles</div>
                  <div className="text-xl font-extrabold text-rose-400">462 Meshes</div>
                  <div className="text-[10px] text-slate-400">With contraction</div>
                </div>
              </div>
            </div>

            {/* Right Live 3D Interactive Workbench */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl bg-[#11131a] border border-[#222633] shadow-2xl overflow-hidden">
                {/* Showcase Model Selector Tabs */}
                <div className="flex items-center gap-1 p-2 bg-[#0e1015] border-b border-[#1c1f28] overflow-x-auto scrollbar-none">
                  {[
                    { id: 'heart', label: 'Heart', icon: Heart },
                    { id: 'brain', label: 'Brain', icon: Brain },
                    { id: 'lungs', label: 'Lungs', icon: Wind },
                    { id: 'kidneys', label: 'Kidneys', icon: Droplet },
                    { id: 'stomach', label: 'Stomach', icon: Utensils },
                    { id: 'muscles', label: 'Muscles', icon: Activity },
                    { id: 'skeleton', label: 'Skeleton', icon: Bone }
                  ].map((tab) => {
                    const TabIcon = tab.icon;
                    const isActive = showcaseTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setShowcaseTab(tab.id as ShowcaseTab)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                          isActive
                            ? 'bg-[#1e222e] text-white border border-amber-500/40 shadow-sm'
                            : 'text-slate-400 hover:text-white hover:bg-[#151720] border border-transparent'
                        }`}
                      >
                        <TabIcon className="w-3.5 h-3.5 text-amber-400" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* 3D Canvas Area with True-Color Studio Lighting */}
                <div className="h-[430px] w-full relative bg-[#090a0d] cursor-grab active:cursor-grabbing">
                  <Canvas
                    camera={{ position: [0, 0, 4.2], fov: 45 }}
                    gl={{ localClippingEnabled: true, antialias: true }}
                  >
                    <ambientLight intensity={0.85} color="#f8fafc" />
                    <directionalLight position={[6, 10, 6]} intensity={1.8} color="#ffffff" />
                    <directionalLight position={[-6, -2, -4]} intensity={0.7} color="#fffcf5" />
                    <pointLight position={[0, 5, 2]} intensity={0.5} color="#ffffff" />

                    <Suspense fallback={<ModelLoader />}>
                      {showcaseTab === 'heart' && (
                        <Heart3D
                          mode="external"
                          cuttingConfig={{ active: false, axis: 'x', position: 0, invert: false }}
                          explodeFactor={0}
                          isBeating={activeHeartBeating}
                          beatSpeed={1.0}
                          showBloodFlow={true}
                          showLabels={false}
                        />
                      )}

                      {showcaseTab === 'brain' && (
                        <Brain3D
                          mode="external"
                          cuttingConfig={{ active: false, axis: 'x', position: 0, invert: false }}
                          explodeFactor={0}
                          showLabels={false}
                        />
                      )}

                      {showcaseTab === 'lungs' && (
                        <Lungs3D
                          mode="external"
                          cuttingConfig={{ active: false, axis: 'x', position: 0, invert: false }}
                          explodeFactor={0}
                          showLabels={false}
                        />
                      )}

                      {showcaseTab === 'kidneys' && (
                        <Kidneys3D
                          mode="external"
                          cuttingConfig={{ active: false, axis: 'x', position: 0, invert: false }}
                          explodeFactor={0}
                          showLabels={false}
                        />
                      )}

                      {showcaseTab === 'stomach' && (
                        <Stomach3D
                          mode="external"
                          cuttingConfig={{ active: false, axis: 'x', position: 0, invert: false }}
                          explodeFactor={0}
                          showLabels={false}
                        />
                      )}

                      {showcaseTab === 'muscles' && (
                        <MuscleViewer
                          isContracting={true}
                          showLabels={false}
                        />
                      )}

                      {showcaseTab === 'skeleton' && (
                        <SkeletonViewer
                          filterRegion="all"
                          explodeFactor={0}
                          showLabels={false}
                        />
                      )}
                    </Suspense>

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

                  {/* Showcase Live Overlay HUD */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <div className="px-2.5 py-1 rounded-xl bg-[#12141c]/90 border border-[#222633] text-[11px] font-semibold text-slate-300 flex items-center gap-1.5 shadow-md">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span>Live 3D Anatomical Renderer</span>
                    </div>

                    <Link
                      to={
                        showcaseTab === 'skeleton'
                          ? '/skeleton'
                          : showcaseTab === 'muscles'
                          ? '/muscles'
                          : `/organs/${showcaseTab}`
                      }
                      className="pointer-events-auto px-3 py-1 rounded-xl bg-[#1b1e28] hover:bg-[#232734] border border-[#2b3040] text-amber-300 text-xs font-semibold shadow-md transition-all flex items-center gap-1"
                    >
                      <span>Open Full Lab</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  {/* Bottom Controls */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none text-[11px] text-slate-400">
                    <div className="px-2.5 py-1 rounded-xl bg-[#12141c]/90 border border-[#222633]">
                      Drag to orbit • Scroll to zoom • Click to inspect
                    </div>
                    {showcaseTab === 'heart' && (
                      <button
                        onClick={() => setActiveHeartBeating(!activeHeartBeating)}
                        className="pointer-events-auto px-2.5 py-1 rounded-xl bg-[#161822] hover:bg-[#202430] border border-[#262a37] text-slate-200 font-semibold transition-colors"
                      >
                        {activeHeartBeating ? 'Pause Pulse' : 'Resume Pulse'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Virtual Surgical Tools & Interaction Modes Showcase */}
      <section className="py-16 border-b border-[#1c1f28] bg-[#0c0d12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Virtual Dissection Suite & Interactive Modes
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Every organ features full interactive controls enabling students and clinicians to understand human morphology from macro structure down to cellular mechanisms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-[#12141b] border border-[#202430] hover:border-amber-500/40 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-[#181a23] border border-[#262a38] flex items-center justify-center text-rose-400 mb-4 group-hover:scale-110 transition-transform">
                <Scissors className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Virtual Scalpel (Cut View)</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Slice through any organ in real-time along Sagittal (X), Transverse (Y), or Coronal (Z) cross-section planes with depth control to examine internal chambers and valves.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#12141b] border border-[#202430] hover:border-amber-500/40 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-[#181a23] border border-[#262a38] flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
                <Split className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Exploded Deconstruction</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Disperse individual anatomical components along natural anatomical trajectories to understand how chambers, vessels, and tissues assemble.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#12141b] border border-[#202430] hover:border-amber-500/40 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-[#181a23] border border-[#262a38] flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Luminous Isolation & X-Ray</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Select any sub-structure to isolate it while fading adjacent tissues into subtle ghost silhouettes, or adjust X-Ray transparency to reveal deep vasculature.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#12141b] border border-[#202430] hover:border-amber-500/40 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-[#181a23] border border-[#262a38] flex items-center justify-center text-rose-400 mb-4 group-hover:scale-110 transition-transform">
                <Gauge className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Physiological Simulation</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Observe live biological kinetics: rhythmic cardiac systole/diastole, arterial/venous dual blood flow, respiratory breathing, and muscular contraction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Direct Interactive Organ Laboratories */}
      <section className="py-20 border-b border-[#1c1f28] bg-[#090a0d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="text-xs font-semibold text-amber-400 tracking-wider uppercase">Interactive Organ Exploration</div>
              <h2 className="text-3xl font-extrabold text-white tracking-tight mt-1">
                Dedicated Organ Laboratories
              </h2>
              <p className="mt-1 text-sm text-slate-400 max-w-xl">
                Every organ features an independent, scientifically detailed 3D environment with small and precise architectural specifications.
              </p>
            </div>

            <Link
              to="/explore"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors self-start md:self-auto"
            >
              <span>Explore complete human body in 3D</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredSuites.map((organ) => {
              const OrganIcon = organ.icon;
              return (
                <div
                  key={organ.slug}
                  className="rounded-3xl bg-[#12141b] border border-[#202430] hover:border-amber-500/40 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-2xl ${organ.color} border`}>
                        <OrganIcon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase px-2.5 py-1 rounded-full bg-[#161822] border border-[#252936]">
                        {organ.system}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                        {organ.name}
                      </h3>
                      <div className="text-xs italic text-slate-400 font-serif">{organ.latinName}</div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">{organ.desc}</p>

                    <div className="pt-3 border-t border-[#1d212c] space-y-2 text-[11px]">
                      <div className="flex justify-between text-slate-400">
                        <span>Anatomical Cavity:</span>
                        <span className="font-medium text-slate-200">{organ.cavity}</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Adult Mass:</span>
                        <span className="font-medium text-slate-200">{organ.mass}</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Micro Architecture:</span>
                        <span className="font-medium text-amber-300">{organ.micro}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#1d212c] flex items-center justify-between gap-2">
                    <Link
                      to={`/organs/${organ.slug}`}
                      className="flex-1 py-2 rounded-xl bg-[#1b1e28] hover:bg-[#232734] border border-[#282d3b] text-amber-300 text-xs font-semibold text-center transition-all"
                    >
                      Enter 3D Lab
                    </Link>
                    <Link
                      to={`/organs/${organ.slug}?mode=cut`}
                      className="px-3 py-2 rounded-xl bg-[#161821] hover:bg-[#1e222d] border border-[#252936] text-slate-300 hover:text-white text-xs font-semibold transition-all"
                      title="Direct Cut / Section View"
                    >
                      <Scissors className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      to={`/organs/${organ.slug}?mode=exploded`}
                      className="px-3 py-2 rounded-xl bg-[#161821] hover:bg-[#1e222d] border border-[#252936] text-slate-300 hover:text-white text-xs font-semibold transition-all"
                      title="Direct Exploded View"
                    >
                      <Split className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 12 Human Body Systems Matrix */}
      <section className="py-20 bg-[#0c0d12] border-b border-[#1c1f28]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs font-semibold text-amber-400 tracking-wider uppercase">Systemic Physiological Matrix</div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight mt-1">
              12 Human Body Systems
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Understand how individual organs integrate within macro-physiological feedback loops, hormone cascades, and neuromuscular signaling.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {systems.map((system) => (
              <Link
                key={system.slug}
                to={`/systems/${system.slug}`}
                className="p-4 rounded-2xl bg-[#12141b] hover:bg-[#161822] border border-[#1f232d] hover:border-amber-500/40 transition-all duration-200 group flex flex-col justify-between"
              >
                <div>
                  <div className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors flex items-center justify-between">
                    <span>{system.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                  </div>
                  <div className="text-[11px] italic text-slate-400 font-serif mt-0.5">{system.latin_name}</div>
                  <p className="text-[11px] text-slate-300 line-clamp-2 mt-2 leading-relaxed">
                    {system.short_desc}
                  </p>
                </div>

                <div className="mt-4 pt-2.5 border-t border-[#1c1f28] flex items-center justify-between text-[10px] text-slate-400 font-medium">
                  <span>{system.main_organs?.length || 6} Primary Organs</span>
                  <span className="text-amber-400 font-semibold group-hover:underline">Explore 3D →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

import React, { useState, useEffect, useRef, useMemo, Suspense } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import {
  Heart,
  Brain,
  Wind,
  Droplet,
  Utensils,
  ArrowLeft,
  Activity
} from 'lucide-react';
import { Heart3D } from '../components/anatomy/Heart3D';
import { Brain3D } from '../components/anatomy/Brain3D';
import { Lungs3D } from '../components/anatomy/Lungs3D';
import { Kidneys3D } from '../components/anatomy/Kidneys3D';
import { Stomach3D } from '../components/anatomy/Stomach3D';
import { Liver3D } from '../components/anatomy/Liver3D';
import { GenericOrgan3D } from '../components/anatomy/GenericOrgan3D';
import { OrganToolbar } from '../components/interface/OrganToolbar';
import { OrganInfoPanel } from '../components/interface/OrganInfoPanel';
import { CameraControls } from '../components/anatomy/CameraControls';
import { AnatomicalPins } from '../components/anatomy/AnatomicalPins';
import { ModelLoader } from '../components/anatomy/ModelLoader';
import {
  ExplorationMode,
  CuttingPlaneConfig,
  CameraPreset,
  OrganData,
  OrganSubcomponent
} from '../types/anatomy';
import { anatomyApi } from '../services/anatomyApi';

// Landmark pins database for instant high-yield anatomical orientation
const ORGAN_LANDMARK_PINS: Record<string, { id: string; name: string; latinName?: string; pos: [number, number, number] }[]> = {
  heart: [
    { id: 'left_ventricle', name: 'Left Ventricle', latinName: 'Ventriculus sinister', pos: [-0.45, -0.25, 0.35] },
    { id: 'right_ventricle', name: 'Right Ventricle', latinName: 'Ventriculus dexter', pos: [0.4, -0.3, 0.4] },
    { id: 'aorta', name: 'Ascending Aorta', latinName: 'Aorta ascendens', pos: [-0.1, 0.9, -0.1] },
    { id: 'pulmonary_trunk', name: 'Pulmonary Trunk', latinName: 'Truncus pulmonalis', pos: [0.15, 0.55, 0.35] },
    { id: 'superior_vena_cava', name: 'Superior Vena Cava', latinName: 'Vena cava superior', pos: [0.6, 0.8, -0.2] }
  ],
  brain: [
    { id: 'frontal_lobe', name: 'Frontal Lobe', latinName: 'Lobus frontalis', pos: [0, 0.45, 0.8] },
    { id: 'parietal_lobe', name: 'Parietal Lobe', latinName: 'Lobus parietalis', pos: [0, 0.8, -0.15] },
    { id: 'occipital_lobe', name: 'Occipital Lobe', latinName: 'Lobus occipitalis', pos: [0, 0.2, -0.85] },
    { id: 'temporal_lobe', name: 'Temporal Lobe', latinName: 'Lobus temporalis', pos: [0.85, 0.05, 0.15] },
    { id: 'cerebellum', name: 'Cerebellum', latinName: 'Cerebellum', pos: [0, -0.55, -0.75] },
    { id: 'brainstem', name: 'Brainstem', latinName: 'Truncus encephali', pos: [0, -0.9, -0.2] }
  ],
  lungs: [
    { id: 'trachea', name: 'Trachea & Carina', latinName: 'Trachea', pos: [0, 0.85, 0] },
    { id: 'right_lung', name: 'Right Lung (3 Lobes)', latinName: 'Pulmo dexter', pos: [0.65, 0.1, 0.1] },
    { id: 'left_lung', name: 'Left Lung (Cardiac Notch)', latinName: 'Pulmo sinister', pos: [-0.65, 0.1, 0.1] },
    { id: 'alveoli', name: 'Alveolar Units', latinName: 'Alveoli pulmonis', pos: [0.35, -0.4, 0.2] }
  ],
  kidneys: [
    { id: 'renal_cortex', name: 'Renal Cortex', latinName: 'Cortex renalis', pos: [-0.75, 0.2, 0.0] },
    { id: 'renal_medulla', name: 'Renal Pyramids', latinName: 'Medulla renalis', pos: [-0.25, 0.0, 0.0] },
    { id: 'renal_pelvis', name: 'Renal Pelvis', latinName: 'Pelvis renalis', pos: [0.1, 0.05, 0.0] },
    { id: 'renal_artery', name: 'Left Renal Artery', latinName: 'Arteria renalis sinistra', pos: [0.55, 0.2, 0.05] },
    { id: 'renal_vein', name: 'Left Renal Vein', latinName: 'Vena renalis sinistra', pos: [0.55, -0.1, 0.1] }
  ],
  stomach: [
    { id: 'cardia_fundus', name: 'Gastric Fundus', latinName: 'Fundus gastricus', pos: [0.3, 0.8, 0.2] },
    { id: 'gastric_body', name: 'Gastric Corpus', latinName: 'Corpus gastricum', pos: [-0.3, 0.0, 0.5] },
    { id: 'pylorus_antrum', name: 'Pyloric Antrum & Canal', latinName: 'Antrum pyloricum', pos: [-0.7, -0.6, -0.2] }
  ],
  liver: [
    { id: 'right_lobe', name: 'Hepatic Parenchyma', latinName: 'Lobus hepatis dexter', pos: [0, 0.4, 0] },
    { id: 'gallbladder', name: 'Gallbladder', latinName: 'Vesica biliaris', pos: [0.35, -0.55, 0.4] },
    { id: 'inferior_vena_cava', name: 'Inferior Vena Cava', latinName: 'Vena cava inferior', pos: [0.0, 0.75, -0.3] },
    { id: 'hepatic_artery', name: 'Proper Hepatic Artery', latinName: 'Arteria hepatica propria', pos: [-0.35, -0.45, 0.4] },
    { id: 'portal_triad', name: 'Hepatic Portal Vein', latinName: 'Vena portae hepatis', pos: [0.2, -0.45, 0.4] }
  ]
};

const ORGAN_QUICK_LINKS = [
  { slug: 'heart', label: 'Heart', icon: Heart },
  { slug: 'brain', label: 'Brain', icon: Brain },
  { slug: 'lungs', label: 'Lungs', icon: Wind },
  { slug: 'kidneys', label: 'Kidneys', icon: Droplet },
  { slug: 'stomach', label: 'Stomach', icon: Utensils },
  { slug: 'liver', label: 'Liver', icon: Activity }
];

const CAMERA_TARGET: [number, number, number] = [0, 0, 0];

export const OrganDetails: React.FC = () => {
  const { slug = 'heart' } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const highlightParam = searchParams.get('highlight');

  const [organ, setOrgan] = useState<OrganData | null>(null);
  const [loading, setLoading] = useState(true);

  // 3 Primary Exploration Modes
  const [mode, setMode] = useState<ExplorationMode>('external');

  // Cutting plane state for Mode 2
  const [cuttingConfig, setCuttingConfig] = useState<CuttingPlaneConfig>({
    active: false,
    axis: 'x',
    position: 0.0,
    invert: false
  });

  // Exploded separation state for Mode 3
  const [explodeFactor, setExplodeFactor] = useState<number>(0.0);

  // Advanced Surgical Workbench state
  const [isolateMode, setIsolateMode] = useState<boolean>(false);
  const [xrayOpacity, setXrayOpacity] = useState<number>(1.0);
  const [showPins, setShowPins] = useState<boolean>(true);

  // Heart simulation state
  const [isBeating, setIsBeating] = useState<boolean>(true);
  const [beatSpeed, setBeatSpeed] = useState<number>(1.0);
  const [showBloodFlow, setShowBloodFlow] = useState<boolean>(true);

  // UI & Camera state
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('isometric');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [infoPanelOpen, setInfoPanelOpen] = useState<boolean>(true);

  // Selection & Hover
  const [selectedSubId, setSelectedSubId] = useState<string | undefined>(highlightParam || undefined);
  const [hoveredSubId, setHoveredSubId] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoading(true);
    anatomyApi.getOrgan(slug).then((data) => {
      setOrgan(data);
      if (highlightParam) {
        setSelectedSubId(highlightParam);
      } else {
        setSelectedSubId(undefined);
      }
      // Reset mode specific states on organ navigation
      setMode('external');
      setCuttingConfig({ active: false, axis: 'x', position: 0.0, invert: false });
      setExplodeFactor(0.0);
      setIsolateMode(false);
      setXrayOpacity(1.0);
      setLoading(false);
    });
  }, [slug, highlightParam]);

  // When changing modes, adapt cutting plane or explosion
  const handleSetMode = (newMode: ExplorationMode) => {
    setMode(newMode);
    if (newMode === 'cut') {
      setCuttingConfig((prev) => ({ ...prev, active: true }));
      setExplodeFactor(0);
    } else if (newMode === 'exploded') {
      setCuttingConfig((prev) => ({ ...prev, active: false }));
      if (explodeFactor === 0) setExplodeFactor(0.75);
    } else {
      setCuttingConfig((prev) => ({ ...prev, active: false }));
      setExplodeFactor(0);
    }
  };

  const handleUpdateCuttingConfig = (partial: Partial<CuttingPlaneConfig>) => {
    setCuttingConfig((prev) => ({ ...prev, ...partial }));
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  const selectedSubcomponent: OrganSubcomponent | null =
    organ?.subcomponents?.find((s) => s.id === selectedSubId) || null;

  const hoveredSubcomponent: OrganSubcomponent | null =
    organ?.subcomponents?.find((s) => s.id === hoveredSubId) || null;

  // Active landmark pins
  const activePins = useMemo(() => {
    if (ORGAN_LANDMARK_PINS[slug]) {
      return ORGAN_LANDMARK_PINS[slug];
    }
    if (!organ?.subcomponents) return [];
    return organ.subcomponents.slice(0, 5).map((sub, idx) => ({
      id: sub.id,
      name: sub.name,
      latinName: sub.latinName,
      pos: sub.pinPos || [
        (idx % 3 - 1) * 0.7,
        Math.floor(idx / 3) * 0.6 - 0.3,
        idx % 2 === 0 ? 0.3 : -0.3
      ] as [number, number, number]
    }));
  }, [slug, organ]);

  if (loading) {
    return (
      <div className="w-full h-[calc(100vh-4rem)] bg-[#090a0d] flex items-center justify-center text-slate-300 gap-3">
        <div className="w-6 h-6 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm font-semibold tracking-wide">Loading 3D Anatomical Organ...</span>
      </div>
    );
  }

  if (!organ) {
    return (
      <div className="w-full h-[calc(100vh-4rem)] bg-[#090a0d] flex flex-col items-center justify-center text-slate-300 gap-4">
        <h2 className="text-xl font-bold text-white">Organ Not Found</h2>
        <p className="text-sm text-slate-400">The requested organ does not exist in the catalog.</p>
        <Link to="/" className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold">
          Return to Dissection Center
        </Link>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[calc(100vh-4rem)] bg-[#090a0d] overflow-hidden flex ${
        isFullscreen ? 'h-screen' : ''
      }`}
    >
      {/* Top Left Navigation Bar & Organ Quick Switcher */}
      <div className="absolute top-4 left-4 z-30 flex items-center gap-2 flex-wrap">
        <Link
          to="/"
          className="p-2 rounded-xl bg-[#13151c] hover:bg-[#1b1e28] border border-[#232733] text-slate-300 hover:text-white shadow-lg transition-colors flex items-center gap-1.5 text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4 text-amber-400" />
          <span className="hidden sm:inline">Dissection Center</span>
        </Link>

        {/* Current Organ Badge */}
        <div className="px-3 py-1.5 rounded-xl bg-[#13151c] border border-[#232733] shadow-lg flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">{organ.name}</span>
          <span className="hidden md:inline text-[11px] text-amber-300/80 font-serif italic">
            ({organ.latin_name || organ.system_slug})
          </span>
        </div>

        {/* Quick Organ Jump Buttons */}
        <div className="hidden lg:flex items-center gap-1 bg-[#101217] p-1 rounded-xl border border-[#202430]">
          {ORGAN_QUICK_LINKS.map((item) => {
            const Icon = item.icon;
            const isCurrent = item.slug === slug;
            return (
              <Link
                key={item.slug}
                to={`/organs/${item.slug}`}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                  isCurrent
                    ? 'bg-[#1e222e] text-amber-300 border border-amber-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-[#161821]'
                }`}
                title={`Switch to ${item.label}`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main 3D Canvas Workspace */}
      <div className={`flex-1 w-full h-full relative cursor-grab active:cursor-grabbing transition-all ${
        infoPanelOpen ? 'mr-0 sm:mr-96' : 'mr-0'
      }`}>
        <Canvas
          shadows
          camera={{ position: [0, 0, 4.2], fov: 45 }}
          gl={{ localClippingEnabled: true, antialias: true }}
        >
          {/* True-Color Surgical Studio Illumination (Zero colored tint) */}
          <ambientLight intensity={0.85} color="#f8fafc" />
          <directionalLight position={[6, 10, 6]} intensity={1.8} castShadow color="#ffffff" />
          <directionalLight position={[-6, -2, -4]} intensity={0.7} color="#fffcf5" />
          <pointLight position={[0, 5, 2]} intensity={0.5} color="#ffffff" />

          {/* Render corresponding 3D organ */}
          <Suspense fallback={<ModelLoader />}>
            {slug === 'heart' ? (
              <Heart3D
                mode={mode}
                selectedStructureId={selectedSubId}
                onSelectStructure={setSelectedSubId}
                hoveredStructureId={hoveredSubId || undefined}
                onHoverStructure={setHoveredSubId}
                cuttingConfig={cuttingConfig}
                explodeFactor={explodeFactor}
                isBeating={isBeating}
                beatSpeed={beatSpeed}
                showBloodFlow={showBloodFlow}
                showLabels={showLabels}
                isolateMode={isolateMode}
                xrayOpacity={xrayOpacity}
              />
            ) : slug === 'brain' ? (
              <Brain3D
                mode={mode}
                selectedStructureId={selectedSubId}
                onSelectStructure={setSelectedSubId}
                hoveredStructureId={hoveredSubId || undefined}
                onHoverStructure={setHoveredSubId}
                cuttingConfig={cuttingConfig}
                explodeFactor={explodeFactor}
                showLabels={showLabels}
                isolateMode={isolateMode}
                xrayOpacity={xrayOpacity}
              />
            ) : slug === 'lungs' ? (
              <Lungs3D
                mode={mode}
                selectedStructureId={selectedSubId}
                onSelectStructure={setSelectedSubId}
                hoveredStructureId={hoveredSubId || undefined}
                onHoverStructure={setHoveredSubId}
                cuttingConfig={cuttingConfig}
                explodeFactor={explodeFactor}
                showLabels={showLabels}
                isolateMode={isolateMode}
                xrayOpacity={xrayOpacity}
              />
            ) : slug === 'kidneys' ? (
              <Kidneys3D
                mode={mode}
                selectedStructureId={selectedSubId}
                onSelectStructure={setSelectedSubId}
                hoveredStructureId={hoveredSubId || undefined}
                onHoverStructure={setHoveredSubId}
                cuttingConfig={cuttingConfig}
                explodeFactor={explodeFactor}
                showLabels={showLabels}
                isolateMode={isolateMode}
                xrayOpacity={xrayOpacity}
              />
            ) : slug === 'stomach' ? (
              <Stomach3D
                mode={mode}
                selectedStructureId={selectedSubId}
                onSelectStructure={setSelectedSubId}
                hoveredStructureId={hoveredSubId || undefined}
                onHoverStructure={setHoveredSubId}
                cuttingConfig={cuttingConfig}
                explodeFactor={explodeFactor}
                showLabels={showLabels}
                isolateMode={isolateMode}
                xrayOpacity={xrayOpacity}
              />
            ) : slug === 'liver' ? (
              <Liver3D
                mode={mode}
                selectedStructureId={selectedSubId}
                onSelectStructure={setSelectedSubId}
                hoveredStructureId={hoveredSubId || undefined}
                onHoverStructure={setHoveredSubId}
                cuttingConfig={cuttingConfig}
                explodeFactor={explodeFactor}
                showLabels={showLabels}
                isolateMode={isolateMode}
                xrayOpacity={xrayOpacity}
              />
            ) : (
              <GenericOrgan3D
                slug={slug}
                subcomponents={organ.subcomponents}
                mode={mode}
                selectedStructureId={selectedSubId}
                onSelectStructure={setSelectedSubId}
                hoveredStructureId={hoveredSubId || undefined}
                onHoverStructure={setHoveredSubId}
                cuttingConfig={cuttingConfig}
                explodeFactor={explodeFactor}
                showLabels={showLabels}
                isolateMode={isolateMode}
                xrayOpacity={xrayOpacity}
              />
            )}
          </Suspense>

          {/* Interactive 3D Landmark Pins */}
          {showPins && (
            <AnatomicalPins
              pins={activePins}
              selectedId={selectedSubId}
              onSelectPin={setSelectedSubId}
              hoveredId={hoveredSubId}
              onHoverPin={setHoveredSubId}
              visible={showPins}
            />
          )}

          <CameraControls
            preset={cameraPreset}
            distance={4.2}
            target={CAMERA_TARGET}
          />
        </Canvas>

        {/* Live Cursor Hover HUD Tooltip (surgical feedback) */}
        {hoveredSubcomponent && (
          <div className="absolute top-4 right-4 sm:right-6 pointer-events-none z-30 animate-in fade-in duration-150">
            <div className="px-3.5 py-2 rounded-xl bg-[#12141c]/95 border border-[#272c3b] shadow-2xl backdrop-blur-xl max-w-sm">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span className="text-xs font-bold text-white">{hoveredSubcomponent.name}</span>
              </div>
              {hoveredSubcomponent.latinName && (
                <div className="text-[11px] text-amber-300 font-serif italic mb-1">
                  {hoveredSubcomponent.latinName}
                </div>
              )}
              <p className="text-[11px] text-slate-300 line-clamp-2 leading-tight">
                {hoveredSubcomponent.function}
              </p>
            </div>
          </div>
        )}

        {/* Floating Bottom Multi-tool HUD */}
        <div className="absolute bottom-5 left-4 right-4 z-30 pointer-events-auto">
          <OrganToolbar
            mode={mode}
            onSetMode={handleSetMode}
            cuttingConfig={cuttingConfig}
            onUpdateCuttingConfig={handleUpdateCuttingConfig}
            explodeFactor={explodeFactor}
            onSetExplodeFactor={setExplodeFactor}
            onSetCameraPreset={setCameraPreset}
            isHeart={slug === 'heart'}
            isBeating={isBeating}
            onToggleBeating={() => setIsBeating(!isBeating)}
            beatSpeed={beatSpeed}
            onSetBeatSpeed={setBeatSpeed}
            showBloodFlow={showBloodFlow}
            onToggleBloodFlow={() => setShowBloodFlow(!showBloodFlow)}
            isolateMode={isolateMode}
            onToggleIsolateMode={() => setIsolateMode(!isolateMode)}
            hasSelectedStructure={Boolean(selectedSubId)}
            xrayOpacity={xrayOpacity}
            onSetXrayOpacity={setXrayOpacity}
            showPins={showPins}
            onTogglePins={() => setShowPins(!showPins)}
            showLabels={showLabels}
            onToggleLabels={() => setShowLabels(!showLabels)}
            isFullscreen={isFullscreen}
            onToggleFullscreen={handleToggleFullscreen}
          />
        </div>
      </div>

      {/* Right Anatomy Inspector / Precision Dossier HUD */}
      <OrganInfoPanel
        organ={organ}
        selectedSubcomponent={selectedSubcomponent}
        onSelectSubcomponent={setSelectedSubId}
        isOpen={infoPanelOpen}
        onToggleOpen={() => setInfoPanelOpen(!infoPanelOpen)}
        isolateMode={isolateMode}
        onToggleIsolateMode={() => setIsolateMode(!isolateMode)}
      />
    </div>
  );
};

import React, { useState } from 'react';
import {
  Eye,
  Scissors,
  Split,
  Play,
  Pause,
  Droplets,
  RotateCcw,
  Maximize2,
  Minimize2,
  Tag,
  Compass,
  Focus,
  Ghost,
  MapPin,
  ChevronDown
} from 'lucide-react';
import { ExplorationMode, CuttingPlaneConfig, CameraPreset } from '../../types/anatomy';

interface OrganToolbarProps {
  mode: ExplorationMode;
  onSetMode: (mode: ExplorationMode) => void;
  // Cutting controls
  cuttingConfig: CuttingPlaneConfig;
  onUpdateCuttingConfig: (config: Partial<CuttingPlaneConfig>) => void;
  // Exploded controls
  explodeFactor: number;
  onSetExplodeFactor: (factor: number) => void;
  // Camera controls
  onSetCameraPreset: (preset: CameraPreset) => void;
  // Heart specific controls
  isHeart?: boolean;
  isBeating?: boolean;
  onToggleBeating?: () => void;
  beatSpeed?: number;
  onSetBeatSpeed?: (speed: number) => void;
  showBloodFlow?: boolean;
  onToggleBloodFlow?: () => void;
  // Advanced inspection controls
  isolateMode: boolean;
  onToggleIsolateMode: () => void;
  hasSelectedStructure: boolean;
  xrayOpacity: number;
  onSetXrayOpacity: (val: number) => void;
  showPins: boolean;
  onTogglePins: () => void;
  showLabels: boolean;
  onToggleLabels: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export const OrganToolbar: React.FC<OrganToolbarProps> = ({
  mode,
  onSetMode,
  cuttingConfig,
  onUpdateCuttingConfig,
  explodeFactor,
  onSetExplodeFactor,
  onSetCameraPreset,
  isHeart = false,
  isBeating = true,
  onToggleBeating,
  beatSpeed = 1.0,
  onSetBeatSpeed,
  showBloodFlow = true,
  onToggleBloodFlow,
  isolateMode,
  onToggleIsolateMode,
  hasSelectedStructure,
  xrayOpacity,
  onSetXrayOpacity,
  showPins,
  onTogglePins,
  showLabels,
  onToggleLabels,
  isFullscreen,
  onToggleFullscreen
}) => {
  const [showXraySlider, setShowXraySlider] = useState(false);
  const [showCameraMenu, setShowCameraMenu] = useState(false);

  return (
    <div className="flex flex-col gap-2 w-full max-w-4xl mx-auto">
      {/* Sub-bar: Cut Mode (No artificial grid, pure precision section controls) */}
      {mode === 'cut' && (
        <div className="bg-[#13151c]/95 border border-[#2a2f3e] p-2.5 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-rose-400 flex items-center gap-1.5">
              <Scissors className="w-3.5 h-3.5" />
              Surgical Section:
            </span>
            <div className="flex rounded-xl bg-[#1a1d26] border border-[#272c3a] p-0.5">
              {(['x', 'y', 'z'] as const).map((axis) => (
                <button
                  key={axis}
                  onClick={() => onUpdateCuttingConfig({ axis })}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase transition-colors ${
                    cuttingConfig.axis === axis
                      ? 'bg-[#e11d48] text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {axis === 'x' ? 'Sagittal (X)' : axis === 'y' ? 'Transverse (Y)' : 'Coronal (Z)'}
                </button>
              ))}
            </div>

            <button
              onClick={() => onUpdateCuttingConfig({ invert: !cuttingConfig.invert })}
              className={`px-2.5 py-1 rounded-xl border text-xs font-semibold transition-colors ${
                cuttingConfig.invert
                  ? 'bg-rose-950 border-rose-700 text-rose-200'
                  : 'bg-[#1a1d26] border-[#272c3a] text-slate-300 hover:bg-[#232734]'
              }`}
            >
              Flip Section
            </button>
          </div>

          <div className="flex items-center gap-2 flex-1 max-w-xs min-w-[200px]">
            <span className="text-slate-400 whitespace-nowrap">Cut Depth:</span>
            <input
              type="range"
              min="-1.5"
              max="1.5"
              step="0.05"
              value={cuttingConfig.position}
              onChange={(e) => onUpdateCuttingConfig({ position: parseFloat(e.target.value) })}
              className="w-full accent-rose-500 h-1.5 bg-[#252a38] rounded-lg cursor-pointer"
            />
            <span className="text-rose-300 font-mono w-10 text-right font-bold">
              {cuttingConfig.position.toFixed(2)}
            </span>
          </div>
        </div>
      )}

      {/* Sub-bar: Deconstructed / Exploded Mode */}
      {mode === 'exploded' && (
        <div className="bg-[#13151c]/95 border border-[#2a2f3e] p-2.5 rounded-2xl flex items-center justify-between gap-4 text-xs shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center gap-2">
            <Split className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold text-amber-300">Deconstruct Anatomy:</span>
            <button
              onClick={() => onSetExplodeFactor(explodeFactor > 0.05 ? 0 : 0.85)}
              className="px-2.5 py-1 rounded-xl bg-[#1a1d26] border border-[#272c3a] text-slate-200 hover:bg-[#222634] font-medium"
            >
              {explodeFactor > 0.05 ? 'Reassemble All' : 'Disassemble All'}
            </button>
          </div>

          <div className="flex items-center gap-2 flex-1 max-w-sm">
            <span className="text-slate-400 whitespace-nowrap">Distance:</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.02"
              value={explodeFactor}
              onChange={(e) => onSetExplodeFactor(parseFloat(e.target.value))}
              className="w-full accent-amber-400 h-1.5 bg-[#252a38] rounded-lg cursor-pointer"
            />
            <span className="text-amber-300 font-mono w-10 text-right font-bold">
              {Math.round(explodeFactor * 100)}%
            </span>
          </div>
        </div>
      )}

      {/* X-Ray Fine Slider popover */}
      {showXraySlider && (
        <div className="bg-[#13151c]/95 border border-[#2a2f3e] p-2.5 rounded-2xl flex items-center justify-between gap-3 text-xs shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-2 duration-150">
          <div className="flex items-center gap-2">
            <Ghost className="w-3.5 h-3.5 text-slate-300" />
            <span className="font-semibold text-slate-200">X-Ray Translucency Depth:</span>
          </div>
          <div className="flex items-center gap-2 flex-1 max-w-xs">
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.05"
              value={xrayOpacity}
              onChange={(e) => onSetXrayOpacity(parseFloat(e.target.value))}
              className="w-full accent-slate-300 h-1.5 bg-[#252a38] rounded-lg cursor-pointer"
            />
            <span className="text-slate-200 font-mono w-10 text-right font-bold">
              {Math.round(xrayOpacity * 100)}%
            </span>
          </div>
          <button
            onClick={() => onSetXrayOpacity(xrayOpacity < 1.0 ? 1.0 : 0.35)}
            className="px-2.5 py-1 rounded-xl bg-[#1a1d26] border border-[#272c3a] text-slate-300 hover:text-white text-[11px] font-semibold"
          >
            {xrayOpacity < 1.0 ? 'Solid' : '35% Deep'}
          </button>
        </div>
      )}

      {/* Primary Surgical Toolbar Bar */}
      <div className="bg-[#101217]/95 border border-[#202430] p-2 rounded-2xl flex flex-wrap items-center justify-between gap-2 shadow-2xl backdrop-blur-xl">
        {/* Left: Mode Selection Switcher */}
        <div className="flex items-center rounded-xl bg-[#161821] p-1 border border-[#232733]">
          <button
            onClick={() => onSetMode('external')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              mode === 'external'
                ? 'bg-[#232734] text-white shadow-sm border border-amber-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span>External View</span>
          </button>

          <button
            onClick={() => onSetMode('cut')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              mode === 'cut'
                ? 'bg-[#e11d48] text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Scissors className="w-3.5 h-3.5 text-rose-300" />
            <span>Scalpel / Cut</span>
          </button>

          <button
            onClick={() => onSetMode('exploded')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              mode === 'exploded'
                ? 'bg-[#d97706] text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Split className="w-3.5 h-3.5 text-amber-200" />
            <span>Deconstruct</span>
          </button>
        </div>

        {/* Center: Heart specific simulation controls */}
        {isHeart && (
          <div className="flex items-center gap-1.5 bg-[#161821] p-1 rounded-xl border border-[#232733]">
            <button
              onClick={onToggleBeating}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                isBeating
                  ? 'bg-rose-950/80 text-rose-300 border border-rose-800/80'
                  : 'text-slate-400 hover:text-white'
              }`}
              title={isBeating ? 'Pause Heartbeat' : 'Start Heartbeat'}
            >
              {isBeating ? <Pause className="w-3.5 h-3.5 text-rose-400" /> : <Play className="w-3.5 h-3.5 text-slate-300" />}
              <span className="hidden sm:inline">{isBeating ? 'Beating' : 'Paused'}</span>
            </button>

            {onSetBeatSpeed && (
              <div className="flex gap-0.5">
                {[0.5, 1.0, 1.5, 2.0].map((s) => (
                  <button
                    key={s}
                    onClick={() => onSetBeatSpeed(s)}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors ${
                      beatSpeed === s
                        ? 'bg-[#e11d48] text-white font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {s}x
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={onToggleBloodFlow}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                showBloodFlow
                  ? 'bg-[#1e222e] text-amber-300 border border-amber-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Toggle Blood Flow Particle Circulation"
            >
              <Droplets className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Circulation</span>
            </button>
          </div>
        )}

        {/* Right: Surgical & Diagnostic Tools */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Isolation Mode Toggle */}
          <button
            onClick={onToggleIsolateMode}
            disabled={!hasSelectedStructure}
            className={`px-2.5 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
              isolateMode
                ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-md font-bold'
                : hasSelectedStructure
                ? 'bg-[#181a23] border-[#292e3c] text-amber-400 hover:bg-[#202432] hover:border-amber-500/50'
                : 'bg-[#13151b] border-[#1c1f28] text-slate-600 cursor-not-allowed'
            }`}
            title={
              hasSelectedStructure
                ? isolateMode
                  ? 'Disable Structure Isolation'
                  : 'Isolate Selected Structure in 3D'
                : 'Select any structure first to isolate'
            }
          >
            <Focus className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Isolate</span>
          </button>

          {/* X-Ray / Transparency Mode */}
          <div className="relative">
            <button
              onClick={() => setShowXraySlider(!showXraySlider)}
              className={`px-2.5 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                xrayOpacity < 1.0 || showXraySlider
                  ? 'bg-[#222634] border-amber-500/50 text-amber-300 shadow-md'
                  : 'bg-[#181a23] border-[#242834] text-slate-300 hover:text-white hover:bg-[#202430]'
              }`}
              title="Toggle X-Ray Transparency Control"
            >
              <Ghost className="w-3.5 h-3.5 text-slate-300" />
              <span className="hidden md:inline">X-Ray</span>
              {xrayOpacity < 1.0 && (
                <span className="font-mono text-[10px] text-amber-300">
                  {Math.round(xrayOpacity * 100)}%
                </span>
              )}
            </button>
          </div>

          {/* Landmark Pins Toggle */}
          <button
            onClick={onTogglePins}
            className={`p-2 rounded-xl border transition-colors ${
              showPins
                ? 'bg-[#222634] border-amber-500/40 text-amber-300 shadow-sm'
                : 'bg-[#181a23] border-[#242834] text-slate-400 hover:text-white'
            }`}
            title="Toggle 3D Anatomical Landmark Pins"
          >
            <MapPin className="w-4 h-4 text-amber-400" />
          </button>

          {/* Labels Toggle */}
          <button
            onClick={onToggleLabels}
            className={`p-2 rounded-xl border transition-colors ${
              showLabels
                ? 'bg-[#222634] border-amber-500/40 text-amber-300 shadow-sm'
                : 'bg-[#181a23] border-[#242834] text-slate-400 hover:text-white'
            }`}
            title="Toggle 3D Anatomical Labels"
          >
            <Tag className="w-4 h-4 text-slate-300" />
          </button>

          {/* Camera Presets Selector */}
          <div className="relative">
            <button
              onClick={() => setShowCameraMenu(!showCameraMenu)}
              className="px-2.5 py-1.5 rounded-xl bg-[#181a23] border border-[#242834] text-slate-300 hover:text-white hover:bg-[#202430] text-xs font-semibold flex items-center gap-1 transition-colors"
              title="Camera View Angles"
            >
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Views</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showCameraMenu && (
              <div
                className="absolute right-0 bottom-full mb-2 bg-[#12141b] border border-[#242835] rounded-2xl shadow-2xl p-1.5 flex flex-col gap-1 min-w-[140px] backdrop-blur-xl z-50 text-xs"
                onClick={() => setShowCameraMenu(false)}
              >
                <button
                  onClick={() => onSetCameraPreset('front')}
                  className="px-3 py-1.5 rounded-xl text-left text-slate-300 hover:bg-[#1a1d26] hover:text-white font-medium"
                >
                  Anterior (Front)
                </button>
                <button
                  onClick={() => onSetCameraPreset('back')}
                  className="px-3 py-1.5 rounded-xl text-left text-slate-300 hover:bg-[#1a1d26] hover:text-white font-medium"
                >
                  Posterior (Back)
                </button>
                <button
                  onClick={() => onSetCameraPreset('left')}
                  className="px-3 py-1.5 rounded-xl text-left text-slate-300 hover:bg-[#1a1d26] hover:text-white font-medium"
                >
                  Left Lateral
                </button>
                <button
                  onClick={() => onSetCameraPreset('right')}
                  className="px-3 py-1.5 rounded-xl text-left text-slate-300 hover:bg-[#1a1d26] hover:text-white font-medium"
                >
                  Right Lateral
                </button>
                <button
                  onClick={() => onSetCameraPreset('top')}
                  className="px-3 py-1.5 rounded-xl text-left text-slate-300 hover:bg-[#1a1d26] hover:text-white font-medium"
                >
                  Superior (Top)
                </button>
                <div className="h-px bg-[#202430] my-0.5" />
                <button
                  onClick={() => onSetCameraPreset('isometric')}
                  className="px-3 py-1.5 rounded-xl text-left text-amber-400 hover:bg-[#1a1d26] hover:text-amber-300 font-semibold flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Camera</span>
                </button>
              </div>
            )}
          </div>

          {/* Reset Camera Quick Button */}
          <button
            onClick={() => onSetCameraPreset('isometric')}
            className="p-2 rounded-xl bg-[#181a23] border border-[#242834] text-amber-400 hover:bg-[#202430] transition-colors"
            title="Reset Camera View"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={onToggleFullscreen}
            className="p-2 rounded-xl bg-[#181a23] border border-[#242834] text-slate-400 hover:text-white hover:bg-[#202430] transition-colors"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};

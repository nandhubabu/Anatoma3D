import React, { useState, useMemo } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  Activity,
  AlertCircle,
  BookOpen,
  Layers,
  Sparkles,
  Info,
  CheckCircle2,
  GitBranch,
  Zap,
  Search,
  Focus,
  X,
  Stethoscope,
  Microscope,
  ShieldCheck,
  Scale,
  Compass
} from 'lucide-react';
import { OrganData, OrganSubcomponent } from '../../types/anatomy';

interface OrganInfoPanelProps {
  organ: OrganData;
  selectedSubcomponent?: OrganSubcomponent | null;
  onSelectSubcomponent: (id: string | undefined) => void;
  isOpen: boolean;
  onToggleOpen: () => void;
  isolateMode?: boolean;
  onToggleIsolateMode?: () => void;
}

type TabType = 'histology' | 'physiology' | 'wiring' | 'pathology' | 'registry';

export const OrganInfoPanel: React.FC<OrganInfoPanelProps> = ({
  organ,
  selectedSubcomponent,
  onSelectSubcomponent,
  isOpen,
  onToggleOpen,
  isolateMode = false,
  onToggleIsolateMode
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('histology');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'external' | 'internal'>('all');

  // Filtered subcomponents for the Component Registry tab
  const filteredSubcomponents = useMemo(() => {
    if (!organ.subcomponents) return [];
    return organ.subcomponents.filter((sub) => {
      const matchesSearch =
        sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (sub.latinName && sub.latinName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        sub.function.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;
      if (filterType === 'external') return !sub.internal;
      if (filterType === 'internal') return !!sub.internal;
      return true;
    });
  }, [organ.subcomponents, searchQuery, filterType]);

  return (
    <>
      {/* Toggle Tab Button when panel is collapsed */}
      {!isOpen && (
        <button
          onClick={onToggleOpen}
          className="fixed right-0 top-1/2 -translate-y-1/2 z-40 p-2.5 rounded-l-2xl bg-[#12141b] border-l border-y border-[#262a37] text-amber-400 hover:bg-[#1a1d26] shadow-2xl transition-all flex items-center gap-1.5 group backdrop-blur-xl"
          title="Open Anatomy Dossier"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform text-amber-400" />
          <span className="[writing-mode:vertical-rl] text-xs font-bold uppercase tracking-widest text-slate-300">
            Anatomical Dossier
          </span>
        </button>
      )}

      {/* Main Collapsible Panel */}
      <aside
        className={`fixed right-0 top-16 bottom-0 z-40 w-96 max-w-full bg-[#0d0f14]/98 border-l border-[#1d212c] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header Bar */}
        <div className="p-4 border-b border-[#1d212c] flex items-start justify-between bg-[#12141a]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/30">
                {organ.system_slug} System
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-400 bg-[#181a22] border border-[#242834]">
                ID #{organ.id.toString().padStart(3, '0')}
              </span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              {organ.name}
            </h2>
            {organ.latin_name && (
              <p className="text-xs italic text-amber-400/90 font-serif">
                {organ.latin_name}
              </p>
            )}
          </div>

          <button
            onClick={onToggleOpen}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1a1d26] transition-colors"
            title="Collapse Dossier"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Structure Focus Card */}
        {selectedSubcomponent ? (
          <div className="p-4 border-b border-[#252a38] bg-[#14161f]">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span className="uppercase tracking-wider text-[10px] font-bold">Selected Structure</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1a1d26] border border-[#272c3a] text-slate-300">
                  {selectedSubcomponent.internal ? 'Internal Deep' : 'Surface Landmark'}
                </span>
                <button
                  onClick={() => onSelectSubcomponent(undefined)}
                  className="p-1 rounded hover:bg-[#202430] text-slate-400 hover:text-white transition-colors"
                  title="Clear Selection"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <h3 className="text-base font-bold text-white">
              {selectedSubcomponent.name}
            </h3>
            {selectedSubcomponent.latinName && (
              <div className="text-xs italic text-amber-300/90 mb-2 font-serif">
                {selectedSubcomponent.latinName}
              </div>
            )}

            <p className="text-xs text-slate-300 leading-relaxed mb-2.5">
              {selectedSubcomponent.description}
            </p>

            <div className="p-2.5 rounded-xl bg-[#101217] border border-[#222633] mb-2.5">
              <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-400" />
                <span>Physiological Function:</span>
              </div>
              <div className="text-xs text-slate-200 leading-normal">
                {selectedSubcomponent.function}
              </div>
            </div>

            {/* Quick Action Tools */}
            <div className="flex items-center gap-2">
              {onToggleIsolateMode && (
                <button
                  onClick={onToggleIsolateMode}
                  className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    isolateMode
                      ? 'bg-amber-500 text-slate-950 border border-amber-300 font-bold shadow-md'
                      : 'bg-[#181a23] border border-[#2a2f3e] text-amber-400 hover:bg-[#202432]'
                  }`}
                >
                  <Focus className="w-3.5 h-3.5" />
                  <span>{isolateMode ? 'Exit Isolation' : 'Isolate Structure'}</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="p-3 border-b border-[#1d212c] bg-[#111319] text-xs text-slate-400 flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Select any 3D structure or pick from the registry below.</span>
          </div>
        )}

        {/* 5 Deep Clinical Navigation Tabs */}
        <div className="grid grid-cols-5 border-b border-[#1d212c] bg-[#111319] p-1 text-center text-[11px] font-semibold">
          <button
            onClick={() => setActiveTab('histology')}
            className={`py-1.5 rounded-lg transition-colors flex flex-col items-center gap-0.5 ${
              activeTab === 'histology'
                ? 'bg-[#1c202a] text-white border-b-2 border-amber-400 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Macro Structure & Histology"
          >
            <Microscope className="w-3.5 h-3.5 text-amber-400" />
            <span className="truncate w-full text-[10px]">Histology</span>
          </button>

          <button
            onClick={() => setActiveTab('physiology')}
            className={`py-1.5 rounded-lg transition-colors flex flex-col items-center gap-0.5 ${
              activeTab === 'physiology'
                ? 'bg-[#1c202a] text-white border-b-2 border-amber-400 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Physiology & Dynamics"
          >
            <Activity className="w-3.5 h-3.5 text-rose-400" />
            <span className="truncate w-full text-[10px]">Physiology</span>
          </button>

          <button
            onClick={() => setActiveTab('wiring')}
            className={`py-1.5 rounded-lg transition-colors flex flex-col items-center gap-0.5 ${
              activeTab === 'wiring'
                ? 'bg-[#1c202a] text-white border-b-2 border-amber-400 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Vascular & Innervation"
          >
            <GitBranch className="w-3.5 h-3.5 text-amber-400" />
            <span className="truncate w-full text-[10px]">Vessels</span>
          </button>

          <button
            onClick={() => setActiveTab('pathology')}
            className={`py-1.5 rounded-lg transition-colors flex flex-col items-center gap-0.5 ${
              activeTab === 'pathology'
                ? 'bg-[#1c202a] text-white border-b-2 border-amber-400 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Clinical Correlates & Pathology"
          >
            <Stethoscope className="w-3.5 h-3.5 text-emerald-400" />
            <span className="truncate w-full text-[10px]">Clinical</span>
          </button>

          <button
            onClick={() => setActiveTab('registry')}
            className={`py-1.5 rounded-lg transition-colors flex flex-col items-center gap-0.5 ${
              activeTab === 'registry'
                ? 'bg-[#1c202a] text-white border-b-2 border-amber-400 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Component Registry"
          >
            <Layers className="w-3.5 h-3.5 text-slate-300" />
            <span className="truncate w-full text-[10px]">Registry</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* TAB 1: STRUCTURE & HISTOLOGY */}
          {activeTab === 'histology' && (
            <div className="space-y-4">
              {/* Macro Dimensions & Mass */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-xl bg-[#13151c] border border-[#222632]">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold flex items-center gap-1">
                    <Scale className="w-3 h-3 text-amber-400" />
                    <span>Mass / Weight:</span>
                  </div>
                  <div className="font-semibold text-slate-200 mt-1">
                    {organ.weight_desc || '250 - 350 grams (adult average)'}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-[#13151c] border border-[#222632]">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold flex items-center gap-1">
                    <Compass className="w-3 h-3 text-amber-400" />
                    <span>Dimensions:</span>
                  </div>
                  <div className="font-semibold text-slate-200 mt-1">
                    {organ.dimensions_desc || '12 × 8.5 × 6 cm'}
                  </div>
                </div>
              </div>

              {/* Anatomical Topography / Location */}
              <div>
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  Anatomical Topography & Boundaries
                </h4>
                <div className="text-xs text-slate-300 leading-relaxed bg-[#13151c] p-3 rounded-xl border border-[#222632]">
                  {organ.location}
                </div>
              </div>

              {/* Cellular & Histological Makeup */}
              {organ.cellular_makeup && (
                <div>
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Microscope className="w-3.5 h-3.5 text-amber-400" />
                    Cellular Composition & Tissue Types
                  </h4>
                  <div className="text-xs text-slate-300 leading-relaxed bg-[#13151c] p-3 rounded-xl border border-[#222632]">
                    {organ.cellular_makeup}
                  </div>
                </div>
              )}

              {/* Histological Layers / Internal Section Breakdown */}
              {organ.internal_structures && organ.internal_structures.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-amber-400" />
                    Histological Micro-Layers ({organ.internal_structures.length})
                  </h4>
                  <div className="space-y-2">
                    {organ.internal_structures.map((layer, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-[#13151c] border border-[#222632] space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white">{layer.name}</span>
                          {layer.thickness && (
                            <span className="text-[10px] text-amber-300 font-mono px-2 py-0.5 rounded bg-[#1c202a] border border-[#292e3c]">
                              {layer.thickness}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">{layer.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PHYSIOLOGICAL DYNAMICS */}
          {activeTab === 'physiology' && (
            <div className="space-y-4">
              {/* Primary Function Overview */}
              <div className="p-3.5 rounded-xl bg-[#161822] border border-[#252936] space-y-1.5">
                <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Primary Physiological Role</span>
                </div>
                <div className="text-xs text-slate-200 font-medium leading-relaxed">
                  {organ.primary_function}
                </div>
              </div>

              {/* Dynamic Hemodynamics / Metric Gauge */}
              {organ.hemodynamics && (
                <div className="p-3.5 rounded-xl bg-[#13151c] border border-[#222632] space-y-2">
                  <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-amber-400" />
                    <span>Hemodynamic & Physiological Metrics</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {organ.hemodynamics}
                  </p>
                </div>
              )}

              {/* Deep Physiology Mechanism */}
              <div>
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-rose-400" />
                  Bio-Mechanical & Electrochemical Processes
                </h4>
                <div className="text-xs text-slate-300 leading-relaxed bg-[#13151c] p-3.5 rounded-xl border border-[#222632] space-y-2">
                  {organ.physiology}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: VASCULAR & NEURAL WIRING */}
          {activeTab === 'wiring' && (
            <div className="space-y-3">
              {/* Arterial Supply */}
              {organ.blood_supply && (
                <div className="p-3.5 rounded-xl bg-[#161822] border border-[#282d3b] space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400">
                    <GitBranch className="w-3.5 h-3.5 text-rose-400" />
                    <span>Arterial Vascularization & Venous Drainage</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {organ.blood_supply}
                  </p>
                </div>
              )}

              {/* Neural Innervation */}
              {organ.innervation && (
                <div className="p-3.5 rounded-xl bg-[#161822] border border-[#282d3b] space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>Autonomic & Somatic Innervation</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {organ.innervation}
                  </p>
                </div>
              )}

              {/* Lymphatics */}
              {organ.lymphatics && (
                <div className="p-3.5 rounded-xl bg-[#161822] border border-[#282d3b] space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Lymphatic Drainage Pathways</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {organ.lymphatics}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: CLINICAL CORRELATES & PATHOLOGY */}
          {activeTab === 'pathology' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-[#181a23] border border-[#282d3b] space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  <span>Clinical Correlates & Pathologies</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {organ.clinical_relevance}
                </p>
              </div>

              {organ.fun_facts && organ.fun_facts.length > 0 && (
                <div className="p-3.5 rounded-xl bg-[#13151c] border border-[#222632] space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>High-Yield Surgical & Anatomical Insights</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {organ.fun_facts.map((fact, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {organ.terminology && organ.terminology.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                    Anatomical Terminology & Etymology
                  </h4>
                  <div className="space-y-2">
                    {organ.terminology.map((t, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-[#13151c] border border-[#222632]">
                        <div className="text-xs font-bold text-amber-400 mb-0.5">{t.term}</div>
                        <div className="text-xs text-slate-300 leading-relaxed">{t.definition}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: COMPONENT REGISTRY */}
          {activeTab === 'registry' && (
            <div className="space-y-3">
              {/* Search input */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter structures by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[#13151c] border border-[#222632] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Filter chips */}
              <div className="flex gap-1.5 text-[11px]">
                <button
                  onClick={() => setFilterType('all')}
                  className={`px-2.5 py-1 rounded-lg transition-colors ${
                    filterType === 'all'
                      ? 'bg-[#1e222e] text-white border border-amber-500/40 font-semibold'
                      : 'bg-[#13151c] text-slate-400 border border-[#202430] hover:text-white'
                  }`}
                >
                  All ({organ.subcomponents?.length || 0})
                </button>
                <button
                  onClick={() => setFilterType('external')}
                  className={`px-2.5 py-1 rounded-lg transition-colors ${
                    filterType === 'external'
                      ? 'bg-[#1e222e] text-white border border-amber-500/40 font-semibold'
                      : 'bg-[#13151c] text-slate-400 border border-[#202430] hover:text-white'
                  }`}
                >
                  Surface ({organ.subcomponents?.filter((s) => !s.internal).length || 0})
                </button>
                <button
                  onClick={() => setFilterType('internal')}
                  className={`px-2.5 py-1 rounded-lg transition-colors ${
                    filterType === 'internal'
                      ? 'bg-[#1e222e] text-white border border-amber-500/40 font-semibold'
                      : 'bg-[#13151c] text-slate-400 border border-[#202430] hover:text-white'
                  }`}
                >
                  Deep ({organ.subcomponents?.filter((s) => s.internal).length || 0})
                </button>
              </div>

              {/* Subcomponent list */}
              <div className="space-y-1.5 max-h-[420px] overflow-y-auto pr-1">
                {filteredSubcomponents.map((sub) => {
                  const isSelected = selectedSubcomponent?.id === sub.id;

                  return (
                    <div
                      key={sub.id}
                      onClick={() => onSelectSubcomponent(sub.id)}
                      className={`p-2.5 rounded-xl text-xs transition-all border cursor-pointer ${
                        isSelected
                          ? 'bg-[#1c202c] text-white border-amber-500/80 shadow-md ring-1 ring-amber-500/30'
                          : 'bg-[#13151c] text-slate-300 border-[#202430] hover:bg-[#1a1d26]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-white">{sub.name}</span>
                        <span
                          className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                            sub.internal
                              ? 'bg-rose-950/60 text-rose-300 border border-rose-800/50'
                              : 'bg-[#1d212c] text-slate-300 border border-[#2a2f3e]'
                          }`}
                        >
                          {sub.internal ? 'Internal' : 'Surface'}
                        </span>
                      </div>

                      {sub.latinName && (
                        <div className="text-[11px] italic text-amber-400/90 font-serif mb-1">
                          {sub.latinName}
                        </div>
                      )}

                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mb-1.5">
                        {sub.description}
                      </p>

                      <div className="flex items-center justify-between text-[10px] text-slate-400 border-t border-[#1e222d] pt-1.5 mt-1">
                        <span className="truncate max-w-[200px] text-slate-400">
                          {sub.function}
                        </span>
                        <span className="text-amber-400 font-semibold shrink-0">
                          {isSelected ? 'Focused' : 'Inspect →'}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {filteredSubcomponents.length === 0 && (
                  <div className="p-4 text-center text-xs text-slate-500">
                    No anatomical structures match "{searchQuery}"
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

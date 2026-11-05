import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Heart, Brain, Bone, Activity, ArrowRight } from 'lucide-react';
import { anatomyApi } from '../../services/anatomyApi';
import { SearchResultItem } from '../../types/anatomy';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  // Handle Ctrl+K shortcut globally
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent will toggle
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Query search on change
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      const res = await anatomyApi.search(query);
      setResults(res);
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (url: string) => {
    onClose();
    navigate(url);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-[#090a0d]/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl bg-[#12141a] border border-[#20242e] rounded-2xl shadow-2xl overflow-hidden">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#20242e] flex items-center gap-3">
          <Search className="w-5 h-5 text-amber-500" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search organs, bones, muscles, blood vessels, systems..."
            className="w-full bg-transparent text-white text-base placeholder-[#6b7280] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded text-[#9ca3af] hover:text-white hover:bg-[#181b22]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs px-2 py-1 rounded bg-[#181b22] text-[#9ca3af] hover:text-white border border-[#262a36]"
          >
            ESC
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-1 custom-scrollbar">
          {loading && (
            <div className="p-8 text-center text-sm text-[#9ca3af] flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
              <span>Scanning anatomical database...</span>
            </div>
          )}

          {!loading && query && results.length === 0 && (
            <div className="p-8 text-center text-sm text-[#9ca3af]">
              No anatomical structures found for "{query}". Try "Heart", "Femur", "Deltoid", or "Brain".
            </div>
          )}

          {!loading && !query && (
            <div className="p-6">
              <div className="text-xs font-semibold text-[#9ca3af] uppercase tracking-wider mb-3">
                Suggested Anatomy Explorations
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Heart & Valves', path: '/organs/heart', icon: Heart, desc: 'External, cut, & exploded view' },
                  { label: 'Brain & Lobes', path: '/organs/brain', icon: Brain, desc: 'Cortical lobes & ventricles' },
                  { label: 'Human Skeleton', path: '/skeleton', icon: Bone, desc: 'Axial & appendicular bones' },
                  { label: 'Muscular System', path: '/muscles', icon: Activity, desc: 'Contraction kinetics & origins' },
                ].map((s) => {
                  const Icon = s.icon;
                  return (
                    <button
                      key={s.path}
                      onClick={() => handleSelect(s.path)}
                      className="p-3 text-left rounded-xl bg-[#14161f] hover:bg-[#1a1d28] border border-[#20242e] transition-colors flex items-start gap-3"
                    >
                      <div className="p-2 rounded-lg bg-[#181b22] border border-[#262a36] text-amber-400">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">{s.label}</div>
                        <div className="text-xs text-[#9ca3af]">{s.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {!loading && results.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSelect(item.url)}
              className="w-full text-left p-3 rounded-xl hover:bg-[#181b22] transition-colors border border-transparent hover:border-[#20242e] flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <span className={`px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider border ${
                  item.category === 'Organ'
                    ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                    : item.category === 'Body System'
                    ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                    : item.category === 'Bone'
                    ? 'bg-[#181b22] text-[#d1d5db] border-[#262a36]'
                    : item.category === 'Muscle'
                    ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                    : 'bg-[#181b22] text-[#d1d5db] border-[#262a36]'
                }`}>
                  {item.category}
                </span>
                <div>
                  <div className="text-sm font-medium text-[#d1d5db] group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </div>
                  <div className="text-xs text-[#9ca3af]">{item.subtitle}</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#6b7280] group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};


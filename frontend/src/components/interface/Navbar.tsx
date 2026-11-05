import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Activity,
  Search,
  Layers,
  Heart,
  Bone,
  Flame,
  Wind,
  Droplet,
  Utensils,
  Brain,
  ChevronDown,
  Compass,
  Menu,
  X,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  onOpenSearch: () => void;
}

const QUICK_ORGANS = [
  { slug: 'heart', name: 'Human Heart', system: 'Cardiovascular', icon: Heart, color: 'text-rose-400' },
  { slug: 'brain', name: 'Human Brain', system: 'Nervous', icon: Brain, color: 'text-amber-300' },
  { slug: 'lungs', name: 'Lungs & Airways', system: 'Respiratory', icon: Wind, color: 'text-sky-300' },
  { slug: 'kidneys', name: 'Kidneys & Vasculature', system: 'Urinary', icon: Droplet, color: 'text-rose-300' },
  { slug: 'stomach', name: 'Stomach & GI Tract', system: 'Digestive', icon: Utensils, color: 'text-emerald-300' },
  { slug: 'liver', name: 'Liver & Gallbladder', system: 'Digestive', icon: Flame, color: 'text-amber-500' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [organDropdownOpen, setOrganDropdownOpen] = useState(false);

  const navLinks = [
    { to: '/explore', label: '3D Body Explorer', icon: Layers },
    { to: '/organs/heart', label: 'Organ Labs', icon: Heart, isOrganLab: true },
    { to: '/skeleton', label: 'Skeletal Atlas', icon: Bone },
    { to: '/muscles', label: 'Muscular Dynamics', icon: Activity },
    { to: '/systems', label: 'Systems Matrix', icon: Compass },
  ];

  const isCurrentOrganPage = location.pathname.startsWith('/organs/');

  return (
    <header className="sticky top-0 z-50 bg-[#0c0d12]/95 border-b border-[#1c1f28] backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#161820] border border-[#262b38] flex items-center justify-center shadow-lg group-hover:border-amber-500/50 transition-all">
            <Heart className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <div className="flex items-center gap-2 font-bold text-sm tracking-wide text-white">
              <span>HUMAN ANATOMY</span>
              <span className="text-[10px] font-bold tracking-widest px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300">
                SURGICAL 3D
              </span>
            </div>
            <div className="text-[10px] tracking-wider text-slate-400 uppercase font-medium flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
              Interactive Anatomy & Dissection Suite
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = link.isOrganLab
              ? isCurrentOrganPage
              : location.pathname === link.to;

            if (link.isOrganLab) {
              return (
                <div key={link.to} className="relative">
                  <div className="flex items-center">
                    <Link
                      to={link.to}
                      className={`px-3 py-1.5 rounded-l-xl text-xs font-semibold transition-all flex items-center gap-1.5 border ${
                        isActive
                          ? 'bg-[#1e222e] text-white border-amber-500/40 shadow-sm'
                          : 'text-slate-300 hover:text-white hover:bg-[#15171f] border-transparent'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 text-amber-400" />
                      <span>{link.label}</span>
                    </Link>
                    <button
                      onClick={() => setOrganDropdownOpen(!organDropdownOpen)}
                      className={`px-2 py-1.5 rounded-r-xl border border-l-0 text-xs transition-colors ${
                        isActive
                          ? 'bg-[#1e222e] text-amber-300 border-amber-500/40'
                          : 'text-slate-400 hover:text-white hover:bg-[#15171f] border-[#222632]'
                      }`}
                      title="Quick Jump to Specific Organ"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Organ Quick Selector Dropdown */}
                  {organDropdownOpen && (
                    <div
                      onMouseLeave={() => setOrganDropdownOpen(false)}
                      className="absolute top-full left-0 mt-2 w-64 rounded-2xl bg-[#11131a] border border-[#242936] shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                    >
                      <div className="px-2.5 py-1.5 text-[10px] font-semibold tracking-wider text-slate-400 uppercase border-b border-[#1e222d] flex items-center justify-between">
                        <span>Dedicated Organ Labs</span>
                        <Sparkles className="w-3 h-3 text-amber-400" />
                      </div>
                      <div className="mt-1 space-y-1">
                        {QUICK_ORGANS.map((organ) => {
                          const OrganIcon = organ.icon;
                          const isOrganActive = location.pathname === `/organs/${organ.slug}`;
                          return (
                            <Link
                              key={organ.slug}
                              to={`/organs/${organ.slug}`}
                              onClick={() => setOrganDropdownOpen(false)}
                              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                                isOrganActive
                                  ? 'bg-[#1c202b] text-white border border-amber-500/40'
                                  : 'text-slate-300 hover:bg-[#161821] hover:text-white'
                              }`}
                            >
                              <div className={`p-1.5 rounded-lg bg-[#181b24] border border-[#272c3a] ${organ.color}`}>
                                <OrganIcon className="w-3.5 h-3.5" />
                              </div>
                              <div className="flex-1">
                                <div className="font-semibold text-white">{organ.name}</div>
                                <div className="text-[10px] text-slate-400">{organ.system}</div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 border ${
                  isActive
                    ? 'bg-[#1e222e] text-white border-amber-500/40 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-[#15171f] border-transparent'
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-amber-400" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Global Search & Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#14161d] hover:bg-[#1c202a] border border-[#232733] hover:border-amber-500/40 text-slate-300 hover:text-white text-xs font-medium shadow-md transition-all group"
            title="Search Anatomical Structures, Vessels, Nerves, Bones (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Search Anatomy...</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono rounded bg-[#1d212c] border border-[#2a2f3e] text-slate-400">
              Ctrl+K
            </kbd>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-[#14161d] border border-[#232733] text-slate-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#1e222d] bg-[#0c0d12]/98 px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = link.isOrganLab
              ? isCurrentOrganPage
              : location.pathname === link.to;

            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-[#1c202b] text-white border border-amber-500/40'
                    : 'text-slate-300 hover:bg-[#151720]'
                }`}
              >
                <Icon className="w-4 h-4 text-amber-400" />
                <span>{link.label}</span>
              </Link>
            );
          })}

          <div className="pt-2 border-t border-[#1e222d]">
            <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Quick Organ Labs
            </div>
            <div className="grid grid-cols-2 gap-2 mt-1">
              {QUICK_ORGANS.map((organ) => {
                const OrganIcon = organ.icon;
                return (
                  <Link
                    key={organ.slug}
                    to={`/organs/${organ.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 p-2 rounded-xl bg-[#13151c] hover:bg-[#1b1e28] border border-[#222633] text-xs text-slate-300"
                  >
                    <OrganIcon className={`w-3.5 h-3.5 ${organ.color}`} />
                    <span className="truncate">{organ.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

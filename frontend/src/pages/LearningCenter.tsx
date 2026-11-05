import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  RotateCw,
  CheckCircle2,
  ArrowRight,
  GraduationCap,
  Heart,
  Brain,
  Bone
} from 'lucide-react';
import { FlashcardData } from '../types/anatomy';
import { anatomyApi } from '../services/anatomyApi';

export const LearningCenter: React.FC = () => {
  const [flashcards, setFlashcards] = useState<FlashcardData[]>([]);
  const [activeTopic, setActiveTopic] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [masteredIds, setMasteredIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    anatomyApi.getFlashcards(activeTopic).then((data) => {
      setFlashcards(data);
      setCurrentIndex(0);
      setIsFlipped(false);
    });
  }, [activeTopic]);

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % Math.max(flashcards.length, 1));
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % Math.max(flashcards.length, 1));
  };

  const markMastered = (id: number) => {
    setMasteredIds((prev) => new Set(prev).add(id));
    handleNext();
  };

  const currentCard = flashcards[currentIndex] || null;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#090a0d] text-[#e5e7eb] flex flex-col py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#181b22] border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <GraduationCap className="w-4 h-4 text-amber-500" />
            <span>Interactive Medical Learning Center</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Anatomical Flashcards & Study Guides
          </h1>
          <p className="text-sm text-[#9ca3af]">
            Reinforce key anatomical landmarks, physiological mechanisms, and clinical correlates with active recall drills.
          </p>
        </div>

        {/* 3D Flashcard Section */}
        <div className="max-w-xl mx-auto w-full space-y-4">
          {/* Topic Filters */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-xl bg-[#12141a] border border-[#20242e] text-xs">
            {[
              { id: 'all', label: 'All Topics' },
              { id: 'heart', label: 'Heart' },
              { id: 'brain', label: 'Brain' },
              { id: 'skeletal', label: 'Skeletal' },
              { id: 'muscular', label: 'Muscular' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTopic(t.id)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  activeTopic === t.id
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/50 font-semibold shadow-sm'
                    : 'text-[#9ca3af] hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Interactive Flip Card */}
          {currentCard ? (
            <div className="space-y-4">
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="w-full h-80 rounded-2xl p-8 border border-[#20242e] bg-[#12141a] hover:border-amber-500/40 cursor-pointer shadow-2xl relative flex flex-col justify-between transition-all duration-300"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#181b22] text-amber-400 font-semibold border border-[#262a36]">
                    {currentCard.category}
                  </span>
                  <span className="text-[#9ca3af] font-mono">
                    Card {currentIndex + 1} of {flashcards.length}
                  </span>
                </div>

                {/* Card Face */}
                <div className="text-center my-auto px-4">
                  {!isFlipped ? (
                    <div className="space-y-3">
                      <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                        {currentCard.front_title}
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
                        {currentCard.front_prompt}
                      </h3>
                      <p className="text-xs text-[#9ca3af] flex items-center justify-center gap-1.5 pt-2">
                        <RotateCw className="w-3.5 h-3.5 text-amber-500" />
                        <span>Click card to reveal answer</span>
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3 animate-fadeIn">
                      <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                        Anatomical Explanation
                      </div>
                      <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-medium">
                        {currentCard.back_answer}
                      </p>
                    </div>
                  )}
                </div>

                <div className="text-center text-[11px] text-[#6b7280]">
                  {masteredIds.has(currentCard.id) ? '✓ Mastered' : 'Active Recall Card'}
                </div>
              </div>

              {/* Card Action Buttons */}
              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  onClick={handlePrev}
                  className="px-4 py-2 rounded-lg bg-[#14161f] border border-[#20242e] hover:bg-[#1a1d28] text-[#d1d5db] text-xs font-medium transition-colors"
                >
                  ← Previous
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => markMastered(currentCard.id)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-950/70 border border-emerald-700 hover:bg-emerald-900/60 text-emerald-300 text-xs font-semibold transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Mastered</span>
                  </button>
                </div>

                <button
                  onClick={handleNext}
                  className="px-4 py-2 rounded-lg bg-[#14161f] border border-[#20242e] hover:bg-[#1a1d28] text-[#d1d5db] text-xs font-medium transition-colors"
                >
                  Next →
                </button>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-sm text-[#9ca3af] rounded-2xl border border-[#20242e] bg-[#12141a]">
              No flashcards available for this topic.
            </div>
          )}
        </div>

        {/* Structured Curriculum Topics */}
        <div className="space-y-6 pt-8 border-t border-[#20242e]">
          <div className="text-center max-w-xl mx-auto">
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Anatomy Curriculum & Learning Modules
            </h3>
            <p className="text-xs text-[#9ca3af] mt-1">
              Select a module to launch into dedicated 3D interactive laboratories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Cardiovascular Hemodynamics',
                level: 'Beginner to Advanced',
                desc: 'Trace the dual-circuit blood circulation from vena cava to aorta, explore cardiac conduction, and examine all 4 heart valves.',
                icon: Heart,
                color: 'text-rose-400',
                link: '/organs/heart'
              },
              {
                title: 'Neuroanatomy & Cerebral Cortex',
                level: 'Intermediate',
                desc: 'Explore the 4 cerebral lobes, deep basal nuclei, cerebellum balance centers, ventricular CSF flow, and cranial nerves.',
                icon: Brain,
                color: 'text-amber-400',
                link: '/organs/brain'
              },
              {
                title: 'Skeletal Biomechanics',
                level: 'Comprehensive',
                desc: 'Examine all 206 bones, joint articulations (synovial, fibrous, cartilaginous), and the axial vs appendicular divisions.',
                icon: Bone,
                link: '/skeleton',
                color: 'text-slate-300'
              }
            ].map((mod, idx) => {
              const Icon = mod.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-xl border border-[#20242e] bg-[#12141a] flex flex-col justify-between space-y-4 hover:border-amber-500/40 transition-colors"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`p-2.5 rounded-lg bg-[#181b22] border border-[#262a36] ${mod.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#181b22] text-[#9ca3af] border border-[#262a36]">
                        {mod.level}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white">
                      {mod.title}
                    </h4>

                    <p className="text-xs text-[#d1d5db] leading-relaxed">
                      {mod.desc}
                    </p>
                  </div>

                  <Link
                    to={mod.link}
                    className="inline-flex items-center justify-between w-full pt-3 border-t border-[#20242e] text-xs font-semibold text-amber-400 hover:text-amber-300"
                  >
                    <span>Launch 3D Module</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};


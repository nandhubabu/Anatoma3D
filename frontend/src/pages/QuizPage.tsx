import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { QuizQuestionData, StudentProgressRecord } from '../types/anatomy';
import { anatomyApi } from '../services/anatomyApi';

export const QuizPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialTopic = searchParams.get('topic') || 'all';

  const [activeTopic, setActiveTopic] = useState<string>(initialTopic);
  const [questions, setQuestions] = useState<QuizQuestionData[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [pastRecords, setPastRecords] = useState<StudentProgressRecord[]>([]);

  useEffect(() => {
    loadQuestions(activeTopic);
    loadProgress();
  }, [activeTopic]);

  const loadQuestions = async (topic: string) => {
    const data = await anatomyApi.getQuizzes(topic);
    setQuestions(data);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  const loadProgress = async () => {
    const recs = await anatomyApi.getProgress();
    setPastRecords(recs);
  };

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const q = questions[currentIndex];
    if (index === q.correct_index) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = async () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Quiz complete
      setQuizFinished(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      // Submit to backend
      await anatomyApi.submitQuiz(activeTopic, score, questions.length);
      loadProgress();
    }
  };

  const currentQ = questions[currentIndex] || null;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#090a0d] text-[#e5e7eb] flex flex-col py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#181b22] border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Interactive Anatomy Knowledge Assessment</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Anatomy Drills & Quizzes
          </h1>
          <p className="text-xs sm:text-sm text-[#9ca3af]">
            Test your comprehension of chambers, valves, bones, muscle attachments, and systemic physiology.
          </p>
        </div>

        {/* Topic Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-xl bg-[#12141a] border border-[#20242e] text-xs">
          {[
            { id: 'all', label: 'All Topics' },
            { id: 'heart', label: 'Heart & Circulation' },
            { id: 'brain', label: 'Brain & Nervous' },
            { id: 'skeletal', label: 'Skeletal System' },
            { id: 'muscular', label: 'Muscular Kinetics' },
            { id: 'respiratory', label: 'Respiratory System' },
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

        {/* Quiz Workspace */}
        {!quizFinished ? (
          currentQ ? (
            <div className="p-6 sm:p-8 rounded-2xl border border-[#20242e] bg-[#12141a] shadow-2xl space-y-6">
              {/* Question Progress Header */}
              <div className="flex items-center justify-between text-xs border-b border-[#20242e] pb-3">
                <span className="px-2.5 py-0.5 rounded-md bg-[#181b22] text-amber-400 font-semibold border border-[#262a36] uppercase tracking-wider text-[10px]">
                  {currentQ.difficulty} • {currentQ.topic_slug}
                </span>
                <span className="text-[#9ca3af] font-mono">
                  Question {currentIndex + 1} of {questions.length}
                </span>
                <span className="font-semibold text-amber-400 font-mono">
                  Score: {score}/{currentIndex + (isAnswered ? 1 : 0)}
                </span>
              </div>

              {/* Question Text */}
              <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
                {currentQ.question}
              </h2>

              {/* 4 Interactive Option Buttons */}
              <div className="space-y-2.5">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === currentQ.correct_index;

                  let btnStyle = 'bg-[#14161f] border-[#20242e] hover:bg-[#1a1d28] hover:border-amber-500/30 text-[#d1d5db]';
                  if (isAnswered) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.3)]';
                    } else if (isSelected) {
                      btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                    } else {
                      btnStyle = 'bg-[#0f1117] border-[#181b22] text-[#6b7280] opacity-50';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswered}
                      className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-md bg-[#181b22] border border-[#262a36] flex items-center justify-center text-xs font-bold text-[#9ca3af] shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </div>

                      {isAnswered && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      )}
                      {isAnswered && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback and Explanation Box */}
              {isAnswered && (
                <div className="p-4 rounded-xl bg-[#14161f] border border-[#20242e] space-y-2 animate-fadeIn">
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Scientific Anatomical Rationale:</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#d1d5db] leading-relaxed">
                    {currentQ.explanation}
                  </p>
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={handleNext}
                      className="px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs shadow-lg shadow-amber-500/20 transition-transform hover:scale-105 flex items-center gap-1.5"
                    >
                      <span>{currentIndex + 1 === questions.length ? 'Finish Quiz' : 'Next Question'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-12 text-center text-sm text-[#9ca3af] rounded-2xl border border-[#20242e] bg-[#12141a]">
              No questions found for this topic.
            </div>
          )
        ) : (
          /* Finished Screen */
          <div className="p-8 rounded-2xl border border-[#20242e] bg-[#12141a] text-center space-y-6 max-w-lg mx-auto shadow-2xl animate-fadeIn">
            <div className="w-16 h-16 rounded-xl bg-amber-500/20 border border-amber-500/40 mx-auto flex items-center justify-center text-amber-400 shadow-xl shadow-amber-500/10">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-white">Quiz Completed!</h3>
              <p className="text-xs text-[#9ca3af]">
                Your anatomical mastery score has been recorded in the platform database.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#14161f] border border-[#20242e] flex items-center justify-around">
              <div>
                <div className="text-xs text-[#9ca3af] uppercase tracking-wider">Score:</div>
                <div className="text-3xl font-extrabold text-amber-400 font-mono">
                  {score} / {questions.length}
                </div>
              </div>
              <div className="w-px h-10 bg-[#20242e]" />
              <div>
                <div className="text-xs text-[#9ca3af] uppercase tracking-wider">Accuracy:</div>
                <div className="text-3xl font-extrabold text-emerald-400 font-mono">
                  {Math.round((score / Math.max(questions.length, 1)) * 100)}%
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => loadQuestions(activeTopic)}
                className="px-5 py-2.5 rounded-lg bg-[#14161f] hover:bg-[#1a1d28] border border-[#20242e] text-[#d1d5db] font-semibold text-xs flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retry Quiz</span>
              </button>

              <Link
                to="/explore"
                className="px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs shadow-lg shadow-amber-500/20 transition-transform hover:scale-105"
              >
                Explore 3D Body →
              </Link>
            </div>
          </div>
        )}

        {/* Student Progress History */}
        {pastRecords.length > 0 && (
          <div className="p-6 rounded-xl border border-[#20242e] bg-[#12141a] space-y-4">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              Recent Assessment Records
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {pastRecords.slice(0, 6).map((rec) => (
                <div key={rec.id} className="p-3 rounded-lg bg-[#14161f] border border-[#20242e] text-xs flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-white capitalize">{rec.topic_slug}</div>
                    <div className="text-[10px] text-[#9ca3af]">Score: {rec.score} / {rec.total_questions}</div>
                  </div>
                  <div className="text-sm font-mono font-bold text-amber-400">
                    {Math.round(rec.percentage)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


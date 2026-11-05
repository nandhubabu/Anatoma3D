import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/interface/Navbar';
import { SearchModal } from './components/interface/SearchModal';
import { PageLoader } from './components/interface/PageLoader';

const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const ExploreBody = lazy(() => import('./pages/ExploreBody').then(m => ({ default: m.ExploreBody })));
const BodySystems = lazy(() => import('./pages/BodySystems').then(m => ({ default: m.BodySystems })));
const OrganDetails = lazy(() => import('./pages/OrganDetails').then(m => ({ default: m.OrganDetails })));
const SkeletonPage = lazy(() => import('./pages/SkeletonPage').then(m => ({ default: m.SkeletonPage })));
const MusclesPage = lazy(() => import('./pages/MusclesPage').then(m => ({ default: m.MusclesPage })));
const LearningCenter = lazy(() => import('./pages/LearningCenter').then(m => ({ default: m.LearningCenter })));
const QuizPage = lazy(() => import('./pages/QuizPage').then(m => ({ default: m.QuizPage })));

export function App() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-[#090a0d] text-[#e5e7eb] flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
        {/* Global Navigation Bar */}
        <Navbar onOpenSearch={() => setSearchOpen(true)} />

        {/* Global Anatomy Search Modal (Ctrl+K) */}
        <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

        {/* Page View Routing with Suspense Code Splitting */}
        <main className="flex-1 flex flex-col">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<ExploreBody />} />
              <Route path="/systems" element={<BodySystems />} />
              <Route path="/systems/:slug" element={<BodySystems />} />
              <Route path="/organs/:slug" element={<OrganDetails />} />
              <Route path="/skeleton" element={<SkeletonPage />} />
              <Route path="/muscles" element={<MusclesPage />} />
              <Route path="/learning" element={<LearningCenter />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/quizzes" element={<QuizPage />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;

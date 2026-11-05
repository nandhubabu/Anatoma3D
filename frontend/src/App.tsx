import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/interface/Navbar';
import { SearchModal } from './components/interface/SearchModal';
import { Home } from './pages/Home';
import { ExploreBody } from './pages/ExploreBody';
import { BodySystems } from './pages/BodySystems';
import { OrganDetails } from './pages/OrganDetails';
import { SkeletonPage } from './pages/SkeletonPage';
import { MusclesPage } from './pages/MusclesPage';
import { LearningCenter } from './pages/LearningCenter';
import { QuizPage } from './pages/QuizPage';

export function App() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-[#090a0d] text-[#e5e7eb] flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
        {/* Global Navigation Bar */}
        <Navbar onOpenSearch={() => setSearchOpen(true)} />

        {/* Global Anatomy Search Modal (Ctrl+K) */}
        <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

        {/* Page View Routing */}
        <main className="flex-1 flex flex-col">
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
        </main>
      </div>
    </Router>
  );
}

export default App;

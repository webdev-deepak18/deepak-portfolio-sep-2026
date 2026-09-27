import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import GraphicDesignPage from './pages/GraphicDesignPage';
import WebsitesPage from './pages/WebsitesPage';
import MotionPage from './pages/MotionPage';
import AboutPage from './pages/AboutPage';
import './App.css';

const VALID_PAGES = ['home', 'about', 'graphic-design', 'websites', 'motion'];

export default function App() {
  const getPageFromHash = () => {
    const hash = window.location.hash.replace('#', '').trim();
    return VALID_PAGES.includes(hash) ? hash : 'home';
  };

  const [currentPage, setCurrentPage] = useState(getPageFromHash);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(getPageFromHash());
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Lock scrolling on home page hero, clear completely on work pages so position: sticky works instantly
  useEffect(() => {
    if (currentPage === 'home') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [currentPage]);

  const handleNavigate = (page) => {
    if (VALID_PAGES.includes(page)) {
      window.location.hash = page === 'home' ? '' : page;
      setCurrentPage(page);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="app-root">
      {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
      {currentPage === 'about' && <AboutPage onNavigate={handleNavigate} />}
      {currentPage === 'graphic-design' && <GraphicDesignPage onNavigate={handleNavigate} />}
      {currentPage === 'websites' && <WebsitesPage onNavigate={handleNavigate} />}
      {currentPage === 'motion' && <MotionPage onNavigate={handleNavigate} />}
    </div>
  );
}

import React from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';

/**
 * Header Component
 * Consistent top navigation header across all portfolio inner showcase pages.
 * - Left: Deepak S (brand anchor button) + GoComet Senior Brand Designer Role + AI-First Tag
 * - Right: Single dedicated Return-to-Home button (bringing the user back to the 3D globe hero)
 */
export default function Header({ currentPage, onNavigate }) {
  return (
    <header className="site-header dark-nav-header" role="banner">
      {/* 1. Left Side: Brand Name & Target Role (Consistent with Home Page) */}
      <div className="header-left-brand">
        <button
          type="button"
          className="candidate-brand-name brand-home-anchor"
          onClick={() => onNavigate('home')}
          title="Return to 3D Globe Home"
        >
          Deepak S
        </button>
        <span className="header-brand-divider" aria-hidden="true">|</span>
        <span className="target-role-title">
          Portfolio for GoComet — Senior Brand Designer Role
        </span>
        <span className="ai-first-tag">
          <Sparkles size={13} className="sparkle-icon" />
          <span>AI-First Designer</span>
        </span>
      </div>

      {/* 2. Right Side: Single Dedicated Return-to-Home Button */}
      <nav className="header-right-nav" aria-label="Main Navigation">
        <button
          type="button"
          className="back-to-home-btn"
          onClick={() => onNavigate('home')}
          title="Return to 3D Globe Home"
        >
          <ArrowLeft size={16} />
          <span>Home</span>
        </button>
      </nav>
    </header>
  );
}

import React, { useState, useCallback, useEffect } from 'react';
import OceanBackground from '../components/OceanBackground';
import InteractiveGlobe from '../components/InteractiveGlobe';
import GlobeBeacons from '../components/GlobeBeacons';
import ResumeModal from '../components/ResumeModal';
import { Phone, Mail, MapPin, FileText, Sparkles, ArrowUpRight } from 'lucide-react';

/**
 * HomePage Component
 * 100vw x 100vh immersive interactive 3D hero page.
 * Features:
 * - Wide expansive 3D rotating Earth spanning the screen width
 * - Cards anchored directly to the globe horizon
 * - Minimalist clean cards (Title + Explore CTA)
 * - Ocean freight background with container vessel
 * - Globe center feature card for Deepak's Story & AI Philosophy
 * - Prominent top branding for Deepak S & GoComet role
 * - Bottom contact & resume ribbon with LinkedIn
 */
export default function HomePage({ onNavigate }) {
  const [activeNode, setActiveNode] = useState(null);
  const [nodePositions, setNodePositions] = useState(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const handleNodesCalculated = useCallback((nodes) => {
    setNodePositions(nodes);
  }, []);

  return (
    <div className="home-viewport-container">
      {/* 1. Deep Ocean & Maritime Freight Layer (Behind the Globe) */}
      <OceanBackground />

      {/* 2. Interactive Wide 3D Rotating Globe */}
      <InteractiveGlobe 
        activeNode={activeNode}
        onNodesCalculated={handleNodesCalculated}
      />

      {/* 3. The 3 Discipline Beacons & Floating Cards */}
      <GlobeBeacons 
        onNavigate={onNavigate} 
        onHoverNode={setActiveNode} 
        nodePositions={nodePositions}
      />

      {/* 4. Globe Center Feature: About Deepak S (Positioned as in Screenshot 3 Red Outline) */}
      <div className="globe-story-beacon" role="region" aria-label="About Deepak S">
        <button
          type="button"
          className="globe-about-card"
          onClick={() => onNavigate('about')}
          title="Explore Deepak's Story, Experience & AI Philosophy"
        >
          {/* Avatar Thumbnail */}
          <div className="about-avatar-ring">
            <img 
              src="/assets/deepak.jpg" 
              alt="Deepak S" 
              className="about-avatar-img" 
              onError={(e) => {
                e.currentTarget.src = './assets/deepak.jpg';
              }}
            />
            <span className="about-avatar-pulse" />
          </div>

          {/* Info Block */}
          <div className="about-card-info">
            <div className="about-card-title">
              About Deepak S
            </div>
            <div className="about-card-role">
              <span className="badge-sparkle">✦</span>
              <span>AI-First Senior Brand Designer</span>
            </div>
          </div>

          {/* Action CTA Pill */}
          <div className="about-card-cta">
            <span className="about-cta-pill">
              <span>Click Here</span>
              <ArrowUpRight size={14} className="cta-arrow-icon" />
            </span>
          </div>
        </button>
      </div>

      {/* 5. Top Header: Prominently Visible Branding & GoComet Target Role (Center Aligned) */}
      <header className="home-top-header" role="banner">
        <div className="home-header-center-brand">
          <span className="candidate-brand-name">Deepak S</span>
          <span className="header-brand-divider" aria-hidden="true">|</span>
          <span className="target-role-title">
            Portfolio for GoComet — Senior Brand Designer Role
          </span>
          <span className="ai-first-tag">
            <Sparkles size={13} className="sparkle-icon" />
            <span>AI-First Designer</span>
          </span>
        </div>
      </header>

      {/* 6. Bottom Contact & Resume Ribbon */}
      <footer className="home-bottom-ribbon" role="contentinfo">
        <div className="ribbon-links">
          <a
            href="/Deepak_S_Senior_Visual_Designer.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="ribbon-item ribbon-button"
            title="Open Deepak's Senior Visual Designer Resume (PDF)"
          >
            <FileText size={16} className="ribbon-icon" />
            <span className="ribbon-text">View Resume</span>
          </a>

          <a
            href="https://wa.me/919663854809"
            target="_blank"
            rel="noopener noreferrer"
            className="ribbon-item"
            title="Chat on WhatsApp or Call"
          >
            <Phone size={15} className="ribbon-icon" />
            <span className="ribbon-text">Call / Whatsapp : +91 96638 54809</span>
          </a>

          <a
            href="mailto:webdev.deepak18@gmail.com"
            className="ribbon-item"
            title="Send Email"
          >
            <Mail size={15} className="ribbon-icon" />
            <span className="ribbon-text">Email: webdev.deepak18@gmail.com</span>
          </a>

          <a
            href="https://www.linkedin.com/in/deepak-ui-ux-designer/"
            target="_blank"
            rel="noopener noreferrer"
            className="ribbon-item"
            title="Deepak S on LinkedIn"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ribbon-icon"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect width="4" height="12" x="2" y="9" />
              <circle cx="4" cy="4" r="2" />
            </svg>
            <span className="ribbon-text">LinkedIn</span>
          </a>

          <div className="ribbon-item ribbon-location">
            <MapPin size={15} className="ribbon-icon" />
            <span className="ribbon-text">Bangalore</span>
          </div>
        </div>
      </footer>

      {/* 7. Resume Modal */}
      <ResumeModal 
        isOpen={isResumeOpen} 
        onClose={() => setIsResumeOpen(false)} 
      />
    </div>
  );
}

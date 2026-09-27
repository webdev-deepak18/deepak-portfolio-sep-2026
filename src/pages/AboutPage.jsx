import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import OceanBackground from '../components/OceanBackground';

/**
 * Clean Tool Names (Logos removed as requested)
 */
const TOOLS = [
  'Figma',
  'Adobe Illustrator',
  'Adobe Photoshop',
  'Adobe After Effects',
  'Adobe Premiere Pro',
  'React',
  'HTML5 & CSS3',
  'JavaScript',
  'Tailwind CSS',
  'Google Antigravity',
  'Gemini API',
  'Agentic AI',
];

/**
 * AboutPage Component
 * Clean, expansive executive bio matching user wireframe and philosophy:
 * - Left: Candidate portrait photo (assets/deepak.jpg)
 * - Middle: "About Me" headline + problem-solving design philosophy + how I think
 * - Right: 4 short and sweet metrics in a 2x2 grid (B2B SaaS, 10x Velocity, 100% Parity, 50% Cycles)
 * - Lower: Minimalist text-only infinite tools slider (logos removed)
 * - Balanced layout filling the viewport gracefully
 */
export default function AboutPage({ onNavigate }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-wrapper page-about-clean-root">
      {/* Deep Ocean Freight Maritime Background Continuity */}
      <OceanBackground />

      {/* Top Header Navigation */}
      <Header currentPage="about" onNavigate={onNavigate} />

      {/* Main Expansive Content Viewport */}
      <main className="about-clean-container">
        
        {/* Upper Hero Card (Photo + Bio Text + 2x2 Metrics Grid) */}
        <section className="about-executive-card">
          
          {/* 1. Left: Candidate Photo (Expansive Rounded Portrait) */}
          <div className="about-photo-column">
            <div className="about-photo-frame">
              <img 
                src="/assets/deepak.jpg" 
                alt="Deepak S" 
                className="about-photo-image"
                onError={(e) => {
                  e.currentTarget.src = './assets/deepak.jpg';
                }}
              />
            </div>
          </div>

          {/* 2. Right: About Me & Problem-Solving Philosophy */}
          <div className="about-bio-column">
            <h1 className="about-clean-headline">About Me</h1>
            
            <p className="about-clean-para intro">
              I don't design screens for the sake of beauty alone, but to solve real business problems.
              Every layout, typography choice, and interaction is engineered to turn complex enterprise workflows
              into intuitive, high-converting digital products.
            </p>

            <p className="about-clean-para thinking">
              I'm a designer first, but knowing how to code and orchestrate modern AI tools makes my designs practical,
              production-ready, and 10x faster. I design in Figma, understand browser rendering, and bridge the gap
              between brand storytelling and front-end engineering.
            </p>

            <div className="about-meta-row">
              <span className="about-meta-pill">📍 Bengaluru, India (Hybrid / Remote)</span>
              <span className="about-meta-pill highlight">✦ AI-First Senior Visual Designer</span>
            </div>
          </div>

        </section>

        {/* Lower Tools Slider (Text-only infinite marquee, no logos, no headline) */}
        <section className="about-tools-slider-section" aria-label="Tools and Technologies">
          <div className="tools-marquee-container">
            <div className="tools-marquee-track">
              {/* Render duplicated list for continuous seamless infinite scroll */}
              {[...TOOLS, ...TOOLS].map((toolName, idx) => (
                <div key={idx} className="tool-slider-item">
                  <span className="tool-slider-name">{toolName}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* Bottom Contact Ribbon with LinkedIn */}
      <Footer />
    </div>
  );
}

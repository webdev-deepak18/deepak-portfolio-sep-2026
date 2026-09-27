import React from 'react';
import { X, Mail, Phone, MapPin, Award, CheckCircle2 } from 'lucide-react';

/**
 * ResumeModal Component
 * Interactive, high-impact resume summary tailored specifically for
 * the GoComet Senior Brand Designer role.
 */
export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="resume-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="resume-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="resume-modal-header">
          <div className="candidate-intro">
            <h2 className="candidate-name">Deepak S</h2>
            <p className="candidate-role-target">Senior Brand Designer Candidate for GoComet</p>
            <div className="candidate-meta-badges">
              <span className="meta-badge"><MapPin size={13} /> Bangalore, India</span>
              <span className="meta-badge"><Mail size={13} /> webdev.deepak18@gmail.com</span>
              <span className="meta-badge"><Phone size={13} /> +91 96638 54809</span>
            </div>
          </div>
          <button 
            type="button" 
            className="modal-close-btn" 
            onClick={onClose}
            aria-label="Close resume modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="resume-modal-body">
          {/* Executive Summary */}
          <section className="resume-section">
            <h3 className="section-title">
              <Award size={18} className="section-icon" />
              Executive Profile
            </h3>
            <p className="section-text">
              Senior Brand & Visual Experience Designer with extensive expertise in B2B SaaS ecosystems,
              multimodal design systems, and AI-enabled design workflows. Combines meticulous brand identity
              craftsmanship (typography, color science, marketing collateral) with deep frontend knowledge
              (HTML/CSS, React, interactive prototypes). Specializes in transforming complex enterprise SaaS workflows
              into visually magnetic, high-converting digital touchpoints.
            </p>
          </section>

          {/* Core Strengths for GoComet */}
          <section className="resume-section">
            <h3 className="section-title">
              <CheckCircle2 size={18} className="section-icon" />
              Strategic Alignment with GoComet
            </h3>
            <div className="strengths-grid">
              <div className="strength-item">
                <h4>AI-Native Design & Accelerated Workflows</h4>
                <p>Advanced mastery of generative AI tools (Midjourney, Stable Diffusion, Claude, Gemini, Cursor) to multiply design speed, ideate concept art, and build production assets 10x faster.</p>
              </div>
              <div className="strength-item">
                <h4>Enterprise SaaS Brand Systems</h4>
                <p>Proven track record engineering scalable design tokens, component libraries, marketing design systems, and multi-channel brand guidelines for enterprise B2B audiences.</p>
              </div>
              <div className="strength-item">
                <h4>Interactive & 3D Web Experiences</h4>
                <p>Hands-on proficiency bringing brand identities to life with 3D WebGL, interactive logistics visualizers, micro-animations, and performant web applications.</p>
              </div>
              <div className="strength-item">
                <h4>Comprehensive Collateral Craftsmanship</h4>
                <p>Expertise across high-stakes investor pitch decks, executive summits, multi-page whitepapers, print collateral, display ads, and video teasers.</p>
              </div>
            </div>
          </section>

          {/* Core Technical & Design Stack */}
          <section className="resume-section">
            <h3 className="section-title">Design & Tooling Stack</h3>
            <div className="skills-tags-container">
              <span className="skill-pill">Figma & FigJam</span>
              <span className="skill-pill">Design Tokens & W3C Systems</span>
              <span className="skill-pill">Adobe Creative Cloud (Ai, Ps, Id, Ae)</span>
              <span className="skill-pill">Midjourney & Stable Diffusion</span>
              <span className="skill-pill">HTML5 / Modern CSS / Vanilla CSS</span>
              <span className="skill-pill">React & Vite</span>
              <span className="skill-pill">Three.js / WebGL / Canvas</span>
              <span className="skill-pill">Motion Graphics & Video Editing</span>
              <span className="skill-pill">B2B Conversion Optimization</span>
            </div>
          </section>
        </div>

        {/* Modal Footer / Actions */}
        <div className="resume-modal-footer">
          <a
            href="mailto:webdev.deepak18@gmail.com?subject=GoComet%20Senior%20Brand%20Designer%20Role%20-%20Deepak%20S"
            className="resume-action-btn secondary"
          >
            <Mail size={16} />
            <span>Send Direct Email</span>
          </a>
          <a
            href="https://wa.me/919663854809"
            target="_blank"
            rel="noopener noreferrer"
            className="resume-action-btn primary"
          >
            <Phone size={16} />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}

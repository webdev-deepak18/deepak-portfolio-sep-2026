import React from 'react';
import { Phone, Mail, MapPin, FileText } from 'lucide-react';

/**
 * Footer Ribbon Component
 * Shared across the portfolio to match the Home page bottom ribbon exactly.
 */
export default function Footer({ className = '' }) {
  return (
    <footer className={`home-bottom-ribbon inner-page-ribbon ${className}`.trim()} role="contentinfo">
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
  );
}

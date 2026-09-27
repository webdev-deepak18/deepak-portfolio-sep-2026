import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import OceanBackground from '../components/OceanBackground';

/**
 * Page 4: Motion & Video Storytelling
 * Built strictly according to the candidate Figma low-fi wireframe,
 * embedding the provided YouTube video showreels without play CTAs.
 */
const MOTION_VIDEOS = [
  {
    id: 'hrwest-2027-promo',
    title: 'HRWest 2027 Promo',
    embedUrl: 'https://www.youtube.com/embed/n8xlsyFHBnU?si=i-NTHS-HEzUGxAQX',
  },
  {
    id: 'future-of-human-experience-2025',
    title: "HR.com's Future of Human Experience 2025 Research video",
    embedUrl: 'https://www.youtube.com/embed/W2sKRVnU9tM?si=OQG3qePQnp-UVyEy',
  },
  {
    id: 'future-of-performance-management-2024-25',
    title: "HR.com's Future of performance management 2024-25 video",
    embedUrl: 'https://www.youtube.com/embed/8M-X17bcvtI?si=v4xWhm_0XgybYXWG',
  },
];

export default function MotionPage({ onNavigate }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="page-wrapper page-motion-dark">
      {/* 1. Fixed Ocean Background with Animated Waves & Continuous Cargo Ships */}
      <OceanBackground />

      {/* 2. Navigation Header (Single Home Return Button + Candidate Role Info) */}
      <Header currentPage="motion" onNavigate={onNavigate} />

      {/* 3. Main Full-Width Content Container */}
      <main className="main-content-fluid" role="main">
        {MOTION_VIDEOS.map((video) => (
          <section key={video.id} className="figma-portfolio-section motion-section-block">
            <h2 className="figma-section-title">{video.title}</h2>

            <div className="motion-video-card">
              <div className="motion-video-frame">
                <iframe
                  src={video.embedUrl}
                  title={video.title}
                  className="motion-video-iframe"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
          </section>
        ))}
      </main>

      {/* 4. Footer Ribbon matching Home page bottom ribbon */}
      <Footer />
    </div>
  );
}

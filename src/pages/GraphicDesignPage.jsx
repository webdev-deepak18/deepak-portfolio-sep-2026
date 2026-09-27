import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import OceanBackground from '../components/OceanBackground';
import PdfViewerModal from '../components/PdfViewerModal';
import ImageLightboxModal from '../components/ImageLightboxModal';
import { ArrowUpRight } from 'lucide-react';

// Presentations (from screenshot - paths completely removed)
const PRESENTATIONS = [
  {
    id: 'sushrut',
    title: 'Sushrut Prospectus',
    thumbnail: '/assets/thumbnails/sushrut-prospectus-thumbnail.jpg',
    pdfUrl: '/assets/sushrut-prospectus.pdf',
  },
  {
    id: 'hrwest',
    title: 'HRWest Prospectus',
    thumbnail: '/assets/thumbnails/hrwest-brochure-thumbnail.jpg',
    pdfUrl: '/assets/hrwest-brochure.pdf',
  },
];

// Digital Ads (from screenshot: 6 ad creatives in a 3x2 grid)
const DIGITAL_ADS = [
  {
    id: 'ad-amazon',
    title: 'Amazon SugarKnocker Creative',
    image: '/assets/amazon-sugarknocker.jpg',
  },
  {
    id: 'ad-hrwest',
    title: 'HR West 2026 Registration Campaign',
    image: '/assets/hrwest-2026.jpg',
  },
  {
    id: 'ad-paycom',
    title: 'Serena Williams and Paycom',
    image: '/assets/serena-williams-paycom.jpg',
  },
  {
    id: 'ad-kites',
    title: 'Kites Construction Campaign',
    image: '/assets/kites-construction-ad.jpg',
  },
  {
    id: 'ad-securesave',
    title: 'Building Financial Security at Work',
    image: '/assets/webcast-creative-securesave.jpg',
  },
  {
    id: 'ad-certified',
    title: 'Why Get HR Certified?',
    image: '/assets/why-get-certified.jpg',
  },
];

// Brochures (from screenshot: 3 brochures)
const BROCHURES = [
  {
    id: 'brochure-human-experience',
    thumbnail: '/assets/thumbnails/human-experience-summit-thumbnail.jpg',
    pdfUrl: '/assets/HumanExperienceSummit_Brochure.pdf',
    title: 'Human Experience Summit Brochure',
  },
  {
    id: 'brochure-kites',
    thumbnail: '/assets/thumbnails/kites-brochure-thumbnail.jpg',
    pdfUrl: '/assets/kites-brochure.pdf',
    title: 'Kites Construction Brochure',
  },
  {
    id: 'brochure-osf',
    thumbnail: '/assets/thumbnails/osf-brochure-thumnail.jpg',
    pdfUrl: '/assets/osf-brochure.pdf',
    title: 'The Square Feet Brochure',
  },
];

// Infographics (from screenshot: 3 infographics with titles)
const INFOGRAPHICS = [
  {
    id: 'info-recruitment',
    title: 'The Future of Recruitment Technologies 2021-22',
    thumbnail: '/assets/thumbnails/future-of-recruitment-infographic-thumbnail.jpg',
    pdfUrl: '/assets/future-of-recruitment-infographic.pdf',
  },
  {
    id: 'info-motivosity',
    title: 'Workplace Culture and Connections 2026',
    thumbnail: '/assets/thumbnails/motivosity-thubmnail.jpg',
    pdfUrl: '/assets/motifvosity-infographic.pdf',
  },
  {
    id: 'info-wellbeing',
    title: 'The State of Employee Health and Well-being 2021',
    thumbnail: '/assets/thumbnails/state-of-employee-wellbeing-thumbnail.jpg',
    pdfUrl: '/assets/state-of-employee-wellbeing-2021.pdf',
  },
];

export default function GraphicDesignPage({ onNavigate }) {
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [lightboxState, setLightboxState] = useState({
    isOpen: false,
    items: [],
    currentIndex: 0,
  });

  const openLightbox = (items, index = 0) => {
    setLightboxState({
      isOpen: true,
      items,
      currentIndex: index,
    });
  };

  const handleOpenDoc = (item) => {
    if (item.isImage) {
      const imageBrochures = BROCHURES.filter((b) => b.isImage);
      const idx = imageBrochures.findIndex((b) => b.id === item.id);
      openLightbox(imageBrochures, idx >= 0 ? idx : 0);
    } else {
      setSelectedPdf({
        url: item.pdfUrl,
        title: item.title,
      });
    }
  };

  return (
    <div className="page-wrapper page-graphic-design-dark">
      {/* 1. Fixed Ocean Background with Animated Waves & 3 Container Cargo Ships */}
      <OceanBackground />

      {/* 2. Navigation Header (Single Home Return Icon & Candidate Title) */}
      <Header currentPage="graphic-design" onNavigate={onNavigate} />

      {/* 3. Main Full-Width Content with Generous Margins */}
      <main className="main-content-fluid" role="main">
        {/* =========================================================================
            SECTION 1: PRESENTATIONS (No paths, unified GoComet brand buttons)
           ========================================================================= */}
        <section className="figma-portfolio-section">
          <h2 className="figma-section-title">Presentations</h2>

          <div className="figma-presentations-grid">
            {PRESENTATIONS.map((item) => (
              <div key={item.id} className="figma-doc-card">
                <div
                  className="figma-thumbnail-wrapper presentation-ratio"
                  onClick={() => handleOpenDoc(item)}
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="figma-card-img"
                    loading="lazy"
                  />
                  <div className="figma-card-hover-overlay">
                    <span className="gc-brand-btn">
                      <span>View PDF</span>
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                </div>

                <div className="figma-card-caption">
                  <div className="figma-item-title">{item.title}</div>
                  <button
                    type="button"
                    className="gc-brand-btn"
                    onClick={() => handleOpenDoc(item)}
                  >
                    <span>View PDF</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: DIGITAL ADS (3-Column x 2-Row Clean Visual Grid with Next/Prev)
           ========================================================================= */}
        <section className="figma-portfolio-section">
          <h2 className="figma-section-title">Digital Ads</h2>

          <div className="figma-ads-grid">
            {DIGITAL_ADS.map((ad, idx) => (
              <div
                key={ad.id}
                className="figma-ad-card"
                onClick={() => openLightbox(DIGITAL_ADS, idx)}
                title="Click to view creative"
              >
                <img
                  src={ad.image}
                  alt={ad.title}
                  className="figma-ad-img"
                  loading="lazy"
                />
                <div className="figma-card-hover-overlay">
                  <span className="gc-brand-btn">
                    <span>Inspect Creative</span>
                    <ArrowUpRight size={14} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: BROCHURES (Unified GoComet Brand Buttons)
           ========================================================================= */}
        <section className="figma-portfolio-section">
          <h2 className="figma-section-title">Brochures</h2>

          <div className="figma-brochures-grid">
            {BROCHURES.map((item) => (
              <div key={item.id} className="figma-doc-card">
                <div
                  className="figma-thumbnail-wrapper brochure-ratio"
                  onClick={() => handleOpenDoc(item)}
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="figma-card-img"
                    loading="lazy"
                  />
                  <div className="figma-card-hover-overlay">
                    <span className="gc-brand-btn">
                      <span>View PDF</span>
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                </div>

                <div className="figma-card-caption">
                  <button
                    type="button"
                    className="gc-brand-btn"
                    onClick={() => handleOpenDoc(item)}
                  >
                    <span>View PDF</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: INFOGRAPHICS (Exact Titles & Unified GoComet Brand Buttons)
           ========================================================================= */}
        <section className="figma-portfolio-section">
          <h2 className="figma-section-title">Infographics</h2>

          <div className="figma-infographics-grid">
            {INFOGRAPHICS.map((item) => (
              <div key={item.id} className="figma-doc-card">
                <div
                  className="figma-thumbnail-wrapper infographic-ratio"
                  onClick={() => handleOpenDoc(item)}
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="figma-card-img"
                    loading="lazy"
                  />
                  <div className="figma-card-hover-overlay">
                    <span className="gc-brand-btn">
                      <span>View PDF</span>
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                </div>

                <div className="figma-card-caption">
                  <div className="figma-item-title center">{item.title}</div>
                  <button
                    type="button"
                    className="gc-brand-btn"
                    onClick={() => handleOpenDoc(item)}
                  >
                    <span>View PDF</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* 4. Footer Ribbon */}
      <Footer />

      {/* 5. In-App Document Viewer & Lightbox Modals */}
      <PdfViewerModal
        isOpen={!!selectedPdf}
        pdfUrl={selectedPdf?.url}
        title={selectedPdf?.title}
        onClose={() => setSelectedPdf(null)}
      />

      <ImageLightboxModal
        isOpen={lightboxState.isOpen}
        items={lightboxState.items}
        currentIndex={lightboxState.currentIndex}
        onNavigate={(newIdx) =>
          setLightboxState((prev) => ({ ...prev, currentIndex: newIdx }))
        }
        onClose={() => setLightboxState((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}

import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import OceanBackground from '../components/OceanBackground';
import PdfViewerModal from '../components/PdfViewerModal';
import { ArrowUpRight } from 'lucide-react';

/**
 * Page 3: Websites, Landing Pages & AI Workflows
 * Built strictly according to the candidate Figma low-fi wireframe,
 * using exact project titles, high-resolution UI captures, and unified GoComet brand CTAs.
 */
const WEBSITES = [
  {
    id: 'hrwest-2027',
    title: 'HRWest 2027',
    image: '/assets/thumbnails/hrwest-2027-thumbnail.jpg',
    links: [
      {
        label: 'Live Site',
        url: 'https://www.hr.com/en/webcasts_events/live_events/hrwest/hrwest-hr-conference_laapwgci.html',
      },
      {
        label: 'Github Repo',
        url: 'https://github.com/deepak-hrdotcom/hrdotcom-working/tree/main/00-hrwest-2027',
      },
    ],
  },
  {
    id: 'hr-certifications',
    title: 'HR.com Certifications',
    image: '/assets/thumbnails/certification-pages-thumbnail.jpg',
    links: [
      {
        label: 'Live Site',
        url: 'https://www.mypeople001.com/en/certifications/our-program_mtvdpt3u.html',
      },
      {
        label: 'Github Repo',
        url: 'https://github.com/deepak-hrdotcom/hrdotcom-working/tree/main/01-education/02-certification-pages',
      },
    ],
  },
  {
    id: '17oranges',
    title: '17 Oranges Agency',
    image: '/assets/thumbnails/17oranges-thumbnail.jpg',
    links: [
      {
        label: 'Live Site',
        url: 'https://17oranges.com/',
      },
      {
        label: 'Figma Design',
        url: 'https://www.figma.com/design/3VpM7BZWc0nHIXHemFsCpC/17Oranges?node-id=6-2',
      },
      {
        label: 'Figma Prototype',
        url: 'https://www.figma.com/proto/3VpM7BZWc0nHIXHemFsCpC/17Oranges?node-id=6-37',
      },
    ],
  },
  {
    id: 'sst-crm',
    title: 'SST Travels CRM',
    image: '/assets/thumbnails/sst-travels-thumbnail.jpg',
    links: [
      {
        label: 'Figma Design',
        url: 'https://www.figma.com/design/5NBdaFDvSVCrgc9MwS1vEX/SST-CRM?node-id=9628-2458',
      },
      {
        label: 'Figma Prototype',
        url: 'https://www.figma.com/proto/5NBdaFDvSVCrgc9MwS1vEX/SST-CRM?node-id=9748-253',
      },
    ],
  },
  {
    id: 'sf-travels',
    title: 'SF Travels',
    image: '/assets/thumbnails/sf-travels-thumbnail.jpg',
    links: [
      {
        label: 'Live Site',
        url: 'https://www.sftravels.in/',
      },
      {
        label: 'Github Repo',
        url: 'https://github.com/webdev-deepak18/sftravels-in',
      },
    ],
  },
  {
    id: 'supplier-query-management',
    title: 'Supplier Query Management SaaS Module',
    image: '/assets/thumbnails/supplier-query-management-thumbnail.jpg',
    links: [
      {
        label: 'View PDF',
        isPdf: true,
        pdfUrl: '/assets/supplier-query-management-module.pdf',
      },
      {
        label: 'Figma Design',
        url: 'https://www.figma.com/design/GtSsk0l7qLHRAN1QQ3UdbM/Supplier-Query-Management---UI-UX-Assignment?node-id=0-1',
      },
    ],
  },
  {
    id: 'email-builder',
    title: 'HR.com Email Builder',
    image: '/assets/thumbnails/email-generator-thumbnail.jpg',
    links: [
      {
        label: 'Live Web App',
        url: 'https://hrdotcom-working.vercel.app/',
      },
    ],
  },
];

export default function WebsitesPage({ onNavigate }) {
  const [selectedPdf, setSelectedPdf] = useState(null);

  return (
    <div className="page-wrapper page-websites-dark">
      {/* 1. Fixed Ocean Background with Animated Waves & Continuous Container Ships */}
      <OceanBackground />

      {/* 2. Navigation Header (Single Home Return Button + Candidate Info) */}
      <Header currentPage="websites" onNavigate={onNavigate} />

      {/* 3. Main Full-Width Content Container */}
      <main className="main-content-fluid" role="main">
        {WEBSITES.map((site) => (
          <section key={site.id} className="figma-portfolio-section website-section-block">
            <h2 className="figma-section-title">{site.title}</h2>

            <div className="website-showcase-card">
              <div className="website-image-frame">
                <img
                  src={site.image}
                  alt={site.title}
                  className="website-showcase-img"
                  loading="lazy"
                />
              </div>

              <div className="website-action-ribbon">
                {site.links.map((link, lIdx) =>
                  link.isPdf ? (
                    <a
                      key={lIdx}
                      href={link.pdfUrl}
                      className="gc-brand-btn"
                      onClick={(e) => {
                        if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                          e.preventDefault();
                          setSelectedPdf({
                            url: link.pdfUrl,
                            title: site.title,
                          });
                        }
                      }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight size={14} />
                    </a>
                  ) : (
                    <a
                      key={lIdx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gc-brand-btn"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight size={14} />
                    </a>
                  )
                )}
              </div>
            </div>
          </section>
        ))}
      </main>

      {/* 4. Footer Ribbon matching Home page bottom ribbon */}
      <Footer />

      {/* 5. In-App Document Viewer for Deliverable PDFs */}
      <PdfViewerModal
        isOpen={!!selectedPdf}
        pdfUrl={selectedPdf?.url}
        title={selectedPdf?.title}
        onClose={() => setSelectedPdf(null)}
      />
    </div>
  );
}

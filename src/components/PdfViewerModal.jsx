import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Loader2,
  ExternalLink
} from 'lucide-react';

// Configure PDF.js worker using the rock-solid v3.11 worker
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
}

/**
 * Individual PDF Page renderer component
 * Lazy-loads and renders on high-DPI canvas with layout placeholder
 */
function PdfPageItem({ doc, pageNum, scale, containerRef, numPages }) {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);
  const renderTaskRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isRendered, setIsRendered] = useState(false);
  const [shouldRender, setShouldRender] = useState(pageNum <= 2); // First 2 pages render immediately

  // 1. Calculate page aspect ratio & dimensions for zero-shift layout
  useEffect(() => {
    let isMounted = true;
    if (!doc) return;

    doc.getPage(pageNum).then((page) => {
      if (!isMounted) return;
      const viewport = page.getViewport({ scale });
      setDimensions({
        width: Math.floor(viewport.width),
        height: Math.floor(viewport.height),
      });
    }).catch((err) => {
      console.warn(`Error getting page ${pageNum} dimensions:`, err);
    });

    return () => {
      isMounted = false;
    };
  }, [doc, pageNum, scale]);

  // 2. Intersection observer to trigger rendering when entering/near viewport (600px buffer)
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldRender(true);
          }
        });
      },
      {
        root: containerRef.current,
        rootMargin: '600px 0px 600px 0px',
        threshold: 0.01,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [containerRef]);

  // 3. Render page onto Canvas
  useEffect(() => {
    let isMounted = true;
    if (!doc || !shouldRender || !canvasRef.current) return;

    const render = async () => {
      try {
        const page = await doc.getPage(pageNum);
        if (!isMounted) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        if (renderTaskRef.current) {
          try {
            renderTaskRef.current.cancel();
          } catch (e) {}
        }

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const viewport = page.getViewport({ scale });

        canvas.width = Math.floor(viewport.width * dpr);
        canvas.height = Math.floor(viewport.height * dpr);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const renderTask = page.render({
          canvasContext: ctx,
          viewport: viewport,
        });

        renderTaskRef.current = renderTask;
        await renderTask.promise;
        if (isMounted) setIsRendered(true);
      } catch (err) {
        if (err?.name !== 'RenderingCancelledException') {
          console.error(`Page ${pageNum} render error:`, err);
        }
      }
    };

    render();

    return () => {
      isMounted = false;
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel();
        } catch (e) {}
      }
    };
  }, [doc, pageNum, scale, shouldRender]);

  return (
    <div
      id={`pdf-page-item-${pageNum}`}
      data-page-num={pageNum}
      ref={wrapperRef}
      className="pdf-page-wrapper"
      style={{
        width: dimensions.width ? `${dimensions.width}px` : '100%',
        minHeight: dimensions.height ? `${dimensions.height}px` : '400px',
      }}
    >
      <canvas
        ref={canvasRef}
        className="pdf-render-canvas"
        style={{
          opacity: isRendered ? 1 : 0,
          transition: 'opacity 0.22s ease-in',
        }}
      />
      {!isRendered && (
        <div className="pdf-page-placeholder" style={{ minHeight: dimensions.height || 400 }}>
          <Loader2 size={24} className="pdf-spinner" />
          <span>Page {pageNum}</span>
        </div>
      )}
      <div className="pdf-page-corner-badge">
        {pageNum} / {numPages}
      </div>
    </div>
  );
}

export default function PdfViewerModal({ isOpen, pdfUrl, title, onClose }) {
  const [pdfDoc, setPdfDoc] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [scale, setScale] = useState(1.15);
  const [isLoading, setIsLoading] = useState(false);
  const [useIframeFallback, setUseIframeFallback] = useState(false);

  const containerRef = useRef(null);
  const isProgrammaticScroll = useRef(false);
  const scrollTimeoutRef = useRef(null);

  // 1. Load document with PDF.js, with automatic fallback
  useEffect(() => {
    if (!isOpen || !pdfUrl) {
      setPdfDoc(null);
      setCurrentPage(1);
      setNumPages(0);
      setUseIframeFallback(false);
      return;
    }

    let isMounted = true;
    setIsLoading(true);
    setUseIframeFallback(false);
    setCurrentPage(1);
    setScale(1.15);

    const loadingTask = pdfjsLib.getDocument({
      url: pdfUrl,
      cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/cmaps/',
      cMapPacked: true,
    });

    loadingTask.promise
      .then((doc) => {
        if (!isMounted) return;
        setPdfDoc(doc);
        setNumPages(doc.numPages);
        setIsLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.warn('PDF.js canvas render fallback to clean iframe:', err);
        setUseIframeFallback(true);
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
      try {
        loadingTask.destroy();
      } catch (e) {}
    };
  }, [isOpen, pdfUrl]);

  // 2. Smooth programmatic scroll to specific page
  const scrollToPage = useCallback((targetPageNum) => {
    if (!numPages) return;
    const pageClamped = Math.max(1, Math.min(targetPageNum, numPages));
    const el = document.getElementById(`pdf-page-item-${pageClamped}`);
    if (el && containerRef.current) {
      isProgrammaticScroll.current = true;
      setCurrentPage(pageClamped);
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });

      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 600);
    }
  }, [numPages]);

  // 3. Scroll tracking: updates top bar page counter in real-time as user scrolls naturally
  const handleScroll = useCallback(() => {
    if (!containerRef.current || isProgrammaticScroll.current || numPages <= 1) return;
    const container = containerRef.current;
    const scrollTop = container.scrollTop;
    const containerHeight = container.clientHeight;
    // Track page at the focus point (35% down the viewport)
    const targetPoint = scrollTop + containerHeight * 0.35;

    const pageElements = container.querySelectorAll('.pdf-page-wrapper');
    for (let i = 0; i < pageElements.length; i++) {
      const el = pageElements[i];
      const top = el.offsetTop;
      const height = el.offsetHeight;
      if (targetPoint >= top && targetPoint <= top + height) {
        const pNum = Number(el.getAttribute('data-page-num'));
        if (pNum && pNum !== currentPage) {
          setCurrentPage(pNum);
        }
        break;
      }
    }
  }, [currentPage, numPages]);

  // 4. Keyboard shortcuts for navigation and exit
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        scrollToPage(currentPage + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        scrollToPage(currentPage - 1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        scrollToPage(1);
      } else if (e.key === 'End') {
        e.preventDefault();
        scrollToPage(numPages);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [isOpen, numPages, currentPage, scrollToPage, onClose]);

  // 5. Button handlers for Page Navigation
  const handlePrevPage = () => {
    scrollToPage(currentPage - 1);
  };

  const handleNextPage = () => {
    scrollToPage(currentPage + 1);
  };

  // 6. Zoom handlers
  const handleZoomIn = () => {
    setScale((prev) => Math.min(Math.round((prev + 0.15) * 100) / 100, 2.5));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(Math.round((prev - 0.15) * 100) / 100, 0.6));
  };

  const handleResetZoom = () => {
    setScale(1.15);
  };

  if (!isOpen) return null;

  return (
    <div className="pdf-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="pdf-custom-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* ONE SINGLE ROW UNIFIED HEADER */}
        <div className="pdf-single-row-header">
          {/* Left: Clean Document Title */}
          <div className="pdf-header-title-box" title={title}>
            <span className="pdf-header-title">{title}</span>
          </div>

          {/* Center: Clean Page Number Controls with Both Scroll & Click support */}
          {!useIframeFallback && numPages > 0 && (
            <div className="pdf-page-controls">
              <button
                type="button"
                className="pdf-ctrl-btn"
                onClick={handlePrevPage}
                disabled={currentPage <= 1}
                title="Previous Page (Left Arrow / PageUp)"
                aria-label="Previous Page"
              >
                <ChevronLeft size={16} />
              </button>

              <span className="pdf-page-badge">
                Page <strong className="page-num-highlight">{currentPage}</strong> of {numPages}
              </span>

              <button
                type="button"
                className="pdf-ctrl-btn"
                onClick={handleNextPage}
                disabled={currentPage >= numPages}
                title="Next Page (Right Arrow / PageDown)"
                aria-label="Next Page"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}

          {/* Right: Zoom Options & Close Button */}
          <div className="pdf-header-actions">
            {!useIframeFallback && (
              <div className="pdf-zoom-group">
                <button
                  type="button"
                  className="pdf-ctrl-btn"
                  onClick={handleZoomOut}
                  disabled={scale <= 0.6}
                  title="Zoom Out"
                  aria-label="Zoom Out"
                >
                  <ZoomOut size={15} />
                </button>

                <button
                  type="button"
                  className="pdf-zoom-val-btn"
                  onClick={handleResetZoom}
                  title="Reset Zoom to 115%"
                  aria-label="Reset Zoom"
                >
                  {Math.round(scale * 100)}%
                </button>

                <button
                  type="button"
                  className="pdf-ctrl-btn"
                  onClick={handleZoomIn}
                  disabled={scale >= 2.5}
                  title="Zoom In"
                  aria-label="Zoom In"
                >
                  <ZoomIn size={15} />
                </button>
              </div>
            )}

            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pdf-modal-close-pill"
              title="Open raw PDF in new tab"
              style={{ textDecoration: 'none' }}
              aria-label="Open PDF in new tab"
            >
              <ExternalLink size={15} />
            </a>

            <button
              type="button"
              className="pdf-modal-close-pill"
              onClick={onClose}
              title="Close (Esc)"
              aria-label="Close PDF Viewer"
            >
              <X size={17} />
            </button>
          </div>
        </div>

        {/* PDF VIEWPORT (Continuous Scroll Stream + Direct Page Jumps) */}
        <div
          className="pdf-canvas-container"
          ref={containerRef}
          onScroll={handleScroll}
        >
          {isLoading && (
            <div className="pdf-loader-wrap">
              <Loader2 size={32} className="pdf-spinner" />
              <span>Loading document...</span>
            </div>
          )}

          {useIframeFallback ? (
            <iframe
              src={`${pdfUrl}#toolbar=0&navpanes=0`}
              title={title}
              className="pdf-iframe-clean"
            />
          ) : (
            <div className="pdf-pages-list">
              {Array.from({ length: numPages }, (_, index) => index + 1).map((pageNum) => (
                <PdfPageItem
                  key={`${pdfUrl}-page-${pageNum}`}
                  doc={pdfDoc}
                  pageNum={pageNum}
                  scale={scale}
                  containerRef={containerRef}
                  numPages={numPages}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

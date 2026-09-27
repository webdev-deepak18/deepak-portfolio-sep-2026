import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Loader2,
  ExternalLink
} from 'lucide-react';

// Configure PDF.js worker using the rock-solid v3.11 worker
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
}

export default function PdfViewerModal({ isOpen, pdfUrl, title, onClose }) {
  const [pdfDoc, setPdfDoc] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [scale, setScale] = useState(1.15);
  const [isLoading, setIsLoading] = useState(false);
  const [useIframeFallback, setUseIframeFallback] = useState(false);

  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const renderTaskRef = useRef(null);

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

  // 2. Render page onto Canvas
  const renderPage = useCallback(
    async (pageNum, currentScale) => {
      if (!pdfDoc || !canvasRef.current || useIframeFallback) return;

      try {
        const page = await pdfDoc.getPage(pageNum);
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // Cancel previous render task if active
        if (renderTaskRef.current) {
          try {
            renderTaskRef.current.cancel();
          } catch (e) {}
        }

        const dpr = window.devicePixelRatio || 1;
        const viewport = page.getViewport({ scale: currentScale });

        // Set dimensions for high-DPI Retina displays
        canvas.width = Math.floor(viewport.width * dpr);
        canvas.height = Math.floor(viewport.height * dpr);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const renderContext = {
          canvasContext: ctx,
          viewport: viewport,
        };

        const task = page.render(renderContext);
        renderTaskRef.current = task;
        await task.promise;
      } catch (err) {
        if (err?.name !== 'RenderingCancelledException') {
          console.error('Page render error:', err);
        }
      }
    },
    [pdfDoc, useIframeFallback]
  );

  useEffect(() => {
    if (pdfDoc && currentPage && !useIframeFallback) {
      renderPage(currentPage, scale);
    }
  }, [pdfDoc, currentPage, scale, renderPage, useIframeFallback]);

  // 3. Keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        setCurrentPage((prev) => Math.min(prev + 1, numPages || 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, numPages, onClose]);

  // 4. Page handlers
  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
    if (containerRef.current) containerRef.current.scrollTop = 0;
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, numPages));
    if (containerRef.current) containerRef.current.scrollTop = 0;
  };

  // 5. Zoom handlers
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

          {/* Center: Clean Page Number Controls (no print/drive/edit clutter) */}
          {!useIframeFallback && numPages > 0 && (
            <div className="pdf-page-controls">
              <button
                type="button"
                className="pdf-ctrl-btn"
                onClick={handlePrevPage}
                disabled={currentPage <= 1}
                title="Previous Page (Left Arrow)"
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
                title="Next Page (Right Arrow)"
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
                >
                  <ZoomOut size={15} />
                </button>

                <button
                  type="button"
                  className="pdf-zoom-val-btn"
                  onClick={handleResetZoom}
                  title="Reset Zoom to 100%"
                >
                  {Math.round(scale * 100)}%
                </button>

                <button
                  type="button"
                  className="pdf-ctrl-btn"
                  onClick={handleZoomIn}
                  disabled={scale >= 2.5}
                  title="Zoom In"
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

        {/* PDF VIEWPORT (Expansive 98vw reading canvas) */}
        <div className="pdf-canvas-container" ref={containerRef}>
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
            <canvas
              ref={canvasRef}
              className="pdf-render-canvas"
              style={{ display: isLoading ? 'none' : 'block' }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

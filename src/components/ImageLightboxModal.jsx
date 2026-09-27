import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ImageLightboxModal({
  isOpen,
  items = [],
  currentIndex = 0,
  onNavigate,
  onClose,
}) {
  const currentItem = items[currentIndex];

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        if (items.length > 1) {
          onNavigate((currentIndex + 1) % items.length);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        if (items.length > 1) {
          onNavigate((currentIndex - 1 + items.length) % items.length);
        }
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentIndex, items.length, onNavigate, onClose]);

  if (!isOpen || !currentItem) return null;

  const handlePrev = (e) => {
    e.stopPropagation();
    if (items.length > 1) {
      onNavigate((currentIndex - 1 + items.length) % items.length);
    }
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (items.length > 1) {
      onNavigate((currentIndex + 1) % items.length);
    }
  };

  return (
    <div className="lightbox-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="lightbox-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Single clean header: Title on Left, Prev/Next & Close on Right */}
        <div className="lightbox-modal-header">
          <div className="lightbox-title-box" title={currentItem.title}>
            <h3 className="lightbox-title">{currentItem.title}</h3>
          </div>

          <div className="lightbox-nav-controls">
            {items.length > 1 && (
              <div className="lightbox-nav-group">
                <button
                  type="button"
                  className="lightbox-nav-btn prev"
                  onClick={handlePrev}
                  title="Previous creative (← or Click)"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={16} />
                  <span>Prev</span>
                </button>

                <span className="lightbox-counter">
                  {currentIndex + 1} of {items.length}
                </span>

                <button
                  type="button"
                  className="lightbox-nav-btn next"
                  onClick={handleNext}
                  title="Next creative (→ or Click)"
                  aria-label="Next image"
                >
                  <span>Next</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            )}

            <button
              type="button"
              className="lightbox-close-pill"
              onClick={onClose}
              title="Close (Esc)"
              aria-label="Close Lightbox"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Image Preview with Floating Prev / Next arrows */}
        <div className="lightbox-image-stage">
          {items.length > 1 && (
            <button
              type="button"
              className="lightbox-float-arrow left"
              onClick={handlePrev}
              title="Previous (← Left Arrow)"
              aria-label="Previous Image"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          <img
            src={currentItem.image || currentItem.url}
            alt={currentItem.title}
            className="lightbox-stage-img"
          />

          {items.length > 1 && (
            <button
              type="button"
              className="lightbox-float-arrow right"
              onClick={handleNext}
              title="Next (→ Right Arrow)"
              aria-label="Next Image"
            >
              <ChevronRight size={28} />
            </button>
          )}
        </div>

        {/* Subtle footer hint */}
        <div className="lightbox-modal-footer">
          <span className="lightbox-hint">
            Use <kbd>←</kbd> and <kbd>→</kbd> arrow keys to navigate • <kbd>Esc</kbd> to close
          </span>
        </div>
      </div>
    </div>
  );
}

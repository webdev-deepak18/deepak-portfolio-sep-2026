import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

/**
 * GlobeBeacons Component
 * Renders the 3 discipline cards anchored directly to the 3D globe horizon.
 * Features:
 * - Center-aligned title and button
 * - Clean layout without category subtitles
 * - Moved down closer to the globe
 * - Vertical laser tether connecting directly to the globe
 */
export default function GlobeBeacons({ onNavigate, onHoverNode, nodePositions }) {
  const [hoveredId, setHoveredId] = useState(null);

  const beacons = [
    {
      id: 'graphic-design',
      title: 'Graphic Design',
      ctaText: 'Explore Work',
      accentColor: '#0054ff',
      posClass: 'beacon-left',
      defaultX: 26,
      defaultY: 70,
      cardTopOffset: 48, // Laser line tether touching lowered globe horizon
    },
    {
      id: 'websites',
      title: 'Websites • Landing Pages • AI',
      ctaText: 'Explore Work',
      accentColor: '#a033ff', // GoComet AI Violet
      posClass: 'beacon-center',
      defaultX: 50,
      defaultY: 52,
      cardTopOffset: 62, // Lowered from 84 to bring center card closer to globe and away from header
      featured: true,
    },
    {
      id: 'motion',
      title: 'Motion and Video',
      ctaText: 'Explore Work',
      accentColor: '#0054ff',
      posClass: 'beacon-right',
      defaultX: 74,
      defaultY: 70,
      cardTopOffset: 48, // Laser line tether touching lowered globe horizon
    },
  ];

  const handleMouseEnter = (id) => {
    setHoveredId(id);
    if (onHoverNode) onHoverNode(id);
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
    if (onHoverNode) onHoverNode(null);
  };

  return (
    <div className="globe-beacons-overlay" aria-label="Portfolio Disciplines">
      {beacons.map((beacon) => {
        const isHovered = hoveredId === beacon.id;
        const livePos = nodePositions && nodePositions[beacon.id];

        // Coordinate positioning on the globe horizon
        const posX = livePos ? `${livePos.x}px` : `${beacon.defaultX}%`;
        const nodeY = livePos ? `${livePos.y}px` : `${beacon.defaultY}%`;

        const lineHeight = beacon.cardTopOffset;

        return (
          <div
            key={beacon.id}
            className={`beacon-anchor-point ${beacon.posClass} ${isHovered ? 'is-active' : ''}`}
            style={{
              left: posX,
              top: nodeY,
            }}
            onMouseEnter={() => handleMouseEnter(beacon.id)}
            onMouseLeave={handleMouseLeave}
          >
            {/* 1. Center-Aligned Floating Card */}
            <div 
              className="beacon-card-wrapper"
              style={{ bottom: `${lineHeight}px` }}
            >
              <button
                type="button"
                className={`centered-beacon-card ${beacon.featured ? 'is-featured' : ''}`}
                onClick={() => onNavigate(beacon.id)}
                style={{ '--beacon-accent': beacon.accentColor }}
                title={`Explore ${beacon.title}`}
              >
                {/* Center-Aligned Title */}
                <div className="card-centered-title">
                  {beacon.title}
                </div>

                {/* Center-Aligned CTA Button */}
                <div className="card-centered-cta">
                  <span className="cta-centered-pill">
                    <span>{beacon.ctaText}</span>
                    <ArrowUpRight size={15} className="cta-arrow-icon" />
                  </span>
                </div>
              </button>
            </div>

            {/* 2. Vertical Laser Beacon Line Coming Down to Globe */}
            <div 
              className="beacon-vertical-tether"
              style={{ height: `${lineHeight}px` }}
            >
              <div className="tether-photon" />
              <div className="tether-core-line" />
            </div>

            {/* 3. Surface Contact Node on the Globe Horizon */}
            <div className="globe-contact-node">
              <div className="contact-dot" />
              <div className="contact-ping-ring ring-1" />
              <div className="contact-ping-ring ring-2" />
              <div className="contact-glow-halo" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

import React, { useEffect, useRef } from 'react';

/**
 * OceanBackground
 * Renders an animated deep-ocean layer with wave currents, luminous caustics,
 * and 3 freight container carriers continuously sailing across the maritime horizon.
 * Guarantees that at least one carrier is always prominently visible.
 */
export default function OceanBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // 3 Freight Container Carriers spaced across the ocean
    const carriers = [
      {
        x: width * 0.08,
        speed: 0.38,
        waveLayer: 1,
        scale: 0.92,
        containers: ['#0054ff', '#ff8a3d', '#a033ff', '#38bdf8', '#0043cc', '#e2e8f0'],
        mastColor: '#22c55e', // Green OTIF
        rows: 2,
        cols: 5,
      },
      {
        x: width * 0.46,
        speed: 0.52,
        waveLayer: 2,
        scale: 1.08,
        containers: ['#10b981', '#0054ff', '#ff8a3d', '#38bdf8', '#059669', '#cbd5e1'],
        mastColor: '#38bdf8', // Cyan
        rows: 3,
        cols: 6,
      },
      {
        x: width * 0.82,
        speed: 0.44,
        waveLayer: 1,
        scale: 0.95,
        containers: ['#a033ff', '#ff8a3d', '#0054ff', '#e2e8f0', '#a85bff'],
        mastColor: '#ffcc00', // Amber
        rows: 2,
        cols: 5,
      },
    ];

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // 1. Deep Oceanic Gradient Background
      const oceanGrad = ctx.createLinearGradient(0, 0, 0, height);
      oceanGrad.addColorStop(0, '#040916');      // Deep cosmos navy
      oceanGrad.addColorStop(0.35, '#061129');   // Midnight marine
      oceanGrad.addColorStop(0.65, '#071b3e');   // Deep ocean abyss
      oceanGrad.addColorStop(1, '#05132d');      // Bottom anchor navy
      ctx.fillStyle = oceanGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Bioluminescent ambient ocean light blooms
      const bloom1 = ctx.createRadialGradient(width * 0.2, height * 0.7, 10, width * 0.2, height * 0.7, width * 0.5);
      bloom1.addColorStop(0, 'rgba(0, 84, 255, 0.18)');
      bloom1.addColorStop(1, 'rgba(0, 84, 255, 0)');
      ctx.fillStyle = bloom1;
      ctx.fillRect(0, 0, width, height);

      const bloom2 = ctx.createRadialGradient(width * 0.8, height * 0.65, 10, width * 0.8, height * 0.65, width * 0.45);
      bloom2.addColorStop(0, 'rgba(0, 210, 255, 0.14)');
      bloom2.addColorStop(1, 'rgba(0, 210, 255, 0)');
      ctx.fillStyle = bloom2;
      ctx.fillRect(0, 0, width, height);

      // 3. Wave Layer 1 (Far background wave, slow and subtle)
      const waveBaseY1 = height * 0.62;
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 10) {
        const y = waveBaseY1 + 
                  Math.sin(x * 0.003 + time * 0.7) * 14 + 
                  Math.cos(x * 0.007 + time * 0.4) * 8;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      const waveGrad1 = ctx.createLinearGradient(0, waveBaseY1, 0, height);
      waveGrad1.addColorStop(0, 'rgba(0, 60, 160, 0.38)');
      waveGrad1.addColorStop(1, 'rgba(4, 15, 40, 0.85)');
      ctx.fillStyle = waveGrad1;
      ctx.fill();

      ctx.strokeStyle = 'rgba(0, 200, 255, 0.22)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Helper function to render a container ship
      const drawCarrier = (carrier, waveBaseY, waveTime) => {
        carrier.x += carrier.speed;
        if (carrier.x > width + 180) {
          carrier.x = -180;
        }

        const waveY = waveBaseY + Math.sin(carrier.x * 0.003 + waveTime) * 14 - 8;

        ctx.save();
        ctx.translate(carrier.x, waveY);
        ctx.scale(carrier.scale, carrier.scale);

        // Water Wake Foam
        const wakeGrad = ctx.createLinearGradient(-85, 8, 10, 8);
        wakeGrad.addColorStop(0, 'rgba(0, 220, 255, 0)');
        wakeGrad.addColorStop(0.7, 'rgba(255, 255, 255, 0.3)');
        wakeGrad.addColorStop(1, 'rgba(0, 220, 255, 0.55)');
        ctx.fillStyle = wakeGrad;
        ctx.beginPath();
        ctx.moveTo(0, 8);
        ctx.lineTo(-85, 12);
        ctx.lineTo(-75, 7);
        ctx.closePath();
        ctx.fill();

        // Ship Hull
        ctx.fillStyle = '#0b162c';
        ctx.beginPath();
        ctx.moveTo(-45, 8);
        ctx.lineTo(55, 8);
        ctx.lineTo(65, 3);
        ctx.lineTo(48, -4);
        ctx.lineTo(-40, -4);
        ctx.lineTo(-45, 3);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = 'rgba(0, 160, 255, 0.4)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Ship Bridge / Control Tower
        ctx.fillStyle = '#12254d';
        ctx.fillRect(-35, -16, 12, 12);
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(-33, -14, 8, 3);

        // Mast & Navigation Beacon Light
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(-29, -16);
        ctx.lineTo(-29, -24);
        ctx.stroke();

        const pingOpacity = 0.4 + 0.6 * Math.sin(time * 6 + carrier.x);
        ctx.globalAlpha = pingOpacity;
        ctx.fillStyle = carrier.mastColor;
        ctx.shadowColor = carrier.mastColor;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(-29, -24, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1.0;

        // Stacked Freight Containers
        for (let r = 0; r < carrier.rows; r++) {
          for (let c = 0; c < carrier.cols; c++) {
            const colorIndex = (r * carrier.cols + c) % carrier.containers.length;
            ctx.fillStyle = carrier.containers[colorIndex];
            ctx.fillRect(-18 + c * 11, -8 - r * 6, 9.5, 5);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.strokeRect(-18 + c * 11, -8 - r * 6, 9.5, 5);
          }
        }

        ctx.restore();
      };

      // Draw carriers on Wave Layer 1
      carriers
        .filter((c) => c.waveLayer === 1)
        .forEach((c) => drawCarrier(c, waveBaseY1, time * 0.7));

      // 4. Wave Layer 2 (Middle wave with deeper turquoise swell)
      const waveBaseY2 = height * 0.71;
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 10) {
        const y = waveBaseY2 + 
                  Math.sin(x * 0.004 - time * 0.9) * 18 + 
                  Math.cos(x * 0.006 + time * 0.5) * 10;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      const waveGrad2 = ctx.createLinearGradient(0, waveBaseY2, 0, height);
      waveGrad2.addColorStop(0, 'rgba(0, 84, 255, 0.42)');
      waveGrad2.addColorStop(0.5, 'rgba(6, 25, 65, 0.78)');
      waveGrad2.addColorStop(1, 'rgba(3, 10, 28, 0.96)');
      ctx.fillStyle = waveGrad2;
      ctx.fill();

      ctx.strokeStyle = 'rgba(0, 220, 255, 0.35)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Draw carriers on Wave Layer 2
      carriers
        .filter((c) => c.waveLayer === 2)
        .forEach((c) => drawCarrier(c, waveBaseY2, -time * 0.9));

      // 5. Wave Layer 3 (Foreground undulating swell)
      const waveBaseY3 = height * 0.80;
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 10) {
        const y = waveBaseY3 + 
                  Math.sin(x * 0.005 + time * 1.1) * 22 + 
                  Math.cos(x * 0.003 - time * 0.6) * 12;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      const waveGrad3 = ctx.createLinearGradient(0, waveBaseY3, 0, height);
      waveGrad3.addColorStop(0, 'rgba(0, 110, 255, 0.45)');
      waveGrad3.addColorStop(1, 'rgba(2, 8, 22, 0.98)');
      ctx.fillStyle = waveGrad3;
      ctx.fill();

      ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="ocean-background-container" aria-hidden="true">
      <canvas ref={canvasRef} className="ocean-canvas" />
      {/* Floating ocean freight context telemetry */}
      <div className="ocean-freight-ticker">
        <div className="ticker-badge">
          <span className="ticker-icon">⚓</span>
          <span className="ticker-text">Global Ocean Freight Visibility Network</span>
        </div>
        <div className="ticker-badge ticker-stat">
          <span className="ticker-dot"></span>
          <span className="ticker-text">98.2% OTIF Maintained • 10M+ TEU</span>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useRef } from 'react';

/**
 * AmbientOceanCanvas
 * Lightweight, high-performance ambient ocean backdrop for inner showcase pages.
 * Renders GoComet deep navy gradient, subtle bioluminescent maritime lighting,
 * and soft undulating ocean currents in the background.
 */
export default function AmbientOceanCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    let time = 0;

    // Distant container vessel traversing the bottom horizon
    let shipX = width * 0.15;
    const shipSpeed = 0.28;

    const render = () => {
      time += 0.012;
      shipX += shipSpeed;
      if (shipX > width + 250) {
        shipX = -250;
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Deep Cosmic Navy Ocean Canvas
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#040816');      // Midnight cosmic top
      bgGrad.addColorStop(0.3, '#060f26');    // Deep navy
      bgGrad.addColorStop(0.7, '#071638');    // Marine blue
      bgGrad.addColorStop(1, '#05112a');      // Anchor bottom
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Ambient Bioluminescent Blue & Cyan Blooms
      const bloomTop = ctx.createRadialGradient(width * 0.5, 0, 10, width * 0.5, 0, width * 0.65);
      bloomTop.addColorStop(0, 'rgba(0, 84, 255, 0.14)');
      bloomTop.addColorStop(0.5, 'rgba(0, 229, 255, 0.04)');
      bloomTop.addColorStop(1, 'rgba(0, 84, 255, 0)');
      ctx.fillStyle = bloomTop;
      ctx.fillRect(0, 0, width, height);

      const bloomLeft = ctx.createRadialGradient(width * 0.1, height * 0.6, 20, width * 0.1, height * 0.6, width * 0.4);
      bloomLeft.addColorStop(0, 'rgba(160, 51, 255, 0.06)'); // Soft violet touch
      bloomLeft.addColorStop(1, 'transparent');
      ctx.fillStyle = bloomLeft;
      ctx.fillRect(0, 0, width, height);

      // 3. Subtle Ocean Waves at the very bottom
      const waveBase = height - 90;
      
      // Wave layer 1 (Deeper, darker)
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(0, waveBase + 30);
      for (let x = 0; x <= width; x += 30) {
        const y = waveBase + 30 + Math.sin(x * 0.0035 + time) * 12 + Math.cos(x * 0.006 - time * 0.8) * 8;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fillStyle = 'rgba(6, 17, 43, 0.75)';
      ctx.fill();

      // Distant miniature container vessel on wave 1
      const shipY = waveBase + 26 + Math.sin(shipX * 0.0035 + time) * 10;
      ctx.save();
      ctx.translate(shipX, shipY);
      
      // Hull
      ctx.fillStyle = '#081735';
      ctx.beginPath();
      ctx.moveTo(-45, 0);
      ctx.lineTo(35, 0);
      ctx.lineTo(46, -10);
      ctx.lineTo(-45, -10);
      ctx.closePath();
      ctx.fill();

      // Waterline red stripe
      ctx.fillStyle = 'rgba(178, 34, 52, 0.7)';
      ctx.fillRect(-45, -3, 85, 2.5);

      // Containers
      const colors = ['#0054ff', '#ff8a3d', '#38bdf8', '#0043cc'];
      for (let i = 0; i < 4; i++) {
        ctx.fillStyle = colors[i % colors.length];
        ctx.fillRect(-38 + i * 14, -18, 12, 8);
      }

      // Bridge Tower & Navigation Light
      ctx.fillStyle = '#0b2046';
      ctx.fillRect(22, -22, 10, 12);
      ctx.fillStyle = '#22c55e'; // Green mast light
      ctx.beginPath();
      ctx.arc(27, -25, 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // Wave layer 2 (Foreground crest with subtle cyan glow)
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(0, waveBase + 55);
      for (let x = 0; x <= width; x += 25) {
        const y = waveBase + 55 + Math.sin(x * 0.0045 - time * 1.2) * 10 + Math.cos(x * 0.008 + time) * 6;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fillStyle = 'rgba(4, 11, 28, 0.88)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.15)';
      ctx.lineWidth = 1;
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="ambient-ocean-canvas"
      aria-hidden="true"
    />
  );
}

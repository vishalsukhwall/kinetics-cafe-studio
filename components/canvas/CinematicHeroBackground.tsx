"use client";

import React, { useRef, useEffect, useState } from 'react';

/**
 * CinematicHeroBackground
 *
 * Provides a cinematic, moody, looping background featuring slow-motion
 * dark-roasted coffee pour / espresso extraction with rich crema and warm
 * amber backlighting.
 *
 * Includes an ambient fluid shimmer canvas fallback for instant organic visual depth.
 */
export function CinematicHeroBackground() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Organic ambient crema wave simulation on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    let t = 0;
    const render = () => {
      t += 0.008;

      // Dark espresso canvas fill
      ctx.fillStyle = '#0B0705';
      ctx.fillRect(0, 0, width, height);

      // Warm amber radiant core
      const centerX = width * 0.5 + Math.sin(t * 0.5) * 60;
      const centerY = height * 0.45 + Math.cos(t * 0.6) * 40;

      const radial = ctx.createRadialGradient(
        centerX,
        centerY,
        40,
        centerX,
        centerY,
        Math.max(width, height) * 0.65
      );
      radial.addColorStop(0, 'rgba(216, 155, 90, 0.22)');
      radial.addColorStop(0.35, 'rgba(184, 114, 46, 0.12)');
      radial.addColorStop(0.7, 'rgba(38, 24, 16, 0.06)');
      radial.addColorStop(1, 'rgba(11, 7, 5, 0)');

      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, width, height);

      // Subtle drifting smoky crema wave
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        const yBase = height * 0.5 + i * 50;
        ctx.moveTo(0, yBase);
        for (let x = 0; x <= width; x += 40) {
          const y =
            yBase +
            Math.sin(x * 0.003 + t * 0.8 + i) * 35 +
            Math.cos(x * 0.002 - t * 0.5) * 25;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();

        const waveGrad = ctx.createLinearGradient(0, yBase - 50, 0, height);
        waveGrad.addColorStop(0, 'rgba(201, 168, 108, 0.04)');
        waveGrad.addColorStop(1, 'rgba(11, 7, 5, 0)');
        ctx.fillStyle = waveGrad;
        ctx.fill();
      }
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      {/* Dynamic Ambient Crema Canvas (Always active for warmth and depth) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
        aria-hidden="true"
      />

      {/* Cinematic Looping Atmosphere Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        onCanPlay={() => setVideoLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover z-1 transition-opacity duration-1000 ${
          videoLoaded ? 'opacity-35 mix-blend-screen' : 'opacity-0'
        }`}
        poster="https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=1920&q=80"
      >
        {/* Cinematic slow-motion espresso pour / steam streams */}
        <source
          src="https://assets.mixkit.co/videos/preview/mixkit-coffee-being-poured-into-a-cup-23941-large.mp4"
          type="video/mp4"
        />
        <source
          src="https://assets.mixkit.co/videos/preview/mixkit-barista-making-espresso-coffee-41097-large.mp4"
          type="video/mp4"
        />
      </video>

      {/* Luxury Vignette & Dark Roast Shadow Overlay */}
      <div
        className="absolute inset-0 z-2 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 45%, rgba(11,7,5,0.1) 0%, rgba(11,7,5,0.65) 60%, #0B0705 100%)',
        }}
        aria-hidden="true"
      />

      {/* Bottom seamless blend into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0B0705] via-[#0B0705]/80 to-transparent z-3 pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}

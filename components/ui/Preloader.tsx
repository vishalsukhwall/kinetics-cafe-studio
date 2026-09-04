"use client";

import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const beanRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Increment loading counter smoothly
    let current = 0;
    const interval = setInterval(() => {
      // Accelerate towards end
      const increment = Math.max(1, Math.floor((100 - current) * 0.12));
      current = Math.min(100, current + increment);
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          if (preloaderRef.current) {
            gsap.to(preloaderRef.current, {
              opacity: 0,
              y: -40,
              duration: 0.8,
              ease: 'power3.inOut',
              onComplete: () => {
                setIsDone(true);
                onComplete?.();
              },
            });
          }
        }, 300);
      }
    }, 35);

    // Continuous 3D rotation wobble for the coffee bean
    if (beanRef.current) {
      gsap.to(beanRef.current, {
        rotationY: 360,
        rotationZ: 12,
        duration: 3,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%',
      });
    }

    return () => clearInterval(interval);
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0B0705] text-[#F5E6D0] select-none"
      style={{ perspective: '1000px' }}
    >
      {/* Background ambient amber glow */}
      <div
        className="absolute w-96 h-96 rounded-full bg-[#D89B5A]/10 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Rotating Coffee Bean with Golden Highlight */}
      <div className="relative mb-8 flex items-center justify-center">
        {/* Pulsing ring */}
        <div className="absolute w-24 h-24 rounded-full border border-[#D89B5A]/20 animate-ping opacity-25" />
        <div className="absolute w-20 h-20 rounded-full border border-[#C9A86C]/30 blur-[1px]" />

        <svg
          ref={beanRef}
          className="w-16 h-16 drop-shadow-[0_0_20px_rgba(216,155,90,0.5)]"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Coffee bean body */}
          <path
            d="M50 8C26.8 8 8 26.8 8 50C8 73.2 26.8 92 50 92C73.2 92 92 73.2 92 50C92 26.8 73.2 8 50 8Z"
            fill="url(#beanGradient)"
          />
          {/* Specular rim */}
          <path
            d="M50 10C27.9 10 10 27.9 10 50C10 58.5 12.6 66.4 17.2 73C14 66.2 12.2 58.4 12.2 50C12.2 29.1 29.1 12.2 50 12.2C61.4 12.2 71.6 17.3 78.4 25.4C71.3 16 61.4 10 50 10Z"
            fill="#D89B5A"
            fillOpacity="0.6"
          />
          {/* S-curve crease */}
          <path
            d="M50 14C45 28 58 42 48 58C39 72 52 86 50 88"
            stroke="url(#creaseGradient)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="beanGradient" x1="15" y1="15" x2="85" y2="85" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3D2619" />
              <stop offset="0.5" stopColor="#2A180E" />
              <stop offset="1" stopColor="#140A05" />
            </linearGradient>
            <linearGradient id="creaseGradient" x1="50" y1="14" x2="50" y2="88" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0B0705" />
              <stop offset="0.5" stopColor="#D89B5A" />
              <stop offset="1" stopColor="#0B0705" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Title */}
      <div className="text-center">
        <h2 className="text-xl md:text-2xl font-serif tracking-[0.4em] uppercase text-[#F5E6D0] mb-1">
          EMBER & OAK
        </h2>
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#C9A86C]/70 font-light mb-8">
          Artisan Coffee Roastery
        </p>
      </div>

      {/* Percentage Progress Bar */}
      <div className="w-56 flex flex-col items-center gap-3">
        <div className="w-full h-[2px] bg-[#2A1F1A] rounded-full overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-[#B8722E] via-[#D89B5A] to-[#F5E6D0] transition-all duration-150 ease-out shadow-[0_0_12px_rgba(216,155,90,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between w-full text-xs font-mono text-[#D89B5A]/80 tracking-widest">
          <span>ROASTING</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
}

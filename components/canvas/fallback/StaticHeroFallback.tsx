"use client";

import React, { useEffect, useState } from 'react';

export function StaticHeroFallback() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#0B0705] overflow-hidden flex flex-col items-center justify-center text-[#F5E6D0]">
      {/* Decorative grain and ambient glows */}
      <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("/noise.png")', backgroundRepeat: 'repeat' }} />
      <div 
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D89B5A] rounded-full blur-[120px] opacity-20 pointer-events-none"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#B8722E] rounded-full blur-[100px] opacity-20 pointer-events-none"
        style={{ transform: `translateY(${scrollY * 0.15}px)` }}
      />
      
      {/* Content */}
      <div 
        className="relative z-10 flex flex-col items-center justify-center text-center p-8"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <h1 className="text-6xl md:text-8xl font-serif tracking-widest mb-4 bg-gradient-to-br from-[#F5E6D0] via-[#D89B5A] to-[#B8722E] text-transparent bg-clip-text">
          Kinetics Caffe
        </h1>
        <p className="text-xl md:text-2xl font-light tracking-widest text-[#F5E6D0]/80 uppercase">
          Artisan Coffee Roastery
        </p>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-pulse opacity-60">
        <span className="uppercase text-xs tracking-widest text-[#D89B5A]">Scroll to explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#D89B5A] to-transparent" />
      </div>
    </div>
  );
}

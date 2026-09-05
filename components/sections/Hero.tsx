'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { SceneCanvas } from '@/components/canvas/SceneCanvas';
import { CoffeeCupModel } from '@/components/canvas/CoffeeCupModel';
import { SteamParticles } from '@/components/canvas/SteamParticles';
import { FloatingBeans } from '@/components/canvas/FloatingBeans';
import { CameraRig } from '@/components/canvas/CameraRig';
import { CinematicHeroBackground } from '@/components/canvas/CinematicHeroBackground';
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe';
import '@/lib/gsapConfig';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightCanvasRef = useRef<HTMLDivElement>(null);
  const { isReducedMotion } = useReducedMotionSafe();

  useEffect(() => {
    if (isReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        leftContentRef.current,
        { opacity: 0, x: -50, filter: 'blur(10px)' },
        { opacity: 1, x: 0, filter: 'blur(0px)', duration: 1.2 }
      )
      .fromTo(
        rightCanvasRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1.4 },
        '-=0.8'
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isReducedMotion]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={containerRef} className="relative w-full min-h-screen flex items-center bg-[#0B0705] overflow-hidden">
      <CinematicHeroBackground />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center py-20 lg:py-0">
        
        {/* Left Column */}
        <div ref={leftContentRef} className="lg:col-span-7 flex flex-col items-start gap-8">
          <div className="flex items-center gap-2 bg-[#1B3B2B] rounded-full px-4 py-2 border border-[#1B3B2B]/50 shadow-[0_0_15px_rgba(27,59,43,0.3)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[10px] font-mono text-emerald-100 uppercase tracking-widest">WESTERN GHATS MICRO-LOTS · FLAME ROASTED</span>
          </div>
          
          <div className="flex flex-col">
            <h1 className="font-serif text-7xl sm:text-8xl md:text-9xl font-bold leading-none tracking-tight">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#F5E6D0] via-[#D89B5A] to-[#FF7A00]">KINE</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#F5E6D0] via-[#D89B5A] to-[#FF7A00]">TICS</span>
            </h1>
            <span className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#F5E6D0]/80 tracking-[0.2em] mt-2">CAFE STUDIO</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-serif text-[#C4A882]">
            Artisan Coffee Roastery · Bengaluru
          </h2>

          <p className="text-[#F5E6D0]/70 text-base sm:text-lg max-w-md font-light leading-relaxed">
            Single-estate harvests from Chikmagalur &amp; Araku Valley. Extracted to order at 9 bar with pure spring water.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-2">
            <button
              onClick={() => scrollToSection('menu')}
              className="btn-tactile px-8 py-4 bg-gradient-to-r from-[#D89B5A] to-[#FF7A00] text-[#0B0705] rounded-full font-semibold text-xs uppercase tracking-[0.2em] shadow-[0_0_25px_rgba(216,155,90,0.35)] hover:shadow-[0_0_40px_rgba(216,155,90,0.6)] transition-all cursor-pointer"
            >
              Explore Collection (₹)
            </button>
            <button
              onClick={() => scrollToSection('sanctuary')}
              className="btn-tactile px-7 py-4 bg-transparent border border-[#C9A86C]/30 text-[#F5E6D0] rounded-full text-xs uppercase tracking-[0.2em] hover:bg-[#180E09]/50 hover:border-[#D89B5A]/60 backdrop-blur-md transition-all cursor-pointer"
            >
              Reserve Table
            </button>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <div className="px-4 py-2 bg-[#180E09]/70 backdrop-blur-sm border border-[#C9A86C]/20 rounded-full">
              <span className="text-[11px] font-mono text-[#F5E6D0]/80 uppercase">100% Single Estate</span>
            </div>
            <div className="px-4 py-2 bg-[#180E09]/70 backdrop-blur-sm border border-[#C9A86C]/20 rounded-full">
              <span className="text-[11px] font-mono text-[#F5E6D0]/80 uppercase">1,450m Elevation</span>
            </div>
            <div className="px-4 py-2 bg-[#180E09]/70 backdrop-blur-sm border border-[#C9A86C]/20 rounded-full">
              <span className="text-[11px] font-mono text-[#F5E6D0]/80 uppercase">9-Bar Extraction</span>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div ref={rightCanvasRef} className="lg:col-span-5 relative w-full aspect-square lg:aspect-auto lg:h-[700px] rounded-3xl border border-[#D89B5A]/30 bg-gradient-to-b from-[#180E09]/50 to-[#0B0705]/70 backdrop-blur-sm overflow-hidden flex items-center justify-center">
          <SceneCanvas>
            <CameraRig />
            <CoffeeCupModel position={[0, -0.1, 0]} scale={1.15} />
            <SteamParticles position={[0, 1.4, 0]} />
            <FloatingBeans />
          </SceneCanvas>
        </div>

      </div>
    </section>
  );
}
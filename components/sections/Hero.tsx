'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { SceneCanvas } from '@/components/canvas/SceneCanvas';
import { CoffeeCupModel } from '@/components/canvas/CoffeeCupModel';
import { SteamParticles } from '@/components/canvas/SteamParticles';
import { FloatingBeans } from '@/components/canvas/FloatingBeans';
import { CameraRig } from '@/components/canvas/CameraRig';
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
        { opacity: 0, x: -30, filter: 'blur(6px)' },
        { opacity: 1, x: 0, filter: 'blur(0px)', duration: 1.4 }
      )
      .fromTo(
        rightCanvasRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1.5 },
        '-=1.1'
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isReducedMotion]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 85;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={containerRef} 
      className="relative w-full min-h-[92vh] flex items-center bg-theme-hero text-[#2B2421] overflow-hidden font-sans pt-6 pb-20 lg:py-16"
    >
      {/* Decorative ambient color orbs for boutique visual depth */}
      <div className="absolute top-12 left-10 w-96 h-96 bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/3 w-80 h-80 bg-rose-200/35 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-sky-200/35 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Column: Headline, Social Proof & CTAs */}
        <div ref={leftContentRef} className="lg:col-span-7 flex flex-col items-start gap-7">
          
          {/* Live Micro-Batch Status Pill */}
          <div className="flex items-center gap-2.5 glass-card px-4 py-2 rounded-full border border-amber-300/60 shadow-xs">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-600"></span>
            </span>
            <span className="text-[11px] font-mono text-amber-900 uppercase tracking-widest font-bold">
              FLAME-ROASTED IN BENGALURU &middot; POURED IN UDAIPUR
            </span>
          </div>
          
          {/* Main Display Headline */}
          <div className="flex flex-col">
            <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-none tracking-tight text-[#2B2421]">
              KINETICS<span className="text-rose-600">.</span>
            </h1>
            <div className="flex items-center gap-3 mt-2">
              <span className="h-[2px] w-12 bg-gradient-to-r from-amber-600 to-rose-600"></span>
              <span className="font-serif text-xl sm:text-2xl md:text-3xl text-slate-700 tracking-[0.2em] font-medium uppercase">
                Artisan Caffe &amp; Studio
              </span>
            </div>
          </div>

          <p className="text-slate-600 text-base sm:text-lg max-w-xl font-light leading-relaxed">
            Direct single-estate micro-lots from Chikmagalur and Araku Valley. Hand-poured extractions, authentic Neapolitan pizzas, and a tranquil sensory haven.
          </p>

          {/* Social Proof & Rating Badge */}
          <div className="flex items-center gap-3 py-1">
            <div className="flex text-amber-500 text-sm tracking-tighter">
              ★★★★★
            </div>
            <span className="text-xs font-mono font-bold text-slate-800">4.9 / 5.0</span>
            <span className="text-xs text-slate-500 font-light">• Based on 1,400+ Cafe Lovers in Udaipur</span>
          </div>

          {/* User-Friendly Dual Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 mt-1 w-full sm:w-auto">
            <button
              onClick={() => scrollToSection('menu')}
              className="btn-tactile w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-600 via-rose-600 to-rose-700 text-white rounded-full font-semibold text-xs uppercase tracking-[0.18em] shadow-md hover:shadow-lg hover:brightness-105 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Explore Menu &amp; Order</span>
              <span className="text-sm">→</span>
            </button>
            
            <button
              onClick={() => scrollToSection('sanctuary')}
              className="btn-tactile w-full sm:w-auto px-7 py-4 bg-white/80 hover:bg-white border border-slate-300 text-slate-800 rounded-full text-xs uppercase tracking-[0.18em] font-semibold backdrop-blur-md shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Reserve Table</span>
            </button>
          </div>

          {/* Colorful Hallmark Feature Pills */}
          <div className="flex flex-wrap gap-2.5 mt-4">
            <div className="px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 shadow-2xs flex items-center gap-1.5">
              <span className="text-emerald-700 text-xs">🌿</span>
              <span className="text-[11px] font-mono text-emerald-900 font-semibold tracking-wide">100% Organic Micro-Lots</span>
            </div>
            
            <div className="px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200/80 shadow-2xs flex items-center gap-1.5">
              <span className="text-sky-700 text-xs">⛰️</span>
              <span className="text-[11px] font-mono text-sky-900 font-semibold tracking-wide">1,450m High Elevation</span>
            </div>
            
            <div className="px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 shadow-2xs flex items-center gap-1.5">
              <span className="text-amber-700 text-xs">☕</span>
              <span className="text-[11px] font-mono text-amber-900 font-semibold tracking-wide">9-Bar Golden Extraction</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive 3D Canvas in High-End Glassmorphism Wrapper */}
        <div 
          ref={rightCanvasRef} 
          className="lg:col-span-5 relative w-full aspect-square lg:aspect-auto lg:h-[680px] rounded-3xl glass-card overflow-hidden flex items-center justify-center border border-white/70 shadow-xl"
        >
          {/* Subtle colorful circular glow behind mug */}
          <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-amber-300/40 via-rose-300/30 to-sky-300/30 blur-2xl pointer-events-none" />

          {/* Floating Feature Tags */}
          <div className="absolute top-6 left-6 z-20 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-xs flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            <span className="text-[10px] font-mono font-bold text-slate-800 uppercase tracking-wider">3D Interactive Pour</span>
          </div>

          <div className="absolute bottom-6 right-6 z-20 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-xs">
            <span className="text-[10px] font-mono text-slate-700 font-medium">Drag to Inspect · 360°</span>
          </div>

          <SceneCanvas>
            <CameraRig />
            <ambientLight intensity={1.6} />
            <directionalLight position={[10, 10, 10]} intensity={1.4} color="#FFFBEB" />
            <directionalLight position={[-10, -5, -5]} intensity={0.9} color="#E0F2FE" />
            <CoffeeCupModel position={[0, -0.1, 0]} scale={1.15} />
            <SteamParticles position={[0, 1.4, 0]} />
            <FloatingBeans />
          </SceneCanvas>
        </div>

      </div>
    </section>
  );
}
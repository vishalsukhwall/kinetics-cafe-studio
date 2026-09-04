"use client";

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

const ChevronDown = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6"/>
  </svg>
);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const { isReducedMotion } = useReducedMotionSafe();

  useEffect(() => {
    if (isReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 30, filter: 'blur(10px)', letterSpacing: '0.35em' },
        { opacity: 1, y: 0, filter: 'blur(0px)', letterSpacing: '0.22em', duration: 1.3 }
      )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.9 },
          '-=0.7'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.5'
        );
    }, containerRef);

    return () => ctx.revert();
  }, [isReducedMotion]);

  const scrollToSection = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const titleText = "Kinetics Caffe";

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#0B0705] text-[#F5E6D0] flex flex-col justify-between pt-28 pb-10"
    >
      {/* 1. Cinematic Ambient Video & Shimmer Crema Canvas */}
      <CinematicHeroBackground />

      {/* 2. Interactive 3D Canvas (Procedural Cup + Steam + Floating Gold Beans) */}
      <div className="absolute inset-0 z-10 pointer-events-none" aria-hidden="true">
        <SceneCanvas>
          <CameraRig />
          <CoffeeCupModel position={[0, -0.45, 0]} scale={1.05} />
          <SteamParticles position={[0, 1.25, 0]} />
          <FloatingBeans />
        </SceneCanvas>
      </div>

      {/* 3. Minimalist Hero Typography Composition (Generous Breathing Room) */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center flex-1 flex flex-col items-center justify-center pointer-events-auto">
        
        {/* Subtle pill tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#180E09]/70 border border-[#C9A86C]/25 backdrop-blur-md mb-6 shadow-[0_0_15px_rgba(216,155,90,0.1)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D89B5A]" />
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#D89B5A]/90">
            Western Ghats Micro-Lots · Flame Roasted
          </span>
        </div>

        {/* Grand Headline */}
        <h1
          ref={titleRef}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-serif uppercase tracking-[0.22em] text-transparent bg-clip-text bg-gradient-to-r from-[#F5E6D0] via-[#D89B5A] to-[#B8722E] drop-shadow-[0_4px_40px_rgba(216,155,90,0.35)] mb-4"
        >
          {titleText}
        </h1>

        {/* Minimalist Subtitle & Craft statement */}
        <div ref={subtitleRef} className="max-w-xl mx-auto mb-10">
          <p className="text-xs sm:text-sm md:text-base font-light tracking-[0.25em] text-[#C9A86C]/90 uppercase mb-3">
            Artisan Coffee Roastery · Bengaluru
          </p>
          <p className="text-xs sm:text-sm text-[#F5E6D0]/70 font-light leading-relaxed tracking-wider max-w-md mx-auto">
            Single-estate harvests from Chikmagalur & Araku. Extracted to order with pure spring water.
          </p>
        </div>

        {/* Clean, Refined CTAs */}
        <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => scrollToSection('menu')}
            className="btn-tactile px-8 py-4 rounded-full bg-gradient-to-r from-[#D89B5A] to-[#B8722E] text-[#0B0705] font-semibold text-xs uppercase tracking-[0.2em] shadow-[0_0_25px_rgba(216,155,90,0.35)] hover:shadow-[0_0_40px_rgba(216,155,90,0.6)] transition-all"
          >
            Explore Collection (₹)
          </button>
          <button
            onClick={() => scrollToSection('sanctuary')}
            className="btn-tactile px-7 py-4 rounded-full bg-[#180E09]/80 border border-[#C9A86C]/30 text-[#F5E6D0]/90 hover:text-[#F5E6D0] hover:border-[#D89B5A] text-xs uppercase tracking-[0.2em] backdrop-blur-md transition-all"
          >
            Reserve Table
          </button>
        </div>

      </div>

      {/* 4. Minimalist Scroll Indicator */}
      <div className="relative z-20 flex justify-center items-center">
        
      </div>

    </section>
  );
}

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
        { opacity: 0, x: -30, filter: 'blur(5px)' },
        { opacity: 1, x: 0, filter: 'blur(0px)', duration: 1.6 }
      )
      .fromTo(
        rightCanvasRef.current,
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 1.8 },
        '-=1.2'
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isReducedMotion]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={containerRef} className="relative w-full min-h-screen flex items-center bg-theme-hero overflow-hidden">
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center py-20 lg:py-0">
        
        {/* Left Column */}
        <div ref={leftContentRef} className="lg:col-span-7 flex flex-col items-start gap-8">
          <div className="flex items-center gap-2 glass-card rounded-full px-4 py-2">
            <span className="w-2 h-2 rounded-full bg-terracotta animate-pulse"></span>
            <span className="text-[10px] font-mono text-espresso uppercase tracking-[0.2em] font-medium">WESTERN GHATS MICRO-LOTS · FLAME ROASTED</span>
          </div>
          
          <div className="flex flex-col">
            <h1 className="font-serif text-7xl sm:text-8xl md:text-9xl font-bold leading-none tracking-tight text-espresso">
              KINETICS
            </h1>
            <span className="font-serif text-2xl sm:text-3xl md:text-4xl text-espresso/70 tracking-[0.2em] mt-2">CAFE STUDIO</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-serif text-espresso/90">
            Artisan Coffee Roastery · Bengaluru
          </h2>

          <p className="text-espresso/70 text-base sm:text-lg max-w-md font-light leading-relaxed">
            Single-estate harvests from Chikmagalur &amp; Araku Valley. Extracted to order at 9 bar with pure spring water.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-2">
            <button
              onClick={() => scrollToSection('menu')}
              className="btn-tactile px-8 py-4 bg-espresso text-paper rounded-full font-medium text-xs uppercase tracking-[0.2em] hover:bg-espresso/90 transition-all cursor-pointer"
            >
              Explore Collection (₹)
            </button>
            <button
              onClick={() => scrollToSection('sanctuary')}
              className="btn-tactile px-7 py-4 bg-transparent border border-border text-espresso rounded-full text-xs uppercase tracking-[0.2em] hover:bg-sand-solid backdrop-blur-md transition-all cursor-pointer"
            >
              Reserve Table
            </button>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <div className="px-4 py-2 glass-card rounded-full">
              <span className="text-[11px] font-mono text-espresso/80 font-medium uppercase tracking-wider">100% Single Estate</span>
            </div>
            <div className="px-4 py-2 glass-card rounded-full">
              <span className="text-[11px] font-mono text-espresso/80 font-medium uppercase tracking-wider">1,450m Elevation</span>
            </div>
            <div className="px-4 py-2 glass-card rounded-full">
              <span className="text-[11px] font-mono text-espresso/80 font-medium uppercase tracking-wider">9-Bar Extraction</span>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div ref={rightCanvasRef} className="lg:col-span-5 relative w-full aspect-square lg:aspect-auto lg:h-[700px] rounded-3xl glass-card overflow-hidden flex items-center justify-center">
          <SceneCanvas>
            <CameraRig />
            <ambientLight intensity={1.5} />
            <directionalLight position={[10, 10, 10]} intensity={1.2} color="#ffffff" />
            <directionalLight position={[-10, -5, -5]} intensity={0.8} color="#F2EBE5" />
            <CoffeeCupModel position={[0, -0.1, 0]} scale={1.15} />
            <SteamParticles position={[0, 1.4, 0]} />
            <FloatingBeans />
          </SceneCanvas>
        </div>

      </div>
    </section>
  );
}
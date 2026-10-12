'use client';

import React from 'react';

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="relative w-full py-28 px-6 sm:px-8 lg:px-12 bg-theme-why text-[#2B2421] overflow-hidden font-sans">
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center mb-16 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-800 text-xs font-mono font-bold tracking-widest uppercase mb-3 shadow-2xs">
            <span>🌿</span>
            <span>THE KINETICS PHILOSOPHY</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#2B2421] mb-4 tracking-tight">
            Craftsmanship in Every Pour
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl font-light leading-relaxed">
            From generational farms in Karnataka to precision-brewed cups in Rajasthan, experience our commitment to purity and taste.
          </p>
        </div>

        {/* 4 Multi-Color Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full mb-16">
          
          {/* Card 1: Organic (Emerald theme) */}
          <div className="glass-card p-8 group flex flex-col gap-6 border-emerald-200/60 hover:border-emerald-500 hover:shadow-emerald-900/10 transition-all">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-emerald-100 text-emerald-700 border border-emerald-200 transition-transform group-hover:scale-110 shadow-xs">
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
              </svg>
            </div>
            <div>
              <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase tracking-wider block mb-1">
                Zero Chemicals
              </span>
              <h3 className="text-xl font-serif text-[#2B2421] group-hover:text-emerald-800 transition-colors mb-2 font-bold">
                100% Organic Terroir
              </h3>
              <p className="text-slate-600 text-sm font-light leading-relaxed">
                Certified shade-grown Arabica cultivated in harmony with native flora, wild birds, and spice plantations.
              </p>
            </div>
          </div>

          {/* Card 2: Farm to Cup (Caramel/Amber theme) */}
          <div className="glass-card p-8 group flex flex-col gap-6 border-amber-200/60 hover:border-amber-500 hover:shadow-amber-900/10 transition-all">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-amber-100 text-amber-700 border border-amber-200 transition-transform group-hover:scale-110 shadow-xs">
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 2v2"/><path d="M14 2v2"/><path d="M16 8a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V8Z"/>
                <path d="M8 8v12"/><path d="M16 8v12"/>
              </svg>
            </div>
            <div>
              <span className="text-[10px] font-mono text-amber-700 font-bold uppercase tracking-wider block mb-1">
                Direct Trade
              </span>
              <h3 className="text-xl font-serif text-[#2B2421] group-hover:text-amber-800 transition-colors mb-2 font-bold">
                Farm to Your Cup
              </h3>
              <p className="text-slate-600 text-sm font-light leading-relaxed">
                We eliminate middlemen, paying generous premiums directly to generational farming families in Chikmagalur.
              </p>
            </div>
          </div>

          {/* Card 3: Flame Roasted (Terracotta/Rose theme) */}
          <div className="glass-card p-8 group flex flex-col gap-6 border-rose-200/60 hover:border-rose-500 hover:shadow-rose-900/10 transition-all">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-rose-100 text-rose-700 border border-rose-200 transition-transform group-hover:scale-110 shadow-xs">
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 2v7.31"/><path d="M14 9.3V1.99"/><path d="M8.5 2h7"/>
                <path d="M14 9.3a6.5 6.5 0 1 1-4 0"/><path d="M5.52 16h12.96"/>
              </svg>
            </div>
            <div>
              <span className="text-[10px] font-mono text-rose-700 font-bold uppercase tracking-wider block mb-1">
                218°C Curve
              </span>
              <h3 className="text-xl font-serif text-[#2B2421] group-hover:text-rose-800 transition-colors mb-2 font-bold">
                Small-Batch Flame
              </h3>
              <p className="text-slate-600 text-sm font-light leading-relaxed">
                Cast-iron drum roasted in micro-lots of 15kg to tease out natural berry notes and velvety cacao finish.
              </p>
            </div>
          </div>

          {/* Card 4: Plant-Based (Violet/Lavender theme) */}
          <div className="glass-card p-8 group flex flex-col gap-6 border-indigo-200/60 hover:border-indigo-500 hover:shadow-indigo-900/10 transition-all">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-indigo-100 text-indigo-700 border border-indigo-200 transition-transform group-hover:scale-110 shadow-xs">
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
              </svg>
            </div>
            <div>
              <span className="text-[10px] font-mono text-indigo-700 font-bold uppercase tracking-wider block mb-1">
                Dairy &amp; Plant Milk
              </span>
              <h3 className="text-xl font-serif text-[#2B2421] group-hover:text-indigo-800 transition-colors mb-2 font-bold">
                Steamed Microfoam
              </h3>
              <p className="text-slate-600 text-sm font-light leading-relaxed">
                Artisanal oat, almond, and farm cow milk steamed to exactly 65°C for silky latte art and sweet aromatics.
              </p>
            </div>
          </div>

        </div>

        {/* Colorful Trust Metrics Banner */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 w-full">
          <div className="glass-card px-8 py-3.5 rounded-full flex items-center gap-3 border-amber-200/80 shadow-xs">
            <span className="text-2xl font-serif font-bold text-amber-700">12,500+</span>
            <span className="text-[11px] font-mono text-slate-600 uppercase tracking-widest font-semibold">CUPS POURED MONTHLY</span>
          </div>
          
          <div className="glass-card px-8 py-3.5 rounded-full flex items-center gap-3 border-emerald-200/80 shadow-xs">
            <span className="text-2xl font-serif font-bold text-emerald-700">4.9 ★</span>
            <span className="text-[11px] font-mono text-slate-600 uppercase tracking-widest font-semibold">GOOGLE &amp; ZOMATO RATING</span>
          </div>
          
          <div className="glass-card px-8 py-3.5 rounded-full flex items-center gap-3 border-rose-200/80 shadow-xs">
            <span className="text-2xl font-serif font-bold text-rose-700">100%</span>
            <span className="text-[11px] font-mono text-slate-600 uppercase tracking-widest font-semibold">SINGLE-ORIGIN TRACEABLE</span>
          </div>
        </div>

      </div>
    </section>
  );
}
'use client';

import React from 'react';

export default function WhyChooseUs() {
  return (
    <section className="relative w-full py-28 px-6 sm:px-8 lg:px-12 bg-[#0B0705] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#D89B5A]/4 rounded-full blur-[180px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="text-[11px] font-mono uppercase tracking-[0.35em] text-[#D89B5A] mb-4">OUR PROMISE</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#F5E6D0] mb-6">Why Kinetics</h2>
          <p className="text-[#F5E6D0]/70 text-base sm:text-lg max-w-2xl font-light">
            Every cup is an expression of terroir, craft, and uncompromising quality.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full mb-20">
          
          {/* Card 1 */}
          <div className="bg-[#140C07]/60 border border-[#C9A86C]/20 rounded-2xl p-8 backdrop-blur-md hover:border-[#D89B5A]/60 transition-all duration-500 group flex flex-col gap-6">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-[#1B3B2B] text-emerald-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
            </div>
            <div>
              <h3 className="text-lg font-serif text-[#F5E6D0] group-hover:text-[#D89B5A] transition-colors mb-2">100% Organic</h3>
              <p className="text-xs text-[#F5E6D0]/60 font-light leading-relaxed">
                Certified organic single-estate beans grown in harmony with native flora and fauna.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#140C07]/60 border border-[#C9A86C]/20 rounded-2xl p-8 backdrop-blur-md hover:border-[#D89B5A]/60 transition-all duration-500 group flex flex-col gap-6">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-[#2A1508] text-[#D89B5A]">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2v2"/><path d="M14 2v2"/><path d="M16 8a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V8Z"/><path d="M8 8v12"/><path d="M16 8v12"/></svg>
            </div>
            <div>
              <h3 className="text-lg font-serif text-[#F5E6D0] group-hover:text-[#D89B5A] transition-colors mb-2">Farm to Cup</h3>
              <p className="text-xs text-[#F5E6D0]/60 font-light leading-relaxed">
                Direct trade partnerships with generational farmers in the lush Western Ghats.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#140C07]/60 border border-[#C9A86C]/20 rounded-2xl p-8 backdrop-blur-md hover:border-[#D89B5A]/60 transition-all duration-500 group flex flex-col gap-6">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-[#1B1830] text-indigo-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2v7.31"/><path d="M14 9.3V1.99"/><path d="M8.5 2h7"/><path d="M14 9.3a6.5 6.5 0 1 1-4 0"/><path d="M5.52 16h12.96"/></svg>
            </div>
            <div>
              <h3 className="text-lg font-serif text-[#F5E6D0] group-hover:text-[#D89B5A] transition-colors mb-2">Precision Roasted</h3>
              <p className="text-xs text-[#F5E6D0]/60 font-light leading-relaxed">
                Flame-roasted in small artisan batches at exactly 218°C for perfect caramelization.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-[#140C07]/60 border border-[#C9A86C]/20 rounded-2xl p-8 backdrop-blur-md hover:border-[#D89B5A]/60 transition-all duration-500 group flex flex-col gap-6">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-[#301818] text-rose-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            </div>
            <div>
              <h3 className="text-lg font-serif text-[#F5E6D0] group-hover:text-[#D89B5A] transition-colors mb-2">Vegan Friendly</h3>
              <p className="text-xs text-[#F5E6D0]/60 font-light leading-relaxed">
                Premium plant-based alternatives including oat, almond, and tender coconut milk.
              </p>
            </div>
          </div>

        </div>

        {/* Stats Divider */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-6 w-full">
          
          <div className="bg-[#180E09]/70 border border-[#C9A86C]/15 rounded-full px-8 py-4 backdrop-blur-md flex flex-col items-center">
            <span className="text-2xl font-serif text-[#D89B5A] mb-1">12,000+</span>
            <span className="text-[10px] font-mono text-[#F5E6D0]/60 uppercase tracking-widest">CUPS MONTHLY</span>
          </div>
          
          <div className="bg-[#180E09]/70 border border-[#C9A86C]/15 rounded-full px-8 py-4 backdrop-blur-md flex flex-col items-center">
            <span className="text-2xl font-serif text-[#D89B5A] mb-1">4.9★</span>
            <span className="text-[10px] font-mono text-[#F5E6D0]/60 uppercase tracking-widest">GOOGLE RATING</span>
          </div>
          
          <div className="bg-[#180E09]/70 border border-[#C9A86C]/15 rounded-full px-8 py-4 backdrop-blur-md flex flex-col items-center">
            <span className="text-2xl font-serif text-[#D89B5A] mb-1">2019</span>
            <span className="text-[10px] font-mono text-[#F5E6D0]/60 uppercase tracking-widest">ESTABLISHED</span>
          </div>

        </div>

      </div>
    </section>
  );
}

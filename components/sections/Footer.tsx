"use client";

import React from 'react';

export default function Footer() {
  return (
    <footer className="relative bg-[#080402] border-t border-[#C9A86C]/15 pt-20 pb-12 text-[#F5E6D0]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16 items-start">
          
          {/* Brand & Manifesto */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-full border border-[#D89B5A]/50 flex items-center justify-center bg-[#1A0F0A]">
                <span className="text-[10px] font-serif text-[#D89B5A] font-bold">EO</span>
              </div>
              <h3 className="font-serif text-2xl tracking-[0.2em] text-[#F5E6D0] uppercase">
                Kinetics Caffe
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-[#F5E6D0]/60 font-light leading-relaxed max-w-sm mb-6">
              Specialty micro-lots from the shaded hills of the Western Ghats, roasted over flame in Bengaluru.
            </p>

            {/* Stylized Minimalist Map Mockup Pill */}
            <div className="p-4 rounded-2xl bg-[#120804] border border-[#C9A86C]/20 flex items-center justify-between max-w-sm">
              <div className="flex items-center gap-3">
                <span className="text-xl">📍</span>
                <div>
                  <span className="text-xs font-serif text-[#D89B5A] block">100 Feet Road, Indiranagar</span>
                  <span className="text-[10px] font-mono text-[#F5E6D0]/50">Bengaluru 560038 · Flagship</span>
                </div>
              </div>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="text-[10px] font-mono text-[#C9A86C] hover:text-[#D89B5A] uppercase tracking-wider underline underline-offset-4"
              >
                Maps →
              </a>
            </div>
          </div>

          {/* Roastery & Hours */}
          <div className="md:col-span-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#D89B5A] block mb-4">
              Hours & Roast Schedule
            </span>
            <div className="space-y-2 text-xs font-light text-[#F5E6D0]/70">
              <div className="flex justify-between border-b border-[#1C0E07] pb-2">
                <span>Espresso Bar</span>
                <span className="font-mono text-[#F5E6D0]">7:00 AM – 11:00 PM</span>
              </div>
              <div className="flex justify-between border-b border-[#1C0E07] pb-2">
                <span>Slow Pour & Manual</span>
                <span className="font-mono text-[#F5E6D0]">8:00 AM – 9:00 PM</span>
              </div>
              <div className="flex justify-between pb-1">
                <span>Mallandur Roastery, Chikmagalur</span>
                <span className="font-mono text-[#C9A86C]">Flame Roasts Tue & Fri</span>
              </div>
            </div>
          </div>

          {/* Socials & Contact */}
          <div className="md:col-span-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#D89B5A] block mb-4">
              Connect & Concierge
            </span>
            <div className="space-y-2.5 text-xs text-[#F5E6D0]/70 font-light">
              <div>
                <a href="mailto:namaste@emberandoak.in" className="hover:text-[#D89B5A] transition-colors">
                  namaste@emberandoak.in
                </a>
              </div>
              <div>
                <a href="tel:+918041220919" className="hover:text-[#D89B5A] transition-colors font-mono">
                  +91 (080) 4122-0919
                </a>
              </div>
              <div className="pt-2 flex gap-3 text-xs text-[#C9A86C]/80">
                <a href="#" className="hover:text-[#D89B5A] transition-colors">Instagram</a>
                <span>·</span>
                <a href="#" className="hover:text-[#D89B5A] transition-colors">WhatsApp</a>
                <span>·</span>
                <a href="#" className="hover:text-[#D89B5A] transition-colors">Spotify</a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Minimalist Strip */}
        <div className="pt-8 border-t border-[#1C0E07] flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-[#F5E6D0]/40">
          <p>© {new Date().getFullYear()} Kinetics Caffe Artisan Coffee Roasters Pvt Ltd.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#D89B5A]">Privacy</a>
            <a href="#" className="hover:text-[#D89B5A]">Terms</a>
            <a href="#" className="hover:text-[#D89B5A]">Brew Guides</a>
          </div>
        </div>

      </div>
    </footer>
  );
}

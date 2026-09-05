'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#060302] border-t border-[#C9A86C]/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* TOP ROW: Newsletter/CTA Banner */}
        <div className="bg-gradient-to-r from-[#1B3B2B]/40 via-[#140C07] to-[#301818]/40 rounded-2xl p-8 border border-[#C9A86C]/15 mb-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-serif text-[#F5E6D0]">Stay in the Loop</h3>
            <p className="text-sm text-[#F5E6D0]/70 mt-2">
              Get updates on new roasts, seasonal specials & exclusive tastings.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <input 
              type="email" 
              placeholder="Your email address"
              className="bg-[#0B0705] border border-[#C9A86C]/25 rounded-xl px-4 py-3 text-sm text-[#F5E6D0] placeholder-[#F5E6D0]/30 w-64 focus:outline-none focus:border-[#D89B5A]/50 transition-colors"
            />
            <button className="px-5 py-3 rounded-xl bg-[#D89B5A] text-[#0B0705] font-semibold text-xs uppercase tracking-wider hover:bg-[#C9A86C] transition-colors w-full sm:w-auto">
              Subscribe
            </button>
          </div>
        </div>

        {/* MAIN 4-COLUMN GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: Brand */}
          <div className="flex flex-col">
            <h2 className="text-2xl font-serif tracking-[0.2em] text-[#F5E6D0]">
              KINETICS
            </h2>
            <p className="text-xs tracking-[0.35em] text-[#C4A882] mt-1 mb-6">
              CAFE STUDIO
            </p>
            <p className="text-sm text-[#F5E6D0]/70 leading-relaxed mb-8">
              Specialty micro-lots from the shaded hills of the Western Ghats, flame-roasted in small batches for uncompromising depth.
            </p>
            
            <div className="space-y-3">
              <div className="bg-[#0B0705] border border-[#C9A86C]/15 rounded-xl p-3 flex items-center gap-3">
                <span className="text-lg">📍</span>
                <div className="flex flex-col flex-1">
                  <span className="text-sm text-[#F5E6D0]">Hiran Magri, Udaipur</span>
                  <a href="#" className="text-xs text-[#D89B5A] hover:text-[#C9A86C] mt-0.5">Maps &rarr;</a>
                </div>
              </div>
              <div className="bg-[#0B0705] border border-[#C9A86C]/15 rounded-xl p-3 flex items-center gap-3 opacity-75">
                <span className="text-lg">🏭</span>
                <div className="flex flex-col flex-1">
                  <span className="text-sm text-[#F5E6D0]">Roastery: Mallandur Rd</span>
                  <span className="text-xs text-[#F5E6D0]/50 mt-0.5">Chikmagalur</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#D89B5A] mb-5">
              NAVIGATE
            </h3>
            <nav className="flex flex-col space-y-1">
              <a href="#" className="text-xs text-[#F5E6D0]/60 hover:text-[#D89B5A] transition-colors py-1.5 block">The Experience</a>
              <a href="#" className="text-xs text-[#F5E6D0]/60 hover:text-[#D89B5A] transition-colors py-1.5 block">Signature Collection</a>
              <a href="#" className="text-xs text-[#F5E6D0]/60 hover:text-[#D89B5A] transition-colors py-1.5 block">Brew Studio</a>
              <a href="#" className="text-xs text-[#F5E6D0]/60 hover:text-[#D89B5A] transition-colors py-1.5 block">Sanctuary &amp; Seating</a>
              <a href="#" className="text-xs text-[#F5E6D0]/60 hover:text-[#D89B5A] transition-colors py-1.5 block">AI Sommelier</a>
              <a href="#" className="text-xs text-[#1B3B2B] font-medium py-1.5 block mt-2 flex items-center gap-2">
                Gift Cards <span className="text-[9px] bg-[#1B3B2B]/20 text-[#1B3B2B] px-1.5 py-0.5 rounded-sm uppercase tracking-wider">(Coming Soon)</span>
              </a>
            </nav>
          </div>

          {/* Column 3: Hours & Contact */}
          <div>
            <h3 className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#D89B5A] mb-5">
              HOURS &amp; CONTACT
            </h3>
            
            <div className="mb-6 flex flex-col space-y-3">
              <div className="flex justify-between items-center text-xs text-[#F5E6D0]/70 pb-3 border-b border-[#F5E6D0]/10">
                <span>Mon &ndash; Fri</span>
                <span>7:00 AM &ndash; 11:00 PM</span>
              </div>
              <div className="flex justify-between items-center text-xs text-[#F5E6D0]/70 pb-3 border-b border-[#F5E6D0]/10">
                <span>Sat &ndash; Sun</span>
                <span>8:00 AM &ndash; 11:30 PM</span>
              </div>
              <div className="flex justify-between items-center text-xs text-[#D89B5A] pt-1">
                <span>Espresso Bar</span>
                <span>Open All Day</span>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <a href="mailto:namaste@kineticscafe.in" className="text-xs text-[#F5E6D0]/60 hover:text-[#D89B5A] transition-colors">namaste@kineticscafe.in</a>
              <a href="tel:+9102942418900" className="text-xs text-[#F5E6D0]/60 hover:text-[#D89B5A] transition-colors">+91 (0294) 241-8900</a>
              <span className="text-xs text-[#F5E6D0]/60">WhatsApp: +91 98765 43210</span>
            </div>
          </div>

          {/* Column 4: Socials & Recognition */}
          <div>
            <h3 className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#D89B5A] mb-5">
              CONNECT
            </h3>
            <div className="flex flex-wrap gap-4 mb-8">
              <a href="#" className="text-xs text-[#F5E6D0]/60 hover:text-[#D89B5A] transition-colors">Instagram</a>
              <a href="#" className="text-xs text-[#F5E6D0]/60 hover:text-[#D89B5A] transition-colors">Twitter/X</a>
              <a href="#" className="text-xs text-[#F5E6D0]/60 hover:text-[#D89B5A] transition-colors">Spotify</a>
              <a href="#" className="text-xs text-[#F5E6D0]/60 hover:text-[#D89B5A] transition-colors">YouTube</a>
            </div>

            <div className="flex flex-col gap-3">
              <div className="bg-[#1A0F0A] border border-[#D89B5A]/20 px-4 py-2 rounded-full inline-flex w-max items-center">
                <span className="text-[10px] uppercase tracking-wider text-[#F5E6D0]/80">Featured on Zomato Pro</span>
              </div>
              <div className="bg-[#1A0F0A] border border-[#D89B5A]/20 px-4 py-2 rounded-full inline-flex w-max items-center gap-1.5">
                <span className="text-amber-500 text-xs">★★★★★</span>
                <span className="text-[10px] uppercase tracking-wider text-[#F5E6D0]/80">4.9 Google Reviews</span>
              </div>
              <div className="bg-[#1B3B2B]/20 border border-[#1B3B2B]/40 px-4 py-2 rounded-full inline-flex w-max items-center">
                <span className="text-[10px] uppercase tracking-wider text-[#1B3B2B] font-medium">Certified Organic</span>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="mt-12 pt-8 border-t border-[#1A1210] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-mono text-[#F5E6D0]/30">
            © 2025 Kinetics Cafe Studio Pvt Ltd. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-[10px] font-mono text-[#F5E6D0]/30 hover:text-[#D89B5A] transition-colors">Privacy</a>
            <a href="#" className="text-[10px] font-mono text-[#F5E6D0]/30 hover:text-[#D89B5A] transition-colors">Terms</a>
            <a href="#" className="text-[10px] font-mono text-[#F5E6D0]/30 hover:text-[#D89B5A] transition-colors">Brew Guides</a>
          </div>
        </div>

      </div>
    </footer>
  );
}

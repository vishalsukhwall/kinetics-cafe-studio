'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#FBF9F5] text-[#2B2421] border-t border-[#2B2421]/15 pt-24 pb-10 transition-colors duration-700 font-sans">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* TOP ROW: Newsletter/CTA Banner */}
        <div className="bg-[#F2EDE4] p-8 border border-[#2B2421]/15 rounded-2xl mb-16 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-serif text-[#2B2421] font-bold">Stay in the Loop</h3>
            <p className="text-sm text-[#5A5049] mt-2 font-light">
              Get updates on new roasts, seasonal specials & exclusive tastings.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <input 
              type="email" 
              placeholder="Your email address"
              className="bg-white border border-[#2B2421]/20 rounded-xl px-4 py-3 text-sm text-[#2B2421] placeholder-[#2B2421]/40 w-full sm:w-64 focus:outline-none focus:border-[#A8583B] transition-colors shadow-sm"
            />
            <button className="px-6 py-3 rounded-xl bg-[#2B2421] text-[#FBF9F5] font-medium text-xs uppercase tracking-wider hover:bg-[#A8583B] transition-colors w-full sm:w-auto cursor-pointer shadow-sm">
              Subscribe
            </button>
          </div>
        </div>

        {/* MAIN 4-COLUMN GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: Brand */}
          <div className="flex flex-col">
            <h2 className="text-2xl font-serif tracking-[0.2em] text-[#2B2421] font-bold">
              KINETICS
            </h2>
            <p className="text-xs tracking-[0.35em] text-[#A8583B] mt-1 mb-6 font-semibold">
              CAFE STUDIO
            </p>
            <p className="text-sm text-[#5A5049] font-light leading-relaxed mb-8">
              Specialty micro-lots from the shaded hills of the Western Ghats, flame-roasted in small batches for uncompromising depth.
            </p>
            
            <div className="space-y-3">
              <div className="bg-[#F2EDE4] p-3 rounded-xl flex items-center gap-3 shadow-sm border border-[#2B2421]/10">
                <span className="text-lg">📍</span>
                <div className="flex flex-col flex-1">
                  <span className="text-sm text-[#2B2421] font-medium">Hiran Magri, Udaipur</span>
                  <a href="#" className="text-xs text-[#A8583B] hover:text-[#2B2421] mt-0.5 font-medium transition-colors">Maps &rarr;</a>
                </div>
              </div>
              <div className="bg-[#F2EDE4] p-3 rounded-xl flex items-center gap-3 shadow-sm border border-[#2B2421]/10 opacity-90">
                <span className="text-lg">🏭</span>
                <div className="flex flex-col flex-1">
                  <span className="text-sm text-[#2B2421] font-medium">Roastery: Mallandur Rd</span>
                  <span className="text-xs text-[#5A5049] mt-0.5">Chikmagalur</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#2B2421]/60 mb-5 font-bold">
              NAVIGATE
            </h3>
            <nav className="flex flex-col space-y-1">
              <a href="#" className="text-xs text-[#5A5049] hover:text-[#A8583B] font-medium transition-colors py-1.5 block">The Experience</a>
              <a href="#" className="text-xs text-[#5A5049] hover:text-[#A8583B] font-medium transition-colors py-1.5 block">Signature Collection</a>
              <a href="#" className="text-xs text-[#5A5049] hover:text-[#A8583B] font-medium transition-colors py-1.5 block">Brew Studio</a>
              <a href="#" className="text-xs text-[#5A5049] hover:text-[#A8583B] font-medium transition-colors py-1.5 block">Sanctuary &amp; Seating</a>
              <a href="#" className="text-xs text-[#5A5049] hover:text-[#A8583B] font-medium transition-colors py-1.5 block">AI Sommelier</a>
              <a href="#" className="text-xs text-[#2B2421] font-medium py-1.5 block mt-2 flex items-center gap-2">
                Gift Cards <span className="text-[9px] bg-[#2B2421]/5 text-[#5A5049] px-1.5 py-0.5 rounded-sm uppercase tracking-wider border border-[#2B2421]/10">(Coming Soon)</span>
              </a>
            </nav>
          </div>

          {/* Column 3: Hours & Contact */}
          <div>
            <h3 className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#2B2421]/60 mb-5 font-bold">
              HOURS &amp; CONTACT
            </h3>
            
            <div className="mb-6 flex flex-col space-y-3">
              <div className="flex justify-between items-center text-xs text-[#5A5049] pb-3 border-b border-[#2B2421]/10">
                <span>Mon &ndash; Fri</span>
                <span>7:00 AM &ndash; 11:00 PM</span>
              </div>
              <div className="flex justify-between items-center text-xs text-[#5A5049] pb-3 border-b border-[#2B2421]/10">
                <span>Sat &ndash; Sun</span>
                <span>8:00 AM &ndash; 11:30 PM</span>
              </div>
              <div className="flex justify-between items-center text-xs text-[#A8583B] pt-1 font-semibold">
                <span>Espresso Bar</span>
                <span>Open All Day</span>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <a href="mailto:namaste@kineticscafe.in" className="text-xs text-[#5A5049] hover:text-[#A8583B] transition-colors">namaste@kineticscafe.in</a>
              <a href="tel:+9102942418900" className="text-xs text-[#5A5049] hover:text-[#A8583B] transition-colors">+91 (0294) 241-8900</a>
              <span className="text-xs text-[#5A5049]">WhatsApp: +91 98765 43210</span>
            </div>
          </div>

          {/* Column 4: Socials & Recognition */}
          <div>
            <h3 className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#2B2421]/60 mb-5 font-bold">
              CONNECT
            </h3>
            <div className="flex flex-wrap gap-4 mb-8">
              <a href="#" className="text-xs text-[#5A5049] hover:text-[#A8583B] transition-colors">Instagram</a>
              <a href="#" className="text-xs text-[#5A5049] hover:text-[#A8583B] transition-colors">Twitter/X</a>
              <a href="#" className="text-xs text-[#5A5049] hover:text-[#A8583B] transition-colors">Spotify</a>
              <a href="#" className="text-xs text-[#5A5049] hover:text-[#A8583B] transition-colors">YouTube</a>
            </div>

            <div className="flex flex-col gap-3">
              <div className="bg-[#F2EDE4] px-4 py-2 rounded-full inline-flex w-max items-center shadow-sm border border-[#2B2421]/10">
                <span className="text-[10px] uppercase tracking-wider text-[#5A5049] font-medium">Featured on Zomato Pro</span>
              </div>
              <div className="bg-[#F2EDE4] px-4 py-2 rounded-full inline-flex w-max items-center gap-1.5 shadow-sm border border-[#2B2421]/10">
                <span className="text-[#C9A86C] text-xs">★★★★★</span>
                <span className="text-[10px] uppercase tracking-wider text-[#5A5049] font-medium">4.9 Google Reviews</span>
              </div>
              <div className="bg-white px-4 py-2 rounded-full inline-flex w-max items-center shadow-sm border border-[#2B2421]/10">
                <span className="text-[10px] uppercase tracking-wider text-[#2B2421] font-semibold">Certified Organic</span>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="mt-16 pt-8 border-t border-[#2B2421]/15 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-mono text-[#5A5049]">
            © {new Date().getFullYear()} Kinetics Cafe Studio Pvt Ltd. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-[10px] font-mono text-[#5A5049] hover:text-[#A8583B] transition-colors">Privacy</a>
            <a href="#" className="text-[10px] font-mono text-[#5A5049] hover:text-[#A8583B] transition-colors">Terms</a>
            <a href="#" className="text-[10px] font-mono text-[#5A5049] hover:text-[#A8583B] transition-colors">Brew Guides</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
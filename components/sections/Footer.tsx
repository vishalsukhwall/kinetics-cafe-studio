'use client';

import React from 'react';

export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 85;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="bg-theme-footer text-[#2B2421] border-t border-slate-200/80 pt-20 pb-12 transition-colors duration-700 font-sans">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* TOP ROW: Colorful Newsletter Banner */}
        <div className="glass-card p-8 sm:p-10 border-amber-200/80 rounded-3xl mb-16 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-amber-300/20 via-rose-300/20 to-indigo-300/20 rounded-full blur-2xl pointer-events-none" />
          
          <div className="text-center md:text-left z-10">
            <span className="text-xs font-mono text-amber-700 font-bold uppercase tracking-widest block mb-1">
              JOIN THE KINETICS COFFEE CLUB
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif text-[#2B2421] font-bold">
              Receive First-Dibs on Micro-Lot Harvests
            </h3>
            <p className="text-sm text-slate-600 mt-1 font-light max-w-lg">
              Seasonal harvest drops, private tasting invites, and hand-pour brewing recipes delivered once monthly.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto z-10">
            <input 
              type="email" 
              placeholder="Enter your email address"
              className="bg-white border border-slate-300 rounded-full px-5 py-3.5 text-sm text-slate-800 placeholder-slate-400 w-full sm:w-72 focus:outline-none focus:border-amber-600 shadow-2xs"
            />
            <button className="btn-tactile px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-600 to-rose-600 text-white font-bold text-xs uppercase tracking-wider hover:brightness-105 transition-all w-full sm:w-auto cursor-pointer shadow-sm">
              Subscribe
            </button>
          </div>
        </div>

        {/* MAIN 4-COLUMN GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: Brand & Physical Location */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-serif text-2xl font-bold tracking-tight text-[#2B2421]">
                Kinetics<span className="text-rose-600">.</span>
              </span>
            </div>
            <p className="text-xs tracking-[0.3em] text-amber-700 font-bold uppercase mb-4">
              ARTISAN CAFFE STUDIO
            </p>
            <p className="text-sm text-slate-600 font-light leading-relaxed mb-6">
              Flame-roasted single-origin micro-lots from Western Ghats estates, precision-brewed and paired with handcrafted artisanal baking.
            </p>
            
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex items-start gap-3">
                <span className="text-xl">📍</span>
                <div className="flex flex-col flex-1">
                  <span className="text-xs font-bold text-slate-900">Udaipur Flagship Caffe</span>
                  <span className="text-xs text-slate-500 font-light">Hiran Magri, Udaipur, Rajasthan</span>
                  <a 
                    href="https://maps.google.com/?q=Hiran+Magri+Udaipur" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xs font-semibold text-rose-600 hover:text-amber-700 mt-1 inline-flex items-center gap-1"
                  >
                    <span>Get Directions</span>
                    <span>→</span>
                  </a>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-100/70 border border-slate-200/60 flex items-center gap-3">
                <span className="text-base">🏭</span>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-slate-800">Roastery: Mallandur Road</span>
                  <span className="text-[11px] text-slate-500">Chikmagalur, Karnataka</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Navigation Anchors */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-[0.25em] text-slate-900 mb-5 font-bold">
              EXPLORE CAFFE
            </h4>
            <nav className="flex flex-col space-y-2">
              {[
                { label: 'The Experience', target: 'hero' },
                { label: 'Why Kinetics', target: 'why-us' },
                { label: 'Craft Menu & Food', target: 'menu' },
                { label: 'Interactive Brew Studio', target: 'custom-brew' },
                { label: 'Sanctuary Table Reservation', target: 'sanctuary' },
              ].map(item => (
                <button
                  key={item.label}
                  onClick={() => scrollTo(item.target)}
                  className="text-xs text-slate-600 hover:text-amber-700 font-medium transition-colors py-1 text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-amber-500">›</span>
                  <span>{item.label}</span>
                </button>
              ))}
              <span className="text-xs text-slate-400 py-1 flex items-center gap-2">
                Gift Cards <span className="text-[9px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-mono uppercase">Coming Soon</span>
              </span>
            </nav>
          </div>

          {/* Column 3: Hours & Direct Contacts */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-[0.25em] text-slate-900 mb-5 font-bold">
              HOURS &amp; CONTACT
            </h4>
            
            <div className="mb-6 flex flex-col space-y-2.5">
              <div className="flex justify-between items-center text-xs text-slate-600 pb-2 border-b border-slate-200/70">
                <span>Mon &ndash; Fri</span>
                <span className="font-mono font-semibold text-slate-800">7:00 AM &ndash; 11:00 PM</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-600 pb-2 border-b border-slate-200/70">
                <span>Sat &ndash; Sun</span>
                <span className="font-mono font-semibold text-slate-800">8:00 AM &ndash; 11:30 PM</span>
              </div>
              <div className="flex justify-between items-center text-xs text-emerald-700 pt-1 font-semibold">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Espresso Bar</span>
                </span>
                <span>Open All Day</span>
              </div>
            </div>

            <div className="flex flex-col space-y-2 text-xs">
              <a 
                href="mailto:nilesh.rajani01@gmail.com" 
                className="text-slate-600 hover:text-rose-600 transition-colors flex items-center gap-1.5"
              >
                <span>✉</span>
                <span>nilesh.rajani01@gmail.com</span>
              </a>
              <a 
                href="tel:+919352457597" 
                className="text-slate-600 hover:text-amber-600 transition-colors font-semibold flex items-center gap-1.5"
              >
                <span>📞</span>
                <span>+91 93524 57597</span>
              </a>
              <a 
                href="https://wa.me/919352457597?text=Hello%20Kinetics%20Caffe" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#128C7E] hover:underline font-semibold flex items-center gap-1.5"
              >
                <span>💬</span>
                <span>WhatsApp: +91 93524 57597</span>
              </a>
            </div>
          </div>

          {/* Column 4: Socials & Recognition */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-[0.25em] text-slate-900 mb-5 font-bold">
              COMMUNITY &amp; TRUST
            </h4>
            
            <div className="flex flex-wrap gap-2.5 mb-6">
              {['Instagram', 'Twitter/X', 'Spotify', 'YouTube'].map(platform => (
                <a 
                  key={platform}
                  href="#" 
                  className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs text-slate-600 hover:border-amber-400 hover:text-amber-800 transition-all shadow-2xs font-medium"
                >
                  {platform}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-2.5">
              <div className="px-3.5 py-2 rounded-xl bg-white border border-amber-200/90 flex items-center gap-2 shadow-2xs">
                <span className="text-amber-500 text-xs">★★★★★</span>
                <span className="text-xs font-mono font-bold text-slate-800">4.9 Google Reviews</span>
              </div>
              <div className="px-3.5 py-2 rounded-xl bg-white border border-emerald-200/90 flex items-center gap-2 shadow-2xs">
                <span className="text-emerald-600 text-xs">🌿</span>
                <span className="text-xs font-mono font-semibold text-emerald-900">100% Certified Organic</span>
              </div>
              <div className="px-3.5 py-2 rounded-xl bg-white border border-rose-200/90 flex items-center gap-2 shadow-2xs">
                <span className="text-rose-600 text-xs">🍽️</span>
                <span className="text-xs font-mono font-semibold text-rose-900">Featured on Zomato Pro</span>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="mt-16 pt-8 border-t border-slate-200/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-slate-500">
          <p>
            © {new Date().getFullYear()} Kinetics Caffe Studio Pvt Ltd &middot; Udaipur, Rajasthan
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-amber-700 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-amber-700 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-amber-700 transition-colors">Home Brew Guides</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
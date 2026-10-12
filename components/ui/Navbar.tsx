'use client';

import React, { useState, useEffect } from 'react';
import { useSceneStore } from '@/store/useSceneStore';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleOrderDrawer = useSceneStore((s) => s.toggleOrderDrawer);
  const orderItems = useSceneStore((s) => s.orderItems);

  const totalItems = orderItems.reduce((acc, i) => acc + i.quantity, 0);
  const totalPrice = orderItems.reduce((acc, i) => acc + i.price * i.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset - 85;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Utility Strip with Colorful Status & Contacts */}
      <div className="hidden md:flex w-full bg-[#1E293B] text-white/90 py-2 px-6 sm:px-8 lg:px-12 items-center justify-between z-50 relative text-xs font-mono tracking-wide">
        <div className="flex items-center gap-6">
          <a 
            href="https://maps.google.com/?q=Hiran+Magri+Udaipur" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-1.5 hover:text-amber-300 transition-colors"
          >
            <span className="text-amber-400">📍</span>
            <span>Hiran Magri, Udaipur, Rajasthan</span>
          </a>
          <span className="text-white/30">•</span>
          <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Espresso Bar Open Today 7 AM – 11:30 PM</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <a 
            href="mailto:nilesh.rajani01@gmail.com" 
            className="flex items-center gap-1.5 hover:text-amber-300 transition-colors"
          >
            <span className="text-sky-400">✉</span>
            <span>nilesh.rajani01@gmail.com</span>
          </a>
          <span className="text-white/30">•</span>
          <a 
            href="tel:+919352457597" 
            className="flex items-center gap-1.5 hover:text-amber-300 transition-colors font-semibold"
          >
            <span className="text-amber-400">📞</span>
            <span>+91 93524 57597</span>
          </a>
        </div>
      </div>

      {/* Sticky Main Glassmorphic Navbar */}
      <header
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 font-sans ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-xl border-b border-amber-900/10 py-3.5 shadow-[0_4px_25px_rgba(43,36,33,0.06)]'
            : 'bg-[#FDFBF7]/85 backdrop-blur-md py-5 border-b border-amber-900/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          
          {/* Brand Logo with Colorful Badge */}
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-3 text-left group focus:outline-none cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 via-rose-600 to-indigo-700 p-[1.5px] shadow-sm group-hover:shadow-md transition-shadow">
              <div className="w-full h-full bg-[#FDFBF7] rounded-[10px] flex items-center justify-center">
                <span className="font-serif text-xl font-bold bg-gradient-to-r from-amber-700 to-rose-700 bg-clip-text text-transparent">
                  K
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl tracking-tight text-[#2B2421] font-bold group-hover:text-amber-800 transition-colors">
                Kinetics<span className="text-rose-600">.</span>
              </span>
              <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-slate-500 font-semibold -mt-1">
                Artisan Caffe
              </span>
            </div>
          </button>

          {/* Desktop Links with Colorful Micro-interactions */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: 'Home', target: 'hero', color: 'hover:text-amber-700 hover:after:bg-amber-600' },
              { label: 'Why Us', target: 'why-us', color: 'hover:text-emerald-700 hover:after:bg-emerald-600' },
              { label: 'Craft Menu', target: 'menu', color: 'hover:text-rose-700 hover:after:bg-rose-600' },
              { label: 'Brew Studio', target: 'custom-brew', color: 'hover:text-indigo-700 hover:after:bg-indigo-600' },
              { label: 'Sanctuary', target: 'sanctuary', color: 'hover:text-teal-700 hover:after:bg-teal-600' },
              { label: 'Contact', target: 'contact', color: 'hover:text-amber-700 hover:after:bg-amber-600' },
            ].map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.target)}
                className={`text-sm font-medium text-slate-700 transition-colors relative py-1 after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-[2px] hover:after:w-full after:transition-all after:duration-300 cursor-pointer ${link.color}`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action Suite (WhatsApp, Reserve, Cart) */}
          <div className="flex items-center gap-3">
            
            {/* WhatsApp Quick Order Button */}
            <a 
              href="https://wa.me/919352457597?text=Hello%20Kinetics%20Caffe,%20I%20would%20like%20to%20place%20an%20order%20or%20reserve%20a%20table." 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-tactile hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#25D366]/10 text-[#128C7E] border border-[#25D366]/30 text-xs font-semibold hover:bg-[#25D366] hover:text-white transition-all shadow-xs cursor-pointer"
              title="Chat with Barista on WhatsApp"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
              <span>WhatsApp</span>
            </a>

            {/* Book Table CTA */}
            <button
              onClick={() => scrollToSection('sanctuary')}
              className="btn-tactile hidden lg:flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-amber-600 to-rose-600 text-white text-xs font-semibold uppercase tracking-wider hover:brightness-110 shadow-sm cursor-pointer"
            >
              <span>Book Table</span>
            </button>

            {/* Interactive Live Cart Button */}
            <button
              onClick={toggleOrderDrawer}
              className="btn-tactile relative flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#1E293B] text-white hover:bg-amber-800 transition-colors cursor-pointer shadow-sm group"
              aria-label="View Order Cart"
            >
              <div className="relative">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-rose-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center animate-bounce">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="text-xs font-mono font-semibold">
                {totalItems > 0 ? `₹${totalPrice}` : 'Cart'}
              </span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-800 hover:text-amber-700 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                {mobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="4" y1="7" x2="20" y2="7" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="4" y1="17" x2="20" y2="17" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Full Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-2xl border-b border-amber-900/10 px-6 py-6 flex flex-col gap-4 shadow-xl animate-fade-in-up">
            {[
              { label: '☕ Home Experience', target: 'hero' },
              { label: '🌿 Why Kinetics', target: 'why-us' },
              { label: '🍕 Featured Menu', target: 'menu' },
              { label: '🧪 Custom Brew Studio', target: 'custom-brew' },
              { label: '🛋️ Sanctuary & Seating', target: 'sanctuary' },
              { label: '📍 Location & Contact', target: 'contact' },
            ].map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.target)}
                className="text-left text-sm font-semibold text-slate-800 hover:text-rose-600 transition-colors py-2 border-b border-slate-100 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-slate-400 text-xs">→</span>
              </button>
            ))}

            <div className="pt-2 flex flex-col gap-3">
              <a 
                href="https://wa.me/919352457597?text=Hello%20Kinetics%20Caffe,%20I%20would%20like%20to%20order." 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-[#25D366] text-white text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Chat on WhatsApp</span>
              </a>
              <button
                onClick={() => { setMobileMenuOpen(false); scrollToSection('sanctuary'); }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 text-white text-xs uppercase tracking-wider font-bold text-center shadow-sm"
              >
                Book a Table
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
"use client";

import React, { useState, useEffect } from 'react';
import { useSceneStore } from '@/store/useSceneStore';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleOrderDrawer = useSceneStore((s) => s.toggleOrderDrawer);
  const orderItems = useSceneStore((s) => s.orderItems);

  const totalItems = orderItems.reduce((acc, i) => acc + i.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Utility Strip */}
      <div className="hidden md:flex w-full bg-espresso text-paper py-2 px-6 sm:px-8 lg:px-12 items-center justify-between z-50 relative text-[11px] font-mono tracking-wider font-light">
        <div className="flex items-center gap-2">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          <span className="opacity-80">Udaipur, Rajasthan, India</span>
        </div>
        <div className="flex items-center gap-6 opacity-80">
          <a href="mailto:nilesh.rajani01@gmail.com" className="flex items-center gap-2 hover:text-gold transition-colors">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            nilesh.rajani01@gmail.com
          </a>
          <a href="tel:+919352457597" className="flex items-center gap-2 hover:text-gold transition-colors">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            +91-9352457597
          </a>
        </div>
      </div>

      {/* Sticky Main Navbar */}
      <header
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-paper/90 backdrop-blur-md border-b border-border py-4 shadow-[0_4px_30px_rgba(43,36,33,0.04)]'
            : 'bg-paper py-6 border-b border-border/30'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          
          {/* Brand Logo */}
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <span className="font-serif text-2xl tracking-tight text-espresso font-bold group-hover:text-gold transition-colors">
              Kinetics.
            </span>
          </button>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: 'Home', target: 'hero' },
              { label: 'About Us', target: 'hero' }, // Currently maps to hero as we don't have separate sections yet
              { label: 'Menu', target: 'menu' },
              { label: 'Services', target: 'custom-brew' },
              { label: 'Photo Gallery', target: 'sanctuary' },
            ].map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.target)}
                className="text-sm font-medium text-espresso/80 hover:text-gold transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-gold hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            
            {/* Outline Contact Us */}
            <button
              onClick={() => scrollToSection('footer')}
              className="hidden sm:flex btn-tactile px-5 py-2.5 rounded-full border border-espresso text-espresso text-xs font-medium hover:bg-espresso hover:text-paper transition-all"
            >
              Contact Us
            </button>

            {/* WhatsApp Icon */}
            <a 
              href="https://wa.me/919352457597" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-tactile w-10 h-10 flex items-center justify-center rounded-full bg-gold text-paper hover:bg-terracotta transition-colors shadow-sm"
              aria-label="Chat on WhatsApp"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
            </a>

            {/* Cart */}
            <button
              onClick={toggleOrderDrawer}
              className="btn-tactile relative p-2 text-espresso hover:text-gold transition-colors"
              aria-label="View Order"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-terracotta text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-espresso hover:text-gold transition-colors"
              aria-label="Toggle menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="4" y1="8" x2="20" y2="8" />
                    <line x1="4" y1="16" x2="20" y2="16" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-paper/98 backdrop-blur-2xl border-b border-border px-6 py-8 flex flex-col gap-6 animate-fade-in-up">
            {[
              { label: 'Home', target: 'hero' },
              { label: 'About Us', target: 'hero' },
              { label: 'Menu', target: 'menu' },
              { label: 'Services', target: 'custom-brew' },
              { label: 'Photo Gallery', target: 'sanctuary' },
            ].map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.target)}
                className="text-left text-sm font-medium text-espresso/80 hover:text-gold transition-colors"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-4 border-t border-border flex flex-col gap-4">
              <button
                onClick={() => { setMobileMenuOpen(false); scrollToSection('footer'); }}
                className="w-full py-3 rounded-full border border-espresso text-espresso text-sm font-medium text-center hover:bg-espresso hover:text-paper transition-all"
              >
                Contact Us
              </button>
              <a 
                href="https://wa.me/919352457597" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-3 rounded-full bg-gold text-paper text-sm font-medium text-center flex items-center justify-center gap-2 hover:bg-terracotta transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

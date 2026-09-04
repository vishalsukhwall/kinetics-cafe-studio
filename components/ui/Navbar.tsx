"use client";

import React, { useState, useEffect } from 'react';
import { useSceneStore } from '@/store/useSceneStore';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleOrderDrawer = useSceneStore((s) => s.toggleOrderDrawer);
  const toggleARModal = useSceneStore((s) => s.toggleARModal);
  const toggleAIBarista = useSceneStore((s) => s.toggleAIBarista);
  const orderItems = useSceneStore((s) => s.orderItems);

  const totalItems = orderItems.reduce((acc, i) => acc + i.quantity, 0);
  const totalAmount = orderItems.reduce((acc, i) => acc + i.price * i.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#0B0705]/80 backdrop-blur-xl border-b border-[#C9A86C]/15 py-3.5 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
          : 'bg-gradient-to-b from-[#0B0705]/80 via-[#0B0705]/30 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        
        {/* Brand Monogram & Title */}
        <button
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-3 text-left group focus:outline-none"
        >
          <div className="w-8 h-8 rounded-full border border-[#D89B5A]/40 flex items-center justify-center bg-[#1A0F0A] group-hover:border-[#D89B5A] transition-colors">
            <span className="text-xs font-serif text-[#D89B5A] font-bold">EO</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg sm:text-xl tracking-[0.25em] text-[#F5E6D0] group-hover:text-[#D89B5A] transition-colors uppercase">
              Kinetics Caffe
            </span>
            <span className="text-[9px] tracking-[0.3em] text-[#C9A86C]/70 uppercase font-light">
              Artisan Roastery · Bengaluru
            </span>
          </div>
        </button>

        {/* Minimalist Desktop Navigation Links with Generous Spacing */}
        <nav className="hidden md:flex items-center gap-9">
          <button
            onClick={() => scrollToSection('hero')}
            className="text-xs uppercase tracking-[0.25em] text-[#F5E6D0]/70 hover:text-[#D89B5A] transition-colors font-light"
          >
            Experience
          </button>
          <button
            onClick={() => scrollToSection('menu')}
            className="text-xs uppercase tracking-[0.25em] text-[#F5E6D0]/70 hover:text-[#D89B5A] transition-colors font-light"
          >
            Collection
          </button>
          <button
            onClick={() => scrollToSection('custom-brew')}
            className="text-xs uppercase tracking-[0.25em] text-[#F5E6D0]/70 hover:text-[#D89B5A] transition-colors font-light"
          >
            Brew Studio
          </button>
          <button
            onClick={() => scrollToSection('sanctuary')}
            className="text-xs uppercase tracking-[0.25em] text-[#F5E6D0]/70 hover:text-[#D89B5A] transition-colors font-light"
          >
            Sanctuary & Seating
          </button>
        </nav>

        {/* Right Actions: AR & Cart Trigger */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          <button
            onClick={toggleARModal}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#C9A86C]/25 bg-[#1A0F0A]/50 text-[11px] font-mono text-[#D89B5A] hover:border-[#D89B5A] transition-all"
            aria-label="View Cup in Augmented Reality"
          >
            <span>AR</span>
            <span className="text-[#F5E6D0]/70">View</span>
          </button>

          {/* Cart Trigger with INR Badge */}
          <button
            onClick={toggleOrderDrawer}
            className="btn-tactile flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#1A0F0A] border border-[#C9A86C]/30 text-[#F5E6D0] hover:border-[#D89B5A] hover:bg-[#2A180E] transition-all shadow-[0_0_15px_rgba(216,155,90,0.12)] group"
            aria-label="View Order"
          >
            <div className="relative">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#D89B5A] group-hover:scale-105 transition-transform"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-[#D89B5A] text-[#0B0705] rounded-full text-[9px] font-bold flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </div>

            <span className="text-xs tracking-wider uppercase font-medium">
              {totalItems > 0 ? `₹${totalAmount.toLocaleString('en-IN')}` : 'Cart'}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#D89B5A] hover:text-[#F5E6D0] transition-colors"
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
        <div className="md:hidden bg-[#0B0705]/98 backdrop-blur-2xl border-b border-[#C9A86C]/15 px-6 py-8 flex flex-col gap-6 animate-fade-in-up">
          <button
            onClick={() => scrollToSection('hero')}
            className="text-left text-xs uppercase tracking-[0.25em] text-[#F5E6D0]/80"
          >
            The Experience
          </button>
          <button
            onClick={() => scrollToSection('menu')}
            className="text-left text-xs uppercase tracking-[0.25em] text-[#D89B5A] font-medium"
          >
            The Signature Collection
          </button>
          <button
            onClick={() => scrollToSection('custom-brew')}
            className="text-left text-xs uppercase tracking-[0.25em] text-[#F5E6D0]/80"
          >
            Custom Brew Studio
          </button>
          <button
            onClick={() => scrollToSection('sanctuary')}
            className="text-left text-xs uppercase tracking-[0.25em] text-[#F5E6D0]/80"
          >
            Sanctuary & Seating
          </button>
          <div className="pt-4 border-t border-[#2A1F1A] flex gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                toggleARModal();
              }}
              className="flex-1 py-2.5 rounded-xl border border-[#C9A86C]/30 text-xs font-mono text-[#D89B5A] text-center"
            >
              AR Desk View
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                toggleAIBarista();
              }}
              className="flex-1 py-2.5 rounded-xl bg-[#D89B5A] text-[#0B0705] text-xs font-bold text-center uppercase tracking-wider"
            >
              AI Sommelier
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface GalleryItem {
  id: number;
  title: string;
  subtitle: string;
  aspect: 'tall' | 'wide' | 'square';
  imageUrl: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    title: 'The Flame Roaster',
    subtitle: 'Small-Batch Cast Iron Drum · 220°C Caramelization',
    aspect: 'tall',
    imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 2,
    title: 'Morning Sanctuary',
    subtitle: 'Reclaimed Smoked Oak & Brushed Steel Architecture',
    aspect: 'wide',
    imageUrl: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 3,
    title: 'Heirloom Bean Selection',
    subtitle: 'Direct-Trade Micro-Lots from Highland Volcanic Soil',
    aspect: 'square',
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 4,
    title: 'The Ritual Pour',
    subtitle: 'Hand-Crafted Hario Ceramic Cone · 93°C Extraction',
    aspect: 'tall',
    imageUrl: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 5,
    title: 'The Tasting Bar',
    subtitle: 'Warm Amber Filament Lighting & Ambient Jazz',
    aspect: 'wide',
    imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 6,
    title: 'Syrupy Crema Extraction',
    subtitle: 'Naked Portafilter · First 15 Seconds of Golden Drop',
    aspect: 'square',
    imageUrl: 'https://images.unsplash.com/photo-1521302200778-33500795e128?auto=format&fit=crop&w=1200&q=85',
  },
];

export default function AtmosphereGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item, index) => {
        if (!item) return;
        gsap.fromTo(
          item,
          { opacity: 0, y: 35, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
            delay: (index % 3) * 0.08,
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const getAspectClass = (aspect: GalleryItem['aspect']) => {
    switch (aspect) {
      case 'tall':
        return 'row-span-2 min-h-[420px] md:min-h-[540px]';
      case 'wide':
        return 'col-span-1 md:col-span-2 min-h-[260px] md:min-h-[300px]';
      case 'square':
        return 'col-span-1 min-h-[260px] md:min-h-[300px]';
      default:
        return 'min-h-[280px]';
    }
  };

  return (
    <section ref={containerRef} className="py-32 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto w-full text-[#F5E6D0]">
      {/* Section Title */}
      <header className="mb-20 text-center">
        <span className="text-xs uppercase tracking-[0.35em] text-[#D89B5A] font-light">
          Sensory Architecture
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-[0.2em] uppercase text-[#F5E6D0] mt-3">
          Atmosphere & Craft
        </h2>
        <p className="mt-4 max-w-xl mx-auto text-sm md:text-base text-[#C9A86C]/80 font-light leading-relaxed">
          Step into our sanctuary of fire, wood, and steam. Every corner is designed for mindful connection with coffee in its purest form.
        </p>
      </header>

      {/* Masonry-Style Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
        {GALLERY_ITEMS.map((item, i) => (
          <div
            key={item.id}
            ref={(el) => { itemsRef.current[i] = el; }}
            onClick={() => setActivePhoto(item)}
            className={`relative group overflow-hidden rounded-3xl cursor-pointer border border-[#C9A86C]/20 bg-[#1A0F0A]/60 shadow-[0_10px_30px_rgba(0,0,0,0.8)] transition-all duration-500 hover:border-[#D89B5A]/80 hover:shadow-[0_10px_40px_rgba(216,155,90,0.2)] ${getAspectClass(
              item.aspect
            )}`}
          >
            {/* Real High-Resolution Image */}
            <img
              src={item.imageUrl}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />

            {/* Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0705]/95 via-[#0B0705]/40 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

            {/* Content & Hover Caption */}
            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end transition-all duration-300">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#D89B5A] mb-1 opacity-90">
                Gallery · 0{item.id}
              </span>
              <h3 className="text-2xl md:text-3xl font-serif text-[#F5E6D0] leading-snug group-hover:text-[#D89B5A] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-[#F5E6D0]/70 mt-2 font-light opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                {item.subtitle}
              </p>
            </div>

            {/* Corner Luxury Accent */}
            <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-[#0B0705]/70 border border-[#C9A86C]/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md">
              <svg className="w-3.5 h-3.5 text-[#D89B5A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Photo Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0705]/95 backdrop-blur-xl p-4 sm:p-8"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] bg-[#1A0F0A] border border-[#C9A86C]/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[65vh] w-full overflow-hidden">
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#0B0705]/80 border border-[#C9A86C]/40 text-[#F5E6D0] flex items-center justify-center hover:bg-[#D89B5A] hover:text-[#0B0705] transition-all"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="p-6 bg-[#0B0705] border-t border-[#2A1F1A] flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-serif text-[#F5E6D0]">{activePhoto.title}</h3>
                <p className="text-sm text-[#C9A86C]/80 mt-1 font-light">{activePhoto.subtitle}</p>
              </div>
              <button
                onClick={() => setActivePhoto(null)}
                className="px-5 py-2 rounded-lg border border-[#C9A86C]/30 text-xs uppercase tracking-widest text-[#D89B5A] hover:bg-[#D89B5A]/20 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

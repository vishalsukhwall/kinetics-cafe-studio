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
    <section ref={containerRef} className="py-24 px-6 sm:px-8 md:px-12 max-w-7xl mx-auto w-full bg-[#FBF9F5] text-[#2B2421] font-sans">
      {/* Section Title */}
      <header className="mb-16 text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-[#A8583B] font-semibold">
          Sensory Architecture
        </span>
        <h2 className="text-4xl md:text-5xl font-serif uppercase text-[#2B2421] mt-3 tracking-wide">
          Atmosphere & Craft
        </h2>
        <p className="mt-4 max-w-xl mx-auto text-sm md:text-base text-[#5A5049] font-light leading-relaxed">
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
            className={`relative group overflow-hidden rounded-2xl cursor-pointer border border-[#2B2421]/10 bg-[#F2EDE4] shadow-sm transition-all duration-500 hover:border-[#A8583B] hover:shadow-md ${getAspectClass(
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

            {/* Warm Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#2B2421]/90 via-[#2B2421]/30 to-transparent transition-opacity duration-300 group-hover:opacity-95" />

            {/* Content & Hover Caption */}
            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end transition-all duration-300">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C9A86C] mb-1 font-semibold">
                Gallery · 0{item.id}
              </span>
              <h3 className="text-2xl font-serif text-[#FBF9F5] leading-snug group-hover:text-[#C9A86C] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-[#FBF9F5]/80 mt-2 font-light opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                {item.subtitle}
              </p>
            </div>

            {/* Corner Luxury Accent */}
            <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 border border-[#2B2421]/15 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md shadow-sm">
              <svg className="w-4 h-4 text-[#2B2421]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Photo Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#2B2421]/80 backdrop-blur-md p-4 sm:p-8"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] bg-[#FBF9F5] border border-[#2B2421]/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[65vh] w-full overflow-hidden bg-[#F2EDE4]">
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 border border-[#2B2421]/20 text-[#2B2421] flex items-center justify-center hover:bg-[#2B2421] hover:text-[#FBF9F5] transition-all shadow-sm"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="p-6 bg-[#FBF9F5] border-t border-[#2B2421]/10 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-serif text-[#2B2421]">{activePhoto.title}</h3>
                <p className="text-sm text-[#5A5049] mt-1 font-light">{activePhoto.subtitle}</p>
              </div>
              <button
                onClick={() => setActivePhoto(null)}
                className="px-6 py-2.5 rounded-full bg-[#2B2421] text-[#FBF9F5] text-xs uppercase tracking-widest hover:bg-[#A8583B] transition-colors shadow-sm"
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
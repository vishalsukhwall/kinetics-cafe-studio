"use client";

import React, { useState, useMemo } from 'react';
import { useSceneStore } from '@/store/useSceneStore';

export interface CoffeeItem {
  id: string;
  name: string;
  category: 'Espresso' | 'Slow Pour' | 'Cold Brew' | 'Signatures';
  price: number; // in INR (₹)
  origin: string;
  roast: string;
  notes: string[];
  description: string;
  imageUrl: string;
}

const SIGNATURE_COLLECTION: CoffeeItem[] = [
  {
    id: 'single-origin-espresso',
    name: 'Single Origin Espresso',
    category: 'Espresso',
    price: 220,
    origin: 'Chikmagalur, Karnataka · 1,450m',
    roast: 'Flame-Roasted Medium',
    notes: ['Dark Cocoa', 'Dried Black Fig', 'Smoky Cedar'],
    description: 'Dense 9-bar extraction with a 1:2 ratio. Velvety mouthfeel with a persistent hazelnut crema.',
    imageUrl: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'velvet-flat-white',
    name: 'Velvet Flat White',
    category: 'Espresso',
    price: 260,
    origin: 'Wayanad, Kerala · 1,300m',
    roast: 'Medium Light Roast',
    notes: ['Silky Microfoam', 'Roasted Hazelnut', 'Wild Honey'],
    description: 'Double ristretto folded into steamed pasture-raised whole milk with gossamer microfoam.',
    imageUrl: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'spanish-cortado',
    name: 'Spanish Cortado',
    category: 'Espresso',
    price: 240,
    origin: 'Araku Valley, Andhra · 1,200m',
    roast: 'Full City Flame Roast',
    notes: ['Warm Caramel', 'Toasted Almond', 'Malty Finish'],
    description: 'Equal parts bold espresso and textured milk served in a faceted Gibraltar glass to cut acidity.',
    imageUrl: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'dark-mocha-macchiato',
    name: 'Dark Mocha Macchiato',
    category: 'Espresso',
    price: 280,
    origin: 'Coorg Peaberry · 1,150m',
    roast: 'Dark Espresso Roast',
    notes: ['Kerala Cocoa 70%', 'Brown Butter', 'Nutmeg'],
    description: 'Double shot poured through artisanal 70% single-estate chocolate ganache, marked with foam.',
    imageUrl: 'https://images.unsplash.com/photo-1585494156145-1c60a4fe9d2b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'chikmagalur-pour-over',
    name: 'Estate V60 Pour Over',
    category: 'Slow Pour',
    price: 320,
    origin: 'Baba Budangiri, Chikmagalur · 1,550m',
    roast: 'Nordic Light Roast',
    notes: ['Jasmine Floral', 'Sweet Bergamot', 'Cane Sugar'],
    description: 'Hand-poured through Hario V60 ceramic dripper at 93°C. Tea-like clarity with delicate florals.',
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'aeropress-reserve',
    name: 'AeroPress Inverted Reserve',
    category: 'Slow Pour',
    price: 300,
    origin: 'Araku Valley Micro-lot · 1,250m',
    roast: 'Cinnamon Roast',
    notes: ['Tamarind Tang', 'Blood Orange', 'Dark Honey'],
    description: 'Inverted method with a metal disc filter for enhanced aromatic oils and crisp fruit acidity.',
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cascara-nitro-cold-brew',
    name: 'Cascara Nitro Cold Brew',
    category: 'Cold Brew',
    price: 350,
    origin: 'Highland Washed Arabica · 24h Steep',
    roast: 'Deep French Roast',
    notes: ['Cascading Velvet', 'Cherry Husk', 'Dark Molasses'],
    description: 'Infused with organic coffee cherry cascara and charged with nitrogen for a dense velvety head.',
    imageUrl: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'kyoto-cold-drip',
    name: 'Japanese Kyoto Cold Drip',
    category: 'Cold Brew',
    price: 360,
    origin: 'Biligirirangana Hills, Karnataka · 1,400m',
    roast: 'Light-Medium Roast',
    notes: ['Black Plum', 'Winey Undertones', 'Oak Bark'],
    description: 'Extracted drop-by-drop over 12 hours using ice-melt gravity filtration in our glass tower.',
    imageUrl: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'smoked-vanilla-espresso-tonic',
    name: 'Smoked Vanilla Espresso Tonic',
    category: 'Signatures',
    price: 380,
    origin: 'Chikmagalur Red Honey · 1,450m',
    roast: 'Blonde Flame Roast',
    notes: ['Madagascar Vanilla', 'Quinine Tonic', 'Charred Citrus'],
    description: 'Indian tonic water layered under a floating double shot with charred rosemary aromatic smoke.',
    imageUrl: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'artisanal-affogato',
    name: 'Artisanal Affogato al Caffè',
    category: 'Signatures',
    price: 420,
    origin: 'Estate Special Espresso & House Gelato',
    roast: 'Dark Roast Blend',
    notes: ['Tahitian Vanilla Bean', 'Hot Ristretto', 'Salted Toffee'],
    description: 'Double ristretto poured over two scoops of slow-churned Madagascar vanilla bean gelato.',
    imageUrl: 'https://images.unsplash.com/photo-1594261956806-3ad03785c9b4?auto=format&fit=crop&w=800&q=80',
  },
];

const CATEGORIES = ['All Coffees', 'Espresso', 'Slow Pour', 'Cold Brew', 'Signatures'] as const;

export default function MenuShowcase3D() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Coffees');
  const [addedItem, setAddedItem] = useState<string | null>(null);
  const addOrderItem = useSceneStore((s) => s.addOrderItem);

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'All Coffees') return SIGNATURE_COLLECTION;
    return SIGNATURE_COLLECTION.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const handleAdd = (item: CoffeeItem) => {
    addOrderItem({
      id: item.id,
      name: item.name,
      price: item.price,
    });
    setAddedItem(item.id);
    setTimeout(() => setAddedItem(null), 1200);
  };

  return (
    <section
      id="menu"
      className="relative min-h-screen w-full bg-[#0E0704] py-32 px-6 sm:px-8 lg:px-12 text-[#F5E6D0]"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header with Generous Whitespace */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-[11px] font-mono uppercase tracking-[0.35em] text-[#D89B5A] block mb-3">
            01 · The Signature Collection
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-[0.16em] uppercase text-[#F5E6D0]">
            Craft Menu
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-[#C9A86C]/70 font-light leading-relaxed">
            Single-origin micro-lots roasted over flame in Bengaluru. All pricing in Indian Rupees (₹).
          </p>

          {/* Minimalist Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                    active
                      ? 'bg-[#D89B5A] text-[#0B0705] font-semibold shadow-[0_0_15px_rgba(216,155,90,0.3)]'
                      : 'bg-[#180E09]/60 text-[#F5E6D0]/60 border border-[#C9A86C]/20 hover:border-[#D89B5A]/50 hover:text-[#F5E6D0]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Clean, Breathing Coffee Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-[#160D08]/70 border border-[#C9A86C]/20 rounded-3xl overflow-hidden backdrop-blur-md transition-all duration-500 hover:border-[#D89B5A]/70 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.7)] flex flex-col justify-between"
            >
              {/* Image Section */}
              <div className="relative h-56 w-full overflow-hidden bg-[#0B0604]">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#160D08] via-transparent to-transparent" />
                
                {/* Category tag */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-[#0B0705]/80 border border-[#C9A86C]/25 text-[#D89B5A] backdrop-blur-md">
                    {item.category}
                  </span>
                </div>

                {/* Price in INR */}
                <div className="absolute bottom-3 right-4 bg-[#0B0705]/85 border border-[#D89B5A]/40 px-3 py-1 rounded-xl backdrop-blur-md">
                  <span className="text-base font-mono font-bold text-[#D89B5A]">
                    ₹{item.price}
                  </span>
                </div>
              </div>

              {/* Body Section */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-serif text-[#F5E6D0] leading-snug group-hover:text-[#D89B5A] transition-colors mb-2">
                    {item.name}
                  </h3>

                  <p className="text-[11px] font-mono text-[#C9A86C]/80 mb-3 tracking-wide">
                    {item.origin}
                  </p>

                  <p className="text-xs text-[#F5E6D0]/70 font-light leading-relaxed mb-5">
                    {item.description}
                  </p>

                  {/* Tasting Note Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {item.notes.map((note, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2.5 py-1 rounded-lg bg-[#0B0705]/50 border border-[#2A180E] text-[#F5E6D0]/80 font-light"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tactile Add Button */}
                <button
                  onClick={() => handleAdd(item)}
                  className="btn-tactile w-full py-3.5 rounded-xl bg-[#1A0F0A] border border-[#C9A86C]/40 text-[#F5E6D0] hover:bg-gradient-to-r hover:from-[#D89B5A] hover:to-[#B8722E] hover:text-[#0B0705] hover:border-transparent font-medium uppercase tracking-[0.16em] text-xs transition-all flex items-center justify-center gap-2"
                >
                  {addedItem === item.id ? (
                    <span className="text-[#D89B5A] group-hover:text-[#0B0705] font-bold">✓ Added to Order</span>
                  ) : (
                    <span>Add to Order · ₹{item.price}</span>
                  )}
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

'use client';

import React, { useState } from 'react';

const FEATURED_CATEGORIES = [
  { 
    name: 'Coffee', 
    description: 'Single-origin micro-lots & espresso rituals',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80' 
  },
  { 
    name: 'Italian', 
    description: 'Wood-fired pizzas & handcrafted pastas',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80' 
  },
  { 
    name: 'Desserts', 
    description: 'Decadent patisserie & artisan torte',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80' 
  },
  { 
    name: 'Whole Meals', 
    description: 'Nourishing bowls & gourmet plates',
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e7cdcd?auto=format&fit=crop&w=600&q=80' 
  }
];

export default function MenuShowcase3D() {
  const [activeCategory, setActiveCategory] = useState<string>('Coffee');

  return (
    <section id="menu" className="bg-[#FBF9F5] py-20 px-6 sm:px-10 lg:px-16 w-full font-sans">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Header with Title and Full Menu Button */}
        <div className="flex flex-col sm:flex-row justify-between items-end w-full mb-12 border-b border-[#2B2421]/15 pb-6">
          <div>
            <span className="text-xs font-mono text-[#A8583B] tracking-[0.3em] uppercase block mb-2 font-semibold">
              CURATED SELECTION
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#2B2421]">Our Featured Menu</h2>
          </div>
          
          <button 
            onClick={() => alert('Opening Full Menu...')}
            className="mt-4 sm:mt-0 px-6 py-2.5 rounded-full bg-white border border-[#2B2421]/20 text-[#2B2421] hover:bg-[#2B2421] hover:text-[#FBF9F5] text-xs uppercase tracking-[0.2em] transition-all shadow-sm cursor-pointer"
          >
            Full Menu
          </button>
        </div>

        {/* 4 Featured Category Cards - Perfectly proportioned like reference */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {FEATURED_CATEGORIES.map(cat => (
            <div 
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`group relative h-72 sm:h-80 rounded-xl overflow-hidden cursor-pointer shadow-md border transition-all duration-500 ${
                activeCategory === cat.name 
                  ? 'border-[#A8583B] ring-2 ring-[#A8583B]/30 scale-[1.02]' 
                  : 'border-[#2B2421]/10 hover:border-[#A8583B]/50'
              }`}
            >
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B2421]/85 via-[#2B2421]/20 to-transparent" />
              
              <div className="absolute inset-0 p-5 flex flex-col justify-end text-center">
                <span className="inline-block px-4 py-2.5 rounded-lg bg-white/95 backdrop-blur-md text-[#2B2421] font-serif text-sm tracking-wide shadow-md group-hover:bg-[#A8583B] group-hover:text-white transition-colors">
                  {cat.name}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
'use client';

import React, { useState } from 'react';
import { useSceneStore } from '@/store/useSceneStore';

export interface CoffeeItem {
  id: string;
  name: string;
  category: 'Coffee' | 'Italian' | 'Desserts' | 'Whole Meals';
  price: number;
  origin: string;
  roast: string;
  notes: string[];
  description: string;
  imageUrl: string;
}

const SIGNATURE_COLLECTION: CoffeeItem[] = [
  {
    id: 'ethiopia-yirgacheffe',
    name: 'Ethiopia Yirgacheffe',
    category: 'Coffee',
    price: 320,
    origin: 'Gedeo Zone, Ethiopia',
    roast: 'Light',
    notes: ['Jasmine', 'Bergamot', 'Peach'],
    description: 'A delicate and floral cup with tea-like body and bright acidity. Perfect for slow mornings.',
    imageUrl: 'https://images.unsplash.com/photo-1498604297800-db7444c5f948?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'artisan-pizza',
    name: 'Truffle & Mushroom Pizza',
    category: 'Italian',
    price: 480,
    origin: 'Wood-Fired Oven',
    roast: 'Fresh',
    notes: ['Truffle Oil', 'Wild Mushrooms', 'Mozzarella'],
    description: 'Hand-stretched dough topped with earthy wild mushrooms, rich truffle drizzle, and fior di latte.',
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'belgian-torte',
    name: 'Dark Belgian Chocolate Torte',
    category: 'Desserts',
    price: 350,
    origin: 'Patisserie House',
    roast: 'Rich',
    notes: ['Cocoa', 'Espresso Infusion', 'Sea Salt'],
    description: 'Decadent single-origin dark chocolate cake served with a delicate dusting of cocoa powder.',
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'green-thai-curry',
    name: 'Green Thai Curry With Rice',
    category: 'Whole Meals',
    price: 410,
    origin: 'Global Harvests',
    roast: 'Aromatic',
    notes: ['Lemongrass', 'Coconut Milk', 'Jasmine Rice'],
    description: 'Fragrant and creamy green curry infused with fresh Thai herbs, baby eggplants, and steamed jasmine rice.',
    imageUrl: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e7cdcd?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'colombia-supremo',
    name: 'Colombia Supremo',
    category: 'Coffee',
    price: 280,
    origin: 'Huila, Colombia',
    roast: 'Medium',
    notes: ['Milk Chocolate', 'Orange', 'Caramel'],
    description: 'A balanced and sweet espresso with a rich chocolate base and a hint of citrus.',
    imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'pasta-carbonara',
    name: 'Handcrafted Fettuccine Carbonara',
    category: 'Italian',
    price: 440,
    origin: 'Roma Style',
    roast: 'Fresh',
    notes: ['Pecorino', 'Black Pepper', 'Egg Yolk'],
    description: 'Traditional Roman pasta tossed with cured guanciale, aged pecorino romano, and fresh cracked pepper.',
    imageUrl: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=400&q=80'
  }
];

const FEATURED_CATEGORIES = [
  { name: 'Coffee', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80' },
  { name: 'Italian', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80' },
  { name: 'Desserts', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80' },
  { name: 'Whole Meals', image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e7cdcd?auto=format&fit=crop&w=400&q=80' }
];

export default function MenuShowcase3D() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [addedItem, setAddedItem] = useState<string | null>(null);
  
  const addOrderItem = useSceneStore((state) => state.addOrderItem);

  const filteredItems = selectedCategory === 'All' 
    ? SIGNATURE_COLLECTION 
    : SIGNATURE_COLLECTION.filter(item => item.category === selectedCategory);

  const handleAdd = (item: CoffeeItem) => {
    addOrderItem({
      id: item.id,
      name: item.name,
      price: item.price,
    });
    setAddedItem(item.id);
    setTimeout(() => setAddedItem(null), 2000);
  };

  return (
    <section id="menu" className="bg-[#FBF9F5] py-24 px-6 sm:px-8 lg:px-12 w-full transition-colors duration-700 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Header with "Our Featured Menu" and "Full Menu" button matching reference image */}
        <div className="flex flex-col sm:flex-row justify-between items-center w-full mb-14 border-b border-[#2B2421]/10 pb-6">
          <div>
            <span className="text-[11px] font-mono text-[#A8583B] tracking-[0.25em] uppercase block mb-2 font-semibold">
              CURATED SELECTION
            </span>
            <h2 className="text-4xl sm:text-5xl font-serif text-[#2B2421]">Our Featured Menu</h2>
          </div>
          
          <button 
            onClick={() => setSelectedCategory('All')}
            className="mt-4 sm:mt-0 px-7 py-3 rounded-full bg-white border border-[#2B2421]/15 text-[#2B2421] hover:bg-[#2B2421] hover:text-[#FBF9F5] text-xs uppercase tracking-[0.2em] transition-all shadow-sm cursor-pointer"
          >
            Full Menu
          </button>
        </div>

        {/* 4 Featured Category Cards (Exact match to Bottegaa reference) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full mb-16">
          {FEATURED_CATEGORIES.map(cat => (
            <div 
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`group relative h-64 sm:h-72 rounded-2xl overflow-hidden cursor-pointer shadow-sm border transition-all duration-500 ${
                selectedCategory === cat.name 
                  ? 'border-[#A8583B] ring-2 ring-[#A8583B]/30 scale-[1.02]' 
                  : 'border-[#2B2421]/10 hover:border-[#A8583B]/50'
              }`}
            >
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B2421]/80 via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-4 left-0 right-0 text-center px-4">
                <span className="inline-block px-5 py-2 rounded-xl bg-white/95 backdrop-blur-md text-[#2B2421] font-serif text-sm tracking-wide shadow-md group-hover:bg-[#A8583B] group-hover:text-white transition-colors">
                  {cat.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Active Category Header */}
        <div className="w-full flex items-center justify-between mb-8">
          <h3 className="text-2xl font-serif text-[#2B2421]">
            {selectedCategory === 'All' ? 'All Craft Offerings' : `${selectedCategory} Selection`}
          </h3>
          {selectedCategory !== 'All' && (
            <button 
              onClick={() => setSelectedCategory('All')} 
              className="text-xs uppercase tracking-widest text-[#A8583B] underline hover:text-[#2B2421] transition-colors"
            >
              Show All
            </button>
          )}
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {filteredItems.map(item => (
            <div 
              key={item.id} 
              className="bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden border border-[#2B2421]/10 flex flex-col group shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="relative h-52 w-full overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 flex items-center bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#2B2421]/10 shadow-sm">
                  <span className="w-2 h-2 rounded-full mr-2 bg-[#A8583B]"></span>
                  <span className="text-[10px] font-mono text-[#2B2421] uppercase font-medium">{item.category}</span>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#2B2421]/10 shadow-sm">
                  <span className="text-[12px] font-mono font-bold text-[#2B2421]">₹{item.price}</span>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <h4 className="text-xl font-serif text-[#2B2421] mb-1 font-bold group-hover:text-[#A8583B] transition-colors">{item.name}</h4>
                <p className="text-[11px] font-mono text-[#7A6E65] uppercase tracking-wider mb-4 font-medium">{item.origin}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.notes.map(note => (
                    <span key={note} className="px-2 py-1 bg-[#FBF9F5] border border-[#2B2421]/10 rounded-md text-[10px] text-[#5A5049] font-medium">
                      {note}
                    </span>
                  ))}
                </div>
                
                <p className="text-[#5A5049] text-sm mb-6 flex-grow line-clamp-2 leading-relaxed font-light">
                  {item.description}
                </p>
                
                <button 
                  onClick={() => handleAdd(item)}
                  className="w-full py-3 rounded-xl bg-[#2B2421] text-[#FBF9F5] font-medium text-xs uppercase tracking-[0.15em] hover:bg-[#A8583B] transition-all cursor-pointer shadow-sm"
                >
                  {addedItem === item.id ? 'Added to Order' : `Add to Order · ₹${item.price}`}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
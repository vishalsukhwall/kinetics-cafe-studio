'use client';

import React, { useState } from 'react';
import { useSceneStore } from '@/store/useSceneStore';

export interface CoffeeItem {
  id: string;
  name: string;
  category: 'Espresso' | 'Slow Pour' | 'Cold Brew' | 'Signatures';
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
    category: 'Slow Pour',
    price: 320,
    origin: 'Gedeo Zone, Ethiopia',
    roast: 'Light',
    notes: ['Jasmine', 'Bergamot', 'Peach'],
    description: 'A delicate and floral cup with tea-like body and bright acidity. Perfect for slow mornings.',
    imageUrl: 'https://images.unsplash.com/photo-1498604297800-db7444c5f948?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'colombia-supremo',
    name: 'Colombia Supremo',
    category: 'Espresso',
    price: 280,
    origin: 'Huila, Colombia',
    roast: 'Medium',
    notes: ['Milk Chocolate', 'Orange', 'Caramel'],
    description: 'A balanced and sweet espresso with a rich chocolate base and a hint of citrus.',
    imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'panama-geisha',
    name: 'Panama Geisha',
    category: 'Slow Pour',
    price: 420,
    origin: 'Boquete, Panama',
    roast: 'Light',
    notes: ['Honeysuckle', 'Mango', 'Black Tea'],
    description: 'World-renowned for its extraordinary floral aroma and complex fruit profile.',
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'kyoto-cold-brew',
    name: 'Kyoto Drip Cold Brew',
    category: 'Cold Brew',
    price: 350,
    origin: 'Rwanda, Gakenke',
    roast: 'Light-Medium',
    notes: ['Red Berry', 'Honey', 'Cocoa Nibs'],
    description: 'Slow-dripped over 12 hours for a clean, wine-like profile with zero bitterness.',
    imageUrl: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'nitro-cold-brew',
    name: 'Nitro Cascade',
    category: 'Cold Brew',
    price: 380,
    origin: 'Blend: Brazil & Sumatra',
    roast: 'Medium-Dark',
    notes: ['Dark Chocolate', 'Molasses', 'Cream'],
    description: 'Infused with nitrogen for a velvety, stout-like texture and naturally sweet finish.',
    imageUrl: 'https://images.unsplash.com/photo-1594910398287-24879201979b?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'cortado-classico',
    name: 'Cortado Classico',
    category: 'Espresso',
    price: 260,
    origin: 'Guatemala Antigua',
    roast: 'Medium',
    notes: ['Almond', 'Cocoa', 'Spice'],
    description: 'Equal parts espresso and steamed milk for the perfect balance of intensity and texture.',
    imageUrl: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'orange-blossom',
    name: 'Orange Blossom Tonic',
    category: 'Signatures',
    price: 380,
    origin: 'House Espresso Blend',
    roast: 'Medium',
    notes: ['Citrus Zest', 'Juniper', 'Espresso'],
    description: 'Espresso pulled over artisan tonic water with orange blossom mist and dehydrated citrus.',
    imageUrl: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'smoked-vanilla',
    name: 'Smoked Vanilla Latte',
    category: 'Signatures',
    price: 400,
    origin: 'House Espresso Blend',
    roast: 'Medium',
    notes: ['Vanilla Bean', 'Oak Smoke', 'Caramel'],
    description: 'House-made madagascar vanilla syrup, espresso, and steamed milk finished with oak smoke.',
    imageUrl: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'costa-rica-honey',
    name: 'Costa Rica Honey',
    category: 'Slow Pour',
    price: 340,
    origin: 'Tarrazu, Costa Rica',
    roast: 'Light',
    notes: ['Red Apple', 'Brown Sugar', 'Cinnamon'],
    description: 'Processed using the honey method for enhanced sweetness and a full, syrupy body.',
    imageUrl: 'https://images.unsplash.com/photo-1507133750076-905187834927?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'espresso-macchiato',
    name: 'Espresso Macchiato',
    category: 'Espresso',
    price: 220,
    origin: 'House Espresso Blend',
    roast: 'Medium-Dark',
    notes: ['Dark Chocolate', 'Walnut', 'Cherry'],
    description: 'A double shot of espresso marked with a dollop of textured milk foam.',
    imageUrl: 'https://images.unsplash.com/photo-1557006021-b85faa2caeda?auto=format&fit=crop&w=400&q=80'
  }
];

const CATEGORIES = ['All', 'Espresso', 'Slow Pour', 'Cold Brew', 'Signatures'];

export default function MenuShowcase3D() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
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
    <section id="menu" className="bg-theme-menu py-32 px-6 sm:px-8 lg:px-12 w-full transition-colors duration-700">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl">
          <span className="text-[11px] font-mono text-terracotta tracking-[0.2em] uppercase block mb-4 font-bold">
            02 &middot; THE SIGNATURE COLLECTION
          </span>
          <h2 className="text-5xl sm:text-6xl font-serif text-espresso mb-6">Craft Menu</h2>
          <p className="text-espresso/70 text-lg font-light">
            A curated selection of single-origin micro-lots, precision espresso, and artisanal slow pours designed to elevate your coffee ritual.
          </p>
        </div>

        {/* Filters and View Toggle */}
        <div className="flex flex-col sm:flex-row justify-between items-center w-full mb-12 gap-6">
          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-300 border ${
                  selectedCategory === cat 
                    ? 'border-terracotta bg-terracotta text-white shadow-sm' 
                    : 'border-border text-espresso/60 hover:border-terracotta/50 hover:text-espresso hover:bg-white/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="flex bg-sand p-1 rounded-full border border-border backdrop-blur-md shadow-sm">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-espresso text-paper shadow-sm' 
                  : 'text-espresso/60 hover:text-espresso'
              }`}
            >
              GRID VIEW
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-colors ${
                viewMode === 'list' 
                  ? 'bg-espresso text-paper shadow-sm' 
                  : 'text-espresso/60 hover:text-espresso'
              }`}
            >
              LIST VIEW
            </button>
          </div>
        </div>

        {/* Content */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {filteredItems.map(item => (
              <div 
                key={item.id} 
                className="glass-card overflow-hidden flex flex-col group"
              >
                <div className="relative h-52 w-full overflow-hidden">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 flex items-center bg-paper/90 backdrop-blur-md px-3 py-1 rounded-full border border-border shadow-sm">
                    <span className="w-2 h-2 rounded-full mr-2 bg-espresso"></span>
                    <span className="text-[10px] font-mono text-espresso uppercase font-medium">{item.category}</span>
                  </div>
                  <div className="absolute top-4 right-4 bg-paper/90 backdrop-blur-md px-3 py-1 rounded-full border border-border shadow-sm">
                    <span className="text-[12px] font-mono font-bold text-espresso">₹{item.price}</span>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow relative z-10">
                  <h3 className="text-xl font-serif text-espresso mb-1 font-bold group-hover:text-terracotta transition-colors">{item.name}</h3>
                  <p className="text-[11px] font-mono text-espresso/60 uppercase tracking-wider mb-4 font-medium">{item.origin}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.notes.map(note => (
                      <span key={note} className="px-2 py-1 bg-white/50 border border-border rounded-md text-[10px] text-espresso/80 font-medium">
                        {note}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-espresso/70 text-sm mb-6 flex-grow line-clamp-2 leading-relaxed font-light">
                    {item.description}
                  </p>
                  
                  <button 
                    onClick={() => handleAdd(item)}
                    className="btn-tactile w-full py-3 rounded-xl bg-espresso text-paper font-medium text-sm border border-transparent hover:bg-espresso/90"
                  >
                    {addedItem === item.id ? 'Added to Order' : `Add to Order \u00B7 \u20B9${item.price}`}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full max-w-4xl flex flex-col glass-card p-6">
            {filteredItems.map(item => (
              <div 
                key={item.id} 
                className="flex items-center py-4 border-b border-border last:border-0 hover:bg-white/40 transition-colors px-4 rounded-xl group"
              >
                <img 
                  src={item.imageUrl} 
                  alt={item.name} 
                  className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm mr-6"
                />
                <div className="flex flex-col">
                  <span className="text-lg font-serif text-espresso font-bold group-hover:text-terracotta transition-colors">{item.name}</span>
                  <span className="text-[10px] font-mono text-espresso/60 uppercase tracking-wider mt-1 font-medium">{item.origin}</span>
                </div>
                
                <div className="dot-leader opacity-30 group-hover:opacity-60 transition-opacity"></div>
                
                <div className="flex items-center gap-6">
                  <span className="text-xl font-mono font-bold text-espresso">₹{item.price}</span>
                  <button 
                    onClick={() => handleAdd(item)}
                    className={`btn-tactile w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm ${
                      addedItem === item.id 
                        ? 'bg-terracotta text-white border border-terracotta' 
                        : 'bg-white text-espresso border border-border hover:bg-espresso hover:text-paper hover:border-transparent'
                    }`}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

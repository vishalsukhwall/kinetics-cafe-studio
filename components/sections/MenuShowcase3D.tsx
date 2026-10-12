'use client';

import React, { useState } from 'react';
import { useSceneStore } from '@/store/useSceneStore';

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  origin: string;
  badge: { text: string; color: string };
  notes: string[];
  description: string;
  imageUrl: string;
}

const FEATURED_CATEGORIES = [
  { 
    id: 'Coffee',
    name: 'Coffee Rituals', 
    description: 'Single-origin V60, espresso & Kyoto drip',
    accent: 'from-amber-600/90 to-amber-950/90',
    border: 'border-amber-300',
    tag: '☕ 12 Speciality Roasts',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=700&q=80' 
  },
  { 
    id: 'Italian',
    name: 'Wood-Fired Italian', 
    description: 'Blistered sourdough pizzas & fresh tagliolini',
    accent: 'from-rose-600/90 to-rose-950/90',
    border: 'border-rose-300',
    tag: '🍕 48h Ferment Dough',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80' 
  },
  { 
    id: 'Desserts',
    name: 'Artisan Patisserie', 
    description: 'Molten torte, affogato & fresh croissants',
    accent: 'from-purple-600/90 to-purple-950/90',
    border: 'border-purple-300',
    tag: '🍰 Single-Estate Cacao',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=80' 
  },
  { 
    id: 'Whole Meals',
    name: 'Gourmet Meals', 
    description: 'Harvest bowls, avocado sourdough & pasta',
    accent: 'from-emerald-600/90 to-emerald-950/90',
    border: 'border-emerald-300',
    tag: '🥗 Fresh Farm Greens',
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e7cdcd?auto=format&fit=crop&w=700&q=80' 
  }
];

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'ethiopia-yirgacheffe',
    name: 'Ethiopia Yirgacheffe V60',
    category: 'Coffee',
    price: 320,
    origin: 'Gedeo Zone · 1,900m',
    badge: { text: 'Single Origin', color: 'bg-amber-100 text-amber-800 border-amber-300' },
    notes: ['Jasmine Florals', 'Sweet Bergamot', 'Peach'],
    description: 'Hand-poured slow extraction using pure spring water. Tea-like clarity and aromatic florals.',
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'chikmagalur-double-shot',
    name: 'Western Ghats Reserve Espresso',
    category: 'Coffee',
    price: 240,
    origin: 'Baba Budangiri · 1,450m',
    badge: { text: 'House Benchmark', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
    notes: ['Dark Cocoa', 'Dried Fig', 'Smoky Cedar'],
    description: 'Dense 9-bar extraction of shade-grown beans with persistent hazelnut crema and sweet finish.',
    imageUrl: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'kyoto-cascara-nitro',
    name: 'Cascara Nitro Cold Brew',
    category: 'Coffee',
    price: 350,
    origin: 'Highland Arabica · 24h Steep',
    badge: { text: 'Ice Specialty', color: 'bg-sky-100 text-sky-800 border-sky-300' },
    notes: ['Cherry Husk', 'Dark Molasses', 'Velvet Microfoam'],
    description: 'Slow-dripped gravity concentrate charged with food-grade nitrogen for a creamy stout texture.',
    imageUrl: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'burrata-san-marzano',
    name: 'Burrata & San Marzano Flatbread',
    category: 'Italian',
    price: 460,
    origin: '48h Fermented Sourdough',
    badge: { text: 'Wood-Fired', color: 'bg-rose-100 text-rose-800 border-rose-300' },
    notes: ['Pugliese Burrata', 'San Marzano Passata', 'Basil Oil'],
    description: 'Crisp blistered sourdough crust, slow-simmered volcanic tomato sauce, and whole creamy burrata.',
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'truffle-tagliolini',
    name: 'Handcrafted Truffle Tagliolini',
    category: 'Italian',
    price: 490,
    origin: 'Fresh Egg Pasta · Piemonte',
    badge: { text: "Chef's Signature", color: 'bg-amber-100 text-amber-800 border-amber-300' },
    notes: ['Black Truffle', '24-Mo Parmigiano', 'Cultured Butter'],
    description: 'Extruded daily and folded into rich emulsified butter with freshly shaved black truffles.',
    imageUrl: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'artisanal-affogato',
    name: 'Artisanal Affogato al Caffè',
    category: 'Desserts',
    price: 380,
    origin: 'House Madagascar Gelato',
    badge: { text: 'Boutique Dessert', color: 'bg-purple-100 text-purple-800 border-purple-300' },
    notes: ['Tahitian Vanilla', 'Hot Ristretto', 'Salted Toffee'],
    description: 'Slow-churned Madagascar vanilla bean gelato drenched tableside in scorching single-origin ristretto.',
    imageUrl: 'https://images.unsplash.com/photo-1594261956806-3ad03785c9b4?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'dark-chocolate-torte',
    name: '70% Malabar Cocoa Torte',
    category: 'Desserts',
    price: 420,
    origin: 'Single-Estate South Indian Cacao',
    badge: { text: 'Gluten Free', color: 'bg-rose-100 text-rose-800 border-rose-300' },
    notes: ['Espresso Ganache', 'Sea Salt Flakes', 'Cardamom'],
    description: 'Flourless molten torte infused with cold brew reduction and crunchy roasted cacao nibs.',
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'ancient-grain-bowl',
    name: 'Western Ghats Harvest Bowl',
    category: 'Whole Meals',
    price: 440,
    origin: 'Farm-Fresh Microgreens',
    badge: { text: 'Nutrient Dense', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
    notes: ['Roasted Squash', 'Spiced Quinoa', 'Tahini Turmeric'],
    description: 'Warm roasted heirloom squash, spiced chickpeas, wild greens, avocado, and toasted sesame dressing.',
    imageUrl: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e7cdcd?auto=format&fit=crop&w=600&q=80'
  }
];

export default function MenuShowcase3D() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const addOrderItem = useSceneStore((state) => state.addOrderItem);
  const orderItems = useSceneStore((state) => state.orderItems);

  const filteredItems = activeCategory === 'All' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  const handleAdd = (item: MenuItem) => {
    addOrderItem({
      id: item.id,
      name: item.name,
      price: item.price,
    });
    setJustAddedId(item.id);
    setTimeout(() => setJustAddedId(null), 1400);
  };

  return (
    <section id="menu" className="bg-theme-menu text-[#2B2421] py-28 px-6 sm:px-10 lg:px-16 w-full font-sans transition-colors duration-700">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center mb-16 flex flex-col items-center max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100 border border-rose-300 text-rose-800 text-xs font-mono font-bold tracking-widest uppercase mb-3 shadow-2xs">
            <span>☕</span>
            <span>HARVEST TO TABLE COLLECTION</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#2B2421] mb-4 tracking-tight">
            Our Craft Menu
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-light leading-relaxed">
            Single-origin coffees extracted with mathematical precision, matched with artisan wood-fired kitchen creations.
          </p>
        </div>

        {/* 4 Multi-Color Category Showcase Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-16">
          {FEATURED_CATEGORIES.map(cat => {
            const isSelected = activeCategory === cat.id;
            return (
              <div 
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`group relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-md border transition-all duration-300 ${
                  isSelected 
                    ? `${cat.border} ring-4 ring-amber-500/25 scale-[1.03]` 
                    : 'border-white/60 hover:scale-[1.01] hover:shadow-lg'
                }`}
              >
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
                
                {/* Dynamic Colorful Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${cat.accent} opacity-85 group-hover:opacity-90 transition-opacity`} />
                
                <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                  <div className="flex justify-between items-start">
                    <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-mono font-bold uppercase tracking-wider">
                      {cat.tag}
                    </span>
                    {isSelected && (
                      <span className="w-6 h-6 rounded-full bg-white text-slate-900 flex items-center justify-center text-xs font-bold shadow-sm">
                        ✓
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl font-bold mb-1 leading-snug">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-white/85 font-light leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Filter Navigation Pills with Counters */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {[
            { label: 'All Items', id: 'All', icon: '✨' },
            { label: 'Coffee Rituals', id: 'Coffee', icon: '☕' },
            { label: 'Wood-Fired Italian', id: 'Italian', icon: '🍕' },
            { label: 'Artisan Patisserie', id: 'Desserts', icon: '🍰' },
            { label: 'Gourmet Meals', id: 'Whole Meals', icon: '🥗' },
          ].map(tab => {
            const count = tab.id === 'All' ? MENU_ITEMS.length : MENU_ITEMS.filter(m => m.category === tab.id).length;
            const isTabActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`btn-tactile px-5 py-2.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer border flex items-center gap-2 shadow-2xs ${
                  isTabActive
                    ? 'bg-[#1E293B] text-white border-[#1E293B] shadow-sm font-bold scale-105'
                    : 'glass-card text-slate-700 border-slate-200/80 hover:border-amber-500 hover:text-amber-800'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${isTabActive ? 'bg-amber-500 text-slate-900' : 'bg-slate-200/80 text-slate-600'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Curated Grid of Menu Items with Instant Add-to-Order Feedback */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {filteredItems.map(item => {
            const inCartItem = orderItems.find(o => o.id === item.id);
            const inCartQuantity = inCartItem?.quantity || 0;
            const isJustAdded = justAddedId === item.id;

            return (
              <div 
                key={item.id} 
                className="glass-card rounded-2xl overflow-hidden flex flex-col border-slate-200/80 hover:border-amber-400/80 transition-all group"
              >
                {/* Image with Tag & Price */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border backdrop-blur-md shadow-2xs ${item.badge.color}`}>
                      {item.badge.text}
                    </span>
                  </div>
                  
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-slate-200 shadow-xs">
                    <span className="text-xs font-mono font-bold text-slate-900">₹{item.price}</span>
                  </div>

                  {inCartQuantity > 0 && (
                    <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-mono font-bold shadow-sm">
                      {inCartQuantity} in Cart
                    </div>
                  )}
                </div>
                
                {/* Details & Interactive Action */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-serif text-[#2B2421] font-bold mb-1 group-hover:text-amber-800 transition-colors leading-snug">
                    {item.name}
                  </h3>
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-3">
                    {item.origin}
                  </p>
                  
                  {/* Colorful Tasting Notes */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {item.notes.map(note => (
                      <span key={note} className="px-2 py-0.5 bg-amber-50/80 border border-amber-200/70 rounded-md text-[9px] text-amber-900 font-semibold">
                        {note}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-slate-600 text-xs mb-5 flex-grow line-clamp-2 leading-relaxed font-light">
                    {item.description}
                  </p>
                  
                  {/* Tactile Colorful Order Button */}
                  <button 
                    onClick={() => handleAdd(item)}
                    className={`btn-tactile w-full py-2.5 rounded-xl font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-xs flex items-center justify-center gap-2 ${
                      isJustAdded
                        ? 'bg-emerald-600 text-white scale-[1.02]'
                        : inCartQuantity > 0
                        ? 'bg-amber-600 hover:bg-amber-700 text-white'
                        : 'bg-[#1E293B] hover:bg-rose-600 text-white'
                    }`}
                  >
                    {isJustAdded ? (
                      <span>✓ Added to Cart!</span>
                    ) : inCartQuantity > 0 ? (
                      <span>Add Another · ₹{item.price}</span>
                    ) : (
                      <span>Add to Order · ₹{item.price}</span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
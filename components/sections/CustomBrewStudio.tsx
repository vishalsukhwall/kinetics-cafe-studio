"use client";

import React, { useState, useMemo } from 'react';
import { useSceneStore } from '@/store/useSceneStore';

interface Option {
  id: string;
  name: string;
  price: number;
  description: string;
  tag?: string;
}

const BASES: Option[] = [
  { id: 'espresso', name: 'Double Espresso', price: 220, description: 'Dense 9-bar extraction with rich hazelnut crema', tag: 'Intense' },
  { id: 'ristretto', name: 'Single-Origin Ristretto', price: 240, description: 'Short 1:1.5 pull capturing sweet floral aromatics', tag: 'Aromatic' },
  { id: 'v60', name: 'V60 Slow Pour', price: 270, description: 'Hand-brewed single origin with tea-like clarity', tag: 'Clean' },
  { id: 'cold-drip', name: 'Kyoto Cold Drip', price: 290, description: '12-hour ice-melt gravity concentrate', tag: 'Cold Brew' },
];

const MILKS: Option[] = [
  { id: 'none', name: 'Pure Terroir Black', price: 0, description: 'Zero milk, pure unadulterated origin flavors', tag: 'Black' },
  { id: 'oat', name: 'Barista Organic Oat Milk', price: 45, description: 'Creamy, lightly sweet Swedish plant microfoam', tag: 'Plant-Based' },
  { id: 'almond', name: 'Raw Almond Milk', price: 45, description: 'Nutty, silky texture, zero added sugar', tag: 'Keto Friendly' },
  { id: 'whole', name: 'Pasture Farm Milk', price: 0, description: 'Farm-fresh steamed microfoam at 65°C', tag: 'Classic' },
];

const ROASTS: Option[] = [
  { id: 'light', name: 'Nordic Light Flame', price: 0, description: 'Jasmine florals & citrus brightness' },
  { id: 'medium', name: 'Signature Medium Roast', price: 0, description: 'Roasted hazelnut & sweet caramel notes' },
  { id: 'dark', name: 'Dark Full City Roast', price: 0, description: 'Smoky dark cocoa & rich molasses finish' },
];

const SWEETENERS: Option[] = [
  { id: 'unsweetened', name: 'Unsweetened (0%)', price: 0, description: 'Natural terroir profile' },
  { id: 'jaggery', name: 'Organic Palm Jaggery', price: 20, description: 'Warm earthy caramel notes' },
  { id: 'honey', name: 'Wild Forest Honey', price: 25, description: 'Subtle wildflower nectar sweetness' },
];

export default function CustomBrewStudio() {
  const [base, setBase] = useState<Option>(BASES[0]);
  const [milk, setMilk] = useState<Option>(MILKS[1]); // Oat milk
  const [roast, setRoast] = useState<Option>(ROASTS[1]); // Medium
  const [sweetener, setSweetener] = useState<Option>(SWEETENERS[0]);
  const [isIced, setIsIced] = useState(false);
  const [added, setAdded] = useState(false);

  const addOrderItem = useSceneStore((s) => s.addOrderItem);

  const totalPrice = useMemo(() => {
    return base.price + milk.price + roast.price + sweetener.price + (isIced ? 15 : 0);
  }, [base, milk, roast, sweetener, isIced]);

  // Dynamic SVG liquid color morphing
  const liquidColor = useMemo(() => {
    if (milk.id === 'none') {
      return base.id === 'v60' ? '#5c3a21' : '#331c11';
    }
    return milk.id === 'oat' || milk.id === 'almond' ? '#b88965' : '#cba587';
  }, [base, milk]);

  const handleAddToCart = () => {
    const summary = `${base.name}, ${milk.name}, ${roast.name}, ${sweetener.name}, ${isIced ? 'Iced Hand-Cut Sphere' : 'Hot 65°C'}`;
    addOrderItem({
      id: `custom-${Date.now()}`,
      name: `Custom ${base.name}`,
      price: totalPrice,
      customization: summary,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <section
      id="custom-brew"
      className="relative min-h-screen w-full bg-theme-brew text-[#2B2421] py-28 px-6 sm:px-8 lg:px-12 font-sans transition-colors duration-700"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100 border border-indigo-300 text-indigo-800 text-xs font-mono font-bold tracking-widest uppercase mb-3 shadow-2xs">
            <span>🧪</span>
            <span>INTERACTIVE FLAVOR LABORATORY</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight text-[#2B2421]">
            Custom Brew Studio
          </h2>
          <p className="mt-3 text-base text-slate-600 font-light leading-relaxed">
            Engineer your personal extraction method, plant-based milk texture, flame roast profile, and temperature in real time.
          </p>
        </div>

        {/* 2-Column Studio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Live Visualizer & Price Card */}
          <div className="lg:col-span-5 sticky top-28 glass-card p-8 flex flex-col items-center border-indigo-200/80 shadow-md">
            
            {/* Live SVG Visual Cup */}
            <div className="relative w-56 h-56 flex items-center justify-center my-2">
              {!isIced && (
                <div className="absolute -top-4 flex gap-2.5 opacity-70 animate-pulse">
                  <div className="w-1.5 h-6 bg-gradient-to-t from-amber-400 to-transparent rounded-full" />
                  <div className="w-1.5 h-10 bg-gradient-to-t from-rose-400 to-transparent rounded-full delay-100" />
                  <div className="w-1.5 h-7 bg-gradient-to-t from-amber-400 to-transparent rounded-full delay-200" />
                </div>
              )}

              <svg className="w-48 h-48 drop-shadow-[0_15px_25px_rgba(43,36,33,0.1)]" viewBox="0 0 200 200" fill="none">
                <ellipse cx="100" cy="175" rx="75" ry="10" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
                <path d="M48 65 L62 160 C64 166, 136 166, 138 160 L152 65 Z" fill="#FFFFFF" fillOpacity="0.85" stroke="#CBD5E1" strokeWidth="2" />
                <path d="M150 78 C175 78, 175 132, 140 138" stroke="#94A3B8" strokeWidth="5" strokeLinecap="round" fill="none" />
                <path d="M54 80 L62 156 C64 162, 136 162, 138 156 L146 80 Z" fill={liquidColor} className="transition-all duration-500 opacity-95" />
                {milk.id !== 'none' && (
                  <ellipse cx="100" cy="80" rx="45" ry="8" fill="#FFFDF9" fillOpacity="0.95" />
                )}
                {isIced && (
                  <rect x="88" y="72" width="18" height="18" rx="3.5" fill="#FFFFFF" fillOpacity="0.9" stroke="#93C5FD" strokeWidth="1" transform="rotate(15 96 80)" />
                )}
              </svg>
            </div>

            {/* Selected Configuration Summary Pills */}
            <div className="w-full mt-4 space-y-2 text-xs font-mono border-t border-slate-200/80 pt-4">
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-500">Extraction:</span>
                <span className="font-semibold text-slate-800">{base.name}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-500">Milk:</span>
                <span className="font-semibold text-slate-800">{milk.name}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-500">Roast Profile:</span>
                <span className="font-semibold text-slate-800">{roast.name}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500">Temperature:</span>
                <span className="font-semibold text-slate-800">{isIced ? 'Iced Sphere (+₹15)' : 'Steaming Hot (65°C)'}</span>
              </div>
            </div>

            {/* Price & Add to Cart Action */}
            <div className="w-full mt-6 pt-4 border-t border-slate-200/80 flex flex-col gap-3">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-mono uppercase tracking-widest text-slate-500 font-semibold">Total Price</span>
                <span className="text-3xl font-mono font-bold text-amber-700">₹{totalPrice}</span>
              </div>

              <button
                onClick={handleAddToCart}
                className={`btn-tactile w-full py-3.5 rounded-full font-bold uppercase tracking-[0.16em] text-xs transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 ${
                  added 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-gradient-to-r from-amber-600 via-rose-600 to-indigo-700 text-white hover:brightness-105'
                }`}
              >
                {added ? '✓ Added to Order Cart!' : `Add Custom Brew · ₹${totalPrice}`}
              </button>
            </div>

          </div>

          {/* Right Column: Step-by-Step Customizer Options */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Base Extraction */}
            <div className="glass-card p-6 border-sky-200/60">
              <div className="flex items-center justify-between mb-3.5">
                <span className="text-xs font-mono uppercase tracking-widest text-sky-700 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                  STEP 01 &middot; BASE EXTRACTION
                </span>
                <span className="text-[11px] font-mono text-slate-500 font-medium">Single-Origin Arabica</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BASES.map((b) => {
                  const sel = base.id === b.id;
                  return (
                    <button
                      key={b.id}
                      onClick={() => setBase(b)}
                      className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                        sel
                          ? 'border-sky-500 bg-sky-50/80 shadow-xs ring-2 ring-sky-300'
                          : 'border-slate-200/80 bg-white/60 hover:border-sky-300 hover:bg-white'
                      }`}
                    >
                      <div className="flex justify-between items-baseline mb-1">
                        <span className={`font-serif text-sm font-bold ${sel ? 'text-sky-950' : 'text-slate-800'}`}>{b.name}</span>
                        <span className="text-xs font-mono font-bold text-sky-700">₹{b.price}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-light leading-relaxed">{b.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Milk Texture */}
            <div className="glass-card p-6 border-emerald-200/60">
              <div className="flex items-center justify-between mb-3.5">
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  STEP 02 &middot; MILK TEXTURE
                </span>
                <span className="text-[11px] font-mono text-slate-500 font-medium">Micro-Foamed at 65°C</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {MILKS.map((m) => {
                  const sel = milk.id === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setMilk(m)}
                      className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                        sel
                          ? 'border-emerald-500 bg-emerald-50/80 shadow-xs ring-2 ring-emerald-300'
                          : 'border-slate-200/80 bg-white/60 hover:border-emerald-300 hover:bg-white'
                      }`}
                    >
                      <div className="flex justify-between items-baseline mb-1">
                        <span className={`font-serif text-sm font-bold ${sel ? 'text-emerald-950' : 'text-slate-800'}`}>{m.name}</span>
                        <span className={`text-xs font-mono font-bold ${sel ? 'text-emerald-700' : 'text-slate-500'}`}>
                          {m.price > 0 ? `+₹${m.price}` : 'Free'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-light leading-relaxed">{m.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Roast Profile */}
            <div className="glass-card p-6 border-amber-200/60">
              <div className="flex items-center justify-between mb-3.5">
                <span className="text-xs font-mono uppercase tracking-widest text-amber-700 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  STEP 03 &middot; FLAME ROAST PROFILE
                </span>
                <span className="text-[11px] font-mono text-slate-500 font-medium">Cast-Iron Drum</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {ROASTS.map((r) => {
                  const sel = roast.id === r.id;
                  return (
                    <button
                      key={r.id}
                      onClick={() => setRoast(r)}
                      className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                        sel
                          ? 'border-amber-500 bg-amber-50/80 shadow-xs ring-2 ring-amber-300'
                          : 'border-slate-200/80 bg-white/60 hover:border-amber-300 hover:bg-white'
                      }`}
                    >
                      <span className={`font-serif text-xs font-bold block mb-1 ${sel ? 'text-amber-950' : 'text-slate-800'}`}>{r.name}</span>
                      <p className="text-[10px] text-slate-500 font-light leading-snug">{r.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Sweetness & Temperature */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass-card p-5 border-rose-200/60">
                <span className="text-xs font-mono uppercase tracking-widest text-rose-700 font-bold block mb-3 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  SWEETENER
                </span>
                <div className="space-y-2">
                  {SWEETENERS.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSweetener(s)}
                      className={`w-full p-2.5 px-3 rounded-xl text-left border flex justify-between items-center text-xs transition-all cursor-pointer ${
                        sweetener.id === s.id
                          ? 'border-rose-400 bg-rose-50 text-rose-950 font-bold ring-2 ring-rose-200'
                          : 'border-slate-200/80 bg-white/60 text-slate-700 hover:border-rose-300'
                      }`}
                    >
                      <span>{s.name}</span>
                      <span className={`font-mono text-[11px] font-bold ${sweetener.id === s.id ? 'text-rose-700' : 'text-slate-500'}`}>
                        {s.price > 0 ? `+₹${s.price}` : 'Free'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="glass-card p-5 border-indigo-200/60">
                <span className="text-xs font-mono uppercase tracking-widest text-indigo-700 font-bold block mb-3 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                  TEMPERATURE
                </span>
                <div className="space-y-2">
                  <button
                    onClick={() => setIsIced(false)}
                    className={`w-full p-2.5 px-3 rounded-xl text-left border flex justify-between items-center text-xs transition-all cursor-pointer ${
                      !isIced
                        ? 'border-amber-400 bg-amber-50 text-amber-950 font-bold ring-2 ring-amber-200'
                        : 'border-slate-200/80 bg-white/60 text-slate-700 hover:border-amber-300'
                    }`}
                  >
                    <span>♨ Steaming Hot (65°C)</span>
                    <span className={`font-mono text-[11px] font-bold ${!isIced ? 'text-amber-700' : 'text-slate-500'}`}>Free</span>
                  </button>
                  <button
                    onClick={() => setIsIced(true)}
                    className={`w-full p-2.5 px-3 rounded-xl text-left border flex justify-between items-center text-xs transition-all cursor-pointer ${
                      isIced
                        ? 'border-sky-400 bg-sky-50 text-sky-950 font-bold ring-2 ring-sky-200'
                        : 'border-slate-200/80 bg-white/60 text-slate-700 hover:border-sky-300'
                    }`}
                  >
                    <span>❄ Iced Hand-Cut Sphere</span>
                    <span className={`font-mono text-[11px] font-bold ${isIced ? 'text-sky-700' : 'text-slate-500'}`}>+₹15</span>
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
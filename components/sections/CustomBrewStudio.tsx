"use client";

import React, { useState, useMemo } from 'react';
import { useSceneStore } from '@/store/useSceneStore';

interface Option {
  id: string;
  name: string;
  price: number;
  description: string;
}

const BASES: Option[] = [
  { id: 'espresso', name: 'Double Espresso', price: 220, description: 'Dense 9-bar extraction with rich crema' },
  { id: 'ristretto', name: 'Single-Origin Ristretto', price: 240, description: 'Short 1:1.5 pull capturing sweet aromatics' },
  { id: 'v60', name: 'V60 Slow Pour', price: 270, description: 'Hand-brewed single origin with tea-like clarity' },
  { id: 'cold-drip', name: 'Kyoto Cold Drip', price: 290, description: '12-hour ice-melt gravity concentrate' },
];

const MILKS: Option[] = [
  { id: 'none', name: 'Pure Black', price: 0, description: 'No milk, pure terroir' },
  { id: 'oat', name: 'Organic Oat Milk', price: 45, description: 'Creamy, lightly sweet plant microfoam' },
  { id: 'almond', name: 'Raw Almond Milk', price: 45, description: 'Nutty, silky texture, sugar-free' },
  { id: 'whole', name: 'Pasture Cow Milk', price: 0, description: 'Farm-fresh steamed microfoam' },
];

const ROASTS: Option[] = [
  { id: 'light', name: 'Nordic Light', price: 0, description: 'Jasmine florals & citrus brightness' },
  { id: 'medium', name: 'Medium Flame', price: 0, description: 'Roasted hazelnut & sweet caramel' },
  { id: 'dark', name: 'Dark Full City', price: 0, description: 'Smoky dark cocoa & rich molasses' },
];

const SWEETENERS: Option[] = [
  { id: 'unsweetened', name: 'Unsweetened (0%)', price: 0, description: 'Standard' },
  { id: 'jaggery', name: 'Palm Jaggery', price: 20, description: 'Natural caramel notes' },
  { id: 'honey', name: 'Wild Forest Honey', price: 25, description: 'Subtle wildflower nectar' },
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

  const liquidColor = useMemo(() => {
    if (milk.id === 'none') {
      return base.id === 'v60' ? '#4A2814' : '#1A0B05';
    }
    return milk.id === 'oat' || milk.id === 'almond' ? '#A67C52' : '#8C5832';
  }, [base, milk]);

  const handleAddToCart = () => {
    const summary = `${base.name}, ${milk.name}, ${roast.name}, ${sweetener.name}, ${isIced ? 'Iced Sphere' : 'Hot 65°C'}`;
    addOrderItem({
      id: `custom-${Date.now()}`,
      name: `Custom ${base.name}`,
      price: totalPrice,
      customization: summary,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <section
      id="custom-brew"
      className="relative min-h-screen w-full bg-[#0A0503] py-32 px-6 sm:px-8 lg:px-12 text-[#F5E6D0]"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-[11px] font-mono uppercase tracking-[0.35em] text-[#D89B5A] block mb-3">
            02 · Custom Brew Studio
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-[0.16em] uppercase text-[#F5E6D0]">
            Craft Your Cup
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-[#C9A86C]/70 font-light leading-relaxed">
            Personalize your extraction method, plant-based milk, roast profile, and temperature in real time.
          </p>
        </div>

        {/* Clean 2-Column Studio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Live Visualizer & Price Card */}
          <div className="lg:col-span-5 sticky top-28 bg-[#140C07]/80 border border-[#C9A86C]/25 rounded-3xl p-8 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex flex-col items-center">
            
            {/* Minimalist Visual SVG Cup */}
            <div className="relative w-56 h-56 flex items-center justify-center my-2">
              {!isIced && (
                <div className="absolute -top-4 flex gap-2.5 opacity-60 animate-pulse">
                  <div className="w-1 h-6 bg-gradient-to-t from-[#D89B5A]/40 to-transparent rounded-full" />
                  <div className="w-1 h-10 bg-gradient-to-t from-[#D89B5A]/60 to-transparent rounded-full delay-100" />
                  <div className="w-1 h-7 bg-gradient-to-t from-[#D89B5A]/40 to-transparent rounded-full delay-200" />
                </div>
              )}

              <svg className="w-48 h-48 drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]" viewBox="0 0 200 200" fill="none">
                <ellipse cx="100" cy="175" rx="75" ry="10" fill="#20120B" stroke="#C9A86C" strokeWidth="1.5" strokeOpacity="0.3" />
                <path d="M48 65 L62 160 C64 166, 136 166, 138 160 L152 65 Z" fill="#180E09" stroke="#C9A86C" strokeWidth="2" strokeOpacity="0.5" />
                <path d="M150 78 C175 78, 175 132, 140 138" stroke="#C9A86C" strokeWidth="5" strokeLinecap="round" fill="none" strokeOpacity="0.6" />
                <path d="M54 80 L62 156 C64 162, 136 162, 138 156 L146 80 Z" fill={liquidColor} className="transition-all duration-500" />
                {milk.id !== 'none' && (
                  <ellipse cx="100" cy="80" rx="45" ry="8" fill="#E8D5C0" fillOpacity="0.85" />
                )}
                {isIced && (
                  <rect x="88" y="72" width="16" height="16" rx="3" fill="#FFFFFF" fillOpacity="0.3" transform="rotate(15 96 80)" />
                )}
              </svg>
            </div>

            {/* Selected Configuration Summary */}
            <div className="w-full mt-4 space-y-2 text-xs font-mono border-t border-[#2A180E] pt-4">
              <div className="flex justify-between text-[#F5E6D0]/80">
                <span className="text-[#C9A86C]/70">Base:</span>
                <span>{base.name}</span>
              </div>
              <div className="flex justify-between text-[#F5E6D0]/80">
                <span className="text-[#C9A86C]/70">Milk:</span>
                <span>{milk.name}</span>
              </div>
              <div className="flex justify-between text-[#F5E6D0]/80">
                <span className="text-[#C9A86C]/70">Roast:</span>
                <span>{roast.name}</span>
              </div>
              <div className="flex justify-between text-[#F5E6D0]/80">
                <span className="text-[#C9A86C]/70">Style:</span>
                <span>{isIced ? 'Iced (+₹15)' : 'Hot 65°C'}</span>
              </div>
            </div>

            {/* Price & Add to Cart */}
            <div className="w-full mt-6 pt-4 border-t border-[#C9A86C]/25 flex flex-col gap-3">
              <div className="flex justify-between items-baseline">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#C9A86C]/70">Price in INR</span>
                <span className="text-3xl font-mono font-bold text-[#D89B5A]">₹{totalPrice}</span>
              </div>

              <button
                onClick={handleAddToCart}
                className="btn-tactile w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#D89B5A] to-[#B8722E] text-[#0B0705] font-semibold uppercase tracking-[0.16em] text-xs shadow-lg hover:brightness-110 active:scale-[0.98] transition-all"
              >
                {added ? '✓ Added to Order' : `Add Custom Brew · ₹${totalPrice}`}
              </button>
            </div>

          </div>

          {/* Right Column: Step-by-Step Options */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Base */}
            <div className="bg-[#140C07]/60 border border-[#C9A86C]/15 rounded-3xl p-6 backdrop-blur-md">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#D89B5A] block mb-3">
                Step 01 · Base Extraction
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BASES.map((b) => {
                  const sel = base.id === b.id;
                  return (
                    <button
                      key={b.id}
                      onClick={() => setBase(b)}
                      className={`p-3.5 rounded-2xl text-left border transition-all ${
                        sel
                          ? 'border-[#D89B5A] bg-[#24150D]'
                          : 'border-[#2A180E] bg-[#0B0604]/40 hover:border-[#C9A86C]/30'
                      }`}
                    >
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="font-serif text-sm text-[#F5E6D0]">{b.name}</span>
                        <span className="text-xs font-mono text-[#D89B5A]">₹{b.price}</span>
                      </div>
                      <p className="text-[10px] text-[#C9A86C]/70 font-light">{b.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Milk */}
            <div className="bg-[#140C07]/60 border border-[#C9A86C]/15 rounded-3xl p-6 backdrop-blur-md">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#D89B5A] block mb-3">
                Step 02 · Milk Texture
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {MILKS.map((m) => {
                  const sel = milk.id === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setMilk(m)}
                      className={`p-3.5 rounded-2xl text-left border transition-all ${
                        sel
                          ? 'border-[#D89B5A] bg-[#24150D]'
                          : 'border-[#2A180E] bg-[#0B0604]/40 hover:border-[#C9A86C]/30'
                      }`}
                    >
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="font-serif text-sm text-[#F5E6D0]">{m.name}</span>
                        <span className="text-xs font-mono text-[#D89B5A]">{m.price > 0 ? `+₹${m.price}` : 'Free'}</span>
                      </div>
                      <p className="text-[10px] text-[#C9A86C]/70 font-light">{m.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Roast */}
            <div className="bg-[#140C07]/60 border border-[#C9A86C]/15 rounded-3xl p-6 backdrop-blur-md">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#D89B5A] block mb-3">
                Step 03 · Roast Profile
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {ROASTS.map((r) => {
                  const sel = roast.id === r.id;
                  return (
                    <button
                      key={r.id}
                      onClick={() => setRoast(r)}
                      className={`p-3 rounded-2xl text-left border transition-all ${
                        sel
                          ? 'border-[#D89B5A] bg-[#24150D]'
                          : 'border-[#2A180E] bg-[#0B0604]/40 hover:border-[#C9A86C]/30'
                      }`}
                    >
                      <span className="font-serif text-xs text-[#F5E6D0] block mb-1">{r.name}</span>
                      <p className="text-[10px] text-[#C9A86C]/70 font-light">{r.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Sweetness & Temperature */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#140C07]/60 border border-[#C9A86C]/15 rounded-3xl p-5 backdrop-blur-md">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#D89B5A] block mb-3">
                  Sweetener
                </span>
                <div className="space-y-2">
                  {SWEETENERS.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSweetener(s)}
                      className={`w-full p-2.5 px-3 rounded-xl text-left border flex justify-between items-center text-xs transition-all ${
                        sweetener.id === s.id
                          ? 'border-[#D89B5A] bg-[#24150D] text-[#F5E6D0]'
                          : 'border-[#2A180E] text-[#F5E6D0]/60 hover:border-[#C9A86C]/30'
                      }`}
                    >
                      <span>{s.name}</span>
                      <span className="font-mono text-[11px] text-[#D89B5A]">{s.price > 0 ? `+₹${s.price}` : 'Free'}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-[#140C07]/60 border border-[#C9A86C]/15 rounded-3xl p-5 backdrop-blur-md">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#D89B5A] block mb-3">
                  Temperature
                </span>
                <div className="space-y-2">
                  <button
                    onClick={() => setIsIced(false)}
                    className={`w-full p-2.5 px-3 rounded-xl text-left border flex justify-between items-center text-xs transition-all ${
                      !isIced
                        ? 'border-[#D89B5A] bg-[#24150D] text-[#F5E6D0]'
                        : 'border-[#2A180E] text-[#F5E6D0]/60 hover:border-[#C9A86C]/30'
                    }`}
                  >
                    <span>Steaming Hot (65°C)</span>
                    <span className="font-mono text-[11px] text-[#D89B5A]">Free</span>
                  </button>
                  <button
                    onClick={() => setIsIced(true)}
                    className={`w-full p-2.5 px-3 rounded-xl text-left border flex justify-between items-center text-xs transition-all ${
                      isIced
                        ? 'border-[#D89B5A] bg-[#24150D] text-[#F5E6D0]'
                        : 'border-[#2A180E] text-[#F5E6D0]/60 hover:border-[#C9A86C]/30'
                    }`}
                  >
                    <span>Iced Over Hand-Cut Sphere</span>
                    <span className="font-mono text-[11px] text-[#D89B5A]">+₹15</span>
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

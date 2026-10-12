"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useSceneStore } from '@/store/useSceneStore';

interface Message {
  id: string;
  sender: 'user' | 'barista';
  text: string;
  recommendation?: {
    id: string;
    name: string;
    price: number;
    notes: string;
    origin: string;
    imageUrl: string;
    reason: string;
  };
}

const KNOWLEDGE_BASE = [
  {
    keywords: ['cold', 'strong', 'nitro', 'cascara', 'ice', 'iced', 'bold', 'chill'],
    item: {
      id: 'cascara-nitro-cold-brew',
      name: 'Cascara Nitro Cold Brew',
      price: 350,
      notes: 'Cascading Velvet · Cherry Husk · Dark Molasses',
      origin: 'Highland Washed Arabica · 24h Steep',
      imageUrl: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80',
      reason: 'Since you are seeking a bold, cold, and refreshing kick, our Nitro Cold Brew is steeped for 24 hours and charged with food-grade nitrogen for a dense velvety head with zero bitterness.',
    },
  },
  {
    keywords: ['sweet', 'dessert', 'affogato', 'vanilla', 'gelato', 'indulgent', 'treat', 'sugar'],
    item: {
      id: 'artisanal-affogato',
      name: 'Artisanal Affogato al Caffè',
      price: 380,
      notes: 'Tahitian Vanilla Bean · Hot Ristretto · Salted Toffee',
      origin: 'Estate Special Espresso & House Gelato',
      imageUrl: 'https://images.unsplash.com/photo-1594261956806-3ad03785c9b4?auto=format&fit=crop&w=800&q=80',
      reason: 'For an indulgent dessert profile, nothing surpasses our Affogato al Caffè—scorching single-origin ristretto poured over slow-churned Madagascar vanilla gelato.',
    },
  },
  {
    keywords: ['milk', 'flat white', 'latte', 'smooth', 'velvet', 'creamy', 'hazelnut', 'honey', 'warm'],
    item: {
      id: 'velvet-flat-white',
      name: 'Velvet Flat White',
      price: 260,
      notes: 'Silky Microfoam · Roasted Hazelnut · Wild Honey',
      origin: 'Wayanad, Kerala · 1,300m',
      imageUrl: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=800&q=80',
      reason: 'You will fall in love with our Velvet Flat White. We pull a tight double ristretto from Wayanad and fold it into micro-textured steamed milk with natural toffee sweetness.',
    },
  },
  {
    keywords: ['clean', 'black', 'pour over', 'v60', 'fruity', 'floral', 'tea', 'jasmine', 'citrus'],
    item: {
      id: 'chikmagalur-pour-over',
      name: 'Estate V60 Pour Over',
      price: 320,
      notes: 'Jasmine Floral · Sweet Bergamot · Cane Sugar',
      origin: 'Baba Budangiri, Chikmagalur · 1,550m',
      imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
      reason: 'Our Baba Budangiri single-origin V60 hand pour offers tea-like transparency, delicate jasmine aromatics, and bright bergamot notes that shine without milk.',
    },
  },
  {
    keywords: ['espresso', 'intense', 'short', 'pure', 'quick', 'dark', 'classic', 'crema'],
    item: {
      id: 'single-origin-espresso',
      name: 'Single Origin Espresso',
      price: 220,
      notes: 'Dark Cocoa · Dried Black Fig · Smoky Cedar',
      origin: 'Chikmagalur, Karnataka · 1,450m',
      imageUrl: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80',
      reason: 'Our benchmark: a dense 9-bar extraction of shade-grown Chikmagalur beans with a syrupy mouthfeel and persistent hazelnut crema.',
    },
  },
];

const SUGGESTION_CHIPS = [
  { text: '🧊 Strong & cold nitro brew', query: 'cold strong nitro' },
  { text: '🍨 Velvety affogato dessert', query: 'sweet dessert affogato' },
  { text: '🌸 Floral black pour-over', query: 'fruity floral pour over' },
  { text: '☕ Classic 9-bar espresso', query: 'intense short espresso' },
];

export default function AIBaristaModal() {
  const isAIBaristaOpen = useSceneStore((s) => s.isAIBaristaOpen);
  const toggleAIBarista = useSceneStore((s) => s.toggleAIBarista);
  const addOrderItem = useSceneStore((s) => s.addOrderItem);

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'barista',
      text: "Namaste! I'm your Kinetics Caffe AI Sommelier. Tell me your mood, favorite flavors, or cravings, and I'll match you with the perfect roast from our Western Ghats harvests.",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [addedItem, setAddedItem] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const lower = query.toLowerCase();
      let bestMatch = KNOWLEDGE_BASE[0];
      let maxScore = -1;

      for (const entry of KNOWLEDGE_BASE) {
        let score = 0;
        for (const kw of entry.keywords) {
          if (lower.includes(kw)) score += 1;
        }
        if (score > maxScore) {
          maxScore = score;
          bestMatch = entry;
        }
      }

      if (maxScore <= 0) {
        bestMatch = KNOWLEDGE_BASE[2]; // Velvet Flat white
      }

      const baristaReply: Message = {
        id: `barista-${Date.now()}`,
        sender: 'barista',
        text: `Here is our chef recommendation for you:`,
        recommendation: bestMatch.item,
      };

      setMessages((prev) => [...prev, baristaReply]);
      setIsTyping(false);
    }, 550);
  };

  const handleAddRecommend = (rec: NonNullable<Message['recommendation']>) => {
    addOrderItem({
      id: rec.id,
      name: rec.name,
      price: rec.price,
    });
    setAddedItem(rec.id);
    setTimeout(() => setAddedItem(null), 1400);
  };

  return (
    <>
      {/* Floating AI Barista Trigger Pill (Bottom Left) with Colorful Glow */}
      <div className="fixed bottom-8 left-8 z-40">
        <button
          onClick={toggleAIBarista}
          className="btn-tactile flex items-center gap-2.5 px-4 sm:px-5 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-amber-600 to-rose-600 text-white shadow-[0_8px_25px_rgba(217,119,6,0.35)] hover:shadow-[0_12px_35px_rgba(225,29,72,0.45)] hover:scale-105 transition-all cursor-pointer group"
          aria-label="Open AI Barista Sommelier"
        >
          <div className="w-6 h-6 rounded-full bg-white/25 flex items-center justify-center font-bold text-xs shadow-inner">
            ✦
          </div>
          <span className="text-xs uppercase tracking-wider font-bold">
            AI Taste-Match
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white text-rose-700 shadow-2xs">
            Barista
          </span>
        </button>
      </div>

      {/* AI Barista Slide-Out Glassmorphic Modal */}
      {isAIBaristaOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-end bg-slate-900/60 backdrop-blur-sm"
          onClick={toggleAIBarista}
        >
          <div
            className="w-full max-w-lg h-full bg-[#FDFBF7] border-l border-slate-200/90 shadow-2xl flex flex-col justify-between overflow-hidden animate-fade-in-up font-sans"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-amber-50 to-rose-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 to-rose-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                  ✦
                </div>
                <div>
                  <h3 className="font-serif text-lg text-slate-900 font-bold">AI Barista Sommelier</h3>
                  <p className="text-[10px] font-mono text-rose-700 uppercase tracking-widest font-bold">
                    Flavor Parser &middot; Western Ghats
                  </p>
                </div>
              </div>
              <button
                onClick={toggleAIBarista}
                className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                aria-label="Close Assistant"
              >
                ✕
              </button>
            </div>

            {/* Chat Conversation Stream */}
            <div className="p-6 flex-1 overflow-y-auto space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-amber-600 to-rose-600 text-white font-medium rounded-br-none shadow-sm'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-xs'
                    }`}
                  >
                    <p>{msg.text}</p>
                  </div>

                  {/* Rendered Recommendation Card with 1-Click Order */}
                  {msg.recommendation && (
                    <div className="mt-3 w-full max-w-[95%] bg-white border border-amber-300 rounded-2xl overflow-hidden shadow-sm">
                      <div className="relative h-36 w-full overflow-hidden">
                        <img
                          src={msg.recommendation.imageUrl}
                          alt={msg.recommendation.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                        <div className="absolute bottom-2 left-3 right-3 flex justify-between items-baseline text-white">
                          <span className="text-sm font-serif font-bold">
                            {msg.recommendation.name}
                          </span>
                          <span className="text-sm font-mono font-bold text-amber-300">
                            ₹{msg.recommendation.price}
                          </span>
                        </div>
                      </div>

                      <div className="p-4 space-y-2">
                        <p className="text-xs text-slate-700 font-light leading-relaxed">
                          {msg.recommendation.reason}
                        </p>
                        <div className="text-[10px] font-mono text-amber-800 font-semibold pt-1">
                          Flavor Profile: {msg.recommendation.notes}
                        </div>

                        <button
                          onClick={() => handleAddRecommend(msg.recommendation!)}
                          className="btn-tactile w-full mt-2 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs cursor-pointer hover:brightness-105"
                        >
                          {addedItem === msg.recommendation.id ? (
                            <span>✓ Added to Cart!</span>
                          ) : (
                            <span>Add to Order &middot; ₹{msg.recommendation.price}</span>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-1.5 p-3 rounded-xl bg-white w-20 shadow-xs border border-slate-200">
                  <div className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-rose-500 animate-bounce delay-150" />
                  <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce delay-300" />
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Colorful Suggestion Prompts */}
            <div className="px-5 py-3 border-t border-slate-200 bg-slate-50/70">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block mb-2 font-bold">
                💡 Popular Flavor Queries:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTION_CHIPS.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(chip.query)}
                    className="text-xs px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-amber-400 hover:text-amber-800 transition-colors font-medium cursor-pointer shadow-2xs"
                  >
                    {chip.text}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Bar */}
            <div className="p-4 border-t border-slate-200 bg-white flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="E.g., I want something cold, nutty, and sweet..."
                className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-600 shadow-inner"
              />
              <button
                onClick={() => handleSend()}
                className="btn-tactile px-5 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 text-white font-bold text-xs uppercase tracking-wider hover:brightness-105 transition-all flex items-center justify-center cursor-pointer shadow-xs"
              >
                Send
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

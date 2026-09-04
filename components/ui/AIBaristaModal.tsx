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
      price: 420,
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
    keywords: ['tonic', 'fizzy', 'sparkling', 'rosemary', 'summer', 'citrus', 'refreshing'],
    item: {
      id: 'smoked-vanilla-espresso-tonic',
      name: 'Smoked Vanilla Espresso Tonic',
      price: 380,
      notes: 'Madagascar Vanilla · Quinine Tonic · Charred Citrus',
      origin: 'Chikmagalur Red Honey · 1,450m',
      imageUrl: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80',
      reason: 'Looking for effervescence and craft botanicals? Our Smoked Vanilla Espresso Tonic layers crisp tonic water under a floating double shot with charred rosemary smoke.',
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
  'Something strong, nutty, and cold',
  'Sweet & velvety dessert coffee',
  'Fruity & floral black pour-over',
  'Sparkling iced espresso tonic',
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
      text: "Namaste! I'm your Ember & Oak AI Sommelier. Tell me your mood, favorite flavors, or dietary cravings, and I'll match you with the perfect roast from our Western Ghats harvests.",
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

    // Taste-matching algorithm
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

      // Default to Flat White if general inquiry
      if (maxScore <= 0) {
        bestMatch = KNOWLEDGE_BASE[2]; // Velvet Flat white
      }

      const baristaReply: Message = {
        id: `barista-${Date.now()}`,
        sender: 'barista',
        text: `Here is what I've handpicked for you based on "${query}":`,
        recommendation: bestMatch.item,
      };

      setMessages((prev) => [...prev, baristaReply]);
      setIsTyping(false);
    }, 600);
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
      {/* Floating AI Barista Trigger Pill (Bottom Left) */}
      <div className="fixed bottom-8 left-8 z-40">
        <button
          onClick={toggleAIBarista}
          className="btn-tactile flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-[#180E09]/95 border border-[#C9A86C]/40 text-[#F5E6D0] hover:border-[#D89B5A] hover:shadow-[0_0_30px_rgba(216,155,90,0.4)] backdrop-blur-xl shadow-2xl transition-all group"
          aria-label="Open AI Barista Sommelier"
        >
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#D89B5A] to-[#C9A86C] flex items-center justify-center text-[#0B0705] font-bold text-xs shadow-md">
            ✦
          </div>
          <span className="text-xs uppercase tracking-widest font-medium text-[#F5E6D0]">
            AI Taste-Match
          </span>
          <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[9px] font-mono bg-[#D89B5A]/20 text-[#D89B5A]">
            Barista
          </span>
        </button>
      </div>

      {/* AI Barista Slide-Out Glassmorphic Modal */}
      {isAIBaristaOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-[#0B0705]/80 backdrop-blur-md">
          <div
            className="w-full max-w-lg h-full bg-[#140C07]/95 border-l border-[#C9A86C]/30 shadow-2xl flex flex-col justify-between overflow-hidden animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-[#2A1F1A] flex items-center justify-between bg-[#0B0705]/60 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#D89B5A] to-[#B8722E] flex items-center justify-center text-[#0B0705] font-bold shadow-lg">
                  ✦
                </div>
                <div>
                  <h3 className="font-serif text-lg text-[#F5E6D0]">AI Barista Sommelier</h3>
                  <p className="text-[10px] font-mono text-[#C9A86C]/80 uppercase tracking-widest">
                    Western Ghats Flavor Parser
                  </p>
                </div>
              </div>
              <button
                onClick={toggleAIBarista}
                className="w-8 h-8 rounded-full bg-[#1A0F0A] border border-[#C9A86C]/30 text-[#C9A86C] hover:text-[#F5E6D0] flex items-center justify-center transition-colors"
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
                        ? 'bg-[#D89B5A] text-[#0B0705] font-medium rounded-br-none shadow-md'
                        : 'bg-[#1D110A] text-[#F5E6D0] border border-[#C9A86C]/20 rounded-bl-none shadow-lg'
                    }`}
                  >
                    <p>{msg.text}</p>
                  </div>

                  {/* Rendered Matched Recommendation Card */}
                  {msg.recommendation && (
                    <div className="mt-3 w-full max-w-[95%] bg-[#0B0705]/80 border border-[#D89B5A]/50 rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(216,155,90,0.2)]">
                      <div className="relative h-36 w-full overflow-hidden">
                        <img
                          src={msg.recommendation.imageUrl}
                          alt={msg.recommendation.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0705] via-transparent to-transparent" />
                        <div className="absolute bottom-2 left-3 right-3 flex justify-between items-baseline">
                          <span className="text-sm font-serif text-[#F5E6D0] font-bold">
                            {msg.recommendation.name}
                          </span>
                          <span className="text-sm font-mono font-bold text-[#D89B5A]">
                            ₹{msg.recommendation.price}
                          </span>
                        </div>
                      </div>

                      <div className="p-4 space-y-2">
                        <p className="text-[11px] text-[#C9A86C] font-light leading-relaxed">
                          {msg.recommendation.reason}
                        </p>
                        <div className="text-[10px] font-mono text-[#F5E6D0]/60 pt-1">
                          Notes: {msg.recommendation.notes}
                        </div>

                        <button
                          onClick={() => handleAddRecommend(msg.recommendation!)}
                          className="btn-tactile w-full mt-3 py-2.5 rounded-xl bg-gradient-to-r from-[#D89B5A] to-[#B8722E] text-[#0B0705] font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:brightness-110"
                        >
                          {addedItem === msg.recommendation.id ? (
                            <span>✓ Added to Order</span>
                          ) : (
                            <span>Add to Order · ₹{msg.recommendation.price}</span>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-1.5 p-3 rounded-xl bg-[#1D110A] w-20">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D89B5A] animate-bounce" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D89B5A] animate-bounce delay-150" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D89B5A] animate-bounce delay-300" />
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Quick-Prompt Suggestion Chips */}
            <div className="px-6 py-2 border-t border-[#2A1F1A] bg-[#0B0705]/40">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C9A86C]/70 block mb-2">
                Quick Prompts:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTION_CHIPS.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(chip)}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-[#1D110A] border border-[#C9A86C]/20 text-[#F5E6D0]/80 hover:border-[#D89B5A] hover:text-[#D89B5A] transition-colors font-light"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            {/* Input & Send Bar */}
            <div className="p-4 border-t border-[#2A1F1A] bg-[#0B0705]/80 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="E.g., I want something strong, nutty, and cold..."
                className="flex-1 bg-[#1A0F0A] border border-[#C9A86C]/30 rounded-xl px-4 py-3 text-xs sm:text-sm text-[#F5E6D0] placeholder-[#F5E6D0]/30 focus:outline-none focus:border-[#D89B5A]"
              />
              <button
                onClick={() => handleSend()}
                className="px-5 py-3 rounded-xl bg-[#D89B5A] text-[#0B0705] font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all flex items-center justify-center"
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

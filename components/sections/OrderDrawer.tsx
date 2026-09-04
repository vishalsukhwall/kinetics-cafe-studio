"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useSceneStore } from '@/store/useSceneStore';

export default function OrderDrawer() {
  const isOrderDrawerOpen = useSceneStore((s) => s.isOrderDrawerOpen);
  const orderItems = useSceneStore((s) => s.orderItems);
  const toggleOrderDrawer = useSceneStore((s) => s.toggleOrderDrawer);
  const removeOrderItem = useSceneStore((s) => s.removeOrderItem);
  const updateItemQuantity = useSceneStore((s) => s.updateItemQuantity);
  const clearOrder = useSceneStore((s) => s.clearOrder);

  const [orderPlaced, setOrderPlaced] = useState(false);

  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOrderDrawerOpen) {
        toggleOrderDrawer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOrderDrawerOpen, toggleOrderDrawer]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isOrderDrawerOpen) {
        gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, display: 'block', ease: 'power2.out' });
        gsap.to(drawerRef.current, { y: 0, duration: 0.5, ease: 'power3.out' });
      } else {
        gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, display: 'none', ease: 'power2.in' });
        gsap.to(drawerRef.current, { y: '100%', duration: 0.4, ease: 'power3.in' });
        setOrderPlaced(false);
      }
    });

    return () => ctx.revert();
  }, [isOrderDrawerOpen]);

  const subtotal = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const gst = Math.round(subtotal * 0.05); // 5% GST on Restaurant / Cafe F&B
  const total = subtotal + gst;

  const handleCheckout = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      clearOrder();
      setTimeout(() => {
        toggleOrderDrawer();
      }, 1500);
    }, 2000);
  };

  return (
    <div className="relative z-50">
      {/* Backdrop */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-[#0B0705]/80 backdrop-blur-md hidden opacity-0"
        onClick={toggleOrderDrawer}
        aria-hidden="true"
      />

      {/* Slide-Up Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-label="Your Order"
        aria-modal="true"
        className="fixed bottom-0 left-0 right-0 w-full md:max-w-md md:right-4 md:left-auto translate-y-full bg-[#1A0F0A]/95 backdrop-blur-2xl border-t border-l border-r border-[#C9A86C]/30 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[88vh]"
      >
        <div className="p-6 flex-1 overflow-y-auto">
          {/* Drawer Header */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#2A1F1A]">
            <div>
              <h2 className="text-[#F5E6D0] font-serif text-2xl">Your Order</h2>
              <span className="text-[11px] font-mono text-[#C9A86C]/80 uppercase tracking-widest">
                Ember & Oak · Espresso Bar
              </span>
            </div>
            <button
              onClick={toggleOrderDrawer}
              className="text-[#C9A86C] hover:text-[#F5E6D0] transition-colors p-2 rounded-full hover:bg-[#2A1F1A]"
              aria-label="Close order drawer"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {orderPlaced ? (
            <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in-up">
              <div className="w-16 h-16 rounded-full bg-[#D89B5A]/20 border border-[#D89B5A] flex items-center justify-center text-[#D89B5A] mb-4 shadow-[0_0_30px_rgba(216,155,90,0.4)]">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif text-[#F5E6D0] mb-2">Order Confirmed!</h3>
              <p className="text-sm text-[#C9A86C] font-light max-w-xs leading-relaxed">
                Our head barista is now grinding fresh beans. Ready for pickup in 12–15 minutes.
              </p>
              <span className="mt-4 text-xs font-mono text-[#F5E6D0]/50 tracking-wider">
                Token #EO-{Math.floor(100 + Math.random() * 900)}
              </span>
            </div>
          ) : orderItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-[#2A1F1A]/50 flex items-center justify-center mb-4 text-[#C9A86C]/40">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <p className="text-[#F5E6D0]/70 text-sm font-light">Your order is currently empty</p>
              <p className="text-[#C9A86C]/50 text-xs mt-1">Browse our Craft Menu to select your drink</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {orderItems.map((item) => (
                <li key={item.id} className="flex justify-between items-center p-3 rounded-2xl bg-[#0B0705]/50 border border-[#2A1F1A]">
                  <div className="flex-1 pr-3">
                    <h3 className="text-[#F5E6D0] text-sm font-medium">{item.name}</h3>
                    <p className="text-[#D89B5A] text-sm font-mono mt-0.5">
                      ₹{item.price} each
                    </p>
                  </div>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-[#1A0F0A] rounded-full px-2 py-1 border border-[#C9A86C]/30">
                      <button
                        onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="w-6 h-6 rounded-full flex items-center justify-center text-[#F5E6D0] hover:bg-[#2A1F1A] transition-colors disabled:opacity-30 text-sm"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="text-[#F5E6D0] text-xs font-mono w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-full flex items-center justify-center text-[#F5E6D0] hover:bg-[#2A1F1A] transition-colors text-sm"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeOrderItem(item.id)}
                      className="p-1.5 text-[#F5E6D0]/40 hover:text-red-400 transition-colors"
                      aria-label="Remove item"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Total & Checkout Section */}
        {orderItems.length > 0 && !orderPlaced && (
          <div className="p-6 bg-[#0B0705]/80 border-t border-[#2A1F1A] backdrop-blur-xl">
            <div className="space-y-2 mb-6 text-xs font-mono">
              <div className="flex justify-between text-[#F5E6D0]/70">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-[#F5E6D0]/70">
                <span>Cafe GST (5%)</span>
                <span>₹{gst.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-base text-[#D89B5A] font-serif pt-2 border-t border-[#2A1F1A]/60">
                <span>Grand Total</span>
                <span className="font-mono font-bold">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="btn-tactile w-full py-4 rounded-xl bg-gradient-to-r from-[#D89B5A] via-[#C9A86C] to-[#B8722E] text-[#0B0705] font-semibold tracking-[0.18em] uppercase text-xs shadow-[0_0_25px_rgba(216,155,90,0.4)] hover:shadow-[0_0_35px_rgba(216,155,90,0.6)] flex items-center justify-center gap-2 transition-all"
            >
              <span>Pay via UPI / Card · ₹{total.toLocaleString('en-IN')}</span>
            </button>

            <p className="text-center text-[10px] text-[#C9A86C]/60 mt-3 font-mono">
              Pickup at Espresso Bar · 15–20 minutes
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

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
  const [orderToken, setOrderToken] = useState<string>('');

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
        gsap.to(drawerRef.current, { y: 0, duration: 0.45, ease: 'power3.out' });
      } else {
        gsap.to(overlayRef.current, { opacity: 0, duration: 0.25, display: 'none', ease: 'power2.in' });
        gsap.to(drawerRef.current, { y: '100%', duration: 0.35, ease: 'power3.in' });
        setOrderPlaced(false);
      }
    });

    return () => ctx.revert();
  }, [isOrderDrawerOpen]);

  const subtotal = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const gst = Math.round(subtotal * 0.05); // 5% GST
  const total = subtotal + gst;

  const handleCheckout = () => {
    const token = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderToken(token);
    setOrderPlaced(true);
    setTimeout(() => {
      clearOrder();
    }, 4000);
  };

  const handleScrollToMenu = () => {
    toggleOrderDrawer();
    const el = document.getElementById('menu');
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 85;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative z-50 font-sans">
      {/* Backdrop */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm hidden opacity-0"
        onClick={toggleOrderDrawer}
        aria-hidden="true"
      />

      {/* Slide-Up Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-label="Your Order Cart"
        aria-modal="true"
        className="fixed bottom-0 left-0 right-0 w-full md:max-w-md md:right-6 md:left-auto translate-y-full bg-[#FDFBF7] border-t md:border-l border-slate-200/90 rounded-t-3xl shadow-[0_-15px_50px_rgba(43,36,33,0.18)] overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="p-6 flex-1 overflow-y-auto">
          {/* Drawer Header */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">🛍️</span>
                <h2 className="text-[#2B2421] font-serif text-2xl font-bold">Your Order Cart</h2>
              </div>
              <span className="text-[11px] font-mono text-amber-700 uppercase tracking-widest font-bold">
                Kinetics Caffe &middot; Udaipur Counter
              </span>
            </div>
            <button
              onClick={toggleOrderDrawer}
              className="text-slate-500 hover:text-slate-800 transition-colors p-2 rounded-full hover:bg-slate-200/60 cursor-pointer"
              aria-label="Close order drawer"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {orderPlaced ? (
            /* Order Placed Success View */
            <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in-up">
              <div className="w-18 h-18 rounded-full bg-emerald-100 border-2 border-emerald-400 flex items-center justify-center text-emerald-600 mb-4 shadow-sm">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif text-[#2B2421] mb-1 font-bold">Order Received!</h3>
              <p className="text-xs text-slate-600 font-light max-w-xs leading-relaxed mb-4">
                Our barista has queued your items for extraction and fresh oven firing.
              </p>
              
              <div className="w-full bg-white p-4 rounded-xl border border-slate-200 shadow-2xs mb-6 text-xs font-mono">
                <div className="flex justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-500">PICKUP TOKEN</span>
                  <span className="text-emerald-700 font-bold">{orderToken}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-500">READY IN</span>
                  <span className="text-slate-800 font-bold">12–15 Minutes</span>
                </div>
              </div>

              <a
                href={`https://wa.me/919352457597?text=Hello%20Kinetics%20Caffe,%20I%20have%20placed%20order%20${orderToken}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-tactile w-full py-3 rounded-full bg-[#25D366] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs mb-3"
              >
                <span>Track on WhatsApp</span>
              </a>

              <button
                onClick={toggleOrderDrawer}
                className="text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer"
              >
                Close Cart
              </button>
            </div>
          ) : orderItems.length === 0 ? (
            /* Empty Cart View with Direct CTA */
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-amber-100/70 flex items-center justify-center mb-4 text-amber-700 text-2xl border border-amber-200">
                ☕
              </div>
              <p className="text-slate-800 text-base font-serif font-bold">Your cart is empty</p>
              <p className="text-slate-500 text-xs mt-1 font-light max-w-xs mb-6">
                Explore our signature roasts, wood-fired flatbreads, and artisan desserts.
              </p>
              <button
                onClick={handleScrollToMenu}
                className="btn-tactile px-6 py-3 rounded-full bg-gradient-to-r from-amber-600 to-rose-600 text-white text-xs font-bold uppercase tracking-wider shadow-sm cursor-pointer"
              >
                Explore Craft Menu →
              </button>
            </div>
          ) : (
            /* Active Cart Items List */
            <ul className="space-y-3.5">
              {orderItems.map((item) => (
                <li key={item.id} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-slate-900 text-sm font-serif font-bold leading-tight">{item.name}</h4>
                      {item.customization && (
                        <p className="text-[10px] font-mono text-slate-500 mt-1 leading-snug">
                          {item.customization}
                        </p>
                      )}
                    </div>
                    <span className="text-amber-700 font-mono text-xs font-bold">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>

                  {/* Quantity & Delete Controls */}
                  <div className="flex justify-between items-center pt-2 border-t border-slate-100 mt-1">
                    <span className="text-[11px] font-mono text-slate-400">
                      ₹{item.price} each
                    </span>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 bg-slate-100 rounded-full px-2.5 py-1">
                        <button
                          onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="w-5 h-5 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-200 transition-colors disabled:opacity-30 text-xs font-bold cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="text-slate-900 text-xs font-mono w-4 text-center font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                          className="w-5 h-5 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-200 transition-colors text-xs font-bold cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeOrderItem(item.id)}
                        className="p-1 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                        aria-label="Remove item"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Total & Checkout Section */}
        {orderItems.length > 0 && !orderPlaced && (
          <div className="p-6 bg-slate-50 border-t border-slate-200">
            {/* Quick Pickup Notice Pill */}
            <div className="mb-4 p-2.5 rounded-xl bg-amber-50 border border-amber-200 flex items-center gap-2 text-xs font-mono text-amber-900">
              <span>⚡</span>
              <span>Fresh Pickup at Espresso Bar &middot; 12–15 Mins</span>
            </div>

            <div className="space-y-1.5 mb-5 text-xs font-mono">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Cafe F&amp;B GST (5%)</span>
                <span>₹{gst.toLocaleString('en-IN')}</span>
              </div> 
              <div className="flex justify-between text-base text-slate-900 font-serif pt-2 border-t border-slate-200 font-bold">
                <span>Grand Total</span>
                <span className="font-mono text-amber-700">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="btn-tactile w-full py-3.5 rounded-full bg-gradient-to-r from-amber-600 via-rose-600 to-rose-700 text-white font-bold tracking-wider uppercase text-xs shadow-md hover:brightness-105 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Place Order &middot; ₹{total.toLocaleString('en-IN')}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
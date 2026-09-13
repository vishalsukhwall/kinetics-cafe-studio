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
    <div className="relative z-50 font-sans">
      {/* Backdrop */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-[#2B2421]/60 backdrop-blur-sm hidden opacity-0"
        onClick={toggleOrderDrawer}
        aria-hidden="true"
      />

      {/* Slide-Up Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-label="Your Order"
        aria-modal="true"
        className="fixed bottom-0 left-0 right-0 w-full md:max-w-md md:right-4 md:left-auto translate-y-full bg-[#FBF9F5] border-t border-l border-r border-[#2B2421]/15 rounded-t-3xl shadow-[0_-10px_40px_rgba(43,36,33,0.15)] overflow-hidden flex flex-col max-h-[88vh]"
      >
        <div className="p-6 flex-1 overflow-y-auto">
          {/* Drawer Header */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#2B2421]/10">
            <div>
              <h2 className="text-[#2B2421] font-serif text-2xl font-bold">Your Order</h2>
              <span className="text-[11px] font-mono text-[#A8583B] uppercase tracking-widest font-semibold">
                Kinetics Caffe · Espresso Bar
              </span>
            </div>
            <button
              onClick={toggleOrderDrawer}
              className="text-[#2B2421] hover:text-[#A8583B] transition-colors p-2 rounded-full hover:bg-[#F2EDE4]"
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
              <div className="w-16 h-16 rounded-full bg-[#A8583B]/10 border border-[#A8583B] flex items-center justify-center text-[#A8583B] mb-4 shadow-sm">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif text-[#2B2421] mb-2 font-bold">Order Confirmed!</h3>
              <p className="text-sm text-[#5A5049] font-light max-w-xs leading-relaxed">
                Our head barista is now grinding fresh beans. Ready for pickup in 12–15 minutes.
              </p>
              <span className="mt-4 text-xs font-mono text-[#2B2421]/60 tracking-wider font-semibold">
                Token #EO-{Math.floor(100 + Math.random() * 900)}
              </span>
            </div>
          ) : orderItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-[#F2EDE4] flex items-center justify-center mb-4 text-[#5A5049]/50 border border-[#2B2421]/10">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <p className="text-[#2B2421] text-sm font-medium">Your order is currently empty</p>
              <p className="text-[#5A5049] text-xs mt-1 font-light">Browse our Craft Menu to select your drink</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {orderItems.map((item) => (
                <li key={item.id} className="flex justify-between items-center p-3.5 rounded-2xl bg-[#F2EDE4] border border-[#2B2421]/10 shadow-sm">
                  <div className="flex-1 pr-3">
                    <h3 className="text-[#2B2421] text-sm font-serif font-semibold">{item.name}</h3>
                    <p className="text-[#A8583B] text-xs font-mono mt-0.5 font-medium">
                      ₹{item.price} each
                    </p>
                  </div>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-white rounded-full px-2.5 py-1 border border-[#2B2421]/15 shadow-sm">
                      <button
                        onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="w-6 h-6 rounded-full flex items-center justify-center text-[#2B2421] hover:bg-[#F2EDE4] transition-colors disabled:opacity-30 text-sm font-bold cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="text-[#2B2421] text-xs font-mono w-4 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-full flex items-center justify-center text-[#2B2421] hover:bg-[#F2EDE4] transition-colors text-sm font-bold cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeOrderItem(item.id)}
                      className="p-1.5 text-[#5A5049]/60 hover:text-red-500 transition-colors cursor-pointer"
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
          <div className="p-6 bg-[#F2EDE4] border-t border-[#2B2421]/15 backdrop-blur-xl">
            <div className="space-y-2 mb-6 text-xs font-mono">
              <div className="flex justify-between text-[#5A5049]">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-[#5A5049]">
                <span>Cafe GST (5%)</span>
                <span>₹{gst.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-base text-[#2B2421] font-serif pt-2 border-t border-[#2B2421]/15 font-bold">
                <span>Grand Total</span>
                <span className="font-mono text-[#A8583B]">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-4 rounded-full bg-[#2B2421] text-[#FBF9F5] font-semibold tracking-[0.15em] uppercase text-xs hover:bg-[#A8583B] shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Pay via UPI / Card · ₹{total.toLocaleString('en-IN')}</span>
            </button>

            <p className="text-center text-[10px] text-[#5A5049] mt-3 font-mono">
              Pickup at Espresso Bar · 15–20 minutes
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
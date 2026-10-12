"use client";

import React, { useState } from 'react';
import { useSceneStore } from '@/store/useSceneStore';

export default function ARViewerModal() {
  const isARModalOpen = useSceneStore((s) => s.isARModalOpen);
  const toggleARModal = useSceneStore((s) => s.toggleARModal);

  const [activeLighting, setActiveLighting] = useState<'amber' | 'studio' | 'candle'>('amber');
  const [rotationAngle, setRotationAngle] = useState(45);

  if (!isARModalOpen) return null;

  const handleLaunchMobileAR = () => {
    // Standard WebXR / Intent protocol for Android Scene Viewer and iOS Quick Look
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isIOS) {
      window.location.href = 'https://modelviewer.dev/shared-assets/models/CoffeeMug.usdz';
    } else {
      window.location.href =
        'intent://arvr.google.com/scene-viewer/1.0?file=https://modelviewer.dev/shared-assets/models/CoffeeMug.glb&mode=ar_only#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;end;';
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#2B2421]/60 backdrop-blur-sm p-4 sm:p-6 font-sans"
      onClick={toggleARModal}
    >
      <div
        className="relative max-w-2xl w-full bg-[#FBF9F5] border border-[#2B2421]/15 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 text-[#2B2421] flex flex-col animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#2B2421]/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#A8583B] text-[#FBF9F5] flex items-center justify-center text-xs font-bold shadow-sm">
              AR
            </div>
            <div>
              <h3 className="text-xl font-serif text-[#2B2421] font-bold">View Cup on Your Desk</h3>
              <p className="text-[10px] font-mono text-[#A8583B] uppercase tracking-widest font-semibold">
                Augmented Reality · 1:1 Scale
              </p>
            </div>
          </div>
          <button
            onClick={toggleARModal}
            className="w-8 h-8 rounded-full bg-[#F2EDE4] border border-[#2B2421]/15 text-[#2B2421] hover:text-[#A8583B] hover:border-[#A8583B] flex items-center justify-center transition-colors cursor-pointer shadow-sm"
            aria-label="Close AR Modal"
          >
            ✕
          </button>
        </div>

        {/* Interactive 3D Turntable Simulator Preview */}
        <div className="relative w-full h-64 sm:h-72 bg-[#F2EDE4] rounded-2xl border border-[#2B2421]/15 flex flex-col items-center justify-center overflow-hidden mb-6 group shadow-inner">
          {/* Radial Lighting Ambience */}
          <div
            className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
              activeLighting === 'amber'
                ? 'bg-radial-gradient from-[#C9A86C]/20 via-transparent to-transparent'
                : activeLighting === 'studio'
                ? 'bg-radial-gradient from-[#A8583B]/15 via-transparent to-transparent'
                : 'bg-radial-gradient from-[#C9A86C]/30 via-transparent to-transparent'
            }`}
          />

          {/* AR Target Reticle */}
          <div className="absolute inset-8 border border-dashed border-[#2B2421]/20 rounded-xl pointer-events-none flex items-center justify-center">
            <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#5A5049]/70">
              [Surface Tracking Grid · 240ml Ceramic Mug]
            </span>
          </div>

          {/* Stylized Simulated 3D Cup Graphic with interactive turntable slider */}
          <div
            className="relative transition-transform duration-300"
            style={{ transform: `rotateY(${rotationAngle}deg)` }}
          >
            <svg className="w-40 h-40 drop-shadow-[0_12px_20px_rgba(43,36,33,0.12)]" viewBox="0 0 160 160" fill="none">
              <ellipse cx="80" cy="140" rx="60" ry="8" fill="#EAE3D8" stroke="#2B2421" strokeOpacity="0.3" strokeWidth="1.5" />
              <path d="M35 50 L48 130 C50 136, 110 136, 112 130 L125 50 Z" fill="#FBF9F5" stroke="#2B2421" strokeOpacity="0.4" strokeWidth="2" />
              <path d="M123 60 C145 60, 145 110, 115 115" stroke="#2B2421" strokeOpacity="0.4" strokeWidth="5" strokeLinecap="round" fill="none" />
              <ellipse cx="80" cy="50" rx="45" ry="9" fill="#EAE3D8" stroke="#2B2421" strokeOpacity="0.3" strokeWidth="1.5" />
              <ellipse cx="80" cy="50" rx="42" ry="7" fill="#A8583B" fillOpacity="0.8" />
            </svg>
          </div>

          {/* Real-World Scale Measurements Overlay */}
          <div className="absolute bottom-3 left-4 right-4 flex justify-between text-[10px] font-mono text-[#5A5049]">
            <span>Height: 9.5 cm</span>
            <span>Rim: Ø 8.2 cm</span>
            <span>Capacity: 240 ml</span>
          </div>
        </div>

        {/* Interactive Lighting & Rotation Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-[10px] font-mono uppercase tracking-widest text-[#5A5049] block mb-2 font-semibold">
              Rotate View (360°)
            </label>
            <input
              type="range"
              min="0"
              max="360"
              value={rotationAngle}
              onChange={(e) => setRotationAngle(Number(e.target.value))}
              className="w-full accent-[#A8583B] cursor-pointer"
            />
          </div>

          <div>
            <label className="text-[10px] font-mono uppercase tracking-widest text-[#5A5049] block mb-2 font-semibold">
              Environment Light
            </label>
            <div className="flex gap-2">
              {(['amber', 'studio', 'candle'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setActiveLighting(mode)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-mono uppercase border transition-all cursor-pointer ${
                    activeLighting === mode
                      ? 'border-[#A8583B] bg-[#F2EDE4] text-[#A8583B] font-semibold'
                      : 'border-[#2B2421]/15 text-[#5A5049] hover:border-[#A8583B]/40'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button: Mobile Launch */}
        <div className="pt-4 border-t border-[#2B2421]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-[#F2EDE4] border border-[#2B2421]/15 flex items-center justify-center text-[#A8583B]">
              📷
            </div>
            <div>
              <span className="text-xs font-serif text-[#2B2421] font-bold block">Mobile AR Ready</span>
              <p className="text-[10px] text-[#5A5049]">Direct WebXR for iOS Quick Look & Android ARCore</p>
            </div>
          </div>

          <button
            onClick={handleLaunchMobileAR}
            className="btn-tactile w-full sm:w-auto px-6 py-3 rounded-full bg-[#2B2421] text-[#FBF9F5] font-semibold text-xs uppercase tracking-widest hover:bg-[#A8583B] shadow-sm cursor-pointer"
          >
            Launch AR Camera
          </button>
        </div>

      </div>
    </div>
  );
}

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
      // In production, point to the USDZ asset
      window.location.href = 'https://modelviewer.dev/shared-assets/models/CoffeeMug.usdz';
    } else {
      // Android intent
      window.location.href =
        'intent://arvr.google.com/scene-viewer/1.0?file=https://modelviewer.dev/shared-assets/models/CoffeeMug.glb&mode=ar_only#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;end;';
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0705]/90 backdrop-blur-xl p-4 sm:p-6"
      onClick={toggleARModal}
    >
      <div
        className="relative max-w-2xl w-full bg-[#160D08]/95 border border-[#C9A86C]/40 rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(216,155,90,0.3)] p-6 sm:p-8 text-[#F5E6D0] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#2A1F1A]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#D89B5A]/20 border border-[#D89B5A] text-[#D89B5A] flex items-center justify-center text-sm font-bold">
              AR
            </div>
            <div>
              <h3 className="text-xl font-serif text-[#F5E6D0]">View Cup on Your Desk</h3>
              <p className="text-[10px] font-mono text-[#C9A86C]/80 uppercase tracking-widest">
                Augmented Reality · 1:1 Scale
              </p>
            </div>
          </div>
          <button
            onClick={toggleARModal}
            className="w-8 h-8 rounded-full bg-[#0B0604] border border-[#2A180E] text-[#F5E6D0] hover:text-[#D89B5A] flex items-center justify-center transition-colors"
            aria-label="Close AR Modal"
          >
            ✕
          </button>
        </div>

        {/* Interactive 3D Turntable Simulator Preview */}
        <div className="relative w-full h-64 sm:h-72 bg-[#0B0604] rounded-2xl border border-[#2A180E] flex flex-col items-center justify-center overflow-hidden mb-6 group">
          {/* Radial Lighting Ambience */}
          <div
            className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
              activeLighting === 'amber'
                ? 'bg-radial-gradient from-[#D89B5A]/25 via-transparent to-transparent'
                : activeLighting === 'studio'
                ? 'bg-radial-gradient from-blue-500/15 via-transparent to-transparent'
                : 'bg-radial-gradient from-amber-600/35 via-transparent to-transparent'
            }`}
          />

          {/* AR Target Reticle */}
          <div className="absolute inset-8 border border-dashed border-[#C9A86C]/20 rounded-xl pointer-events-none flex items-center justify-center">
            <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#C9A86C]/40">
              [Surface Tracking Grid · 240ml Cup]
            </span>
          </div>

          {/* Stylized Simulated 3D Cup Graphic with interactive turntable slider */}
          <div
            className="relative transition-transform duration-300"
            style={{ transform: `rotateY(${rotationAngle}deg)` }}
          >
            <svg className="w-40 h-40 drop-shadow-[0_15px_25px_rgba(216,155,90,0.35)]" viewBox="0 0 160 160" fill="none">
              <ellipse cx="80" cy="140" rx="60" ry="8" fill="#2A180E" stroke="#C9A86C" strokeWidth="1.5" />
              <path d="M35 50 L48 130 C50 136, 110 136, 112 130 L125 50 Z" fill="#1C1009" stroke="#D89B5A" strokeWidth="2" />
              <path d="M123 60 C145 60, 145 110, 115 115" stroke="#D89B5A" strokeWidth="5" strokeLinecap="round" fill="none" />
              <ellipse cx="80" cy="50" rx="45" ry="9" fill="#120905" stroke="#C9A86C" strokeWidth="1.5" />
              <ellipse cx="80" cy="50" rx="42" ry="7" fill="#C28742" fillOpacity="0.4" />
            </svg>
          </div>

          {/* Real-World Scale Measurements Overlay */}
          <div className="absolute bottom-3 left-4 right-4 flex justify-between text-[10px] font-mono text-[#F5E6D0]/60">
            <span>Height: 9.5 cm</span>
            <span>Rim: Ø 8.2 cm</span>
            <span>Capacity: 240 ml</span>
          </div>
        </div>

        {/* Interactive Lighting & Rotation Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-[10px] font-mono uppercase tracking-widest text-[#C9A86C]/80 block mb-2">
              Rotate View (360°)
            </label>
            <input
              type="range"
              min="0"
              max="360"
              value={rotationAngle}
              onChange={(e) => setRotationAngle(Number(e.target.value))}
              className="w-full accent-[#D89B5A] cursor-pointer"
            />
          </div>

          <div>
            <label className="text-[10px] font-mono uppercase tracking-widest text-[#C9A86C]/80 block mb-2">
              Environment Light
            </label>
            <div className="flex gap-2">
              {(['amber', 'studio', 'candle'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setActiveLighting(mode)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-mono uppercase border transition-all ${
                    activeLighting === mode
                      ? 'border-[#D89B5A] bg-[#2A180E] text-[#D89B5A]'
                      : 'border-[#2A180E] text-[#F5E6D0]/50 hover:border-[#C9A86C]/40'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button: Mobile Launch or Desktop QR Guide */}
        <div className="pt-4 border-t border-[#2A1F1A] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-[#0B0604] border border-[#C9A86C]/30 flex items-center justify-center text-[#D89B5A]">
              📷
            </div>
            <div>
              <span className="text-xs font-serif text-[#F5E6D0] block">Mobile AR Ready</span>
              <p className="text-[10px] text-[#C9A86C]/70">Direct WebXR for iOS Quick Look & Android ARCore</p>
            </div>
          </div>

          <button
            onClick={handleLaunchMobileAR}
            className="btn-tactile w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#D89B5A] to-[#B8722E] text-[#0B0705] font-semibold text-xs uppercase tracking-widest shadow-lg hover:brightness-110"
          >
            Launch AR Camera
          </button>
        </div>

      </div>
    </div>
  );
}

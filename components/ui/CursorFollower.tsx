"use client";

import React, { useEffect, useRef } from "react";
import { cursorTracker } from "@/lib/cursorTracker";

export default function CursorFollower() {
  const innerDotRef = useRef<HTMLDivElement>(null);
  const outerRingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on desktop pointer devices with fine control
    if (typeof window === "undefined") return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFinePointer || prefersReduced) return;

    let rafId: number;
    let ringX = window.innerWidth / 2;
    let ringY = window.innerHeight / 2;
    let dotX = ringX;
    let dotY = ringY;

    const render = () => {
      // Spring lerp towards actual mouse coordinates
      dotX += (cursorTracker.pixelX - dotX) * 0.45;
      dotY += (cursorTracker.pixelY - dotY) * 0.45;

      ringX += (cursorTracker.pixelX - ringX) * 0.18;
      ringY += (cursorTracker.pixelY - ringY) * 0.18;

      if (innerDotRef.current) {
        innerDotRef.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
      }

      if (outerRingRef.current) {
        outerRingRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
        // Subtle color shift on rapid cursor movement
        const vel = Math.min(cursorTracker.velocity * 2, 1);
        outerRingRef.current.style.borderColor = vel > 0.3 ? '#A8583B' : 'rgba(43, 36, 33, 0.25)';
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Smooth outer ring */}
      <div
        ref={outerRingRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[rgba(43,36,33,0.25)] pointer-events-none z-[9990] will-change-transform transition-colors duration-150"
      />
      {/* Crisp inner dot */}
      <div
        ref={innerDotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#A8583B] pointer-events-none z-[9990] will-change-transform shadow-[0_0_6px_rgba(168,88,59,0.5)]"
      />
    </>
  );
}

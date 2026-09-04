"use client";

import { useEffect, useState } from 'react';
import { useSceneStore } from '@/store/useSceneStore';

interface ReducedMotionSafeResult {
  isReducedMotion: boolean;
  isLowPower: boolean;
  effectiveParticleCount: (base: number) => number;
}

export function useReducedMotionSafe(): ReducedMotionSafeResult {
  const setReducedMotion = useSceneStore((state) => state.setReducedMotion);
  const setLowPower = useSceneStore((state) => state.setLowPower);
  
  const isReducedMotionStore = useSceneStore((state) => state.isReducedMotion);
  const isLowPowerStore = useSceneStore((state) => state.isLowPower);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window === 'undefined') return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const updateMotion = (e: MediaQueryListEvent | MediaQueryList) => {
      setReducedMotion(e.matches);
    };

    updateMotion(motionQuery);
    
    if (motionQuery.addEventListener) {
      motionQuery.addEventListener('change', updateMotion);
    } else {
      // Fallback for older browsers
      motionQuery.addListener(updateMotion);
    }

    // Check hardware
    const cores = navigator.hardwareConcurrency || 4;
    const dpr = window.devicePixelRatio || 1;
    const isMobile = typeof navigator !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent);
    
    const lowPower = cores < 4 || (isMobile && cores <= 4 && dpr > 2);
    setLowPower(lowPower);

    return () => {
      if (motionQuery.removeEventListener) {
        motionQuery.removeEventListener('change', updateMotion);
      } else {
        motionQuery.removeListener(updateMotion);
      }
    };
  }, [setReducedMotion, setLowPower]);

  const effectiveParticleCount = (base: number): number => {
    if (!mounted) return base; // ssr fallback
    if (isReducedMotionStore) return 0;
    if (isLowPowerStore) return Math.floor(base * 0.3);
    return base;
  };

  return {
    isReducedMotion: isReducedMotionStore,
    isLowPower: isLowPowerStore,
    effectiveParticleCount,
  };
}

"use client";

import { useEffect, useRef } from 'react';
import { useSceneStore } from '@/store/useSceneStore';

interface CursorState {
  velocity: number;
  position: { x: number; y: number };
}

export function useCursorVelocity(): CursorState {
  const setCursorVelocity = useSceneStore((state) => state.setCursorVelocity);
  const setCursorPosition = useSceneStore((state) => state.setCursorPosition);
  
  const stateRef = useRef<{
    lastPos: { x: number; y: number } | null;
    lastTime: number;
    smoothedVelocity: number;
    velocityAccel: number;
  }>({
    lastPos: null,
    lastTime: 0,
    smoothedVelocity: 0,
    velocityAccel: 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Critically damped spring constants
    const stiffness = 200;
    const damping = 2 * Math.sqrt(stiffness);
    
    let rafId: number;
    let targetVelocity = 0;

    const handlePointerMove = (e: PointerEvent) => {
      const now = performance.now();
      const st = stateRef.current;
      
      // Update normalized position
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      setCursorPosition({ x: nx, y: ny });

      if (st.lastPos) {
        const dt = (now - st.lastTime) / 1000; // seconds
        if (dt > 0) {
          const dx = e.clientX - st.lastPos.x;
          const dy = e.clientY - st.lastPos.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const rawVel = dist / dt;
          
          // Clamp at 2000px/s for target normalization
          targetVelocity = Math.min(rawVel / 2000, 1.0);
        }
      }
      
      st.lastPos = { x: e.clientX, y: e.clientY };
      st.lastTime = now;
    };

    const loop = () => {
      const st = stateRef.current;
      
      // Fixed dt for spring stability
      const dt = 1/60; 
      
      const springForce = stiffness * (targetVelocity - st.smoothedVelocity);
      const damperForce = damping * st.velocityAccel;
      const acceleration = springForce - damperForce;
      
      st.velocityAccel += acceleration * dt;
      st.smoothedVelocity += st.velocityAccel * dt;
      
      // Decay target velocity if no movement happens
      targetVelocity = Math.max(0, targetVelocity - dt * 2.0); 

      // Clamp smoothed velocity 0-1
      const clampedVel = Math.max(0, Math.min(st.smoothedVelocity, 1));
      setCursorVelocity(clampedVel);
      
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', handlePointerMove as EventListener, { passive: true });
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove as EventListener);
      cancelAnimationFrame(rafId);
    };
  }, [setCursorVelocity, setCursorPosition]);

  return {
    velocity: useSceneStore((state) => state.cursorVelocity),
    position: useSceneStore((state) => state.cursorPosition),
  };
}

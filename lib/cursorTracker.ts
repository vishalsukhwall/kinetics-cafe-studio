/**
 * cursorTracker
 *
 * High-performance singleton to track cursor position and velocity without
 * triggering React component re-renders.
 *
 * In R3F, reading this inside `useFrame` or using `state.pointer` directly
 * prevents the entire React tree from re-rendering on mousemove.
 */

export interface CursorTrackerState {
  x: number; // normalized -1 to 1
  y: number; // normalized -1 to 1
  pixelX: number;
  pixelY: number;
  velocity: number; // 0 to 1 normalized
  targetVelocity: number;
}

export const cursorTracker: CursorTrackerState = {
  x: 0,
  y: 0,
  pixelX: 0,
  pixelY: 0,
  velocity: 0,
  targetVelocity: 0,
};

let isInitialized = false;
let lastPos: { x: number; y: number } | null = null;
let lastTime = 0;
let rafId: number | null = null;

export function initCursorTracker() {
  if (typeof window === 'undefined' || isInitialized) return;
  isInitialized = true;

  const handlePointerMove = (e: PointerEvent) => {
    const now = performance.now();
    cursorTracker.pixelX = e.clientX;
    cursorTracker.pixelY = e.clientY;
    cursorTracker.x = (e.clientX / window.innerWidth) * 2 - 1;
    cursorTracker.y = -(e.clientY / window.innerHeight) * 2 + 1;

    if (lastPos && lastTime > 0) {
      const dt = (now - lastTime) / 1000;
      if (dt > 0.001) {
        const dx = e.clientX - lastPos.x;
        const dy = e.clientY - lastPos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const rawVel = dist / dt;
        cursorTracker.targetVelocity = Math.min(rawVel / 1800, 1.0);
      }
    }

    lastPos = { x: e.clientX, y: e.clientY };
    lastTime = now;
  };

  const updateLoop = () => {
    // Critically damped decay towards target velocity
    const dt = 1 / 60;
    cursorTracker.velocity += (cursorTracker.targetVelocity - cursorTracker.velocity) * 0.15;
    cursorTracker.targetVelocity = Math.max(0, cursorTracker.targetVelocity - dt * 2.5);

    rafId = requestAnimationFrame(updateLoop);
  };

  window.addEventListener('pointermove', handlePointerMove, { passive: true });
  rafId = requestAnimationFrame(updateLoop);
}

export function cleanupCursorTracker() {
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
}

"use client";

import { useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useSceneStore } from '@/store/useSceneStore';
import { dampedLerp } from '@/lib/three-utils';

/**
 * CameraRig - Zero-Stutter Smooth Tracking
 *
 * Choreographs camera positioning across sections (Hero -> Menu -> Journey)
 * coupled with smooth pointer parallax.
 *
 * Performance critical:
 * - Reads scrollProgress imperatively from store via `getState()` (0 React re-renders).
 * - Reads pointer coordinates directly from R3F's `state.pointer` (0 React re-renders).
 * - Interpolates smoothly via dampedLerp without frame hiccups.
 */

export function CameraRig() {
  const { camera } = useThree();
  const targetPosition = useMemo(() => new THREE.Vector3(0, 1, 5), []);

  useFrame((state, delta) => {
    const safeDelta = Math.min(delta, 0.1);
    const scrollProgress = useSceneStore.getState().scrollProgress;

    // Define 3D waypoints based on global scroll narrative
    if (scrollProgress < 0.25) {
      // Hero: centered, majestic view
      targetPosition.set(0, 1.1, 5.2);
    } else if (scrollProgress < 0.6) {
      // Menu: angled side view highlighting the silhouette
      targetPosition.set(1.8, 0.4, 4.2);
    } else {
      // Bean Journey & Gallery: intimate angled perspective
      targetPosition.set(-1.6, -0.6, 3.8);
    }

    // Subtle pointer parallax offset without lagging
    const parallaxX = state.pointer.x * 0.4;
    const parallaxY = state.pointer.y * 0.3;

    // Smooth camera interpolation
    camera.position.x = dampedLerp(camera.position.x, targetPosition.x + parallaxX, 2.5, safeDelta);
    camera.position.y = dampedLerp(camera.position.y, targetPosition.y + parallaxY, 2.5, safeDelta);
    camera.position.z = dampedLerp(camera.position.z, targetPosition.z, 2.5, safeDelta);

    camera.lookAt(0, 0.2, 0);
  });

  return null;
}

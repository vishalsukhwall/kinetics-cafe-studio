"use client";

import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { WebGLErrorBoundary } from './WebGLErrorBoundary';
import { StaticHeroFallback } from './fallback/StaticHeroFallback';
import { checkWebGLAvailable } from '@/lib/three-utils';
import { initCursorTracker } from '@/lib/cursorTracker';

interface SceneCanvasProps {
  children: React.ReactNode;
}

export function SceneCanvas({ children }: SceneCanvasProps) {
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);

  useEffect(() => {
    setHasWebGL(checkWebGLAvailable());
    initCursorTracker();
  }, []);

  if (hasWebGL === null) {
    return <div className="w-full h-full bg-[#0B0705]" aria-hidden="true" />;
  }

  if (!hasWebGL) {
    return <StaticHeroFallback />;
  }

  return (
    <WebGLErrorBoundary fallback={<StaticHeroFallback />}>
      <Canvas
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        // Limit DPR to 1.5 max to maintain solid 60 FPS on Retina/4K displays
        dpr={[1, typeof window !== 'undefined' ? Math.min(1.5, window.devicePixelRatio) : 1]}
        camera={{ position: [0, 1.1, 5.2], fov: 45 }}
        style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
        onCreated={({ gl, scene }) => {
          scene.background = new THREE.Color('#0B0705');
          scene.fog = new THREE.FogExp2('#0B0705', 0.04);
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.1;
        }}
      >
        {children}
      </Canvas>
    </WebGLErrorBoundary>
  );
}

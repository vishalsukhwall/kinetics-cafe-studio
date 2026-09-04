"use client";

import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { steamParticleVertex, steamParticleFragment } from '@/lib/shaders/steamParticle';
import { useSceneStore } from '@/store/useSceneStore';
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe';

interface SteamParticlesProps {
  position?: [number, number, number];
}

export function SteamParticles({ position = [0, 1.4, 0] }: SteamParticlesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { isReducedMotion, effectiveParticleCount } = useReducedMotionSafe();

  // 90 particles on desktop, 25 on mobile/low-power
  const count = effectiveParticleCount(90);

  const { geometry, material } = useMemo(() => {
    const geom = new THREE.PlaneGeometry(0.45, 0.45);
    const mat = new THREE.ShaderMaterial({
      vertexShader: steamParticleVertex,
      fragmentShader: steamParticleFragment,
      uniforms: {
        uTime: { value: 0 },
        uScrollProgress: { value: 0 },
        uColor: { value: new THREE.Color('#F5E6D0') },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    return { geometry: geom, material: mat };
  }, []);

  const { offsets, scales, speeds, phases } = useMemo(() => {
    const offsetsArray = new Float32Array(count * 3);
    const scalesArray = new Float32Array(count);
    const speedsArray = new Float32Array(count);
    const phasesArray = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Column dispersal above coffee cup
      offsetsArray[i * 3] = (Math.random() - 0.5) * 0.9;
      offsetsArray[i * 3 + 1] = Math.random() * 2.2;
      offsetsArray[i * 3 + 2] = (Math.random() - 0.5) * 0.9;

      scalesArray[i] = 0.6 + Math.random() * 1.4;
      speedsArray[i] = 0.3 + Math.random() * 0.7;
      phasesArray[i] = Math.random() * Math.PI * 2;
    }

    return {
      offsets: new THREE.InstancedBufferAttribute(offsetsArray, 3),
      scales: new THREE.InstancedBufferAttribute(scalesArray, 1),
      speeds: new THREE.InstancedBufferAttribute(speedsArray, 1),
      phases: new THREE.InstancedBufferAttribute(phasesArray, 1),
    };
  }, [count]);

  useEffect(() => {
    geometry.setAttribute('aOffset', offsets);
    geometry.setAttribute('aScale', scales);
    geometry.setAttribute('aSpeed', speeds);
    geometry.setAttribute('aPhase', phases);

    // Initialize instance matrices ONCE (GPU vertex shader handles motion)
    if (meshRef.current) {
      const dummy = new THREE.Object3D();
      for (let i = 0; i < count; i++) {
        dummy.position.set(0, 0, 0);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }

    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material, offsets, scales, speeds, phases, count]);

  useFrame((_state, delta) => {
    const safeDelta = Math.min(delta, 0.1);
    material.uniforms.uTime.value += safeDelta;
    // Read store imperatively without triggering React re-renders
    material.uniforms.uScrollProgress.value = useSceneStore.getState().scrollProgress;
  });

  if (isReducedMotion || count === 0) {
    return null;
  }

  return (
    <group position={position}>
      <instancedMesh ref={meshRef} args={[geometry, material, count]} />
    </group>
  );
}

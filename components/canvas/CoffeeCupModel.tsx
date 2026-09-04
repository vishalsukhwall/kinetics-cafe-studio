"use client";

import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { fresnelRimVertex, fresnelRimFragment } from '@/lib/shaders/fresnelRim';
import { cursorTracker } from '@/lib/cursorTracker';

/**
 * CoffeeCupModel - High Performance Edition
 *
 * Fully procedural LatheGeometry cup with custom Fresnel rim-light GLSL shader.
 * Completely decoupled from React re-renders:
 * - Reads mouse parallax from R3F's `state.pointer` (0 React state dispatches).
 * - Reads velocity from `cursorTracker` (0 React state dispatches).
 * - Pre-allocated Euler, Vector3, and Color objects.
 * - Strict GPU resource disposal on unmount.
 */

interface CoffeeCupModelProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

export function CoffeeCupModel({
  position = [0, -0.5, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: CoffeeCupModelProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Pre-allocated math objects to avoid Garbage Collection in useFrame
  const targetRotation = useMemo(() => new THREE.Euler(), []);
  const baseRotation = useMemo(() => new THREE.Euler(...rotation), [rotation]);

  // Cup body — LatheGeometry
  const bodyGeometry = useMemo(() => {
    const points: THREE.Vector2[] = [
      new THREE.Vector2(0, 0),
      new THREE.Vector2(0.4, 0),
      new THREE.Vector2(0.42, 0.05),
      new THREE.Vector2(0.45, 0.2),
      new THREE.Vector2(0.52, 0.5),
      new THREE.Vector2(0.58, 0.8),
      new THREE.Vector2(0.62, 1.1),
      new THREE.Vector2(0.65, 1.3),
      new THREE.Vector2(0.67, 1.4),
      new THREE.Vector2(0.66, 1.45),
      new THREE.Vector2(0.63, 1.45),
    ];
    return new THREE.LatheGeometry(points, 48);
  }, []);

  // Cup handle — TorusGeometry
  const handleGeometry = useMemo(() => {
    const geom = new THREE.TorusGeometry(0.25, 0.05, 12, 32, Math.PI);
    geom.rotateZ(Math.PI / 2);
    geom.translate(0.7, 0.75, 0);
    return geom;
  }, []);

  // Coffee liquid surface — CircleGeometry
  const liquidGeometry = useMemo(() => {
    const geom = new THREE.CircleGeometry(0.6, 48);
    geom.rotateX(-Math.PI / 2);
    geom.translate(0, 1.38, 0);
    return geom;
  }, []);

  // Ceramic Fresnel rim-light shader
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: fresnelRimVertex,
      fragmentShader: fresnelRimFragment,
      uniforms: {
        uTime: { value: 0 },
        uRimColor: { value: new THREE.Color('#D89B5A') },
        uRimPower: { value: 2.2 },
        uRimIntensity: { value: 0.6 },
        uBaseColor: { value: new THREE.Color('#160D08') },
        uLightPosition: { value: new THREE.Vector3(3, 4, 5) },
      },
      transparent: true,
      side: THREE.DoubleSide,
    });
  }, []);

  // Glossy espresso liquid material
  const liquidMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#080503',
      roughness: 0.15,
      metalness: 0.7,
      emissive: '#180E08',
      emissiveIntensity: 0.25,
    });
  }, []);

  // Complete GPU memory cleanup on unmount
  useEffect(() => {
    return () => {
      bodyGeometry.dispose();
      handleGeometry.dispose();
      liquidGeometry.dispose();
      shaderMaterial.dispose();
      liquidMaterial.dispose();
    };
  }, [bodyGeometry, handleGeometry, liquidGeometry, shaderMaterial, liquidMaterial]);

  useFrame((state, delta) => {
    // Cap delta to prevent physics jumps on tab blur
    const safeDelta = Math.min(delta, 0.1);

    // Update shader time
    shaderMaterial.uniforms.uTime.value += safeDelta;

    // Rim intensity smoothly responds to cursor velocity without React state
    const targetIntensity = 0.5 + Math.min(cursorTracker.velocity * 3.5, 1.2);
    shaderMaterial.uniforms.uRimIntensity.value = THREE.MathUtils.lerp(
      shaderMaterial.uniforms.uRimIntensity.value,
      targetIntensity,
      safeDelta * 5
    );

    // Mouse-parallax rotation: uses state.pointer directly (normalized -1 to 1)
    if (groupRef.current) {
      targetRotation.set(
        baseRotation.x - state.pointer.y * 0.1,
        baseRotation.y + state.pointer.x * 0.18,
        baseRotation.z
      );

      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotation.x,
        safeDelta * 3.5
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotation.y,
        safeDelta * 3.5
      );
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <mesh geometry={bodyGeometry} material={shaderMaterial} />
      <mesh geometry={handleGeometry} material={shaderMaterial} />
      <mesh geometry={liquidGeometry} material={liquidMaterial} />

      {/* Atmospheric lighting */}
      <pointLight position={[3, 4, 5]} color="#D89B5A" intensity={2.2} distance={15} decay={2} />
      <pointLight position={[-2, 2, -3]} color="#B8722E" intensity={1.0} distance={12} decay={2} />
      <ambientLight intensity={0.2} color="#F5E6D0" />
    </group>
  );
}

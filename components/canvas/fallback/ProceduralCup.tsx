"use client";

import React, { useMemo, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { fresnelRimVertex, fresnelRimFragment } from '@/lib/shaders/fresnelRim';
import { cursorTracker } from '@/lib/cursorTracker';

interface ProceduralCupProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

export function ProceduralCup({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }: ProceduralCupProps) {
  const groupRef = useRef<THREE.Group>(null);

  const targetRotation = useMemo(() => new THREE.Euler(), []);
  const baseRotation = useMemo(() => new THREE.Euler(...rotation), [rotation]);

  const { bodyGeometry, handleGeometry, liquidGeometry, shaderMaterial, liquidMaterial } = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 10; i++) {
      const t = i / 10;
      const x = 0.5 + Math.sin(t * Math.PI * 0.5) * 0.2 + (t === 1 ? 0.05 : 0);
      const y = t * 1.5;
      points.push(new THREE.Vector2(x, y));
    }
    const bodyGeom = new THREE.LatheGeometry(points, 32);
    
    const handleGeom = new THREE.TorusGeometry(0.4, 0.08, 16, 32);
    handleGeom.translate(0.7, 0.7, 0);
    
    const liquidGeom = new THREE.CircleGeometry(0.65, 32);
    liquidGeom.rotateX(-Math.PI / 2);
    liquidGeom.translate(0, 1.35, 0);

    const rimMat = new THREE.ShaderMaterial({
      vertexShader: fresnelRimVertex,
      fragmentShader: fresnelRimFragment,
      uniforms: {
        uTime: { value: 0 },
        uRimColor: { value: new THREE.Color('#D89B5A') },
        uRimPower: { value: 2.5 },
        uRimIntensity: { value: 0.5 },
        uBaseColor: { value: new THREE.Color('#1A0F0A') },
        uLightPosition: { value: new THREE.Vector3(5, 5, 5) }
      },
      transparent: true,
      side: THREE.DoubleSide
    });

    const liqMat = new THREE.MeshStandardMaterial({
      color: '#0B0705',
      roughness: 0.1,
      metalness: 0.8,
      emissive: '#1A0F0A',
      emissiveIntensity: 0.2
    });

    return {
      bodyGeometry: bodyGeom,
      handleGeometry: handleGeom,
      liquidGeometry: liquidGeom,
      shaderMaterial: rimMat,
      liquidMaterial: liqMat
    };
  }, []);

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
    const safeDelta = Math.min(delta, 0.1);
    shaderMaterial.uniforms.uTime.value += safeDelta;
    
    const targetIntensity = 0.5 + Math.min(cursorTracker.velocity * 4, 1.0);
    shaderMaterial.uniforms.uRimIntensity.value = THREE.MathUtils.lerp(
      shaderMaterial.uniforms.uRimIntensity.value,
      targetIntensity,
      safeDelta * 5
    );

    if (groupRef.current) {
      targetRotation.set(
        baseRotation.x - state.pointer.y * 0.1,
        baseRotation.y + state.pointer.x * 0.18,
        baseRotation.z
      );
      
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotation.x, safeDelta * 3);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotation.y, safeDelta * 3);
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <mesh geometry={bodyGeometry} material={shaderMaterial} />
      <mesh geometry={handleGeometry} material={shaderMaterial} />
      <mesh geometry={liquidGeometry} material={liquidMaterial} />
    </group>
  );
}

"use client";

import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe';

interface FloatingBeansProps {
  position?: [number, number, number];
}

export function FloatingBeans({ position = [0, 0, 0] }: FloatingBeansProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { isReducedMotion, effectiveParticleCount } = useReducedMotionSafe();
  const count = effectiveParticleCount(25);

  const { geometry, material, dummy } = useMemo(() => {
    // Elegant procedural coffee bean geometry
    const points: THREE.Vector2[] = [];
    for (let i = 0; i <= 8; i++) {
      const t = i / 8;
      const x = Math.sin(t * Math.PI) * 0.35;
      const y = (t - 0.5) * 1.0;
      points.push(new THREE.Vector2(x, y));
    }
    const geom = new THREE.LatheGeometry(points, 12);
    geom.scale(1, 1, 0.65); // Flattened bean profile

    // Warm roasted coffee bean with amber specular highlight
    const mat = new THREE.MeshStandardMaterial({
      color: '#2A180E',
      roughness: 0.45,
      metalness: 0.25,
      emissive: '#1A0F0A',
      emissiveIntensity: 0.15,
    });

    return {
      geometry: geom,
      material: mat,
      dummy: new THREE.Object3D(),
    };
  }, []);

  const beanData = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push({
        baseX: (Math.random() - 0.5) * 8,
        baseY: (Math.random() - 0.5) * 6,
        baseZ: (Math.random() - 0.5) * 8 - 1,
        rotX: Math.random() * Math.PI * 2,
        rotY: Math.random() * Math.PI * 2,
        rotZ: Math.random() * Math.PI * 2,
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 0.4,
        scale: 0.5 + Math.random() * 0.5,
      });
    }
    return data;
  }, [count]);

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  const timeRef = useRef(0);

  useFrame((_state, delta) => {
    if (!meshRef.current || count === 0) return;
    const safeDelta = Math.min(delta, 0.1);
    timeRef.current += safeDelta;
    const time = timeRef.current;

    for (let i = 0; i < count; i++) {
      const bean = beanData[i];
      dummy.position.set(
        bean.baseX,
        bean.baseY + Math.sin(time * bean.speed + bean.phase) * 0.4,
        bean.baseZ
      );
      dummy.rotation.set(
        bean.rotX + time * 0.15,
        bean.rotY + time * 0.2,
        bean.rotZ
      );
      dummy.scale.setScalar(bean.scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
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

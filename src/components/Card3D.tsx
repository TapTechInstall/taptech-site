'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Text, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function NFCCard() {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  const gradientMap = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 1;
    const ctx = canvas.getContext('2d')!;
    const gradient = ctx.createLinearGradient(0, 0, 256, 0);
    gradient.addColorStop(0, '#00e5a0');
    gradient.addColorStop(1, '#00b8ff');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 1);
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;

    meshRef.current.rotation.y = Math.sin(t * 0.4) * 0.15;
    meshRef.current.rotation.x = Math.cos(t * 0.3) * 0.08;
    meshRef.current.rotation.z = Math.sin(t * 0.2) * 0.03;

    if (glowRef.current) {
      glowRef.current.rotation.y = meshRef.current.rotation.y;
      glowRef.current.rotation.x = meshRef.current.rotation.x;
      glowRef.current.rotation.z = meshRef.current.rotation.z;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
      <group>
        {/* Glow behind card */}
        <mesh ref={glowRef} position={[0, 0, -0.05]}>
          <planeGeometry args={[3.8, 2.5]} />
          <meshBasicMaterial color="#00e5a0" transparent opacity={0.06} />
        </mesh>

        {/* Main card body */}
        <RoundedBox
          ref={meshRef}
          args={[3.4, 2.1, 0.06]}
          radius={0.12}
          smoothness={4}
        >
          <meshPhysicalMaterial
            color="#111118"
            metalness={0.8}
            roughness={0.15}
            clearcoat={1}
            clearcoatRoughness={0.1}
            envMapIntensity={1.5}
          />
        </RoundedBox>

        {/* Card accent line */}
        <mesh position={[0, 0.7, 0.04]} ref={meshRef}>
          <planeGeometry args={[2.8, 0.02]} />
          <meshBasicMaterial map={gradientMap} transparent opacity={0.9} />
        </mesh>

        {/* TapTech text */}
        <Text
          position={[-1.1, 0.35, 0.04]}
          fontSize={0.22}
          font="/fonts/Syne-ExtraBold.ttf"
          color="#ffffff"
          anchorX="left"
          anchorY="middle"
        >
          TapTech
        </Text>

        {/* Connect text */}
        <Text
          position={[-1.1, 0.08, 0.04]}
          fontSize={0.12}
          color="#00e5a0"
          anchorX="left"
          anchorY="middle"
        >
          CONNECT
        </Text>

        {/* NFC icon circle */}
        <mesh position={[1.2, -0.5, 0.04]}>
          <ringGeometry args={[0.18, 0.22, 32]} />
          <meshBasicMaterial color="#00e5a0" transparent opacity={0.6} />
        </mesh>
        <mesh position={[1.2, -0.5, 0.04]}>
          <ringGeometry args={[0.1, 0.13, 32]} />
          <meshBasicMaterial color="#00e5a0" transparent opacity={0.4} />
        </mesh>
        <mesh position={[1.2, -0.5, 0.04]}>
          <circleGeometry args={[0.05, 32]} />
          <meshBasicMaterial color="#00e5a0" transparent opacity={0.8} />
        </mesh>

        {/* Decorative line bottom */}
        <Text
          position={[-1.1, -0.6, 0.04]}
          fontSize={0.08}
          color="#7c7c99"
          anchorX="left"
          anchorY="middle"
        >
          taptechconnect.com
        </Text>
      </group>
    </Float>
  );
}

function ParticleField() {
  const count = 80;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  }, []);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    ref.current.rotation.x = state.clock.elapsedTime * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#00e5a0" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

function GlowOrb({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.y = position[1] + Math.sin(t * 0.5) * 0.3;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <MeshDistortMaterial
        color={color}
        transparent
        opacity={0.08}
        distort={0.4}
        speed={2}
      />
    </mesh>
  );
}

export default function Card3D() {
  return (
    <div className="w-full h-[500px] md:h-[600px] relative">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-3, 2, 4]} intensity={0.5} color="#00e5a0" />
        <pointLight position={[3, -2, 4]} intensity={0.3} color="#00b8ff" />

        <NFCCard />
        <ParticleField />
        <GlowOrb position={[-3, 1, -2]} color="#00e5a0" scale={1.5} />
        <GlowOrb position={[3, -1, -3]} color="#00b8ff" scale={1.2} />
      </Canvas>
    </div>
  );
}

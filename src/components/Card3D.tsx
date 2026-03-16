'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Float, MeshDistortMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

function NFCCard() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.15;
    groupRef.current.rotation.x = Math.cos(t * 0.3) * 0.08;
    groupRef.current.rotation.z = Math.sin(t * 0.2) * 0.03;
  });

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
      <group ref={groupRef}>
        {/* Glow behind card */}
        <mesh position={[0, 0, -0.05]}>
          <planeGeometry args={[3.8, 2.5]} />
          <meshBasicMaterial color="#00e5a0" transparent opacity={0.06} />
        </mesh>

        {/* Main card body */}
        <RoundedBox args={[3.4, 2.1, 0.06]} radius={0.12} smoothness={4}>
          <meshPhysicalMaterial
            color="#111118"
            metalness={0.8}
            roughness={0.15}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </RoundedBox>

        {/* Card accent line (gradient) */}
        <mesh position={[0, 0.7, 0.04]}>
          <planeGeometry args={[2.8, 0.02]} />
          <meshBasicMaterial color="#00e5a0" transparent opacity={0.9} />
        </mesh>

        {/* NFC icon circles */}
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

        {/* TapTech label line */}
        <mesh position={[-0.5, 0.35, 0.04]}>
          <planeGeometry args={[1.2, 0.18]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.08} />
        </mesh>

        {/* Connect label line */}
        <mesh position={[-0.7, 0.08, 0.04]}>
          <planeGeometry args={[0.8, 0.1]} />
          <meshBasicMaterial color="#00e5a0" transparent opacity={0.12} />
        </mesh>

        {/* Bottom URL line */}
        <mesh position={[-0.3, -0.6, 0.04]}>
          <planeGeometry args={[1.5, 0.06]} />
          <meshBasicMaterial color="#7c7c99" transparent opacity={0.08} />
        </mesh>

        {/* Edge highlight */}
        <mesh position={[0, 0, 0.035]}>
          <planeGeometry args={[3.35, 2.05]} />
          <meshBasicMaterial color="#00e5a0" transparent opacity={0.02} />
        </mesh>
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
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#00e5a0" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

function GlowOrb({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <MeshDistortMaterial color={color} transparent opacity={0.08} distort={0.4} speed={2} />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <pointLight position={[-3, 2, 4]} intensity={0.6} color="#00e5a0" />
      <pointLight position={[3, -2, 4]} intensity={0.4} color="#00b8ff" />
      <Environment preset="city" />
      <NFCCard />
      <ParticleField />
      <GlowOrb position={[-3, 1, -2]} color="#00e5a0" scale={1.5} />
      <GlowOrb position={[3, -1, -3]} color="#00b8ff" scale={1.2} />
    </>
  );
}

export default function Card3D() {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Check WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) setError(true);
    } catch {
      setError(true);
    }
  }, []);

  // Fallback for no WebGL
  if (error) {
    return (
      <div className="w-full h-[400px] md:h-[500px] flex items-center justify-center relative">
        <div className="w-[340px] h-[210px] rounded-2xl bg-bg-card border border-accent/20 relative overflow-hidden glow-accent">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent to-accent-2" />
          <div className="p-6 flex flex-col justify-between h-full">
            <div>
              <p className="font-[family-name:var(--font-syne)] font-extrabold text-lg text-txt">TapTech</p>
              <p className="text-accent text-xs font-bold tracking-wider">CONNECT</p>
            </div>
            <div className="flex items-end justify-between">
              <p className="text-dim text-[10px]">taptechconnect.com</p>
              <div className="flex flex-col items-center gap-1">
                <div className="w-5 h-5 rounded-full border-2 border-accent/50" />
                <div className="w-3 h-3 rounded-full border border-accent/30" />
                <div className="w-1.5 h-1.5 rounded-full bg-accent/60" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[400px] md:h-[500px] relative">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-12 h-12 rounded-full border-2 border-accent/30 border-t-accent animate-spin" />
        </div>
      )}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'default' }}
        style={{ background: 'transparent' }}
        onCreated={() => setLoaded(true)}
      >
        <Scene />
      </Canvas>
    </div>
  );
}

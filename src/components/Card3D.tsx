'use client';

import { useRef, useMemo, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { RoundedBox, Float, MeshDistortMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

function NFCCard({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    // Base gentle animation + scroll-driven rotation
    const scrollRotY = scrollProgress * Math.PI * 0.6;
    const scrollRotX = scrollProgress * 0.3;

    groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.12 + scrollRotY;
    groupRef.current.rotation.x = Math.cos(t * 0.3) * 0.06 - scrollRotX;
    groupRef.current.rotation.z = Math.sin(t * 0.2) * 0.03;

    // Scroll-driven scale and position
    const s = 1 + scrollProgress * 0.15;
    groupRef.current.scale.setScalar(s);
    groupRef.current.position.y = scrollProgress * -0.5;
  });

  return (
    <Float speed={2} rotationIntensity={0.08} floatIntensity={0.4}>
      <group ref={groupRef}>
        {/* RGB glow planes behind card */}
        <mesh position={[-0.4, 0.2, -0.08]}>
          <planeGeometry args={[3.2, 2.2]} />
          <meshBasicMaterial color="#ff3366" transparent opacity={0.04} />
        </mesh>
        <mesh position={[0, 0, -0.06]}>
          <planeGeometry args={[3.6, 2.4]} />
          <meshBasicMaterial color="#00ff88" transparent opacity={0.05} />
        </mesh>
        <mesh position={[0.4, -0.2, -0.1]}>
          <planeGeometry args={[3.2, 2.2]} />
          <meshBasicMaterial color="#00aaff" transparent opacity={0.04} />
        </mesh>

        {/* Main card body */}
        <RoundedBox args={[3.4, 2.1, 0.06]} radius={0.12} smoothness={4}>
          <meshPhysicalMaterial
            color="#0a0a14"
            metalness={0.9}
            roughness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.05}
            envMapIntensity={1.5}
          />
        </RoundedBox>

        {/* Top RGB accent line */}
        <RGBLine position={[0, 0.72, 0.04]} width={2.8} />

        {/* NFC icon rings with color variation */}
        <mesh position={[1.2, -0.5, 0.04]}>
          <ringGeometry args={[0.18, 0.22, 32]} />
          <meshBasicMaterial color="#00ff88" transparent opacity={0.7} />
        </mesh>
        <mesh position={[1.2, -0.5, 0.04]}>
          <ringGeometry args={[0.1, 0.13, 32]} />
          <meshBasicMaterial color="#00aaff" transparent opacity={0.5} />
        </mesh>
        <mesh position={[1.2, -0.5, 0.04]}>
          <circleGeometry args={[0.05, 32]} />
          <meshBasicMaterial color="#ff3366" transparent opacity={0.8} />
        </mesh>

        {/* TapTech label */}
        <mesh position={[-0.5, 0.35, 0.04]}>
          <planeGeometry args={[1.2, 0.18]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
        </mesh>

        {/* Connect label */}
        <mesh position={[-0.7, 0.08, 0.04]}>
          <planeGeometry args={[0.8, 0.1]} />
          <meshBasicMaterial color="#00ff88" transparent opacity={0.15} />
        </mesh>

        {/* Bottom info line */}
        <mesh position={[-0.3, -0.6, 0.04]}>
          <planeGeometry args={[1.5, 0.06]} />
          <meshBasicMaterial color="#7c7c99" transparent opacity={0.08} />
        </mesh>

        {/* Bottom RGB accent line */}
        <RGBLine position={[0, -0.72, 0.04]} width={2.8} />

        {/* Edge reflection */}
        <mesh position={[0, 0, 0.035]}>
          <planeGeometry args={[3.35, 2.05]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.015} />
        </mesh>
      </group>
    </Float>
  );
}

function RGBLine({ position, width }: { position: [number, number, number]; width: number }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const shader = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      varying vec2 vUv;
      void main() {
        float t = uTime * 0.5 + vUv.x * 3.0;
        vec3 col = vec3(
          0.5 + 0.5 * sin(t),
          0.5 + 0.5 * sin(t + 2.094),
          0.5 + 0.5 * sin(t + 4.189)
        );
        gl_FragColor = vec4(col, 0.8);
      }
    `,
  }), []);

  useFrame((state) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh position={position}>
      <planeGeometry args={[width, 0.015]} />
      <shaderMaterial ref={matRef} {...shader} transparent />
    </mesh>
  );
}

function ParticleField({ scrollProgress }: { scrollProgress: number }) {
  const count = 120;
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      [1, 0.2, 0.4],
      [0, 1, 0.53],
      [0, 0.67, 1],
      [0.7, 0.53, 1],
    ];
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c[0];
      col[i * 3 + 1] = c[1];
      col[i * 3 + 2] = c[2];
    }
    return { positions: pos, colors: col };
  }, []);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.02 + scrollProgress * 0.5;
    ref.current.rotation.x = state.clock.elapsedTime * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} vertexColors transparent opacity={0.5} sizeAttenuation />
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
      <MeshDistortMaterial color={color} transparent opacity={0.1} distort={0.4} speed={2} />
    </mesh>
  );
}

function ScrollHandler({ onScroll }: { onScroll: (progress: number) => void }) {
  useFrame(() => {
    if (typeof window === 'undefined') return;
    const scrollY = window.scrollY;
    const maxScroll = window.innerHeight;
    const progress = Math.min(scrollY / maxScroll, 1);
    onScroll(progress);
  });

  return null;
}

function Scene({ scrollProgress }: { scrollProgress: number }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {/* RGB point lights */}
      <pointLight position={[-4, 2, 4]} intensity={0.8} color="#ff3366" />
      <pointLight position={[4, -1, 4]} intensity={0.6} color="#00aaff" />
      <pointLight position={[0, 3, 3]} intensity={0.5} color="#00ff88" />
      <pointLight position={[-2, -2, 3]} intensity={0.3} color="#b388ff" />

      <Environment preset="city" />
      <NFCCard scrollProgress={scrollProgress} />
      <ParticleField scrollProgress={scrollProgress} />

      {/* RGB glow orbs */}
      <GlowOrb position={[-3.5, 1, -2]} color="#ff3366" scale={1.3} />
      <GlowOrb position={[3.5, -1, -3]} color="#00aaff" scale={1.2} />
      <GlowOrb position={[0, 2, -4]} color="#00ff88" scale={1} />
      <GlowOrb position={[-2, -2, -3]} color="#b388ff" scale={0.8} />
    </>
  );
}

export default function Card3D() {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback((progress: number) => {
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) setError(true);
    } catch {
      setError(true);
    }
  }, []);

  if (error) {
    return (
      <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] flex items-center justify-center relative">
        <div className="w-[280px] sm:w-[340px] h-[175px] sm:h-[210px] rounded-2xl bg-bg-card border border-accent/20 relative overflow-hidden rgb-pulse">
          <div className="absolute top-0 left-0 right-0 rgb-line" />
          <div className="p-6 flex flex-col justify-between h-full">
            <div>
              <p className="font-[family-name:var(--font-syne)] font-extrabold text-lg text-txt">TapTech</p>
              <p className="text-accent text-xs font-bold tracking-wider">CONNECT</p>
            </div>
            <div className="flex items-end justify-between">
              <p className="text-dim text-[10px]">taptechconnect.com</p>
              <div className="flex flex-col items-center gap-1">
                <div className="w-5 h-5 rounded-full border-2 border-accent/50" />
                <div className="w-3 h-3 rounded-full border border-accent-2/40" />
                <div className="w-1.5 h-1.5 rounded-full bg-neon-red/60" />
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 rgb-line" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] relative">
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
        <ScrollHandler onScroll={handleScroll} />
        <Scene scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}

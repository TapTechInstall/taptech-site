'use client';

import { useRef, useMemo, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Float, MeshDistortMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

const dragConfig = {
  dragSensitivityX: 0.01,
  dragSensitivityY: 0.008,
  damping: 0.12,
  friction: 0.96,
  maxTiltX: 0.45,
  minVelocityCutoff: 0.0001,
  autoRotateSpeed: 0.0025,
};

function NFCCard({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);

  const dragState = useRef({
    dragging: false,
    lastX: 0,
    lastY: 0,
    velocityX: 0,
    velocityY: 0,
    rotationX: 0,
    rotationY: 0,
    pointerId: null as number | null,
  });

  const targetRotation = useRef({ x: 0, y: 0 });

  const onPointerDown = useCallback((e: THREE.Event & { stopPropagation: () => void; pointerId: number; clientX: number; clientY: number; target: { setPointerCapture?: (id: number) => void } }) => {
    e.stopPropagation();
    if (e.target.setPointerCapture) {
      e.target.setPointerCapture(e.pointerId);
    }
    const state = dragState.current;
    state.dragging = true;
    state.pointerId = e.pointerId;
    state.lastX = e.clientX;
    state.lastY = e.clientY;
    state.velocityX = 0;
    state.velocityY = 0;
  }, []);

  const onPointerMove = useCallback((e: THREE.Event & { pointerId: number; clientX: number; clientY: number }) => {
    const state = dragState.current;
    if (!state.dragging) return;
    if (state.pointerId !== null && e.pointerId !== state.pointerId) return;

    const deltaX = e.clientX - state.lastX;
    const deltaY = e.clientY - state.lastY;
    state.lastX = e.clientX;
    state.lastY = e.clientY;

    state.velocityX = deltaX * dragConfig.dragSensitivityX;
    state.velocityY = deltaY * dragConfig.dragSensitivityY;

    targetRotation.current.y += state.velocityX;
    targetRotation.current.x = Math.max(
      -dragConfig.maxTiltX,
      Math.min(dragConfig.maxTiltX, targetRotation.current.x + state.velocityY)
    );
  }, []);

  const endDrag = useCallback((e: THREE.Event & { pointerId: number }) => {
    const state = dragState.current;
    if (state.pointerId !== null && e.pointerId !== state.pointerId) return;
    state.dragging = false;
    state.pointerId = null;
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    const state = dragState.current;

    if (!state.dragging) {
      // Apply momentum
      targetRotation.current.y += state.velocityX;
      targetRotation.current.x += state.velocityY;

      state.velocityX *= dragConfig.friction;
      state.velocityY *= dragConfig.friction;

      if (Math.abs(state.velocityX) < dragConfig.minVelocityCutoff) state.velocityX = 0;
      if (Math.abs(state.velocityY) < dragConfig.minVelocityCutoff) state.velocityY = 0;

      // Resume auto-rotate when momentum settles, slowing near front/back face
      // so the card pauses naturally where it reads best
      if (state.velocityX === 0 && state.velocityY === 0) {
        const cosAngle = Math.cos(targetRotation.current.y);
        // Slow to 25% near front-face (cos≈1) and back-face (cos≈-1), full speed at edge-on (cos≈0)
        const readabilityFactor = 0.25 + 0.75 * (1 - cosAngle * cosAngle);
        targetRotation.current.y += dragConfig.autoRotateSpeed * readabilityFactor;
      }
    }

    // Clamp X
    targetRotation.current.x = Math.max(
      -dragConfig.maxTiltX,
      Math.min(dragConfig.maxTiltX, targetRotation.current.x)
    );

    // Smooth interpolation
    state.rotationX += (targetRotation.current.x - state.rotationX) * dragConfig.damping;
    state.rotationY += (targetRotation.current.y - state.rotationY) * dragConfig.damping;

    // Apply scroll offset on top of drag rotation
    const scrollRotY = scrollProgress * Math.PI * 0.6;
    const scrollRotX = scrollProgress * 0.3;

    groupRef.current.rotation.x = state.rotationX - scrollRotX;
    groupRef.current.rotation.y = state.rotationY + scrollRotY;
    groupRef.current.rotation.z = Math.sin(state.rotationY * 0.3) * 0.03;

    // Scroll-driven scale and position
    const s = 1 + scrollProgress * 0.15;
    groupRef.current.scale.setScalar(s);
    groupRef.current.position.y = scrollProgress * -0.5;
  });

  return (
    <Float speed={2} rotationIntensity={0.08} floatIntensity={0.4}>
      <group
        ref={groupRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
      >
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

        {/* Main card body -- standard card proportions with visible edge thickness */}
        <RoundedBox args={[3.37, 2.125, 0.08]} radius={0.08} smoothness={6}>
          <meshPhysicalMaterial
            color="#0d0d18"
            metalness={0.6}
            roughness={0.3}
            clearcoat={0.4}
            clearcoatRoughness={0.5}
            envMapIntensity={1.2}
          />
        </RoundedBox>

        {/* Subtle matte front face overlay */}
        <mesh position={[0, 0, 0.042]}>
          <planeGeometry args={[3.3, 2.06]} />
          <meshPhysicalMaterial
            color="#0f0f1a"
            metalness={0.2}
            roughness={0.7}
            transparent
            opacity={0.6}
          />
        </mesh>

        {/* Invisible larger hit area for easier dragging */}
        <mesh visible={false}>
          <planeGeometry args={[4, 2.8]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>

        {/* Top RGB accent line */}
        <RGBLine position={[0, 0.74, 0.043]} width={2.8} />

        {/* Edge highlight strips -- visible on front face */}
        <mesh position={[0, 0.74, 0.043]}>
          <planeGeometry args={[3.3, 0.008]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.12} />
        </mesh>
        <mesh position={[0, -0.74, 0.043]}>
          <planeGeometry args={[3.3, 0.008]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.08} />
        </mesh>

        {/* Chip rectangle -- EMV contact pad */}
        <mesh position={[-1.05, -0.15, 0.043]}>
          <planeGeometry args={[0.35, 0.28]} />
          <meshPhysicalMaterial
            color="#b8a040"
            metalness={0.7}
            roughness={0.3}
            transparent
            opacity={0.4}
          />
        </mesh>
        {/* Chip inner lines */}
        <mesh position={[-1.05, -0.15, 0.044]}>
          <planeGeometry args={[0.25, 0.005]} />
          <meshBasicMaterial color="#d4be5a" transparent opacity={0.3} />
        </mesh>
        <mesh position={[-1.05, -0.1, 0.044]}>
          <planeGeometry args={[0.25, 0.005]} />
          <meshBasicMaterial color="#d4be5a" transparent opacity={0.2} />
        </mesh>
        <mesh position={[-1.05, -0.2, 0.044]}>
          <planeGeometry args={[0.25, 0.005]} />
          <meshBasicMaterial color="#d4be5a" transparent opacity={0.2} />
        </mesh>

        {/* NFC tap icon -- bottom right */}
        <mesh position={[1.2, -0.55, 0.043]}>
          <ringGeometry args={[0.14, 0.17, 32]} />
          <meshBasicMaterial color="#00ff88" transparent opacity={0.5} />
        </mesh>
        <mesh position={[1.2, -0.55, 0.043]}>
          <ringGeometry args={[0.08, 0.1, 32]} />
          <meshBasicMaterial color="#00aaff" transparent opacity={0.35} />
        </mesh>
        <mesh position={[1.2, -0.55, 0.043]}>
          <circleGeometry args={[0.035, 32]} />
          <meshBasicMaterial color="#ff3366" transparent opacity={0.6} />
        </mesh>

        {/* TapTech label area */}
        <mesh position={[-0.45, 0.45, 0.043]}>
          <planeGeometry args={[1.1, 0.16]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.08} />
        </mesh>

        {/* Connect sub-label */}
        <mesh position={[-0.65, 0.2, 0.043]}>
          <planeGeometry args={[0.7, 0.08]} />
          <meshBasicMaterial color="#00ff88" transparent opacity={0.12} />
        </mesh>

        {/* Bottom info line */}
        <mesh position={[-0.2, -0.65, 0.043]}>
          <planeGeometry args={[1.4, 0.05]} />
          <meshBasicMaterial color="#7c7c99" transparent opacity={0.06} />
        </mesh>

        {/* URL text line */}
        <mesh position={[0.8, -0.65, 0.043]}>
          <planeGeometry args={[0.9, 0.04]} />
          <meshBasicMaterial color="#00e5a0" transparent opacity={0.08} />
        </mesh>

        {/* Bottom RGB accent line */}
        <RGBLine position={[0, -0.74, 0.043]} width={2.8} />

        {/* Back face -- slight contrast */}
        <mesh position={[0, 0, -0.042]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[3.3, 2.06]} />
          <meshPhysicalMaterial
            color="#08080f"
            metalness={0.3}
            roughness={0.6}
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* Back magnetic stripe */}
        <mesh position={[0, 0.35, -0.043]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[3.2, 0.25]} />
          <meshBasicMaterial color="#1a1a2a" transparent opacity={0.5} />
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
    <div
      className="w-full h-[300px] sm:h-[400px] md:h-[500px] relative"
      style={{ touchAction: 'none' }}
    >
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-12 h-12 rounded-full border-2 border-accent/30 border-t-accent animate-spin" />
        </div>
      )}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'default' }}
        style={{ background: 'transparent', touchAction: 'none' }}
        onCreated={() => setLoaded(true)}
      >
        <ScrollHandler onScroll={handleScroll} />
        <Scene scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}

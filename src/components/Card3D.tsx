'use client';

import { useRef, useMemo, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Float, MeshDistortMaterial, Environment, Text } from '@react-three/drei';
import * as THREE from 'three';

interface CardFields {
  name: string;
  title: string;
  phone: string;
  website: string;
}

const dragConfig = {
  dragSensitivityX: 0.01,
  dragSensitivityY: 0.008,
  damping: 0.12,
  friction: 0.96,
  maxTiltX: 0.45,
  minVelocityCutoff: 0.0001,
  autoRotateSpeed: 0.0025,
};

// Animated NFC waves that pulse outward from the tap icon
function NFCWaves({ position }: { position: [number, number, number] }) {
  const wave1Ref = useRef<THREE.Mesh>(null);
  const wave2Ref = useRef<THREE.Mesh>(null);
  const wave3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const refs = [wave1Ref, wave2Ref, wave3Ref];
    refs.forEach((ref, i) => {
      if (!ref.current) return;
      // Stagger each wave ring
      const phase = (t * 1.2 + i * 0.8) % 3;
      const scale = 1 + phase * 0.6;
      const opacity = Math.max(0, 0.3 - phase * 0.1);
      ref.current.scale.setScalar(scale);
      (ref.current.material as THREE.MeshBasicMaterial).opacity = opacity;
    });
  });

  return (
    <group position={position}>
      <mesh ref={wave1Ref}>
        <ringGeometry args={[0.2, 0.22, 32]} />
        <meshBasicMaterial color="#00ff88" transparent opacity={0.3} />
      </mesh>
      <mesh ref={wave2Ref}>
        <ringGeometry args={[0.2, 0.22, 32]} />
        <meshBasicMaterial color="#00aaff" transparent opacity={0.2} />
      </mesh>
      <mesh ref={wave3Ref}>
        <ringGeometry args={[0.2, 0.22, 32]} />
        <meshBasicMaterial color="#b388ff" transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

// Holographic shimmer overlay that shifts color with viewing angle
function HolographicShimmer({ position }: { position: [number, number, number] }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const shader = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vViewDir;
      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vViewDir = normalize(cameraPosition - worldPos.xyz);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vViewDir;
      void main() {
        // Fresnel-based iridescence -- shifts color based on viewing angle
        float fresnel = 1.0 - abs(dot(vNormal, vViewDir));
        fresnel = pow(fresnel, 3.0);

        float t = uTime * 0.3 + vUv.x * 4.0 + vUv.y * 2.0;
        vec3 col = vec3(
          0.5 + 0.5 * sin(t + fresnel * 6.0),
          0.5 + 0.5 * sin(t + 2.094 + fresnel * 6.0),
          0.5 + 0.5 * sin(t + 4.189 + fresnel * 6.0)
        );

        // Only visible at glancing angles
        float alpha = fresnel * 0.12;
        gl_FragColor = vec4(col, alpha);
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
      <planeGeometry args={[3.3, 2.06]} />
      <shaderMaterial ref={matRef} {...shader} transparent />
    </mesh>
  );
}

function NFCCard({ scrollProgress, fields }: { scrollProgress: number; fields: CardFields }) {
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
      if (state.velocityX === 0 && state.velocityY === 0) {
        const cosAngle = Math.cos(targetRotation.current.y);
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

        {/* Holographic shimmer -- shifts color with viewing angle */}
        <HolographicShimmer position={[0, 0, 0.0425]} />

        {/* Invisible larger hit area for easier dragging */}
        <mesh visible={false}>
          <planeGeometry args={[4, 2.8]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>

        {/* Top RGB accent line */}
        <RGBLine position={[0, 0.74, 0.043]} width={2.8} />

        {/* Edge highlight strips */}
        <mesh position={[0, 0.74, 0.043]}>
          <planeGeometry args={[3.3, 0.008]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.12} />
        </mesh>
        <mesh position={[0, -0.74, 0.043]}>
          <planeGeometry args={[3.3, 0.008]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.08} />
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

        {/* NFC pulse waves radiating from tap icon */}
        <NFCWaves position={[1.2, -0.55, 0.044]} />

        {/* TapTech label */}
        <Text
          position={[-0.45, 0.48, 0.044]}
          fontSize={0.18}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          fillOpacity={0.9}
        >
          TapTech
        </Text>

        {/* Connect sub-label */}
        <Text
          position={[-0.62, 0.26, 0.044]}
          fontSize={0.08}
          color="#00ff88"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.2}
          fillOpacity={0.8}
        >
          CONNECT
        </Text>

        {/* Cardholder name -- live from input */}
        {fields.name ? (
          <Text
            position={[-0.85, -0.15, 0.044]}
            fontSize={0.13}
            color="#ffffff"
            anchorX="left"
            anchorY="middle"
            maxWidth={2.4}
            fillOpacity={0.85}
          >
            {fields.name}
          </Text>
        ) : (
          <mesh position={[-0.85, -0.2, 0.043]}>
            <planeGeometry args={[1.2, 0.06]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.06} />
          </mesh>
        )}

        {/* Title/business -- live from input */}
        {fields.title ? (
          <Text
            position={[-0.85, -0.33, 0.044]}
            fontSize={0.09}
            color="#7c7c99"
            anchorX="left"
            anchorY="middle"
            maxWidth={2.4}
            fillOpacity={0.7}
          >
            {fields.title}
          </Text>
        ) : (
          <mesh position={[-0.95, -0.35, 0.043]}>
            <planeGeometry args={[0.9, 0.04]} />
            <meshBasicMaterial color="#7c7c99" transparent opacity={0.05} />
          </mesh>
        )}

        {/* Phone -- live from input */}
        {fields.phone ? (
          <Text
            position={[-0.2, -0.65, 0.044]}
            fontSize={0.08}
            color="#7c7c99"
            anchorX="center"
            anchorY="middle"
            fillOpacity={0.6}
          >
            {fields.phone}
          </Text>
        ) : (
          <mesh position={[-0.2, -0.65, 0.043]}>
            <planeGeometry args={[1.4, 0.05]} />
            <meshBasicMaterial color="#7c7c99" transparent opacity={0.06} />
          </mesh>
        )}

        {/* Website -- live from input */}
        {fields.website ? (
          <Text
            position={[0.8, -0.65, 0.044]}
            fontSize={0.08}
            color="#00e5a0"
            anchorX="center"
            anchorY="middle"
            fillOpacity={0.7}
          >
            {fields.website}
          </Text>
        ) : (
          <mesh position={[0.8, -0.65, 0.043]}>
            <planeGeometry args={[0.9, 0.04]} />
            <meshBasicMaterial color="#00e5a0" transparent opacity={0.08} />
          </mesh>
        )}

        {/* Bottom RGB accent line */}
        <RGBLine position={[0, -0.74, 0.043]} width={2.8} />

        {/* Back face -- clean, no magnetic stripe */}
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

        {/* Back: TapTech branding centered */}
        <mesh position={[0, 0.1, -0.043]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[1.0, 0.14]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.06} />
        </mesh>

        {/* Back: URL line */}
        <mesh position={[0, -0.15, -0.043]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[1.3, 0.04]} />
          <meshBasicMaterial color="#00e5a0" transparent opacity={0.06} />
        </mesh>

        {/* Back: NFC icon mirror */}
        <mesh position={[0, -0.55, -0.043]} rotation={[0, Math.PI, 0]}>
          <ringGeometry args={[0.1, 0.12, 32]} />
          <meshBasicMaterial color="#00ff88" transparent opacity={0.15} />
        </mesh>
        <mesh position={[0, -0.55, -0.043]} rotation={[0, Math.PI, 0]}>
          <circleGeometry args={[0.03, 32]} />
          <meshBasicMaterial color="#00aaff" transparent opacity={0.2} />
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

function Scene({ scrollProgress, fields }: { scrollProgress: number; fields: CardFields }) {
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
      <NFCCard scrollProgress={scrollProgress} fields={fields} />
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
  const [fields, setFields] = useState<CardFields>({
    name: '',
    title: '',
    phone: '',
    website: '',
  });
  const [showForm, setShowForm] = useState(false);

  const handleScroll = useCallback((progress: number) => {
    setScrollProgress(progress);
  }, []);

  const updateField = useCallback((key: keyof CardFields, value: string) => {
    setFields(prev => ({ ...prev, [key]: value }));
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

  const hasAnyField = fields.name || fields.title || fields.phone || fields.website;

  return (
    <div className="w-full flex flex-col items-center gap-4">
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
          <Scene scrollProgress={scrollProgress} fields={fields} />
        </Canvas>
      </div>

      {/* Customize toggle */}
      <button
        onClick={() => setShowForm(prev => !prev)}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-accent/20 bg-accent/[0.06] text-accent text-sm font-semibold tracking-wide hover:bg-accent/[0.12] transition-all duration-300"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
        {showForm ? 'Hide Editor' : 'Customize Your Card'}
      </button>

      {/* Input form */}
      {showForm && (
        <div className="w-full max-w-sm space-y-3 px-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <div>
            <label className="block text-dim text-xs mb-1 tracking-wide uppercase">Your Name</label>
            <input
              type="text"
              value={fields.name}
              onChange={e => updateField('name', e.target.value)}
              placeholder="John Smith"
              maxLength={30}
              className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-accent/40 focus:bg-accent/[0.04] transition-all"
            />
          </div>
          <div>
            <label className="block text-dim text-xs mb-1 tracking-wide uppercase">Title / Business</label>
            <input
              type="text"
              value={fields.title}
              onChange={e => updateField('title', e.target.value)}
              placeholder="Owner, Riverside Barbershop"
              maxLength={40}
              className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-accent/40 focus:bg-accent/[0.04] transition-all"
            />
          </div>
          <div>
            <label className="block text-dim text-xs mb-1 tracking-wide uppercase">Phone</label>
            <input
              type="tel"
              value={fields.phone}
              onChange={e => updateField('phone', e.target.value)}
              placeholder="(951) 555-0123"
              maxLength={20}
              className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-accent/40 focus:bg-accent/[0.04] transition-all"
            />
          </div>
          <div>
            <label className="block text-dim text-xs mb-1 tracking-wide uppercase">Website</label>
            <input
              type="text"
              value={fields.website}
              onChange={e => updateField('website', e.target.value)}
              placeholder="yourbusiness.com"
              maxLength={30}
              className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-accent/40 focus:bg-accent/[0.04] transition-all"
            />
          </div>
          {hasAnyField && (
            <p className="text-center text-dim text-xs pt-1">
              See your info appear on the card in real time
            </p>
          )}
        </div>
      )}
    </div>
  );
}

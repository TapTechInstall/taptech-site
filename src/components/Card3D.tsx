'use client';

import { useRef, useMemo, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
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

function ContactlessSignal({ position }: { position: [number, number, number] }) {
  const arcCount = 5;
  const refs = Array.from({ length: arcCount }, () => useRef<THREE.Mesh>(null));

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    refs.forEach((ref, i) => {
      if (!ref.current) return;
      const speed = 0.9;
      const cycle = (t * speed + i * 0.55) % (arcCount * 0.55);
      const life = cycle / (arcCount * 0.55);
      const scale = 1 + life * 0.6;
      ref.current.scale.setScalar(scale);
      const fadeIn = Math.min(life / 0.15, 1);
      const fadeOut = Math.max(0, 1 - (life - 0.5) / 0.5);
      const peak = 0.6 - i * 0.06;
      (ref.current.material as THREE.MeshBasicMaterial).opacity =
        fadeIn * fadeOut * peak;
    });
  });

  const arcSpan = 2.1;
  const arcCenter = -arcSpan / 2;

  const arcs = [
    { inner: 0.22, outer: 0.26 },
    { inner: 0.38, outer: 0.42 },
    { inner: 0.54, outer: 0.58 },
    { inner: 0.70, outer: 0.74 },
    { inner: 0.86, outer: 0.90 },
  ];

  return (
    <group position={position}>
      {arcs.map((arc, i) => (
        <mesh key={i} ref={refs[i]}>
          <ringGeometry args={[arc.inner, arc.outer, 48, 1, arcCenter, arcSpan]} />
          <meshBasicMaterial color="#D4AF37" transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

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
        float fresnel = 1.0 - abs(dot(vNormal, vViewDir));
        fresnel = pow(fresnel, 3.0);
        float t = uTime * 0.3 + vUv.x * 4.0 + vUv.y * 2.0;
        // Gold shimmer tones
        vec3 col = vec3(
          0.83 + 0.17 * sin(t + fresnel * 4.0),
          0.69 + 0.15 * sin(t + 1.5 + fresnel * 4.0),
          0.22 + 0.1 * sin(t + 3.0 + fresnel * 4.0)
        );
        float alpha = fresnel * 0.15;
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
      targetRotation.current.y += state.velocityX;
      targetRotation.current.x += state.velocityY;

      state.velocityX *= dragConfig.friction;
      state.velocityY *= dragConfig.friction;

      if (Math.abs(state.velocityX) < dragConfig.minVelocityCutoff) state.velocityX = 0;
      if (Math.abs(state.velocityY) < dragConfig.minVelocityCutoff) state.velocityY = 0;

      if (state.velocityX === 0 && state.velocityY === 0) {
        const cosAngle = Math.cos(targetRotation.current.y);
        const readabilityFactor = 0.25 + 0.75 * (1 - cosAngle * cosAngle);
        targetRotation.current.y += dragConfig.autoRotateSpeed * readabilityFactor;
      }
    }

    targetRotation.current.x = Math.max(
      -dragConfig.maxTiltX,
      Math.min(dragConfig.maxTiltX, targetRotation.current.x)
    );

    state.rotationX += (targetRotation.current.x - state.rotationX) * dragConfig.damping;
    state.rotationY += (targetRotation.current.y - state.rotationY) * dragConfig.damping;

    const scrollRotY = scrollProgress * Math.PI * 0.6;
    const scrollRotX = scrollProgress * 0.3;

    groupRef.current.rotation.x = state.rotationX - scrollRotX;
    groupRef.current.rotation.y = state.rotationY + scrollRotY;
    groupRef.current.rotation.z = Math.sin(state.rotationY * 0.3) * 0.03;

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
        {/* Gold glow planes behind card */}
        <mesh position={[-0.3, 0.15, -0.08]}>
          <planeGeometry args={[3.2, 2.2]} />
          <meshBasicMaterial color="#D4AF37" transparent opacity={0.04} />
        </mesh>
        <mesh position={[0, 0, -0.06]}>
          <planeGeometry args={[3.6, 2.4]} />
          <meshBasicMaterial color="#B8960C" transparent opacity={0.03} />
        </mesh>
        <mesh position={[0.3, -0.15, -0.1]}>
          <planeGeometry args={[3.2, 2.2]} />
          <meshBasicMaterial color="#E8D48B" transparent opacity={0.03} />
        </mesh>

        {/* Main card body -- cream/white with gold metallic finish */}
        <RoundedBox args={[3.37, 2.125, 0.08]} radius={0.08} smoothness={6}>
          <meshPhysicalMaterial
            color="#F5F0E0"
            metalness={0.3}
            roughness={0.4}
            clearcoat={0.5}
            clearcoatRoughness={0.4}
            envMapIntensity={1.0}
          />
        </RoundedBox>

        {/* Front face overlay */}
        <mesh position={[0, 0, 0.042]}>
          <planeGeometry args={[3.3, 2.06]} />
          <meshPhysicalMaterial
            color="#FAF8F0"
            metalness={0.1}
            roughness={0.7}
            transparent
            opacity={0.6}
          />
        </mesh>

        {/* Holographic shimmer */}
        <HolographicShimmer position={[0, 0, 0.0425]} />

        {/* Invisible hit area */}
        <mesh visible={false}>
          <planeGeometry args={[4, 2.8]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>

        {/* Top gold accent line */}
        <GoldLine position={[0, 0.74, 0.043]} width={2.8} />

        {/* Edge highlights */}
        <mesh position={[0, 0.74, 0.043]}>
          <planeGeometry args={[3.3, 0.008]} />
          <meshBasicMaterial color="#D4AF37" transparent opacity={0.2} />
        </mesh>
        <mesh position={[0, -0.74, 0.043]}>
          <planeGeometry args={[3.3, 0.008]} />
          <meshBasicMaterial color="#D4AF37" transparent opacity={0.12} />
        </mesh>

        {/* Contactless signal */}
        <ContactlessSignal position={[2.0, 0, 0.02]} />

        {/* Brand: TapTech */}
        <Text
          position={[-1.28, 0.62, 0.044]}
          fontSize={0.14}
          color="#1a1a1a"
          anchorX="left"
          anchorY="middle"
          fillOpacity={0.85}
          letterSpacing={0.02}
        >
          TapTech
        </Text>

        {/* Brand: CONNECT */}
        <Text
          position={[-1.28, 0.46, 0.044]}
          fontSize={0.065}
          color="#D4AF37"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.25}
          fillOpacity={0.7}
        >
          CONNECT
        </Text>

        {/* Cardholder name */}
        {fields.name ? (
          <Text
            position={[-1.28, -0.05, 0.044]}
            fontSize={0.17}
            color="#1a1a1a"
            anchorX="left"
            anchorY="middle"
            maxWidth={2.2}
            fillOpacity={0.95}
            letterSpacing={0.01}
          >
            {fields.name}
          </Text>
        ) : (
          <group position={[-1.28, -0.05, 0.043]}>
            <mesh position={[0.55, 0, 0]}>
              <planeGeometry args={[1.1, 0.045]} />
              <meshBasicMaterial color="#1a1a1a" transparent opacity={0.06} />
            </mesh>
          </group>
        )}

        {/* Title/business */}
        {fields.title ? (
          <Text
            position={[-1.28, -0.26, 0.044]}
            fontSize={0.085}
            color="#6b6b6b"
            anchorX="left"
            anchorY="middle"
            maxWidth={2.2}
            fillOpacity={0.65}
            letterSpacing={0.03}
          >
            {fields.title}
          </Text>
        ) : (
          <group position={[-1.28, -0.26, 0.043]}>
            <mesh position={[0.4, 0, 0]}>
              <planeGeometry args={[0.8, 0.03]} />
              <meshBasicMaterial color="#6b6b6b" transparent opacity={0.06} />
            </mesh>
          </group>
        )}

        {/* Separator */}
        <mesh position={[-0.45, -0.46, 0.043]}>
          <planeGeometry args={[1.66, 0.003]} />
          <meshBasicMaterial color="#D4AF37" transparent opacity={0.15} />
        </mesh>

        {/* Phone */}
        {fields.phone ? (
          <Text
            position={[-1.28, -0.58, 0.044]}
            fontSize={0.065}
            color="#6b6b6b"
            anchorX="left"
            anchorY="middle"
            fillOpacity={0.55}
            letterSpacing={0.04}
          >
            {fields.phone}
          </Text>
        ) : (
          <group position={[-1.28, -0.58, 0.043]}>
            <mesh position={[0.4, 0, 0]}>
              <planeGeometry args={[0.8, 0.025]} />
              <meshBasicMaterial color="#6b6b6b" transparent opacity={0.05} />
            </mesh>
          </group>
        )}

        {/* Website */}
        {fields.website ? (
          <Text
            position={[-1.28, -0.70, 0.044]}
            fontSize={0.06}
            color="#D4AF37"
            anchorX="left"
            anchorY="middle"
            fillOpacity={0.6}
            letterSpacing={0.03}
          >
            {fields.website}
          </Text>
        ) : (
          <group position={[-1.28, -0.70, 0.043]}>
            <mesh position={[0.35, 0, 0]}>
              <planeGeometry args={[0.7, 0.02]} />
              <meshBasicMaterial color="#D4AF37" transparent opacity={0.06} />
            </mesh>
          </group>
        )}

        {/* Bottom gold accent line */}
        <GoldLine position={[0, -0.74, 0.043]} width={2.8} />

        {/* Back face */}
        <mesh position={[0, 0, -0.042]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[3.3, 2.06]} />
          <meshPhysicalMaterial
            color="#F0EBD8"
            metalness={0.2}
            roughness={0.5}
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* Back: branding */}
        <mesh position={[0, 0.1, -0.043]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[1.0, 0.14]} />
          <meshBasicMaterial color="#1a1a1a" transparent opacity={0.08} />
        </mesh>

        {/* Back: URL line */}
        <mesh position={[0, -0.15, -0.043]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[1.3, 0.04]} />
          <meshBasicMaterial color="#D4AF37" transparent opacity={0.1} />
        </mesh>

        {/* Back: NFC icon */}
        <mesh position={[0, -0.55, -0.043]} rotation={[0, Math.PI, 0]}>
          <ringGeometry args={[0.1, 0.12, 32]} />
          <meshBasicMaterial color="#D4AF37" transparent opacity={0.2} />
        </mesh>
        <mesh position={[0, -0.55, -0.043]} rotation={[0, Math.PI, 0]}>
          <circleGeometry args={[0.03, 32]} />
          <meshBasicMaterial color="#B8960C" transparent opacity={0.25} />
        </mesh>
      </group>
    </Float>
  );
}

function GoldLine({ position, width }: { position: [number, number, number]; width: number }) {
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
        // Gold shimmer
        vec3 col = vec3(
          0.83 + 0.1 * sin(t),
          0.69 + 0.1 * sin(t + 1.0),
          0.22 + 0.05 * sin(t + 2.0)
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
      [0.83, 0.69, 0.22],
      [0.72, 0.59, 0.05],
      [0.91, 0.83, 0.55],
      [0.55, 0.45, 0.33],
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
      <pointsMaterial size={0.025} vertexColors transparent opacity={0.4} sizeAttenuation />
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
      <MeshDistortMaterial color={color} transparent opacity={0.06} distort={0.4} speed={2} />
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
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />

      {/* Warm gold point lights */}
      <pointLight position={[-4, 2, 4]} intensity={0.6} color="#D4AF37" />
      <pointLight position={[4, -1, 4]} intensity={0.4} color="#B8960C" />
      <pointLight position={[0, 3, 3]} intensity={0.5} color="#FFFFFF" />
      <pointLight position={[-2, -2, 3]} intensity={0.3} color="#E8D48B" />

      <Environment preset="city" />
      <NFCCard scrollProgress={scrollProgress} fields={fields} />
      <ParticleField scrollProgress={scrollProgress} />

      {/* Gold glow orbs */}
      <GlowOrb position={[-3.5, 1, -2]} color="#D4AF37" scale={1.3} />
      <GlowOrb position={[3.5, -1, -3]} color="#B8960C" scale={1.2} />
      <GlowOrb position={[0, 2, -4]} color="#E8D48B" scale={1} />
    </>
  );
}

function ResponsiveCamera() {
  const { camera, size } = useThree();

  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    if (size.width < 360) {
      cam.position.z = 8;
      cam.fov = 60;
    } else if (size.width < 480) {
      cam.position.z = 7.5;
      cam.fov = 55;
    } else if (size.width < 640) {
      cam.position.z = 7;
      cam.fov = 50;
    } else if (size.width < 900) {
      cam.position.z = 6.5;
      cam.fov = 48;
    } else {
      cam.position.z = 6;
      cam.fov = 45;
    }
    cam.updateProjectionMatrix();
  }, [camera, size.width]);

  return null;
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
      <div className="w-full h-[340px] sm:h-[420px] md:h-[520px] flex items-center justify-center relative">
        <div className="w-[280px] sm:w-[340px] h-[175px] sm:h-[210px] rounded-2xl bg-white border border-accent/20 relative overflow-hidden rgb-pulse">
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
                <div className="w-1.5 h-1.5 rounded-full bg-accent/60" />
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
        className="w-full h-[340px] sm:h-[420px] md:h-[520px] relative overflow-visible"
        style={{ touchAction: 'none' }}
      >
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="w-12 h-12 rounded-full border-2 border-accent/30 border-t-accent animate-spin" />
          </div>
        )}
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: 'default' }}
          style={{ background: 'transparent', touchAction: 'none' }}
          onCreated={() => setLoaded(true)}
        >
          <ResponsiveCamera />
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
              className="w-full px-3 py-2 rounded-lg bg-white border border-border text-txt text-sm placeholder:text-dim/30 focus:outline-none focus:border-accent/40 focus:bg-accent/[0.02] transition-all"
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
              className="w-full px-3 py-2 rounded-lg bg-white border border-border text-txt text-sm placeholder:text-dim/30 focus:outline-none focus:border-accent/40 focus:bg-accent/[0.02] transition-all"
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
              className="w-full px-3 py-2 rounded-lg bg-white border border-border text-txt text-sm placeholder:text-dim/30 focus:outline-none focus:border-accent/40 focus:bg-accent/[0.02] transition-all"
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
              className="w-full px-3 py-2 rounded-lg bg-white border border-border text-txt text-sm placeholder:text-dim/30 focus:outline-none focus:border-accent/40 focus:bg-accent/[0.02] transition-all"
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

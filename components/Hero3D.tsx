"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  ContactShadows,
  MeshReflectorMaterial,
  OrbitControls,
  PerformanceMonitor,
  useGLTF,
  Html,
  useProgress,
} from "@react-three/drei";
import { EffectComposer, Bloom, ToneMapping } from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { wraps, cameraPresets, type Wrap, type CameraPreset } from "@/lib/wraps";
import { useDeviceTier } from "@/lib/device";

const MODEL_LOCAL = "/models/lambo.glb";
const MODEL_CDN = "https://threejs.org/examples/models/gltf/ferrari.glb";

useGLTF.preload(MODEL_CDN, true);

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function lerpColor(a: THREE.Color, b: THREE.Color, t: number) {
  a.r = lerp(a.r, b.r, t);
  a.g = lerp(a.g, b.g, t);
  a.b = lerp(a.b, b.b, t);
}

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

function CarModel({ target }: { target: Wrap }) {
  const groupRef = useRef<THREE.Group>(null);
  const [modelUrl, setModelUrl] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(MODEL_LOCAL, { method: "HEAD" })
      .then((r) => {
        if (cancelled) return;
        setModelUrl(r.ok ? MODEL_LOCAL : MODEL_CDN);
      })
      .catch(() => {
        if (!cancelled) setModelUrl(MODEL_CDN);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!modelUrl) return null;
  return <CarInner url={modelUrl} target={target} groupRef={groupRef} />;
}

function CarInner({
  url,
  target,
  groupRef,
}: {
  url: string;
  target: Wrap;
  groupRef: React.RefObject<THREE.Group>;
}) {
  const { scene } = useGLTF(url);
  const cloned = useMemo(() => scene.clone(true), [scene]);

  const bodyMat = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const glassMat = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const chromeMat = useRef<THREE.MeshStandardMaterial | null>(null);
  const trimMat = useRef<THREE.MeshStandardMaterial | null>(null);
  const carbonMat = useRef<THREE.MeshStandardMaterial | null>(null);
  const wheelMat = useRef<THREE.MeshStandardMaterial | null>(null);
  const tireMat = useRef<THREE.MeshStandardMaterial | null>(null);
  const lightOnMat = useRef<THREE.MeshStandardMaterial | null>(null);
  const lightRedMat = useRef<THREE.MeshStandardMaterial | null>(null);
  const interiorMat = useRef<THREE.MeshStandardMaterial | null>(null);

  useMemo(() => {
    bodyMat.current = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(target.hex),
      metalness: target.metalness,
      roughness: target.roughness,
      clearcoat: target.clearcoat,
      clearcoatRoughness: target.clearcoatRoughness,
    });
    glassMat.current = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0x1a1f24),
      metalness: 0.25,
      roughness: 0.05,
      transmission: 0.8,
      transparent: true,
      opacity: 0.6,
      ior: 1.45,
      thickness: 0.3,
    });
    chromeMat.current = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xeaeaea),
      metalness: 1.0,
      roughness: 0.08,
    });
    trimMat.current = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xb8b8b8),
      metalness: 0.9,
      roughness: 0.2,
    });
    carbonMat.current = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x0c0c0c),
      metalness: 0.55,
      roughness: 0.5,
    });
    wheelMat.current = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x161616),
      metalness: 0.85,
      roughness: 0.35,
    });
    tireMat.current = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x0a0a0a),
      metalness: 0.05,
      roughness: 0.95,
    });
    lightOnMat.current = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xffffff),
      emissive: new THREE.Color(0xfff6e0),
      emissiveIntensity: 1.5,
    });
    lightRedMat.current = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x550008),
      emissive: new THREE.Color(0xff1a1a),
      emissiveIntensity: 0.9,
    });
    interiorMat.current = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x111114),
      metalness: 0.05,
      roughness: 0.85,
    });
  }, []);

  useEffect(() => {
    cloned.traverse((obj) => {
      if (!(obj as THREE.Mesh).isMesh) return;
      const mesh = obj as THREE.Mesh;
      const n = mesh.name.toLowerCase();
      mesh.castShadow = false;
      mesh.receiveShadow = false;

      if (n === "body" || n === "blue" || n === "yellow_trim") {
        mesh.material = bodyMat.current!;
      } else if (n === "glass") {
        mesh.material = glassMat.current!;
      } else if (n === "chrome") {
        mesh.material = chromeMat.current!;
      } else if (n === "trim" || n === "metal" || n.startsWith("rim")) {
        mesh.material = trimMat.current!;
      } else if (n.includes("carbon") || n === "wipers") {
        mesh.material = carbonMat.current!;
      } else if (n === "tire" || n === "tires") {
        mesh.material = tireMat.current!;
      } else if (n === "wheel" || n === "centre" || n === "nuts" || n === "brake" || n === "brakes") {
        mesh.material = wheelMat.current!;
      } else if (n === "lights" || n === "leds") {
        mesh.material = lightOnMat.current!;
      } else if (n === "lights_red") {
        mesh.material = lightRedMat.current!;
      } else if (
        n === "interior_dark" ||
        n === "interior_light" ||
        n === "carpet" ||
        n === "leather" ||
        n === "plastic_gray" ||
        n === "grills"
      ) {
        mesh.material = interiorMat.current!;
      }
    });
  }, [cloned]);

  const currentColor = useRef(new THREE.Color(target.hex));
  const targetColor = useRef(new THREE.Color(target.hex));
  const cur = useRef({
    metalness: target.metalness,
    roughness: target.roughness,
    clearcoat: target.clearcoat,
    clearcoatRoughness: target.clearcoatRoughness,
  });

  useEffect(() => {
    targetColor.current.set(target.hex);
  }, [target.hex]);

  useFrame((state, delta) => {
    const mat = bodyMat.current;
    if (!mat) return;

    const k = 1 - Math.exp(-delta * 7);

    if (target.hueShift) {
      const t = state.clock.getElapsedTime();
      const h = (t * 0.045) % 1;
      mat.color.setHSL(h, 0.8, 0.45);
      currentColor.current.copy(mat.color);
    } else {
      lerpColor(currentColor.current, targetColor.current, k);
      mat.color.copy(currentColor.current);
    }

    cur.current.metalness = lerp(cur.current.metalness, target.metalness, k);
    cur.current.roughness = lerp(cur.current.roughness, target.roughness, k);
    cur.current.clearcoat = lerp(cur.current.clearcoat, target.clearcoat, k);
    cur.current.clearcoatRoughness = lerp(
      cur.current.clearcoatRoughness,
      target.clearcoatRoughness,
      k
    );
    mat.metalness = cur.current.metalness;
    mat.roughness = cur.current.roughness;
    mat.clearcoat = cur.current.clearcoat;
    mat.clearcoatRoughness = cur.current.clearcoatRoughness;
  });

  return (
    <group ref={groupRef} position={[0, -0.05, 0]}>
      <primitive object={cloned} />
    </group>
  );
}

function StudioLights() {
  return (
    <Environment frames={1} resolution={512} background={false}>
      <color attach="background" args={["#050505"]} />

      <Lightformer
        form="rect"
        intensity={5}
        color="#ffffff"
        position={[0, 6, 0]}
        scale={[14, 4, 1]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <Lightformer
        form="rect"
        intensity={2.4}
        color="#ffd9a8"
        position={[7, 3, 1]}
        scale={[5, 6, 1]}
        rotation={[0, -Math.PI / 2.4, 0]}
      />
      <Lightformer
        form="rect"
        intensity={2.4}
        color="#a8c8ff"
        position={[-7, 3, 1]}
        scale={[5, 6, 1]}
        rotation={[0, Math.PI / 2.4, 0]}
      />
      <Lightformer
        form="rect"
        intensity={3.2}
        color="#ffffff"
        position={[0, 3, 7]}
        scale={[8, 4, 1]}
        rotation={[0, Math.PI, 0]}
      />
      <Lightformer
        form="ring"
        intensity={1.6}
        color="#ffe7c7"
        position={[3.5, 2.2, -3]}
        scale={2}
      />
    </Environment>
  );
}

function StudioFloor({ mobile }: { mobile: boolean }) {
  if (mobile) {
    return (
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#070707" roughness={0.85} metalness={0.15} />
      </mesh>
    );
  }
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
      <planeGeometry args={[40, 40]} />
      <MeshReflectorMaterial
        mirror={0.55}
        blur={[260, 80]}
        mixBlur={1}
        mixStrength={1.4}
        resolution={1024}
        depthScale={1.1}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        roughness={0.85}
        metalness={0.4}
        color="#070707"
      />
    </mesh>
  );
}

function CameraRig({
  preset,
  introDone,
  onIntroDone,
}: {
  preset: CameraPreset;
  introDone: boolean;
  onIntroDone: () => void;
}) {
  const { camera } = useThree();
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const startTime = useRef<number | null>(null);
  const fromPos = useRef(new THREE.Vector3());
  const fromTarget = useRef(new THREE.Vector3());
  const toPos = useMemo(() => new THREE.Vector3(...preset.position), [preset]);
  const toTarget = useMemo(() => new THREE.Vector3(...preset.target), [preset]);

  useEffect(() => {
    fromPos.current.copy(camera.position);
    if (controlsRef.current) {
      fromTarget.current.copy(controlsRef.current.target);
    } else {
      fromTarget.current.set(0, 0.5, 0);
    }
    startTime.current = null;
  }, [preset, camera.position]);

  useFrame((state, delta) => {
    const c = controlsRef.current;
    if (!c) return;

    if (startTime.current === null) startTime.current = state.clock.getElapsedTime();
    const elapsed = state.clock.getElapsedTime() - startTime.current;
    const dur = introDone ? 1.1 : 1.6;
    const t = Math.min(1, elapsed / dur);
    const e = easeInOutCubic(t);

    if (t < 1) {
      camera.position.lerpVectors(fromPos.current, toPos, e);
      c.target.lerpVectors(fromTarget.current, toTarget, e);
      c.autoRotate = false;
      c.update();
      if (t === 1 && !introDone) onIntroDone();
    } else {
      c.autoRotate = true;
      c.autoRotateSpeed = 0.45;
      c.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom={false}
      enableDamping
      dampingFactor={0.08}
      minDistance={4.2}
      maxDistance={9}
      minPolarAngle={Math.PI / 2.65}
      maxPolarAngle={Math.PI / 1.95}
    />
  );
}

function Loader() {
  const { progress, active } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3 select-none pointer-events-none">
        <div className="text-[10px] tracking-[0.4em] text-bone/50 font-mono">
          {active ? "STREAMING ASSET" : "INITIALIZING"}
        </div>
        <div className="text-3xl md:text-5xl chrome-text font-black tracking-tight">
          PERFECTION
        </div>
        <div className="w-44 h-px bg-bone/15 overflow-hidden">
          <div
            className="h-full bg-giallo transition-all duration-200"
            style={{ width: `${Math.round(progress)}%` }}
          />
        </div>
        <div className="text-[10px] font-mono tracking-[0.25em] text-bone/40 tabular-nums">
          {Math.round(progress).toString().padStart(3, "0")}%
        </div>
      </div>
    </Html>
  );
}

function Scene({
  selected,
  preset,
  isMobile,
  isHighTier,
  introDone,
  setIntroDone,
}: {
  selected: Wrap;
  preset: CameraPreset;
  isMobile: boolean;
  isHighTier: boolean;
  introDone: boolean;
  setIntroDone: () => void;
}) {
  return (
    <>
      <CameraRig preset={preset} introDone={introDone} onIntroDone={setIntroDone} />
      <Suspense fallback={<Loader />}>
        <StudioLights />
        <CarModel target={selected} />
        <StudioFloor mobile={isMobile} />
        <ContactShadows
          frames={1}
          position={[0, -0.04, 0]}
          opacity={0.7}
          scale={11}
          blur={2.6}
          far={4}
          resolution={isMobile ? 256 : 512}
        />
      </Suspense>
      {!isMobile && isHighTier && (
        <EffectComposer multisampling={0} enableNormalPass={false}>
          <Bloom
            intensity={0.55}
            luminanceThreshold={0.92}
            luminanceSmoothing={0.18}
            mipmapBlur
          />
          <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
        </EffectComposer>
      )}
    </>
  );
}

export default function Hero3D({
  selected,
  onSelect,
  preset,
  setPreset,
}: {
  selected: Wrap;
  onSelect: (w: Wrap) => void;
  preset: CameraPreset;
  setPreset: (p: CameraPreset) => void;
}) {
  const { tier, isMobile } = useDeviceTier();
  const isHighTier = tier === "high";
  const wrapRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [dpr, setDpr] = useState<number>(isMobile ? 1.25 : 1.75);
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    setDpr(isMobile ? 1.25 : 1.75);
  }, [isMobile]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="relative w-full">
      <div className="relative h-[78vh] md:h-[92vh] w-full">
        <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-b from-ink/60 via-transparent to-ink" />
        <div className="absolute inset-0 pointer-events-none z-10 grain opacity-[0.04]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-bone/20 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-px bg-gradient-to-r from-transparent via-giallo/30 to-transparent" />

        <Canvas
          camera={{ position: [10, 4, -10], fov: 40, near: 0.1, far: 100 }}
          dpr={dpr}
          gl={{
            antialias: !isMobile,
            powerPreference: tier === "low" ? "low-power" : "high-performance",
            alpha: false,
            preserveDrawingBuffer: false,
          }}
          frameloop={visible ? "always" : "never"}
          shadows={false}
          onCreated={({ gl }) => {
            gl.setClearColor(new THREE.Color("#050505"));
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 0.95;
          }}
        >
          <PerformanceMonitor
            bounds={() => [40, 60]}
            flipflops={3}
            onIncline={() => setDpr((d) => Math.min(isMobile ? 1.5 : 2, d + 0.25))}
            onDecline={() => setDpr((d) => Math.max(0.85, d - 0.25))}
            onFallback={() => setDpr(isMobile ? 1 : 1.25)}
          />
          <Scene
            selected={selected}
            preset={preset}
            isMobile={isMobile}
            isHighTier={isHighTier}
            introDone={introDone}
            setIntroDone={() => setIntroDone(true)}
          />
        </Canvas>

        <div className="pointer-events-none absolute bottom-3 left-4 z-20 flex items-center gap-2 text-[9px] md:text-[10px] tracking-[0.3em] font-mono text-bone/30">
          <span className="w-1 h-1 rounded-full bg-cut animate-pulse" />
          LIVE WRAP RENDER
        </div>
      </div>

      <div className="relative z-20 -mt-24 md:-mt-28 px-4 md:px-10 pb-2">
        <SwatchRail selected={selected} onSelect={onSelect} preset={preset} setPreset={setPreset} />
      </div>
    </div>
  );
}

function swatchBg(w: Wrap) {
  if (w.kind === "shift") {
    return "conic-gradient(from 220deg at 50% 50%, #00d4ff, #c264ff, #ff64a8, #5a2bd8, #00d4ff)";
  }
  if (w.kind === "chrome") {
    return "linear-gradient(135deg, #f0f0f0 0%, #4a4a4a 30%, #ffffff 50%, #4a4a4a 70%, #f0f0f0 100%)";
  }
  return `radial-gradient(ellipse at 30% 25%, rgba(255,255,255,${
    w.kind === "matte" ? 0.05 : 0.55
  }), transparent 50%), ${w.hex}`;
}

function SwatchRail({
  selected,
  onSelect,
  preset,
  setPreset,
}: {
  selected: Wrap;
  onSelect: (w: Wrap) => void;
  preset: CameraPreset;
  setPreset: (p: CameraPreset) => void;
}) {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between gap-4 mb-3 px-1">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] font-mono uppercase text-bone/45">
          <span className="w-1.5 h-1.5 bg-giallo" />
          Live Configurator
          <span className="hidden md:inline text-bone/25">/ {selected.code}</span>
        </div>
        <div className="flex items-center gap-1 md:gap-1.5">
          {cameraPresets.map((p) => {
            const active = preset.id === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setPreset(p)}
                className={`px-2 md:px-3 py-1.5 text-[9px] md:text-[10px] tracking-[0.2em] font-mono transition ${
                  active
                    ? "bg-giallo text-ink"
                    : "text-bone/55 hover:text-bone border border-bone/10 hover:border-bone/30"
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex gap-2 md:gap-3 overflow-x-auto hide-scrollbar pb-6 md:pb-1 -mx-4 px-4 md:mx-0 md:px-0 md:justify-center">
        {wraps.map((w) => {
          const active = w.id === selected.id;
          return (
            <button
              key={w.id}
              onClick={() => onSelect(w)}
              className={`shrink-0 group relative transition-all duration-300 ${
                active ? "scale-[1.04]" : "hover:-translate-y-0.5"
              }`}
            >
              <div
                className={`relative overflow-hidden ${
                  active ? "ring-2 ring-giallo" : "ring-1 ring-bone/15 hover:ring-bone/40"
                }`}
                style={{
                  width: 88,
                  height: 56,
                  background: swatchBg(w),
                }}
              >
                {w.kind === "matte" && (
                  <div className="absolute inset-0 grain opacity-[0.18] mix-blend-overlay" />
                )}
                {w.kind === "shift" && (
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
                )}
                {active && (
                  <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-giallo rounded-full" />
                )}
              </div>
              <div
                className={`absolute -bottom-5 inset-x-0 text-center text-[9px] tracking-[0.18em] font-mono whitespace-nowrap transition-opacity ${
                  active ? "text-bone" : "text-bone/45"
                }`}
              >
                {w.label.toUpperCase()}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

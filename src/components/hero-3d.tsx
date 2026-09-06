import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Icosahedron, TorusKnot, Environment } from "@react-three/drei";
import { useRef, Suspense } from "react";
import type { Mesh } from "three";

function Blob() {
  const ref = useRef<Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.15;
    ref.current.rotation.y = state.clock.elapsedTime * 0.2;
  });
  return (
    <Sphere ref={ref} args={[1.4, 96, 96]} position={[0, 0, 0]}>
      {/* @ts-ignore drei prop typing */}
      <MeshDistortMaterial color="#22d3ee" distort={0.45} speed={2.2} roughness={0.15} metalness={0.6} />
    </Sphere>
  );
}

function Knot() {
  const ref = useRef<Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.35;
    ref.current.rotation.z = state.clock.elapsedTime * 0.25;
  });
  return (
    <Float speed={2} rotationIntensity={1.2} floatIntensity={1.5}>
      <TorusKnot ref={ref} args={[0.55, 0.17, 180, 32]} position={[2.4, 1.1, -1]}>
        <meshStandardMaterial color="#3b82f6" metalness={0.85} roughness={0.2} emissive="#1d4ed8" emissiveIntensity={0.35} />
      </TorusKnot>
    </Float>
  );
}

function Crystal() {
  return (
    <Float speed={1.4} rotationIntensity={1} floatIntensity={2}>
      <Icosahedron args={[0.65, 0]} position={[-2.5, -1, -0.5]}>
        <meshStandardMaterial color="#a855f7" metalness={0.7} roughness={0.25} emissive="#7c3aed" emissiveIntensity={0.3} flatShading />
      </Icosahedron>
    </Float>
  );
}

export default function Hero3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.1} color="#22d3ee" />
      <directionalLight position={[-5, -3, -2]} intensity={0.6} color="#a855f7" />
      <pointLight position={[0, 0, 3]} intensity={0.8} color="#3b82f6" />
      <Suspense fallback={null}>
        <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.8}>
          <Blob />
        </Float>
        <Knot />
        <Crystal />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}

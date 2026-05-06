import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float, MeshDistortMaterial, OrbitControls } from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Mesh } from "three";

function Knot() {
  const ref = useRef<Mesh>(null!);
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.x += dt * 0.25;
    ref.current.rotation.y += dt * 0.35;
  });
  return (
    <mesh ref={ref} scale={1.6}>
      <torusKnotGeometry args={[1, 0.32, 220, 32]} />
      <MeshDistortMaterial
        color="#7c3aed"
        emissive="#22d3ee"
        emissiveIntensity={0.55}
        roughness={0.15}
        metalness={0.85}
        distort={0.42}
        speed={2}
      />
    </mesh>
  );
}

function Orb({ position, color, scale = 0.6 }: { position: [number, number, number]; color: string; scale?: number }) {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} wireframe />
      </mesh>
    </Float>
  );
}

export function MantraverseScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 55 }} dpr={[1, 2]}>
      <color attach="background" args={["#08060f"]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[6, 6, 6]} intensity={2} color="#22d3ee" />
      <pointLight position={[-6, -4, -4]} intensity={2} color="#e879f9" />
      <Suspense fallback={null}>
        <Stars radius={60} depth={40} count={3500} factor={4} fade speed={1.2} />
        <Knot />
        <Orb position={[-3.2, 1.6, -1]} color="#22d3ee" />
        <Orb position={[3, -1.4, -1]} color="#e879f9" scale={0.8} />
        <Orb position={[2.4, 2.4, -2]} color="#a78bfa" scale={0.5} />
        <Orb position={[-2.4, -2, -2]} color="#34d399" scale={0.5} />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} />
    </Canvas>
  );
}
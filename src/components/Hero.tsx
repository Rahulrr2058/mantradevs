import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { ArrowRight, Sparkles } from "lucide-react";

function AnimatedSphere({ isDark }: { isDark: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1.5, 64, 64]}>
        <MeshDistortMaterial
          color={isDark ? "#6366f1" : "#818cf8"}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={isDark ? 0 : 0.15}
          emissive={isDark ? "#4338ca" : "#e0e7ff"}
          emissiveIntensity={isDark ? 0.5 : 0.35}
          metalness={isDark ? 0.1 : 0.25}
        />
      </Sphere>
    </Float>
  );
}

function Particles({ count = 1500, isDark }: { count?: number; isDark: boolean }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 10;
      p[i * 3 + 1] = (Math.random() - 0.5) * 10;
      p[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return p;
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[points, 3]}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.015} 
        color={isDark ? "#818cf8" : "#4f46e5"} 
        transparent 
        opacity={isDark ? 0.6 : 0.4} 
        sizeAttenuation 
      />
    </points>
  );
}

export function Hero() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkTheme();
    
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="top" className="relative h-screen w-full dark:bg-[#030014] bg-[#fafafc] transition-colors duration-500 overflow-hidden">
      {/* Dynamic Grid Pattern Overlay */}
      <div className="absolute inset-0 dark:opacity-[0.07] opacity-[0.25] dark:bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[radial-gradient(#4f46e5_0.8px,transparent_0.8px)] [background-size:24px_24px] pointer-events-none transition-all duration-500" />
      
      {/* Light Theme Background Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full dark:bg-indigo-600/5 bg-indigo-500/10 blur-[150px] pointer-events-none transition-colors duration-500" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full dark:bg-pink-600/5 bg-pink-500/8 blur-[150px] pointer-events-none transition-colors duration-500" />

      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={isDark ? 0.5 : 0.9} />
          <pointLight position={[10, 10, 10]} intensity={isDark ? 1 : 1.8} color={isDark ? "#6366f1" : "#818cf8"} />
          <pointLight position={[-10, -10, -10]} intensity={isDark ? 0.5 : 1} color={isDark ? "#ec4899" : "#f472b6"} />
          <AnimatedSphere isDark={isDark} />
          <Particles isDark={isDark} />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        {/* transcluent pill */}
        <div className="flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full dark:bg-white/5 bg-white/70 border dark:border-white/10 border-indigo-100 shadow-[0_4px_20px_rgba(99,102,241,0.06)] backdrop-blur-md transition-all duration-500">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 animate-pulse" />
          <span className="text-[10px] uppercase tracking-[0.35em] dark:text-indigo-200/50 text-indigo-700 font-extrabold">The Verse is Open</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter dark:text-white text-slate-900 mb-6 leading-tight transition-colors duration-500">
          <span className="block animate-glitch">MANTRA</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 dark:from-indigo-500 dark:via-purple-500 dark:to-pink-500">VERSE</span>
        </h1>
        
        <p className="max-w-2xl text-lg md:text-xl dark:text-indigo-200/60 text-slate-600 mb-10 leading-relaxed font-medium transition-colors duration-500">
           Welcome to the next dimension of digital craft. Mantra Devs is a premium software engineering studio and the best IT company in Nepal, crafting custom web, mobile, and intelligent AI solutions that breathe, scale, and transcend the ordinary.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a href="#services" className="px-10 py-4 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-500 transition-all shadow-[0_10px_30px_rgba(79,70,229,0.3)] hover:shadow-[0_12px_35px_rgba(79,70,229,0.45)] flex items-center gap-2 justify-center cursor-pointer">
            Explore Verse <ArrowRight className="w-4 h-4" />
          </a>
          <a href="#work" className="px-10 py-4 dark:bg-white/5 bg-white border dark:border-white/10 border-slate-200 dark:text-white text-slate-700 rounded-full font-bold dark:hover:bg-white/10 hover:bg-slate-50 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.02)] backdrop-blur-md flex items-center gap-2 justify-center cursor-pointer">
            Our Work
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
        <div className="w-6 h-10 border-2 dark:border-indigo-500/50 border-indigo-500/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-indigo-500 rounded-full animate-scroll" />
        </div>
      </div>
    </section>
  );
}

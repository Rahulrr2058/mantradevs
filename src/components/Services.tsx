import React, { useState } from "react";
import Link from "next/link";
import { Code2, Cpu, Globe, Rocket, Shield, Sparkles } from "lucide-react";
import { assetPath } from "@/lib/assetPath";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  img: string;
  slug: string;
}

function ServiceCard({ title, description, icon, color, img, slug }: ServiceCardProps) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <Link
      href={`/blog/${slug}`}
      className="perspective-1000 group relative block cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="relative h-[450px] w-full rounded-[32px] dark:bg-white/5 bg-white/90 border dark:border-white/10 border-slate-200 p-8 transition-all duration-300 ease-out preserve-3d overflow-hidden shadow-[0_15px_45px_rgba(99,102,241,0.04)] hover:shadow-[0_20px_50px_rgba(99,102,241,0.08)] dark:shadow-none"
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        }}
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0 opacity-45 group-hover:opacity-65 transition-opacity duration-500">
          <img src={assetPath(img)} alt="" className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t dark:from-[#030014] dark:via-[#030014]/60 from-[#fafafc] from-10% via-[#fafafc]/50 to-transparent" />
        </div>

        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Glowing border effect */}
        <div 
          className="absolute -inset-[1px] rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity blur-sm pointer-events-none"
        />

        <div className="relative z-10 h-full flex flex-col justify-between translate-z-10">
          <div className="space-y-4">
            <div 
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-md backdrop-blur-xl border dark:border-white/10 border-slate-200 transition-all duration-300 group-hover:scale-110"
              style={{ backgroundColor: `${color}15`, color: color }}
            >
              {icon}
            </div>
            <h3 className="text-3xl font-bold dark:text-white text-slate-800 tracking-tight transition-colors duration-500">{title}</h3>
            <p className="dark:text-indigo-200/70 text-slate-600 leading-relaxed text-sm transition-colors duration-500">
              {description}
            </p>
          </div>

          <div className="mt-auto">
            <span 
              className="inline-flex items-center gap-2 text-sm font-bold transition-all px-4 py-2 rounded-full dark:bg-white/5 bg-slate-50 dark:hover:bg-white/10 hover:bg-indigo-50 border dark:border-white/10 border-slate-200 shadow-sm group-hover:text-white group-hover:bg-indigo-600 group-hover:border-indigo-600"
              style={{ color: color }}
            >
              Explore Tech 
              <Rocket className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>

        {/* 3D Decorative elements */}
        <div className="absolute top-4 right-4 w-32 h-32 dark:bg-white/5 bg-slate-100 rounded-full blur-3xl group-hover:bg-white/10 transition-all translate-z-[-10]" />
      </div>
    </Link>
  );
}

export function Services() {
  const services = [
    {
      title: "Web Engineering",
      description: "Next-gen web applications built with speed, security, and scalability as core pillars.",
      icon: <Globe className="w-7 h-7" />,
      color: "#6366f1",
      img: "/services/web.png",
      slug: "web-engineering"
    },
    {
      title: "AI Integration",
      description: "Infusing your products with intelligent capabilities that feel like magic.",
      icon: <Cpu className="w-7 h-7" />,
      color: "#ec4899",
      img: "/services/ai.png",
      slug: "ai-integration"
    },
    {
      title: "Mobile Verse",
      description: "Native and cross-platform mobile experiences that live in the palm of your hand.",
      icon: <Rocket className="w-7 h-7" />,
      color: "#8b5cf6",
      img: "/services/mobile.png",
      slug: "mobile-verse"
    },
    {
      title: "Cloud Architect",
      description: "Robust infrastructure that scales with your ambition, built on the cutting edge.",
      icon: <Shield className="w-7 h-7" />,
      color: "#06b6d4",
      img: "/services/cloud.png",
      slug: "cloud-architect"
    },
    {
      title: "Design Systems",
      description: "Atomic design languages that ensure consistency across your entire digital ecosystem.",
      icon: <Sparkles className="w-7 h-7" />,
      color: "#f59e0b",
      img: "/services/design.png",
      slug: "design-systems"
    },
    {
      title: "IT Training",
      description: "We provide high-impact IT training with real-world projects to make your skills completely market-ready.",
      icon: <Code2 className="w-7 h-7" />,
      color: "#10b981",
      img: "/services/custom.png",
      slug: "it-training"
    }
  ];

  return (
    <section id="services" className="py-32 dark:bg-[#030014] bg-[#fafafc] transition-colors duration-500 relative overflow-hidden">
      {/* Dynamic Grid Pattern Overlay */}
      <div className="absolute inset-0 dark:opacity-[0.05] opacity-[0.2] dark:bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[radial-gradient(#4f46e5_0.8px,transparent_0.8px)] [background-size:24px_24px] pointer-events-none transition-all duration-500" />
      
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/5 blur-[150px] rounded-full" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-20 text-center md:text-left">
          <p className="text-sm uppercase tracking-[0.4em] text-indigo-500 mb-4 font-bold">Our capabilities</p>
          <h2 className="text-5xl md:text-7xl font-black dark:text-white text-slate-900 mb-6 transition-colors duration-500">
            MANTRA <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-400">SERVICES</span>
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-indigo-500 to-transparent rounded-full mx-auto md:mx-0" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, i) => (
            <ServiceCard key={i} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}

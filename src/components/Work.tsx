import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { assetPath } from "@/lib/assetPath";

const projects = [
  {
    name: "ClinicSathi",
    tag: "Healthcare SaaS",
    desc: "Digitalizing healthcare in Nepal with seamless patient management.",
    img: "/work/clinicsathi.png",
    color: "#6366f1",
    href: "https://clinicsathi.com"
  },
  {
    name: "Retrokit Nepal",
    tag: "Automotive E-commerce",
    desc: "Premium storefront for classic automotive restoration kits.",
    img: "/work/retrokit.png",
    color: "#f59e0b",
    href: "https://retrokitnepal.com"
  },
  {
    name: "Babal Wears",
    tag: "Streetwear Commerce",
    desc: "A bold, brutalist shopping experience for premium Nepalese streetwear.",
    img: "/work/clothing.png",
    color: "#ec4899",
    href: "https://clothing-store-demo-work.vercel.app/"
  }
];

export function Work() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="work" className="py-32 dark:bg-[#030014] bg-[#fafafc] transition-colors duration-500 overflow-hidden relative">
      {/* Dynamic Grid Pattern Overlay */}
      <div className="absolute inset-0 dark:opacity-[0.05] opacity-[0.2] dark:bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[radial-gradient(#4f46e5_0.8px,transparent_0.8px)] [background-size:24px_24px] pointer-events-none transition-all duration-500" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1 space-y-12">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-indigo-500 font-bold">Selected work</p>
              <h2 className="text-5xl md:text-7xl font-black dark:text-white text-slate-900 transition-colors duration-500">
                CRAFTED <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">EXPERIENCES</span>
              </h2>
              <p className="dark:text-indigo-200/50 text-slate-500 max-w-md transition-colors duration-500">
                We don't just build websites; we create digital dimensions that engage and convert.
              </p>
            </div>

            <div className="space-y-6">
              {projects.map((project, i) => (
                <a 
                  key={i}
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`group block cursor-pointer transition-all duration-500 p-6 rounded-[24px] border ${
                    activeIndex === i 
                      ? 'dark:bg-white/5 bg-white border-indigo-500/10 dark:border-white/10 shadow-[0_15px_40px_rgba(99,102,241,0.05)] dark:shadow-none translate-x-4 opacity-100' 
                      : 'bg-transparent border-transparent opacity-40 hover:opacity-75'
                  }`}
                  onMouseEnter={() => setActiveIndex(i)}
                >
                  <div className="flex items-center gap-6">
                    <span className="text-xl font-mono text-indigo-500">0{i + 1}</span>
                    <h3 className="text-3xl md:text-4xl font-bold dark:text-white text-slate-800 dark:group-hover:text-indigo-400 group-hover:text-indigo-600 transition-all duration-500">
                      {project.name}
                    </h3>
                    <ArrowUpRight className={`w-8 h-8 transition-all duration-500 ${
                      activeIndex === i ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                    }`} style={{ color: project.color }} />
                  </div>
                  <p className={`mt-2 dark:text-indigo-200/60 text-slate-650 transition-all duration-500 ${
                    activeIndex === i ? 'h-auto opacity-100 mt-3' : 'h-0 opacity-0 overflow-hidden'
                  }`}>
                    {project.desc}
                  </p>
                </a>
              ))}
            </div>
          </div>

          <div className="flex-1 relative aspect-square w-full max-w-xl perspective-1000">
            {projects.map((project, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-all duration-700 ease-out preserve-3d ${
                  activeIndex === i 
                    ? 'opacity-100 scale-100 rotate-y-0 translate-x-0' 
                    : 'opacity-0 scale-90 rotate-y-12 translate-x-12'
                }`}
              >
                <div className="relative w-full h-full rounded-[32px] overflow-hidden border dark:border-white/10 border-slate-200 shadow-2xl">
                  {/* Actual img tag used here */}
                  <img 
                    src={assetPath(project.img)} 
                    alt={project.name} 
                    className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t dark:from-black/85 from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8">
                    <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-black text-white uppercase tracking-widest">
                      {project.tag}
                    </span>
                  </div>
                </div>
                
                {/* 3D Reflection/Glow */}
                <div 
                  className="absolute -inset-4 blur-3xl opacity-20 -z-10 rounded-full transition-colors duration-700"
                  style={{ backgroundColor: project.color }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
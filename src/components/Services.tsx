import { Code2, Brain, Palette, Cloud } from "lucide-react";

const services = [
  { Icon: Code2, title: "Web & Mobile Apps", desc: "Production-grade web, iOS and Android apps built with React, Next.js, Flutter and Swift.", hue: "from-cyan-400 to-blue-500" },
  { Icon: Brain, title: "AI / ML Solutions", desc: "Custom LLM integrations, RAG pipelines, intelligent agents and automation that ships.", hue: "from-fuchsia-400 to-violet-500" },
  { Icon: Palette, title: "UI / UX Design", desc: "Design systems, brand identity, and pixel-perfect interfaces users genuinely love.", hue: "from-pink-400 to-rose-500" },
  { Icon: Cloud, title: "Cloud & DevOps", desc: "Scalable infrastructure, CI/CD pipelines and observability on AWS, GCP and Cloudflare.", hue: "from-emerald-400 to-teal-500" },
];

export function Services() {
  return (
    <section id="services" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.3em] text-primary">What we do</p>
          <h2 className="mt-4 text-4xl md:text-6xl font-black tracking-tight">
            Software, <span className="text-gradient">end to end.</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            From a blank Figma to production traffic — one team, one accountable rhythm.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map(({ Icon, title, desc, hue }) => (
            <div key={title} className="group relative glass rounded-2xl p-8 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-glow">
              <div className={`absolute -inset-px rounded-2xl bg-gradient-to-br ${hue} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${hue} shadow-glow`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="mt-6 text-2xl font-bold">{title}</h3>
              <p className="mt-2 text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
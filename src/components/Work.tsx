import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    name: "ClinicSathi",
    tag: "Healthcare SaaS",
    desc: "A modern clinic management platform helping doctors in Nepal digitize appointments, prescriptions and patient records.",
    href: "https://clinicsathi.com",
    accent: "from-cyan-400 via-sky-500 to-blue-600",
  },
  {
    name: "Retrokit Nepal",
    tag: "Automotive · E-commerce",
    desc: "A vibrant storefront for retro automotive kits — built for speed, story and conversions.",
    href: "https://retrokitnepal.com",
    accent: "from-amber-400 via-orange-500 to-rose-600",
  },
  {
    name: "Clothing Store Demo",
    tag: "E-commerce · Concept",
    desc: "A concept commerce experience exploring playful product discovery and seamless checkout.",
    href: "https://clothing-store-demo-work.vercel.app/",
    accent: "from-fuchsia-400 via-violet-500 to-indigo-600",
  },
];

export function Work() {
  return (
    <section id="work" className="relative py-32 border-t border-border/50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary">Selected work</p>
            <h2 className="mt-4 text-4xl md:text-6xl font-black tracking-tight">
              Things we've <span className="text-gradient">shipped.</span>
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            A few products we've designed, engineered and launched with partners we love.
          </p>
        </div>

        <div className="mt-16 space-y-6">
          {projects.map((p, i) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="group relative block glass rounded-3xl p-8 md:p-10 overflow-hidden transition-all duration-500 hover:-translate-y-1"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${p.accent} opacity-0 group-hover:opacity-15 transition-opacity duration-700`} />
              <div className={`absolute -right-32 -top-32 h-72 w-72 rounded-full bg-gradient-to-br ${p.accent} blur-3xl opacity-30 group-hover:opacity-60 transition-opacity duration-700`} />
              <div className="relative grid md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-1 text-5xl font-black text-muted-foreground/40 group-hover:text-gradient transition-all">
                  0{i + 1}
                </div>
                <div className="md:col-span-7">
                  <p className="text-xs uppercase tracking-[0.25em] text-primary">{p.tag}</p>
                  <h3 className="mt-2 text-3xl md:text-5xl font-black tracking-tight">{p.name}</h3>
                  <p className="mt-3 text-muted-foreground max-w-xl">{p.desc}</p>
                </div>
                <div className="md:col-span-4 flex md:justify-end">
                  <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm group-hover:shadow-glow transition-all">
                    Visit live <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
const steps = [
  { n: "01", t: "Discover", d: "We listen, audit and shape the product strategy." },
  { n: "02", t: "Design", d: "Wireframes, prototypes and a polished design system." },
  { n: "03", t: "Build", d: "Iterative sprints with weekly demos and clean code." },
  { n: "04", t: "Launch", d: "Ship to production, monitor, learn, scale." },
];

export function Process() {
  return (
    <section id="process" className="relative py-32 border-t border-border/50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.3em] text-primary">How we work</p>
          <h2 className="mt-4 text-4xl md:text-6xl font-black tracking-tight">
            A simple, <span className="text-gradient">honest process.</span>
          </h2>
        </div>
        <div className="mt-16 grid md:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div key={s.n} className="relative glass rounded-2xl p-6">
              <div className="text-sm font-mono text-primary">{s.n}</div>
              <h3 className="mt-2 text-xl font-bold">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
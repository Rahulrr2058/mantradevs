import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { useMantraverse } from "./MantraverseContext";
const MantraverseScene = dynamic(() => import("./MantraverseScene").then(mod => mod.MantraverseScene), { ssr: false });
import { ArrowRight, Sparkles } from "lucide-react";


export function Hero() {
  const { mantraverse, toggle } = useMantraverse();
  return (
    <section id="top" className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden noise">
      {/* Backdrop */}
      <div className="absolute inset-0 -z-10">
        {mantraverse ? (
          <MantraverseScene />
        ) : (
          <>
            <div className="absolute inset-0 grid-bg opacity-60" />
            <div className="absolute inset-0" style={{ background: "var(--gradient-radial)" }} />
            <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/20 blur-3xl animate-float" />
            <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-secondary/20 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
          </>
        )}
      </div>

      <div className="relative mx-auto max-w-7xl px-6 w-full">
        <div className="max-w-3xl">
          <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-muted-foreground">
            <Sparkles className="h-3 w-3 text-primary" /> A digital craft studio from Nepal
          </span>
          <h1 className={`mt-6 text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] ${mantraverse ? "animate-glitch" : ""}`}>
            <span className="text-foreground">We build </span>
            <span className="text-gradient">digital mantras</span>
            <br />
            <span className="shimmer-text">that scale.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg md:text-xl text-muted-foreground">
            Mantra Devs is a software studio crafting beautiful, performant products —
            from healthcare platforms to commerce experiences and AI tooling.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <Button variant="hero" size="xl" asChild className="w-full sm:w-auto shadow-elegant hover:shadow-glow-violet group">
              <a href="#contact" className="flex items-center gap-2">
                Start a project 
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button 
              variant={mantraverse ? "portal" : "mantra"} 
              size="xl" 
              onClick={toggle}
              className="w-full sm:w-auto min-w-[240px] group"
            >
              <Sparkles className={`h-4 w-4 transition-all ${mantraverse ? "animate-spin text-white" : "text-primary group-hover:rotate-12"}`} />
              {mantraverse ? "Exit the Mantraverse" : "Enter the Mantraverse"}
            </Button>
          </div>



          <div className="mt-16 flex items-center gap-8 text-sm text-muted-foreground">
            <Stat n="20+" l="Products shipped" />
            <Stat n="6+" l="Industries served" />
            <Stat n="∞" l="Cups of chiya" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="text-2xl md:text-3xl font-bold text-gradient">{n}</div>
      <div className="text-xs uppercase tracking-widest mt-1">{l}</div>
    </div>
  );
}
import { Button } from "@/components/ui/button";
import { Mail, ArrowRight } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="relative py-32 border-t border-border/50">
      <div className="mx-auto max-w-5xl px-6">
        <div className="relative glass rounded-3xl p-10 md:p-16 overflow-hidden">
          <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-secondary/30 blur-3xl" />
          <div className="relative">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight">
              Have an idea? <br />
              <span className="text-gradient">Let's chant it into existence.</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl text-lg">
              Tell us about your product. We'll reply within 24 hours with a few sharp questions and a plan.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl" asChild className="w-full sm:w-auto">
                <a href="mailto:mantradevs@gmail.com" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>mantradevs@gmail.com</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>

          </div>
        </div>
        <footer className="mt-16 flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
          <span>© {new Date().getFullYear()} Mantra Devs. Crafted with chai.</span>
          <span>Kathmandu · Remote · The Mantraverse</span>
        </footer>
      </div>
    </section>
  );
}
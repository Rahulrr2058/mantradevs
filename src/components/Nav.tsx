import { ModeToggle } from "./ModeToggle";
import { useMantraverse } from "./MantraverseContext";

export function Nav() {
  const { mantraverse } = useMantraverse();
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group">
          <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary shadow-glow">
            <span className="text-primary-foreground font-black">M</span>
          </span>
          <span className={`font-bold tracking-tight text-lg ${mantraverse ? "shimmer-text" : "text-foreground"}`}>
            Mantra<span className="text-primary">Devs</span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#services" className="hover:text-primary transition-colors">Services</a>
          <a href="#work" className="hover:text-primary transition-colors">Work</a>
          <a href="#process" className="hover:text-primary transition-colors">Process</a>
          <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
        </nav>
        <ModeToggle />
      </div>
    </header>
  );
}
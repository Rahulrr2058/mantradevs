import { ModeToggle } from "./ModeToggle";
import { useMantraverse } from "./MantraverseContext";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Nav() {
  const { mantraverse } = useMantraverse();
  const links = [
    { href: "#services", label: "Services" },
    { href: "#work", label: "Work" },
    { href: "#process", label: "Process" },
    { href: "#contact", label: "Contact" },
  ];

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
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-primary transition-colors">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ModeToggle />
          
          {/* Mobile Nav */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] glass border-l-primary/20">
                <SheetHeader className="mb-8">
                  <SheetTitle className="text-left text-2xl font-bold tracking-tight">
                    Mantra<span className="text-primary">Devs</span>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-6">
                  {links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="text-lg font-medium hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                  <Button variant="hero" size="lg" asChild className="mt-4">
                    <a href="#contact">Start a project</a>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
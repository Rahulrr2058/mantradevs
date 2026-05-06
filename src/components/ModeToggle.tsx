import { useMantraverse } from "./MantraverseContext";
import { Sparkles, Globe } from "lucide-react";

export function ModeToggle() {
  const { mantraverse, toggle } = useMantraverse();
  return (
    <div className="glass relative inline-flex items-center rounded-full p-1 text-sm">
      <span
        className="absolute top-1 bottom-1 w-1/2 rounded-full bg-gradient-primary transition-all duration-500 shadow-glow"
        style={{ left: mantraverse ? "50%" : "0.25rem", width: "calc(50% - 0.25rem)" }}
      />
      <button
        onClick={() => mantraverse && toggle()}
        className={`relative z-10 flex items-center gap-2 rounded-full px-4 py-2 font-medium transition-colors ${!mantraverse ? "text-primary-foreground" : "text-foreground/70"}`}
      >
        <Globe className="h-4 w-4" /> Studio
      </button>
      <button
        onClick={() => !mantraverse && toggle()}
        className={`relative z-10 flex items-center gap-2 rounded-full px-4 py-2 font-medium transition-colors ${mantraverse ? "text-primary-foreground" : "text-foreground/70"}`}
      >
        <Sparkles className="h-4 w-4" /> Mantraverse
      </button>
    </div>
  );
}
import { useMemo } from "react";
import { Code2, Cpu, Database, Cloud, Sparkles, Braces, Terminal, GitBranch, Zap, Atom, Boxes, Binary } from "lucide-react";

const ICONS = [Code2, Cpu, Database, Cloud, Sparkles, Braces, Terminal, GitBranch, Zap, Atom, Boxes, Binary];

export function FallingIcons({ active }: { active: boolean }) {
  const items = useMemo(
    () =>
      Array.from({ length: 28 }).map((_, i) => ({
        Icon: ICONS[i % ICONS.length],
        left: Math.random() * 100,
        delay: Math.random() * 8,
        dur: 8 + Math.random() * 10,
        size: 18 + Math.random() * 28,
        hue: 180 + Math.random() * 140,
      })),
    [],
  );

  if (!active) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-[40] overflow-hidden">
      {items.map((it, i) => {
        const Icon = it.Icon;
        return (
          <Icon
            key={i}
            style={{
              position: "absolute",
              left: `${it.left}%`,
              top: 0,
              width: it.size,
              height: it.size,
              color: `hsl(${it.hue} 100% 65%)`,
              filter: `drop-shadow(0 0 8px hsl(${it.hue} 100% 65%))`,
              animation: `fall ${it.dur}s linear ${it.delay}s infinite`,
              opacity: 0.85,
            }}
          />
        );
      })}
    </div>
  );
}
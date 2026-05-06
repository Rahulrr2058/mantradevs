import { useEffect, useRef } from "react";

type P = { x: number; y: number; vx: number; vy: number; life: number; max: number; hue: number; size: number };

export function CursorTrail({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particles = useRef<P[]>([]);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      for (let i = 0; i < 3; i++) {
        particles.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 0,
          max: 40 + Math.random() * 30,
          hue: 180 + Math.random() * 140,
          size: 2 + Math.random() * 3,
        });
      }
      if (particles.current.length > 400) particles.current.splice(0, particles.current.length - 400);
    };
    window.addEventListener("mousemove", onMove);

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";
      particles.current = particles.current.filter((p) => p.life < p.max);
      for (const p of particles.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04;
        p.life++;
        const t = 1 - p.life / p.max;
        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 100%, 65%, ${t})`;
        ctx.shadowBlur = 18;
        ctx.shadowColor = `hsla(${p.hue}, 100%, 65%, ${t})`;
        ctx.arc(p.x, p.y, Math.max(0, p.size * t), 0, Math.PI * 2);
        ctx.fill();
      }
      raf.current = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      if (raf.current) cancelAnimationFrame(raf.current);
      particles.current = [];
    };
  }, [active]);

  if (!active) return null;
  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[60]" />;
}
"use client";
import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  color: string;
  pulse: number;
  pulseSpeed: number;
}

const COLORS = ["#2563EB", "#38BDF8", "#6366F1", "#2563EB", "#38BDF8"];
const PARTICLE_COUNT = 110;
const CONNECTION_DIST = 130;
const MOUSE_REPEL_DIST = 120;
const MOUSE_REPEL_FORCE = 0.4;

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse     = useRef({ x: -9999, y: -9999 });
  const particles = useRef<Particle[]>([]);
  const rafId     = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /* ── resize ── */
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    /* ── init particles ── */
    const init = () => {
      particles.current = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.8 + 0.5,
        opacity: Math.random() * 0.5 + 0.15,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.008,
      }));
    };
    init();

    /* ── mouse track ── */
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    const onLeave = () => {
      mouse.current = { x: -9999, y: -9999 };
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    /* ── draw loop ── */
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const ps = particles.current;

      ps.forEach(p => {
        /* pulse opacity */
        p.pulse += p.pulseSpeed;
        const pulsed = p.opacity + Math.sin(p.pulse) * 0.12;

        /* mouse repel */
        const dx = p.x - mouse.current.x;
        const dy = p.y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_REPEL_DIST) {
          const force = (MOUSE_REPEL_DIST - dist) / MOUSE_REPEL_DIST;
          p.vx += (dx / dist) * force * MOUSE_REPEL_FORCE;
          p.vy += (dy / dist) * force * MOUSE_REPEL_FORCE;
        }

        /* damping */
        p.vx *= 0.98;
        p.vy *= 0.98;

        /* move */
        p.x += p.vx;
        p.y += p.vy;

        /* wrap edges */
        if (p.x < 0)             p.x = canvas.width;
        if (p.x > canvas.width)  p.x = 0;
        if (p.y < 0)             p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        /* draw dot */
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, Math.min(1, pulsed));
        ctx.fill();

        /* glow for bigger particles */
        if (p.radius > 1.4) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = pulsed * 0.08;
          ctx.fill();
        }
      });

      /* draw connections */
      ctx.globalAlpha = 1;
      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const dx   = ps[i].x - ps[j].x;
          const dy   = ps[i].y - ps[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.18;
            ctx.beginPath();
            ctx.moveTo(ps[i].x, ps[i].y);
            ctx.lineTo(ps[j].x, ps[j].y);
            ctx.strokeStyle = ps[i].color;
            ctx.globalAlpha = alpha;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      rafId.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1, opacity: 0.75 }}
    />
  );
}

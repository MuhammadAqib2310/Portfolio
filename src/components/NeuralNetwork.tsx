"use client";
import { useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────
   NeuralNetwork — full-canvas animated AI neural network
   • Layered nodes (input → hidden → output)
   • Animated signal pulses travelling along edges
   • Soft indigo/violet glow — premium dark vibe
   • Mouse-reactive: nearby nodes brighten
   • 60 FPS, pointer-events: none
───────────────────────────────────────────────────────── */

interface Node {
  x: number;
  y: number;
  layer: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  pulsePhase: number;
  pulseSpeed: number;
  color: string;
}

interface Edge {
  from: number;
  to: number;
  alpha: number;
}

interface Pulse {
  edgeIdx: number;
  t: number;       // 0→1 progress along edge
  speed: number;
  color: string;
  size: number;
}

const NODE_COLORS  = ["#6366F1","#818CF8","#4F46E5","#A5B4FC","#C9A962"];
const PULSE_COLORS = ["#818CF8","#A5B4FC","#C9A962","#6366F1"];

export default function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse     = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let nodes:  Node[]  = [];
    let edges:  Edge[]  = [];
    let pulses: Pulse[] = [];

    /* ── resize ── */
    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      init();
    };

    /* ── build network ── */
    const init = () => {
      nodes  = [];
      edges  = [];
      pulses = [];

      const W = canvas.width;
      const H = canvas.height;
      const isMobile = W < 768;

      /* Layer config: [nodeCount, xFraction] */
      const layers = isMobile
        ? [[3,0.12],[5,0.30],[6,0.50],[5,0.70],[3,0.88]]
        : [[4,0.08],[6,0.22],[8,0.40],[8,0.58],[6,0.76],[4,0.90]];

      /* Build nodes */
      layers.forEach(([count, xFrac], layerIdx) => {
        const x = W * (xFrac as number);
        const n = count as number;
        for (let j = 0; j < n; j++) {
          const spreadY = H * 0.72;
          const startY  = (H - spreadY) / 2;
          const y = startY + (spreadY / (n - 1 || 1)) * j + (Math.random() - 0.5) * 18;
          nodes.push({
            x: x + (Math.random() - 0.5) * 25,
            y,
            layer: layerIdx,
            radius: Math.random() * 2.5 + 2,
            baseAlpha: Math.random() * 0.35 + 0.2,
            alpha: 0,
            pulsePhase: Math.random() * Math.PI * 2,
            pulseSpeed: Math.random() * 0.018 + 0.008,
            color: NODE_COLORS[Math.floor(Math.random() * NODE_COLORS.length)],
          });
        }
      });

      /* Build edges — connect each node to 2-3 nodes in next layer */
      const byLayer: number[][] = Array.from({ length: layers.length }, () => []);
      nodes.forEach((n, i) => byLayer[n.layer].push(i));

      for (let l = 0; l < layers.length - 1; l++) {
        byLayer[l].forEach(fromIdx => {
          const targets = [...byLayer[l + 1]].sort(() => Math.random() - 0.5).slice(0, 3);
          targets.forEach(toIdx => {
            edges.push({ from: fromIdx, to: toIdx, alpha: Math.random() * 0.12 + 0.04 });
          });
        });
      }

      /* Seed initial pulses */
      for (let i = 0; i < 8; i++) spawnPulse();
    };

    const spawnPulse = () => {
      if (edges.length === 0) return;
      const edgeIdx = Math.floor(Math.random() * edges.length);
      pulses.push({
        edgeIdx,
        t: 0,
        speed: Math.random() * 0.004 + 0.002,
        color: PULSE_COLORS[Math.floor(Math.random() * PULSE_COLORS.length)],
        size: Math.random() * 2.5 + 1.5,
      });
    };

    /* ── draw loop ── */
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = mouse.current.x;
      const my = mouse.current.y;

      /* ── draw edges ── */
      edges.forEach(e => {
        const a = nodes[e.from];
        const b = nodes[e.to];
        if (!a || !b) return;

        const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
        grad.addColorStop(0, `rgba(99,102,241,${e.alpha})`);
        grad.addColorStop(0.5, `rgba(129,140,248,${e.alpha * 1.4})`);
        grad.addColorStop(1, `rgba(79,70,229,${e.alpha})`);

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth   = 0.6;
        ctx.globalAlpha = 1;
        ctx.stroke();
      });

      /* ── draw pulses ── */
      pulses.forEach(p => {
        const e  = edges[p.edgeIdx];
        if (!e) return;
        const a  = nodes[e.from];
        const b  = nodes[e.to];
        if (!a || !b) return;

        const px = a.x + (b.x - a.x) * p.t;
        const py = a.y + (b.y - a.y) * p.t;

        /* glow */
        const grd = ctx.createRadialGradient(px, py, 0, px, py, p.size * 5);
        grd.addColorStop(0, p.color + "CC");
        grd.addColorStop(1, p.color + "00");
        ctx.beginPath();
        ctx.arc(px, py, p.size * 5, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.globalAlpha = 0.6;
        ctx.fill();

        /* dot */
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.9;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      /* ── draw nodes ── */
      nodes.forEach(n => {
        n.pulsePhase += n.pulseSpeed;
        const pulse = (Math.sin(n.pulsePhase) + 1) / 2;

        /* mouse proximity boost */
        const dx   = n.x - mx;
        const dy   = n.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const boost = dist < 120 ? (1 - dist / 120) * 0.6 : 0;
        n.alpha = n.baseAlpha + pulse * 0.25 + boost;

        /* outer glow */
        const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius * 6);
        glow.addColorStop(0, n.color + "55");
        glow.addColorStop(1, n.color + "00");
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius * 6, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.globalAlpha = n.alpha * 0.5 + boost * 0.4;
        ctx.fill();

        /* core dot */
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.globalAlpha = n.alpha + boost * 0.3;
        ctx.fill();

        /* gold ring on mouse proximity */
        if (boost > 0.1) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius + 3, 0, Math.PI * 2);
          ctx.strokeStyle = "#C9A962";
          ctx.lineWidth   = 0.8;
          ctx.globalAlpha = boost * 0.7;
          ctx.stroke();
        }

        ctx.globalAlpha = 1;
      });

      /* ── advance pulses ── */
      pulses = pulses.filter(p => {
        p.t += p.speed;
        return p.t < 1;
      });

      /* spawn new pulses to keep density */
      if (pulses.length < 14 && Math.random() < 0.06) spawnPulse();

      raf = requestAnimationFrame(draw);
    };

    /* ── mouse ── */
    const onMove  = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 }; };

    window.addEventListener("resize",     resize);
    window.addEventListener("mousemove",  onMove);
    window.addEventListener("mouseleave", onLeave);

    resize();
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize",     resize);
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
        opacity: 0.55,
      }}
    />
  );
}

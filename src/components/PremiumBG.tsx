"use client";
import { useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────
   PremiumBG — drop-in animated background layer
   Props:
     variant: "mesh" | "grid" | "aurora" | "dots" | "geo"
     accent:  primary color hex  (default #6366F1)
     cyan:    secondary color hex (default #818CF8)
   All absolutely positioned, pointer-events:none, z:0
───────────────────────────────────────────────────────── */

interface Props {
  variant?: "mesh" | "grid" | "aurora" | "dots" | "geo";
  accent?: string;
  cyan?: string;
}

/* ── Shared floating orbs ── */
function Orbs({ accent, cyan }: { accent: string; cyan: string }) {
  return (
    <>
      <div style={{
        position: "absolute", borderRadius: "50%", pointerEvents: "none",
        width: "clamp(300px,40vw,650px)", height: "clamp(300px,40vw,650px)",
        top: "-15%", left: "-10%", filter: "blur(90px)",
        background: `radial-gradient(circle, ${accent}28 0%, transparent 70%)`,
        animation: "bgOrb1 18s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute", borderRadius: "50%", pointerEvents: "none",
        width: "clamp(250px,35vw,550px)", height: "clamp(250px,35vw,550px)",
        bottom: "-10%", right: "-8%", filter: "blur(80px)",
        background: `radial-gradient(circle, ${cyan}20 0%, transparent 70%)`,
        animation: "bgOrb2 22s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute", borderRadius: "50%", pointerEvents: "none",
        width: "clamp(200px,25vw,420px)", height: "clamp(200px,25vw,420px)",
        top: "40%", left: "55%", filter: "blur(70px)",
        background: `radial-gradient(circle, ${accent}18 0%, transparent 70%)`,
        animation: "bgOrb3 14s ease-in-out infinite",
      }} />
    </>
  );
}

/* ── Animated dot grid (canvas) ── */
function DotGridCanvas({ accent }: { accent: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let t = 0;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const spacing = 44;
      const cols = Math.ceil(canvas.width  / spacing) + 1;
      const rows = Math.ceil(canvas.height / spacing) + 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * spacing;
          const y = r * spacing;
          const wave = Math.sin(t * 0.6 + c * 0.4 + r * 0.3);
          const alpha = (wave + 1) / 2 * 0.22 + 0.04;
          ctx.beginPath();
          ctx.arc(x, y, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = accent;
          ctx.globalAlpha = alpha;
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      t += 0.018;
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [accent]);

  return (
    <canvas
      ref={ref}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}
    />
  );
}

/* ── Animated SVG geo lines (process section) ── */
function GeoLines({ accent, cyan }: { accent: string; cyan: string }) {
  return (
    <svg
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0, opacity: 0.4 }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.7" />
          <stop offset="100%" stopColor={cyan} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="lg2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={cyan} stopOpacity="0.6" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
        {/* Glowing filter for lines */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Diagonal lines */}
      <line x1="0" y1="0" x2="100%" y2="100%" stroke="url(#lg1)" strokeWidth="1" filter="url(#glow)">
        <animate attributeName="opacity" values="0.15;0.45;0.15" dur="6s" repeatCount="indefinite" />
      </line>
      <line x1="100%" y1="0" x2="0" y2="100%" stroke="url(#lg2)" strokeWidth="1" filter="url(#glow)">
        <animate attributeName="opacity" values="0.25;0.55;0.25" dur="8s" repeatCount="indefinite" />
      </line>

      {/* Corner dots */}
      {[["8%","12%"],["92%","12%"],["8%","88%"],["92%","88%"]].map(([cx,cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3" fill={accent} filter="url(#glow)">
          <animate attributeName="opacity" values="0.2;0.7;0.2" dur={`${4+i}s`} repeatCount="indefinite" />
          <animate attributeName="r" values="2;5;2" dur={`${5+i}s`} repeatCount="indefinite" />
        </circle>
      ))}

      {/* Concentric rings */}
      <circle cx="50%" cy="50%" r="120" stroke={accent} strokeWidth="0.6" fill="none" filter="url(#glow)">
        <animate attributeName="r" values="80;150;80" dur="10s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.08;0.22;0.08" dur="10s" repeatCount="indefinite" />
      </circle>
      <circle cx="50%" cy="50%" r="200" stroke={cyan} strokeWidth="0.5" fill="none">
        <animate attributeName="r" values="160;240;160" dur="14s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.05;0.15;0.05" dur="14s" repeatCount="indefinite" />
      </circle>
      <circle cx="50%" cy="50%" r="280" stroke={accent} strokeWidth="0.4" fill="none">
        <animate attributeName="r" values="240;320;240" dur="18s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.03;0.1;0.03" dur="18s" repeatCount="indefinite" />
      </circle>

      {/* Moving dots along diagonal */}
      <circle r="3" fill={cyan} opacity="0.6" filter="url(#glow)">
        <animateMotion dur="6s" repeatCount="indefinite" path="M0,0 L800,600" />
        <animate attributeName="opacity" values="0;0.8;0" dur="6s" repeatCount="indefinite" />
      </circle>
      <circle r="2.5" fill={accent} opacity="0.5" filter="url(#glow)">
        <animateMotion dur="9s" repeatCount="indefinite" path="M800,0 L0,600" />
        <animate attributeName="opacity" values="0;0.7;0" dur="9s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

/* ── Animated Process connector with glowing particles ── */
function ProcessConnectors({ accent, cyan }: { accent: string; cyan: string }) {
  return (
    <svg
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1, overflow: "visible" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="processGlow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <linearGradient id="connGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.8" />
          <stop offset="33%" stopColor={cyan} stopOpacity="0.8" />
          <stop offset="66%" stopColor="#9A9AA5" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#22C55E" stopOpacity="0.8" />
        </linearGradient>
      </defs>

      {/* Horizontal connection line at ~top of step cards on desktop — purely decorative */}
      <line x1="12%" y1="13%" x2="88%" y2="13%" stroke="url(#connGrad)" strokeWidth="1.5"
        strokeDasharray="6 4" filter="url(#processGlow)">
        <animate attributeName="stroke-dashoffset" from="0" to="-40" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0.7;0.3" dur="4s" repeatCount="indefinite" />
      </line>

      {/* Moving dot along connector */}
      {[0, 1, 2].map(idx => (
        <circle key={idx} r="4" fill={idx === 0 ? accent : idx === 1 ? cyan : "#9A9AA5"} filter="url(#processGlow)">
          <animateMotion dur={`${4 + idx * 1.5}s`} begin={`${idx * 1.5}s`} repeatCount="indefinite"
            path="M 90,0 L 710,0" />
          <animate attributeName="opacity" values="0;1;1;0" dur={`${4 + idx * 1.5}s`} begin={`${idx * 1.5}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  );
}

/* ── Aurora band (contact section) ── */
function AuroraBand({ accent, cyan }: { accent: string; cyan: string }) {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
      {/* Main aurora sweep */}
      <div style={{
        position: "absolute", left: "-20%", right: "-20%", height: "55%", top: "10%",
        background: `linear-gradient(135deg, ${accent}22 0%, ${cyan}16 35%, #9A9AA514 65%, transparent 80%)`,
        filter: "blur(70px)",
        animation: "auroraBand 16s ease-in-out infinite",
        borderRadius: "60%",
        transform: "skewY(-6deg)",
      }} />
      {/* Secondary sweep */}
      <div style={{
        position: "absolute", left: "15%", right: "-25%", height: "40%", bottom: "5%",
        background: `linear-gradient(225deg, ${cyan}18 0%, ${accent}12 45%, transparent 70%)`,
        filter: "blur(80px)",
        animation: "auroraBand 20s ease-in-out infinite reverse",
        borderRadius: "50%",
        transform: "skewY(4deg)",
      }} />
      {/* Tertiary accent */}
      <div style={{
        position: "absolute", left: "40%", right: "10%", height: "30%", top: "55%",
        background: `radial-gradient(ellipse, #9A9AA518 0%, transparent 70%)`,
        filter: "blur(60px)",
        animation: "bgOrb3 12s ease-in-out infinite",
        borderRadius: "50%",
      }} />
      {/* Floating gradient blobs */}
      <div style={{
        position: "absolute", borderRadius: "50%", pointerEvents: "none",
        width: 500, height: 400, top: "5%", left: "5%",
        background: `radial-gradient(ellipse, ${accent}14 0%, transparent 70%)`,
        filter: "blur(80px)",
        animation: "meshBlob 18s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute", borderRadius: "50%", pointerEvents: "none",
        width: 420, height: 360, bottom: "10%", right: "5%",
        background: `radial-gradient(ellipse, ${cyan}12 0%, transparent 70%)`,
        filter: "blur(70px)",
        animation: "meshBlob 14s 4s ease-in-out infinite",
      }} />
    </div>
  );
}

/* ── Mesh gradient (services section) ── */
function MeshGradient({ accent, cyan }: { accent: string; cyan: string }) {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {[
        { top: "5%",  left: "5%",  w: 440, h: 380, color: accent, delay: 0,  dur: 16 },
        { top: "50%", left: "58%", w: 520, h: 420, color: cyan,   delay: 4,  dur: 20 },
        { top: "20%", left: "33%", w: 380, h: 320, color: accent, delay: 8,  dur: 14 },
        { top: "68%", left: "8%",  w: 400, h: 340, color: cyan,   delay: 2,  dur: 18 },
        { top: "10%", left: "70%", w: 340, h: 300, color: "#9A9AA5", delay: 6, dur: 22 },
      ].map((b, i) => (
        <div key={i} style={{
          position: "absolute", borderRadius: "50%", pointerEvents: "none",
          width: b.w, height: b.h, top: b.top, left: b.left,
          background: `radial-gradient(ellipse, ${b.color}1C 0%, transparent 70%)`,
          filter: "blur(75px)",
          animation: `meshBlob ${b.dur}s ${b.delay}s ease-in-out infinite`,
        }} />
      ))}
      {/* Noise texture overlay */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        opacity: 0.02,
      }} />
    </div>
  );
}

/* ── Floating glass shapes (AI-inspired geometric) ── */
function FloatingGlass({ accent, cyan }: { accent: string; cyan: string }) {
  const shapes = [
    { size: 80,  top: "8%",  left: "3%",  delay: 0,   dur: 12, color: accent },
    { size: 55,  top: "75%", left: "6%",  delay: 3,   dur: 16, color: cyan },
    { size: 65,  top: "15%", left: "88%", delay: 6,   dur: 14, color: "#9A9AA5" },
    { size: 45,  top: "80%", left: "85%", delay: 2,   dur: 18, color: accent },
    { size: 100, top: "45%", left: "92%", delay: 8,   dur: 20, color: cyan },
    { size: 70,  top: "55%", left: "1%",  delay: 4,   dur: 15, color: "#9A9AA5" },
  ];
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {shapes.map((s, i) => (
        <div key={i} style={{
          position: "absolute",
          width: s.size, height: s.size,
          top: s.top, left: s.left,
          borderRadius: i % 3 === 0 ? "30%" : i % 3 === 1 ? "50%" : "40% 60% 50% 40%",
          border: `1px solid ${s.color}20`,
          background: `linear-gradient(135deg, ${s.color}08 0%, transparent 70%)`,
          backdropFilter: "blur(1px)",
          animation: `floatShape ${s.dur}s ${s.delay}s ease-in-out infinite`,
          boxShadow: `0 0 20px ${s.color}10, inset 0 0 20px ${s.color}06`,
        }} />
      ))}
    </div>
  );
}

/* ── Animated grid lines for Projects section ── */
function GridLines({ accent }: { accent: string }) {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {/* Horizontal scan lines */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(${accent}08 1px, transparent 1px)`,
        backgroundSize: "100% 80px",
        animation: "gridScroll 20s linear infinite",
      }} />
      {/* Vertical lines */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(90deg, ${accent}06 1px, transparent 1px)`,
        backgroundSize: "80px 100%",
      }} />
      {/* Center radial fade mask */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, rgba(22,32,50,0.85) 80%)",
      }} />
    </div>
  );
}

/* ── Inline keyframes ── */
const CSS_KEYFRAMES = `
  @keyframes bgOrb1 {
    0%,100% { transform: translate(0,0) scale(1); }
    33%      { transform: translate(6%,-4%) scale(1.08); }
    66%      { transform: translate(-4%,6%) scale(0.93); }
  }
  @keyframes bgOrb2 {
    0%,100% { transform: translate(0,0) scale(1); }
    40%      { transform: translate(-5%,4%) scale(1.06); }
    70%      { transform: translate(5%,-3%) scale(0.95); }
  }
  @keyframes bgOrb3 {
    0%,100% { transform: translate(0,0); }
    50%      { transform: translate(-8%,6%); }
  }
  @keyframes auroraBand {
    0%,100% { transform: skewY(-6deg) translateX(0) scaleY(1); opacity:1; }
    50%      { transform: skewY(-3deg) translateX(4%) scaleY(1.18); opacity:0.7; }
  }
  @keyframes meshBlob {
    0%,100% { transform: translate(0,0) scale(1); }
    33%      { transform: translate(4%,-5%) scale(1.08); }
    66%      { transform: translate(-3%,4%) scale(0.93); }
  }
  @keyframes floatShape {
    0%,100% { transform: translateY(0) rotate(0deg); opacity:0.6; }
    33%      { transform: translateY(-18px) rotate(6deg); opacity:0.9; }
    66%      { transform: translateY(10px) rotate(-4deg); opacity:0.7; }
  }
  @keyframes gridScroll {
    0%   { background-position: 0 0; }
    100% { background-position: 0 80px; }
  }
`;

/* ── Main export ── */
export default function PremiumBG({
  variant = "mesh",
  accent = "#6366F1",
  cyan = "#22C55E",
}: Props) {
  return (
    <>
      <style>{CSS_KEYFRAMES}</style>

      {variant === "mesh" && (
        <>
          <MeshGradient accent={accent} cyan={cyan} />
          <FloatingGlass accent={accent} cyan={cyan} />
          <Orbs accent={accent} cyan={cyan} />
        </>
      )}

      {variant === "grid" && (
        <>
          <GridLines accent={accent} />
          <DotGridCanvas accent={accent} />
          <FloatingGlass accent={accent} cyan={cyan} />
          <Orbs accent={accent} cyan={cyan} />
        </>
      )}

      {variant === "aurora" && (
        <>
          <AuroraBand accent={accent} cyan={cyan} />
          <Orbs accent={accent} cyan={cyan} />
        </>
      )}

      {variant === "dots" && (
        <>
          <DotGridCanvas accent={accent} />
          <Orbs accent={accent} cyan={cyan} />
        </>
      )}

      {variant === "geo" && (
        <>
          <GeoLines accent={accent} cyan={cyan} />
          <ProcessConnectors accent={accent} cyan={cyan} />
          <Orbs accent={accent} cyan={cyan} />
        </>
      )}
    </>
  );
}

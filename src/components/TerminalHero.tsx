"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════════
   Terminal Hero — Split layout
   Left : sidebar + terminal
   Right: animated canvas scene (nodes + code rain + glow)
═══════════════════════════════════════════════════════ */

/* ── Canvas Scene component ── */
function SceneCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let W = 0, H = 0;

    /* ── resize ── */
    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width  = W * window.devicePixelRatio;
      canvas.height = H * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    /* ── nodes ── */
    interface Node { x: number; y: number; vx: number; vy: number; r: number; opacity: number; pulse: number }
    const nodes: Node[] = Array.from({ length: 38 }, () => ({
      x: Math.random() * 1000,
      y: Math.random() * 1000,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 2.5 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      pulse: Math.random() * Math.PI * 2,
    }));

    /* ── code rain columns ── */
    interface Col { x: number; y: number; speed: number; chars: string[]; opacity: number }
    const CODE_CHARS = "01アイウエオカキクケコサシスセソタチツテトナニヌネノ{}[]()<>=/+*&^%$#@!~".split("");
    const cols: Col[] = Array.from({ length: 18 }, (_, i) => ({
      x: (i + 0.5) * (1000 / 18),
      y: Math.random() * -800,
      speed: Math.random() * 1.2 + 0.4,
      chars: Array.from({ length: Math.floor(Math.random() * 10 + 6) }, () =>
        CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)]
      ),
      opacity: Math.random() * 0.18 + 0.04,
    }));

    /* ── floating code snippets ── */
    interface Snippet {
      x: number; y: number; vy: number;
      text: string; opacity: number; size: number; color: string;
    }
    const SNIPPETS = [
      "const ai = new LangChain()",
      "await openai.chat()",
      "npm run build",
      "git push origin main",
      "docker compose up",
      "SELECT * FROM projects",
      "export default function()",
      "async/await pattern",
      "useEffect(() => {}, [])",
      "fastapi.get('/api')",
      "python main.py --train",
      "vercel deploy --prod",
    ];
    const floating: Snippet[] = Array.from({ length: 8 }, (_, i) => ({
      x: Math.random() * 900 + 50,
      y: Math.random() * 1000,
      vy: -(Math.random() * 0.3 + 0.1),
      text: SNIPPETS[i % SNIPPETS.length],
      opacity: Math.random() * 0.12 + 0.04,
      size: Math.random() * 3 + 9,
      color: Math.random() > 0.5 ? "#C9A227" : "#60A5FA",
    }));

    /* ── orbs ── */
    interface Orb { x: number; y: number; r: number; phase: number; speed: number; color: string }
    const orbs: Orb[] = [
      { x: 0.2,  y: 0.25, r: 220, phase: 0,    speed: 0.0004, color: "rgba(201,162,39,0.07)"  },
      { x: 0.75, y: 0.6,  r: 280, phase: 2.1,  speed: 0.0003, color: "rgba(37,99,235,0.07)"   },
      { x: 0.5,  y: 0.85, r: 160, phase: 4.2,  speed: 0.0005, color: "rgba(16,185,129,0.045)" },
    ];

    let t = 0;

    const draw = () => {
      /* update W/H in case of resize */
      const w = W, h = H;
      ctx.clearRect(0, 0, w, h);

      /* background gradient */
      const bg = ctx.createLinearGradient(0, 0, w, h);
      bg.addColorStop(0,   "#0D0D0D");
      bg.addColorStop(0.5, "#0A0F1A");
      bg.addColorStop(1,   "#080D14");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      /* grid */
      ctx.strokeStyle = "rgba(255,255,255,0.025)";
      ctx.lineWidth = 0.5;
      const gs = 48;
      for (let x = 0; x < w; x += gs) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = 0; y < h; y += gs) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }

      /* orbs */
      orbs.forEach(o => {
        const ox = o.x * w + Math.sin(t * o.speed + o.phase) * 60;
        const oy = o.y * h + Math.cos(t * o.speed + o.phase * 1.3) * 40;
        const grad = ctx.createRadialGradient(ox, oy, 0, ox, oy, o.r);
        grad.addColorStop(0, o.color);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      });

      /* code rain */
      cols.forEach(col => {
        col.y += col.speed;
        if (col.y > h + 200) { col.y = -200; col.opacity = Math.random() * 0.18 + 0.04; }
        col.chars.forEach((ch, i) => {
          const alpha = i === col.chars.length - 1 ? col.opacity * 3 : col.opacity * (1 - i / col.chars.length);
          ctx.font = `${11}px ui-monospace,monospace`;
          ctx.fillStyle = i === col.chars.length - 1
            ? `rgba(201,162,39,${Math.min(alpha * 2, 0.5)})`
            : `rgba(96,165,250,${alpha})`;
          ctx.fillText(ch, col.x * (w / 1000), col.y + i * 16);
          /* randomly change char */
          if (Math.random() < 0.01) col.chars[i] = CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
        });
      });

      /* update + draw nodes */
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        n.pulse += 0.025;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        const pulsed = n.opacity + Math.sin(n.pulse) * 0.15;
        ctx.beginPath();
        ctx.arc(n.x * (w / 1000), n.y * (h / 1000), n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,162,39,${Math.max(0, pulsed)})`;
        ctx.fill();
      });

      /* node connections */
      const nx = nodes.map(n => ({ ...n, px: n.x * (w / 1000), py: n.y * (h / 1000) }));
      for (let i = 0; i < nx.length; i++) {
        for (let j = i + 1; j < nx.length; j++) {
          const dx = nx[i].px - nx[j].px;
          const dy = nx[i].py - nx[j].py;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            const alpha = (1 - dist / 160) * 0.12;
            ctx.beginPath();
            ctx.moveTo(nx[i].px, nx[i].py);
            ctx.lineTo(nx[j].px, nx[j].py);
            ctx.strokeStyle = `rgba(201,162,39,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      /* floating code snippets */
      floating.forEach(s => {
        s.y += s.vy;
        if (s.y < -40) { s.y = h + 40; s.x = Math.random() * (w - 100) + 50; }
        ctx.font = `${s.size}px ui-monospace,monospace`;
        ctx.fillStyle = s.color.replace(")", `,${s.opacity})`).replace("rgb", "rgba");
        // safe color replacement
        if (s.color.startsWith("#")) {
          const hex = s.color.replace("#", "");
          const r = parseInt(hex.substring(0, 2), 16);
          const g = parseInt(hex.substring(2, 4), 16);
          const b = parseInt(hex.substring(4, 6), 16);
          ctx.fillStyle = `rgba(${r},${g},${b},${s.opacity})`;
        }
        ctx.fillText(s.text, s.x, s.y);
      });

      t++;
      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}

/* ══════════════════════════════════════════════════════
   TERMINAL DATA
══════════════════════════════════════════════════════ */

type LT = "cmd" | "ok" | "gold" | "dim" | "hint" | "output" | "error" | "section" | "kv";

const C: Record<LT, string> = {
  cmd:     "#C9A227",
  ok:      "#34D399",
  gold:    "#FBBF24",
  dim:     "#4B5563",
  hint:    "#6B7280",
  output:  "#D1D5DB",
  error:   "#F87171",
  section: "#60A5FA",
  kv:      "#9CA3AF",
};

interface OL { text: string; type: LT }

const CMDS: Record<string, OL[]> = {
  whoami: [
    { text: "", type: "dim" },
    { text: "  Name        Muhammad Aqib",          type: "output" },
    { text: "  Role        Full Stack & AI Eng.",   type: "gold"   },
    { text: "  Location    Kot Addu, Pakistan",     type: "kv"     },
    { text: "  Remote      Available worldwide",    type: "kv"     },
    { text: "  Email       aqibm8123@gmail.com",    type: "kv"     },
    { text: "  Exp.        3+ years",               type: "kv"     },
    { text: "  Status      Open to work ✓",         type: "ok"     },
    { text: "", type: "dim" },
  ],
  skills: [
    { text: "", type: "dim" },
    { text: "  // Frontend",                                  type: "section" },
    { text: "  React  Next.js  TypeScript  Tailwind",         type: "output"  },
    { text: "", type: "dim" },
    { text: "  // Backend",                                   type: "section" },
    { text: "  Node.js  Python  FastAPI  PostgreSQL",         type: "output"  },
    { text: "", type: "dim" },
    { text: "  // AI & ML",                                   type: "section" },
    { text: "  LangChain  OpenAI  Claude  Gemini  RAG",       type: "output"  },
    { text: "", type: "dim" },
    { text: "  // DevOps",                                    type: "section" },
    { text: "  Docker  Vercel  AWS  CI/CD",                   type: "output"  },
    { text: "", type: "dim" },
  ],
  projects: [
    { text: "", type: "dim" },
    { text: "  // Featured Projects",                         type: "section" },
    { text: "", type: "dim" },
    { text: "  [01]  SaaS AI Platform",                       type: "gold"    },
    { text: "        Next.js · LangChain · Stripe",           type: "kv"      },
    { text: "", type: "dim" },
    { text: "  [02]  Workflow Automation",                    type: "gold"    },
    { text: "        Python · FastAPI · n8n",                 type: "kv"      },
    { text: "", type: "dim" },
    { text: "  [03]  E-Commerce Suite",                       type: "gold"    },
    { text: "        React · Node.js · PostgreSQL",           type: "kv"      },
    { text: "", type: "dim" },
    { text: "  [04]  AI Chatbot Builder",                     type: "gold"    },
    { text: "        OpenAI · Vector DB · RAG",               type: "kv"      },
    { text: "", type: "dim" },
    { text: "  → type exit  then scroll to #projects",        type: "hint"    },
    { text: "", type: "dim" },
  ],
  experience: [
    { text: "", type: "dim" },
    { text: "  // Work History",                              type: "section" },
    { text: "", type: "dim" },
    { text: "  2024 – present  Freelance AI Engineer",        type: "gold"    },
    { text: "  Global clients · SaaS & AI products",         type: "kv"      },
    { text: "", type: "dim" },
    { text: "  2023 – 2024    Full Stack Developer",          type: "gold"    },
    { text: "  SaaS platforms · React ecosystem",            type: "kv"      },
    { text: "", type: "dim" },
    { text: "  2022 – 2023    Frontend Developer",            type: "gold"    },
    { text: "  React · Next.js · TypeScript",                type: "kv"      },
    { text: "", type: "dim" },
    { text: "  🎓  MNS University, Multan",                  type: "output"  },
    { text: "", type: "dim" },
  ],
  contact: [
    { text: "", type: "dim" },
    { text: "  // Contact Info",                              type: "section" },
    { text: "", type: "dim" },
    { text: "  Email      aqibm8123@gmail.com",               type: "output"  },
    { text: "  WhatsApp   +92 337 5013984",                   type: "output"  },
    { text: "  LinkedIn   muhammad-aqib-715397408",           type: "output"  },
    { text: "  GitHub     MuhammadAqib2310",                  type: "output"  },
    { text: "", type: "dim" },
    { text: "  → type hire  to reach out now",                type: "hint"    },
    { text: "", type: "dim" },
  ],
  hire: [
    { text: "", type: "dim" },
    { text: "  Connecting...",                                type: "gold"    },
    { text: "  ✓ Opening contact section",                    type: "ok"      },
    { text: "", type: "dim" },
  ],
  help: [
    { text: "", type: "dim" },
    { text: "  // Commands",                                  type: "section" },
    { text: "", type: "dim" },
    { text: "  whoami       About me",                        type: "output"  },
    { text: "  skills       Tech stack",                      type: "output"  },
    { text: "  projects     My work",                         type: "output"  },
    { text: "  experience   Work history",                    type: "output"  },
    { text: "  contact      Contact info",                    type: "output"  },
    { text: "  hire         Work with me",                    type: "output"  },
    { text: "  clear        Clear screen",                    type: "output"  },
    { text: "  exit         Visual mode",                     type: "output"  },
    { text: "", type: "dim" },
    { text: "  Tip: ↑/↓ history  |  Tab autocomplete",       type: "hint"    },
    { text: "", type: "dim" },
  ],
  clear: [],
  exit: [
    { text: "", type: "dim" },
    { text: "  Switching to visual mode...",                  type: "gold"    },
    { text: "", type: "dim" },
  ],
};

const BOOT: { text: string; delay: number; type: LT }[] = [
  { text: "  $ portfolio --init",                            delay: 0,    type: "cmd"  },
  { text: "", delay: 120, type: "dim" },
  { text: "  ✓  Next.js 15  ·  React 19  ·  TypeScript",    delay: 300,  type: "ok"   },
  { text: "  ✓  Python  ·  FastAPI  ·  LangChain",           delay: 500,  type: "ok"   },
  { text: "  ✓  AI services connected",                      delay: 700,  type: "ok"   },
  { text: "  ✓  Status: open to work",                       delay: 880,  type: "gold" },
  { text: "", delay: 1020, type: "dim" },
  { text: "  Type  help  for all commands.",                  delay: 1120, type: "hint" },
  { text: "", delay: 1240, type: "dim" },
];

const COMPLETIONS = ["whoami","skills","projects","experience","contact","hire","help","clear","exit"];

interface TL { id: number; type: LT; text: string }
let _id = 0;
const uid = () => ++_id;

/* ══════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════ */
export default function TerminalHero({ onExit }: { onExit: () => void }) {
  const [lines,     setLines]     = useState<TL[]>([]);
  const [input,     setInput]     = useState("");
  const [booted,    setBooted]    = useState(false);
  const [glitching, setGlitching] = useState(false);
  const [history,   setHistory]   = useState<string[]>([]);
  const [histIdx,   setHistIdx]   = useState(-1);
  const [blink,     setBlink]     = useState(true);
  const [clock,     setClock]     = useState("");
  const [focused,   setFocused]   = useState(false);

  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString("en-US", { hour12: false }));
    tick(); const t = setInterval(tick, 1000); return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setBlink(v => !v), 520); return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    setLines([
      { id: uid(), type: "dim",  text: "" },
      { id: uid(), type: "gold", text: "  M.Aqib — Portfolio Terminal" },
      { id: uid(), type: "kv",   text: "  AI Engineer · Full Stack Developer · Pakistan" },
      { id: uid(), type: "dim",  text: "" },
    ]);
    BOOT.forEach(({ text, delay, type }) => {
      const t = setTimeout(() => setLines(prev => [...prev, { id: uid(), type, text }]), delay + 300);
      timers.push(t);
    });
    const done = setTimeout(() => {
      setBooted(true);
      setTimeout(() => { inputRef.current?.focus(); setFocused(true); }, 60);
    }, 1800);
    timers.push(done);
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight;
  }, [lines]);

  const triggerExit = useCallback(() => {
    setGlitching(true); setTimeout(onExit, 650);
  }, [onExit]);

  const runCommand = useCallback((raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    setHistory(h => [cmd, ...h.slice(0, 29)]);
    setHistIdx(-1);
    setLines(prev => [...prev, { id: uid(), type: "cmd", text: `  $ ${raw.trim()}` }]);
    if (cmd === "clear") { setLines([]); return; }
    if (cmd === "exit") {
      setLines(prev => [...prev, { id: uid(), type: "gold", text: "  Switching to visual mode..." }, { id: uid(), type: "dim", text: "" }]);
      setTimeout(triggerExit, 450); return;
    }
    if (cmd === "hire") {
      setLines(prev => [...prev, ...CMDS.hire.map(l => ({ id: uid(), type: l.type, text: l.text }))]);
      setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 700); return;
    }
    const result = CMDS[cmd];
    if (result !== undefined) {
      setLines(prev => [...prev, ...result.map(l => ({ id: uid(), type: l.type, text: l.text }))]);
    } else {
      setLines(prev => [...prev,
        { id: uid(), type: "error", text: `  bash: ${cmd}: command not found` },
        { id: uid(), type: "hint",  text: `  Type  help  to see available commands` },
        { id: uid(), type: "dim",   text: "" },
      ]);
    }
  }, [triggerExit]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { runCommand(input); setInput(""); }
    else if (e.key === "ArrowUp") {
      e.preventDefault(); const n = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(n); setInput(history[n] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault(); const n = Math.max(histIdx - 1, -1);
      setHistIdx(n); setInput(n === -1 ? "" : history[n]);
    } else if (e.key === "Tab") {
      e.preventDefault();
      const m = COMPLETIONS.find(c => c.startsWith(input.toLowerCase()) && c !== input.toLowerCase());
      if (m) setInput(m);
    }
  };

  const sideCmd    = ["whoami","skills","projects","experience","contact","hire"];
  const mobilePills= ["whoami","skills","projects","contact","hire"];
  const stats      = [{ l:"Projects",v:"20+"},{l:"Exp.",v:"3yr+"},{l:"Clients",v:"15+"}];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: glitching ? 0 : 1 }}
      transition={{ duration: glitching ? 0.4 : 0.55 }}
      className="fixed inset-0 z-[99990] flex flex-col"
      style={{ background: "#0D0D0D", fontFamily: "ui-monospace,SFMono-Regular,'SF Mono',Menlo,Consolas,monospace" }}
      onClick={() => { inputRef.current?.focus(); setFocused(true); }}
    >
      {/* glitch strips */}
      <AnimatePresence>
        {glitching && [...Array(6)].map((_, i) => (
          <motion.div key={i} className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0,1,0,0.8,0], x: [i%2===0?10:-10,0] }}
            transition={{ duration: 0.1, delay: i*0.055, repeat: 4 }}
            style={{ background: i%2===0?"rgba(201,162,39,0.18)":"rgba(37,99,235,0.15)",
              mixBlendMode:"screen", clipPath:`inset(${8+i*13}% 0 ${3+i*6}% 0)`, zIndex:60 }} />
        ))}
      </AnimatePresence>

      {/* ══ TITLEBAR ══ */}
      <div className="relative flex-shrink-0 flex items-center px-4"
        style={{ height:"2.75rem", zIndex:20, background:"#161616", borderBottom:"1px solid rgba(255,255,255,0.08)", gap:"0.75rem" }}>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button onClick={triggerExit}
            className="w-3 h-3 rounded-full relative flex items-center justify-center group"
            style={{ background:"#FF5F57" }}>
            <span className="absolute text-[7px] font-black opacity-0 group-hover:opacity-100" style={{ color:"#7a0000" }}>✕</span>
          </button>
          <div className="w-3 h-3 rounded-full" style={{ background:"#FFBD2E" }}/>
          <div className="w-3 h-3 rounded-full" style={{ background:"#28C840" }}/>
        </div>
        <div className="flex items-center gap-1.5 h-full px-4 text-xs"
          style={{ background:"#0D0D0D", borderLeft:"1px solid rgba(255,255,255,0.08)", borderRight:"1px solid rgba(255,255,255,0.08)", borderTop:"2px solid #C9A227", color:"rgba(255,255,255,0.6)", marginTop:"2px" }}>
          <span style={{ color:"#C9A227", fontSize:"0.65rem" }}>❯</span> bash
        </div>
        <div className="ml-auto flex items-center gap-4">
          <span className="hidden sm:flex items-center gap-1.5 text-xs" style={{ color:"#374151" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background:"#10B981" }}/>
            open to work
          </span>
          <span className="text-xs tabular-nums" style={{ color:"#374151" }}>{clock}</span>
        </div>
      </div>

      {/* ══ BODY ══ */}
      <div className="relative flex flex-1 overflow-hidden" style={{ zIndex:5 }}>

        {/* ── SIDEBAR (desktop) ── */}
        <motion.aside
          initial={{ opacity:0, x:-12 }} animate={{ opacity:1, x:0 }}
          transition={{ delay:0.2, duration:0.5, ease:[0.22,1,0.36,1] }}
          className="hidden lg:flex flex-col flex-shrink-0"
          style={{ width:"215px", background:"rgba(17,17,17,0.95)", borderRight:"1px solid rgba(255,255,255,0.06)", padding:"1.5rem 1rem 1.25rem", overflowY:"auto", scrollbarWidth:"none", backdropFilter:"blur(8px)" }}
        >
          {/* avatar */}
          <div className="flex flex-col items-center text-center mb-5">
            <div className="relative mb-3">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-black select-none"
                style={{ background:"linear-gradient(135deg,#1E3A5F,#2563EB)", color:"#fff", fontSize:"1rem",
                  boxShadow:"0 0 0 2px rgba(201,162,39,0.5), 0 8px 24px rgba(30,58,95,0.4)" }}>
                MA
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-[2.5px]"
                style={{ borderColor:"rgba(17,17,17,0.95)", background:"#10B981" }}>
                <div className="w-full h-full rounded-full animate-pulse" style={{ background:"#6EE7B7", opacity:0.7 }}/>
              </div>
            </div>
            <p className="text-sm font-bold" style={{ color:"#F1F5F9" }}>Muhammad Aqib</p>
            <p className="text-xs mt-1 font-medium" style={{ color:"#C9A227" }}>AI & Full Stack Eng.</p>
            <p className="text-xs mt-1" style={{ color:"#4B5563" }}>📍 Pakistan</p>
          </div>

          {/* stats */}
          <div className="grid grid-cols-3 gap-1 mb-5">
            {stats.map(s => (
              <div key={s.l} className="flex flex-col items-center rounded-xl py-2"
                style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.05)" }}>
                <span className="text-sm font-black" style={{ color:"#C9A227" }}>{s.v}</span>
                <span className="text-[0.57rem] mt-1 text-center" style={{ color:"#4B5563" }}>{s.l}</span>
              </div>
            ))}
          </div>

          <div style={{ height:"1px", background:"rgba(255,255,255,0.05)", marginBottom:"1rem" }}/>

          <p className="text-[0.6rem] font-bold mb-2" style={{ color:"#374151", letterSpacing:"0.18em" }}>COMMANDS</p>
          <div className="flex flex-col gap-0.5 mb-5">
            {sideCmd.map(cmd => (
              <button key={cmd}
                onClick={e => { e.stopPropagation(); runCommand(cmd); inputRef.current?.focus(); setFocused(true); }}
                className="w-full text-left text-xs rounded-lg px-3 py-2 transition-all duration-150 flex items-center gap-2"
                style={{ color:"#6B7280", border:"1px solid transparent" }}
                onMouseEnter={e => { const b=e.currentTarget as HTMLButtonElement; b.style.color="#E2E8F0"; b.style.background="rgba(201,162,39,0.07)"; b.style.borderColor="rgba(201,162,39,0.18)"; }}
                onMouseLeave={e => { const b=e.currentTarget as HTMLButtonElement; b.style.color="#6B7280"; b.style.background="transparent"; b.style.borderColor="transparent"; }}
              >
                <span style={{ color:"#C9A227", fontWeight:700, flexShrink:0 }}>$</span> {cmd}
              </button>
            ))}
          </div>

          <div style={{ height:"1px", background:"rgba(255,255,255,0.05)", marginBottom:"1rem" }}/>

          <p className="text-[0.6rem] font-bold mb-2" style={{ color:"#374151", letterSpacing:"0.18em" }}>LINKS</p>
          <div className="flex flex-col gap-1 mb-5">
            {[
              { label:"GitHub",   href:"https://github.com/MuhammadAqib2310",                 ico:"GH" },
              { label:"LinkedIn", href:"https://linkedin.com/in/muhammad-aqib-715397408",      ico:"in" },
              { label:"Email",    href:"mailto:aqibm8123@gmail.com",                           ico:"@"  },
            ].map(l => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs rounded-lg px-3 py-1.5 transition-all duration-150"
                style={{ color:"#6B7280", textDecoration:"none", border:"1px solid transparent" }}
                onMouseEnter={e => { const a=e.currentTarget as HTMLAnchorElement; a.style.color="#93C5FD"; a.style.background="rgba(37,99,235,0.07)"; a.style.borderColor="rgba(37,99,235,0.18)"; }}
                onMouseLeave={e => { const a=e.currentTarget as HTMLAnchorElement; a.style.color="#6B7280"; a.style.background="transparent"; a.style.borderColor="transparent"; }}
                onClick={e => e.stopPropagation()}
              >
                <span className="w-5 h-5 rounded-md flex items-center justify-center text-[0.6rem] font-black flex-shrink-0"
                  style={{ background:"rgba(255,255,255,0.05)", color:"#4B5563" }}>{l.ico}</span>
                {l.label}
              </a>
            ))}
          </div>

          <div className="mt-auto">
            <button onClick={e => { e.stopPropagation(); triggerExit(); }}
              className="w-full text-xs font-semibold rounded-xl py-2.5 transition-all duration-200 flex items-center justify-center gap-2"
              style={{ background:"rgba(201,162,39,0.1)", border:"1px solid rgba(201,162,39,0.25)", color:"#C9A227" }}
              onMouseEnter={e => { const b=e.currentTarget as HTMLButtonElement; b.style.background="rgba(201,162,39,0.18)"; b.style.borderColor="rgba(201,162,39,0.4)"; b.style.boxShadow="0 0 20px rgba(201,162,39,0.15)"; }}
              onMouseLeave={e => { const b=e.currentTarget as HTMLButtonElement; b.style.background="rgba(201,162,39,0.1)"; b.style.borderColor="rgba(201,162,39,0.25)"; b.style.boxShadow="none"; }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Switch to Visual Mode
            </button>
          </div>
        </motion.aside>

        {/* ── CENTER: TERMINAL ── */}
        <div className="flex flex-col overflow-hidden"
          style={{ width:"100%", maxWidth:"600px", flex:"0 0 auto", borderRight:"1px solid rgba(255,255,255,0.06)", minWidth:0 }}
          onClick={e => e.stopPropagation()}
        >
          {/* mobile top bar */}
          <div className="lg:hidden flex items-center justify-between flex-shrink-0 px-4 py-2.5"
            style={{ background:"#111111", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs flex-shrink-0"
                style={{ background:"linear-gradient(135deg,#1E3A5F,#2563EB)", color:"#fff", boxShadow:"0 0 0 1.5px rgba(201,162,39,0.4)" }}>
                MA
              </div>
              <div>
                <p className="text-xs font-bold" style={{ color:"#F1F5F9" }}>Muhammad Aqib</p>
                <p className="text-[0.62rem]" style={{ color:"#C9A227" }}>AI & Full Stack Engineer</p>
              </div>
            </div>
            <button onClick={e => { e.stopPropagation(); triggerExit(); }}
              className="text-xs font-semibold rounded-lg px-3 py-1.5 active:scale-95 transition-transform"
              style={{ background:"rgba(201,162,39,0.1)", border:"1px solid rgba(201,162,39,0.3)", color:"#C9A227", WebkitTapHighlightColor:"transparent" }}>
              Visual →
            </button>
          </div>

          {/* output */}
          <div ref={outputRef} className="flex-1 overflow-y-auto"
            style={{ padding:"1.25rem 1.5rem 0.5rem", scrollbarWidth:"thin", scrollbarColor:"#1F2937 transparent" }}>
            {lines.map(line => (
              <motion.div key={line.id}
                initial={{ opacity:0, y:2 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.1 }}
                style={{
                  color: C[line.type],
                  fontSize:"clamp(0.76rem,1.2vw,0.875rem)",
                  lineHeight:1.85,
                  whiteSpace:"pre-wrap",
                  wordBreak:"break-word",
                  fontWeight: line.type==="cmd"||line.type==="gold" ? 600 : 400,
                  fontStyle: line.type==="hint" ? "italic" : "normal",
                }}>
                {line.text || "\u00A0"}
              </motion.div>
            ))}
            <div style={{ height:"0.5rem" }}/>
          </div>

          {/* input */}
          <div className="flex-shrink-0 px-4 py-3"
            style={{ borderTop:"1px solid rgba(255,255,255,0.06)", background:"#0D0D0D" }}>
            {booted && !glitching && (
              <div className="flex items-center rounded-xl cursor-text"
                style={{
                  padding:"0.6rem 0.9rem",
                  background: focused ? "rgba(201,162,39,0.05)" : "rgba(255,255,255,0.03)",
                  border: focused ? "1px solid rgba(201,162,39,0.4)" : "1px solid rgba(255,255,255,0.08)",
                  transition:"all 0.15s ease",
                  gap:"0.25rem",
                }}
                onClick={() => { inputRef.current?.focus(); setFocused(true); }}
              >
                <span style={{ color:"#C9A227", fontWeight:700, flexShrink:0, fontSize:"0.82rem" }}>aqib</span>
                <span style={{ color:"#374151", flexShrink:0, fontSize:"0.82rem" }}>@</span>
                <span style={{ color:"#34D399", fontWeight:600, flexShrink:0, fontSize:"0.82rem" }}>portfolio</span>
                <span style={{ color:"#374151", flexShrink:0, fontSize:"0.82rem", margin:"0 4px" }}>:~$</span>
                <span style={{ color:"#F1F5F9", flex:1, whiteSpace:"pre-wrap", wordBreak:"break-word", fontSize:"0.82rem", minWidth:0 }}>{input}</span>
                <span style={{ display:"inline-block", width:"0.5ch", height:"1.1em",
                  background: blink && focused ? "#C9A227" : "transparent",
                  verticalAlign:"text-bottom", flexShrink:0, borderRadius:"1px", transition:"background 0.06s" }}/>
              </div>
            )}
            {booted && (
              <p className="mt-2 text-xs" style={{ color:"#374151", paddingLeft:"0.25rem" }}>
                <span className="hidden lg:inline">↑/↓ history  ·  Tab autocomplete  ·  </span>
                type <span style={{ color:"#C9A227" }}>help</span> for commands
              </p>
            )}
          </div>

          {/* mobile pills */}
          <AnimatePresence>
            {booted && (
              <motion.div initial={{ opacity:0,y:6 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0 }}
                className="lg:hidden flex-shrink-0"
                style={{ background:"#111111", borderTop:"1px solid rgba(255,255,255,0.06)", padding:"0.6rem 1rem" }}>
                <div className="flex items-center gap-2 overflow-x-auto" style={{ scrollbarWidth:"none" }}>
                  {mobilePills.map(cmd => (
                    <button key={cmd}
                      onClick={e => { e.stopPropagation(); runCommand(cmd); }}
                      className="text-xs font-semibold rounded-lg flex-shrink-0 active:scale-95 transition-transform"
                      style={{ padding:"0.4rem 0.9rem", background:"rgba(201,162,39,0.08)", border:"1px solid rgba(201,162,39,0.2)", color:"#C9A227", WebkitTapHighlightColor:"transparent" }}>
                      {cmd}
                    </button>
                  ))}
                  <div className="flex-shrink-0 h-5 w-px mx-1" style={{ background:"rgba(255,255,255,0.08)" }}/>
                  <button onClick={e => { e.stopPropagation(); runCommand("help"); }}
                    className="text-xs font-semibold rounded-lg flex-shrink-0 active:scale-95 transition-transform"
                    style={{ padding:"0.4rem 0.9rem", background:"rgba(96,165,250,0.08)", border:"1px solid rgba(96,165,250,0.2)", color:"#60A5FA", WebkitTapHighlightColor:"transparent" }}>
                    help
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── RIGHT: ANIMATED SCENE ── */}
        <div className="hidden lg:flex flex-1 relative overflow-hidden"
          onClick={e => e.stopPropagation()}>

          {/* canvas fills entire right panel */}
          <SceneCanvas />

          {/* overlay gradient left edge — smooth blend with terminal */}
          <div className="absolute inset-y-0 left-0 w-16 pointer-events-none"
            style={{ background:"linear-gradient(to right, #0D0D0D, transparent)" }}/>

          {/* centered info card */}
          <motion.div
            initial={{ opacity:0, y:20 }}
            animate={{ opacity:1, y:0 }}
            transition={{ delay:0.8, duration:0.8, ease:[0.22,1,0.36,1] }}
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
            style={{ padding:"2rem" }}
          >
            {/* big avatar */}
            <div className="relative mb-6">
              <div className="w-24 h-24 rounded-3xl flex items-center justify-center font-black text-2xl select-none"
                style={{
                  background:"linear-gradient(135deg,#1E3A5F 0%,#2563EB 60%,#1E3A5F 100%)",
                  color:"#fff",
                  boxShadow:"0 0 0 1px rgba(201,162,39,0.4), 0 0 60px rgba(30,58,95,0.6), 0 20px 40px rgba(0,0,0,0.5)",
                  letterSpacing:"-0.03em",
                }}>
                MA
              </div>
              {/* spinning ring */}
              <div className="absolute pointer-events-none anim-spin-slow"
                style={{ inset:"-8px", borderRadius:"28px",
                  background:"conic-gradient(from 0deg, #C9A227 0%, transparent 40%, #C9A227 70%, transparent 100%)",
                  WebkitMask:"radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 2px))",
                  mask:"radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 2px))" }}/>
              {/* online */}
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 flex items-center justify-center"
                style={{ borderColor:"#0A0F1A", background:"#10B981" }}>
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background:"#6EE7B7" }}/>
              </div>
            </div>

            <h2 className="text-xl font-black text-center mb-1" style={{ color:"#F1F5F9", letterSpacing:"-0.02em" }}>
              Muhammad Aqib
            </h2>
            <p className="text-sm font-semibold text-center mb-1" style={{ color:"#C9A227" }}>
              AI & Full Stack Engineer
            </p>
            <p className="text-xs text-center mb-6" style={{ color:"#4B5563" }}>📍 Pakistan  ·  Available Worldwide</p>

            {/* stat pills */}
            <div className="flex items-center gap-3 mb-6">
              {[{l:"Projects",v:"20+"},{l:"Experience",v:"3yr+"},{l:"Clients",v:"15+"}].map(s => (
                <div key={s.l} className="flex flex-col items-center rounded-2xl px-4 py-3"
                  style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", backdropFilter:"blur(12px)" }}>
                  <span className="text-lg font-black leading-none" style={{ color:"#C9A227" }}>{s.v}</span>
                  <span className="text-[0.62rem] mt-1" style={{ color:"#4B5563" }}>{s.l}</span>
                </div>
              ))}
            </div>

            {/* tech tags */}
            <div className="flex flex-wrap justify-center gap-2 max-w-xs">
              {["React","Next.js","Python","LangChain","FastAPI","OpenAI","TypeScript","Docker"].map(tag => (
                <span key={tag} className="text-xs rounded-lg px-2.5 py-1 font-medium"
                  style={{ background:"rgba(201,162,39,0.08)", border:"1px solid rgba(201,162,39,0.18)", color:"#C9A227" }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* available badge */}
            <div className="flex items-center gap-2 mt-6 rounded-full px-4 py-2"
              style={{ background:"rgba(16,185,129,0.1)", border:"1px solid rgba(16,185,129,0.25)", backdropFilter:"blur(12px)" }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background:"#10B981" }}/>
              <span className="text-xs font-semibold" style={{ color:"#34D399" }}>Open to Work — Hire Me</span>
            </div>

            {/* hint */}
            <p className="mt-4 text-xs" style={{ color:"#374151", fontStyle:"italic" }}>
              ← type commands in terminal
            </p>
          </motion.div>
        </div>
      </div>

      {/* ══ STATUS BAR ══ */}
      <div className="relative flex-shrink-0 flex items-center overflow-hidden" style={{ height:"1.6rem", zIndex:20, background:"#C9A227" }}>
        <div className="flex items-center px-3 h-full flex-shrink-0" style={{ background:"#1E3A5F" }}>
          <span className="text-xs font-bold" style={{ color:"#fff", letterSpacing:"0.1em" }}>M.AQIB</span>
        </div>
        <div className="flex items-center gap-3 px-3 flex-1 overflow-hidden" style={{ background:"rgba(0,0,0,0.22)" }}>
          <span className="text-xs font-semibold flex items-center gap-1.5 flex-shrink-0" style={{ color:"rgba(0,0,0,0.8)" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background:"#166534" }}/>
            open to work
          </span>
          <span className="hidden sm:inline text-xs" style={{ color:"rgba(0,0,0,0.4)" }}>·</span>
          <span className="hidden sm:inline text-xs" style={{ color:"rgba(0,0,0,0.6)" }}>bash  UTF-8</span>
          <span className="hidden md:inline text-xs" style={{ color:"rgba(0,0,0,0.4)" }}>·</span>
          <span className="hidden md:inline text-xs" style={{ color:"rgba(0,0,0,0.6)" }}>📍 Pakistan</span>
        </div>
        <div className="flex items-center px-3 flex-shrink-0" style={{ background:"rgba(0,0,0,0.15)" }}>
          <span className="text-xs font-semibold tabular-nums" style={{ color:"rgba(0,0,0,0.65)" }}>{clock}</span>
        </div>
      </div>

      {/* hidden input */}
      <input ref={inputRef} value={input}
        onChange={e => setInput(e.target.value)} onKeyDown={onKeyDown}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        className="fixed opacity-0 pointer-events-none"
        style={{ width:1, height:1, top:-100, left:-100 }}
        aria-label="Terminal input"
        autoComplete="off" autoCorrect="off" autoCapitalize="none" spellCheck={false} enterKeyHint="send"
      />
    </motion.div>
  );
}

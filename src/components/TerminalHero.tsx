"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════════
   Terminal Hero — Fully Responsive
   Mobile: full-width, tap-to-run chips, big input
   Desktop: sidebar + terminal split
═══════════════════════════════════════════════════════ */

type LT = "cmd"|"ok"|"gold"|"dim"|"hint"|"output"|"error"|"section"|"kv";

const C: Record<LT,string> = {
  cmd:     "#C9A227",
  ok:      "#34D399",
  gold:    "#FBBF24",
  dim:     "#374151",
  hint:    "#4B5563",
  output:  "#D1D5DB",
  error:   "#F87171",
  section: "#60A5FA",
  kv:      "#6B7280",
};

interface OL { text: string; type: LT }

/* Mobile-safe commands — no wide box-drawing, short lines */
const CMDS: Record<string, OL[]> = {
  whoami: [
    { text: "",                                    type:"dim"    },
    { text: "  Muhammad Aqib",                     type:"gold"   },
    { text: "  Full Stack & AI Engineer",          type:"output" },
    { text: "",                                    type:"dim"    },
    { text: "  📍 Kot Addu, Pakistan",             type:"kv"     },
    { text: "  🌐 Available worldwide",            type:"kv"     },
    { text: "  📧 aqibm8123@gmail.com",            type:"kv"     },
    { text: "  💼 3+ years experience",            type:"kv"     },
    { text: "",                                    type:"dim"    },
  ],
  skills: [
    { text: "",                                    type:"dim"     },
    { text: "  ◈ Frontend",                        type:"section" },
    { text: "  React · Next.js · TypeScript",      type:"output"  },
    { text: "  Tailwind CSS · Framer Motion",      type:"output"  },
    { text: "",                                    type:"dim"     },
    { text: "  ◈ Backend",                         type:"section" },
    { text: "  Node.js · Python · FastAPI",        type:"output"  },
    { text: "  PostgreSQL · Redis · REST",         type:"output"  },
    { text: "",                                    type:"dim"     },
    { text: "  ◈ AI / ML",                         type:"section" },
    { text: "  LangChain · OpenAI · Claude",       type:"output"  },
    { text: "  Gemini · RAG · Vector DB",          type:"output"  },
    { text: "",                                    type:"dim"     },
    { text: "  ◈ DevOps",                          type:"section" },
    { text: "  Docker · Vercel · AWS · CI/CD",     type:"output"  },
    { text: "",                                    type:"dim"     },
  ],
  projects: [
    { text: "",                                    type:"dim"    },
    { text: "  ◈ Featured Work",                   type:"section"},
    { text: "",                                    type:"dim"    },
    { text: "  01  SaaS AI Platform",              type:"gold"   },
    { text: "  Next.js · LangChain · Stripe",      type:"kv"     },
    { text: "",                                    type:"dim"    },
    { text: "  02  Workflow Automation",           type:"gold"   },
    { text: "  Python · FastAPI · n8n",            type:"kv"     },
    { text: "",                                    type:"dim"    },
    { text: "  03  E-Commerce Suite",              type:"gold"   },
    { text: "  React · Node.js · PostgreSQL",      type:"kv"     },
    { text: "",                                    type:"dim"    },
    { text: "  04  AI Chatbot Builder",            type:"gold"   },
    { text: "  OpenAI · Vector DB · RAG",          type:"kv"     },
    { text: "",                                    type:"dim"    },
    { text: "  → type exit → scroll to projects", type:"hint"   },
    { text: "",                                    type:"dim"    },
  ],
  experience: [
    { text: "",                                    type:"dim"    },
    { text: "  ◈ Work History",                    type:"section"},
    { text: "",                                    type:"dim"    },
    { text: "  2024 – present",                    type:"gold"   },
    { text: "  Freelance AI Engineer",             type:"output" },
    { text: "  Global clients · SaaS & AI",        type:"kv"     },
    { text: "",                                    type:"dim"    },
    { text: "  2023 – 2024",                       type:"gold"   },
    { text: "  Full Stack Developer",              type:"output" },
    { text: "  SaaS · React ecosystem",            type:"kv"     },
    { text: "",                                    type:"dim"    },
    { text: "  2022 – 2023",                       type:"gold"   },
    { text: "  Frontend Developer",                type:"output" },
    { text: "  React · Next.js · TypeScript",      type:"kv"     },
    { text: "",                                    type:"dim"    },
    { text: "  🎓 MNS University, Multan",         type:"output" },
    { text: "",                                    type:"dim"    },
  ],
  contact: [
    { text: "",                                    type:"dim"    },
    { text: "  ◈ Get in Touch",                    type:"section"},
    { text: "",                                    type:"dim"    },
    { text: "  email",                             type:"section"},
    { text: "  aqibm8123@gmail.com",               type:"output" },
    { text: "",                                    type:"dim"    },
    { text: "  whatsapp",                          type:"section"},
    { text: "  +92 337 5013984",                   type:"output" },
    { text: "",                                    type:"dim"    },
    { text: "  linkedin",                          type:"section"},
    { text: "  muhammad-aqib-715397408",           type:"output" },
    { text: "",                                    type:"dim"    },
    { text: "  github",                            type:"section"},
    { text: "  MuhammadAqib2310",                  type:"output" },
    { text: "",                                    type:"dim"    },
    { text: "  → type hire to reach out",          type:"hint"   },
    { text: "",                                    type:"dim"    },
  ],
  hire: [
    { text: "",                                    type:"dim"   },
    { text: "  connecting...",                     type:"gold"  },
    { text: "  ✓ opening contact section",         type:"ok"    },
    { text: "",                                    type:"dim"   },
  ],
  help: [
    { text: "",                                    type:"dim"    },
    { text: "  ◈ Commands",                        type:"section"},
    { text: "",                                    type:"dim"    },
    { text: "  whoami      about me",              type:"output" },
    { text: "  skills      tech stack",            type:"output" },
    { text: "  projects    my work",               type:"output" },
    { text: "  experience  work history",          type:"output" },
    { text: "  contact     reach out",             type:"output" },
    { text: "  hire        work with me",          type:"output" },
    { text: "  clear       clear screen",          type:"output" },
    { text: "  exit        visual mode",           type:"output" },
    { text: "",                                    type:"dim"    },
    { text: "  ↑/↓  history  |  Tab  complete",   type:"hint"   },
    { text: "",                                    type:"dim"    },
  ],
  clear: [],
  exit: [
    { text: "",                                    type:"dim"   },
    { text: "  switching to visual mode...",       type:"gold"  },
    { text: "",                                    type:"dim"   },
  ],
};

const BOOT: { text: string; delay: number; type: LT }[] = [
  { text: "  $ portfolio --init",              delay: 0,    type:"cmd"  },
  { text: "",                                  delay: 150,  type:"dim"  },
  { text: "  ✓ Next.js 15 · React 19",         delay: 320,  type:"ok"   },
  { text: "  ✓ Python · FastAPI · LangChain",  delay: 520,  type:"ok"   },
  { text: "  ✓ AI services connected",         delay: 720,  type:"ok"   },
  { text: "  ✓ open to work",                  delay: 900,  type:"gold" },
  { text: "",                                  delay: 1050, type:"dim"  },
  { text: "  type help for all commands",      delay: 1150, type:"hint" },
  { text: "",                                  delay: 1280, type:"dim"  },
];

const COMPLETIONS = ["whoami","skills","projects","experience","contact","hire","help","clear","exit"];

interface TL { id: number; type: LT; text: string }
let _id = 0;
const uid = () => ++_id;

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
  const [isMobile,  setIsMobile]  = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  /* detect mobile */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* clock */
  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString("en-US", { hour12: false }));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  /* cursor blink */
  useEffect(() => {
    const t = setInterval(() => setBlink(v => !v), 500);
    return () => clearInterval(t);
  }, []);

  /* boot sequence */
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    /* header — mobile shows short, desktop shows full */
    setLines([
      { id: uid(), type: "dim",  text: "" },
      { id: uid(), type: "gold", text: "  M.AQIB — PORTFOLIO" },
      { id: uid(), type: "kv",   text: "  AI Engineer · Full Stack Developer" },
      { id: uid(), type: "dim",  text: "" },
    ]);

    BOOT.forEach(({ text, delay, type }) => {
      const t = setTimeout(() => {
        setLines(prev => [...prev, { id: uid(), type, text }]);
      }, delay + 200);
      timers.push(t);
    });

    const done = setTimeout(() => {
      setBooted(true);
      /* don't auto-focus on mobile — keyboard popup is annoying */
      if (window.innerWidth >= 1024) {
        setTimeout(() => { inputRef.current?.focus(); setFocused(true); }, 80);
      }
    }, 1800);
    timers.push(done);
    return () => timers.forEach(clearTimeout);
  }, []);

  /* scroll to bottom */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const triggerExit = useCallback(() => {
    setGlitching(true);
    setTimeout(onExit, 650);
  }, [onExit]);

  const runCommand = useCallback((raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    setHistory(h => [cmd, ...h.slice(0, 29)]);
    setHistIdx(-1);
    setLines(prev => [...prev, { id: uid(), type: "cmd", text: `  $ ${raw.trim()}` }]);

    if (cmd === "clear") { setLines([]); return; }
    if (cmd === "exit") {
      setLines(prev => [...prev,
        { id: uid(), type: "gold", text: "  switching to visual mode..." },
        { id: uid(), type: "dim",  text: "" },
      ]);
      setTimeout(triggerExit, 450);
      return;
    }
    if (cmd === "hire") {
      const out = CMDS.hire;
      setLines(prev => [...prev, ...out.map(l => ({ id: uid(), type: l.type, text: l.text }))]);
      setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 700);
      return;
    }
    const result = CMDS[cmd];
    if (result !== undefined) {
      setLines(prev => [...prev, ...result.map(l => ({ id: uid(), type: l.type, text: l.text }))]);
    } else {
      setLines(prev => [...prev,
        { id: uid(), type: "error", text: `  bash: ${cmd}: not found` },
        { id: uid(), type: "hint",  text: `  type help for commands` },
        { id: uid(), type: "dim",   text: "" },
      ]);
    }
  }, [triggerExit]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { runCommand(input); setInput(""); }
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      const n = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(n); setInput(history[n] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const n = Math.max(histIdx - 1, -1);
      setHistIdx(n); setInput(n === -1 ? "" : history[n]);
    } else if (e.key === "Tab") {
      e.preventDefault();
      const m = COMPLETIONS.find(c => c.startsWith(input.toLowerCase()) && c !== input.toLowerCase());
      if (m) setInput(m);
    }
  };

  const stats   = [{ l: "Projects", v: "20+" }, { l: "Exp.", v: "3yr+" }, { l: "Clients", v: "15+" }];
  const sideCmd = ["whoami", "skills", "projects", "experience", "contact", "hire"];
  const mobilePills = ["whoami", "skills", "projects", "contact", "hire"];

  /* font sizes */
  const fs = isMobile ? "0.82rem" : "clamp(0.72rem,1.4vw,0.85rem)";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: glitching ? 0 : 1 }}
      transition={{ duration: glitching ? 0.4 : 0.5 }}
      className="fixed inset-0 z-[99990] flex flex-col"
      style={{ background: "#0D0D0D", fontFamily: "'JetBrains Mono','Fira Code','Courier New',monospace" }}
      onClick={() => { if (!isMobile) { inputRef.current?.focus(); setFocused(true); } }}
    >
      {/* subtle gold glow top */}
      <div className="absolute pointer-events-none" style={{
        top: 0, left: 0, right: 0, height: "280px", zIndex: 1,
        background: "radial-gradient(ellipse 70% 50% at 50% -5%, rgba(201,162,39,0.1) 0%, transparent 70%)",
      }} />

      {/* glitch strips */}
      <AnimatePresence>
        {glitching && [...Array(6)].map((_, i) => (
          <motion.div key={i} className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0, 0.8, 0], x: [i % 2 === 0 ? 10 : -10, 0] }}
            transition={{ duration: 0.1, delay: i * 0.055, repeat: 4 }}
            style={{
              background: i % 2 === 0 ? "rgba(201,162,39,0.18)" : "rgba(37,99,235,0.15)",
              mixBlendMode: "screen",
              clipPath: `inset(${8 + i * 13}% 0 ${3 + i * 6}% 0)`,
              zIndex: 60,
            }} />
        ))}
      </AnimatePresence>

      {/* ══ TITLEBAR ══ */}
      <div className="relative flex-shrink-0 flex items-center px-4 gap-3" style={{
        height: "2.5rem", zIndex: 20,
        background: "rgba(255,255,255,0.025)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}>
        {/* traffic lights */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button onClick={triggerExit}
            className="w-3 h-3 rounded-full relative flex items-center justify-center group"
            style={{ background: "#FF5F57" }}>
            <span className="absolute text-[7px] font-black opacity-0 group-hover:opacity-100" style={{ color: "#7a1010" }}>✕</span>
          </button>
          <div className="w-3 h-3 rounded-full" style={{ background: "#FFBD2E" }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "#28C840" }} />
        </div>

        {/* title tab */}
        <div className="flex items-center gap-1.5 ml-3 px-3 h-full text-xs font-medium"
          style={{
            background: "#0D0D0D",
            borderLeft: "1px solid rgba(255,255,255,0.07)",
            borderRight: "1px solid rgba(255,255,255,0.07)",
            borderTop: "1px solid #C9A227",
            color: "rgba(255,255,255,0.65)",
            letterSpacing: "0.03em",
            marginTop: "1px",
          }}>
          <span style={{ color: "#C9A227", fontSize: "0.6rem" }}>❯</span>
          <span className="hidden sm:inline">m.aqib — </span>bash
        </div>

        {/* clock */}
        <span className="ml-auto text-xs tabular-nums" style={{ color: "rgba(255,255,255,0.18)" }}>{clock}</span>
      </div>

      {/* ══ BODY ══ */}
      <div className="relative flex flex-1 overflow-hidden" style={{ zIndex: 5 }}>

        {/* ── DESKTOP SIDEBAR ── */}
        <motion.aside
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:flex flex-col flex-shrink-0 overflow-y-auto"
          style={{
            width: "240px",
            background: "#111111",
            borderRight: "1px solid rgba(255,255,255,0.06)",
            padding: "1.5rem 1rem",
            scrollbarWidth: "none",
          }}
        >
          {/* profile */}
          <div className="flex flex-col items-center text-center mb-5">
            <div className="relative mb-3">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center font-black"
                style={{
                  background: "linear-gradient(135deg,#1E3A5F,#2563EB)",
                  color: "#fff", fontSize: "1rem",
                  boxShadow: "0 0 0 2px rgba(201,162,39,0.4), 0 8px 32px rgba(30,58,95,0.5)",
                }}>
                MA
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2"
                style={{ borderColor: "#111111", background: "#10B981" }}>
                <div className="w-full h-full rounded-full animate-pulse" style={{ background: "#6EE7B7", opacity: 0.7 }} />
              </div>
            </div>
            <p className="text-sm font-bold" style={{ color: "#F1F5F9" }}>Muhammad Aqib</p>
            <p className="text-xs mt-0.5 font-medium" style={{ color: "#C9A227" }}>AI & Full Stack Eng.</p>
            <div className="flex items-center gap-1 mt-1.5">
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#10B981" }} />
              <span className="text-xs" style={{ color: "#6B7280" }}>available for work</span>
            </div>
          </div>

          {/* stats */}
          <div className="grid grid-cols-3 gap-1 mb-5">
            {stats.map(s => (
              <div key={s.l} className="flex flex-col items-center rounded-lg py-2"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <span className="text-sm font-black" style={{ color: "#C9A227" }}>{s.v}</span>
                <span className="text-[0.58rem] mt-0.5 text-center" style={{ color: "#4B5563" }}>{s.l}</span>
              </div>
            ))}
          </div>

          <div style={{ height: "1px", background: "rgba(255,255,255,0.05)", marginBottom: "1rem" }} />

          {/* commands */}
          <p className="text-[0.6rem] font-bold mb-2" style={{ color: "#374151", letterSpacing: "0.2em" }}>COMMANDS</p>
          <div className="flex flex-col gap-0.5 mb-5">
            {sideCmd.map(cmd => (
              <button key={cmd}
                onClick={e => { e.stopPropagation(); runCommand(cmd); inputRef.current?.focus(); }}
                className="w-full text-left text-xs rounded-lg px-3 py-2 transition-all duration-150 flex items-center gap-2"
                style={{ color: "#6B7280", border: "1px solid transparent" }}
                onMouseEnter={e => {
                  const b = e.currentTarget as HTMLButtonElement;
                  b.style.color = "#E2E8F0"; b.style.background = "rgba(201,162,39,0.08)"; b.style.borderColor = "rgba(201,162,39,0.2)";
                }}
                onMouseLeave={e => {
                  const b = e.currentTarget as HTMLButtonElement;
                  b.style.color = "#6B7280"; b.style.background = "transparent"; b.style.borderColor = "transparent";
                }}
              >
                <span style={{ color: "#C9A227", fontWeight: 700 }}>$</span> {cmd}
              </button>
            ))}
          </div>

          <div style={{ height: "1px", background: "rgba(255,255,255,0.05)", marginBottom: "1rem" }} />

          {/* links */}
          <p className="text-[0.6rem] font-bold mb-2" style={{ color: "#374151", letterSpacing: "0.2em" }}>LINKS</p>
          <div className="flex flex-col gap-1 mb-6">
            {[
              { label: "GitHub",   href: "https://github.com/MuhammadAqib2310",          ico: "GH" },
              { label: "LinkedIn", href: "https://linkedin.com/in/muhammad-aqib-715397408", ico: "in" },
              { label: "Email",    href: "mailto:aqibm8123@gmail.com",                    ico: "@"  },
            ].map(l => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs rounded-lg px-3 py-1.5 transition-all duration-150"
                style={{ color: "#6B7280", textDecoration: "none", border: "1px solid transparent" }}
                onMouseEnter={e => {
                  const a = e.currentTarget as HTMLAnchorElement;
                  a.style.color = "#93C5FD"; a.style.background = "rgba(37,99,235,0.07)"; a.style.borderColor = "rgba(37,99,235,0.2)";
                }}
                onMouseLeave={e => {
                  const a = e.currentTarget as HTMLAnchorElement;
                  a.style.color = "#6B7280"; a.style.background = "transparent"; a.style.borderColor = "transparent";
                }}
                onClick={e => e.stopPropagation()}
              >
                <span className="w-5 h-5 rounded-md flex items-center justify-center text-[0.6rem] font-black flex-shrink-0"
                  style={{ background: "rgba(255,255,255,0.05)", color: "#4B5563" }}>{l.ico}</span>
                {l.label}
              </a>
            ))}
          </div>

          {/* switch */}
          <div className="mt-auto">
            <button onClick={e => { e.stopPropagation(); triggerExit(); }}
              className="w-full text-xs font-semibold rounded-xl py-2.5 transition-all duration-200 flex items-center justify-center gap-2"
              style={{ background: "rgba(201,162,39,0.1)", border: "1px solid rgba(201,162,39,0.25)", color: "#C9A227" }}
              onMouseEnter={e => {
                const b = e.currentTarget as HTMLButtonElement;
                b.style.background = "rgba(201,162,39,0.18)"; b.style.borderColor = "rgba(201,162,39,0.4)";
              }}
              onMouseLeave={e => {
                const b = e.currentTarget as HTMLButtonElement;
                b.style.background = "rgba(201,162,39,0.1)"; b.style.borderColor = "rgba(201,162,39,0.25)";
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Switch to Visual Mode
            </button>
          </div>
        </motion.aside>

        {/* ── TERMINAL PANE ── */}
        <div className="flex-1 flex flex-col overflow-hidden" style={{ background: "#0D0D0D", minWidth: 0 }}>

          {/* ── MOBILE HEADER STRIP ── */}
          <div className="lg:hidden flex items-center justify-between px-4 py-2 flex-shrink-0"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "#111111" }}>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs"
                style={{ background: "linear-gradient(135deg,#1E3A5F,#2563EB)", color: "#fff", boxShadow: "0 0 0 1.5px rgba(201,162,39,0.4)" }}>
                MA
              </div>
              <div>
                <p className="text-xs font-bold" style={{ color: "#F1F5F9", lineHeight: 1.2 }}>Muhammad Aqib</p>
                <p className="text-[0.6rem]" style={{ color: "#C9A227" }}>AI & Full Stack Eng.</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#10B981" }} />
                <span className="text-[0.6rem]" style={{ color: "#6B7280" }}>available</span>
              </div>
              <button onClick={e => { e.stopPropagation(); triggerExit(); }}
                className="text-[0.65rem] font-semibold rounded-lg px-2.5 py-1 transition-all"
                style={{ background: "rgba(201,162,39,0.12)", border: "1px solid rgba(201,162,39,0.3)", color: "#C9A227" }}>
                visual →
              </button>
            </div>
          </div>

          {/* output scroll area */}
          <div className="flex-1 overflow-y-auto"
            style={{ padding: isMobile ? "0.75rem 1rem" : "1rem 1.25rem 0.75rem 1.25rem", scrollbarWidth: "thin", scrollbarColor: "#1E293B transparent" }}>

            {lines.map(line => (
              <motion.div key={line.id}
                initial={{ opacity: 0, y: 2 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.1 }}
                style={{
                  color: C[line.type] || "#9CA3AF",
                  fontSize: fs,
                  lineHeight: isMobile ? 1.75 : 1.85,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-all",
                  overflowWrap: "anywhere",
                  fontWeight: line.type === "cmd" || line.type === "gold" ? 600 : 400,
                  fontStyle: line.type === "hint" ? "italic" : "normal",
                }}
              >
                {line.text || "\u00A0"}
              </motion.div>
            ))}

            {/* ── INPUT ROW ── */}
            {booted && !glitching && (
              <div
                className="flex items-center mt-3 rounded-xl"
                style={{
                  padding: isMobile ? "0.65rem 0.875rem" : "0.5rem 0.75rem",
                  background: focused ? "rgba(201,162,39,0.06)" : "rgba(255,255,255,0.03)",
                  border: focused ? "1px solid rgba(201,162,39,0.35)" : "1px solid rgba(255,255,255,0.08)",
                  transition: "all 0.18s ease",
                  gap: "0.3rem",
                }}
                onClick={() => { inputRef.current?.focus(); setFocused(true); }}
              >
                <span style={{ color: "#C9A227", fontWeight: 700, flexShrink: 0, fontSize: fs }}>aqib</span>
                <span style={{ color: "#374151", flexShrink: 0, fontSize: fs }}>@</span>
                <span style={{ color: "#34D399", fontWeight: 600, flexShrink: 0, fontSize: fs }}>portfolio</span>
                <span style={{ color: "#374151", flexShrink: 0, fontSize: fs, margin: "0 2px" }}>:~$</span>
                <span style={{ color: "#F1F5F9", flex: 1, whiteSpace: "pre-wrap", wordBreak: "break-all", fontSize: fs }}>{input}</span>
                <span style={{
                  display: "inline-block", width: "0.5ch", height: "1.1em",
                  background: blink && focused ? "#C9A227" : "transparent",
                  verticalAlign: "text-bottom", flexShrink: 0, borderRadius: "1px",
                  transition: "background 0.06s",
                }} />
              </div>
            )}

            {/* mobile keyboard hint */}
            {booted && isMobile && (
              <p className="mt-2 text-center" style={{ fontSize: "0.65rem", color: "#374151", fontStyle: "italic" }}>
                tap input to type · or use buttons below
              </p>
            )}

            <div ref={bottomRef} />
          </div>

          {/* ── MOBILE BOTTOM PILLS ── */}
          <AnimatePresence>
            {booted && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="lg:hidden flex-shrink-0"
                style={{ borderTop: "1px solid rgba(255,255,255,0.07)", background: "#111111" }}
              >
                {/* pill row */}
                <div className="flex items-center gap-2 px-3 py-2.5 overflow-x-auto"
                  style={{ scrollbarWidth: "none" }}>
                  {mobilePills.map(cmd => (
                    <button key={cmd}
                      onClick={e => { e.stopPropagation(); runCommand(cmd); }}
                      className="text-xs font-semibold rounded-lg flex-shrink-0 active:scale-95 transition-transform"
                      style={{
                        padding: "0.4rem 1rem",
                        background: "rgba(201,162,39,0.08)",
                        border: "1px solid rgba(201,162,39,0.22)",
                        color: "#C9A227",
                        letterSpacing: "0.03em",
                        WebkitTapHighlightColor: "transparent",
                      }}
                    >
                      {cmd}
                    </button>
                  ))}
                  <div className="flex-shrink-0 w-px h-5" style={{ background: "rgba(255,255,255,0.08)" }} />
                  <button
                    onClick={e => { e.stopPropagation(); triggerExit(); }}
                    className="text-xs font-semibold rounded-lg flex-shrink-0 active:scale-95 transition-transform"
                    style={{
                      padding: "0.4rem 1rem",
                      background: "rgba(201,162,39,0.14)",
                      border: "1px solid rgba(201,162,39,0.35)",
                      color: "#C9A227",
                      WebkitTapHighlightColor: "transparent",
                    }}
                  >
                    exit →
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ══ STATUS BAR ══ */}
      <div className="relative flex-shrink-0 flex items-center overflow-hidden" style={{
        height: "1.6rem", zIndex: 20, background: "#C9A227",
      }}>
        <div className="flex items-center px-3 h-full flex-shrink-0" style={{ background: "#1E3A5F" }}>
          <span className="text-xs font-bold" style={{ color: "#fff", letterSpacing: "0.08em" }}>M.AQIB</span>
        </div>
        <div className="flex items-center gap-3 px-3 h-full flex-1 overflow-hidden" style={{ background: "rgba(0,0,0,0.25)" }}>
          <span className="text-xs font-semibold flex items-center gap-1 flex-shrink-0" style={{ color: "rgba(0,0,0,0.85)" }}>
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "#166534" }} />
            open to work
          </span>
          <span className="hidden sm:inline text-xs" style={{ color: "rgba(0,0,0,0.45)" }}>·</span>
          <span className="hidden sm:inline text-xs" style={{ color: "rgba(0,0,0,0.6)" }}>bash · UTF-8</span>
          <span className="hidden md:inline text-xs" style={{ color: "rgba(0,0,0,0.45)" }}>·</span>
          <span className="hidden md:inline text-xs" style={{ color: "rgba(0,0,0,0.6)" }}>📍 Pakistan</span>
        </div>
        <div className="flex items-center px-3 h-full flex-shrink-0" style={{ background: "rgba(0,0,0,0.18)" }}>
          <span className="text-xs font-semibold tabular-nums" style={{ color: "rgba(0,0,0,0.7)" }}>{clock}</span>
        </div>
      </div>

      {/* hidden real input */}
      <input
        ref={inputRef}
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={onKeyDown}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="fixed opacity-0"
        style={{ width: 1, height: 1, top: -100, left: -100, pointerEvents: "none" }}
        aria-label="Terminal command input"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        enterKeyHint="send"
      />
    </motion.div>
  );
}

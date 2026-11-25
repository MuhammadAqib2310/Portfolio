"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
  { text: "Initializing portfolio v3.0.0...", delay: 0,    color: "#6EE7B7" },
  { text: "Loading modules: React · Next.js · TypeScript", delay: 320,  color: "#93C5FD" },
  { text: "Loading modules: Python · FastAPI · LangChain", delay: 620,  color: "#93C5FD" },
  { text: "Connecting to AI services... ✓",               delay: 940,  color: "#6EE7B7" },
  { text: "Status: Available for hire ✓",                 delay: 1200, color: "#C9A227" },
  { text: "",                                              delay: 1450, color: "" },
  { text: "Type 'help' to see available commands.",        delay: 1550, color: "#94A3B8" },
  { text: "",                                              delay: 1700, color: "" },
];

const COMMANDS: Record<string, { output: string[]; color?: string }> = {
  whoami: {
    output: [
      "┌─────────────────────────────────────────┐",
      "│  Muhammad Aqib                          │",
      "│  Full Stack & AI Automation Engineer    │",
      "│  📍 Pakistan  |  🌐 Available Worldwide │",
      "│  📧 aqibm8123@gmail.com                 │",
      "└─────────────────────────────────────────┘",
    ],
    color: "#C9A227",
  },
  skills: {
    output: [
      "⚡ Frontend   →  React, Next.js, TypeScript, Tailwind",
      "⚙️  Backend    →  Node.js, Python, FastAPI, PostgreSQL",
      "🤖 AI / ML    →  LangChain, OpenAI, Gemini, Claude API",
      "☁️  DevOps     →  Docker, Vercel, AWS, CI/CD",
      "📱 Mobile     →  React Native, Expo",
    ],
    color: "#6EE7B7",
  },
  projects: {
    output: [
      "01  SaaS AI Platform     →  Next.js + LangChain + Stripe",
      "02  Workflow Automation  →  Python + FastAPI + n8n",
      "03  E-Commerce Suite     →  React + Node + PostgreSQL",
      "04  AI Chatbot Builder   →  OpenAI + Vector DB + RAG",
      "05  Real-time Dashboard  →  WebSockets + Redis + Charts",
      "",
      "   → scroll to #projects for live demos",
    ],
    color: "#93C5FD",
  },
  experience: {
    output: [
      "2024 – Now   Freelance AI Engineer (Global Clients)",
      "2023 – 2024  Full Stack Developer (SaaS Products)",
      "2022 – 2023  Frontend Developer (React Ecosystem)",
      "",
      "🎓  MNS University of Engineering, Multan",
    ],
    color: "#F9A8D4",
  },
  contact: {
    output: [
      "📧  Email    →  aqibm8123@gmail.com",
      "📱  WhatsApp →  +92 337 5013984",
      "💼  LinkedIn →  linkedin.com/in/muhammad-aqib-715397408",
      "🐙  GitHub   →  github.com/MuhammadAqib2310",
      "",
      "   → type 'hire' to reach out directly",
    ],
    color: "#6EE7B7",
  },
  hire: {
    output: [
      "Opening contact section...",
      "",
      "✓  Let's build something great together!",
    ],
    color: "#C9A227",
  },
  help: {
    output: [
      "Available commands:",
      "",
      "  whoami      →  About me",
      "  skills      →  Tech stack & expertise",
      "  projects    →  Featured work",
      "  experience  →  Work history",
      "  contact     →  Get in touch",
      "  hire        →  Work with me",
      "  clear       →  Clear terminal",
      "  exit        →  Switch to visual mode",
      "",
      "Tip: press ↑ / ↓ to cycle command history",
    ],
    color: "#94A3B8",
  },
  clear: { output: [] },
  exit: {
    output: ["Switching to visual mode..."],
    color: "#C9A227",
  },
};

interface TerminalLine {
  id: number;
  type: "boot" | "input" | "output" | "error";
  text: string;
  color?: string;
}

let _id = 0;
const uid = () => ++_id;

interface Props {
  onExit: () => void;
}

export default function TerminalHero({ onExit }: Props) {
  const [lines,     setLines]     = useState<TerminalLine[]>([]);
  const [input,     setInput]     = useState("");
  const [booted,    setBooted]    = useState(false);
  const [glitching, setGlitching] = useState(false);
  const [history,   setHistory]   = useState<string[]>([]);
  const [histIdx,   setHistIdx]   = useState(-1);
  const [cursorOn,  setCursorOn]  = useState(true);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  /* cursor blink */
  useEffect(() => {
    const t = setInterval(() => setCursorOn(v => !v), 530);
    return () => clearInterval(t);
  }, []);

  /* boot sequence */
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    const header: TerminalLine[] = [
      { id: uid(), type: "boot", text: "╔══════════════════════════════════════════════╗", color: "#334155" },
      { id: uid(), type: "boot", text: "║   M.Aqib Terminal  ·  AI & Full Stack Eng.  ║", color: "#C9A227" },
      { id: uid(), type: "boot", text: "╚══════════════════════════════════════════════╝", color: "#334155" },
      { id: uid(), type: "boot", text: "", color: "" },
    ];
    setLines(header);

    BOOT_LINES.forEach(({ text, delay, color }) => {
      const t = setTimeout(() => {
        setLines(prev => [...prev, { id: uid(), type: "boot", text, color }]);
      }, delay);
      timers.push(t);
    });

    const done = setTimeout(() => {
      setBooted(true);
      setTimeout(() => inputRef.current?.focus(), 100);
    }, 1900);
    timers.push(done);

    return () => timers.forEach(clearTimeout);
  }, []);

  /* auto scroll */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  /* run command */
  const runCommand = useCallback((raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    setHistory(h => [cmd, ...h.slice(0, 19)]);
    setHistIdx(-1);

    setLines(prev => [
      ...prev,
      { id: uid(), type: "input", text: `$ ${raw.trim()}`, color: "#E2E8F0" },
    ]);

    if (cmd === "clear") {
      setLines([]);
      return;
    }

    if (cmd === "exit") {
      setLines(prev => [
        ...prev,
        { id: uid(), type: "output", text: "Switching to visual mode...", color: "#C9A227" },
        { id: uid(), type: "output", text: "", color: "" },
      ]);
      setTimeout(() => { setGlitching(true); setTimeout(onExit, 800); }, 400);
      return;
    }

    if (cmd === "hire") {
      setLines(prev => [
        ...prev,
        ...(COMMANDS.hire.output.map(t => ({ id: uid(), type: "output" as const, text: t, color: COMMANDS.hire.color }))),
        { id: uid(), type: "output", text: "", color: "" },
      ]);
      setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 800);
      return;
    }

    const result = COMMANDS[cmd];
    if (result) {
      setLines(prev => [
        ...prev,
        ...result.output.map(t => ({ id: uid(), type: "output" as const, text: t, color: result.color })),
        { id: uid(), type: "output", text: "", color: "" },
      ]);
    } else {
      setLines(prev => [
        ...prev,
        { id: uid(), type: "error", text: `command not found: ${cmd}  (type 'help' for commands)`, color: "#F87171" },
        { id: uid(), type: "output", text: "", color: "" },
      ]);
    }
  }, [onExit]);

  /* keyboard */
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(next);
      setInput(history[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? "" : history[next]);
    }
  };

  return (
    /* ── FULL SCREEN fixed overlay — above everything including navbar ── */
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: glitching ? 0 : 1 }}
      transition={{ duration: glitching ? 0.5 : 0.6 }}
      className="fixed inset-0 z-[99990] flex flex-col"
      style={{
        background: "#080D18",
        fontFamily: "'Courier New', 'Fira Code', monospace",
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* CRT scanlines */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.07) 2px, rgba(0,0,0,0.07) 4px)",
        }}
      />

      {/* Ambient glow top */}
      <div className="absolute pointer-events-none" style={{
        top: 0, left: 0, right: 0, height: "40%",
        background: "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(30,58,95,0.35) 0%, transparent 70%)",
      }} />

      {/* Glitch strips on exit */}
      <AnimatePresence>
        {glitching && [...Array(5)].map((_, i) => (
          <motion.div key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0, 0.6, 0], x: [(i % 2 === 0 ? 8 : -8), 0] }}
            transition={{ duration: 0.12, delay: i * 0.07, repeat: 3 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: i % 2 === 0 ? "rgba(201,162,39,0.12)" : "rgba(30,58,95,0.18)",
              mixBlendMode: "screen",
              clipPath: `inset(${15 + i * 14}% 0 ${5 + i * 8}% 0)`,
              zIndex: 20,
            }}
          />
        ))}
      </AnimatePresence>

      {/* ── Window chrome bar ── */}
      <div className="relative z-20 flex-shrink-0 flex items-center gap-2 px-5"
        style={{
          height: "2.75rem",
          background: "rgba(255,255,255,0.03)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <span className="w-3 h-3 rounded-full" style={{ background: "#F87171" }} />
        <span className="w-3 h-3 rounded-full" style={{ background: "#FBBF24" }} />
        <span className="w-3 h-3 rounded-full" style={{ background: "#34D399" }} />
        <span className="ml-auto text-xs font-semibold"
          style={{ color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em" }}>
          m.aqib — portfolio terminal
        </span>
      </div>

      {/* ── Terminal output area ── */}
      <div
        className="relative z-20 flex-1 overflow-y-auto px-6 py-5"
        style={{ maxWidth: "900px", width: "100%", margin: "0 auto", alignSelf: "center" }}
      >
        {lines.map((line) => (
          <motion.div
            key={line.id}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.15 }}
            style={{
              color: line.color || "#94A3B8",
              fontSize: "clamp(0.78rem, 1.9vw, 0.95rem)",
              lineHeight: 1.8,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              fontWeight: line.type === "input" ? 700 : 400,
            }}
          >
            {line.text || "\u00A0"}
          </motion.div>
        ))}

        {/* Live input line */}
        {booted && !glitching && (
          <div className="flex items-center gap-2 mt-1"
            style={{ fontSize: "clamp(0.78rem, 1.9vw, 0.95rem)" }}>
            <span style={{ color: "#C9A227", fontWeight: 700, flexShrink: 0 }}>aqib@portfolio</span>
            <span style={{ color: "#6EE7B7", flexShrink: 0 }}>:~$</span>
            <span style={{ color: "#E2E8F0", flex: 1, whiteSpace: "pre" }}>{input}</span>
            <span style={{
              display: "inline-block", width: "0.55ch", height: "1.1em",
              background: cursorOn ? "#C9A227" : "transparent",
              verticalAlign: "text-bottom", flexShrink: 0,
              transition: "background 0.08s",
            }} />
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* ── Hidden real input ── */}
      <input
        ref={inputRef}
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={onKeyDown}
        className="fixed opacity-0 pointer-events-none"
        style={{ width: 1, height: 1, top: -100, left: -100 }}
        aria-label="Terminal input"
        autoComplete="off"
        spellCheck={false}
      />

      {/* ── Bottom bar: quick pills + switch button ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: booted ? 1 : 0, y: booted ? 0 : 12 }}
        transition={{ delay: 0.2 }}
        className="relative z-20 flex-shrink-0 flex flex-wrap items-center justify-between gap-3 px-5 py-3"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.07)",
          background: "rgba(255,255,255,0.02)",
        }}
      >
        {/* Quick command pills */}
        <div className="flex flex-wrap gap-2">
          {["whoami", "skills", "projects", "contact", "hire"].map((cmd) => (
            <button
              key={cmd}
              onClick={() => { runCommand(cmd); inputRef.current?.focus(); }}
              className="text-xs font-bold rounded-lg transition-all duration-150"
              style={{
                padding: "0.3rem 0.85rem",
                background: "rgba(201,162,39,0.08)",
                border: "1px solid rgba(201,162,39,0.22)",
                color: "#C9A227",
                fontFamily: "'Courier New', monospace",
                letterSpacing: "0.04em",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(201,162,39,0.18)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(201,162,39,0.08)";
              }}
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Switch button */}
        <button
          onClick={() => { setGlitching(true); setTimeout(onExit, 800); }}
          className="flex items-center gap-2 text-xs font-semibold transition-all duration-200 ml-auto"
          style={{
            padding: "0.4rem 1.1rem",
            borderRadius: "999px",
            background: "rgba(30,58,95,0.3)",
            border: "1px solid rgba(99,142,220,0.3)",
            color: "rgba(147,197,253,0.85)",
            fontFamily: "var(--font-inter, sans-serif)",
            letterSpacing: "0.06em",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(30,58,95,0.5)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(30,58,95,0.3)";
          }}
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <rect x="0.5" y="0.5" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.1"/>
            <path d="M3.5 5l2 1.5-2 1.5M6.5 8H9" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
          </svg>
          Switch to Visual Mode
        </button>
      </motion.div>

      <style>{`
        @keyframes glitch-h {
          0%,100% { transform: translateX(0); }
          25%      { transform: translateX(4px); }
          75%      { transform: translateX(-4px); }
        }
      `}</style>
    </motion.div>
  );
}

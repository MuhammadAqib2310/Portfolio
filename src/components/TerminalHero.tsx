"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════
   Terminal Hero — Interactive CLI Portfolio Experience
   Features:
   - Auto-typewriter boot sequence
   - Live interactive commands (whoami, skills, projects, contact, help, clear)
   - Glitch dissolve transition → normal hero
   - Fully keyboard accessible
═══════════════════════════════════════════════════ */

const BOOT_LINES = [
  { text: "Initializing portfolio v3.0.0...", delay: 0,    color: "#6EE7B7" },
  { text: "Loading modules: React · Next.js · TypeScript", delay: 320,  color: "#93C5FD" },
  { text: "Loading modules: Python · FastAPI · LangChain", delay: 620,  color: "#93C5FD" },
  { text: "Connecting to AI services... ✓", delay: 940,  color: "#6EE7B7" },
  { text: "Status: Available for hire ✓", delay: 1200, color: "#C9A227" },
  { text: "", delay: 1450, color: "" },
  { text: "Type 'help' to see available commands.", delay: 1550, color: "#94A3B8" },
  { text: "", delay: 1700, color: "" },
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
      "   → scroll to #contact or type 'hire' to reach out",
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
      "Tip: press ↑/↓ to cycle command history",
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
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState("");
  const [booted, setBooted] = useState(false);
  const [glitching, setGlitching] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [cursorOn, setCursorOn] = useState(true);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* ── cursor blink ── */
  useEffect(() => {
    const t = setInterval(() => setCursorOn(v => !v), 530);
    return () => clearInterval(t);
  }, []);

  /* ── boot sequence ── */
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Header lines
    const header: TerminalLine[] = [
      { id: uid(), type: "boot", text: "╔══════════════════════════════════════════════╗", color: "#1E3A5F" },
      { id: uid(), type: "boot", text: "║   M.Aqib Terminal  ·  AI & Full Stack Eng.  ║", color: "#C9A227" },
      { id: uid(), type: "boot", text: "╚══════════════════════════════════════════════╝", color: "#1E3A5F" },
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
    }, 1800);
    timers.push(done);

    return () => timers.forEach(clearTimeout);
  }, []);

  /* ── auto scroll ── */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  /* ── run command ── */
  const runCommand = useCallback((raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    // add to history
    setHistory(h => [cmd, ...h.slice(0, 19)]);
    setHistIdx(-1);

    // echo input line
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
      setTimeout(() => {
        setGlitching(true);
        setTimeout(onExit, 900);
      }, 500);
      return;
    }

    if (cmd === "hire") {
      setLines(prev => [
        ...prev,
        ...(COMMANDS.hire.output.map(t => ({ id: uid(), type: "output" as const, text: t, color: COMMANDS.hire.color }))),
        { id: uid(), type: "output", text: "", color: "" },
      ]);
      setTimeout(() => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      }, 800);
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
        { id: uid(), type: "error", text: `command not found: ${cmd}  (type 'help' for available commands)`, color: "#F87171" },
        { id: uid(), type: "output", text: "", color: "" },
      ]);
    }
  }, [onExit]);

  /* ── keyboard handler ── */
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: glitching ? 0 : 1 }}
      transition={{ duration: glitching ? 0.6 : 0.5 }}
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "#0A0F1A",
        fontFamily: "'Courier New', 'Fira Code', monospace",
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* ── CRT scanlines overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
          animation: glitching ? "glitch-scanlines 0.1s infinite" : "none",
        }}
      />

      {/* ── Ambient glow ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(30,58,95,0.25) 0%, transparent 70%)",
        }}
      />

      {/* ── Glitch overlay ── */}
      <AnimatePresence>
        {glitching && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 0 }}
                animate={{
                  opacity: [0, 0.9, 0, 0.7, 0],
                  x: [0, (i % 2 === 0 ? 1 : -1) * (Math.random() * 20 + 5)],
                  scaleX: [1, 1.02, 0.98, 1],
                }}
                transition={{ duration: 0.15, delay: i * 0.08, repeat: 3 }}
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: i % 3 === 0 ? "rgba(201,162,39,0.15)" : i % 3 === 1 ? "rgba(30,58,95,0.2)" : "rgba(99,102,241,0.1)",
                  mixBlendMode: "screen",
                  clipPath: `inset(${Math.random() * 80}% 0 ${Math.random() * 10}% 0)`,
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* ── Terminal window ── */}
      <div
        className="relative z-20 w-full"
        style={{ maxWidth: "min(860px, 95vw)", margin: "0 auto", padding: "5rem 1rem 2rem" }}
      >
        {/* Window chrome */}
        <div
          className="rounded-t-2xl flex items-center gap-2 px-4"
          style={{
            height: "2.5rem",
            background: "rgba(255,255,255,0.05)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(12px)",
          }}
        >
          <span className="w-3 h-3 rounded-full" style={{ background: "#F87171" }} />
          <span className="w-3 h-3 rounded-full" style={{ background: "#FBBF24" }} />
          <span className="w-3 h-3 rounded-full" style={{ background: "#34D399" }} />
          <span
            className="ml-auto text-xs font-semibold"
            style={{ color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}
          >
            m.aqib — terminal
          </span>
        </div>

        {/* Terminal body */}
        <div
          className="rounded-b-2xl overflow-y-auto"
          style={{
            minHeight: "clamp(380px, 60vh, 520px)",
            maxHeight: "clamp(380px, 60vh, 520px)",
            background: "rgba(10,15,26,0.97)",
            border: "1px solid rgba(201,162,39,0.15)",
            borderTop: "none",
            padding: "1.25rem 1.5rem",
            backdropFilter: "blur(16px)",
          }}
        >
          {/* Output lines */}
          {lines.map((line) => (
            <motion.div
              key={line.id}
              initial={{ opacity: 0, x: line.type === "input" ? 0 : -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.18 }}
              style={{
                color: line.color || "#CBD5E1",
                fontSize: "clamp(0.72rem, 1.8vw, 0.875rem)",
                lineHeight: 1.75,
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                fontWeight: line.type === "input" ? 700 : 400,
                letterSpacing: line.type === "boot" ? "0.02em" : "0",
              }}
            >
              {line.text || "\u00A0"}
            </motion.div>
          ))}

          {/* Input line */}
          {booted && !glitching && (
            <div
              className="flex items-center gap-2 mt-1"
              style={{ fontSize: "clamp(0.72rem, 1.8vw, 0.875rem)" }}
            >
              <span style={{ color: "#C9A227", fontWeight: 700, flexShrink: 0 }}>
                aqib@portfolio
              </span>
              <span style={{ color: "#6EE7B7", flexShrink: 0 }}>:~$</span>
              <span
                style={{ color: "#E2E8F0", flex: 1, whiteSpace: "pre" }}
              >
                {input}
              </span>
              <span
                style={{
                  display: "inline-block",
                  width: "0.6ch",
                  height: "1.1em",
                  background: cursorOn ? "#C9A227" : "transparent",
                  verticalAlign: "text-bottom",
                  transition: "background 0.1s",
                  flexShrink: 0,
                }}
              />
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Hidden real input */}
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          className="absolute opacity-0 pointer-events-none w-0 h-0"
          aria-label="Terminal input"
          autoComplete="off"
          spellCheck={false}
        />

        {/* Quick command pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: booted ? 1 : 0, y: booted ? 0 : 10 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-2 mt-4 justify-center"
        >
          {["whoami", "skills", "projects", "contact", "hire"].map((cmd) => (
            <button
              key={cmd}
              onClick={() => { runCommand(cmd); inputRef.current?.focus(); }}
              className="text-xs font-bold rounded-lg transition-all duration-200"
              style={{
                padding: "0.35rem 0.9rem",
                background: "rgba(201,162,39,0.08)",
                border: "1px solid rgba(201,162,39,0.25)",
                color: "#C9A227",
                letterSpacing: "0.05em",
                fontFamily: "'Courier New', monospace",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(201,162,39,0.18)";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(201,162,39,0.5)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(201,162,39,0.08)";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(201,162,39,0.25)";
              }}
            >
              {cmd}
            </button>
          ))}
        </motion.div>

        {/* Switch to visual mode button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: booted ? 1 : 0 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center mt-5"
        >
          <button
            onClick={() => {
              setGlitching(true);
              setTimeout(onExit, 900);
            }}
            className="flex items-center gap-2 text-xs font-semibold transition-all duration-200"
            style={{
              padding: "0.5rem 1.25rem",
              borderRadius: "999px",
              background: "rgba(30,58,95,0.3)",
              border: "1px solid rgba(30,58,95,0.5)",
              color: "rgba(147,197,253,0.8)",
              letterSpacing: "0.08em",
              fontFamily: "var(--font-inter, sans-serif)",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(30,58,95,0.5)";
              (e.currentTarget as HTMLButtonElement).style.color = "#93C5FD";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(30,58,95,0.3)";
              (e.currentTarget as HTMLButtonElement).style.color = "rgba(147,197,253,0.8)";
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="1" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M4 5l2.5 2L4 9M7.5 9h2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            Switch to Visual Mode
          </button>
        </motion.div>
      </div>

      <style>{`
        @keyframes glitch-scanlines {
          0%   { transform: translateY(0); }
          50%  { transform: translateY(2px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </motion.div>
  );
}

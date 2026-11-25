"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════
   Professional Terminal Hero
   Layout: Left info panel + Right terminal
   Theme : Deep navy + gold accent (matches portfolio)
═══════════════════════════════════════════════ */

const BOOT_LINES = [
  { text: "$ portfolio --init",                            delay: 0,    type: "cmd"  },
  { text: "  Booting system...",                           delay: 180,  type: "dim"  },
  { text: "  ✓  Next.js 15  ·  React 19  ·  TypeScript",  delay: 400,  type: "ok"   },
  { text: "  ✓  Python  ·  FastAPI  ·  LangChain",         delay: 620,  type: "ok"   },
  { text: "  ✓  AI services connected",                    delay: 850,  type: "ok"   },
  { text: "  ✓  Status: open to work",                     delay: 1050, type: "gold" },
  { text: "",                                              delay: 1250, type: "dim"  },
  { text: "  Type  help  to see available commands.",      delay: 1380, type: "hint" },
  { text: "",                                              delay: 1500, type: "dim"  },
];

type LineType = "cmd"|"ok"|"gold"|"dim"|"hint"|"input"|"output"|"error"|"section"|"kv";

const COLOR: Record<LineType, string> = {
  cmd:     "#C9A227",
  ok:      "#4ADE80",
  gold:    "#F59E0B",
  dim:     "#475569",
  hint:    "#64748B",
  input:   "#E2E8F0",
  output:  "#CBD5E1",
  error:   "#F87171",
  section: "#93C5FD",
  kv:      "#94A3B8",
};

interface OutputLine { text: string; type: LineType }

const COMMANDS: Record<string, OutputLine[]> = {
  whoami: [
    { text: "  ╭──────────────────────────────────────────╮", type: "dim"     },
    { text: "  │                                          │", type: "dim"     },
    { text: "  │   Muhammad Aqib                         │", type: "gold"    },
    { text: "  │   Full Stack & AI Automation Engineer   │", type: "output"  },
    { text: "  │                                         │", type: "dim"     },
    { text: "  │   📍  Kot Addu, Punjab, Pakistan        │", type: "kv"      },
    { text: "  │   🌐  Available worldwide               │", type: "kv"      },
    { text: "  │   📧  aqibm8123@gmail.com               │", type: "kv"      },
    { text: "  │                                         │", type: "dim"     },
    { text: "  ╰──────────────────────────────────────────╯", type: "dim"     },
  ],
  skills: [
    { text: "  — Frontend ————————————————————————————————", type: "section" },
    { text: "    React  ·  Next.js  ·  TypeScript  ·  Tailwind CSS", type: "output" },
    { text: "  — Backend —————————————————————————————————", type: "section" },
    { text: "    Node.js  ·  Python  ·  FastAPI  ·  PostgreSQL", type: "output" },
    { text: "  — AI / ML —————————————————————————————————", type: "section" },
    { text: "    LangChain  ·  OpenAI  ·  Gemini  ·  Claude API", type: "output" },
    { text: "  — DevOps ——————————————————————————————————", type: "section" },
    { text: "    Docker  ·  Vercel  ·  AWS  ·  CI/CD", type: "output" },
  ],
  projects: [
    { text: "  — Featured Work ————————————————————————————", type: "section" },
    { text: "  01  SaaS AI Platform",    type: "gold"   },
    { text: "      Next.js · LangChain · Stripe · PostgreSQL", type: "kv" },
    { text: "  02  Workflow Automation", type: "gold"   },
    { text: "      Python · FastAPI · n8n · Redis",           type: "kv" },
    { text: "  03  E-Commerce Suite",    type: "gold"   },
    { text: "      React · Node.js · PostgreSQL · Stripe",    type: "kv" },
    { text: "  04  AI Chatbot Builder",  type: "gold"   },
    { text: "      OpenAI · Vector DB · RAG · WebSockets",    type: "kv" },
    { text: "", type: "dim" },
    { text: "  → scroll to #projects for live demos", type: "hint" },
  ],
  experience: [
    { text: "  — Timeline ————————————————————————————————", type: "section" },
    { text: "  2024 – now   Freelance AI Engineer", type: "gold"   },
    { text: "               Global clients  ·  SaaS & AI products", type: "kv" },
    { text: "  2023 – 2024  Full Stack Developer", type: "gold"   },
    { text: "               SaaS platforms  ·  React ecosystem", type: "kv" },
    { text: "  2022 – 2023  Frontend Developer", type: "gold"   },
    { text: "               React  ·  Next.js  ·  TypeScript", type: "kv" },
    { text: "", type: "dim" },
    { text: "  🎓  MNS University of Engineering, Multan", type: "output" },
  ],
  contact: [
    { text: "  — Reach out ————————————————————————————————", type: "section" },
    { text: "  email     aqibm8123@gmail.com",                     type: "output" },
    { text: "  whatsapp  +92 337 5013984",                         type: "output" },
    { text: "  linkedin  linkedin.com/in/muhammad-aqib-715397408", type: "output" },
    { text: "  github    github.com/MuhammadAqib2310",             type: "output" },
    { text: "", type: "dim" },
    { text: "  → type  hire  to start a conversation",            type: "hint"   },
  ],
  hire: [
    { text: "  Connecting to contact section...", type: "gold"   },
    { text: "  ✓  Let's build something great together!", type: "ok" },
  ],
  help: [
    { text: "  — Commands —————————————————————————————————", type: "section" },
    { text: "  whoami      about me & contact info",    type: "output" },
    { text: "  skills      tech stack & expertise",     type: "output" },
    { text: "  projects    featured work",              type: "output" },
    { text: "  experience  work history",               type: "output" },
    { text: "  contact     get in touch",               type: "output" },
    { text: "  hire        work with me",               type: "output" },
    { text: "  clear       clear terminal",             type: "output" },
    { text: "  exit        switch to visual mode",      type: "output" },
    { text: "", type: "dim" },
    { text: "  ↑ / ↓  cycle command history",          type: "hint"   },
    { text: "  Tab    autocomplete",                    type: "hint"   },
  ],
  clear: [],
  exit:  [{ text: "  Switching to visual mode...", type: "gold" }],
};

const COMPLETIONS = ["whoami","skills","projects","experience","contact","hire","help","clear","exit"];

interface TerminalLine { id: number; type: LineType; text: string }
let _id = 0;
const uid = () => ++_id;

interface Props { onExit: () => void }

export default function TerminalHero({ onExit }: Props) {
  const [lines,     setLines]     = useState<TerminalLine[]>([]);
  const [input,     setInput]     = useState("");
  const [booted,    setBooted]    = useState(false);
  const [glitching, setGlitching] = useState(false);
  const [history,   setHistory]   = useState<string[]>([]);
  const [histIdx,   setHistIdx]   = useState(-1);
  const [cursorOn,  setCursorOn]  = useState(true);
  const [clock,     setClock]     = useState("");

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  /* clock */
  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString("en-US", { hour12: false }));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  /* cursor blink */
  useEffect(() => {
    const t = setInterval(() => setCursorOn(v => !v), 530);
    return () => clearInterval(t);
  }, []);

  /* boot sequence */
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const header: TerminalLine[] = [
      { id: uid(), type: "dim",  text: "  ┌─────────────────────────────────────────────┐" },
      { id: uid(), type: "gold", text: "  │   M . A q i b   —   P o r t f o l i o     │" },
      { id: uid(), type: "dim",  text: "  │   AI Engineer  ·  Full Stack Developer     │" },
      { id: uid(), type: "dim",  text: "  └─────────────────────────────────────────────┘" },
      { id: uid(), type: "dim",  text: "" },
    ];
    setLines(header);

    BOOT_LINES.forEach(({ text, delay, type }) => {
      const t = setTimeout(() => {
        setLines(prev => [...prev, { id: uid(), type: type as LineType, text }]);
      }, delay);
      timers.push(t);
    });

    const done = setTimeout(() => {
      setBooted(true);
      setTimeout(() => inputRef.current?.focus(), 80);
    }, 1700);
    timers.push(done);
    return () => timers.forEach(clearTimeout);
  }, []);

  /* auto scroll */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const triggerExit = useCallback(() => {
    setGlitching(true);
    setTimeout(onExit, 750);
  }, [onExit]);

  /* run command */
  const runCommand = useCallback((raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    setHistory(h => [cmd, ...h.slice(0, 29)]);
    setHistIdx(-1);
    setLines(prev => [...prev, { id: uid(), type: "cmd", text: `  $ ${raw.trim()}` }]);

    if (cmd === "clear") { setLines([]); return; }
    if (cmd === "exit") {
      setLines(prev => [...prev, { id: uid(), type: "gold", text: "  Switching to visual mode..." }, { id: uid(), type: "dim", text: "" }]);
      setTimeout(triggerExit, 500);
      return;
    }
    if (cmd === "hire") {
      const out = COMMANDS.hire;
      setLines(prev => [...prev, ...out.map(l => ({ id: uid(), type: l.type, text: l.text })), { id: uid(), type: "dim", text: "" }]);
      setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 700);
      return;
    }

    const result = COMMANDS[cmd];
    if (result !== undefined) {
      setLines(prev => [...prev, ...result.map(l => ({ id: uid(), type: l.type, text: l.text })), { id: uid(), type: "dim", text: "" }]);
    } else {
      setLines(prev => [
        ...prev,
        { id: uid(), type: "error", text: `  command not found: ${cmd}` },
        { id: uid(), type: "hint",  text: `  type  help  to see available commands` },
        { id: uid(), type: "dim",   text: "" },
      ]);
    }
  }, [triggerExit]);

  /* keyboard */
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { runCommand(input); setInput(""); }
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(next); setInput(history[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next); setInput(next === -1 ? "" : history[next]);
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = COMPLETIONS.find(c => c.startsWith(input.toLowerCase()) && c !== input.toLowerCase());
      if (match) setInput(match);
    }
  };

  /* ── left panel stats ── */
  const stats = [
    { label: "Projects",    value: "20+"  },
    { label: "Experience",  value: "3yr+" },
    { label: "Satisfaction",value: "100%" },
  ];

  const links = [
    { label: "GitHub",   href: "https://github.com/MuhammadAqib2310",                   icon: "GH" },
    { label: "LinkedIn", href: "https://linkedin.com/in/muhammad-aqib-715397408",        icon: "LI" },
    { label: "Email",    href: "mailto:aqibm8123@gmail.com",                             icon: "✉"  },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: glitching ? 0 : 1 }}
      transition={{ duration: glitching ? 0.45 : 0.55 }}
      className="fixed inset-0 z-[99990] flex flex-col"
      style={{ background: "#070C17", fontFamily: "'Courier New','Fira Code',monospace" }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* subtle scanlines */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.055) 2px,rgba(0,0,0,0.055) 4px)", zIndex: 1 }} />

      {/* deep glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,162,39,0.055) 0%, transparent 65%)", zIndex: 1 }} />

      {/* glitch strips */}
      <AnimatePresence>
        {glitching && [...Array(6)].map((_, i) => (
          <motion.div key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0,0.9,0,0.7,0], x: [i%2===0?10:-10, 0] }}
            transition={{ duration: 0.11, delay: i*0.06, repeat: 4 }}
            className="absolute inset-0 pointer-events-none"
            style={{ background: i%2===0 ? "rgba(201,162,39,0.14)" : "rgba(30,58,95,0.2)", mixBlendMode:"screen",
              clipPath:`inset(${10+i*13}% 0 ${4+i*7}% 0)`, zIndex: 50 }} />
        ))}
      </AnimatePresence>

      {/* ════ TOP CHROME BAR ════ */}
      <div className="relative flex items-center gap-3 px-5 flex-shrink-0"
        style={{ height:"2.6rem", background:"rgba(255,255,255,0.025)", borderBottom:"1px solid rgba(255,255,255,0.065)", zIndex:10 }}>
        {/* traffic lights */}
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full flex items-center justify-center group cursor-pointer"
            style={{ background:"#FF5F57" }}>
            <span className="text-[0.45rem] opacity-0 group-hover:opacity-100 font-black text-red-900">✕</span>
          </div>
          <div className="w-3 h-3 rounded-full" style={{ background:"#FFBD2E" }} />
          <div className="w-3 h-3 rounded-full" style={{ background:"#28C840" }} />
        </div>
        {/* title */}
        <span className="absolute left-1/2 -translate-x-1/2 text-xs font-semibold"
          style={{ color:"rgba(255,255,255,0.22)", letterSpacing:"0.12em" }}>
          portfolio — terminal — bash
        </span>
        {/* clock */}
        <span className="ml-auto text-xs tabular-nums" style={{ color:"rgba(255,255,255,0.18)", letterSpacing:"0.05em" }}>
          {clock}
        </span>
      </div>

      {/* ════ MAIN AREA ════ */}
      <div className="relative flex-1 flex overflow-hidden" style={{ zIndex: 5 }}>

        {/* ── LEFT PANEL ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="hidden lg:flex flex-col flex-shrink-0"
          style={{ width:"260px", borderRight:"1px solid rgba(255,255,255,0.065)", background:"rgba(255,255,255,0.012)", padding:"2rem 1.5rem", gap:"1.75rem" }}
        >
          {/* avatar + name */}
          <div className="flex flex-col items-center text-center gap-3">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-lg"
                style={{ background:"linear-gradient(135deg,#1E3A5F,#2563EB)", color:"#fff", letterSpacing:"-0.02em",
                  boxShadow:"0 0 0 1px rgba(201,162,39,0.3), 0 8px 24px rgba(30,58,95,0.4)" }}>
                MA
              </div>
              {/* online dot */}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 flex items-center justify-center"
                style={{ borderColor:"#070C17", background:"#4ADE80" }}>
                <div className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
              </div>
            </div>
            <div>
              <p className="font-bold text-sm" style={{ color:"#E2E8F0", letterSpacing:"-0.01em" }}>Muhammad Aqib</p>
              <p className="text-xs mt-0.5" style={{ color:"#C9A227", letterSpacing:"0.03em" }}>AI & Full Stack Eng.</p>
              <p className="text-xs mt-1" style={{ color:"#334155" }}>📍 Pakistan</p>
            </div>
          </div>

          {/* divider */}
          <div style={{ height:"1px", background:"rgba(255,255,255,0.065)" }} />

          {/* stats */}
          <div className="flex flex-col gap-2.5">
            <p className="text-xs font-bold tracking-widest" style={{ color:"#334155", letterSpacing:"0.18em" }}>STATS</p>
            {stats.map(s => (
              <div key={s.label} className="flex items-center justify-between">
                <span className="text-xs" style={{ color:"#475569" }}>{s.label}</span>
                <span className="text-xs font-bold" style={{ color:"#C9A227" }}>{s.value}</span>
              </div>
            ))}
          </div>

          {/* divider */}
          <div style={{ height:"1px", background:"rgba(255,255,255,0.065)" }} />

          {/* quick commands */}
          <div className="flex flex-col gap-1.5">
            <p className="text-xs font-bold tracking-widest mb-1" style={{ color:"#334155", letterSpacing:"0.18em" }}>COMMANDS</p>
            {["whoami","skills","projects","experience","contact"].map(cmd => (
              <button key={cmd}
                onClick={() => { runCommand(cmd); inputRef.current?.focus(); }}
                className="text-left text-xs rounded-lg px-3 py-1.5 transition-all duration-150 group flex items-center gap-2"
                style={{ color:"#64748B", border:"1px solid transparent" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.color = "#C9A227";
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(201,162,39,0.07)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(201,162,39,0.18)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.color = "#64748B";
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "transparent";
                }}
              >
                <span style={{ color:"#1E3A5F", fontWeight:700 }}>$</span> {cmd}
              </button>
            ))}
          </div>

          {/* divider */}
          <div style={{ height:"1px", background:"rgba(255,255,255,0.065)" }} />

          {/* links */}
          <div className="flex flex-col gap-2">
            <p className="text-xs font-bold tracking-widest mb-1" style={{ color:"#334155", letterSpacing:"0.18em" }}>LINKS</p>
            {links.map(l => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs transition-colors duration-150"
                style={{ color:"#475569", textDecoration:"none" }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "#93C5FD"}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "#475569"}
                onClick={e => e.stopPropagation()}
              >
                <span className="w-5 h-5 rounded flex items-center justify-center text-[0.6rem] font-black flex-shrink-0"
                  style={{ background:"rgba(255,255,255,0.05)", color:"#64748B" }}>{l.icon}</span>
                {l.label}
              </a>
            ))}
          </div>

          {/* switch button */}
          <div className="mt-auto">
            <button
              onClick={() => triggerExit()}
              className="w-full text-xs font-semibold rounded-xl py-2 transition-all duration-200 flex items-center justify-center gap-2"
              style={{ background:"rgba(30,58,95,0.25)", border:"1px solid rgba(30,58,95,0.4)", color:"rgba(147,197,253,0.7)", letterSpacing:"0.05em" }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(30,58,95,0.4)";
                (e.currentTarget as HTMLButtonElement).style.color = "#93C5FD";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(30,58,95,0.25)";
                (e.currentTarget as HTMLButtonElement).style.color = "rgba(147,197,253,0.7)";
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <rect x="0.5" y="0.5" width="11" height="11" rx="1.5" stroke="currentColor" strokeWidth="1"/>
                <path d="M3 4.5l1.75 1.5L3 7.5M5.5 7.5H8" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
              </svg>
              Visual Mode
            </button>
          </div>
        </motion.div>

        {/* ── RIGHT: TERMINAL ── */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* output scroll area */}
          <div className="flex-1 overflow-y-auto px-5 py-4"
            style={{ scrollbarWidth:"thin", scrollbarColor:"#1E3A5F transparent" }}>
            {lines.map(line => (
              <motion.div key={line.id}
                initial={{ opacity: 0, y: 2 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.12 }}
                style={{
                  color: COLOR[line.type] || "#94A3B8",
                  fontSize: "clamp(0.76rem, 1.6vw, 0.88rem)",
                  lineHeight: 1.85,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  fontWeight: line.type === "cmd" || line.type === "gold" ? 600 : 400,
                  fontStyle: line.type === "hint" ? "italic" : "normal",
                }}
              >
                {line.text || "\u00A0"}
              </motion.div>
            ))}

            {/* input line */}
            {booted && !glitching && (
              <div className="flex items-center mt-1" style={{ fontSize:"clamp(0.76rem,1.6vw,0.88rem)", gap:"0.4rem" }}>
                <span style={{ color:"#C9A227", fontWeight:700, flexShrink:0 }}>  aqib</span>
                <span style={{ color:"#334155", flexShrink:0 }}>@</span>
                <span style={{ color:"#4ADE80", fontWeight:600, flexShrink:0 }}>portfolio</span>
                <span style={{ color:"#334155", flexShrink:0 }}>:~$</span>
                <span style={{ color:"#E2E8F0", flex:1, whiteSpace:"pre" }}>{input}</span>
                <span style={{
                  display:"inline-block", width:"0.52ch", height:"1em",
                  background: cursorOn ? "#C9A227" : "transparent",
                  verticalAlign:"text-bottom", flexShrink:0, transition:"background 0.08s",
                }} />
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* mobile quick pills */}
          <motion.div
            initial={{ opacity:0 }} animate={{ opacity: booted ? 1 : 0 }}
            className="lg:hidden flex flex-wrap gap-2 px-5 py-2.5 flex-shrink-0"
            style={{ borderTop:"1px solid rgba(255,255,255,0.055)", background:"rgba(255,255,255,0.015)" }}
          >
            {["whoami","skills","projects","contact","hire"].map(cmd => (
              <button key={cmd}
                onClick={() => { runCommand(cmd); inputRef.current?.focus(); }}
                className="text-xs font-semibold rounded-lg transition-all duration-150"
                style={{ padding:"0.3rem 0.8rem", background:"rgba(201,162,39,0.07)", border:"1px solid rgba(201,162,39,0.2)", color:"#C9A227", letterSpacing:"0.04em" }}
              >
                {cmd}
              </button>
            ))}
            <button
              onClick={() => triggerExit()}
              className="text-xs font-semibold rounded-lg transition-all duration-150 ml-auto"
              style={{ padding:"0.3rem 0.9rem", background:"rgba(30,58,95,0.25)", border:"1px solid rgba(30,58,95,0.4)", color:"#93C5FD", letterSpacing:"0.04em" }}
            >
              visual →
            </button>
          </motion.div>
        </div>
      </div>

      {/* ════ STATUS BAR ════ */}
      <div className="relative flex items-center flex-shrink-0 px-4"
        style={{ height:"1.6rem", background:"rgba(201,162,39,0.08)", borderTop:"1px solid rgba(201,162,39,0.12)", zIndex:10, gap:"1.5rem" }}>
        <span className="flex items-center gap-1.5 text-xs" style={{ color:"#C9A227", letterSpacing:"0.04em", fontWeight:600 }}>
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
          open to work
        </span>
        <span className="text-xs" style={{ color:"#1E3A5F" }}>|</span>
        <span className="text-xs" style={{ color:"#334155" }}>bash  ·  UTF-8</span>
        <span className="text-xs" style={{ color:"#1E3A5F" }}>|</span>
        <span className="text-xs" style={{ color:"#334155" }}>📍 Pakistan</span>
        <span className="ml-auto text-xs tabular-nums" style={{ color:"#334155" }}>{clock}</span>
      </div>

      {/* hidden real input */}
      <input ref={inputRef} value={input}
        onChange={e => setInput(e.target.value)} onKeyDown={onKeyDown}
        className="fixed opacity-0 pointer-events-none" aria-label="Terminal input"
        style={{ width:1, height:1, top:-100, left:-100 }}
        autoComplete="off" spellCheck={false} />
    </motion.div>
  );
}

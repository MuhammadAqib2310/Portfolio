"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════════
   Terminal Hero — Premium Dark Theme
   Colors: #0D0D0D bg · #C9A227 gold · #E2E8F0 text
   UX: visible input box, smooth animations, real feel
═══════════════════════════════════════════════════════ */

const BOOT_LINES = [
  { text: "portfolio --init --mode=interactive",   delay: 0,    type: "cmd"  },
  { text: "",                                       delay: 160,  type: "dim"  },
  { text: "  loading  Next.js 15  ............  ✓", delay: 300,  type: "ok"   },
  { text: "  loading  Python + FastAPI  .......  ✓", delay: 500, type: "ok"   },
  { text: "  loading  LangChain + OpenAI  ....  ✓", delay: 700, type: "ok"   },
  { text: "  loading  AI services  ............  ✓",delay: 900,  type: "ok"   },
  { text: "",                                       delay: 1050, type: "dim"  },
  { text: "  status   open to work  ✓",             delay: 1150, type: "gold" },
  { text: "",                                       delay: 1300, type: "dim"  },
  { text: "  type  help  to see all commands",      delay: 1400, type: "hint" },
  { text: "",                                       delay: 1520, type: "dim"  },
];

type LT = "cmd"|"ok"|"gold"|"dim"|"hint"|"output"|"error"|"section"|"kv"|"prompt";

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
  prompt:  "#E2E8F0",
};

interface OL { text: string; type: LT }

const CMDS: Record<string, OL[]> = {
  whoami: [
    { text: "",                                                           type:"dim"     },
    { text: "  ╭─────────────────────────────────────────────────╮",    type:"dim"     },
    { text: "  │                                                 │",    type:"dim"     },
    { text: "  │   Muhammad Aqib                                 │",    type:"gold"    },
    { text: "  │   Full Stack & AI Automation Engineer           │",    type:"output"  },
    { text: "  │                                                 │",    type:"dim"     },
    { text: "  │   📍  Kot Addu, Punjab · Pakistan               │",    type:"kv"      },
    { text: "  │   🌐  Available worldwide · Remote              │",    type:"kv"      },
    { text: "  │   📧  aqibm8123@gmail.com                       │",    type:"kv"      },
    { text: "  │   💼  3+ years experience                       │",    type:"kv"      },
    { text: "  │                                                 │",    type:"dim"     },
    { text: "  ╰─────────────────────────────────────────────────╯",    type:"dim"     },
    { text: "",                                                           type:"dim"     },
  ],
  skills: [
    { text: "",                                                           type:"dim"    },
    { text: "  ◈  Frontend",                                             type:"section"},
    { text: "     React  ·  Next.js  ·  TypeScript  ·  Tailwind CSS",   type:"output" },
    { text: "",                                                           type:"dim"    },
    { text: "  ◈  Backend",                                              type:"section"},
    { text: "     Node.js  ·  Python  ·  FastAPI  ·  PostgreSQL",        type:"output" },
    { text: "",                                                           type:"dim"    },
    { text: "  ◈  AI / Machine Learning",                                type:"section"},
    { text: "     LangChain  ·  OpenAI  ·  Gemini  ·  Claude API",      type:"output" },
    { text: "",                                                           type:"dim"    },
    { text: "  ◈  DevOps & Cloud",                                       type:"section"},
    { text: "     Docker  ·  Vercel  ·  AWS  ·  CI/CD",                  type:"output" },
    { text: "",                                                           type:"dim"    },
  ],
  projects: [
    { text: "",                                                           type:"dim"    },
    { text: "  ◈  Featured Projects",                                    type:"section"},
    { text: "",                                                           type:"dim"    },
    { text: "  01  SaaS AI Platform",                                    type:"gold"   },
    { text: "      Next.js  ·  LangChain  ·  Stripe  ·  PostgreSQL",    type:"kv"     },
    { text: "",                                                           type:"dim"    },
    { text: "  02  Workflow Automation Engine",                           type:"gold"   },
    { text: "      Python  ·  FastAPI  ·  n8n  ·  Redis",               type:"kv"     },
    { text: "",                                                           type:"dim"    },
    { text: "  03  E-Commerce Suite",                                    type:"gold"   },
    { text: "      React  ·  Node.js  ·  PostgreSQL  ·  Stripe",        type:"kv"     },
    { text: "",                                                           type:"dim"    },
    { text: "  04  AI Chatbot Builder",                                  type:"gold"   },
    { text: "      OpenAI  ·  Vector DB  ·  RAG  ·  WebSockets",        type:"kv"     },
    { text: "",                                                           type:"dim"    },
    { text: "  → type  exit  then scroll to #projects for live demos",  type:"hint"   },
    { text: "",                                                           type:"dim"    },
  ],
  experience: [
    { text: "",                                                           type:"dim"    },
    { text: "  ◈  Work History",                                         type:"section"},
    { text: "",                                                           type:"dim"    },
    { text: "  2024 – present",                                          type:"gold"   },
    { text: "  Freelance AI Engineer  ·  Global Clients",                type:"output" },
    { text: "  SaaS platforms  ·  AI agents  ·  automation",            type:"kv"     },
    { text: "",                                                           type:"dim"    },
    { text: "  2023 – 2024",                                             type:"gold"   },
    { text: "  Full Stack Developer",                                     type:"output" },
    { text: "  React ecosystem  ·  SaaS products",                      type:"kv"     },
    { text: "",                                                           type:"dim"    },
    { text: "  2022 – 2023",                                             type:"gold"   },
    { text: "  Frontend Developer",                                       type:"output" },
    { text: "  React  ·  Next.js  ·  TypeScript",                       type:"kv"     },
    { text: "",                                                           type:"dim"    },
    { text: "  🎓  MNS University of Engineering, Multan",              type:"output" },
    { text: "",                                                           type:"dim"    },
  ],
  contact: [
    { text: "",                                                           type:"dim"    },
    { text: "  ◈  Get in Touch",                                         type:"section"},
    { text: "",                                                           type:"dim"    },
    { text: "  email      aqibm8123@gmail.com",                          type:"output" },
    { text: "  whatsapp   +92 337 5013984",                              type:"output" },
    { text: "  linkedin   linkedin.com/in/muhammad-aqib-715397408",      type:"output" },
    { text: "  github     github.com/MuhammadAqib2310",                  type:"output" },
    { text: "",                                                           type:"dim"    },
    { text: "  → type  hire  to start a conversation now",              type:"hint"   },
    { text: "",                                                           type:"dim"    },
  ],
  hire: [
    { text: "",                                                           type:"dim"   },
    { text: "  connecting to contact section...",                         type:"gold"  },
    { text: "  ✓  redirecting...",                                        type:"ok"    },
    { text: "",                                                           type:"dim"   },
  ],
  help: [
    { text: "",                                                           type:"dim"    },
    { text: "  ◈  Available Commands",                                   type:"section"},
    { text: "",                                                           type:"dim"    },
    { text: "  whoami       about me & contact info",                    type:"output" },
    { text: "  skills       tech stack & expertise",                     type:"output" },
    { text: "  projects     featured work",                              type:"output" },
    { text: "  experience   work history & education",                   type:"output" },
    { text: "  contact      all contact details",                        type:"output" },
    { text: "  hire         work with me",                               type:"output" },
    { text: "  clear        clear the terminal",                         type:"output" },
    { text: "  exit         switch to visual mode",                      type:"output" },
    { text: "",                                                           type:"dim"    },
    { text: "  ↑ / ↓   navigate command history",                       type:"hint"   },
    { text: "  Tab     autocomplete command",                            type:"hint"   },
    { text: "",                                                           type:"dim"    },
  ],
  clear: [],
  exit:  [
    { text: "",                                                           type:"dim"   },
    { text: "  switching to visual mode...",                              type:"gold"  },
    { text: "",                                                           type:"dim"   },
  ],
};

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

  const bottomRef  = useRef<HTMLDivElement>(null);
  const inputRef   = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  /* clock */
  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString("en-US",{ hour12:false }));
    tick(); const t = setInterval(tick,1000); return () => clearInterval(t);
  },[]);

  /* cursor blink */
  useEffect(() => {
    const t = setInterval(() => setBlink(v => !v), 500);
    return () => clearInterval(t);
  },[]);

  /* boot */
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    setLines([
      { id:uid(), type:"dim",  text:"" },
      { id:uid(), type:"gold", text:"  ███╗   ███╗ ██████╗  █████╗  ██████╗ ██╗██████╗" },
      { id:uid(), type:"dim",  text:"  ████╗ ████║██╔══██╗██╔══██╗██╔═══██╗██║██╔══██╗" },
      { id:uid(), type:"gold", text:"  ██╔████╔██║███████║██║  ██║██║   ██║██║██████╔╝" },
      { id:uid(), type:"dim",  text:"  ██║╚██╔╝██║██╔══██║██║  ██║██║▄▄ ██║██║██╔══██╗" },
      { id:uid(), type:"gold", text:"  ██║ ╚═╝ ██║██║  ██║╚█████╔╝╚██████╔╝██║██████╔╝" },
      { id:uid(), type:"dim",  text:"  ╚═╝     ╚═╝╚═╝  ╚═╝ ╚════╝  ╚══▀▀═╝ ╚═╝╚═════╝" },
      { id:uid(), type:"dim",  text:"" },
      { id:uid(), type:"kv",   text:"  AI Engineer  ·  Full Stack Developer  ·  Pakistan" },
      { id:uid(), type:"dim",  text:"" },
    ]);

    BOOT_LINES.forEach(({ text, delay, type }) => {
      const t = setTimeout(() => {
        setLines(prev => [...prev, { id:uid(), type: type as LT, text }]);
      }, delay + 200);
      timers.push(t);
    });

    const done = setTimeout(() => {
      setBooted(true);
      setTimeout(() => { inputRef.current?.focus(); setFocused(true); }, 80);
    }, 2000);
    timers.push(done);
    return () => timers.forEach(clearTimeout);
  },[]);

  /* scroll */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior:"smooth" });
  },[lines]);

  const triggerExit = useCallback(() => {
    setGlitching(true);
    setTimeout(onExit, 700);
  },[onExit]);

  const runCommand = useCallback((raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    setHistory(h => [cmd, ...h.slice(0,29)]);
    setHistIdx(-1);
    setLines(prev => [...prev, { id:uid(), type:"cmd", text:`  $ ${raw.trim()}` }]);

    if (cmd === "clear") { setLines([]); return; }
    if (cmd === "exit") {
      setLines(prev => [...prev,
        { id:uid(), type:"gold", text:"  switching to visual mode..." },
        { id:uid(), type:"dim",  text:"" },
      ]);
      setTimeout(triggerExit, 500); return;
    }
    if (cmd === "hire") {
      const out = CMDS.hire;
      setLines(prev => [...prev, ...out.map(l => ({ id:uid(), type:l.type, text:l.text }))]);
      setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior:"smooth" }), 800);
      return;
    }
    const result = CMDS[cmd];
    if (result !== undefined) {
      setLines(prev => [...prev, ...result.map(l => ({ id:uid(), type:l.type, text:l.text }))]);
    } else {
      setLines(prev => [...prev,
        { id:uid(), type:"error", text:`  bash: ${cmd}: command not found` },
        { id:uid(), type:"hint",  text:`  run  help  to see available commands` },
        { id:uid(), type:"dim",   text:"" },
      ]);
    }
  },[triggerExit]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { runCommand(input); setInput(""); }
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      const n = Math.min(histIdx+1, history.length-1);
      setHistIdx(n); setInput(history[n] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const n = Math.max(histIdx-1,-1);
      setHistIdx(n); setInput(n===-1 ? "" : history[n]);
    } else if (e.key === "Tab") {
      e.preventDefault();
      const m = COMPLETIONS.find(c => c.startsWith(input.toLowerCase()) && c !== input.toLowerCase());
      if (m) setInput(m);
    }
  };

  const stats  = [{ l:"Projects", v:"20+" },{ l:"Experience", v:"3 yrs" },{ l:"Clients", v:"15+" }];
  const sideCmd = ["whoami","skills","projects","experience","contact","hire"];

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity:0 }}
      animate={{ opacity: glitching ? 0 : 1 }}
      transition={{ duration: glitching ? 0.4 : 0.5 }}
      className="fixed inset-0 z-[99990] flex flex-col select-none"
      style={{ background:"#0D0D0D", fontFamily:"'JetBrains Mono','Fira Code','Courier New',monospace" }}
      onClick={() => { inputRef.current?.focus(); setFocused(true); }}
    >
      {/* noise texture overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{ backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")", backgroundSize:"200px 200px", zIndex:1 }} />

      {/* gold top glow */}
      <div className="absolute pointer-events-none" style={{
        top:0, left:0, right:0, height:"320px", zIndex:1,
        background:"radial-gradient(ellipse 60% 40% at 50% -10%, rgba(201,162,39,0.12) 0%, transparent 70%)",
      }}/>

      {/* glitch */}
      <AnimatePresence>
        {glitching && [...Array(7)].map((_,i) => (
          <motion.div key={i} className="absolute inset-0 pointer-events-none"
            initial={{ opacity:0 }}
            animate={{ opacity:[0,1,0,0.8,0], x:[i%2===0?12:-12,0], scaleY:[1,1.01,0.99,1] }}
            transition={{ duration:0.1, delay:i*0.055, repeat:4 }}
            style={{ background: i%3===0?"rgba(201,162,39,0.18)":i%3===1?"rgba(37,99,235,0.15)":"rgba(255,255,255,0.04)",
              mixBlendMode:"screen", clipPath:`inset(${8+i*12}% 0 ${3+i*6}% 0)`, zIndex:60 }} />
        ))}
      </AnimatePresence>

      {/* ══ TITLEBAR ══ */}
      <div className="relative flex-shrink-0 flex items-center px-4 gap-3" style={{
        height:"2.5rem", zIndex:20,
        background:"rgba(255,255,255,0.03)",
        borderBottom:"1px solid rgba(255,255,255,0.07)",
      }}>
        {/* traffic lights */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button onClick={triggerExit}
            className="w-3 h-3 rounded-full transition-all duration-150 group relative flex items-center justify-center"
            style={{ background:"#FF5F57" }}>
            <span className="absolute text-[7px] font-black opacity-0 group-hover:opacity-100" style={{ color:"#7a1010" }}>✕</span>
          </button>
          <div className="w-3 h-3 rounded-full" style={{ background:"#FFBD2E" }}/>
          <div className="w-3 h-3 rounded-full" style={{ background:"#28C840" }}/>
        </div>
        {/* tabs */}
        <div className="flex items-center gap-0 ml-3 h-full">
          <div className="flex items-center gap-2 px-4 h-full text-xs font-medium"
            style={{ background:"#0D0D0D", borderRight:"1px solid rgba(255,255,255,0.07)",
              borderLeft:"1px solid rgba(255,255,255,0.07)", color:"rgba(255,255,255,0.7)", letterSpacing:"0.03em",
              borderTop:"1px solid #C9A227", marginTop:"1px" }}>
            <span style={{ color:"#C9A227", fontSize:"0.6rem" }}>❯</span>
            bash
          </div>
        </div>
        {/* right */}
        <div className="ml-auto flex items-center gap-3">
          <span className="text-xs tabular-nums" style={{ color:"rgba(255,255,255,0.18)", letterSpacing:"0.05em" }}>{clock}</span>
        </div>
      </div>

      {/* ══ BODY ══ */}
      <div className="relative flex flex-1 overflow-hidden" style={{ zIndex:5 }}>

        {/* ── SIDEBAR ── */}
        <motion.aside
          initial={{ opacity:0, x:-16 }}
          animate={{ opacity:1, x:0 }}
          transition={{ delay:0.25, duration:0.6, ease:[0.22,1,0.36,1] }}
          className="hidden lg:flex flex-col flex-shrink-0 overflow-y-auto"
          style={{ width:"230px", background:"#111111", borderRight:"1px solid rgba(255,255,255,0.06)", padding:"1.5rem 1rem" }}
        >
          {/* profile */}
          <div className="flex flex-col items-center text-center mb-5">
            <div className="relative mb-3">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center font-black text-base"
                style={{ background:"linear-gradient(135deg,#1E3A5F 0%,#2563EB 100%)", color:"#fff",
                  boxShadow:"0 0 0 2px rgba(201,162,39,0.4), 0 8px 32px rgba(30,58,95,0.5)", letterSpacing:"-0.02em" }}>
                MA
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center"
                style={{ borderColor:"#111111", background:"#10B981" }}>
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background:"#6EE7B7" }}/>
              </div>
            </div>
            <p className="text-sm font-bold" style={{ color:"#F1F5F9", letterSpacing:"-0.01em" }}>Muhammad Aqib</p>
            <p className="text-xs mt-0.5 font-medium" style={{ color:"#C9A227" }}>AI & Full Stack Eng.</p>
            <div className="flex items-center gap-1 mt-1.5">
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background:"#10B981" }}/>
              <span className="text-xs" style={{ color:"#6B7280" }}>available for work</span>
            </div>
          </div>

          {/* stats row */}
          <div className="grid grid-cols-3 gap-1 mb-5">
            {stats.map(s => (
              <div key={s.l} className="flex flex-col items-center rounded-lg py-2 px-1"
                style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.05)" }}>
                <span className="text-sm font-black" style={{ color:"#C9A227" }}>{s.v}</span>
                <span className="text-[0.6rem] mt-0.5 text-center" style={{ color:"#4B5563", lineHeight:1.2 }}>{s.l}</span>
              </div>
            ))}
          </div>

          {/* divider */}
          <div className="mb-4" style={{ height:"1px", background:"rgba(255,255,255,0.05)" }}/>

          {/* commands */}
          <p className="text-[0.6rem] font-bold mb-2 tracking-widest" style={{ color:"#374151", letterSpacing:"0.2em" }}>COMMANDS</p>
          <div className="flex flex-col gap-0.5 mb-5">
            {sideCmd.map(cmd => (
              <button key={cmd}
                onClick={e => { e.stopPropagation(); runCommand(cmd); inputRef.current?.focus(); }}
                className="w-full text-left text-xs rounded-lg px-3 py-2 transition-all duration-150 flex items-center gap-2.5 group"
                style={{ color:"#6B7280", border:"1px solid transparent" }}
                onMouseEnter={e => {
                  const b = e.currentTarget as HTMLButtonElement;
                  b.style.color="#E2E8F0"; b.style.background="rgba(201,162,39,0.08)"; b.style.borderColor="rgba(201,162,39,0.2)";
                }}
                onMouseLeave={e => {
                  const b = e.currentTarget as HTMLButtonElement;
                  b.style.color="#6B7280"; b.style.background="transparent"; b.style.borderColor="transparent";
                }}
              >
                <span className="text-xs" style={{ color:"#C9A227", fontWeight:700 }}>$</span>
                {cmd}
              </button>
            ))}
          </div>

          {/* divider */}
          <div className="mb-4" style={{ height:"1px", background:"rgba(255,255,255,0.05)" }}/>

          {/* links */}
          <p className="text-[0.6rem] font-bold mb-2 tracking-widest" style={{ color:"#374151", letterSpacing:"0.2em" }}>LINKS</p>
          <div className="flex flex-col gap-1 mb-6">
            {[
              { label:"GitHub",   href:"https://github.com/MuhammadAqib2310",                 ico:"⌥" },
              { label:"LinkedIn", href:"https://linkedin.com/in/muhammad-aqib-715397408",      ico:"in" },
              { label:"Email",    href:"mailto:aqibm8123@gmail.com",                           ico:"@"  },
            ].map(l => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs rounded-lg px-3 py-1.5 transition-all duration-150"
                style={{ color:"#6B7280", textDecoration:"none", border:"1px solid transparent" }}
                onMouseEnter={e => {
                  const a = e.currentTarget as HTMLAnchorElement;
                  a.style.color="#93C5FD"; a.style.background="rgba(37,99,235,0.07)"; a.style.borderColor="rgba(37,99,235,0.2)";
                }}
                onMouseLeave={e => {
                  const a = e.currentTarget as HTMLAnchorElement;
                  a.style.color="#6B7280"; a.style.background="transparent"; a.style.borderColor="transparent";
                }}
                onClick={e => e.stopPropagation()}
              >
                <span className="w-5 h-5 rounded-md flex items-center justify-center text-[0.6rem] font-black flex-shrink-0"
                  style={{ background:"rgba(255,255,255,0.05)", color:"#4B5563" }}>{l.ico}</span>
                {l.label}
              </a>
            ))}
          </div>

          {/* switch */}
          <div className="mt-auto">
            <button onClick={e => { e.stopPropagation(); triggerExit(); }}
              className="w-full text-xs font-semibold rounded-xl py-2.5 transition-all duration-200 flex items-center justify-center gap-2"
              style={{ background:"rgba(201,162,39,0.1)", border:"1px solid rgba(201,162,39,0.25)", color:"#C9A227", letterSpacing:"0.04em" }}
              onMouseEnter={e => {
                const b = e.currentTarget as HTMLButtonElement;
                b.style.background="rgba(201,162,39,0.18)"; b.style.borderColor="rgba(201,162,39,0.4)";
              }}
              onMouseLeave={e => {
                const b = e.currentTarget as HTMLButtonElement;
                b.style.background="rgba(201,162,39,0.1)"; b.style.borderColor="rgba(201,162,39,0.25)";
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Switch to Visual Mode
            </button>
          </div>
        </motion.aside>

        {/* ── TERMINAL PANE ── */}
        <div className="flex-1 flex flex-col overflow-hidden" style={{ background:"#0D0D0D" }}>

          {/* output */}
          <div className="flex-1 overflow-y-auto py-4 pl-5 pr-4"
            style={{ scrollbarWidth:"thin", scrollbarColor:"#1E293B transparent" }}>

            {lines.map(line => (
              <motion.div key={line.id}
                initial={{ opacity:0, y:3 }}
                animate={{ opacity:1, y:0 }}
                transition={{ duration:0.1 }}
                style={{
                  color: C[line.type] || "#9CA3AF",
                  fontSize:"clamp(0.72rem,1.5vw,0.85rem)",
                  lineHeight:1.9,
                  whiteSpace:"pre-wrap",
                  wordBreak:"break-word",
                  fontWeight: line.type==="cmd"||line.type==="gold" ? 600 : 400,
                  fontStyle: line.type==="hint" ? "italic" : "normal",
                  letterSpacing: line.type==="gold" ? "0.01em" : "0",
                }}
              >
                {line.text || "\u00A0"}
              </motion.div>
            ))}

            {/* ── INPUT ROW ── */}
            {booted && !glitching && (
              <div className="flex items-center gap-0 mt-2 rounded-lg"
                style={{
                  padding:"0.55rem 0.75rem",
                  background: focused ? "rgba(201,162,39,0.05)" : "rgba(255,255,255,0.025)",
                  border: focused ? "1px solid rgba(201,162,39,0.3)" : "1px solid rgba(255,255,255,0.07)",
                  transition:"all 0.2s ease",
                }}>
                <span className="font-bold text-xs flex-shrink-0" style={{ color:"#C9A227", fontSize:"clamp(0.72rem,1.5vw,0.85rem)" }}>aqib</span>
                <span className="font-bold flex-shrink-0" style={{ color:"#374151", fontSize:"clamp(0.72rem,1.5vw,0.85rem)" }}>@</span>
                <span className="font-semibold flex-shrink-0" style={{ color:"#34D399", fontSize:"clamp(0.72rem,1.5vw,0.85rem)" }}>portfolio</span>
                <span className="flex-shrink-0 mx-1" style={{ color:"#374151", fontSize:"clamp(0.72rem,1.5vw,0.85rem)" }}>:~$</span>
                <span className="flex-1 font-medium" style={{ color:"#F1F5F9", whiteSpace:"pre", fontSize:"clamp(0.72rem,1.5vw,0.85rem)" }}>{input}</span>
                <span style={{
                  display:"inline-block", width:"0.5ch", height:"1.1em",
                  background: blink && focused ? "#C9A227" : "transparent",
                  verticalAlign:"text-bottom", flexShrink:0, borderRadius:"1px",
                  transition:"background 0.05s",
                }}/>
              </div>
            )}
            <div ref={bottomRef}/>
          </div>

          {/* ── MOBILE BOTTOM BAR ── */}
          <AnimatePresence>
            {booted && (
              <motion.div
                initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:8 }}
                className="lg:hidden flex-shrink-0 overflow-x-auto"
                style={{ borderTop:"1px solid rgba(255,255,255,0.07)", background:"#111111", padding:"0.6rem 1rem" }}
              >
                <div className="flex items-center gap-2 w-max">
                  {["whoami","skills","projects","contact","hire"].map(cmd => (
                    <button key={cmd}
                      onClick={e => { e.stopPropagation(); runCommand(cmd); inputRef.current?.focus(); }}
                      className="text-xs font-semibold rounded-lg flex-shrink-0 transition-all duration-150"
                      style={{ padding:"0.35rem 0.9rem", background:"rgba(201,162,39,0.08)", border:"1px solid rgba(201,162,39,0.22)", color:"#C9A227", letterSpacing:"0.04em" }}
                    >
                      {cmd}
                    </button>
                  ))}
                  <div style={{ width:"1px", height:"1.2rem", background:"rgba(255,255,255,0.08)", flexShrink:0 }}/>
                  <button onClick={e => { e.stopPropagation(); triggerExit(); }}
                    className="text-xs font-semibold rounded-lg flex-shrink-0"
                    style={{ padding:"0.35rem 1rem", background:"rgba(201,162,39,0.12)", border:"1px solid rgba(201,162,39,0.3)", color:"#C9A227", letterSpacing:"0.04em" }}
                  >
                    visual mode →
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ══ STATUS BAR ══ */}
      <div className="relative flex-shrink-0 flex items-center gap-0 overflow-hidden" style={{
        height:"1.5rem", zIndex:20,
        background:"#C9A227",
      }}>
        <div className="flex items-center gap-4 px-4 h-full" style={{ background:"#1E3A5F" }}>
          <span className="text-xs font-bold" style={{ color:"#fff", letterSpacing:"0.06em" }}>M.AQIB</span>
        </div>
        <div className="flex items-center gap-4 px-4 h-full flex-1" style={{ background:"rgba(0,0,0,0.3)" }}>
          <span className="text-xs font-semibold flex items-center gap-1.5" style={{ color:"rgba(0,0,0,0.9)" }}>
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background:"#10B981" }}/>
            open to work
          </span>
          <span className="text-xs" style={{ color:"rgba(0,0,0,0.5)" }}>·</span>
          <span className="text-xs" style={{ color:"rgba(0,0,0,0.65)" }}>bash  UTF-8</span>
          <span className="text-xs" style={{ color:"rgba(0,0,0,0.5)" }}>·</span>
          <span className="text-xs" style={{ color:"rgba(0,0,0,0.65)" }}>📍 Pakistan</span>
        </div>
        <div className="flex items-center px-4 h-full" style={{ background:"rgba(0,0,0,0.2)" }}>
          <span className="text-xs font-semibold tabular-nums" style={{ color:"rgba(0,0,0,0.75)" }}>{clock}</span>
        </div>
      </div>

      {/* hidden real input */}
      <input ref={inputRef} value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={onKeyDown}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="fixed opacity-0 pointer-events-none"
        style={{ width:1, height:1, top:-100, left:-100 }}
        aria-label="Terminal command input"
        autoComplete="off" spellCheck={false}
      />
    </motion.div>
  );
}

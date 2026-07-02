"use client";
import { motion } from "framer-motion";

const links = ["About","Services","Projects","Experience","Contact"];

const socials = [
  { label:"GitHub",   href:"https://github.com",
    icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg> },
  { label:"LinkedIn", href:"https://linkedin.com",
    icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  { label:"Email",    href:"mailto:aqibm8123@gmail.com",
    icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg> },
];

export default function Footer() {
  const scrollTo = (id: string) => document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior:"smooth" });

  return (
    <footer style={{ background:"#060612", borderTop:"1px solid rgba(108,99,255,0.15)" }}>
      <div className="wrap" style={{ paddingTop:"3.5rem", paddingBottom:"3.5rem" }}>

        {/* Top */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
          <div className="text-center md:text-left">
            <button onClick={() => scrollTo("hero")} className="text-2xl font-extrabold mb-1 block tracking-tight">
              <span className="g-text">M</span>
              <span style={{ color:"#00E5FF" }}>.</span>
              <span style={{ color:"#fff" }}>Aqib</span>
            </button>
            <p className="text-xs" style={{ color:"#374151" }}>AI Engineer &amp; Full Stack Developer</p>
          </div>

          <div className="flex flex-wrap justify-center gap-5 sm:gap-7">
            {links.map(l => (
              <button key={l} onClick={() => scrollTo(l)}
                className="text-xs sm:text-sm font-medium transition-colors duration-200"
                style={{ color:"#4B5563" }}
                onMouseEnter={e=>(e.currentTarget.style.color="#6C63FF")}
                onMouseLeave={e=>(e.currentTarget.style.color="#4B5563")}>
                {l}
              </button>
            ))}
          </div>

          <div className="flex gap-2.5">
            {socials.map(s => (
              <motion.a key={s.label} href={s.href}
                target={s.href.startsWith("http")?"_blank":undefined}
                rel={s.href.startsWith("http")?"noopener noreferrer":undefined}
                aria-label={s.label}
                whileHover={{ scale:1.12, y:-3 }} whileTap={{ scale:.95 }}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", color:"#6B7280" }}
                onMouseEnter={e=>{
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.color="#6C63FF"; el.style.borderColor="rgba(108,99,255,0.4)";
                  el.style.background="rgba(108,99,255,0.1)";
                }}
                onMouseLeave={e=>{
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.color="#6B7280"; el.style.borderColor="rgba(255,255,255,0.08)";
                  el.style.background="rgba(255,255,255,0.05)";
                }}>
                {s.icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Gradient divider */}
        <div className="h-px mb-7"
          style={{ background:"linear-gradient(90deg, transparent, rgba(108,99,255,0.35) 30%, rgba(0,229,255,0.25) 70%, transparent)" }} />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs" style={{ color:"#374151" }}>
          <span>© {new Date().getFullYear()} M Aqib. All rights reserved.</span>
          <span>
            Built with <span className="g-text font-bold">Next.js</span> &amp; <span style={{ color:"#00E5FF" }}>Framer Motion</span>
          </span>
        </div>
      </div>
    </footer>
  );
}

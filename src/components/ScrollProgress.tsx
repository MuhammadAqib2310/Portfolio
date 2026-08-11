"use client";
import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/* ─────────────────────────────────────────────────
   ScrollProgress — two elements:
   1. Thin glowing bar at very top of viewport
   2. Floating side indicator with section name
───────────────────────────────────────────────── */

const SECTIONS = [
  { id: "hero",       label: "Home" },
  { id: "about",      label: "About" },
  { id: "tech",       label: "Stack" },
  { id: "services",   label: "Services" },
  { id: "why-me",     label: "Why Me" },
  { id: "projects",   label: "Projects" },
  { id: "process",    label: "Process" },
  { id: "experience", label: "Experience" },
  { id: "contact",    label: "Contact" },
];

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [activeSection, setActiveSection] = useState("Home");
  const [scrollPct, setScrollPct]         = useState(0);
  const [visible, setVisible]             = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setScrollPct(Math.round(pct * 100));
      setVisible(window.scrollY > 200);

      // detect active section
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(SECTIONS[i].label);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      {/* ── Top progress bar ── */}
      <motion.div
        style={{
          position: "fixed", top: 0, left: 0, right: 0,
          height: "2px", zIndex: 99990, originX: 0, scaleX,
          background: "linear-gradient(90deg, #6366F1 0%, #818CF8 50%, #C9A962 100%)",
          boxShadow: "0 0 8px rgba(99,102,241,0.6)",
        }}
      />

      {/* ── Side indicator ── */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : 40 }}
        transition={{ duration: 0.35 }}
        style={{
          position: "fixed", right: "1.25rem", top: "50%",
          transform: "translateY(-50%)",
          zIndex: 9990,
          display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem",
        }}
        className="hidden lg:flex"
      >
        {/* Section dots */}
        {SECTIONS.map(s => {
          const isActive = s.label === activeSection;
          return (
            <button
              key={s.id}
              onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })}
              title={s.label}
              style={{
                width: isActive ? 8 : 4,
                height: isActive ? 8 : 4,
                borderRadius: "50%",
                background: isActive ? "#6366F1" : "rgba(255,255,255,0.2)",
                boxShadow: isActive ? "0 0 8px rgba(99,102,241,0.8)" : "none",
                border: "none", cursor: "none",
                transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
                padding: 0,
              }}
            />
          );
        })}

        {/* Scroll % + back to top */}
        <button
          onClick={scrollToTop}
          style={{
            marginTop: "0.375rem",
            fontSize: "0.6rem", fontWeight: 800,
            color: "#55555F", letterSpacing: "0.08em",
            background: "none", border: "none", cursor: "none",
            transition: "color 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "#818CF8")}
          onMouseLeave={e => (e.currentTarget.style.color = "#55555F")}
        >
          {scrollPct}%
        </button>
      </motion.div>
    </>
  );
}

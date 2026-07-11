"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const themes = [
  {
    name: "Blue",
    accent: "#D4AF37",
    cyan:   "#F7E7CE",
    violet: "#A0A0AB",
    bg:     "#0A0A0F",
    bg2:    "#141420",
  },
  {
    name: "Violet",
    accent: "#7C6FFF",
    cyan:   "#00E5FF",
    violet: "#9D5CF6",
    bg:     "#0A0A15",
    bg2:    "#0C0B1E",
  },
  {
    name: "Cyan",
    accent: "#00E5FF",
    cyan:   "#7C6FFF",
    violet: "#06B6D4",
    bg:     "#050F15",
    bg2:    "#071520",
  },
  {
    name: "Rose",
    accent: "#F43F5E",
    cyan:   "#FB923C",
    violet: "#E879F9",
    bg:     "#150A0A",
    bg2:    "#1E0C0C",
  },
  {
    name: "Emerald",
    accent: "#10B981",
    cyan:   "#F7E7CE",
    violet: "#34D399",
    bg:     "#050F0A",
    bg2:    "#071510",
  },
  {
    name: "Amber",
    accent: "#F59E0B",
    cyan:   "#FCD34D",
    violet: "#F97316",
    bg:     "#100E05",
    bg2:    "#181205",
  },
];

export default function ThemePicker() {
  const [open, setOpen]     = useState(false);
  const [active, setActive] = useState(0);

  const applyTheme = (i: number) => {
    const t = themes[i];
    const root = document.documentElement;
    root.style.setProperty("--accent-main",   t.accent);
    root.style.setProperty("--accent",        t.accent);
    root.style.setProperty("--accent-cyan",   t.cyan);
    root.style.setProperty("--cyan",          t.cyan);
    root.style.setProperty("--accent-violet", t.violet);
    // update gradient text references
    root.style.setProperty("--g-from",  t.accent);
    root.style.setProperty("--g-to",    t.cyan);
    setActive(i);
  };

  // Persist on reload
  useEffect(() => {
    const saved = localStorage.getItem("theme-idx");
    if (saved !== null) applyTheme(Number(saved));
  }, []); // eslint-disable-line

  const handleSelect = (i: number) => {
    applyTheme(i);
    localStorage.setItem("theme-idx", String(i));
  };

  const current = themes[active];

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3">

      {/* Palette panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 16 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl overflow-hidden"
            style={{
              background: "rgba(10,10,20,0.95)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(32px)",
              padding: "1.25rem",
              boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
              minWidth: "220px",
            }}
          >
            <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.18em",
              textTransform: "uppercase", color: "#64748B", marginBottom: "0.875rem" }}>
              Theme Color
            </p>

            <div className="grid grid-cols-3 gap-2.5">
              {themes.map((t, i) => (
                <motion.button
                  key={t.name}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSelect(i)}
                  className="flex flex-col items-center gap-1.5 rounded-2xl transition-all"
                  style={{
                    padding: "0.75rem 0.5rem",
                    background: i === active ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)",
                    border: i === active ? `1.5px solid ${t.accent}` : "1.5px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {/* Color swatch */}
                  <div
                    className="w-8 h-8 rounded-xl"
                    style={{
                      background: `linear-gradient(135deg, ${t.accent}, ${t.cyan})`,
                      boxShadow: i === active ? `0 0 16px ${t.accent}80` : "none",
                    }}
                  />
                  <span style={{ fontSize: "0.65rem", fontWeight: 600,
                    color: i === active ? "#fff" : "#64748B" }}>
                    {t.name}
                  </span>
                  {i === active && (
                    <motion.div
                      layoutId="active-check"
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: t.accent }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            <div className="mt-3 pt-3 flex items-center justify-between"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <span style={{ fontSize: "0.65rem", color: "#64748B" }}>
                Active: <strong style={{ color: "#fff" }}>{current.name}</strong>
              </span>
              <div className="w-3 h-3 rounded-full"
                style={{ background: `linear-gradient(135deg, ${current.accent}, ${current.cyan})` }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        whileHover={{ scale: 1.1, boxShadow: `0 0 32px ${current.accent}60` }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(v => !v)}
        className="w-13 h-13 rounded-2xl flex items-center justify-center relative overflow-hidden"
        style={{
          width: "52px",
          height: "52px",
          background: `linear-gradient(135deg, ${current.accent}, ${current.cyan})`,
          boxShadow: `0 4px 24px ${current.accent}50`,
          border: "2px solid rgba(212,175,55,0.15)",
        }}
        aria-label="Change theme color"
      >
        {/* Rotating palette icon */}
        <motion.svg
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {open ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </>
          ) : (
            <>
              <circle cx="13.5" cy="6.5" r="0.5" fill="white" stroke="white" />
              <circle cx="17.5" cy="10.5" r="0.5" fill="white" stroke="white" />
              <circle cx="8.5" cy="7.5" r="0.5" fill="white" stroke="white" />
              <circle cx="6.5" cy="12.5" r="0.5" fill="white" stroke="white" />
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
            </>
          )}
        </motion.svg>

        {/* Shine effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(135deg, rgba(212,175,55,0.2) 0%, transparent 60%)" }}
        />
      </motion.button>
    </div>
  );
}

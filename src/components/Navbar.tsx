"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";

const navLinks = ["About", "Services", "Projects", "Experience", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const [active, setActive]     = useState("");
  const { scrollYProgress }     = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      // Active section tracking
      const sections = navLinks.map(l => document.getElementById(l.toLowerCase()));
      const scrollY = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollY) {
          setActive(navLinks[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
    setActive(id);
  };

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] z-[1001] origin-left w-full"
        style={{
          background: "linear-gradient(90deg, #2563EB 0%, #38BDF8 50%, #6366F1 100%)",
          scaleX,
        }}
      />

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-4 left-1/2 z-[1000] -translate-x-1/2"
        style={{ width: "min(95vw, 1100px)" }}
      >
        <div
          className="flex items-center justify-between rounded-2xl transition-all duration-500"
          style={{
            padding: "0.875rem 1.75rem",
            background: scrolled
              ? "rgba(15,23,42,0.97)"
              : "rgba(255,255,255,0.05)",
            backdropFilter: "blur(32px)",
            WebkitBackdropFilter: "blur(32px)",
            border: scrolled
              ? "1px solid rgba(37,99,235,0.25)"
              : "1px solid rgba(255,255,255,0.1)",
            boxShadow: scrolled
              ? "0 8px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)"
              : "0 4px 24px rgba(0,0,0,0.3)",
          }}
        >

          {/* ── Logo ── */}
          <button
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-3 select-none"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm text-white flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #2563EB 0%, #38BDF8 100%)",
                boxShadow: "0 4px 16px rgba(37,99,235,0.45)",
                letterSpacing: "0",
              }}
            >
              MA
            </div>
            <div className="flex flex-col leading-none">
              <span
                className="font-extrabold text-white"
                style={{
                  fontSize: "1.2rem",
                  fontFamily: "var(--font-space-grotesk), sans-serif",
                  letterSpacing: "-0.03em",
                }}
              >
                M<span style={{ color: "#2563EB" }}>.</span>Aqib
              </span>
              <span style={{ fontSize: "0.6rem", color: "#64748B", letterSpacing: "0.12em", fontWeight: 600 }}>
                AI ENGINEER
              </span>
            </div>
          </button>

          {/* ── Desktop Nav Links ── */}
          <div className="hidden md:flex items-center" style={{ gap: "0.25rem" }}>
            {navLinks.map(link => {
              const isActive = active === link;
              return (
                <button
                  key={link}
                  onClick={() => scrollTo(link)}
                  className="relative rounded-xl font-semibold transition-all duration-200"
                  style={{
                    padding: "0.5rem 1.1rem",
                    fontSize: "0.875rem",
                    color: isActive ? "#fff" : "#B4B8D4",
                    letterSpacing: "0.01em",
                  }}
                  onMouseEnter={e => {
                    if (!isActive) e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = isActive ? "#fff" : "#B4B8D4";
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-xl"
                      style={{ background: "rgba(37,99,235,0.18)", border: "1px solid rgba(37,99,235,0.25)" }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.45 }}
                    />
                  )}
                  <span className="relative z-10">{link}</span>
                </button>
              );
            })}
          </div>

          {/* ── CTA + Hamburger ── */}
          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => scrollTo("contact")}
              whileHover={{ scale: 1.04, boxShadow: "0 0 32px rgba(37,99,235,0.55)" }}
              whileTap={{ scale: 0.97 }}
              className="hidden md:flex items-center gap-2 font-bold text-white text-sm rounded-xl"
              style={{
                padding: "0.6rem 1.4rem",
                background: "linear-gradient(135deg, #2563EB 0%, #38BDF8 100%)",
                boxShadow: "0 4px 20px rgba(37,99,235,0.35)",
              }}
            >
              Hire Me
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 6h7m-3.5-3.5L9.5 6 6 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>

            {/* Hamburger */}
            <button
              aria-label="Menu"
              onClick={() => setOpen(v => !v)}
              className="md:hidden w-10 h-10 rounded-xl flex flex-col justify-center items-center gap-[5px] transition-all"
              style={{
                background: open ? "rgba(37,99,235,0.2)" : "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {[0, 1, 2].map(i => (
                <span
                  key={i}
                  className="block w-5 h-[2px] rounded-full transition-all duration-300"
                  style={{
                    background: "#B4B8D4",
                    transform:
                      open && i === 0 ? "rotate(45deg) translateY(7px)" :
                      open && i === 2 ? "rotate(-45deg) translateY(-7px)" : "",
                    opacity: open && i === 1 ? 0 : 1,
                  }}
                />
              ))}
            </button>
          </div>
        </div>

        {/* ── Mobile Dropdown ── */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="mt-2 rounded-2xl overflow-hidden"
              style={{
                background: "rgba(10,10,18,0.98)",
                border: "1px solid rgba(37,99,235,0.2)",
                backdropFilter: "blur(32px)",
                boxShadow: "0 16px 64px rgba(0,0,0,0.4)",
              }}
            >
              {navLinks.map((link, i) => (
                <motion.button
                  key={link}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(link)}
                  className="w-full text-left flex items-center justify-between transition-colors border-b"
                  style={{
                    padding: "1rem 1.5rem",
                    color: "#B4B8D4",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    borderColor: "rgba(255,255,255,0.06)",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.background = "rgba(37,99,235,0.08)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = "#B4B8D4";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  {link}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ opacity: 0.4 }}>
                    <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.button>
              ))}
              <div style={{ padding: "0.875rem" }}>
                <button
                  onClick={() => scrollTo("contact")}
                  className="w-full py-3 rounded-xl text-sm font-bold text-white"
                  style={{ background: "linear-gradient(135deg, #2563EB, #38BDF8)" }}
                >
                  Hire Me →
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}

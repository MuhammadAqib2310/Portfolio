"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = ["Building", "Designing", "Innovating", "Shipping"];
const CHARS  = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#";

export default function LoadingScreen() {
  const [loading,   setLoading]   = useState(true);
  const [progress,  setProgress]  = useState(0);
  const [wordIdx,   setWordIdx]   = useState(0);
  const [scramble,  setScramble]  = useState("M.Aqib");
  const [revealed,  setRevealed]  = useState(false);

  /* scramble → reveal logo */
  useEffect(() => {
    const target = "M.Aqib";
    let frame = 0;
    const total = target.length * 4;
    const tick = () => {
      const chars = target.split("").map((ch, i) => {
        if (ch === ".") return ".";
        if (frame >= (i / target.length) * total * 1.4) return ch;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      });
      setScramble(chars.join(""));
      frame++;
      if (frame < total * 1.4) setTimeout(tick, 40);
      else { setScramble(target); setRevealed(true); }
    };
    const t = setTimeout(tick, 300);
    return () => clearTimeout(t);
  }, []);

  /* cycle words + progress */
  useEffect(() => {
    const wt = setInterval(() => setWordIdx(i => (i + 1) % words.length), 550);
    const pt = setInterval(() => {
      setProgress(p => {
        const next = p + Math.random() * 14 + 4;
        if (next >= 100) {
          clearInterval(pt); clearInterval(wt);
          setTimeout(() => setLoading(false), 600);
          return 100;
        }
        return next;
      });
    }, 75);
    return () => { clearInterval(wt); clearInterval(pt); };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "#08080C" }}
        >
          {/* Animated grid */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage: "linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }} />

          {/* Orbs */}
          <div className="absolute pointer-events-none rounded-full anim-aurora"
            style={{ width: 500, height: 500, top: "5%", left: "5%",
              background: "radial-gradient(circle, rgba(99,102,241,0.18), transparent 65%)", filter: "blur(70px)" }} />
          <div className="absolute pointer-events-none rounded-full"
            style={{ width: 400, height: 400, bottom: "5%", right: "5%",
              background: "radial-gradient(circle, rgba(129,140,248,0.12), transparent 65%)", filter: "blur(70px)",
              animation: "aurora 16s ease-in-out infinite reverse" }} />

          {/* Center content */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center relative z-10"
            style={{ marginBottom: "3rem" }}
          >
            {/* Logo icon */}
            <motion.div
              animate={{ rotate: [0, 6, -6, 0], boxShadow: ["0 8px 32px rgba(99,102,241,0.4)", "0 8px 48px rgba(99,102,241,0.7)", "0 8px 32px rgba(99,102,241,0.4)"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-20 h-20 rounded-3xl flex items-center justify-center text-2xl font-black text-white mx-auto mb-6"
              style={{ background: "linear-gradient(135deg, #6366F1, #818CF8)", letterSpacing: "-0.02em", fontSize: "1.1rem" }}
            >
              MA
            </motion.div>

            {/* Scramble name */}
            <div style={{
              fontSize: "clamp(2.5rem, 7vw, 3.5rem)", fontWeight: 900,
              letterSpacing: "-0.04em", fontFamily: "var(--font-space-grotesk, sans-serif)",
              fontVariantNumeric: "tabular-nums",
            }}>
              <span style={{
                background: revealed
                  ? "linear-gradient(135deg, #FFFFFF 0%, #818CF8 100%)"
                  : "linear-gradient(135deg, #6366F1 0%, #818CF8 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                transition: "all 0.5s",
              }}>
                {scramble}
              </span>
            </div>

            {/* Cycling word */}
            <AnimatePresence mode="wait">
              <motion.p
                key={wordIdx}
                initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
                transition={{ duration: 0.28 }}
                style={{ fontSize: "0.7rem", letterSpacing: "0.28em", fontWeight: 700,
                  textTransform: "uppercase", color: "#6366F1", marginTop: "0.625rem" }}
              >
                {words[wordIdx]} the Future
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* Progress bar */}
          <div style={{ width: "clamp(180px, 32vw, 260px)", position: "relative", zIndex: 10 }}>
            <div className="relative rounded-full overflow-hidden mb-3"
              style={{ height: "2px", background: "rgba(255,255,255,0.06)" }}>
              <motion.div
                className="absolute top-0 left-0 h-full rounded-full"
                style={{
                  width: `${Math.min(progress, 100)}%`,
                  background: "linear-gradient(90deg, #6366F1, #818CF8, #C9A962)",
                  boxShadow: "0 0 8px rgba(99,102,241,0.6)",
                  transition: "width 0.08s linear",
                }}
              />
              {/* Moving shimmer */}
              <motion.div
                className="absolute top-0 h-full w-16 rounded-full"
                animate={{ left: ["-10%", "110%"] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)" }}
              />
            </div>

            <div className="flex justify-between items-center">
              <span style={{ fontSize: "0.62rem", color: "#334155", fontWeight: 600, letterSpacing: "0.12em" }}>
                LOADING
              </span>
              <motion.span
                style={{ fontSize: "0.72rem", fontWeight: 900, fontVariantNumeric: "tabular-nums" }}
                animate={{ color: progress === 100 ? "#C9A962" : "#6366F1" }}
              >
                {Math.min(Math.round(progress), 100)}%
              </motion.span>
            </div>
          </div>

          {/* Bottom tag */}
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 0.8 }}
            style={{ position: "absolute", bottom: "2rem", fontSize: "0.62rem",
              color: "#55555F", letterSpacing: "0.2em", fontWeight: 600 }}
          >
            AI ENGINEER · FULL STACK · SAAS
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

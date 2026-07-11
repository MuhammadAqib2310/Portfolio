"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = ["Building", "Designing", "Innovating", "Shipping"];

export default function LoadingScreen() {
  const [loading,  setLoading]  = useState(true);
  const [progress, setProgress] = useState(0);
  const [wordIdx,  setWordIdx]  = useState(0);

  useEffect(() => {
    // Cycle words
    const wt = setInterval(() => setWordIdx(i => (i + 1) % words.length), 600);

    // Progress
    const timer = setInterval(() => {
      setProgress(p => {
        const next = p + Math.random() * 16 + 4;
        if (next >= 100) {
          clearInterval(timer);
          clearInterval(wt);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return next;
      });
    }, 80);

    return () => { clearInterval(timer); clearInterval(wt); };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.65, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
          style={{ background: "linear-gradient(135deg, #0D0A0E 0%, #13101A 60%, #100D16 100%)" }}
        >
          {/* Orbs */}
          <div className="absolute pointer-events-none rounded-full"
            style={{ width: 400, height: 400, top: "15%", left: "10%",
              background: "radial-gradient(circle, rgba(232,121,160,0.2), transparent 65%)", filter: "blur(60px)" }} />
          <div className="absolute pointer-events-none rounded-full"
            style={{ width: 350, height: 350, bottom: "10%", right: "10%",
              background: "radial-gradient(circle, rgba(252,165,192,0.15), transparent 65%)", filter: "blur(60px)" }} />

          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-12"
          >
            {/* Icon */}
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-16 h-16 rounded-3xl flex items-center justify-center text-2xl font-black text-white mx-auto mb-5"
              style={{ background: "linear-gradient(135deg, #E879A0, #FCA5C0)",
                boxShadow: "0 8px 32px rgba(232,121,160,0.5)" }}
            >
              MA
            </motion.div>

            <div style={{ fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 900, letterSpacing: "-0.04em",
              fontFamily: "var(--font-space-grotesk, sans-serif)" }}>
              <span className="g-text">M</span>
              <span style={{ color: "#FCA5C0" }}>.</span>
              <span style={{ color: "#fff" }}>Aqib</span>
            </div>

            {/* Cycling word */}
            <AnimatePresence mode="wait">
              <motion.p
                key={wordIdx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                style={{ fontSize: "0.72rem", letterSpacing: "0.25em", fontWeight: 700,
                  textTransform: "uppercase", color: "#E879A0", marginTop: "0.5rem" }}
              >
                {words[wordIdx]} the Future
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* Progress */}
          <div style={{ width: "clamp(160px, 30vw, 240px)" }}>
            <div className="relative h-[2px] rounded-full overflow-hidden mb-3"
              style={{ background: "rgba(255,255,255,0.06)" }}>
              <motion.div
                className="absolute top-0 left-0 h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #E879A0, #FCA5C0)",
                  width: `${Math.min(progress, 100)}%`, transition: "width 0.08s linear" }}
              />
              {/* Shimmer */}
              <motion.div
                className="absolute top-0 h-full w-16 rounded-full"
                animate={{ left: ["-10%", "110%"] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)" }}
              />
            </div>
            <div className="flex justify-between items-center">
              <span style={{ fontSize: "0.65rem", color: "#334155", fontWeight: 600 }}>Loading</span>
              <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "#E879A0" }}>
                {Math.min(Math.round(progress), 100)}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

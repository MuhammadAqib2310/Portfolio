"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        const next = p + Math.random() * 18;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return next;
      });
    }, 90);
    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
          style={{ background: "#080810" }}
        >
          {/* Background orbs */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(circle, #6D5DFE, transparent)" }} />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-15 blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(circle, #00E5FF, transparent)" }} />

          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-14"
          >
            <div className="text-4xl sm:text-5xl font-extrabold mb-3 tracking-tight">
              <span className="gradient-text">M</span>
              <span style={{ color: "#00E5FF" }}>.</span>
              <span style={{ color: "#fff" }}>Aqib</span>
            </div>
            <p className="text-[11px] tracking-[0.3em] font-semibold uppercase" style={{ color: "#4B5563" }}>
              AI Engineer &amp; Full Stack Developer
            </p>
          </motion.div>

          {/* Progress bar */}
          <div className="w-40 sm:w-56">
            <div className="h-[2px] rounded-full overflow-hidden mb-3" style={{ background: "rgba(255,255,255,0.06)" }}>
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #6D5DFE, #00E5FF)",
                  width: `${Math.min(progress, 100)}%`,
                  transition: "width 0.1s linear",
                }}
              />
            </div>
            <p className="text-center text-xs font-bold" style={{ color: "#6D5DFE" }}>
              {Math.min(Math.round(progress), 100)}%
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

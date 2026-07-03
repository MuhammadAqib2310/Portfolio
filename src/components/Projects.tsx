"use client";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { projects } from "@/lib/utils";
import TiltCard from "@/components/TiltCard";

const cats = ["All", "AI", "SaaS", "AI Agent"];

const thumbGrad = [
  "135deg, rgba(37,99,235,.22), rgba(56,189,248,.06)",
  "135deg, rgba(56,189,248,.22), rgba(99,102,241,.06)",
  "135deg, rgba(99,102,241,.22), rgba(239,68,68,.06)",
  "135deg, rgba(245,158,11,.22), rgba(34,197,94,.06)",
  "135deg, rgba(34,197,94,.22), rgba(56,189,248,.06)",
  "135deg, rgba(239,68,68,.22), rgba(245,158,11,.06)",
  "135deg, rgba(37,99,235,.22), rgba(99,102,241,.06)",
  "135deg, rgba(56,189,248,.22), rgba(34,197,94,.06)",
];
const emojis = ["🌤️", "📊", "🔐", "🤖", "📞", "💼", "🎙️", "🚀"];

export default function Projects() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState("All");

  const list = active === "All" ? projects : projects.filter(p => p.category === active);

  return (
    <section
      id="projects"
      ref={ref}
      className="section-pad relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #1E293B 0%, #162032 100%)" }}
    >
      {/* BG glow */}
      <div className="absolute pointer-events-none rounded-full"
        style={{ width: 700, height: 700, top: "-20%", left: "50%", transform: "translateX(-50%)",
          background: "radial-gradient(circle, rgba(37,99,235,0.08), transparent 65%)", filter: "blur(100px)" }} />

      <div className="wrap">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="text-center mb-12"
        >
          <span className="sec-label" style={{ color: "var(--accent-cyan)" }}>Portfolio</span>
          <h2 style={{ fontSize: "clamp(2rem,5vw,3rem)", color: "#fff" }}>
            Featured <span className="g-text-2">Projects</span>
          </h2>
          <p className="text-sm sm:text-base mt-3 mx-auto" style={{ color: "#64748B", maxWidth: 480 }}>
            Real-world AI and web solutions delivering measurable business impact
          </p>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
          {cats.map(c => (
            <motion.button
              key={c}
              onClick={() => setActive(c)}
              whileTap={{ scale: 0.96 }}
              className="rounded-xl text-xs sm:text-sm font-bold transition-all duration-200"
              style={{
                padding: "0.5rem 1.25rem",
                background: active === c ? "linear-gradient(135deg, #2563EB, #38BDF8)" : "rgba(255,255,255,0.05)",
                color:  active === c ? "#fff" : "#64748B",
                border: active === c ? "none" : "1px solid rgba(255,255,255,0.08)",
                boxShadow: active === c ? "0 4px 20px rgba(37,99,235,.35)" : "none",
              }}
            >
              {c}
            </motion.button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid sm:grid-cols-2 gap-5 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => {
              const idx = projects.findIndex(x => x.id === p.id);
              return (
                <TiltCard
                  key={p.id}
                  intensity={6}
                  className="card overflow-hidden cursor-default"
                >
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.93 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.93 }}
                    transition={{ duration: 0.35, delay: i * 0.06 }}
                  >
                    {/* Thumbnail */}
                    <div
                      className="relative overflow-hidden"
                      style={{ height: "clamp(160px, 18vw, 220px)", background: `linear-gradient(${thumbGrad[idx % thumbGrad.length]})` }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center text-5xl sm:text-6xl opacity-75">
                        {emojis[idx % emojis.length]}
                      </div>
                      {/* Category badge */}
                      <span
                        className="absolute top-3 right-3 text-[11px] font-bold"
                        style={{ padding: "0.25rem 0.625rem", borderRadius: "0.625rem",
                          background: "rgba(0,0,0,0.55)", color: "#A89CFF",
                          border: "1px solid rgba(37,99,235,0.4)", backdropFilter: "blur(8px)" }}
                      >
                        {p.category}
                      </span>
                    </div>

                    <div className="p-5 sm:p-6">
                      <h3 className="font-bold mb-2" style={{ fontSize: "clamp(0.95rem,2vw,1.1rem)", color: "#fff" }}>
                        {p.title}
                      </h3>
                      <p className="text-xs sm:text-sm mb-4 leading-relaxed line-clamp-2" style={{ color: "#64748B" }}>
                        {p.description}
                      </p>

                      {/* Metrics */}
                      <div
                        className="flex gap-5 mb-4 rounded-xl"
                        style={{ padding: "0.625rem 0.875rem", background: "rgba(255,255,255,0.03)" }}
                      >
                        {Object.entries(p.metrics).map(([k, v]) => (
                          <div key={k}>
                            <div className="text-sm font-black g-text">{v as string}</div>
                            <div className="text-[10px] capitalize" style={{ color: "#64748B" }}>{k}</div>
                          </div>
                        ))}
                      </div>

                      {/* Tech tags */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {p.tech.map(t => (
                          <span
                            key={t}
                            className="text-[11px] font-semibold"
                            style={{ padding: "0.2rem 0.5rem", borderRadius: "0.5rem",
                              background: "rgba(37,99,235,0.1)", color: "#A89CFF",
                              border: "1px solid rgba(37,99,235,0.2)" }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-3">
                        <motion.a
                          href={p.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor="Visit"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="flex-1 text-center font-bold text-sm"
                          style={{ padding: "0.625rem", borderRadius: "0.75rem",
                            background: "linear-gradient(135deg, #2563EB, #38BDF8)", color: "#fff" }}
                        >
                          Live Demo →
                        </motion.a>
                        <motion.a
                          href={p.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor="GitHub"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="font-bold text-sm"
                          style={{ padding: "0.625rem 1rem", borderRadius: "0.75rem",
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.1)", color: "#94A3B8" }}
                        >
                          GitHub
                        </motion.a>
                      </div>
                    </div>
                  </motion.div>
                </TiltCard>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

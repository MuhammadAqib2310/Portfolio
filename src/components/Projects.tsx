"use client";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { projects } from "@/lib/utils";

const cats = ["All", "AI", "SaaS", "AI Agent"];

const catIcons: Record<string, string> = {
  All: "✦", AI: "🧠", SaaS: "🚀", "AI Agent": "🤖",
};

/* Per-project professional accent palette */
const projectAccents = [
  { from: "#1E3A5F", to: "#2563EB", light: "rgba(30,58,95,0.08)",  tag: "#EEF2FF", tagText: "#1E3A5F"  },
  { from: "#C9A227", to: "#92740D", light: "rgba(201,162,39,0.08)", tag: "#FFFBEB", tagText: "#92740D"  },
  { from: "#059669", to: "#047857", light: "rgba(5,150,105,0.08)",  tag: "#ECFDF5", tagText: "#047857"  },
  { from: "#7C3AED", to: "#6D28D9", light: "rgba(124,58,237,0.08)", tag: "#F5F3FF", tagText: "#6D28D9"  },
  { from: "#DC2626", to: "#B91C1C", light: "rgba(220,38,38,0.08)",  tag: "#FEF2F2", tagText: "#B91C1C"  },
  { from: "#0891B2", to: "#0E7490", light: "rgba(8,145,178,0.08)",  tag: "#ECFEFF", tagText: "#0E7490"  },
  { from: "#D97706", to: "#B45309", light: "rgba(217,119,6,0.08)",  tag: "#FFFBEB", tagText: "#B45309"  },
  { from: "#1E3A5F", to: "#1D4ED8", light: "rgba(30,58,95,0.08)",  tag: "#EEF2FF", tagText: "#1E4ED8"  },
];

const emojis = ["🌤️","📊","🔐","🤖","📞","💼","🎙️","🚀"];

/* ── Single project card ── */
function ProjectCard({ p, i, idx }: { p: typeof projects[0]; i: number; idx: number }) {
  const [hovered, setHovered] = useState(false);
  const acc = projectAccents[idx % projectAccents.length];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.45, delay: i * 0.07 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "1.5rem",
        overflow: "hidden",
        background: "#FFFFFF",
        border: hovered ? `1px solid ${acc.from}40` : "1px solid rgba(30,58,95,0.09)",
        boxShadow: hovered
          ? `0 20px 60px ${acc.light.replace("0.08", "0.18")}, 0 4px 16px rgba(30,58,95,0.08)`
          : "0 2px 16px rgba(30,58,95,0.06)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
        cursor: "default",
        position: "relative",
      }}
    >
      {/* Top accent line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "3px", zIndex: 5,
        background: `linear-gradient(90deg, ${acc.from}, ${acc.to})`,
        opacity: hovered ? 1 : 0.6,
        transition: "opacity 0.4s",
      }} />

      {/* ── Thumbnail ── */}
      <div style={{
        position: "relative", overflow: "hidden",
        height: "clamp(160px, 18vw, 210px)",
        background: `linear-gradient(135deg, ${acc.light} 0%, rgba(255,255,255,0) 100%)`,
      }}>
        {/* Subtle grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `linear-gradient(${acc.from}10 1px, transparent 1px), linear-gradient(90deg, ${acc.from}10 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
          opacity: hovered ? 1 : 0.5,
          transition: "opacity 0.4s",
        }} />

        {/* Radial glow */}
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(circle at 50% 60%, ${acc.from}18, transparent 65%)`,
          opacity: hovered ? 1 : 0.5,
          transition: "opacity 0.4s",
        }} />

        {/* Emoji icon */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "clamp(2.8rem, 5vw, 3.5rem)",
          transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
          transform: hovered ? "scale(1.12) translateY(-4px)" : "scale(1)",
          filter: hovered ? `drop-shadow(0 4px 16px ${acc.from}60)` : "none",
        }}>
          {emojis[idx % emojis.length]}
        </div>

        {/* Category pill */}
        <div style={{
          position: "absolute", top: 12, left: 12,
          padding: "0.25rem 0.75rem", borderRadius: "999px",
          background: acc.tag,
          border: `1px solid ${acc.from}25`,
          color: acc.tagText,
          fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.08em",
          backdropFilter: "blur(8px)",
        }}>
          {p.category}
        </div>

        {/* Number badge */}
        <div style={{
          position: "absolute", top: 12, right: 12,
          width: 30, height: 30, borderRadius: "50%",
          background: "rgba(255,255,255,0.9)",
          border: `1px solid ${acc.from}20`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "0.62rem", fontWeight: 800, color: acc.from,
          boxShadow: "0 2px 8px rgba(30,58,95,0.1)",
        }}>
          {String(idx + 1).padStart(2, "0")}
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ padding: "1.375rem 1.5rem 1.5rem" }}>

        {/* Title */}
        <h3 style={{
          fontSize: "clamp(1rem, 2vw, 1.1rem)", fontWeight: 800,
          color: "#0F172A", marginBottom: "0.45rem", lineHeight: 1.3,
        }}>
          {p.title}
        </h3>

        {/* Description */}
        <p style={{
          fontSize: "0.82rem", color: "#64748B",
          lineHeight: 1.7, marginBottom: "1.1rem",
          display: "-webkit-box", WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>
          {p.description}
        </p>

        {/* Metrics row */}
        <div style={{
          display: "flex", gap: "0", marginBottom: "1.1rem",
          borderRadius: "0.875rem", overflow: "hidden",
          border: `1px solid ${acc.from}18`,
          background: `linear-gradient(135deg, ${acc.light}, rgba(255,255,255,0.5))`,
        }}>
          {Object.entries(p.metrics).map(([k, v], mi) => (
            <div key={k} style={{
              flex: 1, padding: "0.6rem 0.75rem", textAlign: "center",
              borderRight: mi < Object.entries(p.metrics).length - 1 ? `1px solid ${acc.from}15` : "none",
            }}>
              <div style={{
                fontSize: "0.88rem", fontWeight: 900,
                background: `linear-gradient(135deg, ${acc.from}, ${acc.to})`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                lineHeight: 1.2,
              }}>{v as string}</div>
              <div style={{
                fontSize: "0.58rem", color: "#94A3B8",
                textTransform: "capitalize", fontWeight: 600,
                letterSpacing: "0.05em", marginTop: "0.15rem",
              }}>{k}</div>
            </div>
          ))}
        </div>

        {/* Tech tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "1.25rem" }}>
          {p.tech.map(t => (
            <span key={t} style={{
              fontSize: "0.65rem", fontWeight: 700,
              padding: "0.2rem 0.55rem", borderRadius: "0.4rem",
              background: acc.tag,
              border: `1px solid ${acc.from}20`,
              color: acc.tagText,
              letterSpacing: "0.03em",
            }}>
              {t}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: "0.625rem" }}>
          <motion.a
            href={p.demo}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              flex: 1, textAlign: "center",
              padding: "0.65rem 1rem",
              borderRadius: "0.75rem",
              background: `linear-gradient(135deg, ${acc.from}, ${acc.to})`,
              color: "#fff", fontWeight: 700, fontSize: "0.78rem",
              textDecoration: "none",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "0.3rem",
              boxShadow: hovered ? `0 4px 16px ${acc.from}35` : `0 2px 8px ${acc.from}20`,
              transition: "box-shadow 0.3s",
            }}
          >
            Live Demo
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.a>

          <motion.a
            href={p.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, background: acc.tag, borderColor: `${acc.from}35`, color: acc.from }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: "0.65rem 1rem",
              borderRadius: "0.75rem",
              background: "rgba(30,58,95,0.04)",
              border: "1px solid rgba(30,58,95,0.1)",
              color: "#475569", fontWeight: 700, fontSize: "0.78rem",
              textDecoration: "none",
              display: "flex", alignItems: "center", gap: "0.3rem",
              transition: "all 0.25s",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            Code
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main Section ── */
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
      style={{ background: "linear-gradient(180deg, #F4F3EE 0%, #FAFAF7 100%)" }}
    >
      {/* BG glows */}
      <div className="absolute pointer-events-none rounded-full"
        style={{ width: 700, height: 700, top: "-20%", left: "50%", transform: "translateX(-50%)",
          background: "radial-gradient(circle, rgba(201,162,39,0.07), transparent 65%)", filter: "blur(100px)" }} />
      <div className="absolute pointer-events-none rounded-full"
        style={{ width: 500, height: 400, bottom: "-10%", right: "5%",
          background: "radial-gradient(ellipse, rgba(30,58,95,0.06), transparent 70%)", filter: "blur(80px)" }} />

      {/* Subtle dot grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(rgba(30,58,95,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 80%)" }} />

      <div className="wrap">

        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="text-center mb-14"
        >
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            padding: "0.35rem 1.1rem", borderRadius: "999px", marginBottom: "1rem",
            background: "rgba(201,162,39,0.1)", border: "1px solid rgba(201,162,39,0.25)",
            fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.18em",
            color: "#92740D", textTransform: "uppercase",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#C9A227",
              boxShadow: "0 0 8px #C9A227", display: "inline-block",
              animation: "pulse-glow 2s ease-in-out infinite" }} />
            Portfolio
          </div>

          <h2 style={{ fontSize: "clamp(2.2rem, 5vw, 3.25rem)", color: "#0F172A", marginBottom: "1rem", lineHeight: 1.15 }}>
            Featured{" "}
            <span className="g-text">Projects</span>
          </h2>
          <p style={{ fontSize: "0.95rem", color: "#64748B", maxWidth: 480, margin: "0 auto", lineHeight: 1.8 }}>
            Real-world AI and web solutions delivering measurable business impact
          </p>
        </motion.div>

        {/* ── Filter tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.5rem", marginBottom: "3rem" }}
        >
          {cats.map(c => {
            const isActive = active === c;
            const count = c === "All" ? projects.length : projects.filter(p => p.category === c).length;
            return (
              <motion.button
                key={c}
                onClick={() => setActive(c)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  padding: "0.55rem 1.25rem",
                  borderRadius: "999px",
                  fontSize: "0.8rem", fontWeight: 700,
                  display: "flex", alignItems: "center", gap: "0.4rem",
                  background: isActive
                    ? "linear-gradient(135deg, #1E3A5F, #2563EB)"
                    : "#FFFFFF",
                  color: isActive ? "#fff" : "#475569",
                  border: isActive ? "none" : "1px solid rgba(30,58,95,0.1)",
                  boxShadow: isActive
                    ? "0 4px 20px rgba(30,58,95,0.25)"
                    : "0 1px 6px rgba(30,58,95,0.06)",
                  transition: "all 0.25s cubic-bezier(0.22,1,0.36,1)",
                  cursor: "none",
                }}
              >
                <span>{catIcons[c]}</span>
                {c}
                <span style={{
                  padding: "0.05rem 0.45rem",
                  borderRadius: "999px",
                  fontSize: "0.62rem",
                  fontWeight: 800,
                  background: isActive ? "rgba(255,255,255,0.2)" : "rgba(30,58,95,0.07)",
                  color: isActive ? "#fff" : "#64748B",
                }}>
                  {count}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* ── Grid ── */}
        <motion.div layout className="grid sm:grid-cols-2 gap-5 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => {
              const idx = projects.findIndex(x => x.id === p.id);
              return <ProjectCard key={p.id} p={p} i={i} idx={idx} />;
            })}
          </AnimatePresence>
        </motion.div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          style={{ textAlign: "center", marginTop: "4rem" }}
        >
          {/* Divider */}
          <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(201,162,39,0.3), transparent)", marginBottom: "2.5rem" }} />

          <p style={{ fontSize: "0.875rem", color: "#64748B", marginBottom: "1.25rem" }}>
            Want to see more work or discuss a custom project?
          </p>
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: "0 8px 40px rgba(30,58,95,0.3)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="font-bold text-white text-sm rounded-2xl inline-flex items-center gap-2"
            style={{
              padding: "0.9rem 2.5rem",
              background: "linear-gradient(135deg, #1E3A5F, #2563EB)",
              boxShadow: "0 4px 24px rgba(30,58,95,0.25)",
              border: "none", cursor: "none",
            }}
          >
            Let&apos;s Work Together
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

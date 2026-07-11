"use client";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { projects } from "@/lib/utils";
import PremiumBG from "@/components/PremiumBG";

const cats = ["All", "AI", "SaaS", "AI Agent"];

/* Per-project accent colors */
const projectAccents = [
  { from: "#E879A0", to: "#FCA5C0", glow: "rgba(232,121,160,0.5)"   },
  { from: "#FCA5C0", to: "#C084A0", glow: "rgba(252,165,192,0.5)"  },
  { from: "#C084A0", to: "#A855F7", glow: "rgba(192,132,160,0.5)"  },
  { from: "#F59E0B", to: "#EF4444", glow: "rgba(245,158,11,0.5)"  },
  { from: "#22C55E", to: "#FCA5C0", glow: "rgba(34,197,94,0.5)"   },
  { from: "#EF4444", to: "#F59E0B", glow: "rgba(239,68,68,0.5)"   },
  { from: "#8B5CF6", to: "#FCA5C0", glow: "rgba(139,92,246,0.5)"  },
  { from: "#06B6D4", to: "#C084A0", glow: "rgba(6,182,212,0.5)"   },
];

const emojis     = ["🌤️","📊","🔐","🤖","📞","💼","🎙️","🚀"];
const catIcons: Record<string, string> = {
  All: "✦", AI: "🧠", SaaS: "🚀", "AI Agent": "🤖",
};

/* ── single project card ── */
function ProjectCard({ p, i, idx }: { p: typeof projects[0]; i: number; idx: number }) {
  const [hovered, setHovered] = useState(false);
  const acc = projectAccents[idx % projectAccents.length];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.45, delay: i * 0.07 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "1.75rem",
        overflow: "hidden",
        position: "relative",
        background: "rgba(255,255,255,0.03)",
        border: hovered
          ? `1px solid ${acc.from}55`
          : "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        boxShadow: hovered
          ? `0 12px 60px ${acc.glow.replace("0.5","0.18")}, 0 0 0 1px ${acc.from}30`
          : "0 4px 30px rgba(0,0,0,0.3)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
        cursor: "default",
      }}
    >
      {/* ── top glow line ── */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "2px",
        background: `linear-gradient(90deg, transparent, ${acc.from}, ${acc.to}, transparent)`,
        opacity: hovered ? 1 : 0.4,
        transition: "opacity 0.4s",
        zIndex: 5,
      }} />

      {/* ── Thumbnail ── */}
      <div style={{
        position: "relative", overflow: "hidden",
        height: "clamp(170px,19vw,230px)",
        background: `linear-gradient(135deg, ${acc.from}20, ${acc.to}0D)`,
      }}>
        {/* animated grid pattern */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `linear-gradient(${acc.from}14 1px, transparent 1px),
                            linear-gradient(90deg, ${acc.from}14 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
          opacity: hovered ? 0.8 : 0.4,
          transition: "opacity 0.4s",
        }} />

        {/* center radial glow */}
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(circle at 50% 50%, ${acc.from}25, transparent 65%)`,
          opacity: hovered ? 1 : 0.6,
          transition: "opacity 0.4s",
        }} />

        {/* emoji */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "clamp(3rem,6vw,4rem)",
          filter: hovered ? `drop-shadow(0 0 24px ${acc.from})` : "none",
          transition: "filter 0.4s",
          transform: hovered ? "scale(1.1)" : "scale(1)",
          transitionProperty: "filter, transform",
        }}>
          {emojis[idx % emojis.length]}
        </div>

        {/* category pill */}
        <div style={{
          position: "absolute", top: 14, left: 14,
          padding: "0.25rem 0.75rem", borderRadius: "999px",
          background: `${acc.from}25`,
          border: `1px solid ${acc.from}50`,
          color: acc.from === "#E879A0" ? "#93C5FD" : acc.from === "#FCA5C0" ? "#7DD3FC" : "#C4B5FD",
          fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.08em",
          backdropFilter: "blur(10px)",
        }}>
          {p.category}
        </div>

        {/* number badge */}
        <div style={{
          position: "absolute", top: 14, right: 14,
          width: 32, height: 32, borderRadius: "50%",
          background: "rgba(0,0,0,0.45)",
          border: "1px solid rgba(255,255,255,0.12)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "0.65rem", fontWeight: 800, color: "rgba(255,255,255,0.5)",
          backdropFilter: "blur(8px)",
        }}>
          {String(idx + 1).padStart(2,"0")}
        </div>

        {/* hover overlay shine */}
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(135deg, ${acc.from}12 0%, transparent 60%)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s",
        }} />
      </div>

      {/* ── Body ── */}
      <div style={{ padding: "1.5rem 1.625rem 1.625rem" }}>

        {/* title */}
        <h3 style={{
          fontSize: "clamp(1rem,2vw,1.15rem)", fontWeight: 800,
          color: "#fff", marginBottom: "0.5rem", lineHeight: 1.3,
        }}>
          {p.title}
        </h3>

        {/* description */}
        <p style={{
          fontSize: "0.825rem", color: "#64748B",
          lineHeight: 1.75, marginBottom: "1.25rem",
          display: "-webkit-box", WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>
          {p.description}
        </p>

        {/* ── Metrics bar ── */}
        <div style={{
          display: "flex", gap: "1rem", marginBottom: "1.25rem",
          padding: "0.75rem 1rem", borderRadius: "1rem",
          background: `linear-gradient(135deg, ${acc.from}0C, ${acc.to}08)`,
          border: `1px solid ${acc.from}20`,
        }}>
          {Object.entries(p.metrics).map(([k, v]) => (
            <div key={k} style={{ display: "flex", flexDirection: "column", gap: "0.1rem" }}>
              <span style={{
                fontSize: "1rem", fontWeight: 900,
                background: `linear-gradient(135deg, ${acc.from}, ${acc.to})`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>{v as string}</span>
              <span style={{ fontSize: "0.62rem", color: "#475569", textTransform: "capitalize", fontWeight: 600, letterSpacing: "0.06em" }}>
                {k}
              </span>
            </div>
          ))}
          {/* divider dot */}
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
            <span style={{
              width: 8, height: 8, borderRadius: "50%",
              background: `linear-gradient(135deg, ${acc.from}, ${acc.to})`,
              boxShadow: `0 0 8px ${acc.from}`,
              display: "inline-block",
              animation: "pulse-glow 2s ease-in-out infinite",
            }} />
          </div>
        </div>

        {/* ── Tech tags ── */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.375rem" }}>
          {p.tech.map(t => (
            <span key={t} style={{
              fontSize: "0.68rem", fontWeight: 700,
              padding: "0.22rem 0.6rem", borderRadius: "0.5rem",
              background: `${acc.from}12`,
              border: `1px solid ${acc.from}28`,
              color: acc.from === "#E879A0" ? "#93C5FD"
                   : acc.from === "#FCA5C0" ? "#7DD3FC"
                   : acc.from === "#C084A0" ? "#C4B5FD"
                   : acc.from === "#22C55E" ? "#86EFAC"
                   : "#C4B5FD",
              letterSpacing: "0.03em",
              transition: "background 0.2s, border-color 0.2s",
            }}>
              {t}
            </span>
          ))}
        </div>

        {/* ── Action buttons ── */}
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <motion.a
            href={p.demo}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              flex: 1, textAlign: "center",
              padding: "0.7rem 1rem",
              borderRadius: "0.875rem",
              background: `linear-gradient(135deg, ${acc.from}, ${acc.to})`,
              color: "#fff", fontWeight: 800, fontSize: "0.8rem",
              boxShadow: hovered ? `0 4px 20px ${acc.glow.replace("0.5","0.35")}` : "none",
              transition: "box-shadow 0.3s",
              textDecoration: "none",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "0.35rem",
            }}
          >
            <span>Live Demo</span>
            <span style={{ fontSize: "0.75rem" }}>↗</span>
          </motion.a>

          <motion.a
            href={p.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, borderColor: `${acc.from}55`, color: "#fff" }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: "0.7rem 1.1rem",
              borderRadius: "0.875rem",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#64748B", fontWeight: 700, fontSize: "0.8rem",
              textDecoration: "none",
              display: "flex", alignItems: "center", gap: "0.35rem",
              transition: "all 0.25s",
            }}
          >
            {/* GitHub icon */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
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
      style={{ background: "linear-gradient(180deg, #13101A 0%, #100D16 100%)" }}
    >
      <PremiumBG variant="grid" accent="#E879A0" cyan="#FCA5C0" />

      {/* deep glow */}
      <div className="absolute pointer-events-none"
        style={{ width: 900, height: 900, top: "-25%", left: "50%", transform: "translateX(-50%)",
          background: "radial-gradient(circle, rgba(232,121,160,0.13), transparent 65%)", filter: "blur(130px)", borderRadius: "50%" }} />
      <div className="absolute pointer-events-none"
        style={{ width: 600, height: 400, bottom: "-10%", left: "15%",
          background: "radial-gradient(ellipse, rgba(252,165,192,0.07), transparent 70%)", filter: "blur(90px)", borderRadius: "50%" }} />

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
            padding: "0.35rem 1rem", borderRadius: "999px", marginBottom: "1rem",
            background: "rgba(252,165,192,0.1)", border: "1px solid rgba(252,165,192,0.25)",
            fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em",
            color: "#FCA5C0", textTransform: "uppercase",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#FCA5C0",
              boxShadow: "0 0 8px #FCA5C0", display: "inline-block" }} />
            Portfolio
          </div>

          <h2 style={{ fontSize: "clamp(2.2rem,5vw,3.25rem)", color: "#fff", marginBottom: "1rem" }}>
            Featured <span className="g-text-2">Projects</span>
          </h2>
          <p style={{ fontSize: "0.925rem", color: "#64748B", maxWidth: 460, margin: "0 auto", lineHeight: 1.8 }}>
            Real-world AI and web solutions delivering measurable business impact
          </p>
        </motion.div>

        {/* ── Filter tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{
            display: "flex", flexWrap: "wrap", justifyContent: "center",
            gap: "0.625rem", marginBottom: "3rem",
          }}
        >
          {cats.map(c => (
            <motion.button
              key={c}
              onClick={() => setActive(c)}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: "0.5rem 1.375rem",
                borderRadius: "999px",
                fontSize: "0.78rem", fontWeight: 700,
                display: "flex", alignItems: "center", gap: "0.4rem",
                background: active === c
                  ? "linear-gradient(135deg, #E879A0, #FCA5C0)"
                  : "rgba(255,255,255,0.04)",
                color: active === c ? "#fff" : "#64748B",
                border: active === c ? "none" : "1px solid rgba(255,255,255,0.08)",
                boxShadow: active === c ? "0 4px 20px rgba(232,121,160,0.4)" : "none",
                transition: "all 0.25s",
                cursor: "none",
              }}
            >
              <span>{catIcons[c]}</span>
              {c}
              {active === c && (
                <span style={{
                  background: "rgba(255,255,255,0.25)",
                  borderRadius: "999px",
                  padding: "0.05rem 0.4rem",
                  fontSize: "0.62rem",
                }}>
                  {c === "All" ? projects.length : projects.filter(p => p.category === c).length}
                </span>
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* ── Grid ── */}
        <motion.div layout className="grid sm:grid-cols-2 gap-6 sm:gap-7">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => {
              const idx = projects.findIndex(x => x.id === p.id);
              return (
                <ProjectCard key={p.id} p={p} i={i} idx={idx} />
              );
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
          <p style={{ fontSize: "0.85rem", color: "#475569", marginBottom: "1.25rem" }}>
            Want to see more work or discuss a custom project?
          </p>
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(232,121,160,0.45)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              padding: "0.875rem 2.5rem",
              borderRadius: "999px",
              background: "linear-gradient(135deg, #E879A0, #FCA5C0)",
              color: "#fff", fontWeight: 800, fontSize: "0.875rem",
              boxShadow: "0 4px 28px rgba(232,121,160,0.35)",
              border: "none", cursor: "none",
            }}
          >
            Let&apos;s Work Together →
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
}

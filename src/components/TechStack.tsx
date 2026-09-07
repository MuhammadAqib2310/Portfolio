"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/* ── Tech categories with icons (SVG paths or emoji) ── */
const categories = [
  {
    label: "Frontend",
    icon: "⚛️",
    color: "#2563EB",
    bg: "#EEF2FF",
    border: "rgba(37,99,235,0.18)",
    techs: [
      { name: "React",      icon: "⚛️" },
      { name: "Next.js",    icon: "▲" },
      { name: "TypeScript", icon: "TS" },
      { name: "Tailwind",   icon: "🎨" },
      { name: "Framer",     icon: "✦" },
    ],
  },
  {
    label: "Backend",
    icon: "🟢",
    color: "#059669",
    bg: "#ECFDF5",
    border: "rgba(5,150,105,0.18)",
    techs: [
      { name: "Node.js",  icon: "🟢" },
      { name: "FastAPI",  icon: "⚡" },
      { name: "Python",   icon: "🐍" },
      { name: "GraphQL",  icon: "◈" },
      { name: "REST API", icon: "🔗" },
    ],
  },
  {
    label: "AI / ML",
    icon: "🤖",
    color: "#7C3AED",
    bg: "#F5F3FF",
    border: "rgba(124,58,237,0.18)",
    techs: [
      { name: "OpenAI",     icon: "🧠" },
      { name: "LangChain",  icon: "🔗" },
      { name: "LlamaIndex", icon: "🦙" },
      { name: "ElevenLabs", icon: "🎙️" },
      { name: "Whisper",    icon: "🎤" },
    ],
  },
  {
    label: "Database",
    icon: "🗄️",
    color: "#1E3A5F",
    bg: "#EEF2FF",
    border: "rgba(30,58,95,0.18)",
    techs: [
      { name: "PostgreSQL", icon: "🐘" },
      { name: "MongoDB",    icon: "🍃" },
      { name: "Redis",      icon: "🔴" },
      { name: "Supabase",   icon: "⚡" },
      { name: "Prisma",     icon: "◆" },
    ],
  },
  {
    label: "Cloud & DevOps",
    icon: "☁️",
    color: "#C9A227",
    bg: "#FFFBEB",
    border: "rgba(201,162,39,0.22)",
    techs: [
      { name: "AWS",        icon: "☁️" },
      { name: "Docker",     icon: "🐳" },
      { name: "Kubernetes", icon: "⎈" },
      { name: "Vercel",     icon: "▲" },
      { name: "GitHub CI",  icon: "⚙️" },
    ],
  },
];

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function TechStack() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="tech"
      ref={ref}
      className="section-pad relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #FAFAF7 0%, #F4F3EE 100%)" }}
    >
      {/* ── Background glows ── */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div className="absolute rounded-full anim-aurora"
          style={{ width: "min(700px,90vw)", height: "min(700px,90vw)",
            top: "-25%", left: "-15%",
            background: "radial-gradient(circle, rgba(201,162,39,0.08), transparent 65%)",
            filter: "blur(90px)" }} />
        <div className="absolute rounded-full"
          style={{ width: "min(600px,80vw)", height: "min(600px,80vw)",
            bottom: "-20%", right: "-12%",
            background: "radial-gradient(circle, rgba(30,58,95,0.07), transparent 65%)",
            filter: "blur(80px)",
            animation: "aurora 22s ease-in-out infinite reverse" }} />
        {/* dot grid */}
        <div className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(rgba(30,58,95,0.055) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage: "radial-gradient(ellipse 85% 80% at 50% 50%, black 20%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse 85% 80% at 50% 50%, black 20%, transparent 75%)",
          }} />
      </div>

      <div className="wrap relative" style={{ zIndex: 1 }}>

        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4"
            style={{
              padding: "0.35rem 1.1rem", borderRadius: "999px",
              background: "rgba(201,162,39,0.1)", border: "1px solid rgba(201,162,39,0.25)",
              fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.18em",
              textTransform: "uppercase", color: "#92740D",
            }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%", background: "#C9A227",
              display: "inline-block", animation: "pulse-glow 2s ease-in-out infinite",
            }} />
            Technologies
          </div>

          <h2 style={{ fontSize: "clamp(2.2rem, 5vw, 3.25rem)", color: "#0F172A", lineHeight: 1.15 }}>
            My <span className="g-text">Tech Stack</span>
          </h2>
          <p className="mt-4 mx-auto"
            style={{ fontSize: "1rem", color: "#64748B", maxWidth: 480, lineHeight: 1.8 }}>
            A curated set of modern tools I use to ship production-grade products
          </p>
        </motion.div>

        {/* ── Category cards grid ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: ci * 0.1, ease }}
              className="group relative rounded-2xl overflow-hidden"
              style={{
                background: "#FFFFFF",
                border: `1px solid ${cat.border}`,
                boxShadow: "0 2px 16px rgba(30,58,95,0.06)",
                transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
              }}
              whileHover={{
                y: -6,
                boxShadow: `0 20px 50px ${cat.color}18, 0 4px 16px rgba(30,58,95,0.08)`,
              }}
            >
              {/* Top accent bar */}
              <div style={{
                height: "3px",
                background: `linear-gradient(90deg, ${cat.color}, ${cat.color}44)`,
              }} />

              {/* Subtle bg wash on hover */}
              <div style={{
                position: "absolute", inset: 0,
                background: `radial-gradient(ellipse at top left, ${cat.color}07, transparent 65%)`,
                pointerEvents: "none",
                borderRadius: "inherit",
                opacity: 0,
                transition: "opacity 0.35s",
              }}
                className="group-hover:opacity-100"
              />

              <div style={{ padding: "1.5rem 1.5rem 1.75rem" }}>
                {/* Category header */}
                <div className="flex items-center gap-3 mb-5">
                  <div style={{
                    width: 44, height: 44, borderRadius: "0.875rem",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.3rem",
                    background: cat.bg,
                    border: `1px solid ${cat.color}22`,
                    flexShrink: 0,
                  }}>
                    {cat.icon}
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: "0.9rem", fontWeight: 800,
                      color: "#0F172A", lineHeight: 1.2,
                    }}>
                      {cat.label}
                    </h3>
                    <p style={{ fontSize: "0.65rem", color: "#94A3B8", fontWeight: 600, marginTop: "0.1rem" }}>
                      {cat.techs.length} tools
                    </p>
                  </div>
                </div>

                {/* Tech pills */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {cat.techs.map((tech, ti) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.3 + ci * 0.1 + ti * 0.06, ease }}
                      style={{
                        display: "flex", alignItems: "center", gap: "0.625rem",
                        padding: "0.5rem 0.75rem",
                        borderRadius: "0.625rem",
                        background: `${cat.color}08`,
                        border: `1px solid ${cat.color}14`,
                        transition: "all 0.2s ease",
                      }}
                      whileHover={{
                        background: cat.bg,
                        borderColor: `${cat.color}35`,
                        x: 3,
                      }}
                    >
                      <span style={{
                        fontSize: "0.85rem",
                        width: 22, textAlign: "center",
                        flexShrink: 0,
                        fontFamily: "monospace",
                        fontWeight: 700,
                        color: cat.color,
                      }}>
                        {tech.icon}
                      </span>
                      <span style={{
                        fontSize: "0.8rem", fontWeight: 600,
                        color: "#334155",
                      }}>
                        {tech.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Proficiency bar row ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.65, ease }}
          className="mt-14 rounded-2xl overflow-hidden"
          style={{
            background: "#FFFFFF",
            border: "1px solid rgba(30,58,95,0.08)",
            boxShadow: "0 4px 24px rgba(30,58,95,0.07)",
          }}
        >
          {/* header */}
          <div style={{
            padding: "1.25rem 1.75rem",
            borderBottom: "1px solid rgba(30,58,95,0.07)",
            background: "linear-gradient(135deg, rgba(201,162,39,0.04), rgba(30,58,95,0.02))",
            display: "flex", alignItems: "center", gap: "0.75rem",
          }}>
            <div style={{ width: 4, height: 28, borderRadius: 4, background: "linear-gradient(180deg, #C9A227, #1E3A5F)", flexShrink: 0 }} />
            <div>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0F172A" }}>
                Proficiency Overview
              </h3>
              <p style={{ fontSize: "0.72rem", color: "#94A3B8", marginTop: "0.1rem" }}>
                Self-assessed based on production usage
              </p>
            </div>
          </div>

          {/* bars */}
          <div style={{ padding: "1.5rem 1.75rem" }}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-5">
              {[
                { name: "React / Next.js",    pct: 92, color: "#2563EB" },
                { name: "Python / FastAPI",   pct: 90, color: "#C9A227" },
                { name: "Node.js / Express",  pct: 88, color: "#059669" },
                { name: "AI Integration",     pct: 92, color: "#7C3AED" },
                { name: "PostgreSQL / MongoDB",pct: 85, color: "#1E3A5F" },
                { name: "TypeScript",         pct: 90, color: "#0891B2" },
              ].map((s, i) => (
                <div key={s.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#334155" }}>
                      {s.name}
                    </span>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.7 + i * 0.07 }}
                      style={{ fontSize: "0.72rem", fontWeight: 800, color: s.color }}
                    >
                      {s.pct}%
                    </motion.span>
                  </div>
                  <div style={{
                    height: 6, borderRadius: 999, overflow: "hidden",
                    background: `${s.color}14`,
                  }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${s.pct}%` } : { width: 0 }}
                      transition={{ duration: 1.2, delay: 0.55 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        height: "100%", borderRadius: 999,
                        background: `linear-gradient(90deg, ${s.color}CC, ${s.color})`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Bottom stat strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.85, ease }}
          className="mt-6 grid grid-cols-3 rounded-2xl overflow-hidden"
          style={{
            border: "1px solid rgba(30,58,95,0.08)",
            background: "#FFFFFF",
            boxShadow: "0 2px 12px rgba(30,58,95,0.05)",
          }}
        >
          {[
            { val: "25+", label: "Technologies", color: "#1E3A5F" },
            { val: "3+",  label: "Years Building", color: "#C9A227" },
            { val: "20+", label: "Production Apps", color: "#059669" },
          ].map((s, i) => (
            <div
              key={s.label}
              style={{
                padding: "1.25rem 1rem",
                textAlign: "center",
                borderRight: i < 2 ? "1px solid rgba(30,58,95,0.07)" : "none",
              }}
            >
              <div style={{
                fontSize: "clamp(1.35rem, 3vw, 1.75rem)", fontWeight: 900,
                background: `linear-gradient(135deg, ${s.color}, ${s.color}99)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text", lineHeight: 1,
              }}>
                {s.val}
              </div>
              <div style={{
                fontSize: "0.68rem", color: "#94A3B8",
                fontWeight: 600, letterSpacing: "0.05em",
                marginTop: "0.35rem", textTransform: "uppercase",
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

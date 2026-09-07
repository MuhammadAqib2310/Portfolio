"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const experiences = [
  {
    role: "Full Stack & AI Automation Engineer",
    company: "Freelance — Remote",
    type: "Full-Time Freelance",
    period: "2022 – Present",
    duration: "3+ yrs",
    desc: "Building production-ready SaaS platforms and AI-powered applications for clients globally. Delivered AI-driven CRM, lead-generation SaaS, and automation dashboards for clients in real estate, HR, and business sectors.",
    achievements: [
      "20+ production apps shipped for global clients",
      "AI-driven CRM reducing manual work by 70%",
      "SaaS platforms serving 500+ active users",
      "100% client satisfaction across all projects",
    ],
    tags: ["React", "Next.js", "Python", "FastAPI", "OpenAI", "PostgreSQL"],
    color: "#1E3A5F",
    accent: "#2563EB",
    icon: "🤖",
    current: true,
    featured: true,
  },
  {
    role: "AI Lead Generation SaaS",
    company: "Independent Project",
    type: "Product Build",
    period: "2025 – 2026",
    duration: "1 yr",
    desc: "Full-stack AI-powered B2B lead-generation platform with JWT auth, OpenAI-driven lead scoring, PostgreSQL/SQLAlchemy backend, and Stripe subscription billing.",
    achievements: [
      "OpenAI-driven lead scoring engine",
      "Stripe billing & subscription management",
      "JWT auth with role-based access",
      "PostgreSQL + SQLAlchemy ORM backend",
    ],
    tags: ["Next.js", "FastAPI", "Python", "PostgreSQL", "OpenAI", "Stripe"],
    color: "#C9A227",
    accent: "#92740D",
    icon: "⚡",
    current: false,
    featured: false,
  },
  {
    role: "Qanoon Bridge — Legal-Tech SaaS",
    company: "Independent Project",
    type: "Product Build",
    period: "2022 – 2026",
    duration: "4 yrs",
    desc: "Multi-tenant AI-assisted legal platform connecting citizens with verified lawyers across Pakistan using Next.js, TypeScript, and PostgreSQL.",
    achievements: [
      "Multi-tenant platform architecture",
      "AI-assisted legal document review",
      "Lawyer verification & case management",
      "Pakistan-wide citizen access portal",
    ],
    tags: ["Next.js", "React", "TypeScript", "Express.js", "PostgreSQL"],
    color: "#2563EB",
    accent: "#1D4ED8",
    icon: "⚖️",
    current: false,
    featured: false,
  },
];

const stats = [
  { val: "3+",  label: "Years Exp.",      color: "#1E3A5F" },
  { val: "20+", label: "Projects Shipped", color: "#C9A227" },
  { val: "10+", label: "Global Clients",   color: "#059669" },
  { val: "100%",label: "Satisfaction",     color: "#2563EB" },
];

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Experience() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeIdx, setActiveIdx] = useState(0);

  const active = experiences[activeIdx];

  return (
    <section
      id="experience"
      ref={ref}
      className="section-pad relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #F4F3EE 0%, #FAFAF7 100%)" }}
    >
      {/* ── BG glows ── */}
      <div className="absolute pointer-events-none rounded-full"
        style={{ width: "min(700px,90vw)", height: "min(700px,90vw)", top: "10%", right: "-18%",
          background: "radial-gradient(circle, rgba(201,162,39,0.08), transparent 65%)", filter: "blur(90px)" }} />
      <div className="absolute pointer-events-none rounded-full"
        style={{ width: "min(600px,80vw)", height: "min(600px,80vw)", bottom: "5%", left: "-15%",
          background: "radial-gradient(circle, rgba(30,58,95,0.07), transparent 65%)", filter: "blur(80px)" }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(30,58,95,0.05) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 80%)",
        }} />

      <div className="wrap relative" style={{ zIndex: 1 }}>

        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
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
            Career
          </div>
          <h2 style={{ fontSize: "clamp(2.2rem, 5vw, 3.25rem)", color: "#0F172A", lineHeight: 1.15 }}>
            Work <span className="g-text">Experience</span>
          </h2>
          <p className="mt-4 mx-auto"
            style={{ fontSize: "1rem", color: "#64748B", maxWidth: 460, lineHeight: 1.8 }}>
            3+ years building AI-powered products and scalable web applications for global clients
          </p>
        </motion.div>

        {/* ── Stat strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.15, ease }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.2 + i * 0.08, ease }}
              whileHover={{ y: -4, boxShadow: `0 12px 32px ${s.color}18` }}
              className="relative overflow-hidden rounded-2xl text-center"
              style={{
                padding: "1.25rem 1rem",
                background: "#FFFFFF",
                border: `1px solid ${s.color}18`,
                boxShadow: "0 2px 12px rgba(30,58,95,0.05)",
                transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              {/* top bar */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3,
                background: `linear-gradient(90deg, ${s.color}, transparent)` }} />
              <div style={{
                fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 900, lineHeight: 1,
                background: `linear-gradient(135deg, ${s.color}, ${s.color}88)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>{s.val}</div>
              <div style={{ fontSize: "0.68rem", color: "#94A3B8", fontWeight: 600,
                letterSpacing: "0.06em", textTransform: "uppercase", marginTop: "0.4rem" }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Main Layout: Tab nav + Detail panel ── */}
        <div className="grid lg:grid-cols-[320px_1fr] gap-6 items-start">

          {/* ── Left: vertical tab nav ── */}
          <motion.div
            initial={{ opacity: 0, x: -28 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25, ease }}
            className="flex flex-col gap-3"
          >
            {experiences.map((exp, i) => {
              const isActive = activeIdx === i;
              return (
                <motion.button
                  key={exp.role}
                  onClick={() => setActiveIdx(i)}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className="text-left relative overflow-hidden rounded-2xl"
                  style={{
                    padding: "1.1rem 1.25rem",
                    background: isActive ? "#FFFFFF" : "rgba(255,255,255,0.5)",
                    border: isActive ? `1px solid ${exp.color}35` : "1px solid rgba(30,58,95,0.08)",
                    boxShadow: isActive
                      ? `0 8px 32px ${exp.color}15, 0 2px 8px rgba(30,58,95,0.06)`
                      : "0 1px 4px rgba(30,58,95,0.04)",
                    transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
                    cursor: "none",
                  }}
                >
                  {/* active left bar */}
                  <div style={{
                    position: "absolute", top: 0, left: 0, bottom: 0, width: 3,
                    background: `linear-gradient(180deg, ${exp.color}, ${exp.accent})`,
                    opacity: isActive ? 1 : 0,
                    borderRadius: "0 2px 2px 0",
                    transition: "opacity 0.3s",
                  }} />

                  <div className="flex items-center gap-3">
                    {/* icon */}
                    <div style={{
                      width: 40, height: 40, borderRadius: "0.75rem", flexShrink: 0,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "1.1rem",
                      background: isActive ? `${exp.color}12` : "rgba(30,58,95,0.05)",
                      border: `1px solid ${isActive ? exp.color + "30" : "rgba(30,58,95,0.08)"}`,
                      transition: "all 0.3s",
                      position: "relative",
                    }}>
                      {exp.icon}
                      {exp.current && (
                        <span style={{
                          position: "absolute", top: -3, right: -3,
                          width: 10, height: 10, borderRadius: "50%",
                          background: "#059669", border: "2px solid #F4F3EE",
                          boxShadow: "0 0 8px #059669",
                          animation: "pulse-glow 2s ease-in-out infinite",
                        }} />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div style={{
                        fontSize: "0.8rem", fontWeight: 800,
                        color: isActive ? "#0F172A" : "#475569",
                        lineHeight: 1.25,
                        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                        transition: "color 0.3s",
                      }}>
                        {exp.role}
                      </div>
                      <div style={{
                        fontSize: "0.68rem", color: isActive ? exp.color : "#94A3B8",
                        fontWeight: 600, marginTop: "0.2rem",
                        transition: "color 0.3s",
                      }}>
                        {exp.period}
                      </div>
                    </div>

                    {/* duration badge */}
                    <span style={{
                      flexShrink: 0, fontSize: "0.62rem", fontWeight: 700,
                      padding: "0.2rem 0.5rem", borderRadius: "999px",
                      background: isActive ? `${exp.color}14` : "rgba(30,58,95,0.05)",
                      color: isActive ? exp.color : "#94A3B8",
                      border: `1px solid ${isActive ? exp.color + "25" : "transparent"}`,
                      transition: "all 0.3s",
                    }}>
                      {exp.duration}
                    </span>
                  </div>
                </motion.button>
              );
            })}

            {/* Education note */}
            <motion.div
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.7 }}
              style={{
                padding: "1rem 1.25rem",
                borderRadius: "1rem",
                background: "rgba(30,58,95,0.03)",
                border: "1px dashed rgba(30,58,95,0.12)",
                marginTop: "0.25rem",
              }}
            >
              <div className="flex items-center gap-2.5">
                <span style={{ fontSize: "1.1rem" }}>🎓</span>
                <div>
                  <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#334155" }}>
                    BS Computer Science
                  </div>
                  <div style={{ fontSize: "0.65rem", color: "#94A3B8", marginTop: "0.1rem" }}>
                    MNS University Multan · 2022–2026
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right: detail panel ── */}
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease }}
            className="relative overflow-hidden rounded-3xl"
            style={{
              background: "#FFFFFF",
              border: `1px solid ${active.color}28`,
              boxShadow: `0 16px 60px ${active.color}12, 0 4px 16px rgba(30,58,95,0.06)`,
            }}
          >
            {/* top accent bar */}
            <div style={{
              height: 4,
              background: `linear-gradient(90deg, ${active.color}, ${active.accent}, ${active.color}44)`,
            }} />

            {/* bg wash */}
            <div style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              background: `radial-gradient(ellipse at top right, ${active.color}06, transparent 55%)`,
            }} />

            <div style={{ padding: "2rem 2rem 2.25rem", position: "relative" }}>

              {/* header row */}
              <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                <div className="flex items-center gap-4">
                  <div style={{
                    width: 56, height: 56, borderRadius: "1rem", flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.6rem",
                    background: `${active.color}10`,
                    border: `1.5px solid ${active.color}28`,
                    boxShadow: `0 4px 16px ${active.color}18`,
                    position: "relative",
                  }}>
                    {active.icon}
                    {active.current && (
                      <span style={{
                        position: "absolute", top: -4, right: -4,
                        width: 13, height: 13, borderRadius: "50%",
                        background: "#059669", border: "2.5px solid #FFFFFF",
                        boxShadow: "0 0 10px #05966966",
                        animation: "pulse-glow 2s ease-in-out infinite",
                      }} />
                    )}
                  </div>
                  <div>
                    <h3 style={{ fontSize: "clamp(1rem, 2.5vw, 1.2rem)", fontWeight: 800, color: "#0F172A", lineHeight: 1.25 }}>
                      {active.role}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span style={{ fontSize: "0.82rem", fontWeight: 700, color: active.color }}>
                        {active.company}
                      </span>
                      <span style={{
                        fontSize: "0.62rem", padding: "0.15rem 0.55rem", borderRadius: "999px",
                        background: "rgba(30,58,95,0.06)", color: "#64748B", fontWeight: 600,
                      }}>
                        {active.type}
                      </span>
                    </div>
                  </div>
                </div>

                {/* period badges */}
                <div className="flex items-center gap-2 flex-wrap">
                  {active.current && (
                    <span style={{
                      fontSize: "0.7rem", fontWeight: 700,
                      padding: "0.3rem 0.75rem", borderRadius: "999px",
                      background: "rgba(5,150,105,0.1)", color: "#059669",
                      border: "1px solid rgba(5,150,105,0.25)",
                      display: "flex", alignItems: "center", gap: "0.35rem",
                    }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#059669",
                        display: "inline-block", animation: "pulse-glow 2s ease-in-out infinite" }} />
                      Current
                    </span>
                  )}
                  <span style={{
                    fontSize: "0.75rem", fontWeight: 700,
                    padding: "0.3rem 0.9rem", borderRadius: "999px",
                    background: `${active.color}10`, color: active.color,
                    border: `1px solid ${active.color}25`,
                  }}>
                    {active.period}
                  </span>
                  <span style={{
                    fontSize: "0.68rem", fontWeight: 700,
                    padding: "0.3rem 0.75rem", borderRadius: "999px",
                    background: "rgba(30,58,95,0.05)", color: "#94A3B8",
                    border: "1px solid rgba(30,58,95,0.08)",
                  }}>
                    {active.duration}
                  </span>
                </div>
              </div>

              {/* divider */}
              <div style={{ height: 1, background: `linear-gradient(90deg, ${active.color}20, transparent)`, marginBottom: "1.5rem" }} />

              {/* description */}
              <p style={{ fontSize: "0.9rem", color: "#475569", lineHeight: 1.85, marginBottom: "1.75rem" }}>
                {active.desc}
              </p>

              {/* two-col: achievements + tags */}
              <div className="grid sm:grid-cols-2 gap-5">

                {/* achievements */}
                <div className="rounded-2xl overflow-hidden"
                  style={{ background: `${active.color}06`, border: `1px solid ${active.color}14` }}>
                  <div style={{
                    padding: "0.75rem 1rem",
                    borderBottom: `1px solid ${active.color}12`,
                    display: "flex", alignItems: "center", gap: "0.5rem",
                  }}>
                    <div style={{ width: 3, height: 16, borderRadius: 2,
                      background: `linear-gradient(180deg, ${active.color}, ${active.accent})` }} />
                    <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "#0F172A",
                      letterSpacing: "0.06em", textTransform: "uppercase" }}>
                      Key Achievements
                    </span>
                  </div>
                  <div style={{ padding: "0.875rem 1rem", display: "flex", flexDirection: "column", gap: "0.55rem" }}>
                    {active.achievements.map((ach, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.07, duration: 0.35 }}
                        style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}
                      >
                        <span style={{
                          width: 16, height: 16, borderRadius: "50%", flexShrink: 0,
                          background: `${active.color}18`, border: `1px solid ${active.color}30`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          marginTop: "0.1rem",
                        }}>
                          <svg width="7" height="7" viewBox="0 0 8 8" fill="none">
                            <path d="M1.5 4l2 2 3-3.5" stroke={active.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                        <span style={{ fontSize: "0.78rem", color: "#475569", lineHeight: 1.55 }}>
                          {ach}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* tech stack */}
                <div className="rounded-2xl overflow-hidden"
                  style={{ background: "rgba(30,58,95,0.03)", border: "1px solid rgba(30,58,95,0.08)" }}>
                  <div style={{
                    padding: "0.75rem 1rem",
                    borderBottom: "1px solid rgba(30,58,95,0.07)",
                    display: "flex", alignItems: "center", gap: "0.5rem",
                  }}>
                    <div style={{ width: 3, height: 16, borderRadius: 2,
                      background: "linear-gradient(180deg, #C9A227, #1E3A5F)" }} />
                    <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "#0F172A",
                      letterSpacing: "0.06em", textTransform: "uppercase" }}>
                      Tech Used
                    </span>
                  </div>
                  <div style={{ padding: "0.875rem 1rem", display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
                    {active.tags.map((t, i) => (
                      <motion.span
                        key={t}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.06, duration: 0.3 }}
                        style={{
                          fontSize: "0.72rem", fontWeight: 700,
                          padding: "0.3rem 0.7rem", borderRadius: "0.5rem",
                          background: `${active.color}0E`,
                          border: `1px solid ${active.color}22`,
                          color: active.color,
                        }}
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.85, duration: 0.5 }}
          className="text-center mt-14"
        >
          <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(201,162,39,0.3), transparent)", marginBottom: "2.5rem" }} />
          <p style={{ fontSize: "0.875rem", color: "#64748B", marginBottom: "1.25rem" }}>
            Interested in working together on your next project?
          </p>
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: "0 8px 40px rgba(30,58,95,0.3)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 font-bold text-sm text-white rounded-2xl"
            style={{
              padding: "0.9rem 2.25rem",
              background: "linear-gradient(135deg, #1E3A5F, #2563EB)",
              boxShadow: "0 4px 24px rgba(30,58,95,0.25)",
              border: "none", cursor: "none",
            }}
          >
            Get In Touch
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
}

"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skills = [
  { name: "React.js & Next.js",   pct: 92, color: "#1E3A5F", icon: "⚛️" },
  { name: "Python & FastAPI",      pct: 90, color: "#C9A227", icon: "🐍" },
  { name: "Node.js & Express",     pct: 88, color: "#2563EB", icon: "🟢" },
  { name: "AI Integration",        pct: 92, color: "#059669", icon: "🤖" },
  { name: "PostgreSQL & MongoDB",  pct: 85, color: "#7C3AED", icon: "🗄️" },
  { name: "TypeScript / JS",       pct: 90, color: "#DC2626", icon: "📘" },
];

const highlights = [
  { icon: "🎯", title: "Problem Solver",  sub: "First-principles thinking",   color: "#1E3A5F" },
  { icon: "🚀", title: "Ships Fast",      sub: "MVP to production in weeks",  color: "#C9A227" },
  { icon: "🧠", title: "AI Native",       sub: "LLMs, Agents, Automation",    color: "#2563EB" },
  { icon: "⚡", title: "Performance",     sub: "99%+ uptime, sub-100ms",      color: "#059669" },
];

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function About() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      ref={ref}
      className="section-pad relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #FAFAF7 0%, #F4F3EE 100%)" }}
    >
      {/* BG glows */}
      <div className="absolute pointer-events-none rounded-full"
        style={{ width: 600, height: 600, top: "-15%", right: "-12%",
          background: "radial-gradient(circle, rgba(201,162,39,0.09), transparent 65%)", filter: "blur(90px)" }} />
      <div className="absolute pointer-events-none rounded-full"
        style={{ width: 500, height: 500, bottom: "-10%", left: "-10%",
          background: "radial-gradient(circle, rgba(30,58,95,0.07), transparent 65%)", filter: "blur(80px)" }} />

      <div className="wrap">

        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4"
            style={{ padding: "0.35rem 1.1rem", borderRadius: "999px",
              background: "rgba(201,162,39,0.1)", border: "1px solid rgba(201,162,39,0.25)",
              fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.18em",
              textTransform: "uppercase", color: "#92740D" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#C9A227",
              display: "inline-block", animation: "pulse-glow 2s ease-in-out infinite" }} />
            About Me
          </div>
          <h2 style={{ fontSize: "clamp(2.2rem, 5vw, 3.25rem)", color: "#0F172A", lineHeight: 1.15 }}>
            Crafting{" "}
            <span className="g-text">Intelligent</span>{" "}
            Solutions
          </h2>
          <p className="mt-4 mx-auto" style={{ fontSize: "1rem", color: "#64748B", maxWidth: 520, lineHeight: 1.8 }}>
            Where cutting-edge AI meets elegant engineering — building systems that scale and deliver real business value.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-start">

          {/* ── Left ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1, ease }}
          >
            {/* Bio text */}
            <div className="mb-10 p-6 rounded-2xl" style={{ background: "#FFFFFF", border: "1px solid rgba(30,58,95,0.08)", boxShadow: "0 4px 24px rgba(30,58,95,0.06)" }}>
              <p className="text-base leading-relaxed mb-4" style={{ color: "#334155" }}>
                I&apos;m{" "}
                <strong style={{ color: "#0F172A", fontWeight: 700 }}>Muhammad Aqib</strong>
                , a Full Stack &amp; AI Engineer skilled in React, Next.js, Node.js, Python, and Java,
                with hands-on experience building production-ready SaaS platforms and AI-powered applications.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>
                Proficient in integrating AI tools like Claude and Gemini APIs and designing scalable
                backend systems with PostgreSQL. Delivered projects including AI-driven CRM, lead-generation SaaS,
                and automation dashboards for real estate, HR, and business clients.
                Currently pursuing a <strong style={{ color: "#1E3A5F" }}>BS in Computer Science</strong> at{" "}
                <strong style={{ color: "#C9A227" }}>MNS University of Agriculture Multan</strong> (2022–2026).
              </p>
            </div>

            {/* Highlight cards */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {highlights.map(({ icon, title, sub, color }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease }}
                  whileHover={{ y: -5, boxShadow: `0 12px 32px ${color}18` }}
                  className="relative overflow-hidden cursor-default rounded-2xl"
                  style={{ padding: "1.25rem", background: "#FFFFFF",
                    border: `1px solid ${color}18`,
                    boxShadow: "0 2px 12px rgba(30,58,95,0.05)",
                    transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)" }}
                >
                  {/* Top color strip */}
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px",
                    background: `linear-gradient(90deg, ${color}, transparent)` }} />
                  {/* Icon circle */}
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-3"
                    style={{ background: `${color}12`, border: `1px solid ${color}22` }}>
                    {icon}
                  </div>
                  <div className="font-bold text-sm mb-1" style={{ color: "#0F172A" }}>{title}</div>
                  <div className="text-xs" style={{ color: "#94A3B8" }}>{sub}</div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.a
              href="/resume.pdf"
              download
              whileHover={{ scale: 1.03, boxShadow: "0 8px 32px rgba(30,58,95,0.3)" }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 font-bold text-sm text-white rounded-2xl"
              style={{ padding: "0.9rem 2rem",
                background: "linear-gradient(135deg, #1E3A5F 0%, #2563EB 100%)",
                boxShadow: "0 4px 20px rgba(30,58,95,0.25)" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download Resume
            </motion.a>
          </motion.div>

          {/* ── Right — Skill bars ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2, ease }}
          >
            <div className="rounded-3xl overflow-hidden"
              style={{ background: "#FFFFFF", border: "1px solid rgba(30,58,95,0.08)",
                boxShadow: "0 8px 40px rgba(30,58,95,0.08)" }}>

              {/* Card header */}
              <div style={{ padding: "1.5rem 1.75rem", borderBottom: "1px solid rgba(30,58,95,0.07)",
                background: "linear-gradient(135deg, rgba(201,162,39,0.05), rgba(30,58,95,0.03))" }}>
                <div className="flex items-center gap-3">
                  <div className="w-1 h-7 rounded-full" style={{ background: "linear-gradient(180deg, #C9A227, #1E3A5F)" }} />
                  <div>
                    <h3 className="font-bold text-base" style={{ color: "#0F172A" }}>Core Competencies</h3>
                    <p className="text-xs mt-0.5" style={{ color: "#94A3B8" }}>Technical expertise & proficiency levels</p>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div style={{ padding: "1.5rem 1.75rem" }}>
                <div className="space-y-5">
                  {skills.map((s, i) => (
                    <motion.div
                      key={s.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.4 + i * 0.08, duration: 0.5, ease }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span style={{ fontSize: "1rem" }}>{s.icon}</span>
                          <span className="text-sm font-semibold" style={{ color: "#334155" }}>{s.name}</span>
                        </div>
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={inView ? { opacity: 1 } : {}}
                          transition={{ delay: 0.6 + i * 0.08 }}
                          className="text-xs font-black"
                          style={{ color: s.color }}
                        >
                          {s.pct}%
                        </motion.span>
                      </div>

                      {/* Track */}
                      <div className="relative h-2.5 rounded-full overflow-hidden"
                        style={{ background: `${s.color}12` }}>
                        {/* Fill */}
                        <motion.div
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${s.pct}%` } : { width: 0 }}
                          transition={{ duration: 1.3, delay: 0.45 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute top-0 left-0 h-full rounded-full"
                          style={{ background: `linear-gradient(90deg, ${s.color}CC, ${s.color})` }}
                        />
                        {/* Shimmer */}
                        <motion.div
                          initial={{ left: "-20%" }}
                          animate={inView ? { left: ["−20%", "120%"] } : {}}
                          transition={{ duration: 1.5, delay: 0.8 + i * 0.1, ease: "easeInOut" }}
                          className="absolute top-0 h-full w-12 rounded-full"
                          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)" }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Footer note */}
                <div className="mt-6 pt-5" style={{ borderTop: "1px solid rgba(30,58,95,0.07)" }}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: "#94A3B8" }}>Based on 2+ years of hands-on experience</span>
                    <div className="flex items-center gap-1.5">
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#059669",
                        boxShadow: "0 0 6px #059669", display: "inline-block",
                        animation: "pulse-glow 2s ease-in-out infinite" }} />
                      <span className="text-xs font-bold" style={{ color: "#059669" }}>Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

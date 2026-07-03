"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const experiences = [
  {
    role: "Senior AI Engineer & Full Stack Developer",
    company: "Freelance / Self-Employed",
    period: "2024 – Present",
    duration: "2+ yrs",
    desc: "Building production AI agents, SaaS platforms, and automation systems for startups and enterprises globally. Delivered 50+ projects with 99%+ client satisfaction.",
    tags: ["AI Agents", "LangChain", "Next.js", "Python", "OpenAI"],
    color: "#2563EB",
    icon: "🤖",
    current: true,
  },
  {
    role: "AI & Automation Specialist",
    company: "Tech Consultancy",
    period: "2023 – 2024",
    duration: "1 yr",
    desc: "Designed and deployed intelligent workflow automation systems that reduced client operational costs by 45%. Integrated cutting-edge LLMs into existing enterprise software.",
    tags: ["LLM Integration", "FastAPI", "React", "AWS", "Docker"],
    color: "#38BDF8",
    icon: "⚡",
    current: false,
  },
  {
    role: "Full Stack Developer",
    company: "SaaS Startup",
    period: "2022 – 2023",
    duration: "1 yr",
    desc: "Developed multi-tenant SaaS applications with real-time features using React and Node.js. Architected databases and APIs serving 10K+ daily active users.",
    tags: ["React", "Node.js", "PostgreSQL", "Redis", "Stripe"],
    color: "#6366F1",
    icon: "🚀",
    current: false,
  },
];

export default function Experience() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="experience"
      ref={ref}
      className="section-pad relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #162032 0%, #1E293B 100%)" }}
    >
      {/* BG glow */}
      <div className="absolute pointer-events-none rounded-full"
        style={{ width: 500, height: 500, top: "30%", right: "-12%",
          background: "radial-gradient(circle, rgba(99,102,241,0.08), transparent 65%)",
          filter: "blur(80px)" }} />
      <div className="absolute pointer-events-none rounded-full"
        style={{ width: 400, height: 400, bottom: "10%", left: "-10%",
          background: "radial-gradient(circle, rgba(37,99,235,0.07), transparent 65%)",
          filter: "blur(70px)" }} />

      <div className="wrap">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="text-center mb-16"
        >
          <span className="sec-label" style={{ color: "#6366F1" }}>Career</span>
          <h2 style={{ fontSize: "clamp(2rem,5vw,3rem)", color: "#fff" }}>
            Work <span className="g-text">Experience</span>
          </h2>
          <p className="text-sm mt-3 mx-auto" style={{ color: "#64748B", maxWidth: 400 }}>
            4+ years building AI-powered products and scalable web applications
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto">
          <div className="relative">

            {/* Vertical line */}
            <div
              className="hidden sm:block absolute top-0 bottom-0"
              style={{
                left: "19px",
                width: "2px",
                background: "linear-gradient(to bottom, #2563EB, #38BDF8, #6366F1, transparent)",
                borderRadius: "1px",
              }}
            />

            <div className="space-y-6">
              {experiences.map((exp, i) => (
                <motion.div
                  key={exp.role}
                  initial={{ opacity: 0, x: -32 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                  className="flex gap-5 sm:gap-7"
                >
                  {/* Icon dot */}
                  <div className="hidden sm:flex flex-col items-center flex-shrink-0">
                    <motion.div
                      whileHover={{ scale: 1.18 }}
                      className="w-10 h-10 rounded-2xl flex items-center justify-center text-lg flex-shrink-0 relative"
                      style={{
                        background: `${exp.color}20`,
                        border: `2px solid ${exp.color}55`,
                        boxShadow: exp.current ? `0 0 20px ${exp.color}40` : "none",
                      }}
                    >
                      {exp.icon}
                      {/* Pulse for current job */}
                      {exp.current && (
                        <span
                          className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2"
                          style={{
                            background: "#22C55E",
                            borderColor: "#162032",
                            boxShadow: "0 0 8px #22C55E",
                            animation: "pulse-glow 2s ease-in-out infinite",
                          }}
                        />
                      )}
                    </motion.div>
                  </div>

                  {/* Card */}
                  <motion.div
                    whileHover={{
                      borderColor: `${exp.color}50`,
                      boxShadow: `0 20px 60px ${exp.color}15`,
                    }}
                    className="flex-1 rounded-3xl transition-all duration-300 overflow-hidden"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    {/* Top color strip */}
                    <div
                      style={{
                        height: "3px",
                        background: `linear-gradient(90deg, ${exp.color}, transparent)`,
                        opacity: 0.7,
                      }}
                    />

                    <div style={{ padding: "1.25rem 1.5rem" }}>
                      {/* Mobile: icon + period */}
                      <div className="flex items-center gap-3 mb-3 sm:hidden">
                        <div
                          className="w-8 h-8 rounded-xl flex items-center justify-center text-sm relative"
                          style={{ background: `${exp.color}20`, border: `1.5px solid ${exp.color}50` }}
                        >
                          {exp.icon}
                          {exp.current && (
                            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border-2"
                              style={{ background: "#22C55E", borderColor: "#162032" }} />
                          )}
                        </div>
                        <span
                          className="text-xs font-bold px-3 py-1 rounded-full"
                          style={{ background: `${exp.color}18`, color: exp.color }}
                        >
                          {exp.period}
                        </span>
                      </div>

                      {/* Header row */}
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
                        <div className="flex-1 min-w-0">
                          <h3
                            className="font-bold truncate"
                            style={{ fontSize: "clamp(0.9rem, 2vw, 1.05rem)", color: "#fff" }}
                          >
                            {exp.role}
                          </h3>
                        </div>

                        {/* Desktop period badge */}
                        <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
                          {exp.current && (
                            <span
                              className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                              style={{ background: "rgba(34,197,94,0.15)", color: "#22C55E", border: "1px solid rgba(34,197,94,0.3)" }}
                            >
                              Current
                            </span>
                          )}
                          <span
                            className="text-xs font-bold px-3 py-1.5 rounded-xl"
                            style={{ background: `${exp.color}15`, color: exp.color, border: `1px solid ${exp.color}30` }}
                          >
                            {exp.period}
                          </span>
                          <span
                            className="text-[10px] font-semibold px-2 py-1 rounded-lg"
                            style={{ background: "rgba(255,255,255,0.05)", color: "#64748B" }}
                          >
                            {exp.duration}
                          </span>
                        </div>
                      </div>

                      {/* Company */}
                      <p
                        className="font-bold mb-3 text-sm"
                        style={{ color: exp.color }}
                      >
                        {exp.company}
                      </p>

                      {/* Description */}
                      <p
                        className="text-sm leading-relaxed mb-4"
                        style={{ color: "#94A3B8" }}
                      >
                        {exp.desc}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {exp.tags.map(t => (
                          <span
                            key={t}
                            className="text-[11px] font-semibold"
                            style={{
                              padding: "0.25rem 0.625rem",
                              borderRadius: "0.5rem",
                              background: "rgba(255,255,255,0.05)",
                              color: "#94A3B8",
                              border: "1px solid rgba(255,255,255,0.08)",
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Bottom year label */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="hidden sm:flex items-center gap-3 mt-6"
              style={{ paddingLeft: "0px" }}
            >
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-black flex-shrink-0"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#64748B" }}
              >
                🎓
              </div>
              <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
              <span className="text-xs font-bold px-3 py-1.5 rounded-xl" style={{ background: "rgba(255,255,255,0.05)", color: "#64748B" }}>
                Started 2022
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

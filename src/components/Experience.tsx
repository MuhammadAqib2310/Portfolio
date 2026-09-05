"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const experiences = [
  {
    role: "Full Stack & AI Automation Engineer",
    company: "Freelance — Remote",
    period: "2022 – Present",
    duration: "3+ yrs",
    desc: "Building production-ready SaaS platforms and AI-powered applications for clients globally. Delivered projects including AI-driven CRM, lead-generation SaaS, and automation dashboards for clients in real estate, HR, and business sectors.",
    tags: ["React", "Next.js", "Python", "FastAPI", "OpenAI", "PostgreSQL"],
    color: "#1E3A5F",
    icon: "🤖",
    current: true,
  },
  {
    role: "AI Lead Generation SaaS — Developer",
    company: "Independent Project",
    period: "2025 – 2026",
    duration: "1 yr",
    desc: "Built a full-stack, AI-powered B2B lead-generation platform using Python (FastAPI) and Next.js, featuring JWT authentication, PostgreSQL/SQLAlchemy backend, OpenAI-driven lead scoring, and Stripe-integrated subscription billing.",
    tags: ["Next.js", "FastAPI", "Python", "PostgreSQL", "OpenAI", "Stripe"],
    color: "#C9A227",
    icon: "⚡",
    current: false,
  },
  {
    role: "Qanoon Bridge — Legal-Tech SaaS",
    company: "Independent Project",
    period: "2022 – 2026",
    duration: "4 yrs",
    desc: "Built a multi-tenant, AI-assisted legal platform connecting citizens with verified lawyers across Pakistan, using Next.js, React, TypeScript, and Express.js with PostgreSQL.",
    tags: ["Next.js", "React", "TypeScript", "Express.js", "PostgreSQL"],
    color: "#2563EB",
    icon: "⚖️",
    current: false,
  },
];

export default function Experience() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" ref={ref} className="section-pad relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #F4F3EE 0%, #FAFAF7 100%)" }}>
      <div className="absolute pointer-events-none rounded-full"
        style={{ width: 500, height: 500, top: "30%", right: "-12%",
          background: "radial-gradient(circle, rgba(201,162,39,0.07), transparent 65%)", filter: "blur(80px)" }} />
      <div className="absolute pointer-events-none rounded-full"
        style={{ width: 400, height: 400, bottom: "10%", left: "-10%",
          background: "radial-gradient(circle, rgba(30,58,95,0.06), transparent 65%)", filter: "blur(70px)" }} />

      <div className="wrap">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }} className="text-center mb-16">
          <span className="sec-label" style={{ color: "#C9A227" }}>Career</span>
          <h2 style={{ fontSize: "clamp(2rem,5vw,3rem)", color: "#0F172A" }}>
            Work <span className="g-text">Experience</span>
          </h2>
          <p className="text-sm mt-3 mx-auto" style={{ color: "#475569", maxWidth: 400 }}>
            3+ years building AI-powered products and scalable web applications
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <div className="hidden sm:block absolute top-0 bottom-0"
              style={{ left: "19px", width: "2px",
                background: "linear-gradient(to bottom, #C9A227, #1E3A5F, #2563EB, transparent)", borderRadius: "1px" }} />

            <div className="space-y-6">
              {experiences.map((exp, i) => (
                <motion.div key={exp.role}
                  initial={{ opacity: 0, x: -32 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                  className="flex gap-5 sm:gap-7"
                >
                  <div className="hidden sm:flex flex-col items-center flex-shrink-0">
                    <motion.div whileHover={{ scale: 1.18 }}
                      className="w-10 h-10 rounded-2xl flex items-center justify-center text-lg flex-shrink-0 relative"
                      style={{ background: `${exp.color}15`, border: `2px solid ${exp.color}40`,
                        boxShadow: exp.current ? `0 0 20px ${exp.color}30` : "none" }}>
                      {exp.icon}
                      {exp.current && (
                        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2"
                          style={{ background: "#059669", borderColor: "#FAFAF7", boxShadow: "0 0 8px #059669",
                            animation: "pulse-glow 2s ease-in-out infinite" }} />
                      )}
                    </motion.div>
                  </div>

                  <motion.div whileHover={{ borderColor: `${exp.color}40`, boxShadow: `0 20px 60px ${exp.color}10` }}
                    className="flex-1 rounded-3xl transition-all duration-300 overflow-hidden"
                    style={{ background: "#FFFFFF", border: "1px solid rgba(30,58,95,0.08)", boxShadow: "0 2px 12px rgba(30,58,95,0.05)" }}>
                    <div style={{ height: "3px", background: `linear-gradient(90deg, ${exp.color}, transparent)`, opacity: 0.7 }} />
                    <div style={{ padding: "1.25rem 1.5rem" }}>
                      <div className="flex items-center gap-3 mb-3 sm:hidden">
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm relative"
                          style={{ background: `${exp.color}15`, border: `1.5px solid ${exp.color}40` }}>
                          {exp.icon}
                          {exp.current && (
                            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border-2"
                              style={{ background: "#059669", borderColor: "#FAFAF7" }} />
                          )}
                        </div>
                        <span className="text-xs font-bold px-3 py-1 rounded-full"
                          style={{ background: `${exp.color}12`, color: exp.color }}>{exp.period}</span>
                      </div>

                      <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold truncate" style={{ fontSize: "clamp(0.9rem, 2vw, 1.05rem)", color: "#0F172A" }}>
                            {exp.role}
                          </h3>
                        </div>
                        <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
                          {exp.current && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                              style={{ background: "rgba(5,150,105,0.1)", color: "#059669", border: "1px solid rgba(5,150,105,0.25)" }}>
                              Current
                            </span>
                          )}
                          <span className="text-xs font-bold px-3 py-1.5 rounded-xl"
                            style={{ background: `${exp.color}10`, color: exp.color, border: `1px solid ${exp.color}25` }}>
                            {exp.period}
                          </span>
                          <span className="text-[10px] font-semibold px-2 py-1 rounded-lg"
                            style={{ background: "rgba(30,58,95,0.05)", color: "#94A3B8" }}>
                            {exp.duration}
                          </span>
                        </div>
                      </div>

                      <p className="font-bold mb-3 text-sm" style={{ color: exp.color }}>{exp.company}</p>
                      <p className="text-sm leading-relaxed mb-4" style={{ color: "#475569" }}>{exp.desc}</p>

                      <div className="flex flex-wrap gap-2">
                        {exp.tags.map(t => (
                          <span key={t} className="text-[11px] font-semibold"
                            style={{ padding: "0.25rem 0.625rem", borderRadius: "0.5rem",
                              background: "rgba(30,58,95,0.05)", color: "#475569", border: "1px solid rgba(30,58,95,0.08)" }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.8 }}
              className="hidden sm:flex items-center gap-3 mt-6">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-black flex-shrink-0"
                style={{ background: "rgba(30,58,95,0.05)", border: "1px solid rgba(30,58,95,0.08)", color: "#94A3B8" }}>
                🎓
              </div>
              <div className="flex-1 h-px" style={{ background: "rgba(30,58,95,0.08)" }} />
              <span className="text-xs font-bold px-3 py-1.5 rounded-xl"
                style={{ background: "rgba(30,58,95,0.05)", color: "#94A3B8" }}>
                Started 2021
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

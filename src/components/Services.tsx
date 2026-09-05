"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { services } from "@/lib/utils";

const serviceAccents = [
  { color: "#1E3A5F", bg: "#EEF2FF", tag: "AI & ML" },
  { color: "#C9A227", bg: "#FFFBEB", tag: "Automation" },
  { color: "#059669", bg: "#ECFDF5", tag: "Full Stack" },
  { color: "#7C3AED", bg: "#F5F3FF", tag: "LLM" },
  { color: "#0891B2", bg: "#ECFEFF", tag: "Voice AI" },
  { color: "#DC2626", bg: "#FEF2F2", tag: "Data" },
];

export default function Services() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="services"
      ref={ref}
      className="section-pad relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #F4F3EE 0%, #FAFAF7 100%)" }}
    >
      {/* BG glows */}
      <div className="absolute pointer-events-none rounded-full"
        style={{ width: 700, height: 700, bottom: "-20%", left: "-15%",
          background: "radial-gradient(circle, rgba(30,58,95,0.06), transparent 65%)", filter: "blur(90px)" }} />
      <div className="absolute pointer-events-none rounded-full"
        style={{ width: 500, height: 500, top: "-10%", right: "-5%",
          background: "radial-gradient(circle, rgba(201,162,39,0.07), transparent 65%)", filter: "blur(80px)" }} />

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(rgba(30,58,95,0.05) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 80%)" }} />

      <div className="wrap">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4"
            style={{ padding: "0.35rem 1.1rem", borderRadius: "999px",
              background: "rgba(201,162,39,0.1)", border: "1px solid rgba(201,162,39,0.25)",
              fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.18em",
              textTransform: "uppercase", color: "#92740D" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#C9A227",
              display: "inline-block", animation: "pulse-glow 2s ease-in-out infinite" }} />
            What I Do
          </div>
          <h2 style={{ fontSize: "clamp(2.2rem, 5vw, 3.25rem)", color: "#0F172A", lineHeight: 1.15 }}>
            AI-Powered <span className="g-text">Services</span>
          </h2>
          <p className="mt-4 mx-auto" style={{ fontSize: "1rem", color: "#64748B", maxWidth: 500, lineHeight: 1.8 }}>
            End-to-end solutions — from intelligent autonomous agents to production-grade SaaS platforms
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => {
            const acc = serviceAccents[i % serviceAccents.length];
            const isHov = hovered === i;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.09, ease: "easeOut" }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  position: "relative", overflow: "hidden",
                  borderRadius: "1.5rem",
                  padding: "1.75rem",
                  background: "#FFFFFF",
                  border: isHov ? `1px solid ${acc.color}30` : "1px solid rgba(30,58,95,0.08)",
                  boxShadow: isHov
                    ? `0 16px 48px rgba(30,58,95,0.1), 0 4px 16px ${acc.color}15`
                    : "0 2px 12px rgba(30,58,95,0.05)",
                  transform: isHov ? "translateY(-6px)" : "translateY(0)",
                  transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
                  cursor: "default",
                }}
              >
                {/* Top accent line */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: "3px",
                  background: `linear-gradient(90deg, ${acc.color}, ${acc.color}44)`,
                  opacity: isHov ? 1 : 0.5,
                  transition: "opacity 0.35s",
                }} />

                {/* BG tint on hover */}
                <div style={{
                  position: "absolute", inset: 0, borderRadius: "inherit",
                  background: `radial-gradient(ellipse at top left, ${acc.color}06, transparent 65%)`,
                  opacity: isHov ? 1 : 0,
                  transition: "opacity 0.35s",
                  pointerEvents: "none",
                }} />

                {/* Icon */}
                <div style={{
                  position: "relative",
                  width: 52, height: 52, borderRadius: "1rem",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.6rem", marginBottom: "1.25rem",
                  background: acc.bg,
                  border: `1px solid ${acc.color}20`,
                  boxShadow: isHov ? `0 4px 16px ${acc.color}20` : "none",
                  transition: "box-shadow 0.35s",
                  transform: isHov ? "scale(1.08)" : "scale(1)",
                  transitionProperty: "box-shadow, transform",
                }}>
                  {s.icon}
                </div>

                {/* Tag */}
                <div style={{
                  position: "absolute", top: "1.25rem", right: "1.25rem",
                  padding: "0.2rem 0.6rem", borderRadius: "999px",
                  background: acc.bg, border: `1px solid ${acc.color}20`,
                  fontSize: "0.6rem", fontWeight: 700, color: acc.color,
                  letterSpacing: "0.08em",
                }}>
                  {acc.tag}
                </div>

                <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.625rem", lineHeight: 1.3 }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: "0.84rem", color: "#64748B", lineHeight: 1.75, marginBottom: "1.25rem" }}>
                  {s.desc}
                </p>

                {/* Learn more link */}
                <div style={{
                  display: "flex", alignItems: "center", gap: "0.4rem",
                  fontSize: "0.78rem", fontWeight: 700,
                  color: isHov ? acc.color : "#94A3B8",
                  transition: "color 0.25s",
                }}>
                  Learn more
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none"
                    style={{ transform: isHov ? "translateX(3px)" : "translateX(0)", transition: "transform 0.25s" }}>
                    <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center mt-14"
        >
          <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(201,162,39,0.3), transparent)", marginBottom: "2.5rem" }} />
          <p style={{ fontSize: "0.875rem", color: "#64748B", marginBottom: "1.25rem" }}>
            Need something custom? Let&apos;s discuss your exact requirements.
          </p>
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: "0 8px 40px rgba(201,162,39,0.3)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 font-bold text-sm rounded-2xl"
            style={{
              padding: "0.875rem 2.25rem",
              background: "linear-gradient(135deg, #C9A227, #92740D)",
              color: "#fff",
              boxShadow: "0 4px 20px rgba(201,162,39,0.3)",
              border: "none", cursor: "none",
            }}
          >
            Discuss Your Project
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

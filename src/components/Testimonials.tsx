"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import CountUp from "@/components/CountUp";

const stats = [
  { end: 20,  suffix: "+", label: "Projects Completed", icon: "🚀" },
  { end: 3,   suffix: "+", label: "Years Experience",   icon: "📅" },
  { end: 100, suffix: "%", label: "Client Satisfaction", icon: "⭐" },
  { end: 8,   suffix: "+", label: "Countries Served",   icon: "🌍" },
];

const platforms = [
  { name: "Upwork",   icon: "💼", color: "#14a800", desc: "Top Rated Profile" },
  { name: "GitHub",   icon: "🐙", color: "#1E3A5F", desc: "Open Source Projects", href: "https://github.com/MuhammadAqib2310" },
  { name: "LinkedIn", icon: "💼", color: "#0A66C2", desc: "Professional Network", href: "https://linkedin.com/in/muhammad-aqib-dev" },
  { name: "WhatsApp", icon: "💬", color: "#25D366", desc: "Direct Contact", href: `https://wa.me/923375013984` },
];

export default function Testimonials() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="testimonials" ref={ref} className="section-pad relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #F4F3EE 0%, #FAFAF7 100%)" }}>

      {/* BG glow */}
      <div className="absolute pointer-events-none rounded-full"
        style={{ width: 600, height: 300, top: "20%", left: "50%", transform: "translateX(-50%)",
          background: "radial-gradient(ellipse, rgba(201,162,39,0.07), transparent 65%)", filter: "blur(70px)" }} />

      <div className="wrap">

        {/* Heading */}
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-4"
            style={{ padding: "0.35rem 1.1rem", borderRadius: "999px",
              background: "rgba(201,162,39,0.1)", border: "1px solid rgba(201,162,39,0.25)",
              fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.18em",
              textTransform: "uppercase", color: "#92740D" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#C9A227",
              display: "inline-block", animation: "pulse-glow 2s ease-in-out infinite" }} />
            By The Numbers
          </div>
          <h2 style={{ fontSize: "clamp(2.2rem, 5vw, 3.25rem)", color: "#0F172A", lineHeight: 1.15 }}>
            Track Record & <span className="g-text">Presence</span>
          </h2>
          <p className="mt-4 mx-auto" style={{ fontSize: "1rem", color: "#64748B", maxWidth: 480, lineHeight: 1.8 }}>
            Real numbers from real work — no fake reviews, just results
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
          {stats.map(({ end, suffix, label, icon }, i) => (
            <motion.div key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.08 }}
              whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(201,162,39,0.12)" }}
              className="text-center rounded-2xl transition-all duration-300"
              style={{ padding: "1.75rem 1rem", background: "#FFFFFF",
                border: "1px solid rgba(201,162,39,0.15)",
                boxShadow: "0 2px 12px rgba(30,58,95,0.05)" }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{icon}</div>
              <div className="font-extrabold g-text" style={{ fontSize: "clamp(1.8rem,4vw,2.5rem)", lineHeight: 1 }}>
                <CountUp end={end} suffix={suffix} duration={2000} />
              </div>
              <div style={{ fontSize: "0.7rem", color: "#94A3B8", marginTop: "0.4rem", fontWeight: 600, letterSpacing: "0.05em" }}>
                {label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Connect platforms */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35 }}>
          <p style={{ textAlign: "center", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em",
            textTransform: "uppercase", color: "#94A3B8", marginBottom: "1rem" }}>
            Find Me On
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {platforms.map((p, i) => (
              <motion.a
                key={p.name}
                href={p.href ?? "#"}
                target={p.href ? "_blank" : undefined}
                rel={p.href ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.07 }}
                whileHover={{ y: -4, borderColor: `${p.color}35`, boxShadow: `0 12px 32px ${p.color}15` }}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem",
                  padding: "1.5rem 1rem", borderRadius: "1.25rem", background: "#FFFFFF",
                  border: "1px solid rgba(30,58,95,0.08)", textDecoration: "none",
                  boxShadow: "0 2px 8px rgba(30,58,95,0.05)",
                  transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)" }}>
                <span style={{ fontSize: "1.75rem" }}>{p.icon}</span>
                <span style={{ fontSize: "0.9rem", fontWeight: 800, color: "#0F172A" }}>{p.name}</span>
                <span style={{ fontSize: "0.72rem", color: "#94A3B8", fontWeight: 500 }}>{p.desc}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Bottom note */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center mt-12"
          style={{ padding: "1.5rem", borderRadius: "1.25rem",
            background: "rgba(30,58,95,0.04)", border: "1px solid rgba(30,58,95,0.08)" }}>
          <p style={{ fontSize: "0.85rem", color: "#475569", lineHeight: 1.7 }}>
            💬 <strong style={{ color: "#0F172A" }}>Real client reviews</strong> will be added as projects grow.
            For now, check out my{" "}
            <a href="https://github.com/MuhammadAqib2310" target="_blank" rel="noopener noreferrer"
              style={{ color: "#1E3A5F", fontWeight: 700, textDecoration: "none" }}>GitHub</a>
            {" "}or{" "}
            <a href="https://linkedin.com/in/muhammad-aqib-dev" target="_blank" rel="noopener noreferrer"
              style={{ color: "#C9A227", fontWeight: 700, textDecoration: "none" }}>LinkedIn</a>
            {" "}to see my work.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

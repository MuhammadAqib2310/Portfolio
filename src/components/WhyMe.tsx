"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import CountUp from "@/components/CountUp";

const reasons = [
  { icon: "⚡", title: "Fast Delivery",          desc: "Most projects ship within 2–4 weeks. No endless delays, no excuses — just results.",                                          color: "#C9A227" },
  { icon: "🎯", title: "Production-Ready Code",  desc: "Clean, documented, scalable architecture. Not prototypes — real systems built to handle millions of users.",               color: "#1E3A5F" },
  { icon: "🤖", title: "AI-First Thinking",       desc: "I don't just add AI as a feature — I architect solutions where AI creates your core competitive advantage.",              color: "#2563EB" },
  { icon: "🔒", title: "Fixed Price Guarantee",  desc: "No surprise invoices. Scope agreed upfront, price locked in. You always know exactly what you're paying.",                color: "#059669" },
  { icon: "📞", title: "Direct Communication",   desc: "You talk directly to me — the engineer — not a project manager. Fast decisions, zero miscommunication.",                  color: "#92740D" },
  { icon: "🔄", title: "30-Day Support",          desc: "Every project includes 30 days of free post-launch support. I don't disappear after delivery.",                          color: "#DC2626" },
];

const stats = [
  { end: 20,  suffix: "+", label: "Projects Shipped" },
  { end: 2,   suffix: "+", label: "Years Exp." },
  { end: 100, suffix: "%", label: "Satisfaction" },
  { end: 8,   suffix: "+", label: "Countries Served" },
];

export default function WhyMe() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="why-me" ref={ref} className="section-pad relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #FAFAF7 0%, #F4F3EE 100%)" }}>
      <div className="absolute pointer-events-none rounded-full"
        style={{ width: 500, height: 500, top: 0, right: "-10%",
          background: "radial-gradient(circle, rgba(201,162,39,0.07), transparent 65%)", filter: "blur(80px)" }} />
      <div className="absolute pointer-events-none rounded-full"
        style={{ width: 400, height: 400, bottom: 0, left: "-8%",
          background: "radial-gradient(circle, rgba(30,58,95,0.05), transparent 65%)", filter: "blur(70px)" }} />

      <div className="wrap">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }} className="text-center mb-16">
          <span className="sec-label" style={{ color: "#C9A227" }}>Why Work With Me</span>
          <h2 style={{ fontSize: "clamp(2rem,5vw,3rem)", color: "#0F172A" }}>
            The <span className="g-text-2">Difference</span> You Feel
          </h2>
          <p className="text-sm sm:text-base mt-3 mx-auto" style={{ color: "#475569", maxWidth: 480 }}>
            Not just another freelancer — a technical partner invested in your success
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
          {stats.map(({ end, suffix, label }) => (
            <div key={label} className="text-center rounded-2xl"
              style={{ padding: "1.5rem 1rem", background: "#FFFFFF",
                border: "1px solid rgba(201,162,39,0.15)", boxShadow: "0 2px 12px rgba(30,58,95,0.05)" }}>
              <div className="font-extrabold g-text" style={{ fontSize: "clamp(1.8rem,4vw,2.5rem)", lineHeight: 1 }}>
                <CountUp end={end} suffix={suffix} duration={2000} />
              </div>
              <div style={{ fontSize: "0.7rem", color: "#94A3B8", marginTop: "0.4rem", fontWeight: 600, letterSpacing: "0.05em" }}>
                {label}
              </div>
            </div>
          ))}
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((r, i) => (
            <motion.div key={r.title}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.2 + i * 0.08, ease: "easeOut" }}
              whileHover={{ y: -4, borderColor: `${r.color}35`, boxShadow: `0 16px 48px ${r.color}10` }}
              className="card transition-all duration-300" style={{ padding: "1.5rem" }}>
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 mt-0.5"
                  style={{ background: `${r.color}12`, border: `1px solid ${r.color}25` }}>
                  {r.icon}
                </div>
                <div>
                  <h3 className="font-bold mb-1.5" style={{ fontSize: "0.95rem", color: "#0F172A" }}>{r.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>{r.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.7 }} className="mt-14 rounded-3xl overflow-hidden relative"
          style={{ padding: "2.5rem",
            background: "linear-gradient(135deg, rgba(201,162,39,0.08), rgba(30,58,95,0.05), rgba(5,150,105,0.04))",
            border: "1px solid rgba(201,162,39,0.2)" }}>
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(201,162,39,0.08), transparent 60%)" }} />
          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-bold mb-2" style={{ fontSize: "clamp(1.1rem,3vw,1.5rem)", color: "#0F172A" }}>
                Let&apos;s build something incredible together
              </h3>
              <p className="text-sm" style={{ color: "#475569" }}>
                Currently accepting new projects. BS CS student at MNS University Multan. Response within 24 hours.
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="flex items-center gap-2"
                style={{ padding: "0.5rem 1rem", borderRadius: "999px",
                  background: "rgba(5,150,105,0.1)", border: "1px solid rgba(5,150,105,0.25)" }}>
                <span className="w-2 h-2 rounded-full" style={{ background: "#059669", boxShadow: "0 0 8px #059669",
                  animation: "pulse-glow 2s ease-in-out infinite" }} />
                <span className="text-xs font-bold" style={{ color: "#059669" }}>Open to Work</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 32px rgba(201,162,39,0.35)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="font-bold text-white text-sm rounded-2xl"
                style={{ padding: "0.75rem 1.75rem",
                  background: "linear-gradient(135deg, #1E3A5F, #2563EB)",
                  boxShadow: "0 4px 20px rgba(30,58,95,0.2)" }}>
                Start a Project →
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

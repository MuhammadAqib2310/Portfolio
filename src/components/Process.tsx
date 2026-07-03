"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import PremiumBG from "@/components/PremiumBG";

const steps = [
  {
    num: "01",
    icon: "💬",
    title: "Discovery Call",
    desc: "We start with a free 30-min call to understand your vision, goals, and technical requirements in depth.",
    color: "#2563EB",
    duration: "Day 1",
  },
  {
    num: "02",
    icon: "📋",
    title: "Strategy & Proposal",
    desc: "I deliver a detailed technical proposal with architecture plan, timeline, milestones, and fixed pricing.",
    color: "#38BDF8",
    duration: "Day 2–3",
  },
  {
    num: "03",
    icon: "⚙️",
    title: "Build & Iterate",
    desc: "Agile development with weekly demos. You see progress every step of the way with full transparency.",
    color: "#6366F1",
    duration: "Week 1–4",
  },
  {
    num: "04",
    icon: "🚀",
    title: "Launch & Support",
    desc: "Full deployment, documentation, and 30 days of free post-launch support to ensure everything runs perfectly.",
    color: "#22C55E",
    duration: "Week 4+",
  },
];

export default function Process() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="process"
      ref={ref}
      className="section-pad relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #162032 0%, #1E293B 100%)" }}
    >
      {/* Premium BG — geo lines + process connectors + orbs */}
      <PremiumBG variant="geo" accent="#2563EB" cyan="#38BDF8" />

      {/* Center ambient glow */}
      <div className="absolute pointer-events-none rounded-full"
        style={{ width: 700, height: 700, top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          background: "radial-gradient(circle, rgba(37,99,235,0.08), transparent 65%)", filter: "blur(120px)" }} />

      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="text-center mb-16"
        >
          <span className="sec-label" style={{ color: "#2563EB" }}>How I Work</span>
          <h2 style={{ fontSize: "clamp(2rem,5vw,3rem)", color: "#fff" }}>
            My <span className="g-text">Process</span>
          </h2>
          <p className="text-sm sm:text-base mt-3 mx-auto" style={{ color: "#64748B", maxWidth: 460 }}>
            A proven 4-step process that takes your idea from concept to production
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line — desktop (enhanced with glow) */}
          <div
            className="hidden lg:block absolute h-px"
            style={{
              top: "48px", left: "12.5%", right: "12.5%",
              background: "linear-gradient(90deg, #2563EB66, #38BDF866, #6366F166, #22C55E66)",
              zIndex: 0,
            }}
          />
          {/* Animated glow line on top */}
          <div
            className="hidden lg:block absolute h-px overflow-hidden"
            style={{ top: "48px", left: "12.5%", right: "12.5%", zIndex: 1 }}
          >
            <div style={{
              height: "100%",
              background: "linear-gradient(90deg, transparent, #38BDF8, #2563EB, transparent)",
              animation: "connectorSweep 3s linear infinite",
              backgroundSize: "200% 100%",
            }} />
          </div>
          {/* Dot markers at step positions */}
          {[0,1,2,3].map(i => (
            <div key={i} className="hidden lg:block absolute"
              style={{
                top: "44px", left: `calc(12.5% + ${i} * 25%)`,
                width: "9px", height: "9px", borderRadius: "50%",
                background: steps[i].color,
                boxShadow: `0 0 12px ${steps[i].color}`,
                zIndex: 2,
                transform: "translateX(-50%)",
                animation: `pulse-glow ${2 + i * 0.5}s ease-in-out infinite`,
              }} />
          ))}

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
                className="relative flex flex-col"
                style={{ zIndex: 3 }}
              >
                {/* Card */}
                <motion.div
                  whileHover={{ borderColor: `${step.color}50` }}
                  className="flex-1 transition-all duration-300 overflow-hidden"
                  style={{
                    padding: "1.75rem",
                    borderRadius: "1.5rem",
                    background: "rgba(255,255,255,0.04)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
                  }}
                >
                  {/* Top stripe */}
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px",
                    background: `linear-gradient(90deg, ${step.color}, transparent)` }} />

                  {/* Number + icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span
                      className="font-black"
                      style={{ fontSize: "2.5rem", color: `${step.color}25`, lineHeight: 1,
                        fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {step.num}
                    </span>
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                      style={{ background: `${step.color}18`, border: `1px solid ${step.color}35` }}
                    >
                      {step.icon}
                    </div>
                  </div>

                  <h3 className="font-bold mb-2" style={{ fontSize: "1rem", color: "#fff" }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "#64748B" }}>{step.desc}</p>

                  {/* Duration badge */}
                  <div className="inline-flex items-center gap-1.5"
                    style={{ padding: "0.3rem 0.75rem", borderRadius: "999px",
                      background: `${step.color}12`, border: `1px solid ${step.color}30` }}>
                    <span style={{ fontSize: "0.6rem", color: step.color }}>⏱</span>
                    <span style={{ fontSize: "0.7rem", fontWeight: 700, color: step.color }}>{step.duration}</span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center mt-14"
        >
          <p className="text-sm mb-5" style={{ color: "#64748B" }}>
            Ready to start? First call is always free.
          </p>
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(37,99,235,0.5)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="font-bold text-white text-sm rounded-2xl"
            style={{ padding: "0.875rem 2.5rem",
              background: "linear-gradient(135deg, #2563EB, #38BDF8)",
              boxShadow: "0 4px 28px rgba(37,99,235,0.35)" }}
          >
            Book Free Discovery Call →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

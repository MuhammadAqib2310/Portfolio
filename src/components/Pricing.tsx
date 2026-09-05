"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const plans = [
  {
    name: "Starter",
    tag: "For small businesses",
    price: { usd: "$500", desc: "starting from" },
    color: "#2563EB",
    bg: "#EEF2FF",
    deliverable: "7-day delivery",
    features: [
      "Landing page or simple web app",
      "Basic AI integration",
      "Mobile responsive design",
      "1 revision round",
      "7-day delivery",
      "1 week support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Professional",
    tag: "Most popular",
    price: { usd: "$1,500", desc: "starting from" },
    color: "#1E3A5F",
    bg: "#EEF2FF",
    deliverable: "14–21 day delivery",
    features: [
      "Full SaaS or AI-powered web app",
      "LLM / AI Agents integration",
      "Authentication + payments",
      "Database & API architecture",
      "3 revision rounds",
      "14–21 day delivery",
      "30 days support",
    ],
    cta: "Start Project",
    popular: true,
  },
  {
    name: "Enterprise",
    tag: "For scale-ups",
    price: { usd: "Custom", desc: "let's talk" },
    color: "#C9A227",
    bg: "#FFFBEB",
    deliverable: "Priority delivery",
    features: [
      "Complex multi-agent AI systems",
      "Custom LLM fine-tuning",
      "Microservices architecture",
      "Multi-tenant SaaS platforms",
      "Unlimited revisions",
      "Priority delivery",
      "90 days support + SLA",
    ],
    cta: "Book a Call",
    popular: false,
  },
];

const trustBadges = [
  { icon: "✅", text: "Free discovery call" },
  { icon: "🔒", text: "Fixed price contracts" },
  { icon: "🛡️", text: "30-day support included" },
  { icon: "📄", text: "NDA available" },
];

export default function Pricing() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="pricing"
      ref={ref}
      className="section-pad relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #FAFAF7 0%, #F4F3EE 100%)" }}
    >
      {/* BG glows */}
      <div className="absolute pointer-events-none rounded-full"
        style={{ width: 800, height: 800, top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          background: "radial-gradient(circle, rgba(201,162,39,0.06), transparent 65%)", filter: "blur(100px)" }} />
      <div className="absolute pointer-events-none rounded-full"
        style={{ width: 400, height: 400, top: "10%", right: "5%",
          background: "radial-gradient(circle, rgba(30,58,95,0.05), transparent 65%)", filter: "blur(70px)" }} />

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
            Investment
          </div>
          <h2 style={{ fontSize: "clamp(2.2rem, 5vw, 3.25rem)", color: "#0F172A", lineHeight: 1.15 }}>
            Transparent <span className="g-text">Pricing</span>
          </h2>
          <p className="mt-4 mx-auto" style={{ fontSize: "1rem", color: "#64748B", maxWidth: 480, lineHeight: 1.8 }}>
            No hidden fees. Fixed prices. You know exactly what you&apos;re getting before we start.
          </p>
        </motion.div>

        {/* Plans grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-end">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ position: "relative", marginTop: plan.popular ? "0" : "1.5rem" }}
            >
              {/* Popular badge */}
              {plan.popular && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 }}
                  className="absolute -top-5 left-0 right-0 flex justify-center z-10"
                >
                  <div style={{
                    padding: "0.35rem 1.25rem", borderRadius: "999px",
                    background: "linear-gradient(135deg, #1E3A5F, #2563EB)",
                    color: "#fff", fontSize: "0.72rem", fontWeight: 800,
                    letterSpacing: "0.05em", whiteSpace: "nowrap",
                    boxShadow: "0 4px 20px rgba(30,58,95,0.35)",
                  }}>
                    ⭐ Most Popular
                  </div>
                </motion.div>
              )}

              <motion.div
                animate={{
                  y: hovered === i ? -6 : 0,
                  boxShadow: plan.popular
                    ? hovered === i
                      ? `0 28px 80px rgba(30,58,95,0.18), 0 0 0 2px ${plan.color}40`
                      : `0 12px 48px rgba(30,58,95,0.12), 0 0 0 2px ${plan.color}25`
                    : hovered === i
                      ? `0 20px 60px rgba(30,58,95,0.1), 0 0 0 1px ${plan.color}30`
                      : "0 2px 16px rgba(30,58,95,0.06)",
                }}
                transition={{ duration: 0.3 }}
                style={{
                  borderRadius: "1.5rem",
                  overflow: "hidden",
                  background: plan.popular
                    ? "linear-gradient(180deg, #F0F4FF 0%, #FFFFFF 30%)"
                    : "#FFFFFF",
                  border: `1px solid ${plan.popular ? plan.color + "30" : "rgba(30,58,95,0.08)"}`,
                  padding: plan.popular ? "2.25rem 2rem" : "2rem 1.75rem",
                }}
              >
                {/* Top accent line */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: "4px",
                  background: `linear-gradient(90deg, ${plan.color}, ${plan.color}66)`,
                }} />

                {/* Header */}
                <div style={{ marginBottom: "1.75rem" }}>
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: "0.4rem",
                    padding: "0.25rem 0.75rem", borderRadius: "999px", marginBottom: "1rem",
                    background: plan.bg, border: `1px solid ${plan.color}20`,
                    fontSize: "0.65rem", fontWeight: 700, color: plan.color,
                    letterSpacing: "0.08em", textTransform: "uppercase",
                  }}>
                    {plan.tag}
                  </div>

                  <h3 style={{ fontSize: "1.6rem", fontWeight: 900, color: "#0F172A", marginBottom: "1rem", letterSpacing: "-0.02em" }}>
                    {plan.name}
                  </h3>

                  {/* Price */}
                  <div style={{ display: "flex", alignItems: "flex-end", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <span style={{
                      fontSize: "clamp(2.2rem, 5vw, 2.8rem)", fontWeight: 900, lineHeight: 1,
                      background: `linear-gradient(135deg, ${plan.color}, ${plan.color}99)`,
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                      letterSpacing: "-0.03em",
                    }}>
                      {plan.price.usd}
                    </span>
                    <span style={{ fontSize: "0.8rem", color: "#94A3B8", paddingBottom: "0.3rem", fontWeight: 500 }}>
                      {plan.price.desc}
                    </span>
                  </div>

                  {/* Delivery badge */}
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: "0.35rem",
                    padding: "0.25rem 0.625rem", borderRadius: "0.5rem",
                    background: "rgba(5,150,105,0.08)", border: "1px solid rgba(5,150,105,0.18)",
                    fontSize: "0.68rem", fontWeight: 700, color: "#059669",
                  }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <circle cx="5" cy="5" r="4.5" stroke="#059669" strokeWidth="1"/>
                      <path d="M5 2.5V5l1.5 1.5" stroke="#059669" strokeWidth="1" strokeLinecap="round"/>
                    </svg>
                    {plan.deliverable}
                  </div>
                </div>

                {/* Divider */}
                <div style={{ height: "1px", background: `rgba(30,58,95,0.07)`, marginBottom: "1.5rem" }} />

                {/* Features */}
                <ul style={{ marginBottom: "1.75rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", fontSize: "0.86rem", color: "#334155" }}>
                      <div style={{
                        width: 18, height: 18, borderRadius: "50%", flexShrink: 0, marginTop: "0.05rem",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        background: `${plan.color}15`,
                      }}>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5l2.5 2.5 4-4" stroke={plan.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  style={{
                    width: "100%", padding: "0.9rem", borderRadius: "0.875rem",
                    fontWeight: 800, fontSize: "0.9rem", cursor: "none",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                    background: plan.popular
                      ? `linear-gradient(135deg, #1E3A5F, #2563EB)`
                      : `${plan.color}0E`,
                    border: plan.popular ? "none" : `1px solid ${plan.color}25`,
                    color: plan.popular ? "#fff" : plan.color,
                    boxShadow: plan.popular ? `0 4px 24px ${plan.color}30` : "none",
                    transition: "all 0.25s",
                  }}
                >
                  {plan.cta}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          style={{ marginTop: "3.5rem" }}
        >
          <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(201,162,39,0.3), transparent)", marginBottom: "2rem" }} />
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
            {trustBadges.map(b => (
              <div key={b.text} style={{
                display: "flex", alignItems: "center", gap: "0.5rem",
                padding: "0.5rem 1rem", borderRadius: "0.875rem",
                background: "#FFFFFF", border: "1px solid rgba(30,58,95,0.08)",
                fontSize: "0.8rem", color: "#475569", fontWeight: 600,
                boxShadow: "0 1px 4px rgba(30,58,95,0.05)",
              }}>
                <span>{b.icon}</span>
                {b.text}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const plans = [
  {
    name: "Starter",
    tag: "For small businesses",
    price: { usd: "$500", desc: "starting from" },
    color: "#F7E7CE",
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
    color: "#D4AF37",
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
    color: "#A0A0AB",
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

export default function Pricing() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="pricing"
      ref={ref}
      className="section-pad relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #141420 0%, #0A0A0F 100%)" }}
    >
      {/* BG glows */}
      <div className="absolute pointer-events-none rounded-full"
        style={{ width: 700, height: 700, top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          background: "radial-gradient(circle, rgba(255,255,255,0.07), transparent 65%)", filter: "blur(100px)" }} />

      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="text-center mb-14"
        >
          <span className="sec-label" style={{ color: "#A0A0AB" }}>Investment</span>
          <h2 style={{ fontSize: "clamp(2rem,5vw,3rem)", color: "#fff" }}>
            Transparent <span className="g-text">Pricing</span>
          </h2>
          <p className="text-sm sm:text-base mt-3 mx-auto" style={{ color: "#64748B", maxWidth: 460 }}>
            No hidden fees. Fixed prices. You know exactly what you&apos;re getting before we start.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
              onHoverStart={() => setHovered(i)}
              onHoverEnd={() => setHovered(null)}
              style={{ position: "relative" }}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 font-bold text-xs text-white whitespace-nowrap"
                  style={{ padding: "0.3rem 1rem", borderRadius: "999px",
                    background: "linear-gradient(135deg, #D4AF37, #F7E7CE)",
                    boxShadow: "0 4px 20px rgba(212,175,55,0.5)" }}
                >
                  ⭐ Most Popular
                </div>
              )}

              <motion.div
                animate={{
                  scale: hovered === i ? 1.02 : 1,
                  borderColor: hovered === i ? `${plan.color}50` : plan.popular ? `${plan.color}35` : "rgba(255,255,255,0.08)",
                  boxShadow: hovered === i ? `0 24px 80px ${plan.color}20` : plan.popular ? `0 8px 40px ${plan.color}15` : "none",
                }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl overflow-hidden relative"
                style={{
                  background: plan.popular ? `linear-gradient(180deg, ${plan.color}10 0%, rgba(255,255,255,0.03) 100%)` : "rgba(255,255,255,0.03)",
                  border: `1px solid ${plan.popular ? plan.color + "35" : "rgba(255,255,255,0.08)"}`,
                  padding: plan.popular ? "2rem" : "1.75rem",
                  marginTop: plan.popular ? "1rem" : "0",
                }}
              >
                {/* Top stripe */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px",
                  background: `linear-gradient(90deg, ${plan.color}, transparent)` }} />

                {/* Header */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs tracking-widest uppercase" style={{ color: plan.color }}>
                      {plan.tag}
                    </span>
                  </div>
                  <h3 className="font-extrabold mb-4" style={{ fontSize: "1.5rem", color: "#fff" }}>
                    {plan.name}
                  </h3>

                  {/* Price */}
                  <div className="flex items-end gap-2">
                    <span className="font-extrabold g-text" style={{ fontSize: "clamp(2rem,5vw,2.5rem)", lineHeight: 1 }}>
                      {plan.price.usd}
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "#64748B", paddingBottom: "0.25rem" }}>
                      {plan.price.desc}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-3 text-sm" style={{ color: "#B4B8D4" }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5">
                        <circle cx="8" cy="8" r="8" fill={`${plan.color}22`} />
                        <path d="M5 8l2 2 4-4" stroke={plan.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: `0 0 32px ${plan.color}50` }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="w-full font-bold text-sm rounded-2xl"
                  style={{
                    padding: "0.875rem",
                    background: plan.popular ? `linear-gradient(135deg, #D4AF37, #F7E7CE)` : `${plan.color}18`,
                    border: plan.popular ? "none" : `1px solid ${plan.color}35`,
                    color: plan.popular ? "#fff" : plan.color,
                    boxShadow: plan.popular ? `0 4px 24px ${plan.color}35` : "none",
                  }}
                >
                  {plan.cta} →
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-6 mt-12 text-sm"
          style={{ color: "#64748B" }}
        >
          {["✅ Free discovery call", "✅ Fixed price contracts", "✅ 30-day support included", "✅ NDA available"].map(item => (
            <span key={item}>{item}</span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

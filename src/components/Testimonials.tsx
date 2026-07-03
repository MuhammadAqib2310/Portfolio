"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { testimonials } from "@/lib/utils";

const avatarGrads = [
  "linear-gradient(135deg, #2563EB, #38BDF8)",
  "linear-gradient(135deg, #38BDF8, #6366F1)",
  "linear-gradient(135deg, #6366F1, #EF4444)",
  "linear-gradient(135deg, #F59E0B, #22C55E)",
];

export default function Testimonials() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="testimonials"
      ref={ref}
      className="section-pad relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #1E293B 0%, #162032 100%)" }}
    >
      {/* BG glow */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 600, height: 300,
          top: "20%", left: "50%", transform: "translateX(-50%)",
          background: "radial-gradient(ellipse, rgba(34,197,94,0.06), transparent 65%)",
          filter: "blur(70px)",
        }}
      />

      <div className="wrap">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="text-center mb-14"
        >
          <span className="sec-label" style={{ color: "#22C55E" }}>Social Proof</span>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", color: "#fff" }}>
            Client <span className="g-text">Testimonials</span>
          </h2>
          <p
            className="text-sm sm:text-base mt-3 mx-auto"
            style={{ color: "#64748B", maxWidth: 420 }}
          >
            What world-class clients say about working with me
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1, ease: "easeOut" }}
              whileHover={{ y: -5, borderColor: "rgba(34,197,94,0.25)", boxShadow: "0 24px 64px rgba(34,197,94,0.08)" }}
              className="flex flex-col rounded-3xl transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                padding: "1.75rem",
              }}
            >
              {/* Top: stars + quote icon */}
              <div className="flex items-center justify-between mb-4">
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                {/* Quote mark */}
                <span
                  style={{
                    fontSize: "2.5rem",
                    lineHeight: 1,
                    color: "#22C55E",
                    opacity: 0.2,
                    fontFamily: "Georgia, serif",
                    userSelect: "none",
                  }}
                >
                  &rdquo;
                </span>
              </div>

              {/* Review text */}
              <p
                className="text-sm leading-relaxed flex-1 mb-6"
                style={{ color: "#94A3B8" }}
              >
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author row */}
              <div
                className="flex items-center gap-3 pt-4"
                style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
              >
                {/* Avatar */}
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center text-xs font-black flex-shrink-0"
                  style={{
                    background: avatarGrads[i % avatarGrads.length],
                    color: "#fff",
                    fontSize: "0.7rem",
                    letterSpacing: "0.05em",
                    boxShadow: `0 4px 14px rgba(0,0,0,0.3)`,
                  }}
                >
                  {t.avatar}
                </div>

                <div className="flex-1 min-w-0">
                  <div
                    className="font-bold truncate"
                    style={{ fontSize: "0.9rem", color: "#fff" }}
                  >
                    {t.name}
                  </div>
                  <div
                    className="truncate"
                    style={{ fontSize: "0.75rem", color: "#64748B", marginTop: "0.1rem" }}
                  >
                    {t.role}
                  </div>
                </div>

                {/* Verified badge */}
                <div
                  className="flex items-center gap-1.5 flex-shrink-0"
                  style={{
                    padding: "0.3rem 0.625rem",
                    borderRadius: "999px",
                    background: "rgba(34,197,94,0.1)",
                    border: "1px solid rgba(34,197,94,0.25)",
                  }}
                >
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="#22C55E">
                    <circle cx="4" cy="4" r="4"/>
                  </svg>
                  <span
                    style={{ fontSize: "0.6rem", fontWeight: 700, color: "#22C55E", letterSpacing: "0.05em" }}
                  >
                    Verified
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 mt-14"
          style={{ paddingTop: "3rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          {[
            { value: "50+",  label: "Projects Completed" },
            { value: "99%",  label: "Client Satisfaction" },
            { value: "40+",  label: "Happy Clients" },
            { value: "5★",   label: "Average Rating" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div
                className="font-extrabold g-text"
                style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", lineHeight: 1 }}
              >
                {value}
              </div>
              <div
                style={{ fontSize: "0.7rem", color: "#64748B", marginTop: "0.3rem", fontWeight: 600, letterSpacing: "0.05em" }}
              >
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { testimonials } from "@/lib/utils";

const avatarGrads = [
  "linear-gradient(135deg, #1E3A5F, #2563EB)",
  "linear-gradient(135deg, #C9A227, #92740D)",
  "linear-gradient(135deg, #2563EB, #1E3A5F)",
  "linear-gradient(135deg, #92740D, #C9A227)",
];

export default function Testimonials() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="testimonials" ref={ref} className="section-pad relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #F4F3EE 0%, #FAFAF7 100%)" }}>
      <div className="absolute pointer-events-none rounded-full"
        style={{ width: 600, height: 300, top: "20%", left: "50%", transform: "translateX(-50%)",
          background: "radial-gradient(ellipse, rgba(201,162,39,0.07), transparent 65%)", filter: "blur(70px)" }} />

      <div className="wrap">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }} className="text-center mb-14">
          <span className="sec-label" style={{ color: "#C9A227" }}>Social Proof</span>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", color: "#0F172A" }}>
            Client <span className="g-text">Testimonials</span>
          </h2>
          <p className="text-sm sm:text-base mt-3 mx-auto" style={{ color: "#475569", maxWidth: 420 }}>
            What world-class clients say about working with me
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
          {testimonials.map((t, i) => (
            <motion.div key={t.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1, ease: "easeOut" }}
              whileHover={{ y: -5, borderColor: "rgba(201,162,39,0.3)", boxShadow: "0 24px 64px rgba(201,162,39,0.08)" }}
              className="flex flex-col rounded-3xl transition-all duration-300"
              style={{ background: "#FFFFFF", border: "1px solid rgba(30,58,95,0.08)", padding: "1.75rem",
                boxShadow: "0 2px 12px rgba(30,58,95,0.05)" }}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill="#C9A227">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <span style={{ fontSize: "2.5rem", lineHeight: 1, color: "#C9A227", opacity: 0.25,
                  fontFamily: "Georgia, serif", userSelect: "none" }}>&rdquo;</span>
              </div>

              <p className="text-sm leading-relaxed flex-1 mb-6" style={{ color: "#475569" }}>
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid rgba(30,58,95,0.07)" }}>
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-xs font-black flex-shrink-0"
                  style={{ background: avatarGrads[i % avatarGrads.length], color: "#fff",
                    fontSize: "0.7rem", letterSpacing: "0.05em", boxShadow: "0 4px 14px rgba(30,58,95,0.15)" }}>
                  {t.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold truncate" style={{ fontSize: "0.9rem", color: "#0F172A" }}>{t.name}</div>
                  <div className="truncate" style={{ fontSize: "0.75rem", color: "#94A3B8", marginTop: "0.1rem" }}>{t.role}</div>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0"
                  style={{ padding: "0.3rem 0.625rem", borderRadius: "999px",
                    background: "rgba(5,150,105,0.08)", border: "1px solid rgba(5,150,105,0.2)" }}>
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="#059669"><circle cx="4" cy="4" r="4"/></svg>
                  <span style={{ fontSize: "0.6rem", fontWeight: 700, color: "#059669", letterSpacing: "0.05em" }}>Verified</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 mt-14"
          style={{ paddingTop: "3rem", borderTop: "1px solid rgba(30,58,95,0.07)" }}>
          {[
            { value: "20+",  label: "Projects Completed" },
            { value: "99%",  label: "Client Satisfaction" },
            { value: "3+",   label: "Years Experience" },
            { value: "5★",   label: "Average Rating" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="font-extrabold g-text" style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", lineHeight: 1 }}>{value}</div>
              <div style={{ fontSize: "0.7rem", color: "#94A3B8", marginTop: "0.3rem", fontWeight: 600, letterSpacing: "0.05em" }}>{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

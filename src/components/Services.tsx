"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { services } from "@/lib/utils";
import TiltCard from "@/components/TiltCard";
import PremiumBG from "@/components/PremiumBG";

const colors = ["#E879A0", "#FCA5C0", "#C084A0", "#F59E0B", "#22C55E", "#EF4444"];

export default function Services() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="services"
      ref={ref}
      className="section-pad relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #100D16 0%, #0D0A0E 100%)" }}
    >
      {/* Premium mesh gradient + floating glass shapes + orbs */}
      <PremiumBG variant="mesh" accent="#E879A0" cyan="#FCA5C0" />

      {/* Extra layered glows */}
      <div className="absolute pointer-events-none rounded-full"
        style={{ width: 700, height: 700, bottom: "-20%", left: "-15%",
          background: "radial-gradient(circle, rgba(232,121,160,0.11), transparent 65%)", filter: "blur(90px)" }} />
      <div className="absolute pointer-events-none rounded-full"
        style={{ width: 500, height: 500, top: "-10%", right: "-5%",
          background: "radial-gradient(circle, rgba(252,165,192,0.09), transparent 65%)", filter: "blur(80px)" }} />

      <div className="wrap">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="text-center mb-14"
        >
          <span className="sec-label" style={{ color: "#E879A0" }}>What I Do</span>
          <h2 style={{ fontSize: "clamp(2rem,5vw,3rem)", color: "#fff" }}>
            AI-Powered <span className="g-text">Services</span>
          </h2>
          <p className="text-sm sm:text-base mt-3 mx-auto" style={{ color: "#64748B", maxWidth: 480 }}>
            End-to-end solutions from intelligent agents to production SaaS platforms
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => {
            const c = colors[i % colors.length];
            return (
              <TiltCard
                key={s.title}
                intensity={8}
                className="overflow-hidden cursor-default"
                style={{ borderRadius: "1.5rem" }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: i * 0.09, ease: "easeOut" }}
                  style={{ padding: "1.75rem", position: "relative" }}
                >
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-5"
                    style={{ background: `${c}18`, border: `1px solid ${c}35` }}
                  >
                    {s.icon}
                  </div>

                  <h3 className="text-base font-bold mb-2.5" style={{ color: "#fff" }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#64748B" }}>{s.desc}</p>

                  {/* Accent line on bottom */}
                  <div
                    className="absolute bottom-0 left-0 h-[2px]"
                    style={{
                      width: "100%",
                      background: `linear-gradient(90deg, ${c}, transparent)`,
                      opacity: 0,
                      transition: "opacity 0.3s",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.opacity = "1"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.opacity = "0"; }}
                  />
                </motion.div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

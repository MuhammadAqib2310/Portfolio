"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";
import MagneticButton from "@/components/MagneticButton";
import CountUp from "@/components/CountUp";
import TextScramble from "@/components/TextScramble";

const ParticleField = dynamic(() => import("@/components/ParticleField"), { ssr: false });
const NeuralNetwork = dynamic(() => import("@/components/NeuralNetwork"), { ssr: false });

const roles = ["AI Engineer", "Full Stack Developer", "AI Agent Builder", "SaaS Architect"];
const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.4 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.75, ease } },
};

export default function Hero() {
  const roleRef     = useRef<HTMLSpanElement>(null);
  const indexRef    = useRef(0);
  const charRef     = useRef(0);
  const deletingRef = useRef(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const type = () => {
      const el = roleRef.current;
      if (!el) return;
      const word = roles[indexRef.current];
      if (!deletingRef.current) {
        el.textContent = word.slice(0, ++charRef.current);
        if (charRef.current === word.length) { deletingRef.current = true; setTimeout(type, 2200); return; }
      } else {
        el.textContent = word.slice(0, --charRef.current);
        if (charRef.current === 0) { deletingRef.current = false; indexRef.current = (indexRef.current + 1) % roles.length; }
      }
      setTimeout(type, deletingRef.current ? 50 : 90);
    };
    const t = setTimeout(type, 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #08080C 0%, #0F0F14 50%, #08080C 100%)" }}>

      {/* Aurora glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute rounded-full anim-aurora"
          style={{ width: "min(900px,120vw)", height: "min(900px,120vw)", top: "-30%", left: "-20%",
            background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 65%)", filter: "blur(80px)" }} />
        <div className="absolute rounded-full"
          style={{ width: "min(700px,90vw)", height: "min(700px,90vw)", bottom: "-20%", right: "-15%",
            background: "radial-gradient(circle, rgba(79,70,229,0.14) 0%, transparent 65%)", filter: "blur(80px)",
            animation: "aurora 22s ease-in-out infinite reverse" }} />
        <div className="absolute rounded-full"
          style={{ width: "min(400px,50vw)", height: "min(400px,50vw)", top: "30%", left: "45%",
            background: "radial-gradient(circle, rgba(129,140,248,0.1) 0%, transparent 65%)", filter: "blur(60px)",
            animation: "aurora 14s ease-in-out infinite" }} />
      </div>

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(rgba(129,140,248,0.14) 1px, transparent 1px)",
          backgroundSize: "48px 48px", opacity: 0.5,
          maskImage: "radial-gradient(ellipse 85% 75% at 50% 50%, black 20%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 85% 75% at 50% 50%, black 20%, transparent 80%)", zIndex: 0 }} />

      {/* Neural Network BG — AI vibe */}
      <NeuralNetwork />

      {/* Particles — subtle on top */}
      <ParticleField />

      {/* Content */}
      <div className="wrap relative z-10" style={{ paddingTop: "6rem", paddingBottom: "4rem" }}>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-10">

          {/* Left */}
          <motion.div variants={stagger} initial="hidden" animate="show"
            className="flex-1 w-full text-center lg:text-left" style={{ maxWidth: 620 }}>

            {/* Badge */}
            <motion.div variants={item}>
              <div className="inline-flex items-center gap-2.5 mb-8 font-semibold"
                style={{ padding: "0.45rem 1rem", borderRadius: "999px", fontSize: "0.78rem",
                  background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.35)",
                  color: "#93C5FD", letterSpacing: "0.02em" }}>
                <span className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: "#22C55E", boxShadow: "0 0 8px #22C55E", animation: "pulse-glow 2s ease-in-out infinite" }} />
                Available for Projects
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={item}
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.75rem)", lineHeight: 1.05, marginBottom: "1.25rem" }}>
              <span style={{ color: "#fff" }}>Building the</span><br />
              <TextScramble text="Future with AI" className="g-text" trigger={true} delay={800} speed={30} /><br />
              <span style={{ color: "#fff" }}>&amp; </span>
              <TextScramble text="Web Tech" className="g-text-2" trigger={true} delay={1200} speed={30} />
            </motion.h1>

            {/* Typewriter */}
            <motion.div variants={item}
              className="flex items-center justify-center lg:justify-start gap-1 mb-6"
              style={{ fontSize: "clamp(1rem, 2.5vw, 1.35rem)", color: "#94A3B8", minHeight: "2.2rem", fontWeight: 500 }}>
              <span>I&apos;m a&nbsp;</span>
              <span ref={roleRef} className="g-text font-bold" />
              <span className="anim-pulse-glow" style={{ color: "#6366F1", fontSize: "1.1em", marginLeft: "1px" }}>|</span>
            </motion.div>

            {/* Description */}
            <motion.p variants={item}
              style={{ fontSize: "0.95rem", color: "#94A3B8", lineHeight: 1.8, marginBottom: "2.5rem", maxWidth: "500px" }}
              className="mx-auto lg:mx-0">
              Specializing in AI Agents, SaaS Platforms, Workflow Automation, and Modern Web Applications.
              Turning complex ideas into elegant, scalable solutions that generate real revenue.
            </motion.p>

            {/* Stats */}
            <motion.div variants={item} className="flex justify-center lg:justify-start gap-10 mb-10">
              {[
                { end: 50, suffix: "+", label: "Projects Done" },
                { end: 5,  suffix: "+", label: "Years Exp." },
                { end: 99, suffix: "%", label: "Satisfaction" },
              ].map(({ end, suffix, label }) => (
                <div key={label} className="text-center lg:text-left">
                  <div className="font-extrabold g-text" style={{ fontSize: "clamp(1.5rem, 4vw, 2.1rem)", lineHeight: 1 }}>
                    <CountUp end={end} suffix={suffix} duration={2000} />
                  </div>
                  <div style={{ fontSize: "0.7rem", color: "#64748B", marginTop: "0.35rem", fontWeight: 600, letterSpacing: "0.05em" }}>
                    {label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div variants={item} className="flex flex-wrap justify-center lg:justify-start gap-3">
              <MagneticButton
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="font-bold text-white text-sm rounded-2xl"
                style={{ padding: "0.85rem 2rem",
                  background: "linear-gradient(135deg, #6366F1, #818CF8)",
                  boxShadow: "0 4px 28px rgba(99,102,241,0.45)" }}>
                View Projects →
              </MagneticButton>
              <MagneticButton
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="font-bold text-white text-sm rounded-2xl"
                style={{ padding: "0.85rem 2rem",
                  background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)" }}>
                Let&apos;s Talk
              </MagneticButton>
              <MagneticButton href="/resume.pdf" download
                className="font-bold text-sm rounded-2xl flex items-center gap-2"
                style={{ padding: "0.85rem 2rem",
                  border: "1px solid rgba(129,140,248,0.35)", color: "#818CF8",
                  background: "rgba(129,140,248,0.07)" }}>
                ↓ Resume
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Right: Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.55, ease }}
            className="flex-shrink-0 relative"
            style={{ padding: "0 40px", marginTop: "1rem" }}>

            {/* Glow */}
            <div className="absolute inset-0 pointer-events-none rounded-full"
              style={{ background: "radial-gradient(circle, rgba(99,102,241,0.35) 0%, rgba(129,140,248,0.15) 45%, transparent 70%)",
                filter: "blur(50px)", transform: "scale(1.5)" }} />

            {/* Spinning ring */}
            <div className="absolute anim-spin-slow pointer-events-none"
              style={{ inset: "-12px", borderRadius: "50%",
                background: "conic-gradient(from 0deg, #6366F1 0%, #818CF8 33%, #9A9AA5 66%, transparent 80%, #6366F1 100%)",
                WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 3px), black calc(100% - 3px))",
                mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), black calc(100% - 3px))" }} />

            {/* Static ring */}
            <div className="absolute pointer-events-none"
              style={{ inset: "-6px", borderRadius: "50%", border: "1px solid rgba(99,102,241,0.25)" }} />

            {/* Photo */}
            <div className="relative rounded-full overflow-hidden"
              style={{ width: "clamp(180px, 28vw, 300px)", height: "clamp(180px, 28vw, 300px)",
                border: "3px solid rgba(99,102,241,0.35)",
                boxShadow: "0 0 0 1px rgba(129,140,248,0.12), inset 0 0 40px rgba(255,255,255,0.08)" }}>
              {imgError ? (
                <div className="absolute inset-0 flex items-center justify-center font-black select-none"
                  style={{ fontSize: "clamp(3rem,8vw,5rem)",
                    background: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(129,140,248,0.1))", color: "#6366F1" }}>
                  MA
                </div>
              ) : (
                <Image src="/avatar.jpg" alt="M Aqib — AI Engineer & Full Stack Developer"
                  fill className="object-cover object-top" priority onError={() => setImgError(true)} />
              )}
            </div>

            {/* Badge left — hidden on very small screens */}
            <motion.div animate={{ y: [-8, 8, -8] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute whitespace-nowrap font-bold text-xs hidden sm:block"
              style={{ left: -8, top: "26%", padding: "0.5rem 0.75rem", borderRadius: "0.875rem",
                background: "rgba(99,102,241,0.2)", border: "1px solid rgba(99,102,241,0.5)",
                color: "#93C5FD", backdropFilter: "blur(16px)", zIndex: 10,
                boxShadow: "0 4px 20px rgba(99,102,241,0.25)" }}>
              🤖 AI Specialist
            </motion.div>

            {/* Badge right — hidden on very small screens */}
            <motion.div animate={{ y: [8, -8, 8] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute whitespace-nowrap font-bold text-xs hidden sm:block"
              style={{ right: -8, bottom: "26%", padding: "0.5rem 0.75rem", borderRadius: "0.875rem",
                background: "rgba(129,140,248,0.15)", border: "1px solid rgba(129,140,248,0.4)",
                color: "#818CF8", backdropFilter: "blur(16px)", zIndex: 10,
                boxShadow: "0 4px 20px rgba(129,140,248,0.18)" }}>
              ⚡ Full Stack
            </motion.div>

            {/* Open to work */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }}
              className="absolute whitespace-nowrap font-bold text-xs"
              style={{ bottom: "-22px", left: "50%", transform: "translateX(-50%)",
                padding: "0.4rem 0.875rem", borderRadius: "999px",
                background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.35)",
                color: "#22C55E", backdropFilter: "blur(16px)", zIndex: 10 }}>
              ● Open to Work
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: "#334155", fontWeight: 600 }}>SCROLL</span>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.6, repeat: Infinity }}
          style={{ width: "1px", height: "36px",
            background: "linear-gradient(to bottom, #6366F1, transparent)", borderRadius: "1px" }} />
      </motion.div>
    </section>
  );
}

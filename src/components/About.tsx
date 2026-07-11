"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skills = [
  { name: "AI/ML Engineering",    pct: 95, color: "#6C63FF" },
  { name: "Full Stack Dev",        pct: 92, color: "#FCA5C0" },
  { name: "LLM Integration",       pct: 95, color: "#8B5CF6" },
  { name: "SaaS Architecture",     pct: 88, color: "#F59E0B" },
  { name: "Workflow Automation",   pct: 90, color: "#22C55E" },
  { name: "Cloud & DevOps",        pct: 84, color: "#EF4444" },
];

const highlights = [
  { icon:"🎯", title:"Problem Solver",  sub:"First-principles thinking" },
  { icon:"🚀", title:"Ships Fast",       sub:"MVP to production in weeks" },
  { icon:"🧠", title:"AI Native",        sub:"LLMs, Agents, Automation" },
  { icon:"⚡", title:"Performance",      sub:"99%+ uptime, sub-100ms" },
];

const ease = [0.22,1,0.36,1] as [number,number,number,number];
const fadeUp = (delay = 0) => ({
  hidden:{ opacity:0, y:32 },
  show:{ opacity:1, y:0, transition:{ duration:.65, delay, ease } },
});
const fadeLeft = (delay = 0) => ({
  hidden:{ opacity:0, x:-36 },
  show:{ opacity:1, x:0, transition:{ duration:.65, delay, ease } },
});
const fadeRight = (delay = 0) => ({
  hidden:{ opacity:0, x:36 },
  show:{ opacity:1, x:0, transition:{ duration:.65, delay, ease } },
});

export default function About() {
  const ref   = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });

  return (
    <section id="about" ref={ref} className="section-pad relative overflow-hidden" style={{ background:"linear-gradient(180deg, #0D0A0E 0%, #100D16 100%)" }}>
      {/* BG glows */}
      <div className="absolute pointer-events-none rounded-full"
        style={{ width:500, height:500, top:"-10%", right:"-10%",
          background:"radial-gradient(circle,rgba(252,165,192,0.07),transparent 65%)", filter:"blur(80px)" }} />
      <div className="absolute pointer-events-none rounded-full"
        style={{ width:400, height:400, bottom:0, left:"-8%",
          background:"radial-gradient(circle,rgba(232,121,160,0.07),transparent 65%)", filter:"blur(70px)" }} />

      <div className="wrap">
        {/* Heading */}
        <motion.div variants={fadeUp(0)} initial="hidden" animate={inView?"show":{}} className="text-center mb-14">
          <span className="sec-label" style={{ color: "var(--accent-main)" }}>About Me</span>
          <h2 className="font-bold" style={{ fontSize:"clamp(2rem,5vw,3rem)", color:"#fff" }}>
            Crafting <span className="g-text">Intelligent</span> Solutions
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-start">
          {/* Left */}
          <motion.div variants={fadeLeft(0.1)} initial="hidden" animate={inView?"show":{}}>
            <p className="text-base sm:text-lg leading-relaxed mb-5" style={{ color:"#94A3B8" }}>
              I&apos;m <strong style={{ color:"#fff" }}>M Aqib</strong>, an AI Engineer & Full Stack Developer
              with <span style={{ color:"#fff" }}>5+ years</span> building production-grade AI systems and
              web apps that scale to millions of users.
            </p>
            <p className="text-sm sm:text-base leading-relaxed mb-10" style={{ color:"#94A3B8" }}>
              From intelligent AI agents and LLM-powered workflows to robust SaaS platforms —
              I combine deep technical knowledge with business acumen to deliver solutions
              that create real competitive advantages.
            </p>

            {/* Highlight cards */}
            <div className="grid grid-cols-2 gap-3 mb-10">
              {highlights.map(({ icon, title, sub }, i) => (
                <motion.div key={title}
                  initial={{ opacity:0, scale:.92 }}
                  animate={inView ? { opacity:1, scale:1 } : {}}
                  transition={{ delay:.3 + i*.07, duration:.5 }}
                  whileHover={{ y:-4, borderColor:"rgba(232,121,160,0.3)" }}
                  className="card p-4 cursor-default">
                  <div className="text-2xl mb-2">{icon}</div>
                  <div className="text-sm font-bold mb-0.5" style={{ color:"#fff" }}>{title}</div>
                  <div className="text-xs" style={{ color:"#64748B" }}>{sub}</div>
                </motion.div>
              ))}
            </div>

            <motion.a href="/resume.pdf" download
              whileHover={{ scale:1.03, boxShadow:"0 0 32px rgba(232,121,160,0.4)" }}
              whileTap={{ scale:.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm"
              style={{ background:"linear-gradient(135deg,#6C63FF,#8B5CF6)", color:"#fff" }}>
              ↓ Download Resume
            </motion.a>
          </motion.div>

          {/* Right — skill bars */}
          <motion.div variants={fadeRight(0.2)} initial="hidden" animate={inView?"show":{}}
            className="p-7 rounded-3xl" style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)" }}>
            <h3 className="text-base font-bold mb-8 flex items-center gap-2" style={{ color:"#fff" }}>
              <span className="w-1 h-6 rounded-full" style={{ background:"linear-gradient(#6C63FF,#FCA5C0)" }} />
              Core Competencies
            </h3>
            <div className="space-y-6">
              {skills.map((s, i) => (
                <div key={s.name}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium" style={{ color:"#d1d5db" }}>{s.name}</span>
                    <motion.span
                      initial={{ opacity:0 }} animate={inView?{ opacity:1 }:{}} transition={{ delay:.5+i*.08 }}
                      className="text-xs font-bold" style={{ color: s.color }}>
                      {s.pct}%
                    </motion.span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background:"rgba(255,255,255,0.06)" }}>
                    <motion.div
                      initial={{ width:0 }}
                      animate={inView?{ width:`${s.pct}%` }:{ width:0 }}
                      transition={{ duration:1.2, delay:.45+i*.1, ease:[.22,1,.36,1] }}
                      className="h-full rounded-full"
                      style={{ background:`linear-gradient(90deg, ${s.color}, ${s.color}88)` }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const techs = [
  { name:"Next.js",      color:"#ffffff" },
  { name:"TypeScript",   color:"#3B82F6" },
  { name:"Python",       color:"#FBBF24" },
  { name:"OpenAI",       color:"#10B981" },
  { name:"LangChain",    color:"#4FC3F7" },
  { name:"React",        color:"#61DAFB" },
  { name:"Node.js",      color:"#6EE7B7" },
  { name:"FastAPI",      color:"#34D399" },
  { name:"PostgreSQL",   color:"#60A5FA" },
  { name:"MongoDB",      color:"#4ADE80" },
  { name:"Redis",        color:"#F87171" },
  { name:"AWS",          color:"#FBBF24" },
  { name:"Docker",       color:"#60A5FA" },
  { name:"Supabase",     color:"#34D399" },
  { name:"Prisma",       color:"#A78BFA" },
  { name:"Tailwind",     color:"#22D3EE" },
  { name:"GraphQL",      color:"#F472B6" },
  { name:"Kubernetes",   color:"#818CF8" },
  { name:"ElevenLabs",   color:"#C084FC" },
  { name:"Whisper",      color:"#34D399" },
  { name:"LlamaIndex",   color:"#FBBF24" },
  { name:"Framer",       color:"#6C63FF" },
];

const row1 = [...techs.slice(0,11), ...techs.slice(0,11)];
const row2 = [...techs.slice(11),   ...techs.slice(11)];

function Chip({ t, i }: { t:typeof techs[0]; i:number }) {
  return (
    <motion.div key={i}
      whileHover={{ scale:1.1, y:-4 }}
      transition={{ type:"spring", stiffness:400, damping:14 }}
      className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold cursor-default select-none"
      style={{ background:`${t.color}10`, border:`1px solid ${t.color}26`, color:t.color }}>
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background:t.color }} />
      {t.name}
    </motion.div>
  );
}

export default function TechStack() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-60px" });

  return (
    <section id="tech" ref={ref} className="section-pad relative overflow-hidden" style={{ background:"linear-gradient(180deg, #111111 0%, #080808 100%)" }}>
      {/* Animated dots + floating orbs */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        {/* Drifting mesh blobs */}
        <div style={{
          position: "absolute", borderRadius: "50%",
          width: "clamp(400px,50vw,700px)", height: "clamp(200px,25vw,350px)",
          top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          background: "radial-gradient(ellipse, rgba(226,226,226,0.12), transparent 65%)",
          filter: "blur(70px)",
          animation: "aurora 20s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", borderRadius: "50%",
          width: 350, height: 300,
          top: "10%", left: "5%",
          background: "radial-gradient(ellipse, rgba(255,255,255,0.09), transparent 70%)",
          filter: "blur(60px)",
          animation: "bgOrb1 16s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", borderRadius: "50%",
          width: 300, height: 250,
          bottom: "10%", right: "5%",
          background: "radial-gradient(ellipse, rgba(160,160,160,0.08), transparent 70%)",
          filter: "blur(60px)",
          animation: "bgOrb2 19s ease-in-out infinite",
        }} />
        {/* Subtle grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 80%)",
        }} />
      </div>

      <div className="wrap mb-12">
        <motion.div
          initial={{ opacity:0, y:28 }} animate={inView?{ opacity:1, y:0 }:{}} transition={{ duration:.65 }}
          className="text-center">
          <span className="sec-label" style={{ color:"var(--cyan)" }}>Technologies</span>
          <h2 className="font-bold" style={{ fontSize:"clamp(2rem,5vw,3rem)", color:"#fff" }}>
            My <span className="g-text-2">Tech Arsenal</span>
          </h2>
          <p className="text-sm sm:text-base mt-3 mx-auto" style={{ color:"#64748B", maxWidth:480 }}>
            Cutting-edge tools I use to build world-class products
          </p>
        </motion.div>
      </div>

      {/* Row 1 — forward */}
      <div className="relative mb-4 overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background:"linear-gradient(90deg,#111111,transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background:"linear-gradient(-90deg,#111111,transparent)" }} />
        <div className="flex gap-3 anim-marquee" style={{ width:"max-content" }}>
          {row1.map((t,i) => <Chip key={i} t={t} i={i} />)}
        </div>
      </div>

      {/* Row 2 — reverse */}
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background:"linear-gradient(90deg,#111111,transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background:"linear-gradient(-90deg,#111111,transparent)" }} />
        <div className="flex gap-3 anim-marquee-r" style={{ width:"max-content" }}>
          {row2.map((t,i) => <Chip key={i} t={t} i={i} />)}
        </div>
      </div>
    </section>
  );
}

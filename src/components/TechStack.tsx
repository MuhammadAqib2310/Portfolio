"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const techs = [
  { name:"Next.js",      color:"#1E3A5F" },
  { name:"TypeScript",   color:"#2563EB" },
  { name:"Python",       color:"#C9A227" },
  { name:"OpenAI",       color:"#059669" },
  { name:"LangChain",    color:"#92740D" },
  { name:"React",        color:"#2563EB" },
  { name:"Node.js",      color:"#059669" },
  { name:"FastAPI",      color:"#0891B2" },
  { name:"PostgreSQL",   color:"#1E3A5F" },
  { name:"MongoDB",      color:"#059669" },
  { name:"Redis",        color:"#DC2626" },
  { name:"AWS",          color:"#C9A227" },
  { name:"Docker",       color:"#2563EB" },
  { name:"Supabase",     color:"#059669" },
  { name:"Prisma",       color:"#1E3A5F" },
  { name:"Tailwind",     color:"#0891B2" },
  { name:"GraphQL",      color:"#9333EA" },
  { name:"Kubernetes",   color:"#2563EB" },
  { name:"ElevenLabs",   color:"#92740D" },
  { name:"Whisper",      color:"#059669" },
  { name:"LlamaIndex",   color:"#C9A227" },
  { name:"Framer",       color:"#1E3A5F" },
];

const row1 = [...techs.slice(0,11), ...techs.slice(0,11)];
const row2 = [...techs.slice(11),   ...techs.slice(11)];

function Chip({ t, i }: { t:typeof techs[0]; i:number }) {
  return (
    <motion.div key={i}
      whileHover={{ scale:1.1, y:-4 }}
      transition={{ type:"spring", stiffness:400, damping:14 }}
      className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold cursor-default select-none"
      style={{ background:`${t.color}0E`, border:`1px solid ${t.color}22`, color:t.color }}>
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background:t.color }} />
      {t.name}
    </motion.div>
  );
}

export default function TechStack() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-60px" });

  return (
    <section id="tech" ref={ref} className="section-pad relative overflow-hidden"
      style={{ background:"linear-gradient(180deg, #FAFAF7 0%, #F4F3EE 100%)" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div style={{
          position: "absolute", borderRadius: "50%",
          width: "clamp(400px,50vw,700px)", height: "clamp(200px,25vw,350px)",
          top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          background: "radial-gradient(ellipse, rgba(201,162,39,0.08), transparent 65%)",
          filter: "blur(70px)", animation: "aurora 20s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", borderRadius: "50%", width: 350, height: 300,
          top: "10%", left: "5%",
          background: "radial-gradient(ellipse, rgba(30,58,95,0.06), transparent 70%)",
          filter: "blur(60px)", animation: "bgOrb1 16s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", borderRadius: "50%", width: 300, height: 250,
          bottom: "10%", right: "5%",
          background: "radial-gradient(ellipse, rgba(201,162,39,0.06), transparent 70%)",
          filter: "blur(60px)", animation: "bgOrb2 19s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(30,58,95,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(30,58,95,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 80%)",
        }} />
      </div>

      <div className="wrap mb-12">
        <motion.div
          initial={{ opacity:0, y:28 }} animate={inView?{ opacity:1, y:0 }:{}} transition={{ duration:.65 }}
          className="text-center">
          <span className="sec-label" style={{ color:"#C9A227" }}>Technologies</span>
          <h2 className="font-bold" style={{ fontSize:"clamp(2rem,5vw,3rem)", color:"#0F172A" }}>
            My <span className="g-text-2">Tech Arsenal</span>
          </h2>
          <p className="text-sm sm:text-base mt-3 mx-auto" style={{ color:"#475569", maxWidth:480 }}>
            Cutting-edge tools I use to build world-class products
          </p>
        </motion.div>
      </div>

      {/* Row 1 */}
      <div className="relative mb-4 overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background:"linear-gradient(90deg,#FAFAF7,transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background:"linear-gradient(-90deg,#FAFAF7,transparent)" }} />
        <div className="flex gap-3 anim-marquee" style={{ width:"max-content" }}>
          {row1.map((t,i) => <Chip key={i} t={t} i={i} />)}
        </div>
      </div>

      {/* Row 2 */}
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background:"linear-gradient(90deg,#F4F3EE,transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background:"linear-gradient(-90deg,#F4F3EE,transparent)" }} />
        <div className="flex gap-3 anim-marquee-r" style={{ width:"max-content" }}>
          {row2.map((t,i) => <Chip key={i} t={t} i={i} />)}
        </div>
      </div>
    </section>
  );
}

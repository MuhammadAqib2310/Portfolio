"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { testimonials } from "@/lib/utils";

const avatarGrads = [
  "linear-gradient(135deg,#6C63FF,#00E5FF)",
  "linear-gradient(135deg,#00E5FF,#8B5CF6)",
  "linear-gradient(135deg,#8B5CF6,#EF4444)",
  "linear-gradient(135deg,#F59E0B,#22C55E)",
];

export default function Testimonials() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });

  return (
    <section id="testimonials" ref={ref} className="section-pad relative overflow-hidden" style={{ background:"linear-gradient(180deg, #0B0E20 0%, #0D1228 100%)" }}>
      <div className="absolute pointer-events-none rounded-full"
        style={{ width:600, height:300, top:"20%", left:"50%", transform:"translateX(-50%)",
          background:"radial-gradient(ellipse,rgba(34,197,94,0.06),transparent 65%)", filter:"blur(70px)" }} />

      <div className="wrap">
        <motion.div
          initial={{ opacity:0, y:28 }} animate={inView?{ opacity:1, y:0 }:{}} transition={{ duration:.65 }}
          className="text-center mb-14">
          <span className="sec-label" style={{ color:"var(--green)" }}>Social Proof</span>
          <h2 className="font-bold" style={{ fontSize:"clamp(2rem,5vw,3rem)", color:"#fff" }}>
            Client <span className="g-text">Testimonials</span>
          </h2>
          <p className="text-sm sm:text-base mt-3 mx-auto" style={{ color:"#6B7280", maxWidth:420 }}>
            What world-class clients say about working with me
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
          {testimonials.map((t, i) => (
            <motion.div key={t.name}
              initial={{ opacity:0, y:40 }}
              animate={inView?{ opacity:1, y:0 }:{}}
              transition={{ duration:.55, delay:i*.09, ease:"easeOut" as const }}
              whileHover={{ y:-5, borderColor:"rgba(34,197,94,0.25)", boxShadow:"0 20px 60px rgba(34,197,94,0.07)" }}
              className="card p-6 sm:p-7 flex flex-col transition-all duration-300">

              {/* Top: quote + stars */}
              <div className="flex items-start justify-between mb-4">
                <span className="text-4xl leading-none select-none opacity-25" style={{ color:"#22C55E" }}>&ldquo;</span>
                <div className="flex gap-0.5">
                  {Array.from({ length:t.rating }).map((_,s) => (
                    <span key={s} className="text-sm" style={{ color:"#F59E0B" }}>★</span>
                  ))}
                </div>
              </div>

              <p className="text-sm leading-relaxed flex-1 mb-6" style={{ color:"#9CA3AF" }}>{t.text}</p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4" style={{ borderTop:"1px solid rgba(255,255,255,0.06)" }}>
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-xs font-black flex-shrink-0"
                  style={{ background:avatarGrads[i % avatarGrads.length], color:"#fff" }}>
                  {t.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold truncate" style={{ color:"#fff" }}>{t.name}</div>
                  <div className="text-xs truncate" style={{ color:"#6B7280" }}>{t.role}</div>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background:"#22C55E" }} />
                  <span className="text-[10px] font-semibold" style={{ color:"#22C55E" }}>Verified</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const experiences = [
  {
    role:"Senior AI Engineer & Full Stack Developer",
    company:"Freelance / Self-Employed",
    period:"2022 – Present",
    desc:"Building production AI agents, SaaS platforms, and automation systems for startups and enterprises globally. Delivered 50+ projects with 99%+ client satisfaction.",
    tags:["AI Agents","LangChain","Next.js","Python","OpenAI"],
    color:"#6C63FF", icon:"🤖",
  },
  {
    role:"AI & Automation Specialist",
    company:"Tech Consultancy",
    period:"2021 – 2022",
    desc:"Designed and deployed intelligent workflow automation systems that reduced client operational costs by 45%. Integrated cutting-edge LLMs into existing enterprise software.",
    tags:["LLM Integration","FastAPI","React","AWS","Docker"],
    color:"#00E5FF", icon:"⚡",
  },
  {
    role:"Full Stack Developer",
    company:"SaaS Startup",
    period:"2020 – 2021",
    desc:"Developed multi-tenant SaaS applications with real-time features using React and Node.js. Architected databases and APIs serving 10K+ daily active users.",
    tags:["React","Node.js","PostgreSQL","Redis","Stripe"],
    color:"#8B5CF6", icon:"🚀",
  },
];

export default function Experience() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });

  return (
    <section id="experience" ref={ref} className="section-pad relative overflow-hidden" style={{ background:"linear-gradient(180deg, #0D1428 0%, #0B0E20 100%)" }}>
      <div className="absolute pointer-events-none rounded-full"
        style={{ width:500, height:500, top:"30%", right:"-12%",
          background:"radial-gradient(circle,rgba(139,92,246,0.07),transparent 65%)", filter:"blur(80px)" }} />

      <div className="wrap">
        <motion.div
          initial={{ opacity:0, y:28 }} animate={inView?{ opacity:1, y:0 }:{}} transition={{ duration:.65 }}
          className="text-center mb-14">
          <span className="sec-label" style={{ color:"var(--violet)" }}>Career</span>
          <h2 className="font-bold" style={{ fontSize:"clamp(2rem,5vw,3rem)", color:"#fff" }}>
            Work <span className="g-text">Experience</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          {/* Vertical line */}
          <div className="hidden sm:block absolute top-8 bottom-8 w-[2px] rounded-full"
            style={{ left:"22px", background:"linear-gradient(to bottom,#6C63FF88,#00E5FF88,transparent)" }} />

          <div className="space-y-6 sm:space-y-8">
            {experiences.map((exp, i) => (
              <motion.div key={exp.role}
                initial={{ opacity:0, x:-30 }}
                animate={inView?{ opacity:1, x:0 }:{}}
                transition={{ duration:.6, delay:i*.14, ease:"easeOut" as const }}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6">

                {/* Dot */}
                <div className="hidden sm:flex flex-shrink-0 items-start pt-1">
                  <motion.div whileHover={{ scale:1.15 }}
                    className="w-11 h-11 rounded-2xl flex items-center justify-center text-lg flex-shrink-0"
                    style={{ background:`${exp.color}18`, border:`2px solid ${exp.color}50` }}>
                    {exp.icon}
                  </motion.div>
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ borderColor:`${exp.color}40`, boxShadow:`0 16px 50px ${exp.color}12` }}
                  className="flex-1 card p-5 sm:p-6 transition-all duration-300">
                  {/* Mobile icon + period */}
                  <div className="flex items-center gap-3 mb-3 sm:hidden">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base"
                      style={{ background:`${exp.color}18`, border:`1.5px solid ${exp.color}50` }}>
                      {exp.icon}
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full font-bold"
                      style={{ background:`${exp.color}18`, color:exp.color }}>
                      {exp.period}
                    </span>
                  </div>

                  <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
                    <h3 className="text-sm sm:text-base font-bold" style={{ color:"#fff" }}>{exp.role}</h3>
                    <span className="hidden sm:block text-xs px-3 py-1 rounded-full font-bold flex-shrink-0"
                      style={{ background:`${exp.color}16`, color:exp.color }}>
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold mb-3" style={{ color:exp.color }}>{exp.company}</p>
                  <p className="text-xs sm:text-sm leading-relaxed mb-4" style={{ color:"#6B7280" }}>{exp.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map(t => (
                      <span key={t} className="px-2.5 py-1 rounded-lg text-[11px] font-semibold"
                        style={{ background:"rgba(255,255,255,0.05)", color:"#9CA3AF", border:"1px solid rgba(255,255,255,0.07)" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

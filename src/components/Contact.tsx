"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

// ─── EmailJS Config ───────────────────────────────
// Sign up free at emailjs.com → get these 3 IDs
const EMAILJS_SERVICE_ID  = "service_aqib";     // replace with yours
const EMAILJS_TEMPLATE_ID = "template_contact"; // replace with yours
const EMAILJS_PUBLIC_KEY  = "YOUR_PUBLIC_KEY";  // replace with yours
// ──────────────────────────────────────────────────

const info = [
  { icon: "📧", label: "Email",    value: "aqibm8123@gmail.com", href: "mailto:aqibm8123@gmail.com" },
  { icon: "📱", label: "Phone",    value: "+92 337 501 3984",     href: "tel:+923375013984" },
  { icon: "📍", label: "Location", value: "Multan, Pakistan",     href: null },
  { icon: "⏱️", label: "Response", value: "Within 24 hours",      href: null },
];

type FormState = { name: string; email: string; subject: string; message: string };
type Errors    = Partial<FormState>;

export default function Contact() {
  const ref    = useRef<HTMLElement>(null);
  const formEl = useRef<HTMLFormElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [form, setForm]       = useState<FormState>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors]   = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent]       = useState(false);
  const [sendErr, setSendErr] = useState("");

  /* ── Validation ── */
  const validate = (): Errors => {
    const e: Errors = {};
    if (!form.name.trim())   e.name    = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (form.message.trim().length < 20) e.message = "Min 20 characters";
    return e;
  };

  /* ── Submit ── */
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setSending(true);
    setSendErr("");

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formEl.current!,
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setSendErr("Failed to send. Please email directly at aqibm8123@gmail.com");
    } finally {
      setSending(false);
    }
  };

  /* ── Shared input style ── */
  const inputBase: React.CSSProperties = {
    width: "100%",
    padding: "0.75rem 1rem",
    borderRadius: "0.875rem",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#fff",
    fontSize: "0.875rem",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  const focus  = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = "rgba(37,99,235,0.5)";
    e.target.style.boxShadow   = "0 0 0 3px rgba(37,99,235,0.1)";
  };
  const blur   = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>, id: string) => {
    e.target.style.borderColor = errors[id as keyof Errors] ? "#EF4444" : "rgba(255,255,255,0.08)";
    e.target.style.boxShadow   = "none";
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="section-pad relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #162032 0%, #0F172A 100%)" }}
    >
      {/* BG glow */}
      <div className="absolute pointer-events-none rounded-full"
        style={{ width: 700, height: 700, top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          background: "radial-gradient(circle, rgba(37,99,235,0.07), transparent 65%)", filter: "blur(100px)" }} />

      <div className="wrap">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="text-center mb-14"
        >
          <span className="sec-label" style={{ color: "#2563EB" }}>Get In Touch</span>
          <h2 style={{ fontSize: "clamp(2rem,5vw,3rem)", color: "#fff" }}>
            Let&apos;s <span className="g-text">Build Together</span>
          </h2>
          <p className="text-sm sm:text-base mt-3 mx-auto" style={{ color: "#64748B", maxWidth: 480 }}>
            Have a project in mind? Let&apos;s discuss how AI and modern web tech can transform your business.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 xl:gap-14" style={{ maxWidth: 1000, margin: "0 auto" }}>

          {/* ── Info side ── */}
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            <div>
              <h3 className="font-bold mb-3" style={{ fontSize: "clamp(1.2rem,3vw,1.5rem)", color: "#fff" }}>
                Ready to level up with AI?
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#64748B" }}>
                I work with startups and enterprises to build AI-powered solutions that create real competitive advantages.
              </p>
            </div>

            {info.map(({ icon, label, value, href }) => (
              <motion.div
                key={label}
                whileHover={{ x: 4 }}
                className="card flex items-center gap-4"
                style={{ padding: "1rem" }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                  style={{ background: "rgba(37,99,235,0.14)", border: "1px solid rgba(37,99,235,0.25)" }}>
                  {icon}
                </div>
                <div>
                  <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#334155" }}>
                    {label}
                  </div>
                  {href ? (
                    <a href={href} className="text-sm font-semibold hover:underline" style={{ color: "#B4B8D4" }}>
                      {value}
                    </a>
                  ) : (
                    <span className="text-sm font-semibold" style={{ color: "#B4B8D4" }}>{value}</span>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Available badge */}
            <div className="flex items-center gap-3 rounded-2xl"
              style={{ padding: "1rem", background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.2)" }}>
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ background: "#22C55E", boxShadow: "0 0 8px #22C55E", animation: "pulse-glow 2s ease-in-out infinite" }} />
              <span className="text-sm font-bold" style={{ color: "#22C55E" }}>Available for new projects</span>
            </div>
          </motion.div>

          {/* ── Form side ── */}
          <motion.div
            initial={{ opacity: 0, x: 36 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.25, ease: "easeOut" }}
            className="lg:col-span-3"
          >
            {sent ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center justify-center text-center rounded-3xl"
                style={{ padding: "3rem 2rem", minHeight: 360,
                  background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.2)" }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.1 }}
                  style={{ fontSize: "3.5rem", marginBottom: "1.25rem" }}
                >
                  ✅
                </motion.div>
                <h3 className="font-bold mb-2" style={{ fontSize: "1.25rem", color: "#22C55E" }}>Message Sent!</h3>
                <p className="text-sm" style={{ color: "#64748B" }}>I&apos;ll get back to you within 24 hours.</p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 text-sm font-semibold"
                  style={{ padding: "0.625rem 1.5rem", borderRadius: "0.875rem",
                    background: "rgba(255,255,255,0.06)", color: "#94A3B8",
                    border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <form
                ref={formEl}
                onSubmit={submit}
                className="rounded-3xl space-y-4"
                style={{ padding: "2rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                {/* Name + Email row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {(["name", "email"] as const).map(id => (
                    <div key={id}>
                      <label
                        className="block font-bold mb-2"
                        style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#64748B" }}
                      >
                        {id === "name" ? "Full Name" : "Email"}
                      </label>
                      <input
                        type={id === "email" ? "email" : "text"}
                        name={id}
                        placeholder={id === "name" ? "Your full name" : "your@email.com"}
                        value={form[id]}
                        onChange={e => { setForm(p => ({ ...p, [id]: e.target.value })); setErrors(p => ({ ...p, [id]: "" })); }}
                        style={{ ...inputBase, borderColor: errors[id] ? "#EF4444" : "rgba(255,255,255,0.08)" }}
                        onFocus={focus}
                        onBlur={e => blur(e, id)}
                      />
                      {errors[id] && <p style={{ fontSize: "0.7rem", color: "#EF4444", marginTop: "0.375rem" }}>⚠ {errors[id]}</p>}
                    </div>
                  ))}
                </div>

                {/* Subject */}
                <div>
                  <label
                    className="block font-bold mb-2"
                    style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#64748B" }}
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Project discussion"
                    value={form.subject}
                    onChange={e => { setForm(p => ({ ...p, subject: e.target.value })); setErrors(p => ({ ...p, subject: "" })); }}
                    style={{ ...inputBase, borderColor: errors.subject ? "#EF4444" : "rgba(255,255,255,0.08)" }}
                    onFocus={focus}
                    onBlur={e => blur(e, "subject")}
                  />
                  {errors.subject && <p style={{ fontSize: "0.7rem", color: "#EF4444", marginTop: "0.375rem" }}>⚠ {errors.subject}</p>}
                </div>

                {/* Message */}
                <div>
                  <label
                    className="block font-bold mb-2"
                    style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#64748B" }}
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Tell me about your project, goals, and timeline..."
                    value={form.message}
                    onChange={e => { setForm(p => ({ ...p, message: e.target.value })); setErrors(p => ({ ...p, message: "" })); }}
                    style={{ ...inputBase, resize: "none", borderColor: errors.message ? "#EF4444" : "rgba(255,255,255,0.08)" }}
                    onFocus={focus}
                    onBlur={e => blur(e, "message")}
                  />
                  {errors.message && <p style={{ fontSize: "0.7rem", color: "#EF4444", marginTop: "0.375rem" }}>⚠ {errors.message}</p>}
                </div>

                {/* Error message */}
                {sendErr && (
                  <p className="text-sm" style={{ color: "#EF4444", padding: "0.75rem 1rem", borderRadius: "0.75rem", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
                    {sendErr}
                  </p>
                )}

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={sending}
                  whileHover={{ scale: sending ? 1 : 1.02, boxShadow: sending ? "none" : "0 0 40px rgba(37,99,235,0.45)" }}
                  whileTap={{ scale: sending ? 1 : 0.98 }}
                  className="w-full font-bold text-sm flex items-center justify-center gap-2 text-white"
                  style={{
                    padding: "0.9rem",
                    borderRadius: "0.875rem",
                    background: sending ? "rgba(37,99,235,0.5)" : "linear-gradient(135deg, #2563EB, #38BDF8)",
                    cursor: sending ? "not-allowed" : "none",
                  }}
                >
                  {sending ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message →"
                  )}
                </motion.button>

                <p className="text-center text-xs" style={{ color: "#334155" }}>
                  🔒 Your information is kept private and never shared.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

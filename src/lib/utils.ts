import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const projects = [
  {
    id: 1,
    title: "AI Weather Platform",
    category: "AI",
    description: "Real-time AI-powered weather forecasting with natural language queries, predictive analytics, and hyper-local precision.",
    image: "/projects/weather.jpg",
    features: ["Natural Language Queries", "Hyper-local Forecasting", "Predictive Analytics", "Real-time Data"],
    tech: ["Next.js", "OpenAI", "Python", "FastAPI", "PostgreSQL"],
    demo: "https://weather-web-ruby-psi.vercel.app/",
    github: "https://github.com/MuhammadAqib2310/Portfolio",
    metrics: { score: "98/100", type: "AI + Web", status: "Live ✓" },
  },
  {
    id: 2,
    title: "BrainGrid Dashboard",
    category: "SaaS",
    description: "Multi-tenant enterprise analytics dashboard with real-time data visualization, role-based access control, and AI insights.",
    image: "/projects/dashboard.jpg",
    features: ["Multi-tenant Architecture", "Real-time Analytics", "RBAC System", "AI Insights"],
    tech: ["React", "TypeScript", "Node.js", "Redis", "MongoDB"],
    demo: "https://braingrid.vercel.app/dashboard",
    github: "https://github.com/MuhammadAqib2310/Portfolio",
    metrics: { score: "96/100", type: "SaaS", status: "Live ✓" },
  },
  {
    id: 3,
    title: "Qrypta AI",
    category: "AI",
    description: "Advanced AI encryption and data security platform with intelligent threat detection and automated compliance reporting.",
    image: "/projects/qrypta.jpg",
    features: ["AI Threat Detection", "Auto Encryption", "Compliance Reports", "Zero Trust Security"],
    tech: ["Python", "TensorFlow", "Next.js", "AWS", "Blockchain"],
    demo: "https://github.com/MuhammadAqib2310/Portfolio",
    github: "https://github.com/MuhammadAqib2310/Portfolio",
    metrics: { score: "99/100", type: "AI Security", status: "Built ✓" },
  },
  {
    id: 4,
    title: "Nexora AI",
    category: "AI Agent",
    description: "Autonomous AI agent platform for business process automation with multi-model orchestration and workflow intelligence.",
    image: "/projects/nexora.jpg",
    features: ["Multi-Agent Orchestration", "Auto Workflow", "LLM Integration", "Real-time Processing"],
    tech: ["LangChain", "OpenAI", "FastAPI", "React", "Celery"],
    demo: "https://nexora-ai-ten-mu.vercel.app/",
    github: "https://github.com/MuhammadAqib2310/Portfolio",
    metrics: { score: "97/100", type: "AI Agent", status: "Live ✓" },
  },
  {
    id: 5,
    title: "AI Receptionist",
    category: "AI Agent",
    description: "Intelligent virtual receptionist with voice, chat, and email handling powered by conversational AI and CRM integration.",
    image: "/projects/receptionist.jpg",
    features: ["Voice AI", "Multi-channel Support", "CRM Integration", "24/7 Availability"],
    tech: ["OpenAI", "Twilio", "Next.js", "Prisma", "PostgreSQL"],
    demo: "https://github.com/MuhammadAqib2310/Portfolio",
    github: "https://github.com/MuhammadAqib2310/Portfolio",
    metrics: { score: "95/100", type: "Voice AI", status: "Built ✓" },
  },
  {
    id: 6,
    title: "AI CRM",
    category: "SaaS",
    description: "Next-gen AI-powered CRM with predictive lead scoring, automated follow-ups, and intelligent sales forecasting.",
    image: "/projects/crm.jpg",
    features: ["Predictive Lead Scoring", "Auto Follow-ups", "Sales Forecasting", "Pipeline AI"],
    tech: ["Next.js", "TypeScript", "OpenAI", "Supabase", "Stripe"],
    demo: "https://github.com/MuhammadAqib2310/Portfolio",
    github: "https://github.com/MuhammadAqib2310/Portfolio",
    metrics: { score: "94/100", type: "SaaS + AI", status: "Built ✓" },
  },
  {
    id: 7,
    title: "Voice AI Agent",
    category: "AI Agent",
    description: "Ultra-low latency voice AI agent with real-time speech synthesis, emotion detection, and multi-language support.",
    image: "/projects/voice.jpg",
    features: ["Ultra-low Latency", "Emotion Detection", "Multi-language", "Real-time Synthesis"],
    tech: ["ElevenLabs", "Whisper", "FastAPI", "WebRTC", "Redis"],
    demo: "https://github.com/MuhammadAqib2310/Portfolio",
    github: "https://github.com/MuhammadAqib2310/Portfolio",
    metrics: { score: "98/100", type: "Voice AI", status: "Built ✓" },
  },
  {
    id: 8,
    title: "Custom SaaS Platform",
    category: "SaaS",
    description: "Fully white-labeled SaaS platform with multi-tenancy, billing, team management, and API marketplace.",
    image: "/projects/saas.jpg",
    features: ["White-label Ready", "Multi-tenancy", "Stripe Billing", "API Marketplace"],
    tech: ["Next.js", "TypeScript", "Prisma", "Stripe", "AWS"],
    demo: "https://github.com/MuhammadAqib2310/Portfolio",
    github: "https://github.com/MuhammadAqib2310/Portfolio",
    metrics: { score: "96/100", type: "SaaS", status: "Built ✓" },
  },
];

export const services = [
  { icon: "🤖", title: "AI Agents", desc: "Autonomous AI agents that think, decide, and execute complex tasks without human intervention." },
  { icon: "⚡", title: "Workflow Automation", desc: "End-to-end business process automation with intelligent orchestration and real-time monitoring." },
  { icon: "🚀", title: "SaaS Development", desc: "Production-ready SaaS platforms with multi-tenancy, billing, and enterprise-grade security." },
  { icon: "🧠", title: "LLM Integration", desc: "Seamless integration of GPT-4, Claude, Gemini, and custom fine-tuned models into your products." },
  { icon: "💬", title: "Voice AI", desc: "Human-like voice AI systems with real-time synthesis, emotion detection, and multi-language support." },
  { icon: "📊", title: "Data Engineering", desc: "Real-time data pipelines, analytics dashboards, and predictive modeling at enterprise scale." },
];

export const techStack = [
  { name: "Next.js", level: 95 },
  { name: "TypeScript", level: 92 },
  { name: "Python", level: 90 },
  { name: "OpenAI API", level: 95 },
  { name: "LangChain", level: 88 },
  { name: "React", level: 93 },
  { name: "Node.js", level: 89 },
  { name: "FastAPI", level: 87 },
  { name: "PostgreSQL", level: 85 },
  { name: "AWS", level: 82 },
  { name: "Docker", level: 84 },
  { name: "Supabase", level: 90 },
];

// kept for backward compat — Testimonials section not shown
export const testimonials: { name: string; role: string; avatar: string; text: string; rating: number }[] = [];

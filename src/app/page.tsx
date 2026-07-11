"use client";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Services from "@/components/Services";
import WhyMe from "@/components/WhyMe";
import Projects from "@/components/Projects";
import Process from "@/components/Process";
import Experience from "@/components/Experience";


import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SocialProof from "@/components/SocialProof";

const Cursor           = dynamic(() => import("@/components/Cursor"),           { ssr: false });
const LoadingScreen    = dynamic(() => import("@/components/LoadingScreen"),    { ssr: false });
const SmoothScroll     = dynamic(() => import("@/components/SmoothScroll"),     { ssr: false });
const ThemePicker      = dynamic(() => import("@/components/ThemePicker"),      { ssr: false });
const FloatingWhatsApp = dynamic(() => import("@/components/FloatingWhatsApp"), { ssr: false });
const ScrollProgress   = dynamic(() => import("@/components/ScrollProgress"),   { ssr: false });

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <LoadingScreen />
      <Cursor />
      <ThemePicker />
      <FloatingWhatsApp />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <About />
        <TechStack />
        <Services />
        <WhyMe />
        <Projects />
        <Process />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

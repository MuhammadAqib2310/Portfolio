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
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Cursor       = dynamic(() => import("@/components/Cursor"),        { ssr: false });
const LoadingScreen = dynamic(() => import("@/components/LoadingScreen"), { ssr: false });
const SmoothScroll  = dynamic(() => import("@/components/SmoothScroll"),  { ssr: false });

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <LoadingScreen />
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <TechStack />
        <Services />
        <WhyMe />
        <Projects />
        <Process />
        <Experience />
        <Testimonials />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

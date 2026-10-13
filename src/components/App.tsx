"use client";

import { ScrollProvider } from "@/lib/scroll";
import { useScrollProgress } from "@/lib/hooks";
import Navigation from "@/components/Navigation";
import Hero from "@/components/hero/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Work from "@/components/sections/Work";
import Experience from "@/components/sections/Experience";
import Certifications from "@/components/sections/Certifications";
import Contact from "@/components/sections/Contact";

export default function App() {
  const scrollProgress = useScrollProgress();

  return (
    <ScrollProvider>
      <Navigation scrollProgress={scrollProgress} />
      <main className="relative w-full">
        <Hero />
        <About />
        <Skills />
        <Work />
        <Experience />
        <Certifications />
        <Contact />
      </main>
    </ScrollProvider>
  );
}

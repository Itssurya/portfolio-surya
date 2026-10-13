"use client";

import { useEffect, createContext, useContext, ReactNode } from "react";
import Lenis from "lenis";

const ScrollContext = createContext<Lenis | null>(null);

export function ScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <ScrollContext.Provider value={null}>{children}</ScrollContext.Provider>;
}

export function scrollToTarget(targetId: string) {
  const element = document.getElementById(targetId);
  if (!element) return;
  element.scrollIntoView({ behavior: "smooth" });
}

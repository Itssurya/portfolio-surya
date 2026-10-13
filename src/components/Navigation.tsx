"use client";

import { useState, useEffect } from "react";
import { NAV, PROFILE } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";

export default function Navigation({ scrollProgress }: { scrollProgress: number }) {
  const [activeSection, setActiveSection] = useState<string>("about");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      rootMargin: "-45% 0px -50% 0px",
      threshold: 0,
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    NAV.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    scrollToTarget(id);
  };

  return (
    <>
      {/* 2px Ink Scroll Progress Bar at very top */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-[rgba(13,13,13,0.1)] z-50 pointer-events-none">
        <div
          className="h-full bg-[#0d0d0d] transition-all duration-150 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
        />
      </div>

      {/* Main Header / Nav Container */}
      <header className="fixed top-5 left-0 right-0 z-40 px-[var(--gutter)] pointer-events-none">
        <div className="max-w-[1320px] mx-auto flex items-center justify-between">
          {/* Left: Initials Mark + Full Name */}
          <div className="pointer-events-auto flex items-center gap-3">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className={`w-9 h-9 rounded-full border border-[rgba(13,13,13,0.2)] flex items-center justify-center font-mono font-bold text-xs transition-all duration-300 transform hover:rotate-[360deg] ${
                isScrolled ? "bg-[#0d0d0d] text-[#ffffff] border-[#0d0d0d]" : "bg-white/80 text-[#0d0d0d] backdrop-blur-md"
              }`}
              aria-label="Scroll to top"
            >
              {PROFILE.initials}
            </button>
            <span
              className={`font-sans font-semibold text-sm tracking-tight transition-opacity duration-300 hidden sm:inline ${
                isScrolled ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              {PROFILE.name}
            </span>
          </div>

          {/* Centre/Right Nav Links (positioned before top-right sound button) */}
          <nav
            aria-label="Main Navigation"
            className={`hidden md:flex pointer-events-auto items-center p-1 rounded-full mr-16 transition-all duration-300 ${
              isScrolled
                ? "bg-white/85 backdrop-blur-md border border-[rgba(13,13,13,0.1)] shadow-sm"
                : "bg-white/60 border border-[rgba(13,13,13,0.06)]"
            }`}
          >
            {NAV.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-1.5 text-xs font-mono tracking-wider transition-colors duration-200 z-10 ${
                    isActive ? "text-white font-bold" : "text-[#77756f] hover:text-[#0d0d0d]"
                  }`}
                >
                  {isActive && (
                    <span className="absolute inset-0 bg-[#0d0d0d] rounded-full z-[-1] transition-all duration-300" />
                  )}
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden pointer-events-auto mr-12 px-3.5 py-1.5 rounded-full bg-white/90 border border-[rgba(13,13,13,0.1)] backdrop-blur-md text-xs font-mono uppercase tracking-wider text-[#0d0d0d] shadow-sm active:scale-95"
            aria-label="Open menu"
          >
            Menu
          </button>
        </div>
      </header>

      {/* Mobile Fullscreen Paper Overlay */}
      <div
        className={`fixed inset-0 bg-[#f4f2ee] z-50 flex flex-col justify-between p-8 transition-all duration-500 ease-out md:hidden ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto clip-path-open" : "opacity-0 pointer-events-none clip-path-closed"
        }`}
        style={{
          clipPath: mobileMenuOpen ? "circle(150% at 90% 5%)" : "circle(0% at 90% 5%)",
        }}
      >
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-full border border-[#0d0d0d] flex items-center justify-center font-mono font-medium text-sm bg-[#0d0d0d] text-white">
            {PROFILE.initials}
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="w-10 h-10 rounded-full border border-[rgba(13,13,13,0.15)] flex items-center justify-center text-lg font-mono text-[#0d0d0d] bg-white"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <nav aria-label="Mobile Navigation" className="flex flex-col gap-6 my-auto">
          {NAV.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="group flex items-baseline gap-4 text-left transition-transform active:scale-98"
            >
              <span className="font-mono text-sm text-[#77756f]">0{idx + 1}</span>
              <span className="font-sans font-extrabold text-4xl tracking-tight text-[#0d0d0d] group-hover:underline">
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        <div className="flex flex-col gap-2 pt-6 border-t border-[rgba(13,13,13,0.1)] font-mono text-xs text-[#77756f]">
          <span>{PROFILE.name} — {PROFILE.role}</span>
          <a href={`mailto:${PROFILE.email}`} className="text-[#0d0d0d] underline">{PROFILE.email}</a>
        </div>
      </div>
    </>
  );
}

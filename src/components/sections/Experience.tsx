"use client";

import { useRef, useEffect, useState } from "react";
import { EXPERIENCE, EDUCATION } from "@/lib/data";

export default function Experience() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const totalHeight = rect.height;
      const currentScroll = windowHeight - rect.top;
      const progress = Math.min(1, Math.max(0, currentScroll / (totalHeight + windowHeight / 3)));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const exp = EXPERIENCE[0];
  const edu = EDUCATION[0];

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="py-24 px-[var(--gutter)] border-t border-[rgba(13,13,13,0.08)] bg-[#f4f2ee] overflow-hidden"
    >
      <div className="max-w-[1320px] mx-auto">
        <span className="section-tag">04 — Path & growth</span>
        <h2 className="section-heading mb-20">
          Experience & education<span className="heading-accent">.</span>
        </h2>

        {/* Timeline Container with Center Spine Line */}
        <div className="relative max-w-5xl mx-auto">
          
          {/* Center Vertical Line (Desktop: center, Mobile: left-6) */}
          <div className="absolute top-0 bottom-0 left-6 md:left-1/2 md:-translate-x-1/2 w-[2px] bg-[rgba(13,13,13,0.1)]">
            <div
              className="w-full bg-[#0d0d0d] transition-all duration-150 ease-out"
              style={{ height: `${scrollProgress * 100}%` }}
            />
          </div>

          <div className="space-y-16 md:space-y-24">
            
            {/* ITEM 1: EXPERIENCE (LEFT SIDE ON DESKTOP) */}
            <div className="relative flex flex-col md:flex-row items-center">
              
              {/* Card (Left on Desktop) */}
              <div className="w-full md:w-1/2 pl-14 md:pl-0 md:pr-12">
                <div className="bg-white rounded-[28px] border border-[rgba(13,13,13,0.1)] p-8 shadow-sm transition-shadow hover:shadow-md relative">
                  
                  {/* Top Kicker & Date */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-[11px] uppercase tracking-wider font-bold text-[#0d0d0d] bg-[#f4f2ee] px-3 py-1 rounded-full">
                      EXPERIENCE
                    </span>
                    <span className="font-mono text-xs text-[#77756f]">
                      {exp.period}
                    </span>
                  </div>

                  <h3 className="font-sans font-extrabold text-2xl text-[#0d0d0d] mb-1">
                    {exp.role}
                  </h3>
                  <div className="font-mono text-xs text-[#77756f] uppercase tracking-wider mb-6">
                    {exp.company} • {exp.location}
                  </div>

                  <ul className="space-y-2.5 font-sans text-xs text-[#3a3a3a] leading-relaxed">
                    {exp.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="font-mono text-[#0d0d0d] font-bold mt-0.5">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Center Node Dot & Giant Year (2024) */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none">
                <div className="w-5 h-5 rounded-full bg-white border-2 border-[#0d0d0d] flex items-center justify-center shadow-sm z-10">
                  <div className="w-2 h-2 rounded-full bg-[#0d0d0d] animate-pulse" />
                </div>
                {/* Giant Year Number next to node (Right side of dot for Item 1) */}
                <span className="hidden md:block absolute left-8 font-sans font-extrabold text-4xl sm:text-5xl text-[#0d0d0d] tracking-tighter opacity-90">
                  2024
                </span>
              </div>

              {/* Empty Right Column for Grid Balance */}
              <div className="hidden md:block w-1/2" />
            </div>

            {/* ITEM 2: EDUCATION (RIGHT SIDE ON DESKTOP) */}
            <div className="relative flex flex-col md:flex-row items-center">
              
              {/* Empty Left Column for Grid Balance */}
              <div className="hidden md:block w-1/2" />

              {/* Center Node Dot & Giant Year (2023) */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none">
                <div className="w-5 h-5 rounded-full bg-white border-2 border-[#0d0d0d] flex items-center justify-center shadow-sm z-10">
                  <div className="w-2 h-2 rounded-full bg-[#0d0d0d]" />
                </div>
                {/* Giant Year Number next to node (Left side of dot for Item 2) */}
                <span className="hidden md:block absolute right-8 font-sans font-extrabold text-4xl sm:text-5xl text-[#0d0d0d] tracking-tighter opacity-90">
                  2023
                </span>
              </div>

              {/* Card (Right on Desktop) */}
              <div className="w-full md:w-1/2 pl-14 md:pl-12">
                <div className="bg-white rounded-[28px] border border-[rgba(13,13,13,0.1)] p-8 shadow-sm transition-shadow hover:shadow-md relative">
                  
                  {/* Top Kicker & Score */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-[11px] uppercase tracking-wider font-bold text-[#0d0d0d] bg-[#f4f2ee] px-3 py-1 rounded-full">
                      EDUCATION
                    </span>
                    <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                      {edu.score}
                    </span>
                  </div>

                  <h3 className="font-sans font-extrabold text-2xl text-[#0d0d0d] mb-1">
                    {edu.degree}
                  </h3>
                  <div className="font-mono text-xs text-[#77756f] uppercase tracking-wider mb-4">
                    {edu.institution}
                  </div>
                  <div className="font-mono text-xs text-[#a9a6a0]">
                    Batch: {edu.period}
                  </div>
                </div>
              </div>

            </div>

            {/* ITEM 3: NEXT — YOUR TEAM? (LEFT SIDE ON DESKTOP) */}
            <div className="relative flex flex-col md:flex-row items-center">
              
              {/* Card (Left on Desktop) */}
              <div className="w-full md:w-1/2 pl-14 md:pl-0 md:pr-12">
                <div className="bg-white/60 rounded-[28px] border-2 border-dashed border-[rgba(13,13,13,0.2)] p-8 transition-all hover:bg-white hover:border-[#0d0d0d]">
                  <span className="font-mono text-[11px] uppercase tracking-wider font-bold text-[#77756f] block mb-2">
                    OPPORTUNITY
                  </span>
                  <h3 className="font-sans font-extrabold text-2xl text-[#0d0d0d] mb-2">
                    Next — Your team?
                  </h3>
                  <p className="font-sans text-xs text-[#77756f] mb-6 leading-relaxed">
                    Ready to deploy high-performance AI systems, RAG pipelines & backend microservices for your team.
                  </p>
                  <a href="#contact" className="btn-primary inline-flex">
                    Get in touch ↗
                  </a>
                </div>
              </div>

              {/* Center Node Dot & Giant Text (NEXT) */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none">
                <div className="w-5 h-5 rounded-full bg-white border-2 border-dashed border-[#77756f] flex items-center justify-center z-10">
                  <span className="font-mono text-[9px] font-bold text-[#77756f]">?</span>
                </div>
                <span className="hidden md:block absolute left-8 font-sans font-extrabold text-3xl text-[#77756f] tracking-tighter opacity-80 uppercase">
                  NEXT
                </span>
              </div>

              {/* Empty Right Column */}
              <div className="hidden md:block w-1/2" />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

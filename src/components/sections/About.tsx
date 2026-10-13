"use client";

import { useState, useRef, useEffect } from "react";
import { PROFILE, EDUCATION, EXPERIENCE } from "@/lib/data";
import Image from "next/image";

export default function About() {
  const [isFlipped, setIsFlipped] = useState(false);

  // Auto-flip ID card every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipped((prev) => !prev);
    }, 5000);
    return () => clearInterval(interval);
  }, [isFlipped]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsFlipped((prev) => !prev);
    }
  };

  const edu = EDUCATION[0];
  const exp = EXPERIENCE[0];

  // Vertical letters for lanyard strap: A S H O K A N
  const strapLetters = ["A", "S", "H", "O", "K", "A", "N"];

  return (
    <section id="about" className="py-24 px-[var(--gutter)] border-t border-[rgba(13,13,13,0.08)] bg-white">
      <div className="max-w-[1320px] mx-auto">

        {/* Three-column grid: Left Text & Buttons, Center ID Card, Right Quick Facts */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px_1fr] gap-10 items-stretch">

          {/* Left Column: Heading, Reformatted Bio Paragraphs, Key Focus Badges, Buttons */}
          <div className="flex flex-col justify-start py-2">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#77756f] block mb-3">
                ABOUT
              </span>

              {/* Heading: Hi, I'm (sans bold) + Surya. (serif italic accent) */}
              <h2 className="font-sans font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight text-[#0d0d0d] mb-5">
                Hi, I'm <span className="font-serif italic font-normal text-[#3a3a3a]">Surya.</span>
              </h2>

              {/* Reformatted & Clean Bio Paragraphs */}
              <div className="space-y-3 mb-5">
                <p className="font-sans text-sm text-[#77756f] leading-relaxed">
                  Python Developer and AI/ML Engineer With 3+ years of experience crafting production-ready AI applications, high-performance microservices, and cloud architectures using Python, FastAPI, Generative AI,RAG, and AWS.
                </p>
                <p className="font-sans text-sm text-[#77756f] leading-relaxed">
                  I work across frontend, backend, AI, APIs, databases, and creative web development.
                </p>
              </div>

              {/* Core Capabilities Badge Grid (Fills empty vertical space cleanly) */}
              <div className="grid grid-cols-2 gap-2.5 mb-6">
                <div className="p-3 rounded-xl bg-[rgba(13,13,13,0.03)] border border-[rgba(13,13,13,0.06)]">
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-[#77756f] mb-0.5">Core Focus</span>
                  <span className="font-sans text-xs font-semibold text-[#0d0d0d]">Generative AI & RAG</span>
                </div>
                <div className="p-3 rounded-xl bg-[rgba(13,13,13,0.03)] border border-[rgba(13,13,13,0.06)]">
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-[#77756f] mb-0.5">Backend</span>
                  <span className="font-sans text-xs font-semibold text-[#0d0d0d]">Python & FastAPI</span>
                </div>
                <div className="p-3 rounded-xl bg-[rgba(13,13,13,0.03)] border border-[rgba(13,13,13,0.06)]">
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-[#77756f] mb-0.5">Cloud</span>
                  <span className="font-sans text-xs font-semibold text-[#0d0d0d]">AWS & Vector DBs</span>
                </div>
                <div className="p-3 rounded-xl bg-[rgba(13,13,13,0.03)] border border-[rgba(13,13,13,0.06)]">
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-[#77756f] mb-0.5">Experience</span>
                  <span className="font-sans text-xs font-semibold text-[#0d0d0d]">3+ Years Industry</span>
                </div>
              </div>
            </div>

            {/* Resume, GitHub, LinkedIn ALL in ONE SAME LINE */}
            <div className="flex flex-row items-center gap-3 pt-1 flex-wrap sm:flex-nowrap">
              <a href={PROFILE.resumePath} download className="btn-primary shrink-0">
                Resume ↓
              </a>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary shrink-0"
              >
                GitHub ↗
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary shrink-0"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>

          {/* Center Column: Hanging Lanyard ID Card */}
          <div className="relative flex flex-col items-center justify-start min-h-[500px]">

            {/* Lanyard Strap with Vertical Letters */}
            <div className="w-[30px] h-[72px] bg-[#1a233a] border-x border-[#0d1222] relative flex flex-col items-center justify-center gap-[2px] z-20 shadow-sm py-1.5 rounded-t-sm">
              {strapLetters.map((char, i) => (
                <span
                  key={i}
                  className="font-mono text-[8.5px] font-bold text-white tracking-widest leading-none select-none opacity-90"
                >
                  {char}
                </span>
              ))}

              {/* Metal Connector Clamp holding the ID card */}
              <div className="absolute -bottom-3.5 w-8 h-4 rounded-t-xs rounded-b-md bg-gradient-to-b from-gray-200 via-white to-gray-400 border border-gray-400 shadow-sm flex items-center justify-center z-30">
                <div className="w-3.5 h-1 rounded-xs bg-gray-500/70" />
              </div>

              {/* Metallic Silver Wire Loop Hook (Matching Reference Photo) */}
              <div className="absolute -bottom-7 z-20 flex flex-col items-center pointer-events-none">
                <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5 1V13C5 15.2091 6.79086 17 9 17C11.2091 17 13 15.2091 13 13V1"
                    stroke="url(#metalGradient)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="metalGradient" x1="0" y1="0" x2="18" y2="22" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#F3F4F6" />
                      <stop offset="0.4" stopColor="#9CA3AF" />
                      <stop offset="0.8" stopColor="#4B5563" />
                      <stop offset="1" stopColor="#1F2937" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            {/* Static ID Card Wrapper (No Cursor Movement) */}
            <div
              className="perspective-1000 cursor-pointer focus:outline-none mt-3"
              onClick={() => setIsFlipped(!isFlipped)}
              onKeyDown={handleKeyDown}
              tabIndex={0}
              role="button"
              aria-label="Developer ID Card. Click or press Enter to flip"
            >
              {/* 3D Flip Card Inner Container with Preserve-3D */}
              <div
                className="relative w-[310px] h-[430px] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  transformStyle: "preserve-3d",
                  transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* FRONT SIDE FACE */}
                <div
                  className="absolute inset-0 w-full h-full bg-white rounded-[24px] border border-[rgba(13,13,13,0.12)] p-6 flex flex-col justify-between overflow-hidden shadow-2xl"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  {/* Top Dark Header Band */}
                  <div className="bg-[#1a233a] text-white px-4 py-3 rounded-t-[18px] flex items-center gap-3 -mx-6 -mt-6 mb-3 relative overflow-hidden">
                    {/* Punched Card Slot Hole for Metal Clip */}
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-6 h-1.5 rounded-full bg-[#0d1222] border border-white/20 shadow-inner z-10" />

                    <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center font-mono font-bold text-xs bg-white/10 shrink-0">
                      {PROFILE.initials}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-mono text-xs font-bold tracking-wider uppercase">
                        DEVELOPER ID
                      </span>
                      <span className="font-mono text-[10px] text-gray-300">
                        Portfolio • 2026
                      </span>
                    </div>
                  </div>

                  {/* Centered Headshot Photo Frame */}
                  <div className="flex justify-center my-1">
                    <div className="relative w-[130px] h-[155px] rounded-2xl p-1 border border-[rgba(13,13,13,0.15)] bg-[#f4f2ee]/50 overflow-hidden shadow-sm group">
                      <Image
                        src="/surya.png"
                        alt={PROFILE.name}
                        width={130}
                        height={155}
                        className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* Name & Subtitle */}
                  <div className="text-center font-sans">
                    <h4 className="font-extrabold text-lg tracking-tight text-[#0d0d0d]">
                      SURYA ASHOKAN
                    </h4>
                    <p className="font-sans text-xs text-[#77756f]">
                      AI/ML Engineer & Developer
                    </p>
                  </div>

                  {/* 3-Column Info Grid */}
                  <div className="grid grid-cols-3 gap-1 pt-3 border-t border-[rgba(13,13,13,0.08)] font-mono text-[10px] text-[#3a3a3a] text-center">
                    <div>
                      <span className="block text-[#a9a6a0]">ID NO.</span>
                      <span className="font-bold text-[#0d0d0d]">SA-0001</span>
                    </div>
                    <div>
                      <span className="block text-[#a9a6a0]">DEPT.</span>
                      <span className="font-bold text-[#0d0d0d]">IT & AI</span>
                    </div>
                    <div>
                      <span className="block text-[#a9a6a0]">VALID TILL</span>
                      <span className="font-bold text-[#0d0d0d]">{PROFILE.validTill}</span>
                    </div>
                  </div>

                  {/* Bottom Barcode & Hologram */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="h-6 w-32 bg-[repeating-linear-gradient(90deg,#0d0d0d,#0d0d0d_2px,transparent_2px,transparent_4px)] opacity-90" />
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-gray-400 via-gray-100 to-gray-300 border border-white/80 shadow-sm" />
                  </div>
                </div>

                {/* BACK SIDE FACE: QUICK FACTS */}
                <div
                  className="absolute inset-0 w-full h-full bg-white rounded-[24px] border border-[rgba(13,13,13,0.12)] p-6 flex flex-col justify-between overflow-hidden shadow-2xl"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  {/* Top Dark Header Band on Back Face */}
                  <div className="bg-[#1a233a] text-white px-4 py-3 rounded-t-[18px] flex items-center gap-3 -mx-6 -mt-6 mb-3 relative overflow-hidden">
                    {/* Punched Card Slot Hole for Metal Clip */}
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-6 h-1.5 rounded-full bg-[#0d1222] border border-white/20 shadow-inner z-10" />

                    <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center font-mono font-bold text-xs bg-white/10 shrink-0">
                      {PROFILE.initials}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-mono text-xs font-bold tracking-wider uppercase">
                        QUICK FACTS
                      </span>
                      <span className="font-mono text-[10px] text-gray-300">
                        Developer Overview
                      </span>
                    </div>
                  </div>

                  <div>
                    {/* Key-Value Quick Facts List */}
                    <div className="space-y-2 font-sans text-xs">
                      <div className="flex items-center justify-between pb-1.5 border-b border-[rgba(13,13,13,0.06)]">
                        <span className="text-[#77756f]">Based in</span>
                        <span className="font-semibold text-[#0d0d0d] text-right">{PROFILE.location}</span>
                      </div>
                      <div className="flex items-center justify-between pb-1.5 border-b border-[rgba(13,13,13,0.06)]">
                        <span className="text-[#77756f]">Studying</span>
                        <span className="font-semibold text-[#0d0d0d] text-right">B.Tech IT</span>
                      </div>
                      <div className="flex items-center justify-between pb-1.5 border-b border-[rgba(13,13,13,0.06)]">
                        <span className="text-[#77756f]">Batch</span>
                        <span className="font-semibold text-[#0d0d0d] text-right">{edu.period}</span>
                      </div>
                      <div className="flex items-center justify-between pb-1.5 border-b border-[rgba(13,13,13,0.06)]">
                        <span className="text-[#77756f]">Experience</span>
                        <span className="font-semibold text-[#0d0d0d] text-right">{exp.company}</span>
                      </div>
                      <div className="flex items-center justify-between pb-1.5 border-b border-[rgba(13,13,13,0.06)]">
                        <span className="text-[#77756f]">Focus</span>
                        <span className="font-semibold text-[#0d0d0d] text-right">AI/ML & RAG</span>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="p-2.5 rounded-xl bg-[rgba(13,13,13,0.03)] border border-[rgba(13,13,13,0.06)] mt-2">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="font-mono text-[9px] font-semibold uppercase tracking-wider text-[#0d0d0d]">Availability</span>
                      </div>
                      <p className="font-sans text-[10px] text-[#55524d] leading-normal">
                        Open for AI/ML Engineering & Python Backend roles.
                      </p>
                    </div>
                  </div>

                  {/* Signature Line & Muted Contact Footer */}
                  <div className="pt-2 border-t border-[rgba(13,13,13,0.08)] flex items-center justify-between">
                    <div>
                      <div className="font-serif italic text-lg text-[#0d0d0d] leading-none">
                        Surya Ashokan
                      </div>
                      <div className="font-mono text-[9px] text-[#8e8b85] mt-0.5">
                        (if found, say hello)
                      </div>
                    </div>
                    <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-gray-400 via-gray-100 to-gray-300 border border-white/80 shadow-xs shrink-0" />
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right Column: WHAT I AM */}
          <div className="flex flex-col justify-between py-2 mt-20">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#77756f] block mb-4">
                WHAT I AM
              </span>

              {/* Checkmark List */}
              <div className="space-y-4 mb-6">

                {/* Item 1 */}
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#1a233a] text-white flex items-center justify-center font-mono text-[10px] font-bold shrink-0 mt-0.5 shadow-2xs">
                    ✓
                  </div>
                  <div>
                    <div className="font-sans font-bold text-sm text-[#0d0d0d]">
                      AI/ML Engineer & Python Developer
                    </div>
                    <div className="font-sans text-xs text-[#8e8b85] font-normal">
                      Python • FastAPI • Flask • REST APIs
                    </div>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#1a233a] text-white flex items-center justify-center font-mono text-[10px] font-bold shrink-0 mt-0.5 shadow-2xs">
                    ✓
                  </div>
                  <div>
                    <div className="font-sans font-bold text-sm text-[#0d0d0d]">
                      Generative AI & LLM Developer
                    </div>
                    <div className="font-sans text-xs text-[#8e8b85] font-normal">
                      OpenAI • Claude • LangChain • Prompt Engineering
                    </div>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#1a233a] text-white flex items-center justify-center font-mono text-[10px] font-bold shrink-0 mt-0.5 shadow-2xs">
                    ✓
                  </div>
                  <div>
                    <div className="font-sans font-bold text-sm text-[#0d0d0d]">
                      RAG & Intelligent Document Processing
                    </div>
                    <div className="font-sans text-xs text-[#8e8b85] font-normal">
                      FAISS • Embeddings • Vector Search • PDF/DOCX Ingestion
                    </div>
                  </div>
                </div>

                {/* Item 4 */}
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#1a233a] text-white flex items-center justify-center font-mono text-[10px] font-bold shrink-0 mt-0.5 shadow-2xs">
                    ✓
                  </div>
                  <div>
                    <div className="font-sans font-bold text-sm text-[#0d0d0d]">
                      Production Support & Problem Solving
                    </div>
                    <div className="font-sans text-xs text-[#8e8b85] font-normal">
                      Production Issues Resolved  • Reliability Improvement
                    </div>
                  </div>
                </div>

                {/* Item 5 */}
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#1a233a] text-white flex items-center justify-center font-mono text-[10px] font-bold shrink-0 mt-0.5 shadow-2xs">
                    ✓
                  </div>
                  <div>
                    <div className="font-sans font-bold text-sm text-[#0d0d0d]">
                      Cloud, Docker & CI/CD
                    </div>
                    <div className="font-sans text-xs text-[#8e8b85] font-normal">
                      AWS • Docker • Bitbucket Pipelines • Deployment
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#1a233a] text-white flex items-center justify-center font-mono text-[10px] font-bold shrink-0 mt-0.5 shadow-2xs">
                    ✓
                  </div>
                  <div>
                    <div className="font-sans font-bold text-sm text-[#0d0d0d]">
                      B.Tech Information Technology Graduate
                    </div>
                    <div className="font-sans text-xs text-[#8e8b85] font-normal">
                      Kongunadu College of Engineering and Technology • CGPA: 8.9/10
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Quote in Serif Italic */}
            <blockquote className="pt-4 border-t border-[rgba(13,13,13,0.08)] font-serif italic text-base text-[#3a3a3a] leading-snug">
              “From the database to the last pixel, quiet precision.”
            </blockquote>
          </div>

        </div>
      </div>
    </section >
  );
}

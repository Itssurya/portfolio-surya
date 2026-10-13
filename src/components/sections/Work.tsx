"use client";

import { useState } from "react";
import Image from "next/image";
import { PROJECTS, Project } from "@/lib/data";
import { TechLogo } from "@/components/ui/TechLogo";

export default function Work() {
  const [activeId, setActiveId] = useState<string>(PROJECTS[0].id);

  return (
    <section id="work" className="py-24 px-[var(--gutter)] border-t border-[rgba(13,13,13,0.08)] bg-white">
      <div className="max-w-[1320px] mx-auto">
        <span className="section-tag">03 — Selected work</span>
        <h2 className="section-heading mb-12">
          Things I've built.
          <span className="heading-accent">Architected & deployed.</span>
        </h2>

        {/* Desktop Horizontal Accordion Gallery (Height min(65svh, 500px)) */}
        <div className="hidden lg:flex items-stretch gap-4 h-[min(65svh,500px)]">
          {PROJECTS.map((project) => {
            const isOpen = activeId === project.id;
            const projectImg =
              project.id === "ai-code-review-assistant"
                ? "/ai-coding-assistant.webp"
                : "/rag-chatbot.jpg";

            return (
              <div
                key={project.id}
                onClick={() => setActiveId(project.id)}
                onFocus={() => setActiveId(project.id)}
                tabIndex={0}
                role="button"
                aria-expanded={isOpen}
                className={`relative rounded-[28px] border border-[rgba(13,13,13,0.1)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden cursor-pointer ${isOpen
                  ? "flex-[8] bg-white p-8 shadow-xl"
                  : "flex-[1] bg-white/70 hover:bg-white p-6 flex flex-col justify-between items-center text-center shadow-sm"
                  }`}
              >
                {isOpen ? (
                  /* Expanded Panel Content */
                  <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Left Info Column */}
                    <div className="flex flex-col justify-start gap-4 h-full py-2 overflow-y-auto pr-2">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-mono text-xs font-bold text-[#77756f]">
                            {project.index}
                          </span>
                          <span className="font-mono text-xs uppercase tracking-wider text-[#a9a6a0]">
                            — {project.kicker}
                          </span>
                        </div>

                        <h3 className="font-sans font-extrabold text-2xl lg:text-3xl tracking-tight text-[#0d0d0d] mb-3">
                          {project.title}
                        </h3>

                        <p className="font-sans text-sm text-[#3a3a3a] leading-relaxed mb-4">
                          {project.description}
                        </p>

                        {/* Feature List */}
                        <div className="grid gap-2 mb-4">
                          {project.features.map((feat, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs font-sans text-[#3a3a3a]">
                              <span className="font-mono text-[#0d0d0d] font-bold">✓</span>
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tech Chips + GitHub CTA */}
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                          {project.tech.map((t) => (
                            <span
                              key={t}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f4f2ee] border border-[rgba(13,13,13,0.06)] font-mono text-[11px] text-[#0d0d0d]"
                            >
                              <TechLogo name={t} size={14} />
                              {t}
                            </span>
                          ))}
                        </div>

                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary"
                            onClick={(e) => e.stopPropagation()}
                          >
                            View on GitHub ↗
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Right Side: Project Image Preview */}
                    <div className="w-full h-full bg-[#f4f2ee] rounded-2xl border border-[rgba(13,13,13,0.08)] p-4 flex flex-col justify-between relative overflow-hidden group">
                      <div className="flex items-center justify-between border-b border-[rgba(13,13,13,0.08)] pb-2.5">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#0d0d0d]/30" />
                          <span className="w-2.5 h-2.5 rounded-full bg-[#0d0d0d]/20" />
                          <span className="w-2.5 h-2.5 rounded-full bg-[#0d0d0d]/20" />
                        </div>
                        <span className="font-mono text-[10px] text-[#77756f] uppercase tracking-wider">
                          UI Preview
                        </span>
                      </div>

                      {/* Image Frame */}
                      <div className="relative w-full flex-1 my-3 rounded-xl overflow-hidden border border-[rgba(13,13,13,0.08)] shadow-xs bg-white">
                        <Image
                          src={projectImg}
                          alt={`${project.title} screenshot`}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[9px] text-[#a9a6a0]">
                          System Prototype v1.0
                        </span>
                        <span className="font-mono text-[9px] text-[#0d0d0d] font-semibold">
                          {project.id === "ai-code-review-assistant" ? "40% Effort Saved" : "70% Faster Analysis"}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Collapsed Spine Content */
                  <div className="w-full h-full flex flex-col justify-between items-center py-4">
                    <span className="font-mono text-sm font-bold text-[#0d0d0d]">
                      {project.index}
                    </span>

                    <span
                      className="font-sans font-bold text-lg text-[#0d0d0d] tracking-tight whitespace-nowrap"
                      style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                    >
                      {project.title}
                    </span>

                    <button
                      className="w-8 h-8 rounded-full border border-[rgba(13,13,13,0.15)] flex items-center justify-center font-mono text-sm font-bold text-[#0d0d0d] transition-transform duration-300 group-hover:rotate-90 bg-white"
                      aria-label="Open project"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Vertical Accordion */}
        <div className="lg:hidden flex flex-col gap-4">
          {PROJECTS.map((project) => {
            const isOpen = activeId === project.id;
            return (
              <div
                key={project.id}
                className="bg-white rounded-[24px] border border-[rgba(13,13,13,0.1)] p-6 shadow-sm overflow-hidden"
              >
                <div
                  onClick={() => setActiveId(isOpen ? "" : project.id)}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-[#77756f]">
                      {project.index}
                    </span>
                    <h3 className="font-sans font-bold text-xl text-[#0d0d0d]">
                      {project.title}
                    </h3>
                  </div>
                  <span className="font-mono text-lg font-bold">
                    {isOpen ? "−" : "+"}
                  </span>
                </div>

                {isOpen && (
                  <div className="mt-6 pt-6 border-t border-[rgba(13,13,13,0.08)] flex flex-col gap-4">
                    <span className="font-mono text-xs text-[#a9a6a0] uppercase tracking-wider">
                      {project.kicker}
                    </span>
                    <p className="font-sans text-sm text-[#3a3a3a] leading-relaxed">
                      {project.description}
                    </p>

                    <div className="grid grid-cols-1 gap-2">
                      {project.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-sans text-[#3a3a3a]">
                          <span className="font-mono text-[#0d0d0d] font-bold">✓</span>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    <div className="relative w-full h-48 my-2 rounded-xl overflow-hidden border border-[rgba(13,13,13,0.08)] bg-white">
                      <Image
                        src={project.id === "ai-code-review-assistant" ? "/ai-coding-assistant.webp" : "/rag-chatbot.jpg"}
                        alt={`${project.title} screenshot`}
                        fill
                        sizes="100vw"
                        className="object-cover object-top"
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-2 my-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 rounded-full bg-[#f4f2ee] font-mono text-[11px] text-[#0d0d0d]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary self-start"
                      >
                        View on GitHub ↗
                      </a>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

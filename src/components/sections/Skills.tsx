"use client";

import { useState } from "react";
import { SKILL_GROUPS, SkillItem } from "@/lib/data";
import { TechLogo } from "@/components/ui/TechLogo";

interface FamilyTheme {
  bg: string;
  text: string;
  atomicText: string;
  swatch: string;
}

const FAMILY_THEMES: Record<string, FamilyTheme> = {
  Languages: {
    bg: "#1c212d",
    text: "text-white",
    atomicText: "text-gray-400",
    swatch: "#1c212d",
  },
  "AI/ML": {
    bg: "#363d4d",
    text: "text-white",
    atomicText: "text-gray-300",
    swatch: "#363d4d",
  },
  Backend: {
    bg: "#6b7280",
    text: "text-white",
    atomicText: "text-gray-200",
    swatch: "#6b7280",
  },
  Frontend: {
    bg: "#9a9489",
    text: "text-[#0d0d0d]",
    atomicText: "text-[#3a3a3a]",
    swatch: "#9a9489",
  },
  Databases: {
    bg: "#c8c2b5",
    text: "text-[#0d0d0d]",
    atomicText: "text-[#4a4a4a]",
    swatch: "#c8c2b5",
  },
  "Cloud & DevOps": {
    bg: "#eae5db",
    text: "text-[#0d0d0d]",
    atomicText: "text-[#5a5a5a]",
    swatch: "#eae5db",
  },
};

export default function Skills() {
  const allSkills: SkillItem[] = SKILL_GROUPS.flatMap((g) => g.skills);
  const families = ["All", ...SKILL_GROUPS.map((g) => g.family)];

  const [activeFamily, setActiveFamily] = useState<string>("All");
  const [selectedSkill, setSelectedSkill] = useState<SkillItem>(allSkills[0]);

  return (
    <section id="skills" className="py-24 px-[var(--gutter)] border-t border-[rgba(13,13,13,0.08)]">
      <div className="max-w-[1320px] mx-auto">
        <span className="section-tag">02 — Periodic stack</span>
        <h2 className="section-heading mb-10">
          The periodic table
          <span className="heading-accent">of my stack.</span>
        </h2>

        {/* Family Filter Chips with Color Swatches */}
        <div className="flex flex-wrap items-center gap-2.5 mb-12">
          {families.map((fam) => {
            const isActive = activeFamily === fam;
            const theme = FAMILY_THEMES[fam];

            return (
              <button
                key={fam}
                onClick={() => setActiveFamily(fam)}
                className={`px-4 py-2 rounded-full font-mono text-xs tracking-wider transition-all duration-200 flex items-center gap-2 border ${isActive
                    ? "bg-[#0d0d0d] text-white border-[#0d0d0d] shadow-sm"
                    : "bg-white text-[#77756f] border-[rgba(13,13,13,0.1)] hover:text-[#0d0d0d] hover:border-[#0d0d0d]"
                  }`}
              >
                {theme && (
                  <span
                    className="w-2.5 h-2.5 rounded-sm inline-block border border-black/10"
                    style={{ backgroundColor: theme.swatch }}
                  />
                )}
                <span>{fam}</span>
              </button>
            );
          })}
        </div>

        {/* Main Layout: Grid + Sticky Inspector Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">

          {/* Periodic Table Grid (8 cols desktop, 4 cols mobile) */}
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
            {allSkills.map((skill, idx) => {
              const row = Math.floor(idx / 8);
              const col = idx % 8;
              const delayMs = (row + col) * 40;
              const matchesFilter = activeFamily === "All" || skill.family === activeFamily;
              const isSelected = selectedSkill.name === skill.name;
              const theme = FAMILY_THEMES[skill.family] || FAMILY_THEMES["Languages"];

              return (
                <button
                  key={skill.name}
                  onClick={() => setSelectedSkill(skill)}
                  onMouseEnter={() => setSelectedSkill(skill)}
                  onFocus={() => setSelectedSkill(skill)}
                  style={{
                    backgroundColor: theme.bg,
                    animationDelay: `${delayMs}ms`
                  }}
                  className={`relative aspect-square p-2.5 rounded-2xl transition-all duration-300 flex flex-col justify-between text-left group ${theme.text
                    } ${matchesFilter ? "opacity-100 scale-100" : "opacity-25 scale-95 pointer-events-none"
                    } ${isSelected
                      ? "ring-2 ring-[#0d0d0d] ring-offset-2 shadow-xl -translate-y-1 z-10"
                      : "hover:shadow-md hover:-translate-y-0.5"
                    }`}
                  aria-label={`${skill.name} (${skill.family})`}
                >
                  <div className="flex items-center justify-between w-full font-mono text-[9px]">
                    <span className={`font-semibold ${theme.atomicText}`}>
                      {skill.atomic}
                    </span>
                    <div className="w-4 h-4 flex items-center justify-center">
                      <TechLogo name={skill.name} size={14} />
                    </div>
                  </div>

                  <div className="font-sans font-extrabold text-lg sm:text-xl tracking-tight leading-none my-auto">
                    {skill.symbol}
                  </div>

                  <div className="font-mono text-[10px] truncate w-full tracking-tight font-medium opacity-90">
                    {skill.name}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Sticky Inspector Panel (320px wide) */}
          <div className="lg:sticky lg:top-24 bg-white rounded-[28px] border border-[rgba(13,13,13,0.1)] p-8 shadow-sm flex flex-col items-center text-center">
            {/* Pop Animation Logo (150px) */}
            <div className="relative w-[150px] h-[150px] flex items-center justify-center mb-6 p-4 rounded-2xl bg-[#f4f2ee]/60 border border-[rgba(13,13,13,0.06)] shadow-inner transition-transform duration-300 transform key={selectedSkill.name} animate-pop">
              <TechLogo name={selectedSkill.name} size={110} />
            </div>

            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#77756f] mb-1">
              <span
                className="w-2.5 h-2.5 rounded-sm inline-block border border-black/10"
                style={{ backgroundColor: FAMILY_THEMES[selectedSkill.family]?.swatch }}
              />
              <span>ATOMIC {selectedSkill.atomic} — {selectedSkill.family}</span>
            </div>

            <h3 className="font-sans font-extrabold text-2xl tracking-tight text-[#0d0d0d] mb-4">
              {selectedSkill.name}
            </h3>

          </div>

        </div>
      </div>
    </section>
  );
}


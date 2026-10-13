"use client";

import { CERTIFICATIONS, ACHIEVEMENTS } from "@/lib/data";
import { TechLogo } from "@/components/ui/TechLogo";

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 px-[var(--gutter)] border-t border-[rgba(13,13,13,0.08)] bg-white">
      <div className="max-w-[1320px] mx-auto">
        <span className="section-tag">05 — Recognized excellence</span>
        <h2 className="section-heading mb-14">
          Certifications & achievements
          <span className="heading-accent">. impact & credentials</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Column 1: Certifications & Verified Credentials */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-sans font-extrabold text-xl text-[#0d0d0d] flex items-center gap-2">
                <span>Verified Certifications</span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#f4f2ee] font-mono text-xs font-bold text-[#77756f]">
                  {CERTIFICATIONS.length}
                </span>
              </h3>
              <span className="font-mono text-xs text-[#a9a6a0] uppercase tracking-wider">
                Industry Standards
              </span>
            </div>

            <div className="space-y-4">
              {CERTIFICATIONS.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-white rounded-[24px] border border-[rgba(13,13,13,0.1)] p-6 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-[#f4f2ee] border border-[rgba(13,13,13,0.06)] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <TechLogo name={cert.icon} size={26} />
                      </div>
                      <div>
                        <h4 className="font-sans font-bold text-base text-[#0d0d0d] group-hover:text-[#3a3a3a] transition-colors">
                          {cert.title}
                        </h4>
                        <span className="font-mono text-xs text-[#77756f]">
                          {cert.issuer} • {cert.date}
                        </span>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 shrink-0">
                      <span>✓</span> Verified
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[rgba(13,13,13,0.06)]">
                    <div className="flex flex-wrap gap-1.5">
                      {cert.skills.map((sk) => (
                        <span
                          key={sk}
                          className="font-mono text-[10px] text-[#3a3a3a] bg-[#f4f2ee] px-2.5 py-1 rounded-full border border-[rgba(13,13,13,0.04)]"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>

                    {cert.verifyUrl && (
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs font-semibold text-[#0d0d0d] hover:underline flex items-center gap-1 ml-auto"
                      >
                        Verify Credential ↗
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Quantifiable Impact & Achievements */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-sans font-extrabold text-xl text-[#0d0d0d] flex items-center gap-2">
                <span>Key Metrics & Impact</span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#f4f2ee] font-mono text-xs font-bold text-[#77756f]">
                  {ACHIEVEMENTS.length}
                </span>
              </h3>
              <span className="font-mono text-xs text-[#a9a6a0] uppercase tracking-wider">
                Production Outcomes
              </span>
            </div>

            <div className="space-y-4">
              {ACHIEVEMENTS.map((ach) => (
                <div
                  key={ach.id}
                  className="bg-[#0d0d0d] text-white rounded-[24px] p-6 shadow-md hover:shadow-xl transition-all duration-300 group flex items-start gap-5 relative overflow-hidden"
                >
                  {/* Subtle Background Accent Gradient */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />

                  {/* Left Big Stat Badge */}
                  <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/10 flex flex-col items-center justify-center shrink-0 text-center p-2 group-hover:bg-white/15 transition-colors">
                    <span className="font-sans font-extrabold text-2xl text-emerald-400 leading-none">
                      {ach.stat}
                    </span>
                    <span className="font-mono text-[9px] uppercase text-gray-300 tracking-tighter mt-1">
                      {ach.statLabel}
                    </span>
                  </div>

                  {/* Right Description Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-mono text-[10px] text-gray-400 uppercase tracking-wider">
                        {ach.organization} • {ach.year}
                      </span>
                      <TechLogo name={ach.icon} size={16} />
                    </div>

                    <h4 className="font-sans font-bold text-base text-white mb-2 truncate">
                      {ach.title}
                    </h4>

                    <p className="font-sans text-xs text-gray-300 leading-relaxed">
                      {ach.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

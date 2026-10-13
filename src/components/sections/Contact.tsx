"use client";

import { useState } from "react";
import { PROFILE } from "@/lib/data";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const title1 = "Let's build";
  const title2 = "something together.";

  return (
    <section id="contact" className="py-24 px-[var(--gutter)] border-t border-[rgba(13,13,13,0.08)] bg-[#f4f2ee] relative overflow-hidden">
      <div className="max-w-[1320px] mx-auto flex flex-col justify-between min-h-[70vh]">

        <div>
          <span className="section-tag">05 — Say hello</span>

          {/* Interactive Letter-Hop Heading */}
          <div className="my-10 select-none">
            <h2 className="font-sans font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter text-[#0d0d0d] leading-none">
              <span className="block mb-2">
                {title1.split("").map((char, i) => (
                  <span
                    key={i}
                    className="inline-block transition-transform duration-200 hover:-translate-y-4 hover:scale-110 cursor-pointer"
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </span>
              <span className="block text-[#77756f]">
                {title2.split("").map((char, i) => (
                  <span
                    key={i}
                    className="inline-block transition-transform duration-200 hover:-translate-y-4 hover:scale-110 cursor-pointer"
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </span>
            </h2>
          </div>

          {/* Email Copy + Links */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 my-12 pt-8 border-t border-[rgba(13,13,13,0.08)]">
            <div>
              <span className="font-mono text-xs text-[#a9a6a0] uppercase tracking-wider block mb-2">
                DIRECT INQUIRIES
              </span>
              <div className="flex items-center gap-4 flex-wrap">
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="font-sans font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#0d0d0d] underline decoration-2 underline-offset-8 hover:text-[#77756f] transition-colors"
                >
                  {PROFILE.email}
                </a>

                {/* Copy Chip with aria-live */}
                <button
                  onClick={handleCopyEmail}
                  className="px-4 py-2 rounded-full bg-[#f4f2ee] border border-[rgba(13,13,13,0.1)] font-mono text-xs text-[#0d0d0d] hover:bg-[#0d0d0d] hover:text-white transition-all active:scale-95"
                  aria-label="Copy email address"
                >
                  {copied ? "Copied ✓" : "Copy email"}
                </button>
                <div aria-live="polite" className="sr-only">
                  {copied ? "Email address copied to clipboard" : ""}
                </div>
              </div>
            </div>

            {/* Circular Rotating Badge */}
            <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full animate-spin-slow pointer-events-none"
              >
                <path
                  id="circlePath"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  fill="none"
                />
                <text className="font-mono text-[10.5px] uppercase tracking-widest fill-[#0d0d0d]">
                  <textPath href="#circlePath">
                    SAY HELLO • GET IN TOUCH • SURYA ASHOKAN •
                  </textPath>
                </text>
              </svg>
              <div className="absolute w-4 h-4 rounded-full bg-[#0d0d0d]" />
            </div>
          </div>

          {/* Phone & Social Links */}
          <div className="flex flex-wrap items-center gap-6 font-mono text-sm">
            <a
              href={PROFILE.phoneHref}
              className="text-[#0d0d0d] hover:underline flex items-center gap-1.5"
            >
              <span>📞</span> {PROFILE.phone}
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0d0d0d] hover:underline flex items-center gap-1"
            >
              GitHub ↗
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0d0d0d] hover:underline flex items-center gap-1"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer className="pt-16 mt-16 border-t border-[rgba(13,13,13,0.08)] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#77756f]">
          <div>
            © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="hover:text-[#0d0d0d] underline"
            >
              Back to top ↑
            </button>
            <span>Built with Next.js</span>
          </div>
        </footer>

      </div>
    </section>
  );
}

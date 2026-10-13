"use client";

import { useRef, useEffect, useState } from "react";
import { PROFILE } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";

const GHOST_LETTERS = [
  { char: "S", x: 190 },
  { char: "U", x: 370 },
  { char: "R", x: 550 },
  { char: "Y", x: 730 },
  { char: "A", x: 910 },
];

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [isAutoplayBlocked, setIsAutoplayBlocked] = useState(true);
  const visitedRef = useRef<Uint8Array | null>(null);
  const queueRef = useRef<Int32Array | null>(null);

  // Canvas processing loop: boundary-seeded flood-fill keying
  // Keys out studio background around the person while keeping the person & white shirt 100% opaque.
  // This ensures letter 'Y' in background SVG stays strictly BEHIND the video/person.
  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let animId: number;

    const render = () => {
      if (video.readyState >= 2) {
        const vw = video.videoWidth || 768;
        const vh = video.videoHeight || 960;

        if (canvas.width !== vw || canvas.height !== vh) {
          canvas.width = vw;
          canvas.height = vh;
        }

        ctx.drawImage(video, 0, 0, vw, vh);

        const imgData = ctx.getImageData(0, 0, vw, vh);
        const d = imgData.data;
        const totalPixels = vw * vh;

        if (!visitedRef.current || visitedRef.current.length < totalPixels) {
          visitedRef.current = new Uint8Array(totalPixels);
          queueRef.current = new Int32Array(totalPixels);
        }

        const visited = visitedRef.current;
        const queue = queueRef.current;
        if (!visited || !queue) return;
        visited.fill(0);

        let head = 0;
        let tail = 0;

        const isBgPixel = (idx: number) => {
          const p = idx * 4;
          const r = d[p];
          const g = d[p + 1];
          const b = d[p + 2];
          return r > 238 && g > 238 && b > 238;
        };

        // Seed outer border pixels
        for (let x = 0; x < vw; x++) {
          let idx = x;
          if (isBgPixel(idx)) {
            visited[idx] = 1;
            queue[tail++] = idx;
          }
          idx = (vh - 1) * vw + x;
          if (isBgPixel(idx)) {
            visited[idx] = 1;
            queue[tail++] = idx;
          }
        }

        for (let y = 1; y < vh - 1; y++) {
          let idx = y * vw;
          if (isBgPixel(idx)) {
            visited[idx] = 1;
            queue[tail++] = idx;
          }
          idx = y * vw + (vw - 1);
          if (isBgPixel(idx)) {
            visited[idx] = 1;
            queue[tail++] = idx;
          }
        }

        // BFS flood fill outwards from border
        while (head < tail) {
          const curr = queue[head++];
          const cx = curr % vw;
          const cy = (curr / vw) | 0;

          if (cx > 0) {
            const nIdx = curr - 1;
            if (visited[nIdx] === 0 && isBgPixel(nIdx)) {
              visited[nIdx] = 1;
              queue[tail++] = nIdx;
            }
          }
          if (cx < vw - 1) {
            const nIdx = curr + 1;
            if (visited[nIdx] === 0 && isBgPixel(nIdx)) {
              visited[nIdx] = 1;
              queue[tail++] = nIdx;
            }
          }
          if (cy > 0) {
            const nIdx = curr - vw;
            if (visited[nIdx] === 0 && isBgPixel(nIdx)) {
              visited[nIdx] = 1;
              queue[tail++] = nIdx;
            }
          }
          if (cy < vh - 1) {
            const nIdx = curr + vw;
            if (visited[nIdx] === 0 && isBgPixel(nIdx)) {
              visited[nIdx] = 1;
              queue[tail++] = nIdx;
            }
          }
        }

        // Apply transparency ONLY to connected studio background pixels
        for (let i = 0; i < totalPixels; i++) {
          if (visited[i] === 1) {
            d[i * 4 + 3] = 0; // 100% transparent studio background
          }
        }

        ctx.putImageData(imgData, 0, 0);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Try playing audio on initial load
    video.muted = false;
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlayingSound(true);
          setIsAutoplayBlocked(false);
        })
        .catch(() => {
          // Autoplay policy blocked audio -> fallback to muted play until gesture
          video.muted = true;
          video.play().catch(() => { });
          setIsPlayingSound(false);
          setIsAutoplayBlocked(true);
        });
    }

    const unlockAudio = () => {
      if (video) {
        video.muted = false;
        video.play().then(() => {
          setIsPlayingSound(true);
          setIsAutoplayBlocked(false);
        }).catch(() => { });
      }
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
      window.removeEventListener("touchend", unlockAudio);
      window.removeEventListener("click", unlockAudio);
    };

    window.addEventListener("pointerdown", unlockAudio);
    window.addEventListener("keydown", unlockAudio);
    window.addEventListener("touchend", unlockAudio);
    window.addEventListener("click", unlockAudio);

    return () => {
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
      window.removeEventListener("touchend", unlockAudio);
      window.removeEventListener("click", unlockAudio);
    };
  }, []);

  // IntersectionObserver: Pause video/audio when < 35% of hero is visible
  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio < 0.35) {
            video.pause();
          } else {
            video.play().catch(() => { });
          }
        });
      },
      { threshold: [0, 0.35, 0.5, 1.0] }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.muted || !isPlayingSound) {
      video.muted = false;
      video.play().then(() => {
        setIsPlayingSound(true);
        setIsAutoplayBlocked(false);
      }).catch(() => { });
    } else {
      video.muted = true;
      setIsPlayingSound(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full min-h-screen flex flex-col justify-between px-[var(--gutter)] overflow-hidden bg-[#f4f2ee]"
    >
      {/* Top Right Floating Sound Toggle Button */}
      <div className="absolute top-5 md:top-6 right-[var(--gutter)] z-30">
        <div className="relative">
          {isAutoplayBlocked && (
            <span className="absolute -inset-1 rounded-full bg-[#0d0d0d]/10 animate-pulse pointer-events-none" />
          )}
          <button
            onClick={toggleSound}
            className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-[#0d0d0d] text-white flex items-center justify-center shadow-lg transition-transform active:scale-90 hover:scale-105"
            aria-label={isPlayingSound ? "Mute audio" : "Unmute audio"}
          >
            {isPlayingSound ? (
              <span className="font-mono text-[10px] md:text-xs font-bold tracking-tighter">❚❚</span>
            ) : (
              <span className="font-mono text-[10px] md:text-xs pl-0.5">▶</span>
            )}
          </button>
        </div>
      </div>

      {/* Giant Outlined Architectural Ghost Text (SURYA) - Hidden on mobile screens for a clean layout */}
      <div className="hidden md:flex absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full items-center justify-center pointer-events-none select-none z-0 px-4 opacity-15">
        <svg
          viewBox="0 0 1100 320"
          className="w-full max-w-[1500px] h-auto pointer-events-none select-none"
          preserveAspectRatio="xMidYMid meet"
        >
          {GHOST_LETTERS.filter((item) => item.char !== "Y").map(({ char, x }) => (
            <g key={char}>
              {/* Outer Main Stroke */}
              <text
                x={x}
                y="160"
                dominantBaseline="central"
                textAnchor="middle"
                className="font-extrabold uppercase tracking-tighter"
                style={{
                  fontSize: "250px",
                  fontFamily: "var(--font-sans), system-ui, sans-serif",
                  fontWeight: 900,
                  fill: "rgba(13, 13, 13, 0.04)",
                  stroke: "rgba(13, 13, 13, 0.16)",
                  strokeWidth: "2px",
                }}
              >
                {char}
              </text>

              {/* Second Inner Parallel Inline Stroke */}
              <text
                x={x}
                y="160"
                dominantBaseline="central"
                textAnchor="middle"
                className="font-extrabold uppercase tracking-tighter"
                style={{
                  fontSize: "250px",
                  fontFamily: "var(--font-sans), system-ui, sans-serif",
                  fontWeight: 900,
                  fill: "none",
                  stroke: "rgba(13, 13, 13, 0.08)",
                  strokeWidth: "0.6px",
                  transform: "scale(0.91)",
                  transformOrigin: `${x}px 160px`,
                }}
              >
                {char}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Standing Person Video Canvas Overlay - Responsive staged height on mobile to prevent overlapping bottom headline */}
      <div className="absolute top-[7vh] h-[43vh] sm:h-[46vh] left-1/2 -translate-x-1/2 w-[72vw] max-w-[290px] md:top-[9vh] md:bottom-[4vh] md:h-auto md:left-[51%] md:translate-x-0 md:w-[30vw] md:max-w-[480px] z-10 flex items-center justify-center pointer-events-none bg-transparent">
        {/* Hidden video element acting as frame source */}
        <video
          ref={videoRef}
          loop
          playsInline
          muted
          preload="auto"
          className="hidden"
        >
          <source src="/hero/hero.webm" type="video/webm" />
          <source src="/hero/hero.mp4" type="video/mp4" />
        </video>

        {/* Visible Canvas with background keying */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain bg-transparent pointer-events-none"
        />
      </div>

      {/* Hero Bottom Layout: Clean Responsive Typography and Spacing */}
      <div className="relative z-10 max-w-[1320px] mx-auto w-full flex flex-col md:flex-row items-start md:items-end justify-between gap-5 md:gap-8 pt-4 md:pt-2 mt-auto pb-6 md:pb-4">

        {/* Bottom Left Title Block */}
        <div className="flex flex-col text-left">
          <span className="font-mono text-xs uppercase tracking-widest text-[#77756f] mb-1.5 md:mb-2">
            {PROFILE.name}
          </span>
          <h2 className="font-sans font-extrabold text-[2.15rem] leading-[1.02] sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter text-[#0d0d0d] md:leading-[0.95]">
            AI/ML Engineer &<br />
            Python Developer<span className="text-[#77756f] font-serif italic">.</span>
          </h2>
          <p className="font-mono text-xs text-[#77756f] mt-2 md:mt-3">
            Python • Generative AI • RAG
          </p>
        </div>

        {/* Bottom Right CTAs Block */}
        <div className="flex flex-col items-start md:items-end gap-3.5 md:gap-4 shrink-0">
          <button
            onClick={() => scrollToTarget("work")}
            className="btn-primary px-7 py-3.5 md:px-8 md:py-4 text-sm md:text-base font-semibold shadow-xl hover:scale-105 active:scale-95"
          >
            Explore work →
          </button>

          <div className="flex items-center gap-5 font-mono text-xs font-medium text-[#3a3a3a] pl-1 md:pl-0">
            <a
              href={PROFILE.resumePath}
              download
              className="hover:text-[#0d0d0d] hover:underline"
            >
              Resume ↓
            </a>
            <button
              onClick={() => scrollToTarget("contact")}
              className="hover:text-[#0d0d0d] hover:underline"
            >
              Let's talk
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

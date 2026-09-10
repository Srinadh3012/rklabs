import { useEffect, useRef, useState } from "react";

/**
 * Repair-themed hero scene.
 * Mobile on the left, laptop on the right. Bottom animation removed.
 * Pure SVG + CSS, no libraries, pauses off-screen, respects reduced-motion.
 */
export default function RepairScene({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setPlaying(entry.isIntersecting), {
      threshold: 0.05,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const animate = playing && !reduced;

  return (
    <div ref={ref} className={className} aria-hidden data-animate={animate ? "on" : "off"}>
      <style>{`
        .rk-repair-scene [data-animate="off"] * { animation-play-state: paused !important; }
        @keyframes rk-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes rk-float-2 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }
        @keyframes rk-float-3 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes rk-pulse { 0%,100% { opacity: .65; } 50% { opacity: 1; } }
        @keyframes rk-glow { 0%,100% { opacity: .2; } 50% { opacity: .5; } }
        .rk-float { animation: rk-float 5s ease-in-out infinite; }
        .rk-float-2 { animation: rk-float-2 4.5s ease-in-out infinite .6s; }
        .rk-float-3 { animation: rk-float-3 4s ease-in-out infinite .3s; }
        .rk-pulse { animation: rk-pulse 3s ease-in-out infinite; }
        .rk-glow { animation: rk-glow 3s ease-in-out infinite; transform-origin: center; }
      `}</style>

      <svg
        viewBox="0 0 1200 740"
        className="rk-repair-scene h-full w-full"
        role="img"
        aria-label="Mobile phone, laptop and repair kit"
      >
        <defs>
          <linearGradient id="rk-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--foreground)" stopOpacity="0.14" />
            <stop offset="1" stopColor="var(--foreground)" stopOpacity="0.06" />
          </linearGradient>
          <linearGradient id="rk-screen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--primary)" stopOpacity="0.25" />
            <stop offset="1" stopColor="var(--neon)" stopOpacity="0.45" />
          </linearGradient>
          <linearGradient id="rk-tool" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--primary)" stopOpacity="0.4" />
            <stop offset="1" stopColor="var(--neon)" stopOpacity="0.25" />
          </linearGradient>
          <radialGradient id="rk-blob" cx=".5" cy=".5" r=".5">
            <stop offset="0" stopColor="var(--primary)" stopOpacity="0.15" />
            <stop offset="1" stopColor="var(--primary)" stopOpacity="0" />
          </radialGradient>
          <filter id="rk-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="0"
              dy="6"
              stdDeviation="14"
              floodColor="var(--foreground)"
              floodOpacity="0.12"
            />
          </filter>
        </defs>

        {/* Ambient glows behind each object */}
        <ellipse className="rk-glow" cx="100" cy="150" rx="140" ry="110" fill="url(#rk-blob)" />
        <ellipse className="rk-glow" cx="1100" cy="150" rx="140" ry="110" fill="url(#rk-blob)" />

        {/* Mobile phone — left side */}
        <g transform="translate(60, 80) rotate(-12)">
          <g className="rk-float">
            <g filter="url(#rk-shadow)">
              <rect
                x="0"
                y="0"
                width="58"
                height="96"
                rx="10"
                fill="url(#rk-body)"
                stroke="var(--foreground)"
                strokeOpacity="0.55"
                strokeWidth="2.5"
              />
              <rect x="4" y="7" width="50" height="72" rx="5" fill="url(#rk-screen)" />
              <rect
                x="4"
                y="7"
                width="50"
                height="72"
                rx="5"
                fill="var(--neon)"
                fillOpacity="0.15"
                className="rk-pulse"
              />
            </g>
            <g stroke="var(--foreground)" strokeWidth="2.5" strokeLinecap="round" opacity="0.7">
              <line x1="13" y1="28" x2="45" y2="28" />
              <line x1="13" y1="44" x2="39" y2="44" />
              <line x1="13" y1="60" x2="45" y2="60" />
            </g>
            <circle cx="29" cy="86" r="4" fill="var(--primary)" fillOpacity="0.7" />
            <line
              x1="29"
              y1="-9"
              x2="29"
              y2="0"
              stroke="var(--foreground)"
              strokeOpacity="0.4"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="29" cy="-12" r="2.5" fill="var(--neon)" fillOpacity="0.9" />
          </g>
        </g>

        {/* Laptop — right side */}
        <g transform="translate(1060, 80) rotate(10)">
          <g className="rk-float-2">
            <g filter="url(#rk-shadow)">
              <rect
                x="0"
                y="0"
                width="120"
                height="78"
                rx="8"
                fill="url(#rk-body)"
                stroke="var(--foreground)"
                strokeOpacity="0.55"
                strokeWidth="2.5"
              />
              <rect x="7" y="7" width="106" height="55" rx="4" fill="url(#rk-screen)" />
              <rect
                x="7"
                y="7"
                width="106"
                height="55"
                rx="4"
                fill="var(--neon)"
                fillOpacity="0.15"
                className="rk-pulse"
              />
            </g>
            <g stroke="var(--foreground)" strokeWidth="2.5" strokeLinecap="round" opacity="0.7">
              <line x1="18" y1="23" x2="70" y2="23" />
              <line x1="18" y1="39" x2="95" y2="39" />
              <line x1="18" y1="55" x2="79" y2="55" />
            </g>
            <path
              d="M-16 78 h152 l-12 16 h-128 z"
              fill="url(#rk-tool)"
              stroke="var(--foreground)"
              strokeOpacity="0.55"
              strokeWidth="2.5"
            />
            <rect
              x="41"
              y="-10"
              width="38"
              height="9"
              rx="2"
              fill="var(--foreground)"
              fillOpacity="0.12"
              stroke="var(--foreground)"
              strokeOpacity="0.4"
              strokeWidth="1.5"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

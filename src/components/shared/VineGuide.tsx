"use client";

import { useEffect, useState } from "react";

/** Decorative emerald vine that grows with scroll — guides through the page */
export function VineGuide() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      setProgress(Math.min(1, Math.max(0, p)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const pathLen = 2400;
  const dash = pathLen * (0.12 + progress * 0.88);

  return (
    <div className="vine-guide" aria-hidden>
      <svg viewBox="0 0 60 2400" preserveAspectRatio="none">
        <defs>
          <linearGradient id="vineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a8a72" stopOpacity="0.2" />
            <stop offset="40%" stopColor="#b08b5a" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#0d5c4d" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <path
          d="M30 0
             C 48 80, 12 160, 30 240
             C 48 320, 12 400, 30 480
             C 50 560, 10 640, 30 720
             C 48 800, 14 880, 30 960
             C 46 1040, 12 1120, 30 1200
             C 50 1280, 10 1360, 30 1440
             C 48 1520, 14 1600, 30 1680
             C 46 1760, 12 1840, 30 1920
             C 50 2000, 10 2080, 30 2160
             C 48 2240, 16 2320, 30 2400"
          strokeDasharray={`${dash} ${pathLen}`}
          strokeDashoffset={0}
          style={{ transition: "stroke-dasharray 0.15s linear" }}
        />
        {/* leaves along the vine */}
        {[180, 420, 660, 900, 1140, 1380, 1620, 1860, 2100].map((y, i) => {
          const visible = progress > i / 12;
          const side = i % 2 === 0 ? 1 : -1;
          return (
            <g
              key={y}
              opacity={visible ? 0.85 : 0}
              style={{ transition: "opacity 0.5s ease" }}
              transform={`translate(${30 + side * 8}, ${y}) rotate(${side * 25})`}
            >
              <ellipse className="leaf" cx="0" cy="0" rx="7" ry="14" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

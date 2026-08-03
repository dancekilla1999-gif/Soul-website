"use client";

import { useEffect, useState } from "react";

/** Premium tropical vine that grows with scroll */
export function VineGuide() {
  const [progress, setProgress] = useState(0);
  const [mx, setMx] = useState(0.5);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    const onMove = (e: MouseEvent) => {
      setMx(e.clientX / window.innerWidth);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  const pathLen = 3200;
  const dash = pathLen * (0.08 + progress * 0.92);
  const sway = (mx - 0.5) * 6;

  return (
    <div className="vine-guide" aria-hidden style={{ transform: `translateX(${sway}px)` }}>
      <svg viewBox="0 0 120 3200" preserveAspectRatio="xMidYMin meet">
        <defs>
          <linearGradient id="vineStem" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5c4030" />
            <stop offset="40%" stopColor="#8a6c43" />
            <stop offset="100%" stopColor="#0d5c4d" />
          </linearGradient>
          <linearGradient id="leafGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1a8a72" />
            <stop offset="50%" stopColor="#0d5c4d" />
            <stop offset="100%" stopColor="#064036" />
          </linearGradient>
          <filter id="leafGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* main woody stem */}
        <path
          d="M60 0
             C 90 100, 30 200, 60 300
             C 95 400, 25 500, 60 600
             C 100 700, 20 800, 60 900
             C 95 1000, 28 1100, 60 1200
             C 98 1300, 22 1400, 60 1500
             C 92 1600, 30 1700, 60 1800
             C 100 1900, 20 2000, 60 2100
             C 90 2200, 32 2300, 60 2400
             C 95 2500, 25 2600, 60 2700
             C 88 2800, 35 2900, 60 3000
             C 80 3080, 45 3140, 60 3200"
          fill="none"
          stroke="url(#vineStem)"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${pathLen}`}
          style={{ transition: "stroke-dasharray 0.12s linear" }}
        />
        {/* thinner tendril */}
        <path
          d="M60 0
             C 40 120, 80 240, 55 360
             C 30 480, 85 600, 58 720
             C 35 840, 90 960, 55 1080
             C 25 1200, 88 1320, 58 1440
             C 32 1560, 92 1680, 55 1800
             C 28 1920, 90 2040, 58 2160
             C 35 2280, 85 2400, 55 2520
             C 30 2640, 88 2760, 58 2880
             C 40 3000, 75 3100, 60 3200"
          fill="none"
          stroke="rgba(26,138,114,0.45)"
          strokeWidth="1.8"
          strokeDasharray={`${dash * 0.95} ${pathLen}`}
          style={{ transition: "stroke-dasharray 0.12s linear" }}
        />

        {/* tropical leaves */}
        {[
          [180, 1], [320, -1], [480, 1], [620, -1], [780, 1],
          [940, -1], [1100, 1], [1260, -1], [1420, 1], [1580, -1],
          [1740, 1], [1900, -1], [2060, 1], [2220, -1], [2380, 1],
          [2540, -1], [2700, 1], [2860, -1], [3020, 1],
        ].map(([y, side], i) => {
          const visible = progress > i / 28;
          const ox = 60 + side * 28;
          return (
            <g
              key={y}
              opacity={visible ? 1 : 0}
              style={{ transition: "opacity 0.6s ease" }}
              transform={`translate(${ox}, ${y}) rotate(${side * 18})`}
              filter="url(#leafGlow)"
            >
              {/* monstera-like */}
              <ellipse cx="0" cy="0" rx="16" ry="28" fill="url(#leafGrad)" opacity="0.9" />
              <path d="M0 -24 Q 8 -5 0 24" stroke="rgba(180,220,180,0.35)" strokeWidth="1" fill="none" />
              {/* holes hint */}
              <circle cx={side * 5} cy={-4} r="2.5" fill="rgba(6,5,5,0.35)" />
              <circle cx={side * -3} cy={8} r="2" fill="rgba(6,5,5,0.3)" />
              {/* hanging tendril */}
              <path
                d={`M0 24 Q ${side * 6} 40 ${side * 2} 55`}
                stroke="rgba(26,138,114,0.5)"
                strokeWidth="1.2"
                fill="none"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

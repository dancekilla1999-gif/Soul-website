"use client";

import { useEffect, useState, useRef } from "react";

/**
 * Realistic tropical vine that grows with scroll.
 * Inspired by hanging jungle vines (monstera, ferns, palm fronds, tendrils).
 * Multiple layers create AR-like depth.
 */
export function VineGuide() {
  const [progress, setProgress] = useState(0);
  const [mx, setMx] = useState(0.5);
  const [my, setMy] = useState(0.5);
  const rafRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => setProgress(p));
    };
    const onMove = (e: MouseEvent) => {
      setMx(e.clientX / window.innerWidth);
      setMy(e.clientY / window.innerHeight);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Parallax sway from mouse + subtle depth offset
  const swayX = (mx - 0.5) * 14;
  const swayY = (my - 0.5) * 4;
  const depthShift = progress * 8;

  // Path lengths for dash animation
  const pathLen = 3800;
  const dashMain = pathLen * (0.04 + progress * 0.96);
  const dashSide = pathLen * (0.02 + progress * 0.9);

  // Leaf visibility thresholds (0..1)
  const leaves = [
    // [y, side, type, scale, rot]
    { y: 120, side: -1, type: "fern", s: 0.9, r: -12 },
    { y: 220, side: 1, type: "monstera", s: 1.1, r: 18 },
    { y: 340, side: -1, type: "palm", s: 0.85, r: -25 },
    { y: 460, side: 1, type: "broad", s: 1, r: 10 },
    { y: 580, side: -1, type: "monstera", s: 0.95, r: -15 },
    { y: 700, side: 1, type: "fern", s: 1.05, r: 20 },
    { y: 820, side: -1, type: "palm", s: 0.9, r: -8 },
    { y: 940, side: 1, type: "broad", s: 1.15, r: 22 },
    { y: 1080, side: -1, type: "monstera", s: 1, r: -20 },
    { y: 1200, side: 1, type: "fern", s: 0.88, r: 14 },
    { y: 1340, side: -1, type: "palm", s: 1.05, r: -18 },
    { y: 1480, side: 1, type: "broad", s: 0.92, r: 8 },
    { y: 1620, side: -1, type: "monstera", s: 1.1, r: -10 },
    { y: 1760, side: 1, type: "fern", s: 0.95, r: 25 },
    { y: 1900, side: -1, type: "palm", s: 0.88, r: -22 },
    { y: 2040, side: 1, type: "broad", s: 1.05, r: 12 },
    { y: 2180, side: -1, type: "monstera", s: 0.9, r: -16 },
    { y: 2320, side: 1, type: "fern", s: 1.1, r: 18 },
    { y: 2460, side: -1, type: "palm", s: 0.95, r: -14 },
    { y: 2600, side: 1, type: "broad", s: 1, r: 20 },
    { y: 2740, side: -1, type: "monstera", s: 1.05, r: -8 },
    { y: 2880, side: 1, type: "fern", s: 0.9, r: 15 },
    { y: 3020, side: -1, type: "palm", s: 1, r: -20 },
    { y: 3160, side: 1, type: "broad", s: 0.95, r: 10 },
    { y: 3300, side: -1, type: "monstera", s: 1.1, r: -12 },
    { y: 3440, side: 1, type: "fern", s: 0.88, r: 22 },
    { y: 3580, side: -1, type: "palm", s: 1, r: -18 },
  ];

  return (
    <div
      className="vine-guide"
      aria-hidden
      style={{
        transform: `translate3d(${swayX}px, ${swayY - depthShift}px, 0)`,
      }}
    >
      {/* Back layer — softer, more blurred for depth */}
      <svg
        className="vine-layer vine-layer--back"
        viewBox="0 0 160 3800"
        preserveAspectRatio="xMidYMin meet"
      >
        <defs>
          <linearGradient id="stemBack" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3d2e1f" />
            <stop offset="50%" stopColor="#5a4630" />
            <stop offset="100%" stopColor="#0a4035" />
          </linearGradient>
        </defs>
        <path
          d="M95 0
             C 120 180, 55 360, 90 540
             C 130 720, 50 900, 95 1080
             C 135 1260, 45 1440, 90 1620
             C 125 1800, 55 1980, 95 2160
             C 140 2340, 40 2520, 90 2700
             C 130 2880, 50 3060, 95 3240
             C 115 3420, 70 3600, 95 3800"
          fill="none"
          stroke="url(#stemBack)"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeDasharray={`${dashSide * 0.85} ${pathLen}`}
          style={{ transition: "stroke-dasharray 0.1s linear" }}
          opacity="0.45"
        />
      </svg>

      {/* Main vine layer */}
      <svg
        className="vine-layer vine-layer--main"
        viewBox="0 0 160 3800"
        preserveAspectRatio="xMidYMin meet"
      >
        <defs>
          <linearGradient id="vineStem" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4a3828" />
            <stop offset="25%" stopColor="#6b5238" />
            <stop offset="55%" stopColor="#8a6c43" />
            <stop offset="80%" stopColor="#1a6b55" />
            <stop offset="100%" stopColor="#0d4a3c" />
          </linearGradient>
          <linearGradient id="leafGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2a9a78" />
            <stop offset="40%" stopColor="#1a7a5c" />
            <stop offset="100%" stopColor="#0a4a38" />
          </linearGradient>
          <linearGradient id="leafLight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3db88a" />
            <stop offset="100%" stopColor="#1a6b4a" />
          </linearGradient>
          <linearGradient id="fernGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1a5c48" />
            <stop offset="50%" stopColor="#2a8a6a" />
            <stop offset="100%" stopColor="#0d4030" />
          </linearGradient>
          <filter id="leafSoft" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="0.8" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="depthBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.4" />
          </filter>
        </defs>

        {/* Main woody stem */}
        <path
          d="M70 0
             C 100 140, 35 280, 70 420
             C 110 560, 25 700, 70 840
             C 115 980, 20 1120, 70 1260
             C 105 1400, 30 1540, 70 1680
             C 120 1820, 15 1960, 70 2100
             C 100 2240, 35 2380, 70 2520
             C 110 2660, 25 2800, 70 2940
             C 105 3080, 30 3220, 70 3360
             C 95 3500, 45 3640, 70 3800"
          fill="none"
          stroke="url(#vineStem)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={`${dashMain} ${pathLen}`}
          style={{ transition: "stroke-dasharray 0.1s linear" }}
        />

        {/* Secondary tendril */}
        <path
          d="M70 0
             C 45 160, 95 320, 60 480
             C 30 640, 100 800, 65 960
             C 25 1120, 105 1280, 60 1440
             C 28 1600, 100 1760, 65 1920
             C 30 2080, 105 2240, 60 2400
             C 35 2560, 95 2720, 65 2880
             C 40 3040, 90 3200, 60 3360
             C 50 3520, 80 3680, 70 3800"
          fill="none"
          stroke="rgba(26,120,95,0.55)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={`${dashMain * 0.92} ${pathLen}`}
          style={{ transition: "stroke-dasharray 0.1s linear" }}
        />

        {/* Thin hanging vines */}
        <path
          d="M55 80 Q 40 200 48 320 Q 55 440 42 560"
          fill="none"
          stroke="rgba(20,90,70,0.4)"
          strokeWidth="1.2"
          strokeDasharray={`${dashMain * 0.7} ${pathLen}`}
          style={{ transition: "stroke-dasharray 0.1s linear" }}
        />
        <path
          d="M85 400 Q 100 520 90 640 Q 80 760 95 880"
          fill="none"
          stroke="rgba(20,90,70,0.35)"
          strokeWidth="1.1"
          strokeDasharray={`${dashMain * 0.65} ${pathLen}`}
          style={{ transition: "stroke-dasharray 0.1s linear" }}
        />

        {/* Leaves */}
        {leaves.map((leaf, i) => {
          const visible = progress > (i + 0.5) / (leaves.length + 2);
          const ox = 70 + leaf.side * 38;
          return (
            <g
              key={`${leaf.y}-${i}`}
              opacity={visible ? 1 : 0}
              style={{
                transition: "opacity 0.55s ease, transform 0.5s ease",
                transformOrigin: `${ox}px ${leaf.y}px`,
              }}
              transform={`translate(${ox}, ${leaf.y}) rotate(${leaf.r}) scale(${leaf.s})`}
              filter="url(#leafSoft)"
            >
              {leaf.type === "monstera" && (
                <>
                  <ellipse cx="0" cy="0" rx="18" ry="30" fill="url(#leafGrad)" />
                  <path
                    d="M0 -26 Q 10 -4 0 28"
                    stroke="rgba(180,230,190,0.35)"
                    strokeWidth="1.2"
                    fill="none"
                  />
                  <circle cx={leaf.side * 6} cy={-6} r="3.2" fill="rgba(6,5,5,0.4)" />
                  <circle cx={leaf.side * -4} cy={6} r="2.4" fill="rgba(6,5,5,0.35)" />
                  <circle cx={leaf.side * 3} cy={14} r="2" fill="rgba(6,5,5,0.3)" />
                  {/* hanging tendril */}
                  <path
                    d={`M0 28 Q ${leaf.side * 8} 48 ${leaf.side * 3} 68`}
                    stroke="rgba(26,120,95,0.5)"
                    strokeWidth="1.3"
                    fill="none"
                  />
                </>
              )}
              {leaf.type === "fern" && (
                <>
                  {/* central rachis */}
                  <path
                    d="M0 -32 L0 28"
                    stroke="rgba(30,110,85,0.7)"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  {[-24, -16, -8, 0, 8, 16, 24].map((py, j) => (
                    <path
                      key={j}
                      d={`M0 ${py} Q ${leaf.side * (14 + (j % 3) * 2)} ${py - 4} ${leaf.side * (18 + (j % 2))} ${py + 2}`}
                      stroke="url(#fernGrad)"
                      strokeWidth="2.2"
                      fill="none"
                      strokeLinecap="round"
                    />
                  ))}
                </>
              )}
              {leaf.type === "palm" && (
                <>
                  {[ -40, -28, -14, 0, 14, 28, 40 ].map((ang, j) => {
                    const rad = (ang * Math.PI) / 180;
                    const len = 32 + (j % 3) * 4;
                    return (
                      <path
                        key={j}
                        d={`M0 0 Q ${Math.sin(rad) * len * 0.5} ${-Math.cos(rad) * len * 0.4} ${Math.sin(rad) * len} ${-Math.cos(rad) * len}`}
                        stroke="url(#leafLight)"
                        strokeWidth="2.8"
                        fill="none"
                        strokeLinecap="round"
                        opacity={0.85 - j * 0.04}
                      />
                    );
                  })}
                </>
              )}
              {leaf.type === "broad" && (
                <>
                  <ellipse cx="0" cy="0" rx="14" ry="26" fill="url(#leafGrad)" opacity="0.95" />
                  <path
                    d="M0 -22 Q 6 0 0 24"
                    stroke="rgba(200,240,200,0.3)"
                    strokeWidth="1"
                    fill="none"
                  />
                  <path
                    d={`M0 24 Q ${leaf.side * 5} 38 ${leaf.side * 2} 52`}
                    stroke="rgba(26,120,95,0.45)"
                    strokeWidth="1.1"
                    fill="none"
                  />
                </>
              )}
            </g>
          );
        })}
      </svg>

      {/* Front accent layer — thinner vines closer to camera */}
      <svg
        className="vine-layer vine-layer--front"
        viewBox="0 0 160 3800"
        preserveAspectRatio="xMidYMin meet"
      >
        <path
          d="M40 60
             C 25 200, 55 340, 35 480
             C 15 620, 50 760, 38 900
             C 22 1040, 55 1180, 40 1320
             C 20 1460, 55 1600, 38 1740
             C 25 1880, 50 2020, 40 2160
             C 28 2300, 55 2440, 38 2580
             C 22 2720, 50 2860, 40 3000
             C 30 3140, 48 3280, 40 3420
             C 35 3560, 42 3700, 40 3800"
          fill="none"
          stroke="rgba(40,140,110,0.5)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeDasharray={`${dashMain * 0.88} ${pathLen}`}
          style={{ transition: "stroke-dasharray 0.1s linear" }}
        />
        {/* hanging strands */}
        {[180, 520, 890, 1250, 1680, 2100, 2550, 3000, 3400].map((y, i) => {
          const vis = progress > (i + 1) / 12;
          return (
            <g key={y} opacity={vis ? 0.7 : 0} style={{ transition: "opacity 0.5s ease" }}>
              <path
                d={`M${55 + (i % 3) * 12} ${y} Q ${48 + (i % 2) * 10} ${y + 40} ${52 + (i % 3) * 8} ${y + 75}`}
                fill="none"
                stroke="rgba(30,110,85,0.55)"
                strokeWidth="1.1"
              />
              <path
                d={`M${58 + (i % 3) * 10} ${y + 10} Q ${62} ${y + 50} ${55} ${y + 90}`}
                fill="none"
                stroke="rgba(30,110,85,0.4)"
                strokeWidth="0.9"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

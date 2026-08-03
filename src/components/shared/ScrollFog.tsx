"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Dense tropical fog at viewport edges:
 * - appears from TOP when scrolling DOWN
 * - appears from BOTTOM when scrolling UP
 */
export function ScrollFog() {
  const [dir, setDir] = useState<"down" | "up" | null>(null);
  const [intensity, setIntensity] = useState(0);
  const lastY = useRef(0);
  const vel = useRef(0);
  const raf = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastY.current;
      lastY.current = y;

      // smooth velocity
      vel.current = vel.current * 0.65 + dy * 0.35;
      const v = vel.current;

      if (Math.abs(v) < 0.4) return;

      if (v > 0) {
        setDir("down");
        setIntensity(Math.min(1, Math.abs(v) / 28));
      } else {
        setDir("up");
        setIntensity(Math.min(1, Math.abs(v) / 28));
      }

      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(decay);
    };

    const decay = () => {
      setIntensity((i) => {
        const next = i * 0.92;
        if (next > 0.02) {
          raf.current = requestAnimationFrame(decay);
          return next;
        }
        setDir(null);
        return 0;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  const show = intensity > 0.03 && dir;

  return (
    <div className="scroll-fog" aria-hidden>
      {/* TOP fog — when scrolling down */}
      <div
        className="scroll-fog__layer scroll-fog__top"
        style={{
          opacity: dir === "down" ? intensity : 0,
          transform: `translateY(${dir === "down" ? (1 - intensity) * -12 : -20}%)`,
        }}
      />
      {/* BOTTOM fog — when scrolling up */}
      <div
        className="scroll-fog__layer scroll-fog__bottom"
        style={{
          opacity: dir === "up" ? intensity : 0,
          transform: `translateY(${dir === "up" ? (1 - intensity) * 12 : 20}%)`,
        }}
      />
    </div>
  );
}

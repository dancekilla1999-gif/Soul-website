"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Кастомный курсор — тонкое золотое кольцо с инерцией.
 * Только для десктопа с точным указателем; system-курсор скрывается через CSS.
 */
export function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    setEnabled(true);
    document.documentElement.classList.add("cursor-none-desktop");

    const ring = ringRef.current!;
    const dot = dotRef.current!;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let frame = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
    };

    const isInteractive = (el: Element | null) =>
      !!el?.closest("a, button, [data-cursor], input, textarea, label, select");

    const onOver = (e: MouseEvent) => {
      ring.dataset.active = isInteractive(e.target as Element) ? "true" : "false";
    };

    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      frame = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    frame = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove("cursor-none-desktop");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[70] -ml-4 -mt-4 h-8 w-8 rounded-full border border-gold/70 transition-[width,height,opacity,background-color] duration-300 data-[active=true]:h-12 data-[active=true]:w-12 data-[active=true]:-ml-6 data-[active=true]:-mt-6 data-[active=true]:bg-gold/10"
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[70] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-gold-soft"
      />
    </>
  );
}

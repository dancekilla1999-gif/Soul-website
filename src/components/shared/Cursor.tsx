"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Кастомный курсор SOUL — золотое кольцо с точкой и мягким свечением.
 * Только desktop (hover + fine pointer). System-курсор скрывается через CSS.
 */
export function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    setEnabled(true);
    document.documentElement.classList.add("cursor-none-desktop");

    const ring = ringRef.current;
    const dot = dotRef.current;
    const glow = glowRef.current;
    if (!ring || !dot || !glow) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let frame = 0;
    let visible = false;

    const show = () => {
      if (visible) return;
      visible = true;
      ring.style.opacity = "1";
      dot.style.opacity = "1";
      glow.style.opacity = "0.5";
    };

    const hide = () => {
      visible = false;
      ring.style.opacity = "0";
      dot.style.opacity = "0";
      glow.style.opacity = "0";
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      show();
      // Точка следует мгновенно
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      glow.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
    };

    const isInteractive = (el: EventTarget | null) => {
      if (!(el instanceof Element)) return false;
      return !!el.closest(
        "a, button, [data-cursor], input, textarea, label, select, [role='button']"
      );
    };

    const onOver = (e: MouseEvent) => {
      const active = isInteractive(e.target);
      ring.dataset.active = active ? "true" : "false";
      glow.dataset.active = active ? "true" : "false";
    };

    const onLeave = () => hide();

    const loop = () => {
      // Плавное следование кольца
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    frame = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove("cursor-none-desktop");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      {/* Мягкое свечение */}
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-24 w-24 rounded-full opacity-0 transition-opacity duration-300 data-[active=true]:opacity-70"
        style={{
          background:
            "radial-gradient(circle, rgba(214, 183, 137, 0.25) 0%, rgba(176, 139, 90, 0.08) 40%, transparent 70%)",
          willChange: "transform",
        }}
      />

      {/* Кольцо */}
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-9 w-9 rounded-full border border-[#d6b789]/60 opacity-0 transition-[width,height,border-color,background-color] duration-300 data-[active=true]:h-14 data-[active=true]:w-14 data-[active=true]:border-[#d6b789] data-[active=true]:bg-[rgba(176,139,90,0.12)]"
        style={{ willChange: "transform" }}
      />

      {/* Центральная точка */}
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-[#d6b789] opacity-0 shadow-[0_0_8px_rgba(214,183,137,0.6)]"
        style={{ willChange: "transform" }}
      />
    </>
  );
}

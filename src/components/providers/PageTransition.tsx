"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * Плавные переходы между страницами:
 * — мягкий fade + лёгкий подъём + лёгкий blur
 * — уважает prefers-reduced-motion
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  if (reduce) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 16, filter: "blur(5px)" }}
        animate={{
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: {
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
            opacity: { duration: 0.4 },
            filter: { duration: 0.45 },
          },
        }}
        exit={{
          opacity: 0,
          y: -8,
          filter: "blur(4px)",
          transition: {
            duration: 0.28,
            ease: [0.4, 0, 1, 1],
          },
        }}
        className="will-change-[opacity,transform,filter]"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * Тонкая шторка при смене страницы — премиальный акцент в духе lounge.
 */
export function TransitionCurtain() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const prev = useRef(pathname);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (reduce) return;
    if (prev.current === pathname) return;
    prev.current = pathname;
    setShow(true);
    const t = window.setTimeout(() => setShow(false), 540);
    return () => window.clearTimeout(t);
  }, [pathname, reduce]);

  return (
    <AnimatePresence>
      {show && !reduce && (
        <motion.div
          aria-hidden
          key={pathname}
          className="pointer-events-none fixed inset-0 z-[70]"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.52, times: [0, 0.38, 1], ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(ellipse at 50% 35%, rgba(176,139,90,0.14) 0%, rgba(6,5,5,0.82) 50%, #060505 100%)",
          }}
        />
      )}
    </AnimatePresence>
  );
}

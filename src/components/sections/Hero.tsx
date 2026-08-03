"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { site } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/shared/MagneticButton";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex h-[100svh] min-h-[640px] items-center justify-center overflow-hidden"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 animate-ken-burns">
          <Image
            src="/images/hero.jpg"
            alt="Интерьер ресторана SOUL — оазис природы в сердце Москвы"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_22%]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-noir/70 via-noir/40 to-noir" />
        <div className="absolute inset-0 bg-noir/25" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(6,5,5,0.75)_100%)]" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="container-wide relative z-10 flex flex-col items-center text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow mb-7 text-gold-soft"
        >
          {site.address.city} · Restaurant &amp; Lounge
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="text-balance font-serif text-5xl font-light leading-[1.02] text-bone sm:text-7xl lg:text-8xl"
        >
          {site.concept}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 max-w-xl text-pretty text-base tracking-wide text-bone/80 sm:text-lg"
        >
          {site.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-11 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Magnetic>
            <Button asChild size="lg" variant="gold">
              <Link href="#reserve">Забронировать столик</Link>
            </Button>
          </Magnetic>
          <Magnetic>
            <Button asChild size="lg" variant="outline">
              <Link href="#menu">Смотреть меню</Link>
            </Button>
          </Magnetic>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-9 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-[10px] uppercase tracking-eyebrow text-bone/50">
            Листайте вниз
          </span>
          <div className="flex h-11 w-6 justify-center rounded-full border border-white/25 p-1.5">
            <span className="h-2 w-1 animate-scroll-dot rounded-full bg-gold" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

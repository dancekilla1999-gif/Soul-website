"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";

const stats = [
  { value: "2025", label: "Год открытия" },
  { value: "10", label: "Часов до рассвета" },
  { value: "∞", label: "Живых эмоций" },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="about" className="relative overflow-hidden py-28 lg:py-40">
      <div className="container-wide">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div ref={ref} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <motion.div style={{ y }} className="absolute inset-[-8%]">
                <Image
                  src="/images/interior-hall.jpg"
                  alt="Зал SOUL — хрусталь, зелень и тёплый свет"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-noir/50 to-transparent" />
            </div>
            <div className="pointer-events-none absolute -bottom-5 -right-5 -z-0 hidden h-full w-full rounded-sm border border-gold/25 lg:block" />
          </div>

          <div>
            <SectionHeading
              eyebrow="О пространстве"
              title="Пространство, где вечер меняет свой ритм"
              intro="SOUL — это оазис природы в сердце Москвы. Своды живой зелени, хрусталь и тёплый свет создают атмосферу, в которой время идёт иначе. Мы соединили авторскую гастрономию, коктейли и живую музыку в одно цельное впечатление."
            />

            <Reveal delay={0.15}>
              <p className="mt-6 text-pretty leading-relaxed text-ash">
                Здесь один вечер вмещает несколько состояний: неспешный ужин
                перетекает во встречу с близкими, а затем — в ночь под живой вокал
                и DJ-сеты. Каждая деталь продумана, чтобы вы чувствовали, а не
                просто наблюдали.
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
                {stats.map((s) => (
                  <div key={s.label}>
                    <div className="font-serif text-4xl text-gold-soft sm:text-5xl">
                      {s.value}
                    </div>
                    <div className="mt-2 text-xs uppercase tracking-wide2 text-ash">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { JungleAmbience } from "@/components/shared/JungleAmbience";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Carousel } from "@/components/shared/Carousel";

const stats = [
  { value: "2025", label: "Год открытия" },
  { value: "10", label: "Часов до рассвета" },
  { value: "∞", label: "Живых эмоций" },
];

const aboutSlides = [
  { src: "/images/gallery/bar-arches.jpg", alt: "Зал Соул — подсвеченные арки и зелень" },
  { src: "/images/gallery/chandelier-ferns.jpg", alt: "Хрустальная люстра в зелени под потолком" },
  { src: "/images/gallery/cocktail-hookah.jpg", alt: "Коктейль и кальян на баре Соул" },
  { src: "/images/gallery/bar-mirror-wall.jpg", alt: "Зал Соул — зеркальные арки и бар" },
  { src: "/images/gallery/lounge-blue-red.jpg", alt: "Лаундж-зона — синие диваны и бордовые кресла" },
  { src: "/images/gallery/soul-sign-glow.jpg", alt: "Светящийся логотип Соул среди зелени" },
  { src: "/images/gallery/bar-red-chairs.jpg", alt: "Бар Соул — люстры и бордовые кресла" },
  { src: "/images/gallery/chandelier-rays.jpg", alt: "Большая люстра в лучах света" },
  { src: "/images/gallery/waitress-bw.jpg", alt: "Атмосфера вечера в Соул" },
  { src: "/images/gallery/dj-peacock-screen.jpg", alt: "Диджей-сет на фоне проекции с павлинами" },
];

export function About() {
  return (
    <section id="about" className="relative overflow-hidden py-20 sm:py-24 lg:py-36">
      <JungleAmbience />
      <div className="container-wide relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative order-2 lg:order-1">
            <Carousel slides={aboutSlides} />
            <div className="pointer-events-none absolute -bottom-4 -right-4 -z-0 hidden h-full w-full rounded-sm border border-gold/20 lg:block" />
          </div>

          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="О пространстве"
              title="Вечер в другом ритме"
              intro="Место с характером, зелёный «оазис», где каждая деталь дышит стилем и уютом для воплощения самых смелых идей."
            />

            <Reveal delay={0.12}>
              <p className="mt-6 text-pretty text-[16px] leading-[1.75] text-ash sm:text-base">
                Авторская гастрономия, коктейли и шоу-программы в одном пространстве. Каждую
                пятницу и субботу: диджей-сеты и живая музыка.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/[0.07] pt-8 sm:gap-6 sm:mt-12">
                {stats.map((s) => (
                  <div key={s.label} className="text-center sm:text-left">
                    <div className="font-serif text-3xl leading-none text-gold-soft sm:text-4xl lg:text-5xl">
                      {s.value}
                    </div>
                    <div className="mt-2.5 text-[12px] uppercase tracking-wide2 text-ash sm:text-xs">
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

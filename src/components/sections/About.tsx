"use client";

import { JungleAmbience } from "@/components/shared/JungleAmbience";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Carousel, type CarouselSlide } from "@/components/shared/Carousel";

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

// Галерея блюд для карусели на /about ("Еда") — реальные фото с фотосъёмки кухни.
export const aboutFoodSlides: CarouselSlide[] = [
  { src: "/images/menu/banner-cheese-board.jpg", alt: "Сырная тарелка с мёдом и виноградом — кухня Соул" },
  { src: "/images/menu/tartare-beef.jpg", alt: "Тартар из говядины — подача Соул" },
  { src: "/images/menu/salad-caesar.jpg", alt: "Цезарь — авторская подача Соул" },
  { src: "/images/menu/food-berry-dessert.jpg", alt: "Десерт с ягодами и мороженым" },
  { src: "/images/menu/food-mousse-glass.jpg", alt: "Десерт в бокале — подача на подносе со мхом" },
  { src: "/images/menu/food-tomato-bruschetta.jpg", alt: "Брускетта с томатами и зеленью" },
  { src: "/images/menu/food-stuffed-peppers.jpg", alt: "Фаршированный перец — авторское блюдо" },
  { src: "/images/menu/food-sushi-rolls.jpg", alt: "Сет роллов с соевым соусом" },
  { src: "/images/menu/food-caesar-shrimp.jpg", alt: "Салат с креветками и перепелиными яйцами" },
  { src: "/images/menu/food-caprese.jpg", alt: "Капрезе с томатами и моцареллой" },
  { src: "/images/menu/food-pumpkin-soup.jpg", alt: "Тыквенный крем-суп" },
];

const defaultIntro =
  "Место с характером, зелёный «оазис», где каждая деталь дышит стилем и уютом для воплощения самых смелых идей. Авторская гастрономия, коктейли и шоу-программы в одном пространстве. Каждую пятницу и субботу: диджей-сеты и живая музыка.";

interface AboutProps {
  /** На /about первая часть мысли уже раскрыта в подзаголовке PageHero сверху
   * страницы — сюда передаётся только вторая часть, чтобы не дублировать её
   * целиком. На главной остаётся полный текст (значение по умолчанию). */
  intro?: string;
  /** Переопределяет фото карусели — используется на /about для блока «Еда». */
  slides?: CarouselSlide[];
}

export function About({ intro = defaultIntro, slides = aboutSlides }: AboutProps) {
  return (
    <section id="about" className="relative overflow-hidden py-20 sm:py-24 lg:py-36">
      <JungleAmbience />
      <div className="container-wide relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative order-2 lg:order-1">
            <Carousel slides={slides} />
            <div className="pointer-events-none absolute -bottom-4 -right-4 -z-0 hidden h-full w-full rounded-sm border border-gold/20 lg:block" />
          </div>

          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="О пространстве"
              title="Вечер в другом ритме"
              intro={intro}
            />

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

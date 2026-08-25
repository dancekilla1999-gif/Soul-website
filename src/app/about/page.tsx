import type { Metadata } from "next";
import { About, aboutFoodSlides } from "@/components/sections/About";
import { ConceptStates } from "@/components/sections/ConceptStates";
import { Atmosphere } from "@/components/sections/Atmosphere";
import { WhyUs } from "@/components/sections/WhyUs";
import { site } from "@/lib/data";
import { PageHero } from "@/components/shared/PageHero";

export const metadata: Metadata = {
  title: "О нас",
  description: `О пространстве ${site.name}: оазис природы в сердце Москвы у метро Тульская. Концепция, атмосфера и философия вечера.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="О пространстве"
        title="О нас"
        subtitle="Оазис в центре Москвы, место с характером, где каждая деталь дышит стилем и уютом для воплощения самых смелых идей."
      />
      <About
        intro="Авторская гастрономия, коктейли и шоу-программы в одном пространстве. Каждую пятницу и субботу: диджей-сеты и живая музыка."
        slides={aboutFoodSlides}
      />
      <ConceptStates />
      <Atmosphere />
      <WhyUs />
    </>
  );
}

import type { Metadata } from "next";
import { About } from "@/components/sections/About";
import { ConceptStates } from "@/components/sections/ConceptStates";
import { Atmosphere } from "@/components/sections/Atmosphere";
import { WhyUs } from "@/components/sections/WhyUs";
import { site } from "@/lib/data";
import { PageHero } from "@/components/shared/PageHero";

export const metadata: Metadata = {
  title: "О нас",
  description: `О пространстве ${site.name}: оазис природы в сердце Москвы. Концепция, атмосфера и философия вечера.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="О пространстве"
        title="Где вечер меняет свой ритм"
        subtitle="SOUL — это оазис природы в сердце Москвы. Своды живой зелени, хрусталь и тёплый свет создают атмосферу, в которой время идёт иначе."
      />
      <About />
      <ConceptStates />
      <Atmosphere />
      <WhyUs />
    </>
  );
}

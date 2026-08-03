import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { ConceptStates } from "@/components/sections/ConceptStates";
import { Atmosphere } from "@/components/sections/Atmosphere";
import { Menu } from "@/components/sections/Menu";
import { Bar } from "@/components/sections/Bar";
import { Events } from "@/components/sections/Events";
import { Gallery } from "@/components/sections/Gallery";
import { WhyUs } from "@/components/sections/WhyUs";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { Reservation } from "@/components/sections/Reservation";
import { Contacts } from "@/components/sections/Contacts";

/**
 * Главная страница SOUL — одностраничный сценарий:
 * впечатление → концепция → кухня → афиша → доверие → бронирование.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <ConceptStates />
      <Atmosphere />
      <Menu />
      <Bar />
      <Events />
      <Gallery />
      <WhyUs />
      <Testimonials />
      <Faq />
      <Reservation />
      <Contacts />
    </>
  );
}

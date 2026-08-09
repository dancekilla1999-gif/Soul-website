import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { ConceptStates } from "@/components/sections/ConceptStates";
import { Atmosphere } from "@/components/sections/Atmosphere";
import { WhyUs } from "@/components/sections/WhyUs";
import { Testimonials } from "@/components/sections/Testimonials";
import { Events } from "@/components/sections/Events";

/**
 * Главная — витрина: герой, концепция, атмосфера, афиша.
 * Бронь и контакты — на /contacts.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <ConceptStates />
      <Atmosphere />
      <Events />
      <WhyUs />
      <Testimonials />
    </>
  );
}

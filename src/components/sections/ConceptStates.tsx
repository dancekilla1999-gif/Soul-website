"use client";

import { motion } from "framer-motion";
import { conceptStates } from "@/lib/data";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { staggerContainer, staggerItem } from "@/components/shared/Reveal";

/**
 * «Один вечер — несколько состояний».
 */
export function ConceptStates() {
  return (
    <section className="relative border-t border-white/10 bg-graphite/40 py-24 lg:py-32">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Концепция"
          title="Один вечер — несколько состояний"
          intro="В SOUL вечер не стоит на месте. Он перетекает из одного настроения в другое — и вы выбираете свой ритм."
          align="center"
          className="mb-16 lg:mb-20"
        />

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px" }}
          className="grid gap-px overflow-hidden rounded-sm border border-white/10 bg-white/[0.06] md:grid-cols-3"
        >
          {conceptStates.map((state, i) => (
            <motion.li
              key={state.title}
              variants={staggerItem}
              className="group relative bg-noir p-9 transition-colors duration-500 hover:bg-graphite lg:p-12"
            >
              <span className="font-serif text-5xl text-gold/25 transition-colors duration-500 group-hover:text-gold/50">
                0{i + 1}
              </span>
              <h3 className="mt-6 font-serif text-2xl text-bone lg:text-3xl">
                {state.title}
              </h3>
              <p className="mt-4 text-pretty text-sm leading-relaxed text-ash">
                {state.text}
              </p>
              <span className="mt-8 block h-px w-10 bg-gold/40 transition-all duration-500 group-hover:w-20" />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

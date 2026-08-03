"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Music4 } from "lucide-react";
import { events } from "@/lib/data";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { staggerContainer, staggerItem } from "@/components/shared/Reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Events() {
  return (
    <section id="events" className="relative overflow-hidden py-28 lg:py-40">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Афиша"
          title="Вечера, которые невозможно повторить"
          intro="Живая музыка, DJ-сеты и иммерсивные перформансы — каждую пятницу и субботу."
          align="center"
          className="mb-16 lg:mb-20"
        />

        

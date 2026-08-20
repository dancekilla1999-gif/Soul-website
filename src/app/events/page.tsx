import type { Metadata } from "next";
import { Events } from "@/components/sections/Events";
import { site } from "@/lib/data";
import { PageHero } from "@/components/shared/PageHero";

export const metadata: Metadata = {
  title: "Афиша",
  description: `Афиша ${site.name}: живая музыка, диджей-сеты и иммерсивные шоу каждую пятницу и субботу.`,
  alternates: { canonical: "/events" },
};

export default function EventsPage() {
  return (
    <>
      <PageHero
        title="Афиша"
        subtitle="Пятница и суббота — музыка и диджей."
      />
      <Events />
    </>
  );
}

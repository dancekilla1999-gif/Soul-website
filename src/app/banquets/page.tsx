import type { Metadata } from "next";
import { BanquetForm } from "@/components/sections/BanquetForm";
import { site } from "@/lib/data";
import { PageHero } from "@/components/shared/PageHero";

export const metadata: Metadata = {
  title: "Банкеты и мероприятия",
  description: `Банкеты, корпоративы и частные вечеринки в ${site.name}. Приватные зоны, индивидуальное меню, полное сопровождение.`,
  alternates: { canonical: "/banquets" },
};

export default function BanquetsPage() {
  return (
    <>
      <PageHero
        eyebrow="Банкеты"
        title="Банкеты"
        subtitle="Дни рождения, корпоративы и закрытые вечера."
      />
      <BanquetForm />
    </>
  );
}

import type { Metadata } from "next";
import { Reservation } from "@/components/sections/Reservation";
import { Contacts } from "@/components/sections/Contacts";
import { Faq } from "@/components/sections/Faq";
import { site } from "@/lib/data";
import { PageHero } from "@/components/shared/PageHero";

export const metadata: Metadata = {
  title: "Контакты и бронирование",
  description: `Забронировать столик в ${site.name}. Адрес, телефон, часы работы и форма заявки.`,
  alternates: { canonical: "/contacts" },
};

export default function ContactsPage() {
  return (
    <>
      <PageHero
        eyebrow="Контакты"
        title="Контакты и бронь"
        subtitle="Телефон, адрес и форма бронирования."
      />
      <Reservation />
      <Contacts />
      <Faq />
    </>
  );
}

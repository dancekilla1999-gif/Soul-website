import Link from "next/link";
import Image from "next/image";
import { Instagram, Send, MessageCircle } from "lucide-react";
import { nav, site } from "@/lib/data";

const socials = [
  { icon: Instagram, href: site.social.instagram, label: "Instagram" },
  { icon: Send, href: site.social.telegram, label: "Telegram" },
  { icon: MessageCircle, href: site.social.whatsapp, label: "WhatsApp" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-graphite/60">
      <div className="container-wide py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Image
              src="/images/logo.png"
              alt={site.name}
              width={150}
              height={54}
              className="h-10 w-auto"
            />
            <p className="mt-6 max-w-sm text-pretty text-sm leading-relaxed text-ash">
              {site.concept}. {site.tagline}.
            </p>
            <div className="mt-7 flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 text-bone/80 transition-all hover:border-gold hover:text-gold"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="eyebrow">Навигация</h3>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-ash transition-colors hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow">Контакты</h3>
            <ul className="mt-5 space-y-3 text-sm text-ash">
              <li>
                <a
                  href={`tel:${site.phoneHref}`}
                  className="transition-colors hover:text-gold"
                >
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="transition-colors hover:text-gold"
                >
                  {site.email}
                </a>
              </li>
              <li className="pt-1 leading-relaxed">
                {site.address.city}, {site.address.street}
              </li>
              {site.hours.map((h) => (
                <li key={h.day} className="leading-relaxed">
                  <span className="text-bone/70">{h.day}:</span> {h.time}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs tracking-wide2 text-ash/70 sm:flex-row">
          <p>
            © {year} {site.name} · {site.nameRu}. Все права защищены.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="transition-colors hover:text-gold">
              Политика конфиденциальности
            </Link>
            <Link href="#reserve" className="transition-colors hover:text-gold">
              Бронирование
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, Clock, Music4 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { events } from "@/lib/data";
import { Button } from "@/components/ui/button";

/**
 * Промо-попап ближайшего события с видео-афишей.
 * Показывается один раз в сутки (localStorage), с небольшой задержкой после
 * загрузки страницы, чтобы не бить по глазам мгновенно.
 */
const STORAGE_KEY = "soul_promo_popup_dismissed_at";
const SHOW_DELAY_MS = 1400;
const HIDE_FOR_MS = 24 * 60 * 60 * 1000; // 24 часа

export function PromoPopup() {
  const [open, setOpen] = useState(false);
  const event = events.find((e) => e.video) ?? null;

  useEffect(() => {
    if (!event) return;
    try {
      const last = localStorage.getItem(STORAGE_KEY);
      if (last && Date.now() - Number(last) < HIDE_FOR_MS) return;
    } catch {
      // localStorage недоступен (приватный режим и т.д.) — просто показываем
    }
    const t = setTimeout(() => setOpen(true), SHOW_DELAY_MS);
    return () => clearTimeout(t);
  }, [event]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function close() {
    setOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      // ignore
    }
  }

  if (!event) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[95] flex items-center justify-center bg-noir/90 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
        >
          <button
            aria-label="Закрыть"
            onClick={close}
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-bone transition hover:border-gold hover:text-gold"
          >
            <X className="h-5 w-5" />
          </button>

          <motion.div
            className="relative w-full max-w-sm overflow-hidden rounded-sm border border-gold/30 bg-graphite shadow-gold"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[9/16] w-full overflow-hidden">
              <video
                src={event.video}
                poster={event.poster}
                muted
                loop
                playsInline
                autoPlay
                preload="auto"
                className="absolute inset-0 h-full w-full object-cover"
                aria-label={`${event.title} — ${event.subtitle}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/10 to-transparent" />

              <span className="absolute left-5 top-5 border border-gold/50 bg-noir/60 px-3 py-1 text-[10px] uppercase tracking-eyebrow text-gold backdrop-blur-sm">
                Афиша недели
              </span>
            </div>

            <div className="p-6">
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-3xl text-gold-soft">{event.date}</span>
                <span className="text-[11px] uppercase tracking-eyebrow text-ash">
                  {event.weekday}
                </span>
              </div>
              <h3 className="mt-2 font-serif text-2xl text-bone">{event.title}</h3>
              <p className="mt-1 text-sm text-ash">{event.subtitle}</p>

              <div className="mt-4 space-y-1.5 border-t border-white/[0.07] pt-4">
                <p className="flex items-center gap-2 text-xs tracking-wide2 text-bone/70">
                  <Clock className="h-3.5 w-3.5 text-gold" />
                  Начало в {event.time}
                </p>
                {event.lineup.map((line) => (
                  <p
                    key={line}
                    className="flex items-center gap-2 text-xs tracking-wide2 text-ash"
                  >
                    <Music4 className="h-3.5 w-3.5 text-gold/70" />
                    {line}
                  </p>
                ))}
              </div>

              <Button asChild variant="gold" size="lg" className="mt-6 w-full" onClick={close}>
                <Link href="/contacts#reserve">Забронировать столик</Link>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

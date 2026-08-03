"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { nav, site } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/shared/MagneticButton";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-white/10 bg-noir/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="container-wide relative flex h-22 items-center justify-between lg:h-28" style={{minHeight:'5.5rem'}}>
        <Link
          href="#hero"
          aria-label={`${site.name} — на главную`}
          className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
        >
          <Image
            src="/images/logo.png"
            alt={site.name}
            width={240}
            height={70}
            priority
            className="h-12 w-auto sm:h-13 lg:h-14"
          />
        </Link>

        <nav className="hidden flex-1 items-center gap-7 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative text-[13px] uppercase tracking-wide2 text-bone/80 transition-colors hover:text-bone"
            >
              {item.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a
            href={`tel:${site.phoneHref}`}
            className="flex items-center gap-2 text-[13px] tracking-wide2 text-bone/80 transition-colors hover:text-gold"
          >
            <Phone className="h-3.5 w-3.5 text-gold" />
            {site.phone}
          </a>
          <Magnetic strength={0.4}>
            <Button asChild size="sm" data-cursor>
              <Link href="#reserve">Забронировать</Link>
            </Button>
          </Magnetic>
        </div>

        <button
          aria-label="Меню"
          onClick={() => setOpen((v) => !v)}
          className="relative z-10 flex h-11 w-11 items-center justify-center text-bone lg:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-0 flex flex-col bg-noir/98 backdrop-blur-xl lg:hidden"
          >
            <nav className="container-wide flex flex-1 flex-col justify-center gap-2">
              {nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i + 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 font-serif text-3xl text-bone transition-colors hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 flex flex-col gap-4"
              >
                <a
                  href={`tel:${site.phoneHref}`}
                  className="flex items-center gap-2 text-sm tracking-wide2 text-bone/80"
                >
                  <Phone className="h-4 w-4 text-gold" />
                  {site.phone}
                </a>
                <Button asChild size="lg" className="w-full">
                  <Link href="#reserve" onClick={() => setOpen(false)}>
                    Забронировать столик
                  </Link>
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

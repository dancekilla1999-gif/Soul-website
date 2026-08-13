/**
 * Единый источник контента сайта SOUL.
 * Данные берутся из src/data/content.json — редактируются через /admin.
 */

import content from "@/data/content.json";

export const site = content.site;

export const nav = [
  { label: "О нас", href: "/about" },
  { label: "Меню", href: "/menu" },
  { label: "Афиша", href: "/events" },
  { label: "Галерея", href: "/gallery" },
  { label: "Банкеты", href: "/banquets" },
  { label: "Контакты", href: "/contacts" },
] as const;

export const conceptStates = content.conceptStates;

export const advantages = [
  {
    icon: "Sparkles",
    title: "Шоу",
    text: "Иммерсивные перформансы за ужином.",
  },
  {
    icon: "Music4",
    title: "Музыка",
    text: "Живой вокал и DJ до утра.",
  },
  {
    icon: "UtensilsCrossed",
    title: "Кухня",
    text: "Авторские блюда и подача.",
  },
  {
    icon: "Wine",
    title: "Бар",
    text: "Коктейли и винная карта.",
  },
  {
    icon: "Leaf",
    title: "Интерьер",
    text: "Зелень, хрусталь, тёплый свет.",
  },
  {
    icon: "Crown",
    title: "VIP",
    text: "Приватные зоны и персональный сервис.",
  },
] as const;

export type MenuCategory = "Закуски" | "Основное" | "Из огня" | "Десерты" | "Коктейли";

export interface MenuItem {
  name: string;
  description: string;
  price: string;
  category: MenuCategory;
  tag?: "Сигниче" | "Выбор шефа" | "Веган" | "Хит";
  image?: string;
}

export const menuCategories: MenuCategory[] = [
  "Закуски",
  "Основное",
  "Из огня",
  "Десерты",
  "Коктейли",
];

export const menu = content.menu as MenuItem[];

export interface EventItem {
  date: string;
  weekday: string;
  title: string;
  subtitle: string;
  time: string;
  lineup: string[];
  poster: string;
  /** Необязательное видео вместо статичной картинки (используется poster как fallback/постер видео) */
  video?: string;
  featured: boolean;
}

export const events = content.events as EventItem[];

export const testimonials = content.testimonials;

export const faq = content.faq;

export const gallery = content.gallery;

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
    text: "Иммерсивный перформанс, дополняющий ужин.",
  },
  {
    icon: "UtensilsCrossed",
    title: "Кухня и бар",
    text: "Авторские блюда, коктейли и винная карта.",
  },
  {
    icon: "Flame",
    title: "Кальяны",
    text: "Премиальные табаки и широкий выбор — от классики до авторских миксов.",
  },
] as const;

export type MenuCategory =
  | "Кальян"
  | "Холодные закуски"
  | "Салаты"
  | "Горячие закуски"
  | "Супы"
  | "Горячие блюда"
  | "Гриль"
  | "Пасты"
  | "Бургеры"
  | "Пиццы"
  | "Роллы / Гунканы"
  | "Гарниры"
  | "Соусы"
  | "Десерты"
  | "Коктейли";

export interface MenuItem {
  name: string;
  description?: string;
  weight?: string;
  price: string;
  category: MenuCategory;
  tag?: "Сигниче" | "Выбор шефа" | "Веган" | "Хит";
  image?: string;
}

export const menuCategories: MenuCategory[] = [
  "Кальян",
  "Холодные закуски",
  "Салаты",
  "Горячие закуски",
  "Супы",
  "Горячие блюда",
  "Гриль",
  "Пасты",
  "Бургеры",
  "Пиццы",
  "Роллы / Гунканы",
  "Гарниры",
  "Соусы",
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

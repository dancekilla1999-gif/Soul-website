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
  { label: "Контакты", href: "/contacts" },
] as const;

export const conceptStates = content.conceptStates;

export const advantages = [
  {
    icon: "Sparkles",
    title: "Иммерсивные шоу",
    text: "Театрализованные перформансы, которые превращают ужин в событие.",
  },
  {
    icon: "Music4",
    title: "Живая музыка и DJ",
    text: "Вокал, живые инструменты и сеты резидентов до самого утра.",
  },
  {
    icon: "UtensilsCrossed",
    title: "Авторская кухня",
    text: "Продуманные сочетания и подача, в которой важна каждая деталь.",
  },
  {
    icon: "Wine",
    title: "Коктейльная карта",
    text: "Коктейли, продуманные до последней капли, и глубокая винная карта.",
  },
  {
    icon: "Leaf",
    title: "Природа в интерьере",
    text: "Своды зелени, хрусталь и живой свет — оазис посреди города.",
  },
  {
    icon: "Crown",
    title: "VIP-сервис",
    text: "Приватные зоны, персональный менеджер и внимание к каждому гостю.",
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

export const events = content.events;

export const testimonials = content.testimonials;

export const faq = content.faq;

export const gallery = content.gallery;

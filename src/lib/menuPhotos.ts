/**
 * Пул фото для нижнего баннера страницы «Меню» (`Menu.tsx`).
 * При переключении категории баннер показывает случайное фото из пула,
 * подобранного под смысл категории — так, чтобы «Закуски», «Бар» и
 * «Горячие блюда» визуально отличались друг от друга.
 *
 * Все изображения — из уже существующей библиотеки сайта
 * (`public/images/menu/`, `public/images/gallery/`), новых фото не добавлено.
 */

import type { MenuCategory } from "./data";

export interface MenuPhoto {
  src: string;
  alt: string;
}

type Filter = "Все" | MenuCategory;

const starters: MenuPhoto[] = [
  { src: "/images/menu/tartare-beef.jpg", alt: "Тартар из говядины — подача Соул" },
  { src: "/images/menu/food-tomato-bruschetta.jpg", alt: "Брускетта с томатами" },
  { src: "/images/menu/food-caprese.jpg", alt: "Капрезе с моцареллой и томатами" },
  { src: "/images/menu/banner-cheese-board.jpg", alt: "Сырная тарелка с мёдом и орехами" },
];

const salads: MenuPhoto[] = [
  { src: "/images/menu/salad-caesar.jpg", alt: "Салат Цезарь" },
  { src: "/images/menu/food-caesar-shrimp.jpg", alt: "Цезарь с креветками" },
  { src: "/images/menu/food-caprese.jpg", alt: "Капрезе с моцареллой и томатами" },
];

const mains: MenuPhoto[] = [
  { src: "/images/menu/food-pumpkin-soup.jpg", alt: "Тыквенный крем-суп" },
  { src: "/images/menu/food-stuffed-peppers.jpg", alt: "Фаршированный перец" },
];

const rolls: MenuPhoto[] = [
  { src: "/images/menu/food-sushi-rolls.jpg", alt: "Роллы — подача Соул" },
  { src: "/images/menu/banner-cheese-board.jpg", alt: "Сырная тарелка с мёдом и орехами" },
];

const desserts: MenuPhoto[] = [
  { src: "/images/menu/food-berry-dessert.jpg", alt: "Десерт с ягодами" },
  { src: "/images/menu/food-mousse-glass.jpg", alt: "Мусс в бокале" },
];

const cocktails: MenuPhoto[] = [
  { src: "/images/menu/cocktail-pink.jpg", alt: "Сигнатурный коктейль Соул" },
  { src: "/images/gallery/cocktail-hookah.jpg", alt: "Коктейль и кальян в лаунже Соул" },
];

const hookah: MenuPhoto[] = [
  { src: "/images/gallery/hookah-lounge.jpg", alt: "Кальян в лаундже Соул" },
  { src: "/images/gallery/hookah-cocktail-bar.jpg", alt: "Кальян у барной стойки" },
];

const all: MenuPhoto[] = [
  ...starters,
  ...salads,
  ...mains,
  ...rolls,
  ...desserts,
  ...cocktails,
  ...hookah,
].filter((photo, i, arr) => arr.findIndex((p) => p.src === photo.src) === i);

export const menuPhotoPools: Record<Filter, MenuPhoto[]> = {
  "Все": all,
  "Кальян": hookah,
  "Холодные закуски": starters,
  "Салаты": salads,
  "Горячие закуски": starters,
  "Супы": mains,
  "Горячие блюда": mains,
  "Гриль": mains,
  "Пасты": mains,
  "Бургеры": mains,
  "Пиццы": mains,
  "Роллы / Гунканы": rolls,
  "Гарниры": mains,
  "Соусы": mains,
  "Десерты": desserts,
  "Коктейли": cocktails,
};

/** Случайное фото из пула категории, по возможности отличное от предыдущего. */
export function pickMenuPhoto(filter: Filter, exclude?: string): MenuPhoto {
  const pool = menuPhotoPools[filter] ?? all;
  const candidates = exclude && pool.length > 1 ? pool.filter((p) => p.src !== exclude) : pool;
  return candidates[Math.floor(Math.random() * candidates.length)];
}

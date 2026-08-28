/**
 * Пул фото для нижнего баннера страницы «Меню» (`Menu.tsx`).
 * При переключении категории баннер показывает случайное фото из пула
 * этой конкретной категории — так, чтобы в «Супах» не выпадал бургер,
 * а в «Пиццах» — не суп. Каждый пул подобран по смыслу категории.
 *
 * Все изображения — из уже существующей библиотеки сайта
 * (`public/images/menu/`, `public/images/gallery/`).
 */

import type { MenuCategory } from "./data";

export interface MenuPhoto {
  src: string;
  alt: string;
}

type Filter = "Все" | MenuCategory;

const coldStarters: MenuPhoto[] = [
  { src: "/images/menu/tartare-beef.jpg", alt: "Тартар из говядины — подача Соул" },
  { src: "/images/menu/food-tomato-bruschetta.jpg", alt: "Брускетта с томатами" },
  { src: "/images/menu/food-caprese.jpg", alt: "Капрезе с моцареллой и томатами" },
  { src: "/images/menu/banner-cheese-board.jpg", alt: "Сырная тарелка с мёдом и орехами" },
];

const salads: MenuPhoto[] = [
  { src: "/images/menu/salad-caesar.jpg", alt: "Салат Цезарь" },
  { src: "/images/menu/food-caesar-shrimp.jpg", alt: "Цезарь с креветками" },
];

const soups: MenuPhoto[] = [
  { src: "/images/menu/food-pumpkin-soup.jpg", alt: "Тыквенный крем-суп" },
  { src: "/images/menu/soup-mussels.jpg", alt: "Томатный суп с морепродуктами" },
];

const mains: MenuPhoto[] = [
  { src: "/images/menu/food-stuffed-peppers.jpg", alt: "Фаршированный перец" },
  { src: "/images/menu/trout-moss.jpg", alt: "Стейк форели с соусом мисо" },
];

const grill: MenuPhoto[] = [
  { src: "/images/menu/trout-moss.jpg", alt: "Стейк форели с соусом мисо на гриле" },
];

const pasta: MenuPhoto[] = [
  { src: "/images/menu/pasta-seafood-ink.jpg", alt: "Лингвини с морепродуктами" },
];

const burgers: MenuPhoto[] = [
  { src: "/images/menu/burger-chicken.jpg", alt: "Бургер с курицей" },
];

const pizza: MenuPhoto[] = [
  { src: "/images/menu/pizza-burrata-pesto.jpg", alt: "Пицца с песто и бураттой" },
];

const rolls: MenuPhoto[] = [
  { src: "/images/menu/food-sushi-rolls.jpg", alt: "Роллы — подача Соул" },
];

const sides: MenuPhoto[] = [
  { src: "/images/menu/sweet-potato-fries.jpg", alt: "Батат фри с пармезаном" },
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
  ...coldStarters,
  ...salads,
  ...soups,
  ...mains,
  ...pasta,
  ...burgers,
  ...pizza,
  ...rolls,
  ...sides,
  ...desserts,
  ...cocktails,
  ...hookah,
].filter((photo, i, arr) => arr.findIndex((p) => p.src === photo.src) === i);

export const menuPhotoPools: Record<Filter, MenuPhoto[]> = {
  "Все": all,
  "Кальян": hookah,
  "Холодные закуски": coldStarters,
  "Салаты": salads,
  "Горячие закуски": coldStarters,
  "Супы": soups,
  "Горячие блюда": mains,
  "Гриль": grill,
  "Пасты": pasta,
  "Бургеры": burgers,
  "Пиццы": pizza,
  "Роллы / Гунканы": rolls,
  "Гарниры": sides,
  "Соусы": sides,
  "Десерты": desserts,
  "Коктейли": cocktails,
};

/** Случайное фото из пула категории, по возможности отличное от предыдущего. */
export function pickMenuPhoto(filter: Filter, exclude?: string): MenuPhoto {
  const pool = menuPhotoPools[filter] ?? all;
  const candidates = exclude && pool.length > 1 ? pool.filter((p) => p.src !== exclude) : pool;
  return candidates[Math.floor(Math.random() * candidates.length)];
}

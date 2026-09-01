/**
 * Фото блюд и коктейлей для страницы «Меню» (`Menu.tsx`).
 * Под списком блюд — карусель `menuCarouselPhotos`: все блюда и коктейли,
 * листается сама каждые несколько секунд и стрелками вручную.
 * Пулы по категориям (`menuPhotoPools`) сохранены для подбора фото по смыслу.
 *
 * Все фото — полноразмерные (без кадрирования, баннер их не обрезает,
 * см. `object-contain` в Menu.tsx) и, где это было доступно у фотографа,
 * сняты сбоку/под углом, а не строго сверху.
 *
 * Исключение — Пасты, Пиццы и Гарниры/Соусы: в присланной фотосессии
 * эти блюда сфотографированы только сверху (стандартная практика для
 * плоской подачи), кадра сбоку для них не существует.
 */

import type { MenuCategory } from "./data";

export interface MenuPhoto {
  src: string;
  alt: string;
}

type Filter = "Все" | MenuCategory;

const coldStarters: MenuPhoto[] = [
  { src: "/images/menu/tartare-beef.jpg", alt: "Тартар из говядины — подача Соул" },
  { src: "/images/menu/banner-cheese-board.jpg", alt: "Сырная тарелка с мёдом и орехами" },
];

const salads: MenuPhoto[] = [
  { src: "/images/menu/salad-greek-soul.jpg", alt: "Греческий салат" },
  { src: "/images/menu/salad-avocado-soul.jpg", alt: "Зелёный салат с авокадо" },
];

const soups: MenuPhoto[] = [
  { src: "/images/menu/food-pumpkin-soup.jpg", alt: "Тыквенный суп со страчателлой" },
  { src: "/images/menu/soup-mussels.jpg", alt: "Томатный суп с морепродуктами" },
];

const mains: MenuPhoto[] = [
  { src: "/images/menu/food-stuffed-peppers.jpg", alt: "Фаршированный перец" },
  { src: "/images/menu/dorado-grill.jpg", alt: "Дорадо на гриле" },
];

const grill: MenuPhoto[] = [
  { src: "/images/menu/dorado-grill.jpg", alt: "Дорадо на гриле" },
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
  { src: "/images/menu/food-sushi-rolls.jpg", alt: "Ролл темпура с креветкой" },
];

const sides: MenuPhoto[] = [
  { src: "/images/menu/sweet-potato-fries.jpg", alt: "Батат фри с пармезаном" },
];

const desserts: MenuPhoto[] = [
  { src: "/images/menu/dessert-chocolate-flan.jpg", alt: "Шоколадный флан" },
  { src: "/images/menu/food-mousse-glass.jpg", alt: "Тирамису в бокале" },
];

const cocktails: MenuPhoto[] = [
  { src: "/images/menu/cocktail-pink.jpg", alt: "Сигнатурный коктейль Соул" },
  { src: "/images/gallery/bar.jpg", alt: "Подсвеченная барная стойка Соул под хрустальной люстрой" },
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

/** Карусель под меню: все блюда и коктейли (интерьерные кадры не включаем). */
export const menuCarouselPhotos: MenuPhoto[] = all.filter((p) => p.src.startsWith("/images/menu/"));

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
  "Бургеры / Шаурма": burgers,
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

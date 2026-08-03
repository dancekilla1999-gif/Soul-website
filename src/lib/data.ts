/**
 * Единый источник контента сайта SOUL.
 * Меняйте тексты, меню, афишу и контакты здесь — весь сайт обновится автоматически.
 */

export const site = {
  name: "SOUL",
  nameRu: "СОУЛ",
  legalName: "Ресторан SOUL",
  tagline: "Живое пространство · Живые эмоции",
  concept: "Оазис природы в сердце Москвы",
  descriptionShort:
    "SOUL — ресторан-lounge в центре Москвы: авторская кухня, коктейли, живая музыка и иммерсивные шоу под сводом зелени и хрусталя.",
  phone: "+7 995 764 8888",
  phoneHref: "+79957648888",
  email: "reserve@soul-moscow.ru",
  address: {
    street: "Холодильный переулок, 3, стр. 2",
    city: "Москва",
    postal: "115191",
    country: "RU",
    lat: 55.7124,
    lng: 37.6231,
  },
  hours: [
    { day: "Пятница — Суббота", time: "19:00 — 05:00" },
    { day: "Воскресенье — Четверг", time: "По предварительному бронированию" },
  ],
  hoursSchema: [
    { days: ["Friday", "Saturday"], opens: "19:00", closes: "05:00" },
  ],
  priceRange: "₽₽₽₽",
  cuisine: ["Авторская", "Европейская", "Коктейльный бар"],
  social: {
    instagram: "https://instagram.com/",
    telegram: "https://t.me/",
    whatsapp: "https://wa.me/79957648888",
  },
  url: "https://soul-moscow.ru",
} as const;

export const nav = [
  { label: "О пространстве", href: "#about" },
  { label: "Атмосфера", href: "#atmosphere" },
  { label: "Кухня", href: "#menu" },
  { label: "Афиша", href: "#events" },
  { label: "Галерея", href: "#gallery" },
  { label: "Контакты", href: "#contacts" },
] as const;

/* — О пространстве / концепция — */
export const conceptStates = [
  {
    title: "Спокойный ужин",
    text: "Медленный вечер, авторская кухня и разговор, который никуда не спешит.",
  },
  {
    title: "Встреча с близкими",
    text: "Большой стол, коктейли и атмосфера, в которой время идёт иначе.",
  },
  {
    title: "Ночь под музыку",
    text: "Живые выступления и DJ-сеты, когда вечер меняет свой ритм.",
  },
] as const;

/* — Почему SOUL — */
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

/* — Меню — */
export type MenuCategory = "Закуски" | "Основное" | "Из огня" | "Десерты" | "Коктейли";

export interface MenuItem {
  name: string;
  description: string;
  price: string;
  category: MenuCategory;
  tag?: "Сигниче" | "Выбор шефа" | "Веган" | "Хит";
}

export const menuCategories: MenuCategory[] = [
  "Закуски",
  "Основное",
  "Из огня",
  "Десерты",
  "Коктейли",
];

export const menu: MenuItem[] = [
  {
    name: "Тартар из тунца, понзу, авокадо",
    description: "Жёлтопёрый тунец, соус понзу, авокадо-крем, кунжут и хрустящий рис.",
    price: "1 290 ₽",
    category: "Закуски",
    tag: "Сигниче",
  },
  {
    name: "Гребешок, цветная капуста, трюфель",
    description: "Обожжённый гребешок, крем из цветной капусты, чёрный трюфель.",
    price: "1

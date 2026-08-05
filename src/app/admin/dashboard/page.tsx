"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Tab = "contacts" | "menu" | "events" | "gallery" | "texts" | "faq";

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("contacts");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/check")
      .then((r) => r.json())
      .then((data) => {
        if (!data.authenticated) {
          router.replace("/admin");
        } else {
          setLoading(false);
        }
      })
      .catch(() => router.replace("/admin"));
  }, [router]);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white/50">
        Загрузка...
      </div>
    );
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "contacts", label: "Контакты" },
    { id: "texts", label: "Тексты / О нас" },
    { id: "menu", label: "Меню" },
    { id: "events", label: "Афиша" },
    { id: "gallery", label: "Галерея" },
    { id: "faq", label: "FAQ" },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-xl tracking-[0.25em] font-light">SOUL</span>
          <span className="text-white/40 text-sm">Админ-панель</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="/"
            target="_blank"
            className="text-sm text-white/50 hover:text-white transition"
          >
            Открыть сайт ↗
          </a>
          <button
            onClick={handleLogout}
            className="text-sm text-white/50 hover:text-red-400 transition"
          >
            Выйти
          </button>
        </div>
      </header>

      {/* Tabs */}
      <nav className="border-b border-white/10 px-6 flex gap-1 overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-3 text-sm whitespace-nowrap transition border-b-2 ${
              tab === t.id
                ? "border-white text-white"
                : "border-transparent text-white/40 hover:text-white/70"
            }`}
          >
            {t.label}
          </button>
        ))}
      </nav>

      {/* Content */}
      <main className="p-6 max-w-4xl mx-auto">
        {message && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-300 text-sm">
            {message}
          </div>
        )}

        {tab === "contacts" && (
          <ContactsEditor
            onSaved={() => setMessage("Контакты сохранены. Обновите data.ts в репозитории.")}
          />
        )}
        {tab === "texts" && (
          <TextsEditor
            onSaved={() => setMessage("Тексты сохранены.")}
          />
        )}
        {tab === "menu" && (
          <MenuEditor
            onSaved={() => setMessage("Меню обновлено.")}
          />
        )}
        {tab === "events" && (
          <EventsEditor
            onSaved={() => setMessage("Афиша обновлена.")}
          />
        )}
        {tab === "gallery" && (
          <GalleryEditor
            onSaved={() => setMessage("Галерея обновлена.")}
          />
        )}
        {tab === "faq" && (
          <FaqEditor
            onSaved={() => setMessage("FAQ обновлён.")}
          />
        )}
      </main>
    </div>
  );
}

/* ========== Editors ========== */

function ContactsEditor({ onSaved }: { onSaved: () => void }) {
  const [form, setForm] = useState({
    phone: "+7 995 764 8888",
    email: "reserve@soul.msk.ru",
    street: "Холодильный переулок, 3, стр. 2",
    city: "Москва",
    instagram: "https://instagram.com/",
    telegram: "https://t.me/",
    whatsapp: "https://wa.me/79957648888",
    hoursFriSat: "19:00 — 05:00",
    hoursOther: "По предварительному бронированию",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSave() {
    // В реальной версии здесь будет API
    // Сейчас показываем готовый код для вставки в data.ts
    const code = generateContactsCode(form);
    downloadFile("contacts-update.ts", code);
    onSaved();
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-light">Контакты и основная информация</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Телефон" name="phone" value={form.phone} onChange={handleChange} />
        <Field label="Email" name="email" value={form.email} onChange={handleChange} />
        <Field label="Адрес (улица)" name="street" value={form.street} onChange={handleChange} />
        <Field label="Город" name="city" value={form.city} onChange={handleChange} />
        <Field label="Instagram" name="instagram" value={form.instagram} onChange={handleChange} />
        <Field label="Telegram" name="telegram" value={form.telegram} onChange={handleChange} />
        <Field label="WhatsApp" name="whatsapp" value={form.whatsapp} onChange={handleChange} />
        <Field label="Часы (Пт–Сб)" name="hoursFriSat" value={form.hoursFriSat} onChange={handleChange} />
        <Field label="Часы (остальные дни)" name="hoursOther" value={form.hoursOther} onChange={handleChange} className="sm:col-span-2" />
      </div>

      <button
        onClick={handleSave}
        className="bg-white text-black px-6 py-2.5 rounded-lg font-medium hover:bg-white/90 transition"
      >
        Сохранить и скачать обновление
      </button>

      <p className="text-white/40 text-sm">
        После сохранения скачается файл. Замените соответствующие поля в <code className="text-white/60">src/lib/data.ts</code> и сделайте push в GitHub.
      </p>
    </div>
  );
}

function TextsEditor({ onSaved }: { onSaved: () => void }) {
  const [form, setForm] = useState({
    tagline: "Живое пространство · Живые эмоции",
    concept: "Оазис природы в сердце Москвы",
    descriptionShort:
      "SOUL — ресторан-lounge в центре Москвы: авторская кухня, коктейли, живая музыка и иммерсивные шоу под сводом зелени и хрусталя.",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSave() {
    const code = `// Обновлённые тексты для data.ts
tagline: "${form.tagline}",
concept: "${form.concept}",
descriptionShort: \`${form.descriptionShort}\`,
`;
    downloadFile("texts-update.ts", code);
    onSaved();
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-light">Тексты сайта / О нас</h2>

      <Field label="Слоган (tagline)" name="tagline" value={form.tagline} onChange={handleChange} />
      <Field label="Концепция" name="concept" value={form.concept} onChange={handleChange} />
      <div>
        <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">
          Короткое описание
        </label>
        <textarea
          name="descriptionShort"
          value={form.descriptionShort}
          onChange={handleChange}
          rows={4}
          className="w-full bg-black/40 border border-white/15 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40 transition"
        />
      </div>

      <button
        onClick={handleSave}
        className="bg-white text-black px-6 py-2.5 rounded-lg font-medium hover:bg-white/90 transition"
      >
        Сохранить и скачать обновление
      </button>
    </div>
  );
}

function MenuEditor({ onSaved }: { onSaved: () => void }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-light">Меню</h2>
      <p className="text-white/50 text-sm">
        Сейчас меню хранится в <code className="text-white/70">src/lib/data.ts</code> (массив <code className="text-white/70">menu</code>).
      </p>
      <p className="text-white/50 text-sm">
        Чтобы добавить/изменить блюдо:
      </p>
      <ol className="list-decimal list-inside text-white/50 text-sm space-y-1">
        <li>Открой файл <code className="text-white/70">src/lib/data.ts</code> в GitHub</li>
        <li>Найди массив <code className="text-white/70">menu</code></li>
        <li>Добавь или отредактируй объект блюда</li>
        <li>Сделай Commit + Push — сайт обновится автоматически</li>
      </ol>

      <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-sm">
        <p className="text-white/70 mb-2">Пример блюда:</p>
        <pre className="text-white/50 overflow-x-auto text-xs">{`{
  name: "Тартар из тунца, понзу, авокадо",
  description: "Жёлтопёрый тунец, соус понзу, авокадо-крем...",
  price: "1 290 ₽",
  category: "Закуски",
  tag: "Сигниче",   // опционально: Сигниче | Выбор шефа | Веган | Хит
}`}</pre>
      </div>

      <p className="text-white/40 text-sm">
        Категории: Закуски, Основное, Из огня, Десерты, Коктейли
      </p>
    </div>
  );
}

function EventsEditor({ onSaved }: { onSaved: () => void }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-light">Афиша / События</h2>
      <p className="text-white/50 text-sm">
        События находятся в массиве <code className="text-white/70">events</code> в файле <code className="text-white/70">src/lib/data.ts</code>.
      </p>
      <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-sm">
        <p className="text-white/70 mb-2">Пример события:</p>
        <pre className="text-white/50 overflow-x-auto text-xs">{`{
  date: "25.07",
  weekday: "Пятница",
  title: "Grand Opening",
  subtitle: "Иммерсивное шоу «Лесные феи»",
  time: "21:00",
  lineup: ["BLAYZE · живая музыка", "ALLSTAR · DJ-сет"],
  poster: "/images/poster-1.jpg",
  featured: true,
}`}</pre>
      </div>
    </div>
  );
}

function GalleryEditor({ onSaved }: { onSaved: () => void }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-light">Галерея</h2>
      <p className="text-white/50 text-sm">
        Фото галереи лежат в папке <code className="text-white/70">public/images/</code> и прописаны в массиве <code className="text-white/70">gallery</code> в <code className="text-white/70">data.ts</code>.
      </p>
      <ol className="list-decimal list-inside text-white/50 text-sm space-y-2">
        <li>Загрузи новое фото в папку <code className="text-white/70">public/images/</code> (через GitHub или локально)</li>
        <li>Добавь запись в массив <code className="text-white/70">gallery</code>:</li>
      </ol>
      <pre className="bg-white/5 border border-white/10 rounded-xl p-4 text-xs text-white/50 overflow-x-auto">{`{ src: "/images/новое-фото.jpg", alt: "Описание фото", span: "square" }`}</pre>
    </div>
  );
}

function FaqEditor({ onSaved }: { onSaved: () => void }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-light">FAQ</h2>
      <p className="text-white/50 text-sm">
        Вопросы и ответы находятся в массиве <code className="text-white/70">faq</code> в файле <code className="text-white/70">src/lib/data.ts</code>.
      </p>
      <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-sm">
        <pre className="text-white/50 overflow-x-auto text-xs">{`{
  q: "Как забронировать столик?",
  a: "Заполните форму бронирования на сайте или позвоните...",
}`}</pre>
      </div>
    </div>
  );
}

/* ========== Helpers ========== */

function Field({
  label,
  name,
  value,
  onChange,
  className = "",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">
        {label}
      </label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-black/40 border border-white/15 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40 transition"
      />
    </div>
  );
}

function generateContactsCode(form: Record<string, string>) {
  return `// Замените соответствующие поля в src/lib/data.ts → export const site = { ... }

phone: "${form.phone}",
phoneHref: "${form.phone.replace(/\\s/g, "").replace("+", "")}",
email: "${form.email}",
address: {
  street: "${form.street}",
  city: "${form.city}",
  // ...
},
hours: [
  { day: "Пятница — Суббота", time: "${form.hoursFriSat}" },
  { day: "Воскресенье — Четверг", time: "${form.hoursOther}" },
],
social: {
  instagram: "${form.instagram}",
  telegram: "${form.telegram}",
  whatsapp: "${form.whatsapp}",
},
`;
}

function downloadFile(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

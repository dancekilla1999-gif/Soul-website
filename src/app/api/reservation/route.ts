import { NextResponse } from "next/server";

/**
 * Обработчик формы бронирования.
 *
 * Сейчас заявка валидируется и логируется на сервере — этого достаточно
 * для запуска сайта. Чтобы получать письма, задайте переменные окружения
 * RESEND_API_KEY, RESERVATION_TO_EMAIL, RESERVATION_FROM_EMAIL и раскомментируйте
 * блок с Resend ниже (пакет resend уже можно доустановить: npm i resend).
 */

export const runtime = "nodejs";

interface ReservationPayload {
  name?: string;
  phone?: string;
  email?: string;
  guests?: string | number;
  date?: string;
  time?: string;
  message?: string;
}

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function POST(request: Request) {
  let data: ReservationPayload;

  try {
    data = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Некорректный запрос." },
      { status: 400 }
    );
  }

  const name = (data.name ?? "").toString().trim();
  const phone = (data.phone ?? "").toString().trim();
  const email = (data.email ?? "").toString().trim();
  const guests = (data.guests ?? "").toString().trim();
  const date = (data.date ?? "").toString().trim();
  const time = (data.time ?? "").toString().trim();
  const message = (data.message ?? "").toString().trim();

  const errors: string[] = [];
  if (name.length < 2) errors.push("Укажите имя.");
  if (phone.replace(/\D/g, "").length < 10) errors.push("Укажите корректный телефон.");
  if (email && !isEmail(email)) errors.push("Укажите корректный email.");
  if (!date) errors.push("Выберите дату.");
  if (!time) errors.push("Выберите время.");

  if (errors.length) {
    return NextResponse.json({ ok: false, error: errors.join(" ") }, { status: 422 });
  }

  const reservation = { name, phone, email, guests, date, time, message, at: new Date().toISOString() };

  console.info("[SOUL] Новая заявка на бронирование:", reservation);

  return NextResponse.json({
    ok: true,
    message: "Заявка принята. Мы свяжемся с вами для подтверждения брони.",
  });
}

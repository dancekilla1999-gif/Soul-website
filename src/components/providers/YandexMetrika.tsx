"use client";

import Script from "next/script";

/**
 * Яндекс.Метрика.
 * ID берётся из NEXT_PUBLIC_YANDEX_METRIKA_ID (Vercel env).
 * Пока ID нет — компонент ничего не рендерит.
 */
export function YandexMetrika() {
  const id = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;
  if (!id) return null;

  const counterId = id.replace(/\D/g, "");
  if (!counterId) return null;

  return (
    <>
      <Script id="yandex-metrika" strategy="afterInteractive">{`
(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();
for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
ym(${counterId}, "init", {
  clickmap: true,
  trackLinks: true,
  accurateTrackBounce: true,
  webvisor: true,
  ecommerce: "dataLayer"
});
      `}</Script>
      <noscript>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://mc.yandex.ru/watch/${counterId}`}
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}

/** Отправка цели в Метрику (безопасно, если счётчика ещё нет) */
export function reachGoal(goal: string, params?: Record<string, string | number>) {
  if (typeof window === "undefined") return;
  const id = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID?.replace(/\D/g, "");
  // @ts-expect-error ym injects globally
  const ym = window.ym;
  if (!id || typeof ym !== "function") return;
  try {
    if (params) ym(Number(id), "reachGoal", goal, params);
    else ym(Number(id), "reachGoal", goal);
  } catch {
    // ignore
  }
}

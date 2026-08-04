# Домен soul.msk.ru → Vercel

## 1. Vercel
1. Откройте проект **Soul-website** на [vercel.com](https://vercel.com)
2. **Settings → Domains → Add**
3. Добавьте: `soul.msk.ru`
4. (опционально) `www.soul.msk.ru` — редирект на основной уже в `vercel.json`

## 2. DNS у регистратора (.msk.ru)
Создайте записи, которые покажет Vercel (обычно так):

| Тип | Имя | Значение |
|-----|-----|----------|
| **A** | `@` | `76.76.21.21` |
| **CNAME** | `www` | `cname.vercel-dns.com` |

Точные значения смотрите в Vercel → Domains после добавления `soul.msk.ru`.

TTL: 300–3600.

## 3. Переменная окружения
Vercel → Settings → Environment Variables:

```
NEXT_PUBLIC_SITE_URL = https://soul.msk.ru
```

для Production (и Preview при необходимости) → **Redeploy**.

## 4. SSL
Vercel выпустит сертификат автоматически (Let's Encrypt), обычно 1–30 минут после верных DNS.

## 5. Проверка
```
https://soul.msk.ru
https://soul.msk.ru/sitemap.xml
https://soul.msk.ru/robots.txt
```

## Код
В `src/lib/data.ts` поле `site.url` = `https://soul.msk.ru`  
Email брони: `reserve@soul.msk.ru` (настройте почту у регистратора или перенаправьте).

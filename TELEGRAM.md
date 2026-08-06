# Telegram-бот SOUL

## Что делает
1. **Каждая бронь** с сайта → сообщение в группу (`TELEGRAM_CHAT_ID`)
2. **Каждый понедельник 12:00 МСК** → недельный отчёт (статус сайта, деплои, чеклист)

## Настройка Vercel → Settings → Environment Variables

| Name | Value |
|------|--------|
| `TELEGRAM_BOT_TOKEN` | токен от @BotFather |
| `TELEGRAM_CHAT_ID` | `-4801694745` |
| `VERCEL_API_TOKEN` | vercel.com → Account → Tokens |
| `VERCEL_PROJECT_ID` | `prj_E2TtYowXJeD1pOmzKl0NSxLt5E9u` |
| `VERCEL_TEAM_ID` | `team_krkASfxa728kPkB5mP0xmhg4` |
| `CRON_SECRET` | длинная случайная строка |
| `NEXT_PUBLIC_SITE_URL` | `https://soul.msk.ru` |

После сохранения → **Redeploy**.

## Бот в группе
1. Добавьте бота в группу
2. Сделайте бота **администратором** (хотя бы «отправка сообщений»)
3. Chat ID группы: `-4801694745` (уже указан)

## Тест брони
Отправьте тестовую заявку с https://soul.msk.ru/contacts#reserve

## Тест недельного отчёта
```bash
curl -X GET "https://soul.msk.ru/api/cron/weekly-stats" \
  -H "Authorization: Bearer ВАШ_CRON_SECRET"
```

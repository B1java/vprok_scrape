# О скрипте

Скрипт позволяет получать информацию о продукте с [vprok.ru](https://www.vprok.ru/) .
Данные о товаре попадут в директорию `lastProduct` - `last_data.json` и `last_screenshot.png`.

Пример `last_data.json` :

```json
{
  "price": {
    "oldPrice": "175 ₽",
    "newPrice": "129,9 ₽",
    "regPrice": null
  },
  "feedback": {
    "reviewsCount": "1123",
    "rating": "4.8"
  }
}
```

# Быстрый старт

Клонируем git репозитрий:

```bash
git clone https://github.com/B1java/vprok_scrape
```

Переходим в рабочую директорю и устанавливаем все нужные npm пакеты

```bash
cd vprok_scrape
npm i
```

Запускаем скрипт

```bash
npm run parse "link" "region"
```

## Доступный формат ссылок

Скрипт работает только с ссылками, которые начинаются с `https://www.vprok.ru/` .

**НЕПРАВИЛЬНЫЕ ССЫЛКИ**:

- `vprok.ru/`
- `www.vprok.ru/`
- `https://www.ya.ru/`

## Доступный формат регионов

Все доступный регионы на данный момент:

```js
"Москва и область",
  "Санкт-Петербург и область",
  "Владимирская обл.",
  "Калужская обл.",
  "Рязанская обл.",
  "Тверская обл.",
  "Тульская обл.";
```

**Регион должен быть написан без ошибок**

# Пример запуска скрипта

Пример корректного запуска скрипта:

```bash
npm run parse 'https://www.vprok.ru/product/domik-v-derevne-dom-v-der-moloko-ster-3-2-950g--309202' 'Москва и область'
```

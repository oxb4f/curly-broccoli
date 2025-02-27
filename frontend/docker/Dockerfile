# Базовий образ Node.js для білду
FROM node:18 AS base

# Встановлюємо робочу директорію
WORKDIR /app

# Копіюємо package.json та встановлюємо залежності
COPY package.json package-lock.json ./
RUN npm install

# Копіюємо всі файли проєкту
COPY . .

# -----------------------------------
# Development-режим з Vite
FROM base AS run

# Відкриваємо порти для Vite
EXPOSE 5173

# Запускаємо Vite у режимі розробки
ENTRYPOINT []

# 1. Використовуємо офіційний образ Node.js для збірки
FROM base AS build
# Виконуємо збірку продакшен-версії React-додатка
RUN npm run build

FROM build AS preview

COPY --from=build /app/dist /app/dist

EXPOSE 4173

ENTRYPOINT []
# Task Manager (Fullstack: React + Node.js + PostgreSQL)

Цей проект демонструє архітектуру **SOLID** та **Clean Architecture** у повнофункціональному веб-додатку.

## 🏗 Архітектура

- **Frontend**: React (Vite). Відповідає лише за відображення та запити до API.
- **Backend**: Express.js. Використовує `PostgresTaskRepository` для роботи з базою даних.
- **Database**: PostgreSQL.

## 🚀 Як запустити

1. **База даних**:
   - Переконайтеся, що у вас встановлено PostgreSQL.
   - Створіть базу даних `taskdb`.

2. **Налаштування (.env)**:
   Створіть файл `.env` у корені:
   ```env
   DATABASE_URL=postgresql://postgres:password@localhost:5432/taskdb
   PORT=3001
   ```

3. **Встановлення та запуск**:
   ```bash
   npm install
   
   # Запуск бекенду (термінал 1)
   npm run dev:backend
   
   # Запуск фронтенду (термінал 2)
   npm run dev:frontend
   ```

## ⚠️ Примітка щодо GitHub Pages
GitHub Pages підтримує лише статичні сайти. Оскільки цей проект тепер вимагає PostgreSQL та Node.js бекенд, він **не буде працювати** на GitHub Pages повністю. Ви можете задеплоїти фронтенд на GH Pages, але бекенд та БД мають бути розміщені на сервісах типу Render або Railway.

# Task Manager (TypeScript Rewrite)

Цей проект є переписаною версією PHP-проекту `task-manager-web-lab-alg-main` на TypeScript із застосуванням принципів OOP та SOLID.

## Архітектура

Проект дотримується принципів чистої архітектури (Clean Architecture):

- **Domain**: Сутності та бізнес-правила (Task, TaskStatus). Не залежать від зовнішніх модулів.
- **Ports (Interfaces)**: Визначають інтерфейси для взаємодії з інфраструктурою (ITaskRepository). (Dependency Inversion Principle).
- **App (Service)**: Прикладна логіка. Використовує порти для роботи з даними.
- **Infra**: Реалізація портів (SqliteTaskRepository). Використовує SQLite.
- **Core**: Інструментарій для роботи застосунку (DI Container).

## SOLID

- **S (Single Responsibility)**: Кожен клас відповідає за свою частину (Repository - дані, Service - логіка, Controller/Index - HTTP).
- **O (Open/Closed)**: Система відкрита для розширення (можна додати нові репозиторії), але закрита для модифікації ядра.
- **L (Liskov Substitution)**: Реалізації `ITaskRepository` можуть бути замінені без порушення роботи сервісу.
- **I (Interface Segregation)**: Інтерфейси розділені за призначенням.
- **D (Dependency Inversion)**: `TaskService` залежить від інтерфейсу `ITaskRepository`, а не від конкретної реалізації SQLite.

## 🛠 Технологічний стек

У проекті використано сучасний стек технологій для забезпечення надійності та швидкості розробки:

- **Мова програмування**: [TypeScript](https://www.typescriptlang.org/) — забезпечує строгу типізацію та запобігає помилкам на етапі розробки.
- **Runtime**: [Node.js](https://nodejs.org/) — серверна платформа для виконання коду.
- **Веб-фреймворк**: [Express.js](https://expressjs.com/) — гнучкий фреймворк для побудови веб-додатків.
- **База даних**: [SQLite](https://www.sqlite.org/) — надійна вбудована реляційна БД.
- **Драйвер БД**: [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) — високопродуктивна бібліотека для роботи з SQLite.
- **Шаблонізатор**: [EJS](https://ejs.co/) — для динамічного рендерингу HTML на сервері.
- **Інструменти розробки**:
    - `ts-node` та `nodemon` — для швидкої розробки без ручної компіляції.
    - `Makefile` — для автоматизації команд.

## Як запустити

1. Встановіть залежності:
   ```bash
   npm install
   ```

2. Запустіть у режимі розробки:
   ```bash
   npm run dev
   ```

3. Або скомпілюйте та запустіть:
   ```bash
   npm run build
   npm start
   ```

За замовчуванням сервер працює на `http://localhost:3000`.
# task-manager-web-ts

# 🎬 Kinollo — Movie Ticket Booking App

Kinollo — это полнофункциональное приложение для онлайн-бронирования кино-билетов с разделением ролей **User/Admin**.  
Проект выполнен на **MERN-стеке (MongoDB, Express, React, Node.js)** и использует **Clerk** для авторизации.

---

## 🚀 Стек технологий
- **Frontend:** React + Vite, TailwindCSS, Clerk React, React Router
- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **Auth:** Clerk (OAuth/Email login)
- **UI:** Tailwind, Lucide Icons, React Hot Toast
- **Интеграции:** Nodemailer (email-уведомления)
- **DevOps:** dotenv, cors, nodemon

---

## 📂 Структура проекта

```
kinollo/
│
├── client/                # фронтенд
│   ├── public/            # статические файлы
│   ├── src/
│   │   ├── assets/        # изображения, иконки
│   │   ├── components/    # React-компоненты
│   │   ├── context/       # глобальный AppContext
│   │   ├── pages/         # страницы (Home, Movies, Admin и т.д.)
│   │   ├── lib/           # утилиты (форматирование дат и времени)
│   │   ├── App.jsx        # корневой компонент
│   │   └── main.jsx       # входная точка
│   ├── package.json
│   └── vite.config.js
│
├── server/                # бэкенд
│   ├── configs/           # настройки (db.js, nodemailer.js)
│   ├── controllers/       # контроллеры (логика API)
│   ├── models/            # Mongoose модели (User, Show, Booking, Movie)
│   ├── routes/            # Express роутеры
│   ├── server.js          # запуск сервера
│   └── package.json
│
├── .env.example           # пример настроек окружения
├── .gitignore
└── README.md
```

---

## ⚙️ Установка и запуск

### 1. Клонировать репозиторий
```bash
git clone https://github.com/username/kinollo.git
cd kinollo
```

### 2. Настроить переменные окружения
Скопируйте файл `.env.example` в `.env` и заполните своими данными.

```bash
cp .env.example .env
```

Пример `.env`:
```ini
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/kinollo

CLERK_SECRET_KEY=sk_test_your_secret_key
CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key

SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=example@gmail.com
SMTP_PASS=app-password

VITE_BASE_URL=http://localhost:3000
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/original
```

### 3. Установка зависимостей
```bash
cd server
npm install

cd ../client
npm install
```

### 4. Запуск приложения
В двух терминалах:
```bash
# сервер (порт 3000)
cd server
npm run dev

# клиент (порт 5173)
cd client
npm run dev
```

Теперь приложение доступно на [http://localhost:5173](http://localhost:5173)

---

## 🔑 Функционал

### 👤 Пользователь:
- Регистрация/авторизация (Clerk)
- Просмотр фильмов и сеансов
- Бронирование мест
- Список своих билетов
- Добавление фильмов в избранное

### 🛠 Администратор:
- Просмотр дашборда (общие метрики)
- Добавление/удаление фильмов
- Управление сеансами
- Просмотр всех бронирований

---

## 🖥 Скрипты

### Client (`client/package.json`)
```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "lint": "eslint src --fix"
}
```

### Server (`server/package.json`)
```json
"scripts": {
  "dev": "nodemon server.js",
  "start": "node server.js"
}
```

---

## 👥 Роли пользователей

Чтобы назначить **администратора**:  
откройте MongoDB и вручную измените поле у пользователя:
```json
{
  "_id": "user_xxxxxx",
  "email": "example@mail.com",
  "isAdmin": true
}
```

---

## 📝 Лицензия
Проект создан в образовательных целях. Используйте и дорабатывайте под свои нужды.

---

## 📸 Скриншоты
*(вставьте свои скрины: главная, выбор фильма, бронирование, админка)*

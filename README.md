# Library System

Browse, borrow, buy, and return books. React frontend + Express/SQLite API.

## Stack

| | |
|---|---|
| **Frontend** | React 19, TypeScript, Vite, Tailwind, Redux, React Query, i18n (EN/AR) |
| **Backend** | Express, Sequelize, SQLite, JWT |

## Quick start

```bash
# API (http://localhost:3001)
cd backend && npm install && npm run dev

# App (http://localhost:5173)
cd frontend && npm install && npm run dev
```

Optional frontend env (`frontend/.env`):

```
VITE_API_BASE_URL=http://localhost:3001/api
```

## Demo login

```
email:    majd@titan-tech.com
password: password123
```

## Features

- Catalog search & filters
- Book detail · buy / borrow (auth)
- My shelf · return loans
- Light/dark theme · English / Arabic
- Lazy-loaded pages · 404 page

## API

| Method | Path | Auth | |
|--------|------|------|---|
| `POST` | `/api/auth/login` | | Login |
| `GET` | `/api/auth/me` | ✓ | Current user |
| `GET` | `/api/books` | | List / search |
| `GET` | `/api/books/:id` | | Book detail |
| `POST` | `/api/books/:id/borrow` | ✓ | Borrow |
| `POST` | `/api/books/:id/buy` | ✓ | Buy |
| `GET` | `/api/loans` | ✓ | My loans |
| `GET` | `/api/loans/:id` | ✓ | Loan detail |
| `POST` | `/api/loans/:id/return` | ✓ | Return |
| `GET` | `/health` | | Health check |

## Structure

```
backend/src/     # routes · controllers · services · models · seeders
frontend/src/
  api/           # HTTP client & endpoints
  components/    # shared UI + Layout/
  pages/         # route pages (home, book, shelf, checkout, …)
  routes/        # router, guards, lazyPages
  store/         # Redux (auth)
  locales/       # i18n
```

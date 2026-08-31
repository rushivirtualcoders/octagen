# Custom CMS architecture

Octagen uses a **first-party admin** in this Next.js app. It is not Payload, WordPress, or another hosted CMS.

Public site and admin share one codebase and one Prisma schema. Local development uses SQLite; production/docker uses PostgreSQL. Admin is isolated by URL, auth, and `noindex`.

```
Browser
  ├─ /              public catalogue (App Router)
  └─ /admin         staff only (session cookie)

Next.js route handlers / server actions
  └─ Prisma
       └─ SQLite (local) / PostgreSQL (production)
```

## Why custom

`docs/PROJECT-FOUNDATION.md` requires:

- no default third-party CMS
- explicit content models
- content separated from UI
- Prisma + SQLite locally (PostgreSQL in production / docker compose)
- staff auth (session/JWT)
- inquiry SMTP from env, not from the database

## FRD admin scope (v1)

| Area | Capability |
| --- | --- |
| Product categories | CRUD |
| Products | CRUD, application + category filters, publish flag |
| Article categories | CRUD |
| Articles | Rich text (HTML), related products, publish |
| Inquiries | Inbox, type/status filters, detail |
| Site CMS | Homepage, About Liqui-Moly, About Octagen, contact |
| Alerts | Unread inquiry count in admin |
| Email | SMTP to staff when env is set |

Never stored in CMS: prices, cart, payments, customer accounts.

## Content models

- **User** — staff login (`admin` role in v1)
- **ProductCategory** / **Product** — catalogue
- **ArticleCategory** / **Article** — insights
- **Inquiry** — quote / partnership / bulk / product
- **SiteSetting** — singleton JSON globals (`id = site`)
- **AuditLog** — who changed what

## Security

- `/admin/*` except `/admin/login` requires a signed httpOnly JWT cookie
- Passwords hashed with bcrypt
- Login rate-limited per IP
- Zod validation on every mutation
- Secrets only in `.env` (`DATABASE_URL`, `AUTH_SECRET`, SMTP, seed admin)
- Admin responses send `X-Robots-Tag: noindex`
- Uploads (later): MIME allow-list, size cap, no executable types

## Local run

```bash
cd web
npx prisma migrate dev
npx prisma db seed
npm run dev
```

Optional PostgreSQL: `docker compose up -d` and switch `DATABASE_URL`.

Open `http://localhost:3000/admin/login` with `ADMIN_EMAIL` / `ADMIN_PASSWORD` from `.env`.

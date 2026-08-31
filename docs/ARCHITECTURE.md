# Architecture

Public site and custom CMS share the Next.js 15 App Router app in `web/`.

```
Browser
  ├─ /              public cinematic catalogue
  └─ /admin         staff CMS (session cookie)

Next.js server actions / route handlers
  └─ Prisma
       └─ PostgreSQL (docker compose locally)
```

## Public frontend

| Path | Role |
| --- | --- |
| `src/app/page.tsx` | Landing composition |
| `src/App.tsx` | Client cinematic page (Lenis, motion, 3D) |
| `src/lib/constants.ts` | Fallback marketing copy until pages read CMS |
| `src/components/sections/*` | Homepage sections |
| `src/components/3d/*` | Isolated R3F scenes |

## Custom CMS

Documented in `docs/CMS-ARCHITECTURE.md`.

| Path | Role |
| --- | --- |
| `src/app/admin/*` | Staff console |
| `src/app/api/inquiries` | Public inquiry POST |
| `src/lib/cms/*` | Zod schemas, mutations, audit |
| `src/lib/auth.ts` | Admin session cookie |
| `prisma/schema.prisma` | Content models |

v1 admin: product categories, products, article categories, articles, inquiry inbox, homepage/about/contact globals.

Out of scope: cart, checkout, payments, prices, customer accounts, Payload CMS.

## Commands

```bash
docker compose up -d
cd web
npm install
npx prisma migrate dev
npx prisma db seed
npm run dev
```

Admin: `http://localhost:3000/admin/login`

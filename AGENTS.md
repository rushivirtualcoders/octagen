# Octagen × Liqui-Moly

Read `Doc/FRD_Octgen_06082026.docx` and `docs/FRD-SUMMARY.md` for product scope.

## Current phase: landing page + custom CMS

- **Frontend is Next.js (App Router) + React 19** with Three.js / R3F + Framer Motion + Lenis
- **CMS is a first-party admin at `/admin`** (Prisma + PostgreSQL). Do not add Payload.
- No cart, checkout, or prices
- Primary CTA: **Submit Inquiry / Get Quote**
- Liqui-Moly is the hero brand; Octagen is the distributor in header/footer
- Dark cinematic landing look — do not restore the rejected Unsplash brochure

## Stack

| Layer | Choice |
| --- | --- |
| Public site | Next.js App Router (`web/`) |
| Admin CMS | `/admin` + Prisma models |
| Database | PostgreSQL |
| Styling | Tailwind CSS v4 |
| 3D / motion | R3F, framer-motion, Lenis |

## Commands

```bash
# Optional: Postgres only (local). Production app does not require Docker.
docker compose up -d

cd web
cp .env.example .env   # set DATABASE_URL to PostgreSQL + AUTH_SECRET
npm install
npx prisma migrate deploy
npx prisma db seed
npm run dev            # http://localhost:3000

# Production on server (no Docker app):
# npm run build && npm run start:prod
# See docs/DEPLOY.md
```

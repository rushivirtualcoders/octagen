---
name: payload-collection
description: Custom CMS models for Octagen. Use when adding or changing Prisma content models, admin CRUD, or /admin screens. Not Payload CMS.
---

# Custom CMS models

Do not create Payload collections. Use Prisma models in `web/prisma/schema.prisma` and admin UI under `web/src/app/admin`.

v1 models: User, ProductCategory, Product, MarketingActivity, MarketingMedia, ArticleCategory, Article, Inquiry, SiteSetting, AuditLog.

When adding a model:

1. Update `schema.prisma` and migrate
2. Add Zod schema in `src/lib/cms/schemas.ts`
3. Add server actions in `src/lib/cms/actions.ts`
4. Add `/admin` screens
5. Never store prices or payment data
6. Products must include external `liquiMolyUrl` (no in-site PDP / prices / cart)
7. Product categories use `vehiclePath` (`CAR` | `BIKE`) for homepage Product Groups
8. `loved` flags products for the Most Loved section

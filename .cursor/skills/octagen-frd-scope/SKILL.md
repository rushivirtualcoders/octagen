---
name: octagen-frd-scope
description: Applies Octagen FRD scope, page list, and v1 exclusions. Use when adding features, routes, fields, or deciding whether cart, prices, accounts, or oil finder are in scope.
---

# Octagen FRD scope

Read `docs/FRD-SUMMARY.md` first. The Word FRD in `Doc/FRD_Octgen_06082026.docx` wins if they conflict.

## In v1

Public: Home, About Liqui-Moly, About Octagen, Products list + PDP, Articles list + detail, Contact.

Admin: product/article CRUD + categories, inquiry inbox, CMS globals, inquiry notification, SMTP.

CTA: Submit Inquiry / Get Quote only.

## Out of v1

Cart, checkout, payments, prices, customer login, vehicle/oil finder, extra languages.

## Defaults (until the user overrides)

- Guest inquiry
- Product data entered in admin (Liqui-Moly website is the copy source, not a live scrape)
- Header: Octagen logo
- English, India
- Public frontend: Next.js App Router
- Admin: custom `/admin` CMS (Prisma), not Payload

If the user asks for an out-of-v1 item, stop and confirm before coding.

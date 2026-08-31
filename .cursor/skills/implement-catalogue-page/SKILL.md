---
name: implement-catalogue-page
description: Implements a public Octagen landing or catalogue section in React from the FRD. Use when building homepage, about, products, contact, or shared layout.
---

# Implement a catalogue page

## Steps

1. Open `docs/FRD-SUMMARY.md` and note required sections.
2. Add or reuse a component under `web/src/components/landing` or `layout`.
3. Compose it in `web/src/App.tsx` (single-page landing for this phase).
4. Use `.reveal-up` for scroll-in; do not hardcode `.revealed`.
5. Wire inquiry CTA on product and contact sections.
6. Check mobile layout.

This is a **React Vite SPA**. Do not add Next.js routes.

## Do not

- Put a search bar on the homepage
- Show prices or cart
- Use Next.js, SSR, or Payload

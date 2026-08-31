# FRD summary — Octagen catalogue

Extracted from `Doc/FRD_Octgen_06082026.docx` (Functional Requirement Document - Octagen, 6 Aug 2026). If this file and the Word FRD disagree, the Word file wins.

## Strategy

- Attractive, sporty, mature digital catalogue
- Premium German engineering and motorsports aesthetic
- Liqui-Moly is the hero; Octagen is the exclusive authorized national distributor
- Bypass Add to Cart; use Submit Inquiry for B2B and B2C

## Public pages

### Homepage

- Header: Octagen logo + main links (no cluttered search on homepage)
- Full-screen motorsport hero with CTAs: Explore Car Products, Explore Bike Products
- Category cards: Motor Oils, Additives, Car Care, 2-Wheeler (reference; can change)
- Flagship spotlights (e.g. Top Tec 4200) with quick stats such as OEM Approved
- Liqui-Moly advantage trust markers (Made in Germany, F1 / MotoGP sponsor)
- Footer: Octagen logo, links, statement that Liqui-Moly India is operated and fulfilled by Octagen
- Design may add 1–2 extra sections

### About (two pages)

- About Liqui-Moly: founded 1957, manufactured in-house in Germany, multiple sections
- About Octagen: official national distributor, history, multiple sections

### Product search & results

- Default product listing plus search
- Global search bar at top of catalogue
- Sidebar filters: Application (Cars, Bikes), Category (Oils, Additives), OEM approvals (API SP, ACEA C3, VW 504 00)
- Grid with brief details, link to PDP, pagination

### Product details

- Image, title, article number, container sizes
- Prominent Submit Inquiry / Get Quote
- Key benefits, technical approvals, description / areas of application, application instructions
- Copy sourced from Liqui-Moly product data

### Articles / insights

- Listing: search, category/tag filters, pagination
- Details: rich text, author, publish/update dates, related product cards that lead to inquiry

### Contact & partnerships

- Inquiry type: General Inquiry, Workshop Partnership, Bulk Distributor Application
- Office/warehouse address in India, support emails, phones, embedded map

## Admin

- Product categories CRUD
- Products CRUD + filters
- Article categories CRUD
- Articles rich-text + attach related products
- Inquiry inbox + filters
- CMS for homepage banners, About text, contact details
- In-admin notification on new inquiry
- SMTP email to admin

## Out of v1 unless FRD is updated

- Cart, checkout, payments, prices
- Customer login
- Vehicle / oil finder
- Extra languages

## Frontend stack (project lock)

The Word FRD suggested Next.js. **This repo uses React + Vite instead** so the landing page stays client-rendered and avoids Next.js SSR/hydration issues. Do not switch back to Next.js unless the user asks.

## Delivery notes from FRD

- 8-week build, staging environment, 15-day hypercare
- Design: up to 3 homepage revision rounds, then theme lock
- Launch needs domain registrar and server credentials

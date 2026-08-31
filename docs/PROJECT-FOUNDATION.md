## Octagen Project Foundation

### Project summary

Octagen is building a premium oil and lubrication brand website for the Indian market with Liqui-Moly as the hero brand and Octagen as the authorized national distributor. The product must feel mature, technical, high-performance, and trustworthy rather than generic ecommerce.

This document is the single source of direction for project requirements, brand system, technology choices, security expectations, and Cursor workspace guidance.

### Business goals

- Present Liqui-Moly as a premium German engineering and motorsport-led brand.
- Position Octagen as the trusted India distributor without competing with the hero brand.
- Drive inquiry-first conversion rather than ecommerce checkout.
- Keep architecture secure, maintainable, and scalable for future catalogue and custom CMS work.

### Current delivery scope

- Public marketing website and homepage experience first
- Inquiry-led product discovery
- Brand storytelling and trust markers
- Future-ready foundation for catalogue, product pages, and custom CMS

### Out of scope for the current phase

- Cart
- Checkout
- Payments
- Public product pricing
- Customer accounts
- Vehicle finder
- Marketplace-style ecommerce behaviors

## Brand requirements

### Brand hierarchy

1. Liqui-Moly is the hero brand.
2. Octagen is the exclusive authorized distributor in India.
3. The Octagen logo should appear in the header, footer, legal areas, and distributor statements.

Required footer intent:

> Liqui-Moly India is operated and fulfilled by Octagen, the exclusive authorized national distributor.

### Visual direction

- Premium
- Sporty
- Technical
- Mature
- Clean
- High contrast
- Performance-oriented

Avoid:

- Generic light brochure layouts
- Cheap ecommerce patterns
- Flash-sale styling
- Toy-like colors
- Crowded headers
- Loud animations with no purpose

### Color system

Base the UI on the Liqui-Moly brand language:

- Deep navy / performance blue for primary surfaces
- Strong red as accent and CTA support color
- White for clean contrast
- Dark graphite / black for premium technical sections
- Controlled metallic gray for dividers, cards, and specs

Suggested token set:

- `--color-brand-blue: #004b93`
- `--color-brand-red: #d72638`
- `--color-brand-white: #ffffff`
- `--color-brand-ink: #0f1720`
- `--color-brand-steel: #5b6773`
- `--color-brand-surface: #0a0f14`

Use blue as the main brand anchor, red for emphasis only, and dark surfaces for high-end sections.

### Typography

Use a modern sans-serif system that feels technical and premium.

Recommended pairing:

- Headings: `Barlow Condensed` or `Rajdhani`
- Body: `Inter`

Fallback pairing:

- Headings: `Oswald`
- Body: `Inter`

Typography rules:

- Uppercase or semi-condensed headings are allowed for hero statements.
- Body text must remain highly readable.
- Avoid decorative script, retro racing poster fonts, or over-stylized display type.

### Photography and media

- Automotive lubrication, engines, performance parts, workshops, and motorsport contexts are appropriate.
- Product visuals must look technical and premium.
- If 3D or motion is used, it should support engineering credibility.
- The provided logo should be used as the canonical Octagen identity asset.

## Product and content requirements

### Homepage requirements

- Clear hero with Liqui-Moly-first brand framing
- Octagen logo in header
- Inquiry-driven CTA
- Category or capability sections
- Product or solution spotlight
- Trust markers such as Germany, performance, engineering, workshop confidence
- Footer with distributor statement

### Content tone

- Technical but accessible
- Premium but not exaggerated
- Confident, concise, factual
- B2B/B2C inquiry friendly

### CMS direction

- Do not depend on a third-party CMS by default
- Plan for a custom content system later
- Keep content models explicit and structured
- Separate content definitions from UI components

## Technology direction

### Preferred production stack

- Next.js 15
- TypeScript
- Tailwind CSS
- App Router
- Server Components where useful
- Minimal client components
- Node.js API routes / route handlers

### Recommended supporting stack

- Validation: `zod`
- Forms: `react-hook-form`
- Data access for future custom CMS: `prisma` with PostgreSQL or a secure custom API layer
- Auth for admin in future: `next-auth` or a secure JWT/session implementation
- Email/inquiries: SMTP or transactional email provider
- Media delivery: optimized static assets and CDN

### Frontend architecture

- Component-driven UI
- Reusable section blocks
- Design tokens for colors, spacing, and typography
- Responsive by default
- Accessible semantic HTML
- Minimal unnecessary animation

### Note on current repository

The current repository contains a React + Vite public site prototype. That is acceptable for exploration and concept work. For a long-term secure production build, Next.js is the preferred platform direction unless the team explicitly chooses to remain on Vite.

## Security baseline

### Core principles

- Principle of least privilege
- Secure by default
- Validate all inputs
- Sanitize all outputs where needed
- Keep secrets in environment variables only
- Separate public and admin concerns

### Environment and secrets

- Never hardcode API keys, SMTP credentials, or tokens
- Store secrets only in `.env` or deployment secret managers
- Commit only `.env.example`, never real `.env`
- Use different secrets for local, staging, and production

### Application security

- Validate request payloads with schema validation
- Protect all future admin routes with authentication and authorization
- Escape or sanitize rich text and HTML content
- Rate-limit inquiry and contact endpoints
- Log failures without leaking secrets
- Use HTTPS in all deployed environments
- Add security headers including CSP, X-Frame-Options, Referrer-Policy, and HSTS where appropriate

### Dependency and code security

- Keep dependencies current
- Prefer well-maintained packages
- Avoid unnecessary libraries
- Review package purpose before adding
- Run linting and security checks before release

### Future admin/CMS security

- Role-based access for admins
- Audit logging for content changes
- File upload restrictions and MIME validation
- CSRF protection for privileged mutations
- Secure password/session handling

## Cursor workspace requirements

### Agents to maintain

- `frontend-engineer`: public UI and implementation
- `brand-ui-designer`: Liqui-Moly and Octagen brand direction
- `security-architect`: secure architecture, secrets, headers, auth, safe integrations
- `qa-frd-reviewer`: requirement compliance review

### Rules to maintain

- Core product scope
- Brand system
- React/Next TypeScript conventions
- Security baseline

### Skills to maintain

- FRD scope skill
- Liqui-Moly brand skill
- Secure project blueprint skill

## Delivery standards

- Keep requirements centralized in docs
- Keep brand decisions in design tokens and rules
- Keep security defaults documented before feature work
- Prefer maintainable architecture over fast hacks
- Keep Octagen positioning consistent across all pages

## Next implementation defaults

If the team starts a clean production build, default to:

1. Next.js 15 + TypeScript
2. Tailwind CSS with Liqui-Moly brand tokens
3. `Inter` for body and `Barlow Condensed` for headings
4. Inquiry-first architecture
5. Custom admin/CMS later, not in the first homepage build
6. Security baseline enabled from day one

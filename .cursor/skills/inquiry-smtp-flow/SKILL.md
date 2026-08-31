---
name: inquiry-smtp-flow
description: Public inquiry capture into the custom CMS inbox, with optional SMTP notify.
---

# Inquiry flow

1. Validate with `inquiryCreateSchema` (Zod).
2. `POST /api/inquiries` — rate-limited.
3. Store `Inquiry` with `status: NEW`.
4. If SMTP env is set, email `INQUIRY_NOTIFY_EMAIL`.
5. Staff manage records at `/admin/inquiries`.

Types: `GENERAL` | `WORKSHOP` | `BULK` | `PRODUCT_QUOTE`.

No prices. No customer accounts.

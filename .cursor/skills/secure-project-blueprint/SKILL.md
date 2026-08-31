---
name: secure-project-blueprint
description: Defines the secure foundation for Octagen builds, including brand system, stack direction, environment handling, validation, and admin-ready architecture. Use when creating project structure, writing foundation docs, planning secure setup, or reviewing whether work matches the approved platform direction.
disable-model-invocation: true
---

# Secure Project Blueprint

## Quick start

Read `docs/PROJECT-FOUNDATION.md` first.

## Apply this skill when

- Creating or restructuring the Octagen project foundation
- Choosing stack, security defaults, or brand tokens
- Planning homepage-first builds with future custom CMS support
- Reviewing whether implementation matches the approved direction

## Requirements

1. Keep Liqui-Moly as the hero brand and Octagen as the distributor.
2. Prefer a secure production stack of Next.js + TypeScript + Tailwind unless the user explicitly stays on Vite.
3. Keep secrets in environment variables only.
4. Require validation, rate limiting, and secure admin boundaries for future backend work.
5. Keep ecommerce features out unless the user explicitly changes scope.

## Output checklist

- Confirm stack direction
- Confirm brand color and font direction
- Confirm inquiry-first scope
- Confirm environment variable handling
- Confirm security baseline for future admin/CMS

## Additional resource

- See [../../docs/PROJECT-FOUNDATION.md](../../docs/PROJECT-FOUNDATION.md)

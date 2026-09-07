# Deploy Octagen (Node + PostgreSQL, no Docker app)

Direct production run: build on the server (or CI), point at PostgreSQL, run `next start`.
Do **not** commit secrets. Put them only in `web/.env` on the server.

## Architecture

| Piece | Choice |
| --- | --- |
| App | Next.js in `web/` — `npm run build` then `npm run start:prod` |
| Database | PostgreSQL 14+ (native install or managed). App connects via `DATABASE_URL` |
| Process | `node` / `npm` (optional: `pm2` or systemd). No Docker required for the app |

Docker Compose in the repo is **optional** (local Postgres only). Production can use a bare-metal or managed Postgres.

## Security checklist (do this first)

1. **Postgres bind** — listen on `127.0.0.1` (or private VPC). Never open `5432` to the public internet.
2. **Strong passwords** — DB user + `ADMIN_PASSWORD` + `AUTH_SECRET` (min 32 chars, random).
3. **HTTPS** — terminate TLS at Nginx/Caddy/Cloudflare; app can listen on `127.0.0.1:3000`.
4. **`.env` permissions** — `chmod 600 web/.env`; owned by the deploy user.
5. **Admin** — change seed password after first login; keep `/admin` over HTTPS only.
6. **Firewall** — allow `80`/`443` only; SSH locked down (key auth).

## What credentials to prepare (share when ready)

Send these **out of band** (or paste into a private chat once). Do not commit them.

```text
# Server
HOST=...
SSH_USER=...
APP_PATH=/var/www/octagen   # or your path
DOMAIN=https://your-domain.com

# PostgreSQL
PG_HOST=127.0.0.1
PG_PORT=5432
PG_DB=octagen
PG_USER=octagen
PG_PASSWORD=...

# App secrets
AUTH_SECRET=...             # openssl rand -base64 48
ADMIN_EMAIL=admin@...
ADMIN_PASSWORD=...
ADMIN_NAME=Octagen Admin

# Optional SMTP
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
SMTP_FROM=
INQUIRY_NOTIFY_EMAIL=
```

## Server prerequisites

- Node.js **≥ 20.9**
- PostgreSQL **≥ 14** with an empty database + user
- Git (or upload the `web/` build artifacts)

### Create DB (example, as postgres superuser)

```bash
sudo -u postgres psql <<'SQL'
CREATE USER octagen WITH PASSWORD 'REPLACE_STRONG_PASSWORD';
CREATE DATABASE octagen OWNER octagen;
GRANT ALL PRIVILEGES ON DATABASE octagen TO octagen;
\c octagen
GRANT ALL ON SCHEMA public TO octagen;
SQL
```

## Deploy steps (on the server)

```bash
# 1) Get code
cd /var/www   # or your path
git clone <your-repo-url> octagen
cd octagen/web

# 2) Env (never commit this file)
cp .env.example .env
nano .env   # fill DATABASE_URL, AUTH_SECRET, ADMIN_*, NEXT_PUBLIC_SITE_URL

# 3) Install + build
npm ci
npm run build

# 4) Migrate schema + seed admin / sample content
npx prisma migrate deploy
npm run db:seed

# 5) Run (foreground test)
npm run start:prod
# → http://127.0.0.1:3000
```

### Keep it running with pm2 (recommended)

```bash
npm i -g pm2
pm2 start npm --name octagen -- run start:prod
pm2 save
pm2 startup
```

### Nginx reverse proxy (HTTPS)

Point the domain to `http://127.0.0.1:3000`. Example location:

```nginx
location / {
  proxy_pass http://127.0.0.1:3000;
  proxy_http_version 1.1;
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto $scheme;
}
```

Use Certbot (or your panel) for TLS certificates.

## Updates / redeploy

```bash
cd /var/www/octagen
git pull
cd web
npm ci
npm run build
npx prisma migrate deploy
pm2 restart octagen
```

## Local note

Schema provider is **PostgreSQL**. Local SQLite `file:./dev.db` no longer works.
For local work either:

- run Postgres (native or `docker compose up -d` from repo root for **DB only**), then set `DATABASE_URL` in `web/.env`, or  
- wait until the server DB is available and point `DATABASE_URL` at it (VPN/SSH tunnel).

## Verify after deploy

- Public: `https://your-domain.com`
- Admin: `https://your-domain.com/admin/login`
- Submit an inquiry → appears under `/admin/inquiries`
- Confirm cookies are `Secure` over HTTPS

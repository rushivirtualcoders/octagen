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

## Production layout (this server)

| Piece | Path / value |
| --- | --- |
| Git repo | `/home/deploy/apps/octagen` |
| Next.js app | `/home/deploy/apps/octagen/web` |
| Env file | `/home/deploy/apps/octagen/web/.env` (never commit) |
| Process | PM2 name `octagen` (user `deploy`) |
| Port | `3020` (Nginx → `127.0.0.1:3020`) |
| Domain | `https://octagen.virtualcodershub.com` |
| Remote | `https://github.com/rushivirtualcoders/octagen.git` |

Do **not** upload zip/tarball folders for updates. Always `git pull` + build.

## First-time setup (git clone)

```bash
# as root / with deploy ownership
sudo -u deploy bash <<'EOF'
set -euo pipefail
mkdir -p /home/deploy/apps
cd /home/deploy/apps
# if an old non-git folder exists, move it aside first
# mv octagen octagen-legacy-$(date +%Y%m%d)
git clone https://github.com/rushivirtualcoders/octagen.git octagen
cd octagen/web
cp .env.example .env
chmod 600 .env
# edit .env: DATABASE_URL, AUTH_SECRET, ADMIN_*, NEXT_PUBLIC_SITE_URL, PORT=3020
nano .env
npm ci
npm run build
npx prisma migrate deploy
npm run db:seed   # first time only
PORT=3020 NODE_ENV=production pm2 start npm --name octagen --cwd /home/deploy/apps/octagen/web -- start
pm2 save
EOF
```

### Nginx reverse proxy (HTTPS)

Point the domain to `http://127.0.0.1:3020`. Example location:

```nginx
location / {
  proxy_pass http://127.0.0.1:3020;
  proxy_http_version 1.1;
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto $scheme;
}
```

Use Certbot (or your panel) for TLS certificates.

## Updates / redeploy (git pull)

As user `deploy`:

```bash
bash /home/deploy/apps/octagen/scripts/server-deploy.sh
```

Or manually:

```bash
cd /home/deploy/apps/octagen
git pull --ff-only origin main
cd web
npm ci
npm run build
npx prisma migrate deploy
PORT=3020 NODE_ENV=production pm2 reload octagen --update-env
pm2 save
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

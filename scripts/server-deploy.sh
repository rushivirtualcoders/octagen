#!/usr/bin/env bash
# Run on the production host as user `deploy` (or root that sudo -u deploy).
# App lives at: /home/deploy/apps/octagen  (full git repo)
# Next.js app:  /home/deploy/apps/octagen/web
set -euo pipefail

REPO_DIR="${OCTAGEN_REPO_DIR:-/home/deploy/apps/octagen}"
APP_DIR="$REPO_DIR/web"
BRANCH="${OCTAGEN_BRANCH:-main}"

cd "$REPO_DIR"
git fetch origin "$BRANCH"
git checkout "$BRANCH"
git pull --ff-only origin "$BRANCH"

cd "$APP_DIR"
if [[ ! -f .env ]]; then
  echo "Missing $APP_DIR/.env — create it from .env.example before deploying." >&2
  exit 1
fi

npm ci
npm run build
npx prisma migrate deploy

export PORT="${PORT:-3020}"
export NODE_ENV=production

if pm2 describe octagen >/dev/null 2>&1; then
  pm2 reload octagen --update-env
else
  pm2 start npm --name octagen --cwd "$APP_DIR" -- start
fi
pm2 save

echo "DEPLOY_OK $(git -C "$REPO_DIR" rev-parse --short HEAD)"

#!/bin/zsh
set -euo pipefail

# =========================
# ✅ SITE CONFIG (EDIT THIS)
# =========================
SITE_NAME="JD Aitken (jdaitken.ca)"

# IMPORTANT: set this to the EXACT local folder for this repo
EXPECTED_DIR="/Users/jdaitken/code/jdaitken.ca"

# A unique keyword that MUST appear in your git remote URL for this repo
# Example: "jdaitken" or "jdaitken-ca" or the repo name on GitHub
EXPECTED_REMOTE_KEYWORD="jdaitken"

# SSH + rsync destination (EDIT THESE)
SSH_HOST="ssh.YOUR-SITEGROUND-HOST.com"      # e.g. ssh.johna123.sg-host.com
SSH_PORT="18765"                             # e.g. 18765
SSH_USER="uXXXX-XXXXXXXXXXXX"                # e.g. u2826-exegcos33idr
REMOTE_PATH="~/www/jdaitken.ca/public_html/"  # your exact SiteGround path

# Optional: custom SSH key (leave blank to use default key)
SSH_KEY="${HOME}/.ssh/id_ed25519"

# =========================
# 🔒 SAFETY CHECKS
# =========================
echo "=================================="
echo "🚀 DEPLOYING: ${SITE_NAME}"
echo "📂 Current folder: $(pwd)"
echo "=================================="

if [[ "$(pwd)" != "$EXPECTED_DIR" ]]; then
  echo "🛑 WRONG FOLDER"
  echo "You are in: $(pwd)"
  echo "Expected:  $EXPECTED_DIR"
  exit 1
fi

echo "🔎 Checking git remote..."
REMOTE_URL="$(git remote get-url origin 2>/dev/null || true)"
if [[ -z "$REMOTE_URL" ]]; then
  echo "🛑 No 'origin' remote found. Are you in a git repo?"
  exit 1
fi
echo "origin -> $REMOTE_URL"

if ! echo "$REMOTE_URL" | grep -qi "$EXPECTED_REMOTE_KEYWORD"; then
  echo "🛑 WRONG REPO (remote URL didn't match keyword: $EXPECTED_REMOTE_KEYWORD)"
  exit 1
fi

echo ""
read -p "🚨 Confirm deploy to ${SITE_NAME}? Type 'deploy' to continue: " CONFIRM
if [[ "$CONFIRM" != "deploy" ]]; then
  echo "❌ Cancelled."
  exit 1
fi

# =========================
# ✅ DEPLOY STEPS
# =========================
echo "📦 Staging changes..."
git add .

echo "📝 Committing (if needed)..."
git commit -m "Deploy update" || true

echo "🔄 Pulling latest (rebase)..."
git pull origin main --rebase || true

echo "🚀 Pushing to GitHub..."
git push origin main

echo "🌐 Deploying via rsync to SiteGround..."
rsync -avz --delete \
  --exclude ".git" \
  --exclude ".vscode" \
  --exclude ".DS_Store" \
  --exclude "node_modules" \
  --exclude "*.log" \
  -e "ssh -i $SSH_KEY -p $SSH_PORT" \
  ./ \
  "${SSH_USER}@${SSH_HOST}:${REMOTE_PATH}"

echo "✅ Deployment complete: ${SITE_NAME}"

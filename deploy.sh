#!/bin/zsh
set -e

# ========= CHANGE THESE TWO LINES PER PROJECT =========
SITE_NAME="jdaitken.ca"
DEST="u3102-burdgyn0i9k2@jdaitken.ca:~/www/jdaitken.ca/public_html/"
# =====================================================

echo "🚀 Deploying $SITE_NAME..."

# Optional micro-safety: makes sure you're in the right folder name
EXPECTED_DIR="$SITE_NAME"
CURRENT_DIR="$(basename "$(pwd)")"
if [[ "$CURRENT_DIR" != "$EXPECTED_DIR" ]]; then
  echo "❌ Wrong folder. Expected: $EXPECTED_DIR | Current: $CURRENT_DIR"
  exit 1
fi

# 1) Commit changes
git add .
git commit -m "Auto-deploy: $SITE_NAME" || true

# 2) Pull from GitHub
git pull origin main --rebase

# 3) Push new changes to GitHub
git push origin main

# 4) Sync to SiteGround
rsync -avz --delete \
  --exclude ".git" \
  --exclude ".DS_Store" \
  --exclude "node_modules" \
  --exclude ".vscode" \
  --exclude "deploy.sh" \
  -e "ssh -p 18765" \
  ./ \
  "$DEST"

echo "✅ Deployment complete: $SITE_NAME"

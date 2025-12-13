#!/bin/zsh
set -eu

# =========================
# SITE CONFIG
# =========================
SITE_NAME="jdaitken.ca"
EXPECTED_DIR="/Users/jdaitken/code/jdaitken.ca"
EXPECTED_REMOTE="jdaitken.ca.git"

SSH_HOST="jdaitken.ca"
SSH_PORT="18765"
SSH_USER="u3102-burdgyn0i9k2"
REMOTE_PATH="~/public_html/"
SSH_KEY="$HOME/.ssh/id_ed25519"

# =========================
# SAFETY CHECKS
# =========================
echo ""
echo "🚀 Deploying $SITE_NAME"
echo "📂 Local:  $(pwd)"
echo "🎯 Remote: $SSH_USER@$SSH_HOST:$REMOTE_PATH"
echo ""

[[ "$(pwd)" == "$EXPECTED_DIR" ]] || { echo "🛑 Wrong folder"; exit 1; }

REMOTE_URL="$(git remote get-url origin 2>/dev/null || true)"
[[ -n "$REMOTE_URL" ]] || { echo "🛑 No git remote 'origin'"; exit 1; }
[[ "$REMOTE_URL" == *"$EXPECTED_REMOTE"* ]] || { echo "🛑 Wrong repo: $REMOTE_URL"; exit 1; }

read "CONFIRM?Type '$SITE_NAME' to deploy: "
[[ "$CONFIRM" == "$SITE_NAME" ]] || { echo "❌ Cancelled"; exit 1; }

# =========================
# DEPLOY
# =========================
git add .
git commit -m "Deploy update" || true
git pull origin main --rebase || true
git push origin main

rsync -avz \
  --exclude='/.git/' \
  --exclude='/.vscode/' \
  --exclude='.DS_Store' \
  -e "ssh -i $SSH_KEY -p $SSH_PORT" \
  ./ \
  "$SSH_USER@$SSH_HOST:$REMOTE_PATH"

echo "✅ Deploy complete: $SITE_NAME"

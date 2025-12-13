#!/bin/zsh
set -e

# =========================
# SITE CONFIG (ONLY EDIT THESE)
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
echo "📂 Local folder: $(pwd)"
echo "🎯 Remote: $SSH_USER@$SSH_HOST:$REMOTE_PATH"
echo ""

# Folder check
if [[ "$(pwd)" != "$EXPECTED_DIR" ]]; then
  echo "🛑 Wrong folder"
  exit 1
fi

# Repo check
REMOTE_URL=$(git remote get-url origin)
if [[ "$REMOTE_URL" != *"$EXPECTED_REMOTE"* ]]; then
  echo "🛑 Wrong git repo"
  echo "Found: $REMOTE_URL"
  exit 1
fi

# Confirm
read -p "Type '$SITE_NAME' to deploy: " CONFIRM
[[ "$CONFIRM" == "$SITE_NAME" ]] || exit 1

# =========================
# DEPLOY
# =========================
git add .
git commit -m "Deploy update" || true
git pull origin main --rebase || true
git push origin main

rsync -avz --delete --dry-run \
  --exclude ".git" \
  --exclude ".vscode" \
  --exclude ".DS_Store" \
  -e "ssh -i $SSH_KEY -p $SSH_PORT" \
  ./ \
  "$SSH_USER@$SSH_HOST:$REMOTE_PATH"


echo "✅ Deploy complete"

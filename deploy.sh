#!/bin/bash
set -e

echo "🧠 Starting deploy..."

# 1) Sync with GitHub
echo "🔄 Pulling latest local changes..."
git pull origin main --rebase || true

# 2) Stage + commit everything
echo "📦 Staging changes..."
git add .

echo "📝 Committing..."
git commit -m "Deploy update" || true

# 3) Push to GitHub
echo "🚀 Pushing to GitHub..."
git push origin main

# 4) Deploy via SSH + rsync
echo "🌐 Deploying to SiteGround..."

rsync -avz \
  --exclude ".git" \
  --exclude ".vscode" \
  --exclude "deploy.sh" \
  --exclude ".DS_Store" \
  --exclude "node_modules" \
  -e "ssh -i ~/.ssh/id_ed25519 -p 18765" \
  ./ \
  u3102-burdgyn0i9k2@35.206.121.157:/home/customer/www/jdaitken.ca/public_html/

echo "✨ Deploy complete!"

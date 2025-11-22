#!/bin/bash
set -e

echo "🚀 Simple Deploy Starting..."

# Automatically clean up local changes
echo "📦 Stashing changes..."
git stash push --include-untracked || true

echo "🔄 Pulling latest from GitHub..."
git pull origin main --rebase || true

echo "📥 Restoring changes..."
git stash pop || true

echo "📝 Committing & pushing..."
git add .
git commit -m "simple deploy" || true
git push origin main

echo "🌐 Deploying to SiteGround..."
ssh -i ~/.ssh/id_ed25519 u3102-burdgyn0i9k2@ssh.jdaitken.ca -p 18765 \
"cd ~/www/jdaitken_ca/public_html && git pull origin main"

echo "🎉 DEPLOY COMPLETE!"

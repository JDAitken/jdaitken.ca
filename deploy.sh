#!/bin/bash
set -e

echo "🚀 Simple Pro Deploy Starting..."

# Automatically clean up local changes
echo "📦 Stashing changes..."
git stash push --include-untracked || true

echo "🔄 Pulling latest from GitHub..."
git pull origin main --rebase || true

echo "📥 Restoring changes..."
git stash pop || true

echo "🧹 Minifying files (simple & optional)..."

# MINIFY HTML
npx html-minifier index.html \
  --collapse-whitespace \
  --remove-comments \
  --minify-css true \
  --minify-js true \
  -o index.html

# MINIFY CSS
npx cleancss -o styles.css styles.css

# MINIFY JS
npx terser script.js -o script.js --compress --mangle || true

echo "📝 Committing & pushing..."
git add .
git commit -m "simple deploy" || true
git push origin main

echo "🌐 Deploying to SiteGround..."
ssh -i ~/.ssh/YOURKEYNAME u3102-burdgyn0i9k2@ssh.jdaitken.ca -p 18765 \
"cd ~/www/jdaitken_ca/public_html && git pull origin main"

echo "🎉 DEPLOY COMPLETE!"

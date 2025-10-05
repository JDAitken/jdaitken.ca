#!/bin/bash
set -e

echo "🧠 Starting deploy..."

# 1) Stay in sync with GitHub
echo "🔄 Pulling latest local changes..."
git pull origin main --rebase || true

# 2) Commit whatever you changed
git add .
git commit -m "update site" || true

# 3) Push to GitHub
echo "🚀 Pushing to GitHub..."
git push origin main

# 4) Deploy to SiteGround and cache-bust assets so updates show instantly
echo "🌐 Deploying to SiteGround..."
ssh -i ~/.ssh/siteground u3102-burdgyn0i9k2@giowm1219.siteground.biz -p 18765 '
  set -e
  cd ~/www/jdaitken.ca/public_html
  git fetch origin
  git reset --hard origin/main
  REV=$(git rev-parse --short HEAD)

  # Add/refresh ?v=<commit> on CSS/JS so browsers + SG cache always fetch the latest
  sed -i.bak -E "s/(styles\.css)(\?v=[A-Za-z0-9]+)?/\1?v=${REV}/" index.html && rm -f index.html.bak
  sed -i.bak -E "s/(script\.js)(\?v=[A-Za-z0-9]+)?/\1?v=${REV}/"  index.html && rm -f index.html.bak

  echo "✅ Live pulled to commit ${REV} and cache-busted."
'

echo "🎉 Deploy complete! https://jdaitken.ca"

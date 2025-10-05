#!/bin/bash
set -e
echo "🧠 Starting deploy..."
git add .
git commit -m "update site" || true
git push origin main
ssh -i ~/.ssh/siteground u3102-burdgyn0i9k2@giowm1219.siteground.biz -p 18765 \
  "cd ~/www/jdaitken.ca/public_html && git fetch origin && git reset --hard origin/main"
echo "✅ Deploy complete! Visit https://jdaitken.ca"


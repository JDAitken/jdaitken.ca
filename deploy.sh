#!/bin/bash
set -e

echo "🧠 Starting deploy..."

###############################################
# 1) Commit & push changes to GitHub (local)
###############################################

echo "🔄 Committing and pushing to GitHub..."
git add .
git commit -m "update site" || true
git push origin main

###############################################
# 2) Upload files to SiteGround via SSH/rsync
#    (uses 1Password SSH agent automatically)
###############################################

echo "🌐 Uploading to SiteGround..."

rsync -avz \
  -e "ssh -p 18765" \
  --exclude ".git/" \
  --exclude "deploy.sh" \
  --exclude "deploy.php" \
  ./ \
  u3102-burdgyn0i9k2@giowm1219.siteground.biz:~/www/jdaitken.ca/public_html/

echo "🔧 Cache-busting CSS/JS..."

ssh -p 18765 u3102-burdgyn0i9k2@giowm1219.siteground.biz '
  set -e
  cd ~/www/jdaitken.ca/public_html

  REV=$(date +%s)

  sed -i.bak -E "s/(styles\.css)(\?v=[0-9]+)?/\1?v=${REV}/" index.html && rm -f index.html.bak
  sed -i.bak -E "s/(script\.js)(\?v=[0-9]+)?/\1?v=${REV}/" index.html && rm -f index.html.bak

  echo "✅ Updated version to $REV"
'

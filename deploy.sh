#!/bin/bash
set -e

echo "🔄 Pulling latest local changes..."
git pull origin main --rebase || true

echo "🧠 Committing your changes..."
git add .
git commit -m "update site" || true

echo "🚀 Pushing to GitHub..."
git push origin main

echo "🌐 Deploying to SiteGround..."

# Update these:
USER="u3102-burdgyn0i9k2"
HOST="35.206.121.157"
PORT="18765"
REMOTE_DIR="/home/customer/www/jdaitken.ca/public_html/"

# Upload all site files
rsync -avz --delete \
  -e "ssh -p $PORT" \
  . $USER@$HOST:$REMOTE_DIR

echo "🧹 Clearing Remote CSS/JS cache-busting..."
ssh -p $PORT $USER@$HOST << 'EOF'
cd /home/customer/www/jdaitken.ca/public_html
REV=$(date +%s)
sed -i.bak -E "s/styles\.css\?[0-9]+/styles.css?\$REV/" index.html
sed -i.bak -E "s/script\.js\?[0-9]+/script.js?\$REV/" index.html
rm -f index.html.bak
EOF

echo "✅ Deploy complete! Visit: https://jdaitken.ca"

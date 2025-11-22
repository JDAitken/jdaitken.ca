#!/bin/bash
set -e

echo "🚀 Super Simple Deploy Starting..."

# ALWAYS stage everything
git add -A

# ALWAYS commit (even if nothing changed)
git commit -m "deploy" || true

# ALWAYS push
git push origin main

# ALWAYS deploy to server
ssh -i ~/.ssh/id_ed25519 u3102-burdgyn0i9k2@35.206.121.157 -p 18765 \
"cd ~/www/jdaitken.ca && git pull origin main"

echo "🎉 DEPLOY COMPLETE!"

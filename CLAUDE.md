# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**JD Media** is a portfolio and business website for a web design agency serving local service businesses. The site showcases work, pricing, process, and includes an AI-powered chat assistant.

**Technology Stack:**
- Static HTML/CSS/JavaScript (no build process)
- PHP backend for forms and API endpoints
- Vanilla JavaScript (no frameworks)
- Deployment via GitHub Actions to SiteGround

## Local Development

Serve locally with PHP (required for API endpoints):
```bash
php -S localhost:8080
```

Screenshot testing uses Puppeteer (already installed in `node_modules/`):
```bash
node -e "
const p = require('puppeteer');
(async () => {
  const b = await p.launch();
  const pg = await b.newPage();
  await pg.setViewport({ width: 1440, height: 900 });
  await pg.goto('http://localhost:8080/', { waitUntil: 'networkidle0' });
  await pg.screenshot({ path: '/tmp/screen-desktop.png', fullPage: false });
  await pg.setViewport({ width: 390, height: 844 });
  await pg.screenshot({ path: '/tmp/screen-mobile.png', fullPage: false });
  await b.close();
})();
"
```

## Architecture

### Page Structure

Pages live as `index.html` inside named subdirectories — **not** flat `.html` files in root:

```
index.html          ← Homepage
about/index.html
work/index.html
pricing/index.html
process/index.html
contact/index.html
thanks/index.html   ← Post-form submission confirmation
hi/index.html       ← noindex landing page (outreach/cold leads)
arlene/index.html   ← noindex personal mini-app (not part of main site)
```

### CSS Design System (Three-Layer Architecture)

Load in this order — all three are required on every page:

1. **`styles/tokens-v2.css`** — CSS custom properties (colors, spacing, typography, shadows). Source of truth.
2. **`styles/base-v2.css`** — Resets, global typography, element defaults.
3. **`styles/components-v2.css`** — Reusable UI components referencing token variables.

**Hard rule:** Never hardcode colors, spacing, or font names. Always use `var(--token-name)`.

### JavaScript

- `js/main.js` — Navigation, mobile menu, smooth scrolling
- `js/chat.js` — AI chat widget (proxied through `api/chat.php`)

### PHP API Endpoints

All live in `/api/`:
- `contact.php` — Contact form handler with rate limiting and spam protection
- `chat.php` — OpenAI chat proxy; reads knowledge base from `api/jdmedia_knowledge.txt`
- `audit.php` — SEO audit request form handler with rate limiting

`api/jdmedia_knowledge.txt` — Plain-text knowledge base fed to the AI chat (pricing, services, contact info). Keep in sync with live pricing.

`api/tmp/` — Rate-limit state files; gitignored.

### Brand Assets

- `brand/favicon/` — All favicon sizes + apple-touch-icon
- `images/logos/jd-media-logo.svg` — Primary logo
- `images/og-image.png` — OG/social share image

### Archive

`_archive/` holds retired files (old brand assets, old docs). Do not edit anything under `_archive/`.

## Brand Standards

**Color Palette:**
- Navy (`--color-text: #1B3A5F`) for primary text
- Coral (`--color-accent: #FF6B6B`) for accents/CTAs
- Off-white background (`--color-bg: #FAFAFA`)
- White surfaces (`--color-surface: #FFFFFF`)

**Typography:** Inter (body, weights 400/500/600) · DM Sans (headings, weights 500/700)

**Voice:** Calm and confident. Real metrics only — no fake content or hype.

## Deployment

Push to `main` — GitHub Actions deploys automatically via rsync to SiteGround (port 18765). Deploy after every change; do not batch.

```bash
git add <changed-files>
git commit -m "..."
git push origin main
```

`deploy.sh` exists but is not used for this project — GitHub Actions handles it.

## Workflow Rules

**Frontend changes:** Invoke the `frontend-design` skill whenever making changes to HTML, CSS, or visual layout.

**CSS:** Always use tokens from `tokens-v2.css`. Never hardcode hex values, spacing, or font names.

**Client case studies:** Only Legendary Landscaping and Capital City Cards are cleared for public use. Do not use J&J Remodeling without permission.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**JD Media** is a portfolio and business website for a web design agency serving local service businesses. The site showcases work, pricing, and case studies, and handles leads through Formspree-backed forms.

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
index.html                          ← Homepage
about/index.html
work/index.html
work/legendary-landscaping/index.html  ← Case study detail page
pricing/index.html
ottawa-web-design/index.html        ← SEO/service landing page
lp/index.html                       ← Paid-ads landing page, no nav
blog/website-that-generates-calls-local-trades/index.html
contact/index.html
thanks/index.html   ← Post-form submission confirmation
hi/index.html       ← noindex landing page (outreach/cold leads)
privacy/index.html
arlene/index.html   ← noindex personal mini-app (not part of main site)
```

### CSS Design System (Three-Layer Architecture)

Load in this order — all three are required on every page:

1. **`styles/tokens-v2.css`** — CSS custom properties (colors, spacing, typography, shadows). Source of truth.
2. **`styles/base-v2.css`** — Resets, global typography, element defaults.
3. **`styles/components-v2.css`** — Reusable UI components referencing token variables.

**Hard rule:** Never hardcode colors, spacing, or font names. Always use `var(--token-name)`.

### JavaScript

- `js/main.js` — Navigation, mobile menu, contact-form submit handling
- `js/tracking.js` — GA4, Google Ads, and Meta Pixel; loaded in `<head>` on every page
- `js/chat.js` — **Dead code.** Not loaded by any page; kept per the no-delete rule. Its backing
  endpoint (`api/chat.php`) was disabled in commit `bac6bf7`.

### PHP API Endpoints

All live in `/api/`. **Every live form on the site now posts to Formspree, not these endpoints:**
- `contact.php`, `audit.php` — No longer wired to any form; nothing references them.
- `chat.php` — Disabled (see above).

`api/jdmedia_knowledge.txt` — Was the AI chat's knowledge base; orphaned along with `chat.php`.

`api/tmp/` — Rate-limit state files; gitignored.

### Brand Assets

- `brand/favicon/` — All favicon sizes + apple-touch-icon
- `images/logos/jd-media-logo.svg` — Primary logo
- `images/og-image.png` — OG/social share image

### Archive

`_archive/` holds retired files (old brand assets, old docs). Do not edit anything under `_archive/`.

## Brand Standards

Source of truth: `brand/BRAND-GUIDE.md` (v3.0). Read it before any visual or copy change — don't
rely on values restated here, they drift. Current headline points: navy-dominant with signal red
(`#C9403A`) rationed to one CTA per screen, Barlow headlines / Inter body, no agency jargon, the
90-day guarantee stated once per page at the decision point (never in the hero).

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

**Client case studies:** Legendary Landscaping, Capital City Cards, and J&J Remodeling are all cleared for public use.

# CLAUDE.md

> This file provides context for Claude Code when working in the jdaitken.ca repository.

## Project Overview

**JD Media** is a portfolio and business website for a web design agency serving local service businesses. The site showcases work, pricing, process, and includes an AI-powered chat assistant.

**Technology Stack:**
- Static HTML/CSS/JavaScript (no build process)
- PHP backend for forms and API endpoints
- Vanilla JavaScript (no frameworks)
- Deployment via GitHub Actions to SiteGround

## Architecture

### CSS Design System (Three-Layer Architecture)

The CSS follows a token-based design system:

1. **`styles/tokens-v2.css`** - Design tokens (source of truth)
   - All CSS custom properties (colors, spacing, typography, shadows)
   - Never hardcode values that exist as tokens
   - Mobile-first responsive typography scaling

2. **`styles/base-v2.css`** - Base styles
   - CSS resets and normalizations
   - Global typography rules
   - Element-level defaults

3. **`styles/components-v2.css`** - Component styles
   - Reusable UI components (buttons, cards, forms, badges)
   - All components reference tokens-v2.css variables

**Critical Rule:** Always use CSS custom properties from `tokens-v2.css`. Never hardcode colors, spacing, or typography values.

### JavaScript

Vanilla JavaScript located in `/js`:
- `main.js` - Navigation, mobile menu, smooth scrolling
- `chat.js` - AI chat widget powered by OpenAI API

### PHP Backend

API endpoints in `/api`:
- `contact.php` - Contact form handler with rate limiting and spam protection
- `chat.php` - OpenAI chat proxy with CORS headers and API key security

### HTML Pages

7 main pages in root directory:
- `index.html` - Homepage
- `about.html` - About JD Media
- `work.html` - Portfolio/case studies
- `pricing.html` - Service pricing
- `process.html` - Development process
- `contact.html` - Contact form
- `thanks.html` - Form submission confirmation

## Development Guidelines

### Design System Principles

**Always reference tokens:**
```css
/* ✓ GOOD */
color: var(--color-text);
padding: var(--space-lg);
font-family: var(--font-display);

/* ✗ BAD */
color: #1B3A5F;
padding: 24px;
font-family: 'DM Sans';
```

**Mobile-first responsive approach:**
- Default styles for mobile (375px)
- Scale up for tablet (768px+) and desktop (1024px+)
- Use CSS custom properties that adapt at breakpoints (e.g., `var(--text-hero)`)

**High contrast accessibility:**
- Minimum 4.5:1 contrast for text
- Minimum 3:1 contrast for UI elements
- Focus indicators on all interactive elements
- Semantic HTML structure

### Code Style

- **No frameworks** - Keep vanilla HTML/CSS/JS
- **No build tools** - Direct file editing
- **Semantic HTML** - Use appropriate elements (`<header>`, `<nav>`, `<main>`, `<article>`, etc.)
- **Progressive enhancement** - Core functionality works without JavaScript

### Brand Standards

**Color Palette:**
- Navy (`--color-text: #1B3A5F`) for primary text
- Coral (`--color-accent: #FF6B6B`) for accents/CTAs
- Soft off-white background (`--color-bg: #FAFAFA`)
- Pure white surfaces (`--color-surface: #FFFFFF`)

**Typography:**
- **Inter** for UI/body text (weights: 400, 500, 600)
- **DM Sans** for headings/hero text (weights: 500, 700)
- 8px spacing scale (`--space-xs` through `--space-5xl`)

**Voice & Tone:**
- Calm and confident (no hype or urgency tricks)
- Caretaker mindset - helpful and invested
- Quietly technical - sophisticated without intimidation
- Use real metrics and case studies (no fake content)

## Deployment

**Automated via GitHub Actions:**
- Workflow: `.github/workflows/deploy.yml`
- Triggers on push to `main` branch
- Deploys to SiteGround via rsync over SSH (port 18765)
- Excludes: `.git/`, `.github/`, `node_modules/`, `.DS_Store`

**Required GitHub Secrets:**
- `SSH_PRIVATE_KEY` - ED25519 private key for authentication
- `SSH_USER` - SiteGround username
- `SSH_HOST` - SiteGround server IP/hostname
- `SSH_PORT` - SSH port (18765)
- `DEPLOY_PATH` - Target directory on server

**Manual deployment:** Can be triggered via GitHub Actions UI (workflow_dispatch)

## Important Files

### Core CSS (Load in Order)
1. `styles/tokens-v2.css` - Design tokens
2. `styles/base-v2.css` - Base styles
3. `styles/components-v2.css` - Components

### Reference Documents
- `BRAND-v2.md` - Comprehensive brand guidelines (positioning, voice, visual identity)
- `claude-code-prompt.md` - Design system documentation

### Configuration
- `.github/workflows/deploy.yml` - Deployment workflow
- `api/.htaccess` - PHP routing configuration

### Brand Assets
- `/brand` directory - Logo files, brand resources

## Common Tasks

**Adding a new page:**
1. Create HTML file in root directory
2. Include all three CSS files in order (tokens → base → components)
3. Link fonts: Inter and DM Sans from Google Fonts
4. Use semantic HTML structure
5. Follow mobile-first responsive patterns
6. Add navigation link in all existing pages

**Styling a component:**
1. Check if similar component exists in `components-v2.css`
2. Use only tokens from `tokens-v2.css`
3. Maintain accessibility standards (contrast, focus states)
4. Test mobile → tablet → desktop

**Deploying changes:**
1. Commit changes to `main` branch
2. GitHub Actions automatically deploys to SiteGround
3. Monitor workflow in GitHub Actions tab

## Performance Targets

- Initial load: <50KB (HTML/CSS/critical JS)
- First Contentful Paint: <1.5s
- Time to Interactive: <3s
- Lighthouse score: 90+ across all categories

## Accessibility Standards

- WCAG 2.1 AA compliance minimum
- Semantic HTML structure
- Alt text on all images
- Form labels and error states
- Keyboard navigation support
- Screen reader friendly

---

**For detailed brand guidelines, visual identity, and component principles, see `BRAND-v2.md`.**

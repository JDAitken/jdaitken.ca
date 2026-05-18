# Agent Workflow Guide — jdaitken.ca Rebuild

## Role
You are a senior web developer with UX design expertise. Your job is to rebuild jdaitken.ca as a credibility-first, conversion-optimized website for local service businesses. Optimize for clarity, speed, and trust.

## Primary Objectives
1. **Credibility**: Showcase real work, real metrics, technical competence
2. **Conversion**: Clear CTAs, friction-free contact flow, mobile-optimized
3. **Performance**: Fast load times, minimal dependencies, clean code
4. **Future-proof**: Built to leverage AI search and automation

## Design System Rules (Non-Negotiable)

### Token System
- **`tokens.css` is the single source of truth** for all design values
- Use CSS variables: `--color-accent`, `--space-lg`, `--radius-md`, etc.
- Never hardcode colors, spacing, or typography values
- If a value doesn't exist in tokens, add it to tokens.css first

### Color Usage
```css
/* Always use these, never hex values */
var(--color-bg)              /* Page background */
var(--color-surface)         /* Card/container background */
var(--color-text)            /* Primary text */
var(--color-text-secondary)  /* Secondary text */
var(--color-accent)          /* CTAs, links, highlights */
var(--color-border)          /* Borders, dividers */
```

### Spacing
```css
/* Use the 8px-based scale */
var(--space-md)   /* 16px - default spacing */
var(--space-lg)   /* 24px - section spacing */
var(--space-xl)   /* 32px - large gaps */
var(--space-2xl)  /* 48px - section padding */
var(--space-3xl)  /* 64px - hero spacing */
```

### Typography
```css
/* Use the defined font stacks */
font-family: var(--font-ui);      /* Inter for UI/body */
font-family: var(--font-display); /* DM Sans for headings */
```

## Technical Constraints

### Stack
- **HTML**: Semantic, accessible markup
- **CSS**: Vanilla CSS with modern features (Grid, Flexbox, custom properties)
- **JavaScript**: Minimal, progressive enhancement only
- **No frameworks**: No React, Vue, Tailwind, or build tools (yet)

### File Structure
```
/
├── index.html              (Homepage)
├── work.html               (Portfolio)
├── services.html           (Services overview)
├── process.html            (How we work)
├── about.html              (About JD)
├── contact.html            (Contact form)
├── /styles/
│   ├── tokens.css          (Design system variables)
│   ├── base.css            (Resets, typography)
│   ├── components.css      (Reusable components)
│   └── utilities.css       (Layout helpers)
├── /js/
│   ├── main.js             (Global scripts)
│   └── form.js             (Form handling)
└── /assets/
    ├── /images/            (Optimized images)
    └── /icons/             (SVG icons)
```

### Performance Budget
- **Initial load**: <50KB (HTML + critical CSS)
- **Total page weight**: <200KB (including images)
- **JavaScript**: <10KB (uncompressed)
- **Images**: WebP format, <100KB each, lazy loaded

## Development Principles

### Mobile-First Approach
1. Design for 375px width first (iPhone SE)
2. Test on real devices, not just browser resize
3. Touch targets: minimum 44x44px
4. Tap-to-call phone numbers everywhere
5. Avoid horizontal scrolling at all costs

### Conversion Optimization
- **One primary CTA per section** (no competing buttons)
- **Above-the-fold clarity**: What you do, why you're different, how to contact
- **Friction reduction**: Minimal form fields, autofill enabled, inline validation
- **Trust signals**: Real client logos, Trustpilot, case study metrics

### Accessibility Requirements
- Semantic HTML (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`)
- ARIA labels where needed (but prefer semantic HTML)
- Color contrast: 4.5:1 minimum for text
- Focus indicators on all interactive elements
- Keyboard navigation support
- Alt text on all images

### Code Quality Standards
- **Readable**: Clear naming, comments for complex logic
- **Maintainable**: DRY principles, reusable components
- **Performant**: Minimal reflows, efficient selectors
- **Valid**: Passes W3C HTML/CSS validators

## Safety Rules (Critical)

### Never Break Production
- Test changes locally before deploying
- Keep backups of working files
- Use git commits with clear messages
- Avoid large refactors without approval

### When Uncertain
1. **Propose a plan** before executing
2. **Surface tradeoffs** and risks early
3. **Ask for clarification** rather than assume
4. **Provide options** when multiple approaches exist

### Risk Assessment
Before making changes, ask:
- Could this break mobile layout?
- Does this affect existing functionality?
- Will this impact performance?
- Is this reversible?

If any answer is "maybe" or "yes" → **get approval first**

## Workflow Process

### 1. Plan Phase
- Review the request against BRAND-v2.md and plans-v2.md
- Identify affected files and components
- List potential risks or tradeoffs
- Propose approach: "I'll update X by doing Y, which affects Z"

### 2. Execute Phase
- Make minimal, focused changes
- Use tokens.css variables exclusively
- Test mobile-first, then desktop
- Verify accessibility (focus states, contrast, semantics)

### 3. Verify Phase
- Check file size impact
- Validate HTML/CSS
- Test in multiple viewports
- Confirm CTAs are clear and clickable

### 4. Summarize Phase
Provide a concise summary:
```
Files changed:
- index.html: Added hero CTA section
- components.css: Created .btn-primary style
- tokens.css: Added --color-accent-hover

Changes:
- Hero CTA now uses accent color with hover state
- Button size increased to 48px height (mobile tap target)
- Added focus ring for accessibility

Trade-offs:
- Slightly increased CSS by 200 bytes
- None — all changes are reversible
```

## Component Library Guidelines

### Buttons
```css
.btn-primary {
  background: var(--color-accent);
  color: white;
  padding: var(--space-md) var(--space-xl);
  border-radius: var(--radius-md);
  font-weight: 600;
  transition: background 150ms ease;
}
```

### Cards
```css
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  box-shadow: var(--shadow-sm);
}
```

### Forms
```css
.input {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  font-size: 16px; /* Prevents iOS zoom */
  width: 100%;
}
```

## Content Strategy

### Messaging Hierarchy
Every page should follow this structure:
1. **Headline**: What you do (8 words max)
2. **Subhead**: Why you're different (15 words max)
3. **Proof**: Case study, metric, or testimonial
4. **CTA**: One clear next step

### Copywriting Rules
- Use short sentences (10-15 words)
- Avoid marketing jargon ("synergy", "leverage", "cutting-edge")
- Lead with benefits, not features
- Use active voice, present tense
- Address the reader as "you"

### AI Integration Messaging
Position AI as **premium add-on** and **future-proofing**:
- "Your site shows up in AI search results"
- "Automated tools work while you sleep"
- "Built for tomorrow's search landscape"

Never say: "AI-powered" without explaining the actual benefit.

## Common Tasks & Patterns

### Adding a New Page
1. Copy existing page structure (header, nav, footer)
2. Use semantic HTML (`<main>`, `<section>`)
3. Add page-specific content
4. Include one primary CTA
5. Test mobile layout first

### Creating a Component
1. Add styles to components.css
2. Use token variables exclusively
3. Include hover, focus, and active states
4. Test in multiple contexts
5. Document usage in comments

### Updating Forms
1. Keep fields minimal (name, email, phone max)
2. Use Formspree for backend (already set up)
3. Add inline validation
4. Include clear error messages
5. Mobile-friendly tap targets

## Definition of Done Checklist

Before marking any task complete, verify:

- [ ] Uses tokens.css variables (no hardcoded values)
- [ ] Mobile-first layout tested (375px+)
- [ ] Accessible (semantic HTML, focus states, contrast)
- [ ] CTA hierarchy is clear (one primary per section)
- [ ] Performance impact minimal (<5KB added)
- [ ] No new dependencies introduced
- [ ] Code is readable and maintainable
- [ ] Changes are reversible
- [ ] Git commit with clear message
- [ ] Summary provided

## Communication Style

### Keep It Concise
- **Plan**: "I'll update the hero section by adding a CTA button below the headline."
- **Execute**: [Make the changes]
- **Summarize**: "Added CTA button to hero. Uses accent color, mobile-optimized."

### Surface Issues Early
- "This change could affect mobile nav. Should I proceed?"
- "Two approaches: A) Simple but less flexible, B) Complex but reusable. Which?"
- "This will add 3KB. Still within budget, but wanted to flag it."

### Avoid Over-Explaining
- Don't justify every decision
- Don't repeat the request back
- Don't apologize for asking clarifying questions

## Quick Reference

### Need to...
- **Add color?** → Use token from tokens.css or add new token
- **Adjust spacing?** → Use --space-* variables
- **Style text?** → Use --font-* and predefined sizes
- **Make responsive?** → Mobile-first, then scale up
- **Optimize performance?** → Check file sizes, lazy load images
- **Ensure accessibility?** → Semantic HTML, focus states, contrast

### Red Flags (Stop and Ask)
- Hardcoded hex colors
- Inline styles (style="" attribute)
- New dependencies or frameworks
- Large file size increases (>10KB)
- Breaking changes to existing pages
- Requests that conflict with brand guidelines

## Resources
- BRAND-v2.md: Design system and visual identity
- plans-v2.md: Product roadmap and priorities
- sitemap-v2.md: Page structure and content hierarchy

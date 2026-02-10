# JD Media Brand Guide v2.0

## Positioning
JD Media is a **Digital Caretaker** for local service businesses. We build calm, premium, technically excellent websites that show up in AI search and work while you sleep. The brand energy is Clay.global meets durable.com: minimalist, credible, quietly sophisticated.

## Core Message
"We help local service businesses show up everywhere — Google, AI search, and customer screens — with websites that generate calls on autopilot."

## Voice & Tone
- **Calm & confident**: No hype, no urgency tricks. Just solid technical work.
- **Caretaker mindset**: Helpful, protective, invested in client success.
- **Quietly technical**: Sophisticated without being intimidating. 
- **Credibility-first**: Let the work speak. Use real metrics, real case studies.

## Visual Identity

### Color Palette (Light Mode)
```css
/* Base */
--color-bg: #FAFAFA;              /* Soft off-white background */
--color-surface: #FFFFFF;          /* Pure white cards/surfaces */
--color-text: #1A1A1A;            /* Near-black primary text */
--color-text-secondary: #6B6B6B;  /* Medium gray secondary text */
--color-text-muted: #A3A3A3;      /* Light gray muted text */
--color-border: #E5E5E5;          /* Subtle borders */

/* Accent Colors */
--color-accent: #0D9488;          /* Warm teal (calm, grounded, credible) */
--color-accent-hover: #0F766E;    /* Darker teal on hover */
--color-accent-light: #CCFBF1;    /* Light teal backgrounds */
--color-success: #10B981;         /* Green for trust signals */
--color-success-light: #D1FAE5;   /* Light green backgrounds */

/* Utility */
--color-overlay: rgba(0, 0, 0, 0.5);
--color-shadow: rgba(0, 0, 0, 0.08);
```

### Typography
**Primary Font Stack**: Inter  
- Used for: UI elements, body text, navigation, forms
- Weights: 400 (regular), 500 (medium), 600 (semibold)

**Display Font Stack**: DM Sans  
- Used for: Headlines, hero text, section titles
- Weights: 500 (medium), 700 (bold)

**Base Size**: 16px  
**Line Height**: 1.6 for body, 1.2 for headings  
**Letter Spacing**: -0.02em for headings, normal for body

### Spacing Scale (8px base)
```css
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
--space-2xl: 48px;
--space-3xl: 64px;
--space-4xl: 96px;
```

### Border Radius
```css
--radius-sm: 4px;   /* Small elements, badges */
--radius-md: 8px;   /* Buttons, inputs */
--radius-lg: 12px;  /* Cards, containers */
--radius-xl: 16px;  /* Hero sections, large cards */
```

### Shadows
```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.08);
```

## Component Principles

### Buttons
- **Primary**: Accent teal, medium padding, subtle shadow
- **Secondary**: White background, border, text accent color
- **Ghost**: No background, text accent color, no border
- All buttons: Clear focus ring, smooth transitions, accessible contrast

### Cards
- White surface on off-white background
- Subtle border or light shadow (never both)
- Generous internal padding (32px+)
- Hover state: slight shadow increase, no color change

### Forms
- High contrast labels (text primary color)
- Clean inputs with subtle borders
- Focus state: accent color border, no glow
- Inline validation: success green, error red (accessible)

### Trust Signals
- Client logos: Grayscale by default, color on hover
- Testimonials: Real names, real photos, real quotes
- Metrics: Large numbers, small descriptors, clean layout
- Trustpilot: Integrated widget, not just a badge

## Usage Rules

### DO:
- Use whitespace generously — let the content breathe
- Maintain high contrast for accessibility (4.5:1 minimum)
- Use real metrics, real case studies, real client names
- Keep CTAs clear and singular per section
- Use subtle motion (100-200ms transitions)
- Optimize for mobile first, then scale up

### DON'T:
- Use gradients, drop shadows, or visual noise
- Stack multiple CTAs competing for attention
- Use stock photos or fake testimonials
- Add decorative elements without purpose
- Use aggressive marketing language or false urgency
- Break the token system for one-off styling

## Inspirational References
- **Clay.global**: Minimalist precision, technical confidence
- **durable.com**: Clean service positioning, clear hierarchy
- **ChatGPT UI**: Conversational, approachable, modern

## Content Principles

### Messaging Hierarchy
1. **What we do**: Build websites that generate calls
2. **How we're different**: AI integration, technical excellence, caretaker approach
3. **Proof**: Real case studies, real metrics, real results
4. **Next step**: One clear CTA per page section

### Copywriting Style
- Short sentences. Clear value. No fluff.
- Use "we" and "you" — conversational but professional
- Lead with benefits, follow with features
- Avoid jargon unless explaining technical differentiation
- Use active voice, present tense

### AI Integration Positioning
Frame AI as a **premium capability**, not the core service:
- "Your site shows up in ChatGPT, Perplexity, and AI search"
- "AI-powered tools work while you sleep — SEO monitoring, lead notifications, content suggestions"
- "We build for tomorrow's search landscape, not just Google"

Position as: **Future-proofing + automation**, not gimmick.

## Accessibility Standards
- WCAG 2.1 AA compliance minimum
- Color contrast ratios: 4.5:1 text, 3:1 UI elements
- Focus indicators on all interactive elements
- Semantic HTML structure
- Alt text on all images
- Form labels and error states

## Performance Targets
- Initial load: <50KB (HTML/CSS/critical JS)
- First Contentful Paint: <1.5s
- Time to Interactive: <3s
- Lighthouse score: 90+ across all categories
- Mobile-first approach, progressive enhancement

## File Organization
```
/styles/
  ├── tokens.css        (Design system variables)
  ├── base.css          (Resets, typography, global styles)
  ├── components.css    (Buttons, cards, forms, badges)
  └── utilities.css     (Layout helpers, spacing utils)
```

## Brand Checklist (Use This for Every Page)
- [ ] Uses tokens.css variables exclusively
- [ ] Mobile-first responsive layout
- [ ] High contrast, accessible text
- [ ] One clear CTA per section
- [ ] Real metrics or case studies (no fake content)
- [ ] Fast load time (<50KB critical path)
- [ ] Semantic HTML structure
- [ ] Focus states on all interactive elements

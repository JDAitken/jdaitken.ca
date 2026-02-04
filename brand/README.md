# JD Media Brand Kit

## What’s inside
- `guidelines/brand-guidelines.md`: Usage rules, palette, typography, accessibility, and export checklist.
- Token exports removed; CSS source of truth is now `styles/tokens.css`.
- `logo/svg`, `logo/png`, `logo/webp`: Place logo assets (mark-only) per naming conventions.
- `social`: For social avatars/preview exports.
- `favicon`: For favicon and touch icons.

## Using tokens in site CSS
- Import `/styles/tokens.css` and use the CSS variables, e.g.:
  ```css
  body {
    background: var(--color-bg);
    color: var(--color-text);
    font-size: var(--type-base);
  }
  .card {
    padding: var(--space-16);
    border-radius: var(--radius-10);
    border: 1px solid var(--color-border);
  }
  ```
- JSON tokens mirror the same values for build tools or JS consumption.

## Source of truth
- Color, type, spacing, and radius values in `/styles/tokens.css` are the single source of truth.
- Logo exports should follow the naming in `logo/*/README.md`.

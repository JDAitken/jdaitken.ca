# JD Media Brand Guide — v3.0

**Positioning:** JD Media builds and runs the websites Ottawa trades businesses get their calls from. One specialist who does the work himself — pro-grade sites, plain answers, results measured in calls and quote requests. And when you're ready to decide, a guarantee stands behind all of it.

**"Calls" vs "leads":** "Calls" is the flagship brand word — concrete, trades-native, and it's the identity ("the guy who gets me calls"). But results include form fills, so supporting copy says "calls and quote requests." "Leads" is fine in client-facing copy now (2026-07 call) — the old "never say 'leads'" rule is retired; it's just no longer the *only* word used to describe results.

**Internal shorthand:** *Pro-grade gear for getting calls.* A Milwaukee tool presented with Stripe's restraint.

**Tagline:** *Websites that get you more calls.* — full stop. "Guaranteed" is no longer part of the tagline; the guarantee is the closer, not the opener.

Retired: "Digital Caretaker" (v2 positioning). Caretaking promises upkeep; the brand promises outcomes.

---

## Voice

Calm expert. The guarantee is what lets the voice stay quiet — hype shops shout the promise; JD states it and proves it.

- Short declarative sentences. Specific numbers over adjectives.
- No exclamation marks, no urgency mechanics (countdowns, "NOW", scarcity).
- No agency jargon: never "solutions", "leverage", "grow your digital presence".
- First person singular where natural: "I build it. You talk to me." Solo presence is honest but understated — competence leads, biography follows.
- The guarantee appears once per page, at the decision point (right before the CTA), stated with plain terms: what's guaranteed, what happens if it's not met. Never in the hero.
- Real metrics only. Green is reserved for numbers that are true.

## Color

Navy leads. Red is rationed. Green is proof.

| Token | Value | Role |
|---|---|---|
| `--color-bg` | `#f7f6f3` | Page background |
| `--color-surface` | `#FFFFFF` | Cards, containers |
| `--color-text` | `#1B3A5F` | Navy — dominant brand color: text, headlines, dark bands, secondary buttons |
| `--color-accent` | `#C9403A` | Signal red — one primary CTA per screen, nothing else (4.9:1 with white) |
| `--color-accent-hover` | `#B0342F` | Red hover |
| `--color-accent-text` | `#A5322B` | Red for inline text links |
| `--color-accent-light` | `#F8E5E3` | Focus rings **only** — never decorative backgrounds |
| `--color-success` | `#10B981` | Real metrics and proof only |
| `--color-text-on-navy` | `rgba(255,255,255,0.72)` | Body text on navy bands (AA-safe) |

Rules:
- **One red primary CTA per screen.** Everything else is navy.
- No tinted section backgrounds. No gradients. No glows.
- v2 coral (`#FF6B6B`) is retired.

## Typography

| Role | Face | Weights |
|---|---|---|
| Headlines (`--font-display`) | **Barlow** | 500 / 600 / 700 |
| Body (`--font-ui`) | **Inter** | 400 / 500 / 600 |

- Barlow has industrial/signage DNA — the pro-gear register. DM Sans (v2) is retired.
- Headlines: tight tracking (`--tracking-tight`), fewer and bigger words. Hero copy gets shorter, not louder.
- Kicker labels: uppercase Barlow, `--text-xs`, semibold, `--tracking-wider` (0.08em). Used for section eyebrows and stat labels.
- Google Fonts URL: `family=Barlow:wght@500;600;700&family=Inter:wght@400;500;600`

## UI Kit

**Buttons** — squared (4px radius, `--radius-sm`), machined, no shadows or glows, no arrow garnish.
- `.btn-primary`: signal red, white text. One per screen.
- `.btn-secondary`: transparent, 1.5px navy outline; fills navy on hover.
- `.btn-ghost`: navy text, quiet background hover.

**Cards** — border-led, not shadow-led. White surface, 1px `--color-border`, 8px radius (`--card-radius`), flat at rest, subtle shadow on hover only.

**Proof cards (`.proof-card`)** — the signature component. Spec-sheet instrumentation: big navy number in Barlow, uppercase kicker label, optional green delta. Real metrics only, never decoration.

**Badges** — `.badge-accent` is now a solid navy chip with white text (spec-label look). No coral tints.

**Inputs** — 4px radius, red border + light-red ring on focus (functional accent use, allowed).

**Modals** — the one radius exception: 16px (`--radius-xl`). Overlays float, so the softer corner is deliberate.

**Guarantee icon** — 4px-radius red square with a white checkmark, everywhere it appears. Never a circle.

**Stars** — always gold `#F5A623`. Checkmark lists use `--color-success-dark`. Neither is ever red.

**CTA standard** — every button that opens the audit modal says **"Get My Free Site Audit"**, on every page, no variants. Contact/landing message forms say "Send Message". The action keeps its name through the whole flow.

**Logo** — wordmark set in Barlow Bold: "jd" in signal red, "media" in navy. Favicons are the Barlow "j" in white on a signal-red square. Sources regenerate from `images/logos/jd-media-logo.svg`.

**Spacing** — 8px scale, unchanged. Generous vertical space between sections (`--space-4xl`+ on desktop): whitespace is how calm reads visually.

**Quality floor** — mobile-first, WCAG 2.1 AA contrast, visible keyboard focus, Lighthouse 90+.

---

## Files

- Tokens: `styles/tokens-v2.css` (v3.0 values; v2 values preserved in comments)
- Components: `styles/components-v2.css`
- Chat knowledge base (keep positioning in sync): `api/jdmedia_knowledge.txt`
- AI-search summary (keep positioning in sync): `llms.txt`

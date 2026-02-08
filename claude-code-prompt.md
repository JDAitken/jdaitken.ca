# Claude Code Directive: jdaitken.ca Revamp

> Read this entire document before writing or modifying any code. Do not begin implementation until you have confirmed you understand all sections. Ask me to clarify anything ambiguous.

---

## Context

This is **jdaitken.ca**, the portfolio and business site for **JD Media** — a web design agency serving local service businesses in the Ottawa area. The stack is **Astro + Tailwind CSS**. The brand palette is **navy and coral**. The tagline is **"Web Design for Growing Businesses."**

I am shifting from a one-time project pricing model to a **monthly subscription model**. This revamp touches the homepage, the pricing page, and several structural/copy improvements across the site. Do not redesign the visual identity — keep the existing look, feel, and layout patterns. This is a **content, copy, and conversion optimization pass**, not a visual rebrand.

---

## Changes Required

### 1. Homepage — "What you get" section: Rewrite for outcomes, not features

The current copy reads like a spec sheet. Rewrite each card so the **headline is the business outcome** and the description supports it with what we actually do. Keep the same 4-card layout.

**Current → New:**

| Current Headline | New Headline | New Description |
|---|---|---|
| 5 pages that sell | Every page built to book appointments | Home, Services, About, Service Areas, and Contact — structured so visitors take action, not just browse. |
| Fast + mobile-first | Loads fast on every phone | Homeowners searching "furnace repair near me" at midnight are on their phone. Your site loads in under 2 seconds with tap-to-call on every page. |
| Local SEO basics | Show up when locals search for you | On-page SEO tuned for Ottawa and surrounding areas so you appear in the searches that actually lead to booked jobs. |
| Clear calls to action | Turn visitors into phone calls | Click-to-call buttons, quote request forms, and trust signals positioned where they drive the most conversions. |

### 2. Homepage — Add a social proof / portfolio preview section

Add a new section **between "What you get" and the audit CTA**. This section should:

- Have a heading like **"Recent Work"** or **"Sites we've built"**
- Display 2–3 screenshot thumbnails of portfolio sites (use placeholder images for now — I will replace with real screenshots later)
- Each thumbnail should link to `/portfolio`
- Include a short caption under each (e.g., "Landscaping contractor — Ottawa", "Sports card e-commerce", "HVAC contractor — demo")
- Add a "See all work →" link to `/portfolio` below the thumbnails
- Keep the design consistent with the existing section styling (same padding, typography scale, navy/coral palette)

### 3. Homepage — Consolidate the form / CTA duplication

Currently there is a CTA button linking to `/contact.html` AND an inline form on the homepage. **Remove the inline form from the homepage entirely.** Keep only the CTA buttons that link to `/contact.html`. This reduces clutter and gives the contact page a clear purpose.

Update all CTA button instances on the homepage to point to `/contact.html` with consistent copy: **"Get My Free Website Audit"**

### 4. Homepage — Add tagline near logo in nav

In the top navigation bar, add a small tagline or descriptor next to or below the "JD Media" logo/wordmark. Something like:

```
JD Media
Ottawa Web Design
```

Use a smaller, lighter-weight font treatment so it doesn't compete with the logo. This helps visitors from Google instantly confirm they're in the right place geographically.

### 5. Pricing Page — Full rewrite to subscription model

Replace the current pricing page content with a new **monthly subscription pricing structure**. The page should communicate: "You don't pay thousands upfront. You get a professionally managed website for a flat monthly fee."

**Page headline:** "Simple, predictable pricing."
**Subheadline:** "No big upfront costs. Your website, hosting, and support — all in one monthly plan."

**Three tiers displayed as cards side by side (responsive to stacked on mobile):**

---

#### Starter — $175/mo
_Best for: businesses that need a professional online presence_

- Custom 5-page website (Home, About, Services, Service Areas, Contact)
- Mobile-first, fast-loading design
- Hosting & SSL included
- Basic on-page SEO setup
- 1 content update per month (text or image swap)
- "Built by JD Media" footer credit

---

#### Growth — $275/mo ⭐ Most Popular
_Best for: businesses ready to generate more leads online_

Everything in Starter, plus:
- Conversion-optimized layout with A/B tested CTAs
- Monthly content update (up to 2 requests)
- Google Business Profile optimization guidance
- Monthly performance snapshot (traffic + form submissions)
- Priority response time (within 1 business day)

---

#### Pro — $375/mo
_Best for: businesses that want a fully managed online presence_

Everything in Growth, plus:
- Ongoing local SEO (monthly keyword + content recommendations)
- Up to 4 content updates per month
- Quarterly strategy call (15 min) to review performance and plan ahead
- Priority support (same-day response)

---

**Below the pricing cards, add a section with these key details:**

**How it works:**
1. We start with a free website audit to understand your business and goals
2. Your site is designed, built, and launched within 2 weeks
3. You pay a simple monthly fee — no surprise invoices, no hidden costs

**Terms to display clearly (not hidden in fine print):**
- 12-month minimum commitment
- You can cancel anytime after 12 months with 30 days notice
- JD Media owns and hosts the site — if you cancel, the site comes down
- Want to buy your site outright instead? Contact us for a one-time project quote

**FAQ section at the bottom (collapsible/accordion preferred):**

- **What if I already have a website?** → We'll rebuild it from scratch on our platform. Your current site stays live until the new one is ready.
- **What counts as a "content update"?** → Swapping photos, updating text, adding a new service, adjusting hours — anything that doesn't require building new pages or features.
- **Do I own the website?** → The subscription includes the website as a managed service. JD Media hosts and maintains it. If you cancel after your commitment, the site is taken down. If you'd like to own your site outright, ask us about a one-time project quote.
- **Can I upgrade or downgrade my plan?** → Yes, you can change plans at any time with 30 days notice.
- **What happens after the 12-month commitment?** → Your plan continues month-to-month. You can cancel anytime with 30 days notice.

### 6. Footer — Update copyright year

Change the footer copyright to:
```
© 2025 JD Media — Web Solutions for Local Service Businesses
```
If it already says 2025, leave it. If the year is dynamically generated, make sure it reflects the current year.

---

## Implementation Rules

1. **Do not change the visual design language.** Keep existing colors, fonts, spacing patterns, and component styles. You are updating content and structure, not redesigning.
2. **Mobile-first.** Every change must look great on mobile before desktop. Test all pricing cards, the portfolio preview section, and the FAQ accordion at 375px width.
3. **Keep the Astro + Tailwind stack.** No new frameworks, no new dependencies unless absolutely necessary (e.g., an accordion component). If you need an accordion for the FAQ, build it with vanilla JS or Astro's built-in capabilities — do not install a UI library.
4. **Placeholder images for portfolio screenshots.** Use a neutral gray box with text overlay (e.g., "Landscaping Site — Screenshot Coming Soon") until I provide real assets. Make sure the image containers have a fixed aspect ratio (16:9) so they don't break when I swap in real images.
5. **Semantic HTML.** Use proper heading hierarchy, `<section>` elements, alt text on all images, and accessible accordion patterns (proper `aria-expanded`, keyboard navigation).
6. **Commit messages.** Make atomic commits with clear messages describing what changed and why.

---

## Order of Operations

1. Homepage: Rewrite "What you get" copy (outcome-driven)
2. Homepage: Remove inline form, consolidate CTAs to `/contact.html`
3. Homepage: Add nav tagline ("Ottawa Web Design")
4. Homepage: Add portfolio preview section with placeholder thumbnails
5. Pricing page: Full rewrite with subscription tiers, how-it-works, terms, and FAQ
6. Review all pages for consistency — check that CTAs, nav, footer, and spacing are uniform
7. Test mobile responsiveness across all changed pages
8. Final commit and summary of all changes made

---

## When in doubt

- Prioritize clarity over cleverness in copy
- Prioritize mobile over desktop in layout decisions
- Ask me before making assumptions — especially about pricing details or terms
- Do not add features, pages, or sections I haven't asked for

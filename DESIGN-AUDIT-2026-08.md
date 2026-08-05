# jdaitken.ca — Design & UI/UX Audit
**Date:** 2026-08-03 · **Scope:** all 12 brand pages (`/arlene/` excluded — noindex personal app, not part of the brand system) · **Method:** code review against `brand/BRAND-GUIDE.md` v3.0 + full-page Puppeteer screenshots at 1440×900 and 390×844 for every page, plus the mobile nav and audit modal open states.

---

## Verdict

The system fundamentals are sound: token architecture is clean, contrast choices are deliberate and documented, the CTA-trigger copy ("Get My Free Site Audit") is 100% consistent across every page, and there isn't a single console error anywhere in the 12-page sweep. The site is honest — every "17 quote requests" and "$42/lead" number traces back to a real client. Where it leaks is in the gap between the *written* brand guide and what actually shipped: red — meant to be rationed to one CTA per screen — has quietly spread into featured-card borders, a comparison-table header, and a stat pill, because an older comment in the tokens file ("one primary CTA per screen **+ key numbers**") never got reconciled with the stricter BRAND-GUIDE.md v3.0 rule ("nothing else"). Six files also carry a hardcoded hex color the project's own hard rule forbids, and the case-study screenshots had no reserved space, so they visibly pop in low on the page instead of loading in place.

None of this is severe. Nothing found here would stop a visitor from calling. But a site whose entire pitch is "I do this properly for you" should not have its own inline CSS quietly disagreeing with its own brand guide.

---

## Findings

| # | Finding | Priority | Type | Status |
|---|---|---|---|---|
| 1 | Hardcoded `#f0f2f5` background on `.modal-input` in 6 files, violating the project's "never hardcode colors" hard rule | P1 | Clear win | **Fixed** |
| 2 | Case-study images (`index.html`, `work/`, `work/legendary-landscaping/`, `ottawa-web-design/`, `lp/`) had no `width`/`height`, so no space was reserved — images visibly popped in after layout, and it's a real (if small) CLS hit | P1 | Clear win | **Fixed** |
| 3 | `/hi/index.html` had a decorative 4px red top border with no CTA function — a direct "no glows, nothing but the one CTA" violation | P2 | Clear win | **Fixed** |
| 4 | Pricing page's `.compare-table thead th:nth-child(2)` used red for the "JD Media" column header — decorative, not a CTA | P2 | Clear win | **Fixed** |
| 5 | Privacy page's `.legal-body a` used `--color-accent` (the button/CTA red) instead of `--color-accent-text`, the token BRAND-GUIDE.md explicitly designates for inline text links | P2 | Clear win | **Fixed** |
| 6 | `CLAUDE.md` documented `process/index.html` as live (only exists in `_archive/`), `js/chat.js` and `api/chat.php` as active (chat.php was disabled in commit `bac6bf7`, chat.js is loaded nowhere), and was missing 5 live pages (`ottawa-web-design`, `lp`, `blog`, `privacy`, the case-study detail page) from its page-structure list | P2 | Clear win | **Fixed** |
| 7 | **Red used as decorative "featured/win" emphasis in 3 places**: `.timeline-card.featured` border (about), `.pricing-card.featured` border (pricing), and the June-vs-July ad-cost comparison card border (legendary-landscaping case study) — plus red timeline dots on the two "ad ran" months on the same case-study page | P1 | **Judgment call** | Reported, not fixed |
| 8 | `/lp/`'s "0 → 17" stat pill colors the `17` red (`.lp-proof-num.is-accent`) — same root cause as #7 | P2 | **Judgment call** | Reported, not fixed |
| 9 | **Root cause of #7/#8**: `tokens-v2.css` line 18 comments "signal red — one primary CTA per screen **+ key numbers**"; `BRAND-GUIDE.md` v3.0 says "one primary CTA per screen, **nothing else**." The two source-of-truth docs disagree, and builders have been following the older, looser one | P0 | **Judgment call — needs a decision** | Reported, not fixed |
| 10 | About page's guarantee ("90 days, or your money back") sits in a mid-page 2×2 feature-card grid, not at the decision point right before a CTA, as BRAND-GUIDE.md specifies | P2 | **Judgment call** | Reported, not fixed |
| 11 | The audit modal's own submit button says **"Get in Touch"**; every trigger button that opens it says **"Get My Free Site Audit"** — the CTA's wording changes mid-flow | P1 | **Judgment call** | Reported, not fixed |
| 12 | `js/chat.js` (174 lines) is dead code — loaded by no page, backing endpoint disabled. `api/contact.php` and `api/audit.php` are also unreferenced; every live form now posts to Formspree | P2 | Recommendation only | Not fixed — see "Not doing" |

---

## Per-page notes

**Home (`/`)** — Strong. Hero → proof → process → reviews → guarantee → CTA is a clean, well-paced funnel and it's the one page that gets the guarantee placement exactly right (navy band, right before the final CTA, nowhere else). Only issue: shared with #2 (case-study images).

**About (`/about/`)** — Good narrative voice ("Not an agency. Not a template."). Two issues specific to this page: #7 (red-bordered featured timeline card) and #10 (guarantee placement).

**Pricing (`/pricing/`)** — The comparison table is a genuinely good conversion asset. Fixed #4 and shares #1, #7.

**Work (`/work/`)** — Three real case studies, real quotes, real numbers. This page was the clearest example of #2 — the J&J thumbnail intermittently failed to render in the full-page capture because it has no reserved space; fixed.

**Legendary Landscaping case study (`/work/legendary-landscaping/`)** — The best page on the site: a month-by-month narrative with real Google Ads numbers and a verified Clutch quote. Also the page with the most instances of #7 (featured comparison card + timeline dots).

**Ottawa Web Design (`/ottawa-web-design/`)** — Near-clone of the homepage funnel for a different search intent; fine. Shares #2.

**Landing page (`/lp/`)** — Paid-traffic page, no nav, form front-and-center — correct pattern for ad traffic. Has #8 (red stat pill) and shares #2.

**Contact (`/contact/`)** — Clean, brand-compliant, no findings.

**`/hi/`** — Bespoke outreach landing page, intentionally has no site nav (so `main.js` not loading here is by design, not a bug — confirmed, not flagged). Had #3, now fixed.

**Thanks (`/thanks/`)** — Clean, minimal, correct.

**Privacy (`/privacy/`)** — Well-written, plain-language, genuinely useful (names Formspree/GA4/Meta Pixel by name with opt-out links). Had #5, now fixed.

**Blog post** — Solid long-form piece with real, specific numbers (J&J's ranking result cited by name). No visual findings; the "content jargon" bar is met.

---

## Cross-cutting

**Inline CSS is 2.7x the shared system.** `styles/tokens-v2.css` + `base-v2.css` + `components-v2.css` total ~880 lines; the 12 in-scope pages carry roughly 2,370 lines of per-page inline `<style>` between them (index.html alone has 810). `components-v2.css` stops at reviews — **there is no shared header, footer, hero, modal, or FAQ component** — each page reimplements them. This is exactly why the same defect (#1, #2, #7) appears in near-identical form across multiple files instead of in one place: there's no single component to fix once. Not remediated here — a real refactor with real regression risk, out of scope for an audit. Flagged for a separate, scoped job if you want it.

**CTA-trigger discipline is genuinely good.** Every one of the ~15 buttons that open the audit modal, across all 12 pages, says exactly "Get My Free Site Audit" — zero variants. That's the one brand rule that's been perfectly held. #11 is the one place the wording drifts, on the *inside* of the modal rather than the trigger.

---

## Not doing, and why

- **Consolidating the inline CSS into shared components.** Real value, real risk — 2,370 lines across 12 files, no regression safety net beyond manual screenshot diffing. This is a scoped project, not an audit fix.
- **Deleting `js/chat.js`, `api/chat.php`, `api/contact.php`, `api/audit.php`, `api/jdmedia_knowledge.txt`.** All confirmed dead/unreferenced. Left in place per the project's "never delete code" rule; `CLAUDE.md` now correctly documents them as dead rather than live so nobody edits them believing they're wired up.
- **#7–#11.** These all require a design or copy decision, not a mechanical correction — see below.

---

## Judgment calls awaiting your decision

1. **Is red allowed for "key numbers," or only the one CTA?** (#7, #8, #9) — the CSS comment and the written brand guide disagree. Pick one:
   - **Formalize the carve-out** — update BRAND-GUIDE.md to say "one primary CTA per screen + key numbers/deltas," matching what's already shipped in 3+ places. Lowest-risk, zero code change.
   - **Enforce "nothing else" literally** — strip red from the featured-card borders, timeline dots, and the `/lp/` stat pill; replace emphasis with navy border-weight or a badge instead. More code, more consistent with the current guide's stated intent.
2. **Guarantee placement on `/about/`** (#10) — move the "90 days, or your money back" card down next to the final "Let's work together" CTA (matching Home's pattern), or leave it in the mid-page feature grid where it currently doubles as a benefit bullet?
3. **Modal submit-button copy** (#11) — change "Get in Touch" to "Get My Free Site Audit" for full consistency, or is a distinct submit-button label intentional/fine since it's inside the flow the trigger already named?

---

## Verification performed

- All 12 pages served via `php -S localhost:8080`, zero console errors before or after fixes.
- Every touched page (`index.html`, `about/`, `pricing/`, `work/`, `work/legendary-landscaping/`, `ottawa-web-design/`, `lp/`, `hi/`, `privacy/`) re-captured at 1440×900 and 390×844 post-fix and compared against pre-fix captures — no unintended visual change.
- Case-study images confirmed loading correctly and in-place after the `width`/`height` fix, across desktop and mobile.
- `grep` sweep confirmed zero remaining `#f0f2f5`, zero remaining coral (`#FF6B6B`) or DM Sans references in any in-scope file, and zero CTA-trigger wording variants.

## Files changed

`CLAUDE.md`, `index.html`, `about/index.html`, `pricing/index.html`, `work/index.html`, `work/legendary-landscaping/index.html`, `ottawa-web-design/index.html`, `lp/index.html`, `hi/index.html`, `privacy/index.html`

Nothing has been deployed. Review the diff, then `git push origin main` when ready — GitHub Actions handles the rest.

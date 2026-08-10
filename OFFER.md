# JD Media — Offer (source of truth)

This is the canonical definition of JD Media's offer and pricing. Every other place pricing
appears is *derived* from this file and must be kept in sync with it:

- `pricing/index.html` — the live pricing page
- `api/jdmedia_knowledge.txt` — chat widget knowledge base
- `llms.txt` — AI-search summary (brand guide: "keep positioning in sync")
- `ops/content/clients/jdmedia/business-context.md` — content-generation source facts
- `about/index.html` — mentions the guarantee, not full pricing; spot-check if the guarantee wording changes

When pricing, tiers, or terms change, update this file first, then propagate to the four above.

---

## Positioning

JD Media builds and runs the websites Ottawa trades businesses get their calls from. One
specialist who does the work himself — pro-grade sites, plain answers, results measured in calls
and quote requests. And when you're ready to decide, a guarantee stands behind all of it.

Tagline: *"Websites that get you more calls."*

ICP: Ottawa trades and local service business owners who need a professional web presence and
want Google to send them customers — not a DIY platform, not a big agency retainer.

---

## The offer: two featured tiers, plus a caretaker floor

Two tiers, not three, on the main pricing cards. Both include the full marketing engine (site +
SEO + GBP) so both can honestly stand behind the guarantee. There is no website-only featured
tier — see "Off-menu" below for that case. A third, quiet Caretaker tier exists below the cards
as the floor for clients pausing active marketing — see that section.

### Growth — $500/month — *entry tier, featured*

**Best for:** You want Google to send you customers without paying for ads. I build and run
everything — the site, the rankings, the profile — so you don't have to think about it.

Includes:
- Custom 5-page website built for your business (not a template)
- Mobile-first, fast-loading — that's where your customers are searching
- Hosting, SSL, and your domain managed for you
- Set up so Google can find and index your site
- Layout built to make visitors call you, not just look around and leave
- Your Google Business Profile managed monthly (this is what gets you in the map results)
- Monthly SEO content targeting searches your customers are actually making
- Simple monthly report showing how many people found you and called you
- Up to 3 updates per month
- I respond within 1 business day

Value anchor: a custom build like this runs $2,000+ as a one-time project elsewhere. Setup fee:
see "Setup fee" below — waived, not $0, and tied to the 12-month term.

### Pro — $900/month — *anchor tier*

**Best for:** You answer the phone and run jobs. I run everything that gets you customers
online — including paid ads. You don't touch any of it.

Includes:
- Everything in Growth
- Google Ads managed for you (you pay Google directly for ad spend; I manage everything else)
- Pause your ads anytime — no penalty, no hassle
- Quarterly 15-minute call to review what's working and what's next
- Same-day response on any request or question
- Priority on everything

### Caretaker — $75/month — *floor tier, not featured on pricing cards*

**Best for:** Existing clients pausing active marketing for the off-season, or anyone who just
needs the site to stay live and safe with no active growth work. Not sold cold — this is the
retention/win-back option offered when a Growth or Pro client is about to cancel outright, and
the off-season half of the Seasonality section below for anyone who'd rather step all the way
down than stay flat.

Includes:
- Hosting, SSL, and domain kept live
- Security updates and backups
- Google Business Profile stays claimed and monitored
- Contact forms and call tracking keep working

Does not include: new pages, blog/SEO content, monthly reporting, or the ranking guarantee.

Positioning: this tier's job is to turn "cancel" into "downgrade," not to compete with Growth on
price. Never put it on the pricing page as a third card — offer it directly, by name, at the
moment a client is heading for the door.

Rate note (internal): Capital City Cards has been on Caretaker-equivalent scope since inception
at a legacy $300/yr; their 2026-12-10 renewal should be quoted at the real $75/mo rate. J&J
Remodeling was offered $55/mo in writing on 2026-07-31 as their specific pause offer — honor that
number if they accept, it predates this $75 publish.

### Off-menu — website-only / one-time build

Not featured on the pricing page. A single quiet line under the two cards: *"Just need a
professional website? I do one-time builds too — ask me."* Priced as a custom project quote,
not a monthly plan. This exists because some buyers genuinely just want a site with no ongoing
marketing — but it doesn't get a card, because it can't honestly carry the ranking guarantee and
shouldn't be the first thing a prospect sees.

---

## Setup fee

**$1,500, waived in full on a 12-month commitment.** Applies to Growth and Pro. Replaces the old
bare "setup is $0" line — the fee is real, it's just paid in commitment instead of cash.

- If a client cancels before completing the 12-month minimum, for reasons other than the 90-day
  guarantee or a termination by JD Media without cause, the waived fee becomes payable, prorated
  for the months remaining in the term. This is the client-facing description of the mechanism
  `ops/agreements/terms.md`'s Setup Fee & Early Termination section already implements — Order
  Forms need `setup_fee_value: 1500` set to activate it.
- Purpose: gives the 12-month term an honest reason to exist beyond "because I said so," and
  covers the build cost if a client leaves early. A full custom build plus several months of
  active SEO/GBP/content work, collected at $275-500/month, does not break even inside a single
  season.

## Seasonality

Ottawa trades are seasonal. The offer says so out loud instead of leaving clients to wonder each
November whether the bill is about to change.

- **The fee is flat year-round and does not change seasonally.** Same price in January as July.
- **Ad spend (Pro) is separate and flexible.** Paid directly to Google, not to JD Media — the
  client can pause, raise, or lower it in any month with zero effect on the management fee or the
  rest of the scope.
- **Off-season work shifts, it doesn't stop.** Roughly December-March: SEO and monthly content
  continue, GBP posts and review replies continue, citation/listing cleanup, site and
  landing-page improvements, and spring campaign prep (keywords, budgets, creative, landing
  pages).
- Client-facing line: *"Your fee doesn't move when your season does."*
- For a client who genuinely can't carry the flat fee through their slow months, the answer is
  seasonal billing (below) or a downgrade to Caretaker — not a discount on the flat rate.

Source: this is Legendary Landscaping's `off_season` scope (`ops/agreements/clients/legendary.yaml`),
promoted here as the standard answer rather than a one-off written for a single client.

## Billing options

- **Monthly** (default) — as priced above.
- **Annual prepay — 12 months for the price of 11** (~8% off). Client pays the year up front.
  Gets cash in before the build is fronted, and a prepaid client effectively can't churn
  mid-year.
- **Seasonal billing** — same 12-month total as monthly billing, reweighted heavier April-October
  and lighter December-March. Offer this, not a discount, when a client raises off-season
  affordability — it solves the cash-timing problem without lowering the annual total.

---

## Capacity line (replaces urgency mechanics)

On-brand alternative to scarcity/urgency copy (which the brand guide bans): a calm, true
statement of capacity.

> "I take on a limited number of new builds each month — I do the work myself."

Use once on the pricing page, below the cards. Never as a countdown, never in the hero, never
with "act now" framing.

---

## Guarantee

**The 90-day money-back guarantee.** Stay 90 days. If you're not showing up higher in Google
local search than when you started, I refund your management fees for those three months. No
fine print, no risk.

- Applies to Growth and Pro (both carry the full SEO/GBP engine, so both can honestly be held to
  a ranking outcome).
- Measured against: your Google Business Profile / map-pack position and organic ranking for the
  agreed target search terms, compared to your position on day one.
- Refund scope: management fees only, for the three months of the guarantee period. Does not
  cover Google Ads spend (Pro tier) — that's paid directly to Google, not to JD Media.
- Placement rule (brand guide): appears once per page, at the decision point right before the
  CTA. Never in the hero, never in the tagline.

---

## Terms

- **12-month minimum term**, then fully month-to-month. Cancel anytime after year one with 30
  days written notice.
- **Ownership — hybrid.** During the term, the site is a managed service: it's built, hosted, and
  maintained as part of the plan, living on JD Media's infrastructure. Once a client completes
  their 12-month minimum, they can request a free static export and take the site with them,
  anytime, at no charge. You're never held hostage — I keep clients by getting them calls, not by
  holding their website hostage.
  - Rationale: the site itself isn't the valuable, hard-to-replace part of the engagement — the
    ongoing SEO, GBP management, and content are. A static export loses the thing that actually
    produces calls (nobody's updating rankings or posting to GBP after export), so this costs JD
    Media little while resolving the trust gap of "what happens if I leave."
  - This replaces the old, inconsistent language ("yours to keep" on the pricing card vs. "taken
    down if you cancel" in the FAQ) — those two statements contradicted each other and both are
    now retired in favor of the hybrid policy above.
- **Upgrades/downgrades:** anytime, with 30 days notice.
- **Launch timeline:** most sites go live 7-14 days after content is received.

---

## Pricing rationale (internal — do not publish verbatim)

- **Current prices ($500 Growth / $900 Pro) are a deliberate hold, not a ceiling.** The value
  math clears the bar easily: Legendary Landscaping got 17 quote requests in July 2026 (their
  best month yet) from the Growth-tier engine — at $800/job that's roughly $13,600 in pipeline
  from a $500/month plan. There is real room to charge more.
- **The $375/month family rate (GBP SEO + Google Ads) is a discounted favor, not a market
  benchmark.** It should never anchor pricing decisions — it's below Growth for work that's
  closer to Pro in scope.
- **Why hold instead of raising immediately:** the only paying relationship right now is family.
  Pricing confidence should come from strangers saying yes at the number, not from resolving
  discomfort in the abstract. Raise on evidence, not nerves.
- **The trigger to raise:** once 2-3 non-family clients have closed at $500/$900, raise Growth
  and Pro toward roughly $595/$995. Re-evaluate this file at that point.
- **Why round numbers, not $x95 charm pricing:** charm pricing ($295/$495/$895) is a retail
  discount signal — "we shaved it down to feel cheaper." That's churn-shop grammar. This brand is
  "calm expert, Stripe restraint" — premium service brands round, because a round number reads as
  "this is simply what it costs," a confidence signal instead of a discount signal. Hence $500 /
  $900, not $495 / $895.
- **Why two tiers, not three:** the old three-tier structure's bottom rung (Starter, website-only)
  couldn't honestly satisfy the ranking guarantee and was the highest-churn, worst-fit buyer to
  feature prominently. Classic three-tier anchoring assumes all three tiers are legitimate sells;
  here the bottom one wasn't. Two tiers where both carry the guarantee is cleaner, more honest,
  and matches the "ultra simple" brand instinct — Pro still anchors Growth without needing a
  third card to do it.
- **Solo capacity note:** every hour is a shared, finite resource across all clients regardless of
  their plan. A low-price client costs the same calendar time as a high-price one and tends to be
  more price-sensitive and higher-churn. Pricing is a filter, not just a revenue lever — protect
  it accordingly as volume grows.
- **"Am I priced too low" is currently unanswerable — hold, don't guess.** As of 2026-08-10, cold
  outreach has produced 0 replies, 0 booked calls, and 0 non-family closes across 39 touches. No
  stranger has ever been quoted $500 or $900 and responded either way. Advice that the price is
  too low may well be right in absolute market terms, but raising an untested number right now
  doesn't test anything — it just changes the number nobody responds to. The binding constraint
  right now is deal flow and time-to-visible-result, not the number on the card.
- **J&J Remodeling's churn (2026-07-31, effective 2026-08-31) is evidence price wasn't the
  objection.** They left at $275/month — the lowest monthly rate in the book — after ~4 months,
  citing "recurring overhead" as the season wound down, not cost. They were also on legacy
  month-to-month paper with no 12-month term, no setup-fee clawback, and no seasonality clause —
  exactly the gaps this 2026-08-10 revision closes.
- **Calendar backstop on the hold:** re-evaluate this file on **2027-01-01** regardless of whether
  the non-family-close trigger below has fired. A hold shouldn't drift indefinitely just because
  the funnel that's supposed to produce triggering evidence isn't producing conversations yet.

---

## Change log

- 2026-08-10 — Held $500/$900 (no evidence yet either way — see pricing rationale). Added a
  published Caretaker tier ($75/mo, offered directly rather than shown on pricing cards), a named
  $1,500 setup fee waived at 12 months (replacing the bare "$0" line), a Seasonality section
  promoted from Legendary's Order Form, and annual prepay / seasonal billing options. Prompted by
  J&J Remodeling's churn at $275/mo and the observation that cold outreach has produced zero
  priced responses to date.
- 2026-07-02 — Rewrote from three tiers ($295/$495/$895) to two ($500/$900). Resolved the
  ownership contradiction with the hybrid policy. This file created as the canonical source;
  previously pricing lived independently across four files with no single source of truth,
  which is what allowed the ownership contradiction to happen undetected.

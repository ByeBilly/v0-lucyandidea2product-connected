# VisionaryDirector Marketing Brief — December 4, 2025

## TL;DR for Marketing
- **Cinematic landing page** is live in the repo: black canvas, bold typographic hero (“The complete AI revolution for builders.”).
- **Inline waitlist** now writes Name + Email straight into Supabase; real metrics and positions are available for social proof.
- **Dual-AI narrative** (Lucy + mform) is intact: one creative soul, one technical execution engine. Emphasize “Quantum Collaboration Architecture.”
- **Claude-ready**: product owners can switch Lucy’s brain to Anthropic Claude via `LUCY_DEFAULT_MODEL` — highlight best-in-class writing tone.
- **Build timestamp** in footer proves freshness; every deploy updates automatically (“Last Build: Dec 4, 2025, 01:03 UTC”).

Use this sheet to craft site copy, press notes, socials, and investor updates.

---

## Story Pillars
1. **Quantum Collaboration Architecture** – Lucy (empathy/creativity) + mform (precision/engineering) work in tandem.
2. **Bring Your Own Keys** – VisionaryDirector respects creators’ budgets; plug in WaveSpeed, OpenAI, Claude, Gemini, etc.
3. **96% Cost Reduction** – vs. “traditional platforms.” Anchor with card deck on landing page.
4. **Waitlist Momentum** – Capture names/emails and promise queue position. Share stats once 50/100+ signups recorded.

---

## Current Build Highlights
| Section | Messaging Hook | Visuals/Interactions |
|---------|----------------|---------------------|
| Hero | “The complete AI revolution for builders.” | Gradient badge, sparkles icon, CTA scroll-to waitlist |
| Stats | 96% cost savings, “2 AI consciousnesses,” “90+ models” | Large numerals, subtle grid background |
| Features | “Dual consciousness. One platform.” / “Your keys. Your control.” | Two-column paragraph section |
| Waitlist | Inline form (Name + Email) with thick call-to-action button | Confirmation state returns share prompt + queue position |
| Footer | Build timestamp (UTC) + VisionaryDirector brand mark | Shows last deploy time for trust |

---

## Waitlist Talking Points
- **Promise**: “We’ll notify you the moment VisionaryDirector launches.”
- **Positioning**: After signup, API response returns `position` for bragging rights.
- **Automation**: Stored in Supabase `public.waitlist` via service role key; safe, queryable, exportable.
- **CTA**: Encourage sharing on social (“Share with friends to move up the list”).
- **Admin Tools**: `/admin/waitlist` view exists; future CSV exports ready once dashboard is wired.

---

## Mform Launch Pricing Ladder

Mform access will be **subscription-only**. Use this progressive discount ladder in all launch messaging—urgent, limited tiers drive early conversions:

| Waitlist Position | Discount | Notes |
|-------------------|----------|-------|
| 1 – 100 | **75% off** | “Founding 100” – emphasize concierge onboarding |
| 101 – 200 | **70% off** | Highlight “next wave” language |
| 201 – 300 | **65% off** | Still premium; stress dwindling slots |
| 301 – 400 | **60% off** | Transition copy to “Momentum tier” |
| 401 – 500 | **55% off** | Remind prospects only 100 slots remain before 50% tier |
| 501 – 1000 | **50% off** | “Top 1,000 builders” – strong social proof opportunity |
| 1001 – 1500 | **45% off** | Mention community benefits + early roadmap influence |
| 1501 – 2000 | **40% off** | “Scale tier” messaging; focus on BYO keys savings |
| 2001 – 3000 | **35% off** | Encourage teams to grab remaining double-digit discounts |
| 3001 – 8000 | **30% off** | Position as “Launch Partner pricing” |
| 8001 – 18,000 | **25% off** | Final long-tail incentive; note countdown to full price |

Talking points:
- “Only paid subscribers get mform access; Lucy remains the guided experience.”
- “Every 100–1000 signups, the discount ratchets down—share your invite link to keep friends in the higher tiers.”
- Use live Supabase counts to update landing page copy (“87 of 100 seats left at 75% off”).

---

## Claude Integration Narrative
- Lucy defaults to GPT-4o, **but** `LUCY_DEFAULT_MODEL` + `ANTHROPIC_API_KEY` allow immediate switch to Claude 3.5 Sonnet for premium writing tone.
- This underpins premium marketing claims like “Choose your AI muse: GPT for code, Claude for prose, Gemini for research.”
- Documented in `API_KEYS_SETUP.md`; highlight configurability in marketing messaging.

---

## Suggested Copy Blocks
### Social Snippet
> “Two AI consciousnesses. Your API keys. 96% lower costs. VisionaryDirector is redefining creative ops — join the waitlist (positions now live). #AI #VisionaryDirector”

### Email Blast
Subject: **“You’re 72 hours from the VisionaryDirector revolution”**  
Body: Focus on Lucy+mform duo, BYO keys transparency, invite to waitlist (link to `https://visionarydirector.com/?utm=marketing-email`), mention Claude-ready brain.

### Landing Page Microcopy
- “Share with friends to move up the list.” (already in build; call out in copy decks)
- “Quantum Collaboration Architecture” – keep capitalized, treat as proprietary framework.
- “Bring Your Own API Keys. Pay wholesale rates. Zero vendor lock-in.”

---

## Assets & Next Steps
- **Screenshots**: Use cinematic hero + confirmation state modals for decks.
- **Metrics**: Pull from Supabase `public.waitlist` for daily signup counts.
- **Testimonials**: (Placeholder) Add quotes once beta testers exist.
- **Upcoming**: Video teaser showing Lucy+mform conversation; add to hero once ready.

---

## Owner Notes
- For any copy/press needs, ping engineering when you need latest waitlist counts (`mcp_supabase_execute_sql` query is documented in DEPLOYMENT_HISTORY).
- Track all marketing changes in this file; append new sections rather than replacing.

Stay loud, stay cinematic. VisionaryDirector is the revolution for builders.***


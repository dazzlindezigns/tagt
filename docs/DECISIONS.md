# Decisions & Open Questions

Rule we're working from: **the mockup wins on layout and visual design. The content sheet (`/content/sheet-seed.json`) wins on wording and real details.**

## Open questions (need Dani)

**Q1. Giving path. Blocks the Give page and the Dec 28 deadline.**
Recurring givers already have to re-enroll once (ShelbyNext → new system). If we launch on Zeffy in January and then move to Stripe-native in Phase 2, they re-enroll a **second** time within weeks. That's how people quietly stop giving. So pick one and stay on it:
- **A. Stripe from day one (recommended if you want in-app history and statements).** Phase 1 uses hosted Stripe Checkout (card data never touches us), and gifts land in our ledger by webhook. Phase 2 adds the in-app UI on the *same* Stripe subscriptions, so nobody re-enrolls. Cost: about 2.2% + $0.30 per gift if the nonprofit rate is approved, 2.9% + $0.30 until then. **Apply for the nonprofit rate this week.**
- **B. Zeffy for good.** Zero fees. We poll Zeffy's read API (beta, read-only per their docs, which I'll verify) into our ledger every 15 minutes, with CSV import as a fallback. Statements still come from our ledger. Tradeoff: no true in-app giving, sync can lag about 15 minutes, and we rely on a beta API.
- Not recommended: Zeffy now, Stripe in February.

**Q2. Email provider.** The stack line says Gmail; Phase 0 and Messaging say Resend. Gmail/Workspace caps sending (about 2,000/day), has no bulk unsubscribe handling, and risks the church's main inbox reputation. **Recommendation: Resend** for both transactional and bulk email, using separate streams, with replies going to the church Gmail inbox.

**Q3. Address.** The mockup says **12636 Research Blvd Suite A-102**. The content sheet leaves out "Suite A-102". Which is correct? (This matters for maps, mail-in giving, and the CAN-SPAM footer.)

**Q4. Give page vs. Prayer page.** The mockup's Give screen includes a Prayer Request form and a "Connect With Us" block. We now have a separate Prayer Requests page, and the content sheet's Give section has no prayer form. **Recommendation:** Give keeps "Connect With Us" (address/phone/email/socials) plus a small "Need prayer?" link card to `/prayer`. That means one prayer form instead of two forms with different privacy options.

**Q5. Header logo.** The uploaded logo is a detailed full-color badge. It's beautiful, but it turns into mush at the 40 px header size. The mockup header uses a simple gold flame mark plus the wordmark. Do you have a flat flame mark? If not, I'll trace a simple SVG flame from the badge for header/footer/favicon, use the full badge on About and share images, and mark it as a placeholder for your approval.

**Q6. Header button per page.** The mockup's Watch page uses a purple "Watch Live" button. Your build prompt says the CTA changes by page, but the content sheet lists one gold "Plan Your Visit" button. **Recommendation:** Plan Your Visit everywhere except Teachings (Watch Live) and Give (Give). The wording for all three is editable in the "Every page" section.

**Q7. Ministries cards.** The mockup shows six generic cards (Worship, Prayer, Discipleship, Outreach, Family & Next Gen...). The content sheet has a featured Youth box plus Prayer and Bible Study, and lists WOG, MOG, One Sound, One Accord as "[Needs your words]". **Plan:** featured Youth (COG) box, then cards pulled from the `ministries` table, seeded with the real TAGT groups. Cards stay hidden until the team writes their descriptions. No invented copy.

**Q8. Cash App on the Give page.** Cash App gifts won't reach our ledger automatically. Finance would enter them as offline gifts so statements stay complete. Are you OK with that, or should Cash App come off the page in 2027?

## Website build notes (Nov 10)

- **App vs. website:** the pastors are reviewing the app preview. The website is built so the app can be added later without rework. The Member Login link stays hidden until they decide.
- **Q3 (suite number)** is still open. The site uses the content sheet's address, without "Suite A-102".
- **Q5 (header logo):** using the full badge at 48 px as a placeholder.
- **Q6 (header button):** every page uses the sheet's single gold "Plan Your Visit" button (row 10), since the sheet has only one row for it.
- **Give Online:** links to `NEXT_PUBLIC_GIVE_URL`. Through Dec 31 that should be the ShelbyNext giving page. **We need that link.** Until it's set, the Give Online button is left off the Give page hero and the home page button goes to /give.
- **Events:** the calendar and lists show the three weekly services from the "Every page" section. Admin-published events join them once the `events` table exists.
- **Teachings:** shows the "not live" state and a placeholder until `YOUTUBE_CHANNEL_ID` is set.
- **Words not in the content sheet yet** (add as rows in the next sheet update): Visit form field labels (Name, Email, Phone, How many are coming?, Anything we should know?), both thank-you pages, the 404 page, and the Teachings line "Messages appear here automatically once the church YouTube channel is connected."
- **Photos:** every photo spot shows the purple striped placeholder with what belongs there, as the team sheet describes.

## Decisions made (change any of these if you disagree)

| # | Decision | Why |
|---|---|---|
| D1 | Headline font **Playfair Display**, body **Inter**. A lint rule fails the build if "Syne" appears. | Closest free match to the mockup's serif. Inter stays readable at small sizes. |
| D2 | Colors sampled from the mockup: hero purple `#1A0B2E`, footer `#210B34`, primary purple `#3A0A4A`, gold `#D9B46C` (buttons), cream page `#FDF9F3`, cream card `#F9F5EE`. Gold **text** on cream uses a darker `#8A6A2F`. | The button gold on cream fails WCAG AA for small text, so eyebrow labels on cream get the darker gold. On purple, the bright gold passes. |
| D3 | Menu follows the content sheet (About, Visit Us, Ministries, Teachings, Events, Prayer Requests, Give). The logo links Home. Member Login is a small link in the header and footer. Collapses to a menu button below about 1180 px. | Seven items plus a button doesn't fit the mockup header at laptop widths. |
| D4 | "Visit Us" page lives at `/visit`. Page headlines use content-sheet wording (e.g., "Planning Your First Visit?", "Partner With Us"), not the mockup's ("You Belong Here.", "Partner with Purpose"). | Sheet wins on wording. Flagging it here so the change from the mockup is visible. |
| D5 | Phone and email stay **[Needs your words]** until you give them. The mockup's `(512) 000-0000` and `info@tagtministry.org` are not used. | Don't invent contact info. |
| D6 | Event placeholder "Time & Details TBA" isn't hardcoded. An event without a time shows "Time to be announced", which is editable. | Build prompt. |
| D7 | Home isn't in the mockup. It's built from mockup components: hero, the three service cards on the hero edge, latest message, coming up, give strip. | Build prompt. |
| D8 | Page copy is stored by **page + number** (`site_content`), matching the content sheet and `data-sheet` attributes. Numbers never get reused. | Keeps the sheet, the screenshots, and the import in sync. |
| D9 | The content sheet Google Doc gets built **after** the pages exist (per its own prompt). The Google Drive connector is available in this session. | Prompt order. |

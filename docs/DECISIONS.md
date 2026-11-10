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
- **Q6 (header button):** matches the mockup. Gold "Plan Your Visit" on every page except Teachings, which shows a purple "Watch Live" button (new sheet row: Every page #32).
- **Give Online:** links to `NEXT_PUBLIC_GIVE_URL`. Through Dec 31 that should be the ShelbyNext giving page. **We need that link.** Until it's set, the Give Online button is left off the Give page hero and the home page button goes to /give.
- **Events:** the calendar and lists show the three weekly services from the "Every page" section. Admin-published events join them once the `events` table exists.
- **Teachings:** shows the "not live" state and a placeholder until `YOUTUBE_CHANNEL_ID` is set.
- **Words not in the content sheet yet** (add as rows in the next sheet update): Visit form field labels (Name, Email, Phone, How many are coming?, Anything we should know?), both thank-you pages, the 404 page, and the Teachings line "Messages appear here automatically once the church YouTube channel is connected."
- **Photos:** every photo spot shows the purple striped placeholder with what belongs there, as the team sheet describes.

## Content sheet changes (Nov 10, mockup headers)

- Visit Us #1 "VISIT US" → "PLAN YOUR VISIT"; #2 → "You Belong Here."; new #22 "Come as you are — there's a place for you."
- Ministries #2 → "Real People. Real Faith. Real Impact."; #3 → "Discover the many ways to grow, serve, and make a difference at The Abiding Glory Tabernacle."
- Give #1 → "GIVE & CONNECT"; #2 → "Partner with Purpose"; #3 → "Your generosity helps advance the Kingdom and make a lasting impact."; new #16 "Give Online" and #17 "Other Ways to Give" (hero buttons)
- Every page: new #32 "Watch Live" (Teachings header button)
- Replaced wording that's no longer on those pages: "Planning Your First Visit?", "There's a Place for You Here", "From Sunday morning prayer to midweek Bible study, our ministries are where the Word is taught and lives are changed." The Give page's "Your giving helps us reach the lost for Jesus Christ…" still appears on the Home page giving section.
- New rows were added at the end of each section. Existing numbers did not change.

## New pages (Nov 10)

- **About sub-pages** (`/about/beliefs`, `/about/mission`, `/about/heart`): the title and short line come from About #10–15. The main text on each is **[Needs your words]**, so on the live site those pages show only the top section and a button until it's filled in. **Our Beliefs must be written by the pastors and grounded in Scripture.** I did not write it.
- **Home "Get to Know Us" section:** three boxes linking to those pages (Home #13–14). The heading "Get to Know Us" is new wording, editable in the sheet.
- **Ministry pages** for the 7 ministries named in the sheet: Youth, Sunday Morning Prayer, Bible Study, Women of Glory, Men of Glory, One Sound, One Accord. Each has its own sheet section (#12–#18 sections). Missing parts stay hidden. Each page has a "Get Involved" form (not stored yet, like the other forms). Other teams from the build prompt (Beautification, Leadership, Prayer Team, Children's, Hospitality) aren't shown until you say so.
- **Event pages** for the three weekly services, with an "Add to My Calendar" file (repeats weekly, Austin time). Events posted from the admin will use the same page.
- **Give Online form** (`/give/online`): amount, fund, how often, name, email, cover-the-fee. **Not connected to any payment company** (Q1 still open). Submitting shows "Online giving here opens January 1, 2027" and the ShelbyNext link once `NEXT_PUBLIC_GIVE_URL` is set. The fund list comes from the build prompt (Tithes, Offerings, Building Fund, Missions, Benevolence). The team should confirm it.
- **Privacy Policy and Terms & Conditions** written by Claude. **Not legal advice: have your treasurer or an attorney review before launch.** Things to confirm: the church's legal name, the giving refund wording, and that the prayer wall will show first names only (the policy promises that, so the prayer wall must be built that way). The text-message section uses the wording 10DLC carriers look for.
- **Header:** About and Ministries now have drop-down menus. On phones they show as indented links in the menu.

## YouTube (Nov 10)

- Channel ID `UCa1RK9QABO0KllO5YGg9IPw` (public) is the default in `src/lib/site.ts`.
- Videos come from the channel's public feed: no API key, the latest 15 videos, refreshed every 15 minutes.
- **Featured Teaching** = the newest video with a real title. Videos titled only with a date ("November 9, 2026") are treated as service recordings.
- **Live:** during service times (15 minutes before to 2.5 hours after each start, Austin time) the player shows the live stream. Otherwise it plays the latest video with the "not live" line. True live detection and the full archive with series, speaker and Scripture need a YouTube API key and the admin (build prompt §6).
- Each video has its own page at `/teachings/<video id>`, played inside the site.
- The archive group names (Recent Messages, Bible Study, Special Services, Series) show as labels. They become working filters once messages are grouped in the admin.
- **Possible giving link:** the video descriptions say "Link to give: https://tinyurl.com/39k42x94", which goes to a ministryforms.net (ShelbyNext) form. Waiting for Dani to confirm it's the giving page before it's used.

## Content sheet Google Doc

- Lives at the link Dani gave (same link for every update). Updated in place, never replaced.
- **No "For Dani and Claude Code only" section in the doc** (Dani removed it, Nov 10). Import notes are in `docs/RUNBOOK.md`.

## Decisions made (change any of these if you disagree)

| # | Decision | Why |
|---|---|---|
| D1 | Headline font **Playfair Display**, body **Inter**. A lint rule fails the build if "Syne" appears. | Closest free match to the mockup's serif. Inter stays readable at small sizes. |
| D2 | Colors sampled from the mockup: hero purple `#1A0B2E`, footer `#210B34`, primary purple `#3A0A4A`, gold `#D9B46C` (buttons), cream page `#FDF9F3`, cream card `#F9F5EE`. Gold **text** on cream uses a darker `#8A6A2F`. | The button gold on cream fails WCAG AA for small text, so eyebrow labels on cream get the darker gold. On purple, the bright gold passes. |
| D3 | Menu follows the content sheet (About, Visit Us, Ministries, Teachings, Events, Prayer Requests, Give). The logo links Home. Member Login is a small link in the header and footer. Collapses to a menu button below about 1180 px. | Seven items plus a button doesn't fit the mockup header at laptop widths. |
| D4 | "Visit Us" page lives at `/visit`. **Page headers match the mockup** (Dani, Nov 10): "You Belong Here.", "Real People. Real Faith. Real Impact.", "Partner with Purpose", with the mockup's gold accent words. The content sheet was updated to the same wording. | Dani asked for the mockup headers on every page. |
| D5 | Phone and email stay **[Needs your words]** until you give them. The mockup's `(512) 000-0000` and `info@tagtministry.org` are not used. | Don't invent contact info. |
| D6 | Event placeholder "Time & Details TBA" isn't hardcoded. An event without a time shows "Time to be announced", which is editable. | Build prompt. |
| D7 | Home isn't in the mockup. It's built from mockup components: hero, the three service cards on the hero edge, latest message, coming up, give strip. | Build prompt. |
| D8 | Page copy is stored by **page + number** (`site_content`), matching the content sheet and `data-sheet` attributes. Numbers never get reused. | Keeps the sheet, the screenshots, and the import in sync. |
| D9 | The content sheet Google Doc gets built **after** the pages exist (per its own prompt). The Google Drive connector is available in this session. | Prompt order. |

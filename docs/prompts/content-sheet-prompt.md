# Claude Code prompt: build the TAGT Website Content Sheet as a Google Doc

> Before you paste this: (1) connect Google Drive / Google Docs access to Claude Code (a Google Workspace connector or MCP server you're already signed into), (2) drop `sheet-seed.json` into `/content/` in the repo, (3) run this **after** the public pages are built and `/scripts/number-screenshots` has produced `/content/page-pictures/*.png`. If the pages aren't built yet, use the mockup and the seed file and say so in your report. Paste everything below the line.

---

## Goal

Create a Google Doc called **"TAGT Website Content Sheet"** that non-technical church team members will use to tell us what to change on the website. It must be extremely simple. Many of them are not comfortable with technology, so no code words, no IDs, no jargon. Each page of the website gets a picture with gold numbered circles on it, and a table under the picture with the same numbers. They type new words in one column and leave it blank to keep the current words.

## Inputs (use them in this order)

1. **The built site in this repo.** Every editable text and photo spot has `data-sheet="<number>"`, `data-sheet-label="<plain-English label>"` and `data-sheet-kind="text|photo"`. Read the real current text from the rendered pages so the table always matches the website.
2. **`/content/page-pictures/<page>.png`**: the numbered screenshots from `/scripts/number-screenshots`. Use these as the pictures.
3. **`/content/sheet-seed.json`**: a starting list of pages, numbers, labels, and current wording (fallback if a page isn't built yet; if you use it, say which pages).
4. **`/design/tagt-mockup.png`**: only for comparison. If a built page's picture doesn't resemble its mockup screen, tell me before continuing.

## Document structure (in this order)

1. **Title:** TAGT Website Content Sheet
2. **One-line lead:** "This is where you tell us what to change on the website. Find your page, find the number, type your new words. That's it."
3. **"Start here (1 minute)"**, using these words exactly:
   - Numbered steps: (1) Scroll to your page. Each page has a picture with gold numbered circles on it. (2) Find the same number in the table under the picture. The "What it says now" column is what the website says today. (3) Want to change it? Type your new words in the last column. If it's fine, leave that box empty.
   - "Photos: the purple striped boxes are photo spots. Put your photo in the TAGT Photos folder, then type the photo's file name in the last column of the photo table."
   - "Good to know": You can't break the website by typing here. Nothing changes on the live website until Dani reviews it. / Please don't change the numbers. / **[Needs your words]** means we don't have this yet. Please fill it in. / Service times, menu words, and the footer only live in the "Every page" section. Change them there once and they change everywhere.
4. **One section per page, in this order:** Every page (menu, footer, service times), Home, About, Visit Us, Ministries, Teachings, Events, Prayer Requests, Give. For each page:
   - A Heading 2 with the page name, then one plain sentence saying what the page is for.
   - The numbered screenshot, full page width, with a short alt text.
   - **Words table**, 4 columns: `#` | `Part of the page` | `What it says now` | `Your new words (leave blank to keep)`. One row per `data-sheet-kind="text"` item, numbers matching the picture.
   - **Photo table**, 4 columns: `#` | `Photo spot` | `What is there now` | `Photo file name (type it here)`. One row per photo spot.
   - A page break before the next page.
5. **Last section: "For Dani and Claude Code only (team can skip this)"**: how an import works. Export the doc as Markdown to `/content/site-copy.md` and photos go in `/content/images/`. A row is identified by page section plus number. Only rows where "Your new words" or "Photo file name" is not empty get imported. Empty means keep what's live. Write photo alt text from the image itself. Do not renumber. Report every change and never publish without Dani's go-ahead.

## Formatting rules (this is what makes it usable)

- Plain, large, readable: Arial or Calibri 11 pt, tables full page width, header row bold with a light purple shade, header row repeats on page breaks.
- Column widths: `#` narrow, "Part of the page" medium, "What it says now" wide, "Your new words" widest. The last column must be easy to click and type in.
- Highlight any **[Needs your words]** cell in light yellow.
- Do not add colors, logos, or decoration beyond that. No code formatting anywhere except in the last "Claude Code only" section.
- Use only plain-English labels. Never show `data-sheet`, IDs, or file paths outside the last section.

## Rules

- **Do not invent copy.** Take wording only from the site (or the seed file). If a piece of text is missing, put `[Needs your words]` and describe what's needed in parentheses.
- Keep numbers exactly equal to the numbers on the pictures. After building, verify for every page that the set of numbers in the picture (count the `data-sheet` elements) equals the set of numbers in the two tables. Fix mismatches before reporting.
- Create the doc **private** in my Drive (root or the folder I name). **Do not change sharing.** I'll share it with the team myself. Do not create it in a shared drive without asking.
- **Updating later:** when pages change, regenerate pictures and rows, but **never overwrite anything a team member typed** in "Your new words" or "Photo file name". Read the existing doc first, match rows by page + number, and keep their entries. If a row was removed or renumbered, don't delete their entry: move it to a "Changed rows to review" list at the end and tell me.
- Ask me before: overwriting an existing doc with the same name, or if a page picture looks nothing like the mockup.

## If you can't reach Google

If you don't have working Google Docs access, don't stop. Build the same document as a `.docx` (embedded pictures, same tables and formatting) at `/content/TAGT Website Content Sheet.docx`, and tell me to upload it to Google Drive and choose "Open with Google Docs". Say plainly that you couldn't create the Google Doc directly and why.

## Report back (short)

1. The link to the Google Doc (or the `.docx` path).
2. Which pages used built-site data and which used the seed file.
3. Any mismatches you fixed, any `[Needs your words]` cells, and anything that looks different from the mockup.

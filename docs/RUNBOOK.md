# Runbook

## Run the site locally

```bash
npm install
npm run dev          # http://localhost:3000
```

Copy `.env.example` to `.env.local` and fill in what you have. Everything has a safe default when empty.

## Checks before every push

```bash
npm run lint         # ESLint + "no Syne font" check
npm run build        # type check + production build
```

## Numbered page pictures for the content sheet

Needs Playwright with Chromium (`npm i -D playwright && npx playwright install chromium` on a new machine).

```bash
npm run build && npm start      # leave running
npm run number-screenshots      # writes content/page-pictures/<section>.png
```

The script also checks that the numbers on each page match `content/sheet-seed.json` and fails if they don't.

## How page copy works

- Every editable spot renders through `<T page n>` or `<Photo page n>` (`src/components/Sheet.tsx`). The page section and number are the same as the content sheet's.
- Copy currently comes from `content/sheet-seed.json`. When Supabase is connected, `site_content` rows override it by the same page + number.
- Rows marked `[Needs your words]` are hidden on the live site. They only show (yellow) in the sheet pictures.

## Importing the team's changes from the content sheet

These notes are kept here, not in the Google Doc. Dani asked for the team sheet to hold only what the team needs.

- Export the Google Doc as Markdown to `content/site-copy.md`. Photos go in `content/images/`.
- A row is identified by page section plus number (for example `3-visit-us #5`). Section keys are the `slug` values in `content/sheet-seed.json`.
- Only rows where "Your new words" or "Photo file name" is filled in get imported. Empty means keep what's live.
- Write photo alt text from the image itself.
- Never renumber. New spots get the next unused number in their section.
- Run `scripts/import-content` (to be built). Report every change, and never publish without Dani's go-ahead.

## Updating the Google Doc after the pages change

1. `npm run build && npm start`, then `npm run number-screenshots`, `node scripts/read-sheet-rows.mjs`, `python3 scripts/split-page-pictures.py`.
2. Commit and push, so the picture pieces are on GitHub (the doc fetches them from the public repo).
3. Read the doc first and keep anything the team typed. Add new sections with `scripts/content-sheet-gdoc.py`. Don't add a "for Dani and Claude Code" section to the doc.

## Forms

`/visit` and `/prayer` forms validate and show a thank-you page, but **nothing is stored or emailed yet**. Submissions are only logged on the server (prayer request text is never logged). Don't point the live domain at this site until the forms are connected to Supabase + email (Phase 1, step 7).

## Not done yet

Deploy (needs the Vercel project), backups and restore test, key rotation. Steps go here as each is set up.

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

## Forms

`/visit` and `/prayer` forms validate and show a thank-you page, but **nothing is stored or emailed yet**. Submissions are only logged on the server (prayer request text is never logged). Don't point the live domain at this site until the forms are connected to Supabase + email (Phase 1, step 7).

## Not done yet

Deploy (needs the Vercel project), backups and restore test, key rotation. Steps go here as each is set up.

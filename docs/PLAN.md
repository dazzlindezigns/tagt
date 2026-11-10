# TAGT Build Plan (Phase 1 → launch Dec 31, 2026)

Status: **waiting for Dani's go.** No app code yet. Today is Nov 10, so there are about 7 weeks to launch.

## 1. Architecture

```
                 ┌──────────────── Next.js (App Router, TS) on Vercel ────────────────┐
 Visitors  ───▶  │  (public)  /, /about, /visit, /ministries/[slug], /teachings, ...  │
 Members   ───▶  │  /app      profile, household, events, giving, prayer              │
 Staff     ───▶  │  /admin    content, people, messaging, giving, forms, roles        │
                 │  /api      webhooks (Telnyx STOP/HELP, Stripe), cron (YouTube,     │
                 │            giving sync, message queue)                             │
                 └───────────────┬────────────────────────────────────────────────────┘
                                 │ server components + server actions (service role
                                 │ only in server code; never shipped to the browser)
                 ┌───────────────▼──────────────┐   ┌──────────────────────────────┐
                 │ Supabase: Postgres + RLS,    │   │ YouTube Data API (server,     │
                 │ Auth, Storage (photos,       │   │ cached 60s live / cron sync)  │
                 │ statements)                  │   │ Resend or Gmail (email)       │
                 │ audit_log on sensitive reads │   │ Telnyx (SMS, 10DLC)           │
                 └──────────────────────────────┘   │ Giving: Zeffy or Stripe (§7)  │
                                                    └──────────────────────────────┘
```

- **One source of truth:** public pages read the same tables admin writes. Pages are statically rendered and revalidated on publish (`revalidatePath`), so an admin publish shows on the site in seconds, well under the 1-minute bar.
- **Permissions:** `roles`, `permissions`, `role_permissions`, `user_roles` (with optional `group_id` scope for Ministry Leader and Kids). One SQL function `has_permission(perm, group_id?)` used by **every** RLS policy, and a matching `can(user, perm)` helper in TypeScript for UI. No role names hardcoded in components.
- **Page copy:** a `site_content` table keyed by `page + number` (the same numbers as the content sheet and the `data-sheet` attributes). Each row has text or a photo reference and alt text, plus `updated_at` and `updated_by`. `import-content` and admin both write here, and a stale-write check shows a conflict instead of silently overwriting.
- **Fonts:** Playfair Display (headlines), Inter (body). No Syne, enforced by a lint check.

## 2. Route map

| Public | Member (`/app`) | Admin (`/admin`) |
|---|---|---|
| `/` Home | `/app` dashboard | `/admin` dashboard |
| `/about` (+ `#beliefs` `#mission` `#heart`) | `/app/profile` | `/admin/content` (page copy + photos, by page/number) |
| `/visit` + `/visit/thanks` | `/app/household` (add/link family, confirmations) | `/admin/events` + form builder |
| `/ministries`, `/ministries/[slug]` | `/app/events`, `/app/events/[id]/register` | `/admin/ministries`, `/admin/sermons` |
| `/teachings`, `/teachings/[slug]`, `/teachings/series/[slug]` | `/app/giving` (link out in P1; history in P2) | `/admin/announcements` |
| `/events`, `/events/[slug]`, `/events/[slug]/thanks` | `/app/prayer` | `/admin/people` (+ CSV import, dedupe) |
| `/prayer` + `/prayer/thanks` | `/app/groups` | `/admin/forms` (visitor, prayer, follow-up tasks) |
| `/give` + `/give/thanks` | | `/admin/messages` (email/SMS, templates, log) |
| `/privacy`, `/terms`, `/sms-terms`, `/sms` (opt-in page for 10DLC) | | `/admin/giving` (offline entry, batches; Finance only) |
| `/login` (modal + page) | | `/admin/roles`, `/admin/audit`, `/admin/settings` |

## 3. Data model (Phase 1 migrations; propose-before-migrate applies)

```
auth.users 1─1 profiles ─┬─< household_members >── households
                         ├─< member_relationships (a,b,type, both directions,
                         │     can_register_for, can_view_their_giving=false,
                         │     can_check_in_kids, can_pickup, confirmed_by_a/b)
                         ├─< user_roles >── roles ─< role_permissions >── permissions
                         ├─< group_members (is_leader) >── groups ─1─1 ministries (public card)
                         ├─< contact_preferences, sms_consent_log
                         ├─< gifts (immutable; reversal rows for corrections)
                         │     >── funds   gifts.source = zeffy|stripe|offline|shelbynext
                         │     giving_sharing_prefs (separate | combined_with, both opt in)
                         ├─< prayer_requests (visibility: pastors|team|wall)
                         ├─< registrations ─< registration_attendees
                         │      >── forms ─< form_fields, form_settings  (forms.event_id?)
                         └─< follow_up_tasks <── visitor_forms
events (+ recurrence rule) ─< event_rsvps      sermons (youtube_id, series, speaker, scripture, hidden)
announcements   site_content(page, number, kind, text, photo_path, alt)   messages ─< message_recipients
audit_log (who, what, row, when) — written by triggers/functions on giving, pastoral, child reads
settings
Phase 2 tables created later: recurring_gifts, pledges, statements, registration_prices/payments, payment_reminders
Phase 3 (after your sign-off): checkin_sessions, checkins, guardian_pickup_codes, kid_medical_notes
```

Finance isolation: `gifts` has RLS allowing only `giving.read` (Finance, Super Admin) plus "own gifts" for members. Reports and exports go through security-definer functions that check the same permission, so a join or a view can't leak amounts to Communications or Ministry Leaders. RLS tests cover this first.

## 4. Phase 1 task list with estimates

Estimates are working days of build time. Your review time is extra.

| Week | Work | Days |
|---|---|---|
| **Now (Phase 0, your actions)** | Start Telnyx 10DLC brand + campaign (needs EIN + legal name), email domain DNS, giving path decision, YouTube channel ID, Supabase + Vercel accounts, DNS access plan | — |
| W1 Nov 10–16 | Scaffold Next.js/Supabase/Vercel, CI, design tokens + component library from mockup | 3 |
| | Schema v1 + RLS + `has_permission` + **RLS tests** + fake seed data | 3 |
| W2 Nov 17–23 | 8 public pages from content seed, `data-sheet` numbering, SEO (meta, OG, sitemap, schema.org `Church`) | 4 |
| | `scripts/number-screenshots`, compare to mockup, fix diffs | 1 |
| W3 Nov 24–30 (Thanksgiving) | YouTube: live status (cached), embed, cron sync to `sermons`, archive + search, message pages | 2.5 |
| | Admin v1: content by page/number, events, ministries, sermons, announcements, image upload + alt text | 3 |
| W4 Dec 1–7 | Auth (magic link + password), invites, profile, household + relationship linking with confirmations | 3 |
| | People CSV import (preview + dedupe), visitor/prayer/contact forms → follow-up tasks + notify emails | 2.5 |
| | `scripts/import-content` (diff, conflict check, no publish without go-ahead) | 1 |
| W5 Dec 8–14 | Messaging v1: email (templates, merge fields, test send, schedule, per-recipient log); SMS with consent, STOP/HELP, quiet hours, throttle queue | 4 |
| | Free event sign-up forms: field-type builder, capacity, prefill from member + household | 3 |
| W6 Dec 15–21 | Giving v1 (path you choose) + offline gift entry/batches + Give page tested with a real gift | 3 |
| | Legal pages, PWA install (manifest + service worker), 404, analytics, error monitoring | 1.5 |
| W7 Dec 22–31 | **Giving live by Dec 28.** Old-URL redirects, perf pass, iOS Safari + Android QA, backup **restore test**, DNS cutover | 3 |

Total ≈ 41 build days in ~7 calendar weeks. That's tight but possible **only with the cuts below.**

### Cuts I recommend to protect Dec 31

1. **Form builder:** v1 = add fields from a list, reorder with up/down buttons, set required. True drag-and-drop goes to Phase 2. Same result for admins, about 2 days saved.
2. **Web push:** ship installable PWA only. Push notifications move to Phase 2 (they're already listed there).
3. **SMS goes live when the carrier approves it.** Code ships in Phase 1 either way. If 10DLC isn't approved by about Dec 20, we launch email-only and switch SMS on the day it's approved. Nothing else waits on it.
4. **ShelbyNext history import:** after launch (it's already marked nice-to-have).

## 5. What I need from you before I write code

See `/docs/DECISIONS.md` → "Open questions". The blockers are: **giving path (Q1)**, **email provider (Q2)**, and **suite number (Q3)**. Everything else can be answered while I build.

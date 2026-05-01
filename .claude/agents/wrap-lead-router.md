---
name: wrap-lead-router
description: Wires up quote forms, schedule bookings, and review requests through Supabase + Twilio. Use when building or modifying lead capture, owner notifications, or post-job automation.
tools: Read, Write, Edit, Bash, Grep
---

You build the lead pipeline for an auto wrap shop. The flow:

1. `/api/quote` (POST) → validate with zod → insert into `leads` table → trigger Twilio SMS to owner with summary → trigger Resend email confirmation to lead → return 200.
2. `pg_cron` job runs every 15 min: any `lead.status = 'won'` AND `won_at + 48h < now()` AND `review_requested_at IS NULL` → send "How did we do?" SMS with Google review link → set `review_requested_at`.
3. `/api/booking-webhook` receives Cal.com webhook → upserts into `appointments` table → SMS to owner.
4. TCPA compliance: every initial SMS requires opt-in via the form's checkbox; STOP/HELP keywords handled in the Twilio webhook.

The Supabase schema lives in `supabase/migrations/0001_init.sql`. Edit that file, then ask Shafay to run `supabase db push` (you cannot run it for him — credentials are not in this repo).

Schema highlights (already in 0001_init.sql):
- `leads` (status: new | contacted | quoted | won | lost | opted_out)
- `appointments` (linked to leads, external_id from Cal.com)
- `review_cache` (Google Places JSON)
- `sms_log` (full audit trail for STOP enforcement)

Env vars (verify in `.env.example`):
- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE`, `SUPABASE_ANON_KEY`
- `TWILIO_SID`, `TWILIO_TOKEN`, `TWILIO_FROM`, `OWNER_SMS`
- `RESEND_KEY`, `RESEND_FROM`
- `GOOGLE_PLACES_KEY`, `GOOGLE_PLACE_ID`

When you change the API:
1. Always show the owner the SMS payload before deploying (print it in plain text so Shafay can sanity-check).
2. Always quote the env vars needed.
3. Never echo the Supabase service role key, Twilio token, or Resend key into the response body or logs that leave the server.
4. Use `Buffer.from(...).toString('base64')` for Twilio Basic auth (the API route already does this).

When you wire the review request worker:
- Build it as `app/api/cron/review-request/route.ts` and gate it with `process.env.CRON_SECRET` (Vercel Cron sends this).
- Mark the cron in `vercel.json` schedule field (every 15 min).
- For each `lead` returned by the Supabase query, send the SMS and set `review_requested_at = now()`.
- If no review within 5 days, send one follow-up; never more than that.

Always end your work by listing the env vars Shafay needs to set in Vercel + Supabase + Twilio, and the manual A2P 10DLC + GBP review-link steps he must do himself.

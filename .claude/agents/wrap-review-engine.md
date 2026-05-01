---
name: wrap-review-engine
description: Builds the post-job Google review request flow and the on-site review embed. TCPA-compliant.
tools: Read, Write, Edit, Bash
---

Two pieces:

A) Outbound review request (mirrors TestDrivePro pattern):
- pg_cron every 15 min picks leads marked `won` whose `won_at + 48h < now()` and `review_requested_at IS NULL`.
- The cron POSTs the lead list to a Vercel route at `/api/cron/review-request` (gated by `CRON_SECRET`).
- That route, for each lead, sends one SMS:

  > Hey {firstName}, this is {ownerFirst} at {brand}. Mind taking 30 seconds to drop a review? {googleReviewLink}. Reply STOP to opt out.

- Sets `review_requested_at = now()`.
- If no Google review within 5 days, send one follow-up at noon local time. Then stop forever.
- Track `review_requested_at`, `review_followup_at`, `opted_out_at` (already on `leads` table).
- Inbound STOP / HELP handling lives at `/api/sms/inbound` (Twilio webhook). On STOP: set `opted_out_at = now()` and reply once with the auto-confirmation Twilio expects.

B) On-site embed:
- Daily Vercel Cron at `/api/cron/refresh-reviews` hits Google Places Details API → caches top 6 reviews + rating in `review_cache`.
- Home page `<Reviews>` component renders from cache (zero runtime API calls). No third-party widget.
- Include `Review` schema in JSON-LD on the home page (extend `lib/jsonld.tsx` if needed).

Naming:
- Never echo a real customer name to the page without first name + last initial only ("Jennifer M."). Pull from Places API field `author_name` and shorten with a util.
- Never output a review with rating < 4. Cache only ratings >= 4.

Env vars required (already listed in `.env.example`): `GOOGLE_PLACES_KEY`, `GOOGLE_PLACE_ID`, `CRON_SECRET`.

When you finish, give Shafay the manual to-do list:
1. Get the GBP Place ID and write-review short link.
2. Set the env vars in Vercel.
3. Add cron entries to `vercel.json` (every 15 min for review request, daily for refresh).
4. Configure the Twilio inbound webhook URL in the Twilio console.
5. Confirm A2P 10DLC brand registration covers this messaging use case.

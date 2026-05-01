Add a new city to `lib/siteConfig.ts` and ensure all per-service pages render for it.

Steps:
1. Ask user for: city name, lat/lng, county, population estimate, drive-time-from-shop in minutes.
2. Append the city object to `siteConfig.cities` in `lib/siteConfig.ts` (lowercased, kebab-case slug).
3. If the city deserves a unique angle (a model or vibe specific to that area), add an entry to the `cityIntros` map in `app/services/[slug]/[city]/page.tsx`.
4. Invoke `@wrap-seo-researcher` for each service × this city to write briefs to `.claude/research/`.
5. Run `npx tsc --noEmit` to confirm nothing broke.
6. Run `npx next build` and confirm the new routes statically generated (one per service for this city, plus the canonical city page).
7. Report the new URL list to Shafay.

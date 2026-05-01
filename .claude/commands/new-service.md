Add a new service across the entire site.

Steps:
1. Ask for: service name, slug, shortName, priceFrom, leadTimeDays, hookLine, 4 bullets, 4 brands, 3-4 FAQ q/a pairs.
2. Append the service object to `siteConfig.services` in `lib/siteConfig.ts`.
3. Invoke `@wrap-seo-researcher` for the canonical service page + each existing city.
4. Optionally invoke `@wrap-page-builder` if a brief calls for a unique content section the templates do not cover.
5. Verify the home-page service grid (`components/Services.tsx`) and footer (`components/Footer.tsx`) reference the new service appropriately. The home grid is currently a separate hand-curated list — if Shafay wants the new service surfaced on the home page, edit that file too.
6. Run `npx tsc --noEmit`, then `npx next build`. Confirm new routes generated.
7. Report new URL list, including the `service × city` matrix.

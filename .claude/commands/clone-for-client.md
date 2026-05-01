Clone this entire repo for a new client (the Virsa Labs move, but with a real codebase).

Steps:
1. Ask for: brand name, legal name, phone, email, full address (street/city/state/zip), shop lat/lng, primary color hex, accent color hex, social handles, list of cities to serve.
2. Run a git workflow:
   - Create a sibling directory `../<brand-slug>` outside this repo.
   - Copy this repo into it, excluding `.next`, `node_modules`, `.git`, `public/media`, `.env.local`, `.vercel`.
   - Run `git init`, initial commit.
3. Rewrite `lib/siteConfig.ts` with the new brand block (brand, services, cities, reviews — wipe the Perfection Wraps reviews until the new client supplies real ones; never carry old reviews into a new brand).
4. Replace placeholder favicon, logo glyph in `components/Nav.tsx` and `components/Footer.tsx`, and `public/og.jpg` with TODO markers.
5. Update colors in `tailwind.config.ts` and the CSS variables in `app/globals.css` to match the new brand.
6. Run `@wrap-seo-researcher` across every service × city combo.
7. Run `@wrap-page-builder` for any briefs that need unique sections.
8. Set up Vercel + Supabase + Twilio for the new brand. Print the env-var block so Shafay can paste into the new Vercel project.
9. Print the manual checklist:
   - DNS pointing
   - GBP claim and category
   - A2P 10DLC brand + campaign registration
   - Photo shoot (hire automotive photographer)
   - GBP Place ID + write-review short link → into env
10. NEVER copy `.env.local`, `.vercel`, `.git`, or `public/media` from the source repo into the new one.

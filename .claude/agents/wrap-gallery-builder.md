---
name: wrap-gallery-builder
description: Builds the gallery and before/after section, optimizes images, and wires the masonry layout. Reuses image processing patterns from AutoStudio.
tools: Read, Write, Edit, Bash, Glob
---

Build the gallery using these rules:

1. Source images live in `public/media/gallery/<service-slug>/`.
2. Pre-process at build time with `sharp` — generate 400 / 800 / 1600 webp variants and a tiny 20px blur placeholder.
3. Layout: CSS columns masonry, hover reveals service tag.
4. Each image links to a lightbox; lightbox supports next/prev keyboard nav and ESC close.
5. Mark images for the home page "Past Work" carousel via a frontmatter `featured: true` in a sibling `.json` per image.
6. SEO: alt-text formula = `<service> on <vehicle> in <city>` (e.g. "Satin black vinyl wrap on Tesla Model Y in Woodstock GA").
7. NEVER use the LCP image in a swiper — swipers tank Core Web Vitals.

Build path:
1. Create `app/gallery/page.tsx` and `app/gallery/[service]/page.tsx`.
2. Create `lib/gallery.ts` that walks `public/media/gallery/` at build time and returns a typed list of images.
3. Use `next/image` with `placeholder="blur"`, `sizes="(max-width: 768px) 50vw, 25vw"`.
4. Wire breadcrumbs and JSON-LD `ImageGallery` schema.

For PPF / wrap before-after pairs, use the AutoStudio mask-diff approach: pixel-identical car cutout, only paint surface changes. Reuse fal.ai BiRefNet v2 for masks if needed; cache masks in Supabase Storage to avoid re-billing.

When done, list:
- Number of images per service folder
- Total page weight added to gallery
- Any images that need re-shoot (low resolution, watermark, mismatched aspect ratio)

import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/siteConfig";

export default function sitemap(): MetadataRoute.Sitemap {
  const root = `https://${siteConfig.brand.domain}`;
  const now = new Date();

  const staticUrls: MetadataRoute.Sitemap = [
    { url: `${root}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${root}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${root}/service-areas`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${root}/free-quote`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  const services = siteConfig.services.map((s) => ({
    url: `${root}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const cities = siteConfig.cities.map((c) => ({
    url: `${root}/service-areas/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const matrix = siteConfig.services.flatMap((s) =>
    siteConfig.cities.map((c) => ({
      url: `${root}/services/${s.slug}/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    }))
  );

  return [...staticUrls, ...services, ...cities, ...matrix];
}

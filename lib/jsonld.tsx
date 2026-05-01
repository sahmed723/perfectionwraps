import { siteConfig, type SiteCity, type SiteService } from "./siteConfig";

const ROOT = `https://${siteConfig.brand.domain}`;

const localBusinessBase = {
  "@type": "AutomotiveBusiness",
  "@id": `${ROOT}/#business`,
  name: siteConfig.brand.name,
  url: ROOT,
  telephone: siteConfig.brand.phoneTel,
  email: siteConfig.brand.email,
  priceRange: "$$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.brand.address.street,
    addressLocality: siteConfig.brand.address.city,
    addressRegion: siteConfig.brand.address.state,
    postalCode: siteConfig.brand.address.zip,
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: siteConfig.brand.address.lat,
    longitude: siteConfig.brand.address.lng,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "10:00",
      closes: "16:00",
    },
  ],
  sameAs: [siteConfig.brand.social.instagram, siteConfig.brand.social.facebook].filter(Boolean),
  areaServed: siteConfig.cities.map((c) => `${c.name}, ${siteConfig.brand.address.state}`),
};

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    ...localBusinessBase,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: siteConfig.services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name },
      })),
    },
  };
}

export function serviceJsonLd(service: SiteService, city?: SiteCity) {
  const inLocation = city ? ` in ${city.name}, ${siteConfig.brand.address.state}` : "";
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.name}${inLocation}`,
    description: service.hookLine,
    serviceType: service.name,
    provider: { "@id": `${ROOT}/#business` },
    areaServed: city
      ? { "@type": "City", name: `${city.name}, ${siteConfig.brand.address.state}` }
      : siteConfig.cities.map((c) => ({ "@type": "City", name: c.name })),
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: service.priceFrom,
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "USD",
        price: service.priceFrom,
        valueAddedTaxIncluded: false,
        description: `Starting from $${service.priceFrom.toLocaleString()}`,
      },
    },
  };
}

export function faqJsonLd(items: ReadonlyArray<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; href?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      ...(it.href ? { item: `${ROOT}${it.href}` } : {}),
    })),
  };
}

export function JsonLd({ data }: { data: object | object[] }) {
  const arr = Array.isArray(data) ? data : [data];
  return (
    <>
      {arr.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }}
        />
      ))}
    </>
  );
}

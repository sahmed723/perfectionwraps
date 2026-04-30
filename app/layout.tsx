import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";

const display = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://perfectionwraps.com"),
  title: {
    default: "Perfection Wraps · Atlanta Supercar Wraps, PPF & Ceramic",
    template: "%s · Perfection Wraps",
  },
  description:
    "Certified vehicle wraps, paint protection film, and ceramic coatings. Owner-operated studio in Woodstock, GA. Serving north metro Atlanta.",
  keywords: [
    "car wrap atlanta",
    "vehicle wrap woodstock",
    "PPF atlanta",
    "ceramic coating atlanta",
    "supercar wrap",
    "lamborghini wrap",
    "3M certified",
  ],
  openGraph: {
    title: "Perfection Wraps · Where Vinyl Meets Obsession",
    description:
      "Premium vehicle wraps, PPF, and ceramic coatings. Atlanta's supercar specialists.",
    type: "website",
    locale: "en_US",
    url: "https://perfectionwraps.com",
    siteName: "Perfection Wraps",
  },
  twitter: {
    card: "summary_large_image",
    title: "Perfection Wraps · Where Vinyl Meets Obsession",
    description:
      "Premium vehicle wraps, PPF, and ceramic coatings. Atlanta's supercar specialists.",
  },
  robots: { index: true, follow: true },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "AutomotiveBusiness",
  name: "Perfection Wraps",
  image: "https://perfectionwraps.com/og.jpg",
  url: "https://perfectionwraps.com",
  telephone: "+1-678-384-2956",
  priceRange: "$$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "503 Hickory Ridge Trail #170",
    addressLocality: "Woodstock",
    addressRegion: "GA",
    postalCode: "30188",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 34.1015,
    longitude: -84.5194,
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
  sameAs: ["https://www.instagram.com/perfectionwrapgraphics"],
  areaServed: [
    "Woodstock, GA",
    "Atlanta, GA",
    "Alpharetta, GA",
    "Canton, GA",
    "Cumming, GA",
    "Marietta, GA",
    "Roswell, GA",
    "Sandy Springs, GA",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Vinyl Wraps" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Paint Protection Film" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Ceramic Coating" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Window Tint" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Fleet Graphics" } },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={display.variable}>
      <body className="bg-ink text-bone font-display">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/siteConfig";
import { localBusinessJsonLd } from "@/lib/jsonld";

const display = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${siteConfig.brand.domain}`),
  title: {
    default: `${siteConfig.brand.name} · Atlanta Supercar Wraps, PPF & Ceramic`,
    template: `%s · ${siteConfig.brand.name}`,
  },
  description: `Certified vehicle wraps, paint protection film, and ceramic coatings. Owner-operated studio in ${siteConfig.brand.address.city}, ${siteConfig.brand.address.state}. Serving north metro Atlanta.`,
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
    title: `${siteConfig.brand.name} · ${siteConfig.brand.tagline}`,
    description: "Premium vehicle wraps, PPF, and ceramic coatings. Atlanta's supercar specialists.",
    type: "website",
    locale: "en_US",
    url: `https://${siteConfig.brand.domain}`,
    siteName: siteConfig.brand.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.brand.name} · ${siteConfig.brand.tagline}`,
    description: "Premium vehicle wraps, PPF, and ceramic coatings. Atlanta's supercar specialists.",
  },
  robots: { index: true, follow: true },
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
        />
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Suspense } from "react";
import { PageShell, SectionEyebrow } from "@/components/PageShell";
import { JsonLd, localBusinessJsonLd } from "@/lib/jsonld";
import QuoteForm from "@/components/QuoteForm";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Free Quote · 24-Hour Response",
  description:
    "Tell us about your vehicle and the work you want done. Free quote within 24 hours, often same day.",
  alternates: { canonical: "/free-quote" },
  robots: { index: true, follow: true },
};

export default function FreeQuote() {
  return (
    <PageShell>
      <JsonLd data={localBusinessJsonLd()} />
      <section className="px-4 md:px-8 pt-10 md:pt-14 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-12 md:gap-16">
          <div className="md:col-span-2">
            <SectionEyebrow index="QUOTE" label="Free, no commitment" />
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.95]">
              Get a <span className="giallo-text">quote.</span>
            </h1>
            <p className="mt-5 text-bone/60 text-base md:text-lg leading-relaxed">
              Tell us the vehicle, the work, and where you are. We respond within 24 hours — often same day.
            </p>
            <div className="mt-10 space-y-6 text-bone/75 text-sm">
              <div>
                <div className="text-[10px] tracking-[0.3em] font-mono text-bone/40 mb-2">
                  PREFER TO TALK?
                </div>
                <a
                  href={`tel:${siteConfig.brand.phoneTel}`}
                  className="text-2xl md:text-3xl font-black tracking-tight chrome-text"
                >
                  {siteConfig.brand.phone}
                </a>
              </div>
              <div>
                <div className="text-[10px] tracking-[0.3em] font-mono text-bone/40 mb-2">
                  VISIT THE SHOP
                </div>
                <div className="leading-relaxed">
                  {siteConfig.brand.address.street}
                  <br />
                  {siteConfig.brand.address.city}, {siteConfig.brand.address.state}{" "}
                  {siteConfig.brand.address.zip}
                </div>
              </div>
              <div>
                <div className="text-[10px] tracking-[0.3em] font-mono text-bone/40 mb-2">
                  HOURS
                </div>
                <div className="font-mono text-sm space-y-1">
                  <div className="flex justify-between max-w-[180px]">
                    <span>MON–FRI</span>
                    <span>9–6</span>
                  </div>
                  <div className="flex justify-between max-w-[180px]">
                    <span>SAT</span>
                    <span>10–4</span>
                  </div>
                  <div className="flex justify-between max-w-[180px]">
                    <span>SUN</span>
                    <span className="text-bone/40">CLOSED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="bg-ink2/50 border border-bone/5 p-6 md:p-8">
              <Suspense fallback={<div className="text-bone/40 text-sm">Loading…</div>}>
                <QuoteForm />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

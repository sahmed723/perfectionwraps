import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";
import { PageShell, Crumbs, SectionEyebrow } from "@/components/PageShell";
import { JsonLd, breadcrumbJsonLd, localBusinessJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Service Areas · North Metro Atlanta",
  description:
    "Perfection Wraps services Woodstock, Atlanta, Alpharetta, Canton, Cumming, Marietta, Roswell, and Sandy Springs from our Woodstock studio.",
  alternates: { canonical: "/service-areas" },
};

export default function ServiceAreasIndex() {
  return (
    <PageShell>
      <JsonLd
        data={[
          localBusinessJsonLd(),
          breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Service Areas" },
          ]),
        ]}
      />
      <section className="px-4 md:px-8 pt-10 md:pt-14 pb-16 md:pb-24 border-b border-bone/5">
        <div className="max-w-7xl mx-auto">
          <Crumbs trail={[{ href: "/", label: "Home" }, { label: "Service Areas" }]} />
          <SectionEyebrow index="MAP" label="North metro Atlanta" />
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.92] max-w-4xl">
            Eight cities.
            <br />
            <span className="giallo-text">One studio.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-bone/65 text-base md:text-lg leading-relaxed">
            We're headquartered in Woodstock and routinely serve {siteConfig.cities.length - 1} cities across north metro Atlanta. Pick yours below.
          </p>
        </div>
      </section>

      <section className="px-4 md:px-8 py-12 md:py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {siteConfig.cities.map((c) => (
            <a
              key={c.slug}
              href={`/service-areas/${c.slug}`}
              className="bg-ink2 border border-bone/5 hover:border-bone/30 p-5 md:p-6 transition group min-h-[140px] flex flex-col justify-between"
            >
              <div>
                <div className="text-[10px] tracking-[0.3em] font-mono text-bone/40">
                  {c.county.toUpperCase()} CO
                </div>
                <div className="text-2xl md:text-3xl font-black tracking-tight mt-1 flex items-baseline gap-2">
                  {c.name}
                  {c.hq && (
                    <span className="text-[9px] tracking-[0.25em] text-giallo font-mono">HQ</span>
                  )}
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-bone/5 text-[10px] font-mono tracking-[0.2em] text-bone/45 flex justify-between">
                <span>{c.drivetimeMin === 0 ? "WALK IN" : `${c.drivetimeMin} MIN`}</span>
                <span className="group-hover:text-giallo transition">→</span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";
import { PageShell, Crumbs, SectionEyebrow } from "@/components/PageShell";
import { JsonLd, breadcrumbJsonLd, localBusinessJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Services · Wraps, PPF, Ceramic & Tint",
  description:
    "Vinyl wraps, paint protection film, ceramic coating, window tint, fleet graphics, and architectural film — all installed in our certified Woodstock, GA studio.",
  alternates: { canonical: "/services" },
};

export default function ServicesIndex() {
  return (
    <PageShell>
      <JsonLd
        data={[
          localBusinessJsonLd(),
          breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Services" },
          ]),
        ]}
      />
      <section className="px-4 md:px-8 pt-10 md:pt-14 pb-16 md:pb-24 border-b border-bone/5">
        <div className="max-w-7xl mx-auto">
          <Crumbs trail={[{ href: "/", label: "Home" }, { label: "Services" }]} />
          <SectionEyebrow index="ALL" label="Services" />
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.92] max-w-4xl">
            Six disciplines.
            <br />
            <span className="text-bone/35">One bay.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-bone/65 text-base md:text-lg leading-relaxed">
            Everything we install at Perfection Wraps. Pick the discipline below for spec sheets, pricing, and city-specific availability.
          </p>
        </div>
      </section>

      <section className="px-4 md:px-8 py-12 md:py-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-bone/5">
          {siteConfig.services.map((s, i) => (
            <a
              key={s.slug}
              href={`/services/${s.slug}`}
              className="peel relative group bg-ink p-7 md:p-8 hover:bg-ink2 transition-colors min-h-[260px] flex flex-col justify-between"
            >
              <div>
                <div className="text-[10px] tracking-[0.3em] font-mono text-bone/40 mb-3">
                  {String(i + 1).padStart(2, "0")} / {s.shortName.toUpperCase()}
                </div>
                <div className="text-3xl md:text-4xl font-black tracking-tight">
                  {s.name}
                </div>
                <p className="mt-4 text-bone/60 text-sm md:text-base leading-relaxed">
                  {s.hookLine}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-bone/5 flex justify-between text-[10px] font-mono tracking-[0.25em] uppercase">
                <span className="text-giallo">FROM ${s.priceFrom.toLocaleString()}</span>
                <span className="text-bone/45 group-hover:text-bone group-hover:translate-x-1 transition-all">→</span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

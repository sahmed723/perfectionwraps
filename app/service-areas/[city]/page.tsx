import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig, getCity, nearbyCities } from "@/lib/siteConfig";
import { PageShell, Crumbs, SectionEyebrow, MidCTA } from "@/components/PageShell";
import {
  JsonLd,
  breadcrumbJsonLd,
  localBusinessJsonLd,
} from "@/lib/jsonld";

export function generateStaticParams() {
  return siteConfig.cities.map((c) => ({ city: c.slug }));
}

export function generateMetadata({ params }: { params: { city: string } }): Metadata {
  const city = getCity(params.city);
  if (!city) return {};
  const title = `Vehicle Wraps, PPF & Tint in ${city.name}, GA · ${siteConfig.brand.name}`;
  const description = `${siteConfig.brand.name} services ${city.name} (${city.county} County, pop. ${city.pop.toLocaleString()}) — ${city.drivetimeMin === 0 ? "headquartered here" : `${city.drivetimeMin} minutes from our Woodstock shop`}.`;
  return {
    title,
    description,
    alternates: { canonical: `/service-areas/${city.slug}` },
    openGraph: { title, description, type: "website" },
  };
}

export default function CityPage({ params }: { params: { city: string } }) {
  const city = getCity(params.city);
  if (!city) notFound();
  const nearby = nearbyCities(city.slug, 3);

  return (
    <PageShell>
      <JsonLd
        data={[
          localBusinessJsonLd(),
          breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Service Areas", href: "/service-areas" },
            { name: city.name },
          ]),
        ]}
      />

      <section className="px-4 md:px-8 pt-10 md:pt-14 pb-16 md:pb-24 border-b border-bone/5">
        <div className="max-w-7xl mx-auto">
          <Crumbs
            trail={[
              { href: "/", label: "Home" },
              { href: "/service-areas", label: "Service Areas" },
              { label: city.name },
            ]}
          />
          <SectionEyebrow index="LOC" label={`${city.county} County · GA`} />
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.92] max-w-4xl">
            Wraps & PPF
            <br />
            in <span className="giallo-text">{city.name}.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-bone/65 text-base md:text-lg leading-relaxed">
            {city.hq
              ? `${siteConfig.brand.name} is headquartered in ${city.name}. Walk-in consultations, in-shop installs, and certified work on ${siteConfig.services.length} categories of vehicle and architectural film.`
              : `Just ${city.drivetimeMin} minutes from our Woodstock studio. We serve ${city.name} (${city.county} County, population ${city.pop.toLocaleString()}) with full in-shop installs and mobile consultations.`}
          </p>

          <div className="mt-10 grid md:grid-cols-3 gap-6 md:gap-10 max-w-5xl">
            <div>
              <div className="text-[10px] tracking-[0.3em] font-mono text-bone/40 mb-1">
                COUNTY
              </div>
              <div className="text-2xl md:text-3xl font-black text-bone">{city.county}</div>
            </div>
            <div>
              <div className="text-[10px] tracking-[0.3em] font-mono text-bone/40 mb-1">
                POPULATION
              </div>
              <div className="text-2xl md:text-3xl font-black text-bone tabular-nums">
                {city.pop.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-[10px] tracking-[0.3em] font-mono text-bone/40 mb-1">
                DRIVE FROM SHOP
              </div>
              <div className="text-2xl md:text-3xl font-black text-bone">
                {city.drivetimeMin === 0 ? "WALK IN" : `${city.drivetimeMin} min`}
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-3">
            <a
              href={`/free-quote?city=${city.slug}`}
              className="inline-flex items-center justify-center bg-giallo text-ink px-8 py-4 font-black tracking-[0.18em] text-sm hover:bg-ambra transition"
            >
              GET QUOTE
            </a>
            <a
              href="tel:6783842956"
              className="inline-flex items-center justify-center border border-bone/30 px-8 py-4 font-black tracking-[0.18em] text-sm hover:border-bone hover:bg-bone/5 transition"
            >
              CALL 678.384.2956
            </a>
          </div>
        </div>
      </section>

      <section className="px-4 md:px-8 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <SectionEyebrow index="01" label={`Services in ${city.name}`} />
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-10 max-w-3xl">
            Six disciplines.{" "}
            <span className="text-bone/40">One bay.</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-bone/5">
            {siteConfig.services.map((s) => (
              <a
                key={s.slug}
                href={`/services/${s.slug}/${city.slug}`}
                className="peel relative group bg-ink p-7 md:p-8 hover:bg-ink2 transition-colors min-h-[200px] flex flex-col justify-between"
              >
                <div>
                  <div className="text-[10px] tracking-[0.3em] font-mono text-giallo mb-3">
                    {s.shortName.toUpperCase()}
                  </div>
                  <div className="text-2xl md:text-3xl font-black tracking-tight">
                    {s.name}
                  </div>
                  <p className="mt-3 text-bone/55 text-sm leading-relaxed">
                    {s.hookLine}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-bone/5 text-[10px] font-mono tracking-[0.2em] uppercase text-bone/45 flex justify-between">
                  <span>FROM ${s.priceFrom.toLocaleString()}</span>
                  <span className="text-giallo group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <MidCTA city={city.slug} />

      <section className="px-4 md:px-8 py-16 md:py-24 border-t border-bone/5">
        <div className="max-w-7xl mx-auto">
          <SectionEyebrow index="NEAR" label="Other cities we serve" />
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-10">
            Also working{" "}
            <span className="text-bone/40">around {city.name}.</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {nearby.map((c) => (
              <a
                key={c.slug}
                href={`/service-areas/${c.slug}`}
                className="bg-ink2 border border-bone/5 hover:border-bone/20 p-5 md:p-6 transition group"
              >
                <div className="text-[10px] tracking-[0.3em] font-mono text-bone/40">
                  {c.county.toUpperCase()} CO
                </div>
                <div className="text-xl md:text-2xl font-black tracking-tight mt-1">
                  {c.name}
                </div>
                <div className="mt-3 text-[10px] font-mono tracking-[0.2em] text-bone/45 group-hover:text-giallo transition">
                  {c.drivetimeMin} MIN FROM SHOP →
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

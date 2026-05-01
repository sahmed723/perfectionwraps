import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig, getService, relatedServices } from "@/lib/siteConfig";
import { PageShell, Crumbs, SectionEyebrow, FAQ, MidCTA } from "@/components/PageShell";
import {
  JsonLd,
  serviceJsonLd,
  faqJsonLd,
  breadcrumbJsonLd,
  localBusinessJsonLd,
} from "@/lib/jsonld";
import { Check } from "lucide-react";

export function generateStaticParams() {
  return siteConfig.services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = getService(params.slug);
  if (!service) return {};
  const title = `${service.name} in Atlanta · ${siteConfig.brand.name}`;
  const description = `${service.hookLine} Certified installer serving Woodstock and north metro Atlanta. From $${service.priceFrom.toLocaleString()}.`;
  return {
    title,
    description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: { title, description, type: "website" },
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = getService(params.slug);
  if (!service) notFound();

  const related = relatedServices(service.slug, 2);

  return (
    <PageShell>
      <JsonLd
        data={[
          localBusinessJsonLd(),
          serviceJsonLd(service),
          faqJsonLd(service.faq),
          breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Services", href: "/services" },
            { name: service.name },
          ]),
        ]}
      />

      <section className="px-4 md:px-8 pt-10 md:pt-14 pb-16 md:pb-24 border-b border-bone/5">
        <div className="max-w-7xl mx-auto">
          <Crumbs
            trail={[
              { href: "/", label: "Home" },
              { href: "/services", label: "Services" },
              { label: service.shortName },
            ]}
          />
          <SectionEyebrow index="SVC" label={service.slug} />
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.92] max-w-4xl">
            <span className="giallo-text">{service.name}</span>
            <br />
            <span className="text-bone/35">in north metro Atlanta.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-bone/65 text-base md:text-lg leading-relaxed">
            {service.hookLine}
          </p>

          <div className="mt-10 grid md:grid-cols-3 gap-6 md:gap-10 max-w-5xl">
            <div>
              <div className="text-[10px] tracking-[0.3em] font-mono text-bone/40 mb-1">
                STARTING AT
              </div>
              <div className="text-3xl md:text-4xl font-black text-giallo">
                ${service.priceFrom.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-[10px] tracking-[0.3em] font-mono text-bone/40 mb-1">
                LEAD TIME
              </div>
              <div className="text-3xl md:text-4xl font-black text-bone">
                {service.leadTimeDays} days
              </div>
            </div>
            <div>
              <div className="text-[10px] tracking-[0.3em] font-mono text-bone/40 mb-1">
                BRANDS RUN
              </div>
              <div className="text-base md:text-lg font-mono text-bone/80 leading-snug">
                {service.brands.join(" · ")}
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-3">
            <a
              href={`/free-quote?service=${service.slug}`}
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
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20">
          <div>
            <SectionEyebrow index="01" label="What you get" />
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">
              Spec sheet. <span className="text-bone/40">Not marketing.</span>
            </h2>
            <ul className="mt-8 space-y-4">
              {service.bullets.map((b) => (
                <li key={b} className="flex gap-3 items-start text-bone/80 text-base md:text-lg leading-relaxed">
                  <Check className="text-giallo shrink-0 mt-1" size={18} strokeWidth={2.5} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <SectionEyebrow index="02" label="Where we install" />
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">
              We come to <span className="giallo-text">you.</span>
            </h2>
            <p className="mt-4 text-bone/55 text-sm md:text-base max-w-md leading-relaxed">
              In-shop installs at our Woodstock studio. Mobile consults across north metro Atlanta.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-y-2 gap-x-6 text-sm font-mono tracking-[0.12em]">
              {siteConfig.cities.map((c) => (
                <a
                  key={c.slug}
                  href={`/services/${service.slug}/${c.slug}`}
                  className="flex items-center gap-2 text-bone/65 hover:text-bone transition"
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${c.hq ? "bg-giallo" : "bg-bone/30"}`} />
                  <span>{c.name.toUpperCase()}</span>
                  {c.hq && <span className="text-[9px] tracking-[0.25em] text-giallo">HQ</span>}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <MidCTA service={service.slug} />

      <FAQ items={service.faq.map((f) => ({ q: f.q, a: f.a }))} />

      <section className="px-4 md:px-8 py-16 md:py-24 border-t border-bone/5">
        <div className="max-w-7xl mx-auto">
          <SectionEyebrow index="MORE" label="Stack the protection" />
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-10">
            Pair with{" "}
            <span className="text-bone/40">complementary work.</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-3 md:gap-4">
            {related.map((s) => (
              <a
                key={s.slug}
                href={`/services/${s.slug}`}
                className="peel relative group bg-ink2 border border-bone/5 p-7 hover:bg-ink2/70 transition-colors block"
              >
                <div className="text-[10px] tracking-[0.3em] font-mono text-giallo mb-3">
                  ALSO OFFER
                </div>
                <div className="text-2xl md:text-3xl font-black tracking-tight">
                  {s.name}
                </div>
                <p className="mt-3 text-bone/55 text-sm leading-relaxed">{s.hookLine}</p>
                <div className="mt-5 text-[10px] tracking-[0.25em] font-mono text-bone/45">
                  FROM ${s.priceFrom.toLocaleString()} →
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

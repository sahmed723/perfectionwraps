import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  siteConfig,
  getService,
  getCity,
  nearbyCities,
  relatedServices,
} from "@/lib/siteConfig";
import { PageShell, Crumbs, SectionEyebrow, FAQ, MidCTA } from "@/components/PageShell";
import {
  JsonLd,
  serviceJsonLd,
  faqJsonLd,
  breadcrumbJsonLd,
  localBusinessJsonLd,
} from "@/lib/jsonld";
import { Check, MapPin, Clock } from "lucide-react";

export function generateStaticParams() {
  return siteConfig.services.flatMap((s) =>
    siteConfig.cities.map((c) => ({ slug: s.slug, city: c.slug }))
  );
}

export function generateMetadata({
  params,
}: {
  params: { slug: string; city: string };
}): Metadata {
  const service = getService(params.slug);
  const city = getCity(params.city);
  if (!service || !city) return {};
  const title = `${service.name} in ${city.name}, GA · ${siteConfig.brand.name}`;
  const description = `${service.name} in ${city.name}, ${city.county} County. ${service.hookLine} From $${service.priceFrom.toLocaleString()}, ${service.leadTimeDays} day turnaround.`;
  return {
    title,
    description,
    alternates: { canonical: `/services/${service.slug}/${city.slug}` },
    openGraph: { title, description, type: "website" },
  };
}

const cityIntros: Record<string, string> = {
  woodstock: "We're headquartered here. Walk in any weekday and see the work in progress.",
  atlanta: "45 minutes from downtown. Perfect for owners who want their car wrapped by a certified shop, not a body-shop side hustle.",
  alpharetta: "25 minutes up GA-400. We've wrapped Teslas, Cybertrucks, G-Wagons, and Porsches from Avalon to Halcyon.",
  canton: "15 minutes from our shop. Closest certified wrap installer to Cherokee County's automotive enthusiasts.",
  cumming: "30 minutes via GA-400. Forsyth County customers consistently choose us over the closer GHL-templated competitors.",
  marietta: "25 minutes via I-575. Fleet, exotic, and personal vehicles welcome.",
  roswell: "30 minutes east. Over 60 Roswell vehicles wrapped, ceramic-coated, or PPF'd in the last three years.",
  "sandy-springs": "35 minutes south. North-side Sandy Springs owners drive up to skip the inside-the-perimeter wait times.",
};

export default function ServiceCityPage({
  params,
}: {
  params: { slug: string; city: string };
}) {
  const service = getService(params.slug);
  const city = getCity(params.city);
  if (!service || !city) notFound();

  const nearby = nearbyCities(city.slug, 3);
  const related = relatedServices(service.slug, 2);
  const intro =
    cityIntros[city.slug] ||
    `${city.drivetimeMin} minutes from our Woodstock studio in ${city.county} County.`;

  return (
    <PageShell>
      <JsonLd
        data={[
          localBusinessJsonLd(),
          serviceJsonLd(service, city),
          faqJsonLd(service.faq),
          breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: service.name, href: `/services/${service.slug}` },
            { name: city.name },
          ]),
        ]}
      />

      <section className="px-4 md:px-8 pt-10 md:pt-14 pb-16 md:pb-24 border-b border-bone/5">
        <div className="max-w-7xl mx-auto">
          <Crumbs
            trail={[
              { href: "/", label: "Home" },
              { href: `/services/${service.slug}`, label: service.shortName },
              { label: city.name },
            ]}
          />
          <SectionEyebrow index="GEO" label={`${service.slug} · ${city.slug}`} />
          <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-black tracking-tighter leading-[0.92] max-w-5xl">
            <span className="giallo-text">{service.name}</span>
            <br />
            <span className="text-bone/35">in {city.name}, GA.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-bone/65 text-base md:text-lg leading-relaxed">
            {service.hookLine}
          </p>
          <p className="mt-3 max-w-2xl text-bone/50 text-sm md:text-base leading-relaxed">
            {intro}
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
                TURNAROUND
              </div>
              <div className="text-3xl md:text-4xl font-black text-bone">
                {service.leadTimeDays} days
              </div>
            </div>
            <div>
              <div className="text-[10px] tracking-[0.3em] font-mono text-bone/40 mb-1">
                FROM {city.name.toUpperCase()}
              </div>
              <div className="text-3xl md:text-4xl font-black text-bone">
                {city.drivetimeMin === 0 ? "0 min" : `${city.drivetimeMin} min`}
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-3">
            <a
              href={`/free-quote?service=${service.slug}&city=${city.slug}`}
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
            <SectionEyebrow index="01" label={`Why ${city.name} owners pick us`} />
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">
              Real shop. <span className="text-bone/40">Real bay.</span>
            </h2>
            <ul className="mt-8 space-y-4">
              {service.bullets.map((b) => (
                <li
                  key={b}
                  className="flex gap-3 items-start text-bone/80 text-base md:text-lg leading-relaxed"
                >
                  <Check className="text-giallo shrink-0 mt-1" size={18} strokeWidth={2.5} />
                  <span>{b}</span>
                </li>
              ))}
              <li className="flex gap-3 items-start text-bone/80 text-base md:text-lg leading-relaxed">
                <Check className="text-giallo shrink-0 mt-1" size={18} strokeWidth={2.5} />
                <span>
                  {city.drivetimeMin === 0
                    ? `Walk in directly — we are in ${city.name}.`
                    : `Mobile consults across ${city.county} County.`}
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-ink2/50 border border-bone/5 p-6 md:p-8">
            <SectionEyebrow index="02" label="The visit" />
            <h3 className="text-2xl md:text-3xl font-black tracking-tight">
              From {city.name}, here's the trip.
            </h3>
            <div className="mt-6 space-y-5">
              <div className="flex items-start gap-3">
                <MapPin className="text-giallo shrink-0 mt-0.5" size={18} />
                <div>
                  <div className="text-[10px] tracking-[0.25em] font-mono text-bone/40">SHOP</div>
                  <div className="text-bone text-sm leading-relaxed">
                    {siteConfig.brand.address.street}
                    <br />
                    {siteConfig.brand.address.city}, {siteConfig.brand.address.state}{" "}
                    {siteConfig.brand.address.zip}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="text-giallo shrink-0 mt-0.5" size={18} />
                <div>
                  <div className="text-[10px] tracking-[0.25em] font-mono text-bone/40">
                    DRIVE TIME
                  </div>
                  <div className="text-bone text-sm">
                    ~{city.drivetimeMin} minutes from {city.name}
                  </div>
                </div>
              </div>
            </div>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(
                `${siteConfig.brand.address.street}, ${siteConfig.brand.address.city}, ${siteConfig.brand.address.state}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block text-[11px] tracking-[0.25em] font-mono text-giallo hover:underline"
            >
              OPEN IN GOOGLE MAPS →
            </a>
          </div>
        </div>
      </section>

      <MidCTA service={service.slug} city={city.slug} />

      <FAQ items={service.faq.map((f) => ({ q: f.q, a: f.a }))} />

      <section className="px-4 md:px-8 py-16 md:py-24 border-t border-bone/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20">
          <div>
            <SectionEyebrow index="NEAR" label="Same service, nearby cities" />
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-8">
              {service.name} around{" "}
              <span className="text-bone/40">{city.name}.</span>
            </h2>
            <ul className="space-y-2">
              {nearby.map((c) => (
                <li key={c.slug}>
                  <a
                    href={`/services/${service.slug}/${c.slug}`}
                    className="group flex items-center justify-between border-b border-bone/5 hover:border-bone/20 py-3 text-bone/80 hover:text-bone transition"
                  >
                    <span className="font-bold tracking-tight">
                      {service.name} in {c.name}
                    </span>
                    <span className="text-[10px] font-mono tracking-[0.2em] text-bone/40 group-hover:text-giallo">
                      {c.drivetimeMin} MIN →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <SectionEyebrow index="MORE" label="Other services in this city" />
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-8">
              Stack with{" "}
              <span className="giallo-text">protection.</span>
            </h2>
            <ul className="space-y-2">
              {related.map((s) => (
                <li key={s.slug}>
                  <a
                    href={`/services/${s.slug}/${city.slug}`}
                    className="group flex items-center justify-between border-b border-bone/5 hover:border-bone/20 py-3 text-bone/80 hover:text-bone transition"
                  >
                    <span className="font-bold tracking-tight">
                      {s.name} in {city.name}
                    </span>
                    <span className="text-[10px] font-mono tracking-[0.2em] text-bone/40 group-hover:text-giallo">
                      FROM ${s.priceFrom.toLocaleString()} →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

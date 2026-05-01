import Nav from "./Nav";
import Footer from "./Footer";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-ink min-h-screen relative overflow-x-hidden scanline">
      <Nav />
      <div className="pt-14 md:pt-16">{children}</div>
      <Footer />
    </main>
  );
}

export function Crumbs({ trail }: { trail: { href?: string; label: string }[] }) {
  return (
    <nav
      className="text-[10px] tracking-[0.25em] font-mono text-bone/40 mb-6"
      aria-label="Breadcrumb"
    >
      {trail.map((t, i) => (
        <span key={i}>
          {t.href ? (
            <a href={t.href} className="hover:text-bone/70 transition">
              {t.label.toUpperCase()}
            </a>
          ) : (
            <span className="text-bone/70">{t.label.toUpperCase()}</span>
          )}
          {i < trail.length - 1 && <span className="mx-2 text-bone/20">/</span>}
        </span>
      ))}
    </nav>
  );
}

export function SectionEyebrow({ index, label }: { index: string; label: string }) {
  return (
    <div className="text-[11px] tracking-[0.4em] font-mono text-giallo mb-3">
      {index} / {label.toUpperCase()}
    </div>
  );
}

export function FAQ({ items }: { items: { q: string; a: string }[] }) {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 border-t border-bone/5">
      <div className="max-w-4xl mx-auto">
        <SectionEyebrow index="FAQ" label="Common questions" />
        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-10">
          Things <span className="text-bone/40">you might ask.</span>
        </h2>
        <div className="divide-y divide-bone/5 border-y border-bone/5">
          {items.map((item, i) => (
            <details key={i} className="group py-5 px-1">
              <summary className="cursor-pointer flex items-start justify-between gap-6 list-none">
                <span className="text-bone font-bold tracking-tight text-base md:text-lg pr-6">
                  {item.q}
                </span>
                <span className="text-giallo text-2xl font-mono leading-none mt-1 group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <p className="mt-3 text-bone/65 leading-relaxed text-sm md:text-base max-w-3xl">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MidCTA({
  service,
  city,
}: {
  service?: string;
  city?: string;
}) {
  const params = new URLSearchParams();
  if (service) params.set("service", service);
  if (city) params.set("city", city);
  const href = `/free-quote${params.toString() ? `?${params}` : ""}`;
  return (
    <section className="py-14 md:py-20 px-4 md:px-8 border-y border-bone/5 bg-ink2/40">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h3 className="text-2xl md:text-4xl font-black tracking-tight">
            Ready to <span className="giallo-text">book?</span>
          </h3>
          <p className="mt-2 text-bone/55 text-sm md:text-base max-w-md">
            Free quotes within 24 hours. Mobile consults available across north metro Atlanta.
          </p>
        </div>
        <div className="flex gap-3">
          <a
            href={href}
            className="inline-flex items-center justify-center bg-giallo text-ink px-6 py-3 font-black tracking-[0.18em] text-sm hover:bg-ambra transition"
          >
            FREE QUOTE
          </a>
          <a
            href="tel:6783842956"
            className="inline-flex items-center justify-center border border-bone/30 px-6 py-3 font-black tracking-[0.18em] text-sm hover:border-bone hover:bg-bone/5 transition"
          >
            CALL NOW
          </a>
        </div>
      </div>
    </section>
  );
}

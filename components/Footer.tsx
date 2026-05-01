import { siteConfig } from "@/lib/siteConfig";

export default function Footer() {
  const [first, ...rest] = siteConfig.brand.name.split(" ");
  const second = rest.join(" ");

  return (
    <footer className="px-4 md:px-8 py-14 md:py-20 border-t border-bone/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-5 gap-10 md:gap-8">
          <div className="md:col-span-2">
            <div className="text-bone font-black text-lg tracking-[0.18em] uppercase">
              {first}
              {second && <span className="text-giallo">{second}</span>}
            </div>
            <p className="mt-4 text-bone/50 text-sm leading-relaxed max-w-xs">
              Atlanta's certified studio for vehicle wraps, paint protection film, and ceramic coating. Owner-operated. Insured.
            </p>
            <div className="mt-6 text-[10px] font-mono tracking-[0.2em] text-bone/30">
              EST. {siteConfig.brand.foundedYear} · {siteConfig.brand.address.city.toUpperCase()},{" "}
              {siteConfig.brand.address.state}
            </div>
          </div>

          <div>
            <div className="text-[10px] tracking-[0.3em] font-mono text-bone/40 mb-4">
              SERVICES
            </div>
            <ul className="space-y-2 text-bone/75 text-sm">
              {siteConfig.services.map((s) => (
                <li key={s.slug}>
                  <a href={`/services/${s.slug}`} className="hover:text-bone transition">
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-[10px] tracking-[0.3em] font-mono text-bone/40 mb-4">AREA</div>
            <ul className="space-y-2 text-bone/75 text-sm">
              {siteConfig.cities.map((c) => (
                <li key={c.slug}>
                  <a
                    href={`/service-areas/${c.slug}`}
                    className="hover:text-bone transition"
                  >
                    {c.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-[10px] tracking-[0.3em] font-mono text-bone/40 mb-4">VISIT</div>
            <div className="text-bone/80 text-sm leading-relaxed">
              {siteConfig.brand.address.street}
              <br />
              {siteConfig.brand.address.city}, {siteConfig.brand.address.state}{" "}
              {siteConfig.brand.address.zip}
            </div>
            <div className="mt-5 text-[10px] tracking-[0.3em] font-mono text-bone/40 mb-2">
              HOURS
            </div>
            <div className="text-bone/80 text-sm leading-relaxed font-mono space-y-1">
              <div className="flex justify-between">
                <span>MON–FRI</span>
                <span>9–6</span>
              </div>
              <div className="flex justify-between">
                <span>SAT</span>
                <span>10–4</span>
              </div>
              <div className="flex justify-between">
                <span>SUN</span>
                <span className="text-bone/40">CLOSED</span>
              </div>
            </div>
            <a
              href={`tel:${siteConfig.brand.phoneTel}`}
              className="mt-5 inline-block text-giallo text-sm font-mono tracking-[0.15em] hover:underline"
            >
              {siteConfig.brand.phone.replace(/-/g, ".")}
            </a>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-bone/5 flex flex-col md:flex-row justify-between gap-3 text-[10px] font-mono tracking-[0.2em] text-bone/30">
          <div>
            © {new Date().getFullYear()} {siteConfig.brand.legal.toUpperCase()}. ALL RIGHTS
            RESERVED.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-bone/60">
              PRIVACY
            </a>
            <a href="#" className="hover:text-bone/60">
              TERMS
            </a>
            <a href="#" className="hover:text-bone/60">
              WARRANTY
            </a>
            <a href="/shop" className="hover:text-bone/60">
              SHOP LOGIN
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { Wrench, Shield, Droplet, Sun, Truck, Building2 } from "lucide-react";

const services = [
  {
    icon: Wrench,
    title: "Vinyl Wraps",
    spec: "Full-vehicle color change. 5–7yr warranty. 3M / Avery / Inozetek certified.",
    line: "Full color change · partial wraps · accents",
  },
  {
    icon: Shield,
    title: "Paint Protection Film",
    spec: "Self-healing 8mil urethane. 10yr clarity warranty. XPEL & SunTek.",
    line: "Front-end · track pack · full-body PPF",
  },
  {
    icon: Droplet,
    title: "Ceramic Coating",
    spec: "9H hardness. Hydrophobic. 2–7 year service life depending on package.",
    line: "Single stage · multi-layer · graphene",
  },
  {
    icon: Sun,
    title: "Window Tint",
    spec: "Llumar CTX ceramic. 99% UV rejection. Lifetime warranty.",
    line: "Auto · residential · commercial",
  },
  {
    icon: Truck,
    title: "Fleet Graphics",
    spec: "Vehicle livery, partial wraps, perforated window decals at scale.",
    line: "From single vans to 50+ unit deployments",
  },
  {
    icon: Building2,
    title: "Architectural",
    spec: "Wall murals, glass frosting, retail interiors, restaurant graphics.",
    line: "Storefronts · interiors · signage",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-28 px-4 md:px-8 border-y border-bone/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 md:mb-14">
          <div className="text-[11px] tracking-[0.4em] font-mono text-giallo mb-3">03 / SERVICES</div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight max-w-3xl">
            Six disciplines. <span className="text-bone/40">One bay.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-bone/5">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="peel relative bg-ink p-7 md:p-8 hover:bg-ink2 transition-colors min-h-[220px] flex flex-col justify-between"
              >
                <div>
                  <Icon className="text-giallo" size={22} strokeWidth={1.5} />
                  <h3 className="mt-5 text-2xl md:text-3xl font-black tracking-tight">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-bone/55 text-sm leading-relaxed">{s.spec}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-bone/5 text-[10px] font-mono tracking-[0.2em] uppercase text-bone/40">
                  {s.line}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

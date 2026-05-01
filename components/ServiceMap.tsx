import { siteConfig } from "@/lib/siteConfig";

const VIEW = 500;
const PAD = 60;

function projectCities() {
  const lats = siteConfig.cities.map((c) => c.lat);
  const lngs = siteConfig.cities.map((c) => c.lng);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  const dLat = maxLat - minLat || 1;
  const dLng = maxLng - minLng || 1;

  return siteConfig.cities.map((c) => ({
    ...c,
    x: PAD + ((c.lng - minLng) / dLng) * (VIEW - 2 * PAD),
    y: PAD + ((maxLat - c.lat) / dLat) * (VIEW - 2 * PAD),
  }));
}

export default function ServiceMap() {
  const cities = projectCities();
  const hq = cities.find((c) => c.hq);

  return (
    <section id="area" className="py-20 md:py-28 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div>
          <div className="text-[11px] tracking-[0.4em] font-mono text-giallo mb-3">06 / AREA</div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight">
            North Metro <span className="giallo-text">Atlanta.</span>
          </h2>
          <p className="mt-6 text-bone/60 text-base md:text-lg max-w-md leading-relaxed">
            Headquartered in {siteConfig.brand.address.city}. We service{" "}
            {siteConfig.cities.length} cities across north metro Atlanta with mobile consults and full in-shop installs.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-y-3 gap-x-6 text-sm font-mono tracking-[0.12em]">
            {cities.map((c) => (
              <a
                key={c.slug}
                href={`/service-areas/${c.slug}`}
                className="flex items-center gap-2 hover:text-bone transition"
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    c.hq ? "bg-giallo" : "bg-bone/30"
                  }`}
                />
                <span className={c.hq ? "text-bone font-black" : "text-bone/65"}>
                  {c.name.toUpperCase()}
                </span>
                {c.hq && (
                  <span className="text-[9px] tracking-[0.25em] text-giallo">HQ</span>
                )}
              </a>
            ))}
          </div>
          <a
            href="/service-areas"
            className="mt-8 inline-block text-[11px] tracking-[0.25em] font-mono text-giallo hover:underline"
          >
            ALL SERVICE AREAS →
          </a>
        </div>

        <div className="relative aspect-square w-full max-w-md mx-auto md:mx-0 md:ml-auto">
          <svg viewBox={`0 0 ${VIEW} ${VIEW}`} className="w-full h-full">
            <defs>
              <radialGradient id="map-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFD700" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
              </radialGradient>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path
                  d="M 20 0 L 0 0 0 20"
                  fill="none"
                  stroke="#ffffff"
                  strokeOpacity="0.03"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width={VIEW} height={VIEW} fill="url(#grid)" />
            {hq && <circle cx={hq.x} cy={hq.y} r="180" fill="url(#map-glow)" />}

            {cities.map((c) => (
              <g key={c.slug}>
                {c.hq ? (
                  <>
                    <circle cx={c.x} cy={c.y} r="22" fill="#FFD700" opacity="0.12">
                      <animate
                        attributeName="r"
                        values="14;28;14"
                        dur="2.5s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.25;0;0.25"
                        dur="2.5s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle cx={c.x} cy={c.y} r="6" fill="#FFD700" />
                  </>
                ) : (
                  <>
                    <circle cx={c.x} cy={c.y} r="12" fill="#FFD700" opacity="0.06">
                      <animate
                        attributeName="r"
                        values="6;14;6"
                        dur="3s"
                        repeatCount="indefinite"
                        begin={`${(c.lat % 1) * 2}s`}
                      />
                    </circle>
                    <circle cx={c.x} cy={c.y} r="3" fill="#f5f4ef" opacity="0.7" />
                  </>
                )}
                <text
                  x={c.x + 10}
                  y={c.y + 4}
                  fontSize="10"
                  fontFamily="ui-monospace, monospace"
                  letterSpacing="0.1em"
                  fill={c.hq ? "#FFD700" : "#f5f4ef"}
                  opacity={c.hq ? 1 : 0.55}
                >
                  {c.name.toUpperCase()}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    </section>
  );
}

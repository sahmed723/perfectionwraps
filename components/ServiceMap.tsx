const cities = [
  { name: "Woodstock", x: 215, y: 220, hq: true },
  { name: "Canton", x: 195, y: 175, hq: false },
  { name: "Cumming", x: 290, y: 175, hq: false },
  { name: "Alpharetta", x: 290, y: 230, hq: false },
  { name: "Roswell", x: 280, y: 270, hq: false },
  { name: "Marietta", x: 215, y: 290, hq: false },
  { name: "Sandy Springs", x: 280, y: 305, hq: false },
  { name: "Atlanta", x: 270, y: 360, hq: false },
];

export default function ServiceMap() {
  return (
    <section id="area" className="py-20 md:py-28 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div>
          <div className="text-[11px] tracking-[0.4em] font-mono text-giallo mb-3">06 / AREA</div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight">
            North Metro <span className="giallo-text">Atlanta.</span>
          </h2>
          <p className="mt-6 text-bone/60 text-base md:text-lg max-w-md leading-relaxed">
            Headquartered in Woodstock. We service eight cities across north metro Atlanta with mobile consults and full in-shop installs.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-y-3 gap-x-6 text-sm font-mono tracking-[0.12em]">
            {cities.map((c) => (
              <div key={c.name} className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${c.hq ? "bg-giallo" : "bg-bone/30"}`} />
                <span className={c.hq ? "text-bone font-black" : "text-bone/65"}>
                  {c.name.toUpperCase()}
                </span>
                {c.hq && (
                  <span className="text-[9px] tracking-[0.25em] text-giallo">HQ</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="relative aspect-square w-full max-w-md mx-auto md:mx-0 md:ml-auto">
          <svg viewBox="0 0 500 500" className="w-full h-full">
            <defs>
              <radialGradient id="map-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFD700" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
              </radialGradient>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#ffffff" strokeOpacity="0.03" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="500" height="500" fill="url(#grid)" />
            <circle cx="215" cy="220" r="180" fill="url(#map-glow)" />

            <path
              d="M 100 150 Q 250 130 400 200 T 460 380 T 200 420 T 80 280 Z"
              fill="none"
              stroke="#FFD700"
              strokeOpacity="0.18"
              strokeWidth="1"
              strokeDasharray="3 5"
            />

            {cities.map((c) => (
              <g key={c.name}>
                {c.hq && (
                  <>
                    <circle cx={c.x} cy={c.y} r="22" fill="#FFD700" opacity="0.12">
                      <animate attributeName="r" values="14;28;14" dur="2.5s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.25;0;0.25" dur="2.5s" repeatCount="indefinite" />
                    </circle>
                    <circle cx={c.x} cy={c.y} r="6" fill="#FFD700" />
                  </>
                )}
                {!c.hq && (
                  <>
                    <circle cx={c.x} cy={c.y} r="12" fill="#FFD700" opacity="0.06">
                      <animate attributeName="r" values="6;14;6" dur="3s" repeatCount="indefinite" begin={`${Math.random() * 2}s`} />
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

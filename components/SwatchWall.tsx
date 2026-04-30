const tiles = [
  { label: "Gloss Black", code: "3M 2080-G12", cls: "tile-gloss-black", textDark: false },
  { label: "Satin White", code: "3M 1080-S10", cls: "tile-satin-white", textDark: true },
  { label: "Liquid Chrome", code: "Avery SF100", cls: "tile-liquid-chrome", textDark: true },
  { label: "Matte Military", code: "3M 1080-M26", cls: "tile-matte-green", textDark: false },
  { label: "Color Shift", code: "Inozetek MPB", cls: "tile-color-shift", textDark: false },
  { label: "Carbon Fiber", code: "3M 2080-CFS12", cls: "tile-carbon", textDark: false },
  { label: "Brushed Steel", code: "3M 2080-BR201", cls: "tile-brushed-steel", textDark: true },
  { label: "Liquid Metal Red", code: "Avery SW900-462", cls: "tile-metal-red", textDark: false },
  { label: "Stealth Grey", code: "3M 1080-S261", cls: "tile-stealth-grey", textDark: false },
  { label: "Pearlescent White", code: "3M 1080-GP10", cls: "tile-pearl-white", textDark: true },
  { label: "Forest Green", code: "3M 1080-G336", cls: "tile-forest", textDark: false },
  { label: "Rose Gold", code: "Avery SW900-251", cls: "tile-rose-gold", textDark: false },
];

export default function SwatchWall() {
  return (
    <section id="wraps" className="py-20 md:py-28 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10 md:mb-14 gap-6 flex-wrap">
          <div>
            <div className="text-[11px] tracking-[0.4em] font-mono text-giallo mb-3">02 / FINISHES</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight max-w-2xl">
              Every <span className="giallo-text">finish</span> we run.
              <br />
              <span className="text-bone/40">Touch the surface.</span>
            </h2>
          </div>
          <p className="text-bone/55 text-sm md:text-base max-w-md leading-relaxed">
            We exclusively install certified 3M, Avery Dennison, and Inozetek vinyl. Each finish carries a 5–7 year manufacturer warranty.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {tiles.map((t) => (
            <button
              key={t.label}
              className={`tile-light-sweep relative overflow-hidden aspect-[4/3] group transition-transform duration-300 hover:-translate-y-1 ${t.cls}`}
            >
              <div className="absolute inset-0 grain opacity-[0.08] mix-blend-overlay" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/5" />
              <div className={`absolute bottom-0 inset-x-0 p-3 md:p-4 text-left ${
                t.textDark ? "text-ink" : "text-bone"
              }`}>
                <div className="text-[10px] md:text-[11px] tracking-[0.25em] font-mono opacity-70">
                  {t.code}
                </div>
                <div className="text-sm md:text-lg font-black tracking-tight mt-0.5">
                  {t.label}
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-10 text-[11px] font-mono tracking-[0.2em] text-bone/40 text-center">
          + 200 MORE COLORWAYS IN-SHOP &middot; CALL FOR SPECIAL ORDER
        </div>
      </div>
    </section>
  );
}

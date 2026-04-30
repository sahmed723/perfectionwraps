const steps = [
  { code: "STEP 01", title: "CONSULT", duration: "30 MIN", desc: "Walkthrough of finish, coverage, color match, and quote." },
  { code: "STEP 02", title: "PREP", duration: "2–4 HRS", desc: "Two-stage decon wash, clay, IPA wipe, panel disassembly." },
  { code: "STEP 03", title: "WRAP", duration: "2–5 DAYS", desc: "Hand-laid vinyl. Heat-set. Edge-sealed. Single-piece panels." },
  { code: "STEP 04", title: "CURE", duration: "12–24 HRS", desc: "Climate-controlled cure bay. Adhesive bond stabilizes." },
  { code: "STEP 05", title: "INSPECT", duration: "60 MIN", desc: "Owner walkthrough. Aftercare brief. Documentation." },
];

export default function Timeline() {
  return (
    <section id="process" className="py-20 md:py-28 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 md:mb-14">
          <div className="text-[11px] tracking-[0.4em] font-mono text-giallo mb-3">04 / PROCESS</div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight max-w-2xl">
            Five steps. <span className="text-bone/40">No shortcuts.</span>
          </h2>
        </div>

        <div className="overflow-x-auto hide-scrollbar -mx-4 md:mx-0 px-4 md:px-0">
          <div className="flex md:grid md:grid-cols-5 gap-3 md:gap-4 min-w-max md:min-w-0">
            {steps.map((s, i) => (
              <div
                key={s.title}
                className="relative bg-ink2 border border-bone/5 p-5 md:p-6 w-[260px] md:w-auto"
              >
                <div className="absolute top-0 right-0 px-2 py-1 bg-giallo text-ink text-[9px] font-black tracking-[0.18em] font-mono">
                  {s.duration}
                </div>
                <div className="text-[10px] tracking-[0.3em] font-mono text-bone/40">
                  {s.code}
                </div>
                <div className="mt-2 text-2xl md:text-3xl font-black tracking-tight">
                  {s.title}
                </div>
                <div className="mt-4 h-px bg-bone/10" />
                <p className="mt-4 text-bone/55 text-sm leading-relaxed">{s.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-px bg-bone/15" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

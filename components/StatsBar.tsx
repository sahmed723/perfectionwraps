"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 500, suffix: "+", label: "Vehicles Wrapped" },
  { value: 7, suffix: "yr", label: "Wrap Lifespan", prefix: "5–" },
  { value: 3, suffix: "M", label: "Certified Installer" },
  { value: 8, suffix: "", label: "Cities Served" },
];

function CountUp({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      const dur = 1100;
      const start = performance.now();
      const tick = (t: number) => {
        const k = Math.min(1, (t - start) / dur);
        const eased = 1 - Math.pow(1 - k, 3);
        setN(Math.round(value * eased));
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      obs.disconnect();
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{n}{suffix}
    </span>
  );
}

export default function StatsBar() {
  return (
    <section className="border-y border-bone/5 bg-ink2/50">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={i}
            className={`px-6 py-8 md:py-10 ${i < stats.length - 1 ? "md:border-r" : ""} ${
              i % 2 === 0 ? "border-r" : ""
            } md:border-r border-bone/5 ${i < 2 ? "border-b md:border-b-0" : ""}`}
          >
            <div className="text-3xl md:text-5xl font-black text-bone">
              <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
            </div>
            <div className="mt-2 text-[10px] md:text-[11px] tracking-[0.25em] uppercase font-mono text-bone/50">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

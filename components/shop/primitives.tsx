"use client";

import { useEffect, useRef, useState } from "react";
import type { WorkflowStatus } from "@/data/shop/orders";
import { STATUS_LABELS, STATUS_VAR } from "@/data/shop/orders";
import type { OrderTag } from "@/data/shop/orders";
import type { Customer } from "@/data/shop/customers";
import { customerInitials } from "@/data/shop/helpers";

export function Card({
  children,
  className = "",
  hover = false,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`rounded-xl border ${
        hover ? "transition-all duration-150 hover:-translate-y-0.5 hover:border-[var(--shop-gold-stroke)]" : ""
      } ${className}`}
      style={{
        background: "var(--shop-surface)",
        borderColor: "var(--shop-border)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function KpiCard({
  title,
  value,
  sub,
  trend,
  delay = 0,
}: {
  title: string;
  value: string | number;
  sub?: string;
  trend?: "up" | "down" | "flat";
  delay?: number;
}) {
  const trendColor =
    trend === "up"
      ? "var(--status-won)"
      : trend === "down"
      ? "var(--status-lost)"
      : "var(--shop-text-3)";

  return (
    <div
      className="rounded-xl border p-5 shop-fade-up"
      style={{
        background: "var(--shop-surface)",
        borderColor: "var(--shop-border)",
        animationDelay: `${delay}ms`,
      }}
    >
      <div
        className="text-[10px] uppercase tracking-[0.2em]"
        style={{ color: "var(--shop-text-4)" }}
      >
        {title}
      </div>
      <div
        className="shop-mono text-3xl mt-2 font-bold"
        style={{ color: "var(--shop-text)" }}
      >
        {value}
      </div>
      {sub && (
        <div className="text-[12px] mt-2 flex items-center gap-1.5" style={{ color: trendColor }}>
          {trend === "up" && <span>↑</span>}
          {trend === "down" && <span>↓</span>}
          <span>{sub}</span>
        </div>
      )}
    </div>
  );
}

export function StatusPill({
  status,
  large = false,
}: {
  status: WorkflowStatus;
  large?: boolean;
}) {
  const c = STATUS_VAR[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded font-bold tracking-wider uppercase ${
        large ? "px-2.5 py-1 text-[11px]" : "px-2 py-0.5 text-[10px]"
      }`}
      style={{
        color: c,
        background: `color-mix(in srgb, ${c} 14%, transparent)`,
        border: `1px solid color-mix(in srgb, ${c} 35%, transparent)`,
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />
      {STATUS_LABELS[status]}
    </span>
  );
}

const TAG_COLORS: Record<OrderTag, string> = {
  vip: "var(--shop-gold)",
  "show-car": "var(--status-quoted)",
  rush: "var(--status-lost)",
  insurance: "var(--status-new)",
  fleet: "var(--status-won)",
};

export function TagChip({ tag }: { tag: OrderTag | "vip" | "fleet" | "repeat" | "insurance" }) {
  const c = TAG_COLORS[tag as OrderTag] || "var(--shop-gold)";
  return (
    <span
      className="px-1.5 py-0.5 rounded text-[9px] font-bold tracking-[0.18em] uppercase"
      style={{
        color: c,
        background: `color-mix(in srgb, ${c} 14%, transparent)`,
        border: `1px solid color-mix(in srgb, ${c} 30%, transparent)`,
      }}
    >
      {tag.replace("-", " ")}
    </span>
  );
}

export function TechAvatar({
  initials,
  clockedIn,
  size = 28,
  tone = "gold",
}: {
  initials: string;
  clockedIn?: boolean;
  size?: number;
  tone?: "gold" | "blue" | "green" | "purple";
}) {
  const grads: Record<string, string> = {
    gold: "linear-gradient(135deg, #D4A24C, #E8B85B)",
    blue: "linear-gradient(135deg, #5B8DEF, #7FA9F2)",
    green: "linear-gradient(135deg, #5BD4A4, #82E1BD)",
    purple: "linear-gradient(135deg, #A788E5, #C2A8F0)",
  };
  return (
    <div className="relative shrink-0">
      <div
        className="rounded-full flex items-center justify-center font-bold text-black shop-mono"
        style={{
          width: size,
          height: size,
          fontSize: Math.round(size * 0.4),
          background: grads[tone],
        }}
      >
        {initials}
      </div>
      {typeof clockedIn === "boolean" && (
        <span
          className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2"
          style={{
            background: clockedIn ? "var(--status-won)" : "var(--shop-text-4)",
            borderColor: "var(--shop-surface)",
          }}
        />
      )}
    </div>
  );
}

export function CustomerAvatar({
  customer,
  size = 28,
}: {
  customer: Customer;
  size?: number;
}) {
  return <TechAvatar initials={customerInitials(customer)} size={size} tone="gold" />;
}

export function VehicleHero({
  hint,
  label,
  sub,
  height = 180,
}: {
  hint: string;
  label: string;
  sub?: string;
  height?: number;
}) {
  // gradient from hint
  const map: Record<string, string> = {
    "tesla-white": "linear-gradient(135deg, #E8E4DC 0%, #B8B4AC 100%)",
    "bmw-white": "linear-gradient(135deg, #F2EFEA 0%, #ABA89F 100%)",
    "porsche-red": "linear-gradient(135deg, #C41E3A 0%, #5C0E1B 100%)",
    "truck-black": "linear-gradient(135deg, #2A2A2D 0%, #0A0A0B 100%)",
    "truck-white": "linear-gradient(135deg, #EFEDE7 0%, #B0AEA6 100%)",
    "van-white": "linear-gradient(135deg, #E5E3DD 0%, #ACA9A0 100%)",
    "bmw-grey": "linear-gradient(135deg, #6E7173 0%, #2E3133 100%)",
    "audi-grey": "linear-gradient(135deg, #6E7173 0%, #383B3D 100%)",
    "suv-grey": "linear-gradient(135deg, #65696B 0%, #303335 100%)",
    "cyber-silver": "linear-gradient(135deg, #C8CCD0 0%, #6A6E72 100%)",
    "civic-blue": "linear-gradient(135deg, #2C5F9E 0%, #122E4A 100%)",
  };
  const bg = map[hint] || "linear-gradient(135deg, #2A2A2D 0%, #0A0A0B 100%)";
  const isLight =
    hint.includes("white") || hint === "cyber-silver" || hint === "tesla-white";

  return (
    <div
      className="relative w-full overflow-hidden rounded-lg flex items-end p-4"
      style={{ background: bg, height }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.55) 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.25), transparent 50%)",
        }}
      />
      <div className="relative">
        <div
          className="shop-display text-2xl md:text-3xl uppercase leading-none"
          style={{ color: isLight ? "#0a0a0b" : "#fff" }}
        >
          {label}
        </div>
        {sub && (
          <div
            className="shop-mono text-[10px] uppercase tracking-[0.2em] mt-1.5 opacity-80"
            style={{ color: isLight ? "#0a0a0b" : "#fff" }}
          >
            {sub}
          </div>
        )}
      </div>
    </div>
  );
}

export function ProgressBar({
  percent,
  active = false,
}: {
  percent: number;
  active?: boolean;
}) {
  const pct = Math.min(100, Math.max(0, percent));
  return (
    <div
      className="h-1.5 rounded-full overflow-hidden"
      style={{ background: "var(--shop-surface-2)" }}
    >
      <div
        className={`h-full rounded-full transition-[width] duration-700 ${
          active ? "shop-progress-stripe" : ""
        }`}
        style={{
          width: `${pct}%`,
          background: active
            ? undefined
            : "linear-gradient(90deg, var(--shop-gold), var(--shop-gold-2))",
        }}
      />
    </div>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  right,
}: {
  eyebrow?: string;
  title: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-3 mb-4">
      <div>
        {eyebrow && (
          <div
            className="text-[10px] uppercase tracking-[0.3em] mb-1.5"
            style={{ color: "var(--shop-gold)" }}
          >
            {eyebrow}
          </div>
        )}
        <h2
          className="shop-display text-2xl md:text-3xl uppercase"
          style={{ color: "var(--shop-text)" }}
        >
          {title}
        </h2>
      </div>
      {right}
    </div>
  );
}

export function CountUp({
  value,
  prefix = "",
  suffix = "",
  className = "",
  duration = 800,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  duration?: number;
}) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const k = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - k, 3);
      setN(Math.round(value * eased));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);
  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {n.toLocaleString()}
      {suffix}
    </span>
  );
}

export function EmptyState({
  title,
  hint,
  icon,
}: {
  title: string;
  hint?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div
      className="flex flex-col items-center justify-center text-center py-16 px-6 rounded-xl border border-dashed"
      style={{ borderColor: "var(--shop-border-2)", color: "var(--shop-text-3)" }}
    >
      {icon && <div className="mb-3 opacity-50">{icon}</div>}
      <div className="shop-display text-xl uppercase" style={{ color: "var(--shop-text-2)" }}>
        {title}
      </div>
      {hint && (
        <div className="text-[12px] mt-2 max-w-sm" style={{ color: "var(--shop-text-3)" }}>
          {hint}
        </div>
      )}
    </div>
  );
}

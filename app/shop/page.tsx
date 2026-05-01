import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Star,
  Calendar as CalIcon,
  Package as PackageIcon,
  DollarSign,
} from "lucide-react";
import { ORDERS, TECHNICIANS } from "@/data/shop/orders";
import { APPOINTMENTS } from "@/data/shop/appointments";
import {
  customerName,
  customerVehicles,
  fmtUsd,
  getCustomer,
  getTech,
  getVehicle,
  orderTotal,
  pct,
  timeAgo,
  vehicleLabel,
} from "@/data/shop/helpers";
import {
  CountUp,
  KpiCard,
  ProgressBar,
  SectionTitle,
  StatusPill,
  TechAvatar,
  TagChip,
} from "@/components/shop/primitives";

const TODAY_DATE = "April 30, 2025";

function bayCard({
  bay,
  orderId,
  pctVal,
  remaining,
}: {
  bay: number;
  orderId?: string;
  pctVal?: number;
  remaining?: string;
}) {
  if (!orderId) {
    return (
      <div
        key={bay}
        className="rounded-xl border border-dashed p-5 flex items-center justify-between"
        style={{
          borderColor: "var(--shop-border-2)",
          background: "var(--shop-surface)",
        }}
      >
        <div>
          <div
            className="text-[10px] uppercase tracking-[0.3em]"
            style={{ color: "var(--shop-text-4)" }}
          >
            Bay {bay}
          </div>
          <div
            className="shop-display text-2xl uppercase mt-1"
            style={{ color: "var(--shop-text-3)" }}
          >
            Available
          </div>
          <div className="text-[11px] mt-1" style={{ color: "var(--shop-text-3)" }}>
            Open for walk-in or rebook
          </div>
        </div>
        <span className="shop-mono text-[10px]" style={{ color: "var(--shop-text-4)" }}>
          IDLE
        </span>
      </div>
    );
  }

  const o = ORDERS.find((x) => x.id === orderId)!;
  const customer = getCustomer(o.customerId)!;
  const vehicle = getVehicle(o.vehicleId)!;
  const tech = getTech(o.technicianId)!;
  return (
    <div
      key={bay}
      className="rounded-xl border p-5 flex items-center gap-5 hover:border-[var(--shop-gold-stroke)] transition shop-fade-up"
      style={{
        background: "var(--shop-surface)",
        borderColor: "var(--shop-border)",
        animationDelay: `${bay * 80}ms`,
      }}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <span
            className="shop-mono text-[10px] uppercase tracking-[0.25em]"
            style={{ color: "var(--shop-gold)" }}
          >
            Bay {bay}
          </span>
          <StatusPill status={o.status} />
          {o.tags.slice(0, 2).map((t) => (
            <TagChip key={t} tag={t} />
          ))}
        </div>
        <div
          className="shop-display text-2xl uppercase truncate"
          style={{ color: "var(--shop-text)" }}
        >
          {vehicleLabel(vehicle)}
        </div>
        <div className="text-[12px]" style={{ color: "var(--shop-text-3)" }}>
          {customerName(customer)} · {o.primaryService}
        </div>
        <div className="mt-3">
          <ProgressBar percent={pctVal || 0} active={o.status === "in-bay"} />
          <div
            className="mt-1.5 flex items-center justify-between shop-mono text-[10px] uppercase tracking-wider"
            style={{ color: "var(--shop-text-4)" }}
          >
            <span>{pctVal}% complete</span>
            <span>{remaining || "—"}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 shrink-0">
        <TechAvatar initials={tech.initials} size={36} clockedIn={tech.clockedIn} />
        <Link
          href={`/shop/workflow/${o.id}`}
          className="shop-mono text-[10px] hover:text-white transition uppercase tracking-wider flex items-center gap-1"
          style={{ color: "var(--shop-text-3)" }}
        >
          {o.id} <ArrowUpRight size={11} />
        </Link>
      </div>
    </div>
  );
}

const ACTIVITY = [
  { icon: CheckCircle2, color: "var(--status-won)",  body: "Sophia Reyes signed estimate", money: "$2,900", at: "14m ago" },
  { icon: DollarSign,   color: "var(--status-won)",  body: "David Chen invoice paid",       money: "$2,015", at: "2h ago" },
  { icon: Star,         color: "var(--shop-gold)",   body: "Linda Park left a 5★ review",   money: "",       at: "3h ago" },
  { icon: PackageIcon,  color: "var(--status-lost)", body: "Inventory low: Avery Gloss White (12ft)", money: "", at: "5h ago" },
  { icon: CalIcon,      color: "var(--status-new)",  body: "Marcus Williams confirmed May 5", money: "",     at: "yesterday" },
];

export default function ShopDashboard() {
  const inBay = ORDERS.filter((o) => o.status === "in-bay" || o.status === "photo-qc");
  const pipeline = ORDERS.filter((o) =>
    ["quote", "approved", "scheduled"].includes(o.status)
  ).reduce((s, o) => s + orderTotal(o), 0);
  const todaysRevenue = 2840;
  const aro = 1920;
  const pendingEstimates = ORDERS.filter((o) => o.status === "quote").length;
  const pendingValue = ORDERS.filter((o) => o.status === "quote").reduce(
    (s, o) => s + orderTotal(o),
    0
  );

  const upcoming = APPOINTMENTS
    .filter((a) => new Date(a.startsAt).getTime() >= new Date("2025-04-30T00:00:00Z").getTime())
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt))
    .slice(0, 8);

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto w-full">
      <div className="flex items-end justify-between gap-6 flex-wrap shop-fade-up">
        <div>
          <h1
            className="shop-display text-5xl md:text-6xl uppercase leading-[0.95]"
            style={{ color: "var(--shop-text)" }}
          >
            Good morning, HD.
          </h1>
          <p className="mt-3 text-[15px] max-w-2xl" style={{ color: "var(--shop-text-2)" }}>
            You have{" "}
            <span className="shop-mono font-bold" style={{ color: "var(--shop-gold)" }}>
              <CountUp value={inBay.length} />
            </span>{" "}
            jobs in the bay and{" "}
            <span className="shop-mono font-bold" style={{ color: "var(--shop-gold)" }}>
              <CountUp value={pipeline} prefix="$" />
            </span>{" "}
            in pipeline today.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div
            className="rounded-md border px-3 py-1.5 shop-mono text-[11px] uppercase tracking-wider"
            style={{
              background: "var(--shop-surface)",
              borderColor: "var(--shop-border-2)",
              color: "var(--shop-text-3)",
            }}
          >
            67°F · Clear · Woodstock
          </div>
          <div
            className="rounded-md border px-3 py-1.5 shop-mono text-[11px] uppercase tracking-wider"
            style={{
              background: "var(--shop-surface)",
              borderColor: "var(--shop-border-2)",
              color: "var(--shop-text-3)",
            }}
          >
            {TODAY_DATE}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard title="Today's Revenue" value={fmtUsd(todaysRevenue)} sub="↑ 22% vs last Wed" trend="up" delay={0} />
        <KpiCard title="Active Work Orders" value={inBay.length + 5} sub="across 3 bays" delay={80} />
        <KpiCard title="Avg Repair Order" value={fmtUsd(aro)} sub="↑ $140 this month" trend="up" delay={160} />
        <KpiCard
          title="Pending Estimates"
          value={pendingEstimates}
          sub={`${fmtUsd(pendingValue)} awaiting approval`}
          delay={240}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 space-y-3">
          <SectionTitle eyebrow="01 / Live Bays" title="Today on the lift" />
          {bayCard({ bay: 1, orderId: "WO-2025-0142", pctVal: 60, remaining: "4h remaining" })}
          {bayCard({ bay: 2, orderId: "WO-2025-0141", pctVal: 95, remaining: "Final QC" })}
          {bayCard({ bay: 3 })}
        </div>

        <div className="lg:col-span-4 space-y-3">
          <SectionTitle eyebrow="02 / Activity" title="Recent" />
          <div
            className="rounded-xl border divide-y overflow-hidden"
            style={{
              background: "var(--shop-surface)",
              borderColor: "var(--shop-border)",
            }}
          >
            {ACTIVITY.map(({ icon: Icon, color, body, money, at }, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-4 py-3 group hover:bg-white/[0.02] transition shop-fade-up"
                style={{
                  borderColor: "var(--shop-border)",
                  animationDelay: `${i * 60 + 200}ms`,
                }}
              >
                <Icon size={14} style={{ color }} className="shrink-0" />
                <div className="flex-1 min-w-0 text-[12.5px]" style={{ color: "var(--shop-text-2)" }}>
                  {body}{" "}
                  {money && (
                    <span className="shop-mono font-bold" style={{ color: "var(--shop-gold)" }}>
                      {money}
                    </span>
                  )}
                </div>
                <span
                  className="shop-mono text-[10px] uppercase tracking-wider shrink-0"
                  style={{ color: "var(--shop-text-4)" }}
                >
                  {at}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <SectionTitle
          eyebrow="03 / Schedule"
          title="Upcoming this week"
          right={
            <Link
              href="/shop/calendar"
              className="text-[11px] uppercase tracking-[0.18em] hover:text-white transition flex items-center gap-1"
              style={{ color: "var(--shop-text-3)" }}
            >
              Open calendar <ArrowUpRight size={12} />
            </Link>
          }
        />
        <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
          {upcoming.map((a, i) => {
            const c = getCustomer(a.customerId);
            const v = getVehicle(a.vehicleId);
            const date = new Date(a.startsAt);
            return (
              <div
                key={a.id}
                className="rounded-xl border p-4 min-w-[240px] shop-fade-up shrink-0 hover:border-[var(--shop-gold-stroke)] transition"
                style={{
                  background: "var(--shop-surface)",
                  borderColor: "var(--shop-border)",
                  animationDelay: `${i * 60 + 250}ms`,
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="rounded text-center px-2 py-1.5 shop-mono"
                    style={{
                      background: "var(--shop-gold-dim)",
                      color: "var(--shop-gold)",
                    }}
                  >
                    <div className="text-[9px] uppercase tracking-wider opacity-70 leading-none">
                      {date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase()}
                    </div>
                    <div className="text-base font-bold leading-none mt-0.5">
                      {date.getDate()}
                    </div>
                  </div>
                  <div className="text-[10px] shop-mono uppercase tracking-wider" style={{ color: "var(--shop-text-4)" }}>
                    Bay {a.bay} · {date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
                  </div>
                </div>
                <div
                  className="shop-display text-base uppercase truncate"
                  style={{ color: "var(--shop-text)" }}
                >
                  {v ? vehicleLabel(v) : a.title}
                </div>
                <div className="text-[11px] mt-1" style={{ color: "var(--shop-text-3)" }}>
                  {c ? customerName(c) : "—"}
                </div>
                <div className="text-[11px] mt-2 line-clamp-2" style={{ color: "var(--shop-text-2)" }}>
                  {a.title}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

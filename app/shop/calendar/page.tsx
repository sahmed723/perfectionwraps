"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { APPOINTMENTS } from "@/data/shop/appointments";
import { TECHNICIANS } from "@/data/shop/orders";
import {
  customerName,
  getCustomer,
  getTech,
  getVehicle,
  vehicleLabel,
} from "@/data/shop/helpers";
import { TechAvatar } from "@/components/shop/primitives";

const WEEK_START = new Date("2025-04-28T00:00:00Z");
const HOURS = Array.from({ length: 13 }, (_, i) => 7 + i);

const BAY_COLOR: Record<number, string> = {
  1: "var(--status-new)",
  2: "var(--shop-gold)",
  3: "var(--status-won)",
};

function dayDate(offset: number) {
  return new Date(WEEK_START.getTime() + offset * 86400000);
}

export default function CalendarPage() {
  const days = Array.from({ length: 6 }, (_, i) => dayDate(i)); // Mon-Sat

  const apts = APPOINTMENTS.map((a) => ({
    ...a,
    start: new Date(a.startsAt),
    end: new Date(a.endsAt),
  }));

  const weekLabel = `${days[0].toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${days[5].toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;

  return (
    <div className="space-y-5 max-w-[1500px] mx-auto w-full">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <button
            className="w-8 h-8 rounded border flex items-center justify-center hover:bg-white/5 transition"
            style={{
              background: "var(--shop-surface)",
              borderColor: "var(--shop-border-2)",
              color: "var(--shop-text-3)",
            }}
          >
            <ChevronLeft size={14} />
          </button>
          <span className="shop-display text-2xl uppercase" style={{ color: "var(--shop-text)" }}>
            {weekLabel}
          </span>
          <button
            className="w-8 h-8 rounded border flex items-center justify-center hover:bg-white/5 transition"
            style={{
              background: "var(--shop-surface)",
              borderColor: "var(--shop-border-2)",
              color: "var(--shop-text-3)",
            }}
          >
            <ChevronRight size={14} />
          </button>
          <button
            className="px-3 h-8 rounded shop-mono text-[11px] uppercase tracking-wider border hover:bg-white/5 transition"
            style={{
              background: "var(--shop-surface)",
              borderColor: "var(--shop-border-2)",
              color: "var(--shop-text-3)",
            }}
          >
            Today
          </button>
        </div>
        <div
          className="flex items-center rounded-md border p-0.5"
          style={{
            background: "var(--shop-surface)",
            borderColor: "var(--shop-border-2)",
          }}
        >
          {(["Day", "Week", "Month"] as const).map((v) => (
            <button
              key={v}
              className="px-3 py-1 rounded text-[11px] uppercase tracking-wider transition"
              style={{
                background: v === "Week" ? "var(--shop-surface-3)" : "transparent",
                color: v === "Week" ? "var(--shop-gold)" : "var(--shop-text-3)",
              }}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div
          className="lg:col-span-9 rounded-xl border overflow-hidden shop-fade-up"
          style={{
            background: "var(--shop-surface)",
            borderColor: "var(--shop-border)",
          }}
        >
          <div className="grid grid-cols-[60px_repeat(6,1fr)] border-b" style={{ borderColor: "var(--shop-border)" }}>
            <div />
            {days.map((d) => {
              const isToday = d.toDateString() === new Date("2025-04-30T12:00:00Z").toDateString();
              return (
                <div
                  key={d.toISOString()}
                  className="px-3 py-3 text-center border-l"
                  style={{
                    borderColor: "var(--shop-border)",
                    background: isToday ? "var(--shop-gold-dim)" : "transparent",
                  }}
                >
                  <div
                    className="shop-mono text-[10px] uppercase tracking-wider"
                    style={{ color: isToday ? "var(--shop-gold)" : "var(--shop-text-4)" }}
                  >
                    {d.toLocaleDateString("en-US", { weekday: "short" })}
                  </div>
                  <div
                    className="shop-display text-2xl"
                    style={{ color: isToday ? "var(--shop-gold)" : "var(--shop-text-2)" }}
                  >
                    {d.getDate()}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-[60px_repeat(6,1fr)] relative">
            {HOURS.map((h) => (
              <div key={h} className="contents">
                <div
                  className="border-t shop-mono text-[10px] uppercase tracking-wider px-2 pt-1"
                  style={{
                    borderColor: "var(--shop-border)",
                    color: "var(--shop-text-4)",
                    height: 56,
                  }}
                >
                  {h % 12 === 0 ? 12 : h % 12}
                  {h < 12 ? "a" : "p"}
                </div>
                {days.map((d, di) => (
                  <div
                    key={`${h}-${di}`}
                    className="border-t border-l relative"
                    style={{
                      borderColor: "var(--shop-border)",
                      height: 56,
                    }}
                  />
                ))}
              </div>
            ))}
            {apts.map((a, idx) => {
              const dayIdx = days.findIndex(
                (d) => d.toDateString() === a.start.toDateString()
              );
              if (dayIdx < 0) return null;
              const startHour = a.start.getUTCHours() + a.start.getUTCMinutes() / 60;
              const endHour = a.end.getUTCHours() + a.end.getUTCMinutes() / 60;
              const top = (startHour - 7) * 56 + 1;
              const height = (endHour - startHour) * 56 - 2;
              const c = BAY_COLOR[a.bay];
              const cust = getCustomer(a.customerId);
              const veh = getVehicle(a.vehicleId);
              return (
                <Link
                  key={a.id}
                  href={a.workOrderId ? `/shop/workflow/${a.workOrderId}` : "/shop/workflow"}
                  className="absolute rounded px-2 py-1 overflow-hidden text-[11px] hover:scale-[1.02] hover:shadow-lg transition shop-fade-up cursor-pointer"
                  style={{
                    left: `calc(60px + (100% - 60px) / 6 * ${dayIdx} + 2px)`,
                    width: `calc((100% - 60px) / 6 - 4px)`,
                    top,
                    height: Math.max(28, height),
                    background: `color-mix(in srgb, ${c} 25%, var(--shop-surface))`,
                    borderLeft: `3px solid ${c}`,
                    color: "var(--shop-text)",
                    animationDelay: `${idx * 25}ms`,
                  }}
                  title={`${cust ? customerName(cust) : ""} · ${a.title}`}
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider truncate" style={{ color: c }}>
                    Bay {a.bay} · {veh ? vehicleLabel(veh).split(" ").slice(0, 3).join(" ") : ""}
                  </div>
                  <div className="text-[10px] truncate" style={{ color: "var(--shop-text-2)" }}>
                    {a.title.replace(/—.*/, "")}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-3 space-y-4">
          <div
            className="rounded-xl border p-4 shop-fade-up"
            style={{
              background: "var(--shop-surface)",
              borderColor: "var(--shop-border)",
            }}
          >
            <h3
              className="shop-display text-base uppercase mb-3"
              style={{ color: "var(--shop-text-2)" }}
            >
              Today's bays
            </h3>
            <div className="space-y-2">
              {[1, 2, 3].map((b) => {
                const a = apts.find(
                  (x) =>
                    x.bay === b &&
                    x.start.toDateString() === new Date("2025-04-30T12:00:00Z").toDateString()
                );
                const c = BAY_COLOR[b];
                return (
                  <div
                    key={b}
                    className="rounded-md px-3 py-2.5 text-[11px]"
                    style={{
                      background: a ? `color-mix(in srgb, ${c} 10%, transparent)` : "var(--shop-surface-2)",
                      borderLeft: `3px solid ${a ? c : "var(--shop-border-2)"}`,
                    }}
                  >
                    <div className="shop-mono uppercase tracking-wider text-[10px]" style={{ color: a ? c : "var(--shop-text-4)" }}>
                      Bay {b}
                    </div>
                    <div className="font-bold mt-0.5" style={{ color: "var(--shop-text)" }}>
                      {a ? a.title.replace(/—.*/, "").trim() : "Available"}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className="rounded-xl border p-4 shop-fade-up"
            style={{
              background: "var(--shop-surface)",
              borderColor: "var(--shop-border)",
              animationDelay: "100ms",
            }}
          >
            <h3
              className="shop-display text-base uppercase mb-3"
              style={{ color: "var(--shop-text-2)" }}
            >
              Today's techs
            </h3>
            <div className="space-y-2">
              {TECHNICIANS.map((t) => (
                <div key={t.id} className="flex items-center gap-3">
                  <TechAvatar initials={t.initials} clockedIn={t.clockedIn} size={28} />
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-bold truncate" style={{ color: "var(--shop-text)" }}>
                      {t.name}
                    </div>
                    <div className="text-[10px] truncate" style={{ color: "var(--shop-text-3)" }}>
                      {t.role}
                    </div>
                  </div>
                  <span className="shop-mono text-[10px]" style={{ color: t.clockedIn ? "var(--status-won)" : "var(--shop-text-4)" }}>
                    {t.clockedIn ? "ON" : "OFF"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

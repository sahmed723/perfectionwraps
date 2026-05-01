"use client";

import { useState } from "react";
import { CUSTOMERS } from "@/data/shop/customers";
import { ORDERS, TECHNICIANS } from "@/data/shop/orders";
import { fmtUsd, customerName } from "@/data/shop/helpers";
import { CountUp, KpiCard, SectionTitle } from "@/components/shop/primitives";
import { Donut, HoursBars, RevenueLine, Sparkline } from "@/components/shop/charts";
import { Star } from "lucide-react";

const RANGES = ["7D", "30D", "90D", "YTD", "Custom"] as const;

const REVENUE_30D = [
  { day: "Apr 1", revenue: 1140 },
  { day: "Apr 3", revenue: 1640 },
  { day: "Apr 5", revenue: 2900 },
  { day: "Apr 7", revenue: 1100 },
  { day: "Apr 9", revenue: 980 },
  { day: "Apr 11", revenue: 1850 },
  { day: "Apr 13", revenue: 2400 },
  { day: "Apr 15", revenue: 3100 },
  { day: "Apr 17", revenue: 1620 },
  { day: "Apr 19", revenue: 1380 },
  { day: "Apr 21", revenue: 2100 },
  { day: "Apr 23", revenue: 2840 },
  { day: "Apr 25", revenue: 3450 },
  { day: "Apr 27", revenue: 2950 },
  { day: "Apr 29", revenue: 4150 },
  { day: "Apr 30", revenue: 2840 },
];

const SERVICE_MIX = [
  { name: "PPF", value: 38, color: "#D4A24C" },
  { name: "Wraps", value: 28, color: "#A788E5" },
  { name: "Ceramic", value: 14, color: "#5BD4A4" },
  { name: "Tint", value: 12, color: "#5B8DEF" },
  { name: "Fleet", value: 8, color: "#E5605C" },
];

const TECH_HOURS = [
  { name: "HD", hours: 142 },
  { name: "AR", hours: 168 },
  { name: "ML", hours: 98 },
  { name: "SK", hours: 76 },
];

const FUNNEL = [
  { label: "Leads", count: 84, pct: 100 },
  { label: "Estimates", count: 38, pct: 45 },
  { label: "Approved", count: 22, pct: 26 },
  { label: "Invoiced", count: 18, pct: 21 },
];

const ARO_SPARK = [1620, 1740, 1810, 1690, 1850, 1740, 1820, 1900, 1875, 1920];

export default function ReportsPage() {
  const [range, setRange] = useState<(typeof RANGES)[number]>("30D");

  const total30 = REVENUE_30D.reduce((s, d) => s + d.revenue, 0);
  const top = [...CUSTOMERS].sort((a, b) => b.ltv - a.ltv).slice(0, 5);

  return (
    <div className="space-y-6 max-w-[1500px] mx-auto w-full">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1
            className="shop-display text-3xl md:text-4xl uppercase"
            style={{ color: "var(--shop-text)" }}
          >
            Performance
          </h1>
          <p className="text-[13px] mt-1" style={{ color: "var(--shop-text-3)" }}>
            Where the money is, where the time is, who's worth a repeat ask.
          </p>
        </div>
        <div
          className="flex items-center rounded-md border p-0.5"
          style={{
            background: "var(--shop-surface)",
            borderColor: "var(--shop-border-2)",
          }}
        >
          {RANGES.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className="px-3 py-1.5 text-[10px] uppercase tracking-wider rounded transition shop-mono"
              style={{
                background: range === r ? "var(--shop-surface-3)" : "transparent",
                color: range === r ? "var(--shop-gold)" : "var(--shop-text-3)",
              }}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div
          className="lg:col-span-8 rounded-xl border p-5 shop-fade-up"
          style={{
            background: "var(--shop-surface)",
            borderColor: "var(--shop-border)",
          }}
        >
          <SectionTitle eyebrow="Revenue · 30D" title="Cash through the door" />
          <div className="flex items-baseline gap-3 mb-3">
            <span className="shop-mono text-4xl font-bold" style={{ color: "var(--shop-text)" }}>
              <CountUp value={total30} prefix="$" />
            </span>
            <span className="text-[12px]" style={{ color: "var(--status-won)" }}>
              ↑ 18% vs prior 30d
            </span>
          </div>
          <RevenueLine data={REVENUE_30D} />
        </div>

        <div
          className="lg:col-span-4 rounded-xl border p-5 shop-fade-up"
          style={{
            background: "var(--shop-surface)",
            borderColor: "var(--shop-border)",
            animationDelay: "80ms",
          }}
        >
          <div className="text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--shop-text-4)" }}>
            Avg Repair Order
          </div>
          <div className="shop-mono text-4xl font-bold mt-2" style={{ color: "var(--shop-text)" }}>
            <CountUp value={1920} prefix="$" />
          </div>
          <div className="text-[12px] mt-1.5" style={{ color: "var(--status-won)" }}>
            ↑ $140 this month
          </div>
          <div className="mt-4">
            <Sparkline data={ARO_SPARK} />
          </div>

          <div className="mt-6 pt-4 border-t" style={{ borderColor: "var(--shop-border)" }}>
            <div className="text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--shop-text-4)" }}>
              Reviews · 30D
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Star size={16} fill="#D4A24C" stroke="none" />
              <span className="shop-mono text-2xl font-bold" style={{ color: "var(--shop-text)" }}>
                4.9
              </span>
              <span className="shop-mono text-[11px]" style={{ color: "var(--shop-text-3)" }}>
                · 12 new
              </span>
            </div>
            <div className="text-[11px] mt-1.5" style={{ color: "var(--shop-text-3)" }}>
              Google 9 · Facebook 3
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div
          className="lg:col-span-4 rounded-xl border p-5 shop-fade-up"
          style={{
            background: "var(--shop-surface)",
            borderColor: "var(--shop-border)",
          }}
        >
          <SectionTitle eyebrow="Mix" title="Service revenue %" />
          <Donut data={SERVICE_MIX as { name: string; value: number; color: string }[]} />
          <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-1.5 text-[12px]">
            {SERVICE_MIX.map((s) => (
              <li key={s.name} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-sm" style={{ background: s.color }} />
                <span style={{ color: "var(--shop-text-2)" }}>{s.name}</span>
                <span className="ml-auto shop-mono" style={{ color: "var(--shop-text-3)" }}>
                  {s.value}%
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="lg:col-span-4 rounded-xl border p-5 shop-fade-up"
          style={{
            background: "var(--shop-surface)",
            borderColor: "var(--shop-border)",
            animationDelay: "80ms",
          }}
        >
          <SectionTitle eyebrow="Top LTV" title="Whales" />
          <ol className="space-y-2">
            {top.map((c, i) => (
              <li
                key={c.id}
                className="flex items-center gap-3 px-3 py-2 rounded-md"
                style={{ background: i === 0 ? "var(--shop-gold-dim)" : "transparent" }}
              >
                <span
                  className="shop-mono text-[10px] font-bold w-5"
                  style={{ color: i === 0 ? "var(--shop-gold)" : "var(--shop-text-4)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 text-[12.5px]" style={{ color: "var(--shop-text)" }}>
                  {customerName(c)}
                </span>
                <span className="shop-mono text-[12px] font-bold" style={{ color: i === 0 ? "var(--shop-gold)" : "var(--shop-text-2)" }}>
                  {fmtUsd(c.ltv)}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div
          className="lg:col-span-4 rounded-xl border p-5 shop-fade-up"
          style={{
            background: "var(--shop-surface)",
            borderColor: "var(--shop-border)",
            animationDelay: "160ms",
          }}
        >
          <SectionTitle eyebrow="Productivity" title="Tech hours · MTD" />
          <HoursBars data={TECH_HOURS} />
          <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px]">
            {TECHNICIANS.map((t, i) => (
              <div key={t.id} className="flex items-center justify-between">
                <span style={{ color: "var(--shop-text-2)" }}>{t.initials} · {t.name.split(" ")[0]}</span>
                <span className="shop-mono" style={{ color: "var(--shop-gold)" }}>
                  {TECH_HOURS[i]?.hours}h
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="rounded-xl border p-5 shop-fade-up"
        style={{
          background: "var(--shop-surface)",
          borderColor: "var(--shop-border)",
        }}
      >
        <SectionTitle eyebrow="Funnel" title="Leads → Invoice" />
        <div className="grid grid-cols-4 gap-3">
          {FUNNEL.map((step, i) => (
            <div key={step.label}>
              <div className="text-[10px] uppercase tracking-[0.25em] mb-2" style={{ color: "var(--shop-text-4)" }}>
                {step.label}
              </div>
              <div className="shop-mono text-3xl font-bold" style={{ color: i === 0 ? "var(--shop-text)" : "var(--shop-gold)" }}>
                {step.count}
              </div>
              <div className="mt-2 h-2 rounded-full overflow-hidden" style={{ background: "var(--shop-surface-2)" }}>
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${step.pct}%`,
                    background: "linear-gradient(90deg, var(--shop-gold), var(--shop-gold-2))",
                  }}
                />
              </div>
              <div className="shop-mono text-[10px] uppercase tracking-wider mt-1.5" style={{ color: "var(--shop-text-4)" }}>
                {step.pct}% of leads
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

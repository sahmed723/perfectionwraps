"use client";

import { useMemo, useState } from "react";
import { Search, Package, AlertTriangle } from "lucide-react";
import { INVENTORY, type InventoryCategory } from "@/data/shop/inventory";
import { fmtUsd } from "@/data/shop/helpers";
import { KpiCard, ProgressBar } from "@/components/shop/primitives";

const CATEGORIES: { id: InventoryCategory | "all" | "reorder"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "vinyl", label: "Vinyl" },
  { id: "ppf", label: "PPF" },
  { id: "tint", label: "Tint" },
  { id: "ceramic", label: "Ceramic" },
  { id: "tools", label: "Tools" },
  { id: "supplies", label: "Supplies" },
  { id: "reorder", label: "Reorder needed" },
];

function statusFor(item: { onHand: number; reorderAt: number }) {
  const ratio = item.onHand / Math.max(1, item.reorderAt);
  if (ratio <= 1) return { color: "var(--status-lost)", label: "Reorder", pct: Math.min(100, (item.onHand / item.reorderAt) * 100) };
  if (ratio <= 1.5) return { color: "var(--shop-gold)", label: "Low", pct: 65 };
  return { color: "var(--status-won)", label: "Healthy", pct: Math.min(100, ratio * 40) };
}

export default function InventoryPage() {
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]["id"]>("all");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return INVENTORY.filter((i) => {
      if (filter === "reorder" && i.onHand > i.reorderAt) return false;
      if (filter !== "all" && filter !== "reorder" && i.category !== filter) return false;
      if (q) {
        const hay = `${i.brand} ${i.product} ${i.sku} ${i.vendor}`.toLowerCase();
        if (!hay.includes(q.toLowerCase())) return false;
      }
      return true;
    });
  }, [filter, q]);

  const totalValue = INVENTORY.reduce((s, i) => s + i.onHand * i.unitCost, 0);
  const belowReorder = INVENTORY.filter((i) => i.onHand <= i.reorderAt).length;
  const vendors = new Set(INVENTORY.map((i) => i.vendor)).size;

  return (
    <div className="space-y-5 max-w-[1500px] mx-auto w-full">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiCard title="Stock Value" value={fmtUsd(totalValue)} delay={0} />
        <KpiCard
          title="Below Reorder"
          value={belowReorder}
          sub={belowReorder > 0 ? "Action needed" : "All healthy"}
          trend={belowReorder > 0 ? "down" : "up"}
          delay={80}
        />
        <KpiCard title="Most Used" value="XPEL UP" sub="this month" delay={160} />
        <KpiCard title="Active Vendors" value={vendors} delay={240} />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div
          className="rounded-md flex items-center gap-2 px-3 h-9 border min-w-[260px] flex-1 max-w-md"
          style={{
            background: "var(--shop-surface-2)",
            borderColor: "var(--shop-border-2)",
          }}
        >
          <Search size={13} style={{ color: "var(--shop-text-4)" }} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search SKU, brand, vendor…"
            className="bg-transparent outline-none flex-1 text-[12px]"
            style={{ color: "var(--shop-text)" }}
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((c) => {
            const isActive = filter === c.id;
            const danger = c.id === "reorder";
            const count = c.id === "reorder" ? belowReorder : c.id === "all" ? INVENTORY.length : INVENTORY.filter((i) => i.category === c.id).length;
            return (
              <button
                key={c.id}
                onClick={() => setFilter(c.id)}
                className="px-2.5 py-1 rounded text-[10px] uppercase tracking-wider transition border flex items-center gap-1.5"
                style={{
                  background: isActive
                    ? danger
                      ? "rgba(229,96,92,0.15)"
                      : "var(--shop-gold-dim)"
                    : "transparent",
                  borderColor: isActive
                    ? danger
                      ? "var(--status-lost)"
                      : "var(--shop-gold-stroke)"
                    : "var(--shop-border-2)",
                  color: isActive
                    ? danger
                      ? "var(--status-lost)"
                      : "var(--shop-gold)"
                    : "var(--shop-text-3)",
                }}
              >
                {danger && <AlertTriangle size={10} />}
                {c.label}
                {count > 0 && (
                  <span className="shop-mono opacity-60">({count})</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div
        className="rounded-xl border overflow-hidden shop-fade-up"
        style={{
          background: "var(--shop-surface)",
          borderColor: "var(--shop-border)",
        }}
      >
        <div
          className="grid grid-cols-12 gap-2 px-4 py-2 text-[10px] uppercase tracking-[0.2em] border-b"
          style={{ color: "var(--shop-text-4)", borderColor: "var(--shop-border)" }}
        >
          <span className="col-span-3">Item</span>
          <span className="col-span-1">SKU</span>
          <span className="col-span-1">Cat</span>
          <span className="col-span-2">Stock</span>
          <span className="col-span-2">Status</span>
          <span className="col-span-1 text-right">Cost</span>
          <span className="col-span-2">Vendor</span>
        </div>
        {filtered.map((i, idx) => {
          const s = statusFor(i);
          return (
            <div
              key={i.id}
              className="grid grid-cols-12 gap-2 px-4 py-3 items-center border-t hover:bg-white/[0.02] transition shop-fade-up"
              style={{
                borderColor: "var(--shop-border)",
                animationDelay: `${idx * 25}ms`,
              }}
            >
              <div className="col-span-3 min-w-0">
                <div className="font-bold text-[13px] truncate" style={{ color: "var(--shop-text)" }}>
                  {i.brand} · {i.product}
                </div>
              </div>
              <span className="col-span-1 shop-mono text-[11px] truncate" style={{ color: "var(--shop-text-3)" }}>
                {i.sku}
              </span>
              <span
                className="col-span-1 shop-mono text-[10px] uppercase tracking-wider"
                style={{ color: "var(--shop-text-3)" }}
              >
                {i.category}
              </span>
              <div className="col-span-2 flex items-baseline gap-1">
                <span className="shop-mono text-[14px] font-bold" style={{ color: s.color }}>
                  {i.onHand}
                </span>
                <span className="shop-mono text-[10px]" style={{ color: "var(--shop-text-4)" }}>
                  {i.unit}
                </span>
                <span className="shop-mono text-[9px] uppercase ml-1" style={{ color: "var(--shop-text-4)" }}>
                  / {i.reorderAt}
                </span>
              </div>
              <div className="col-span-2">
                <ProgressBar percent={s.pct} />
                <div className="shop-mono text-[9px] uppercase tracking-wider mt-1" style={{ color: s.color }}>
                  {s.label}
                </div>
              </div>
              <span className="col-span-1 shop-mono text-[12px] text-right" style={{ color: "var(--shop-text-2)" }}>
                {fmtUsd(i.unitCost, true)}
              </span>
              <div className="col-span-2 min-w-0">
                <div className="text-[12px] truncate" style={{ color: "var(--shop-text-2)" }}>
                  {i.vendor}
                </div>
                <div className="shop-mono text-[9px] uppercase tracking-wider" style={{ color: "var(--shop-text-4)" }}>
                  Last: {new Date(i.lastReceivedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="py-12 text-center text-[12px]" style={{ color: "var(--shop-text-3)" }}>
            <Package size={24} className="mx-auto mb-2 opacity-50" />
            No inventory matches that filter.
          </div>
        )}
      </div>
    </div>
  );
}

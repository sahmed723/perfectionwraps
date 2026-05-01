"use client";

import Link from "next/link";
import { useState } from "react";
import { Search } from "lucide-react";
import { CUSTOMERS } from "@/data/shop/customers";
import { customerInitials, customerName, fmtUsd } from "@/data/shop/helpers";
import { TechAvatar, TagChip } from "./primitives";

const FILTERS = ["All", "VIPs", "Fleet", "Insurance", "Repeat"] as const;
type Filter = (typeof FILTERS)[number];

export default function CustomerList({ activeId }: { activeId?: string }) {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Filter>("All");

  const filtered = CUSTOMERS.filter((c) => {
    if (q) {
      const term = q.toLowerCase();
      const haystack = `${c.firstName} ${c.lastName} ${c.city} ${c.phone} ${c.email}`.toLowerCase();
      if (!haystack.includes(term)) return false;
    }
    if (filter === "VIPs" && !c.tags.includes("vip")) return false;
    if (filter === "Fleet" && !c.tags.includes("fleet")) return false;
    if (filter === "Insurance" && !c.tags.includes("insurance")) return false;
    if (filter === "Repeat" && !c.tags.includes("repeat")) return false;
    return true;
  }).sort((a, b) => b.ltv - a.ltv);

  return (
    <div className="space-y-3">
      <div
        className="rounded-md flex items-center gap-2 px-3 h-9 border"
        style={{
          background: "var(--shop-surface-2)",
          borderColor: "var(--shop-border-2)",
        }}
      >
        <Search size={13} style={{ color: "var(--shop-text-4)" }} />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search customers…"
          className="bg-transparent outline-none flex-1 text-[12px]"
          style={{ color: "var(--shop-text)" }}
        />
      </div>
      <div className="flex flex-wrap gap-1.5">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-2.5 py-1 rounded text-[10px] uppercase tracking-wider transition border"
            style={{
              background: filter === f ? "var(--shop-gold-dim)" : "transparent",
              borderColor: filter === f ? "var(--shop-gold-stroke)" : "var(--shop-border-2)",
              color: filter === f ? "var(--shop-gold)" : "var(--shop-text-3)",
            }}
          >
            {f}
          </button>
        ))}
      </div>
      <div
        className="rounded-xl border divide-y overflow-hidden max-h-[calc(100vh-280px)] overflow-y-auto"
        style={{
          background: "var(--shop-surface)",
          borderColor: "var(--shop-border)",
        }}
      >
        {filtered.map((c, i) => {
          const active = c.id === activeId;
          return (
            <Link
              key={c.id}
              href={`/shop/customers/${c.id}`}
              className="flex items-center gap-3 px-3 py-3 transition relative shop-fade-up"
              style={{
                background: active ? "var(--shop-gold-dim)" : "transparent",
                borderColor: "var(--shop-border)",
                animationDelay: `${i * 25}ms`,
              }}
            >
              {active && (
                <span
                  className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r"
                  style={{ background: "var(--shop-gold)" }}
                />
              )}
              <TechAvatar initials={customerInitials(c)} size={36} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[13px]" style={{ color: "var(--shop-text)" }}>
                    {customerName(c)}
                  </span>
                  {c.tags.slice(0, 1).map((t) => (
                    <TagChip key={t} tag={t} />
                  ))}
                </div>
                <div className="text-[11px] truncate" style={{ color: "var(--shop-text-3)" }}>
                  {c.city} · {c.phone}
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="shop-mono text-[12px] font-bold" style={{ color: "var(--shop-gold)" }}>
                  {fmtUsd(c.ltv)}
                </div>
                <div className="shop-mono text-[9px] uppercase tracking-wider" style={{ color: "var(--shop-text-4)" }}>
                  {c.totalJobs} JOBS
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

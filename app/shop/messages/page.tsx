"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Send, Mail, Phone, Smartphone, ChevronDown } from "lucide-react";
import { THREADS, type Thread } from "@/data/shop/messages";
import { getCustomer, getOrder, customerName, customerInitials, timeAgo } from "@/data/shop/helpers";
import { TechAvatar, EmptyState } from "@/components/shop/primitives";

type TabFilter = "all" | "sms" | "email" | "unread";

const TEMPLATES = [
  "Vehicle ready for pickup",
  "Photo update from the bay",
  "Estimate ready to review",
  "Quick aftercare reminder",
  "Review request",
];

export default function MessagesPage() {
  const [tab, setTab] = useState<TabFilter>("all");
  const [q, setQ] = useState("");
  const [activeId, setActiveId] = useState<string>(THREADS[0]?.id || "");
  const [composer, setComposer] = useState("");
  const [showTpl, setShowTpl] = useState(false);

  const filtered = useMemo(() => {
    return THREADS.filter((t) => {
      if (tab === "sms" && t.channel !== "sms") return false;
      if (tab === "email" && t.channel !== "email") return false;
      if (tab === "unread" && !t.unread) return false;
      if (q) {
        const c = getCustomer(t.customerId);
        const hay = `${c ? customerName(c) : ""} ${t.preview}`.toLowerCase();
        if (!hay.includes(q.toLowerCase())) return false;
      }
      return true;
    }).sort(
      (a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime()
    );
  }, [tab, q]);

  const active = THREADS.find((t) => t.id === activeId);
  const activeCustomer = active ? getCustomer(active.customerId) : null;
  const activeOrder = active?.workOrderId ? getOrder(active.workOrderId) : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-4 max-w-[1500px] mx-auto w-full h-[calc(100vh-160px)]">
      <div className="flex flex-col gap-3 min-h-0">
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
            placeholder="Search messages…"
            className="bg-transparent outline-none flex-1 text-[12px]"
            style={{ color: "var(--shop-text)" }}
          />
        </div>
        <div className="flex gap-1.5">
          {(
            [
              { id: "all", label: "All" },
              { id: "sms", label: "SMS" },
              { id: "email", label: "Email" },
              { id: "unread", label: "Unread" },
            ] as { id: TabFilter; label: string }[]
          ).map((f) => (
            <button
              key={f.id}
              onClick={() => setTab(f.id)}
              className="px-2.5 py-1 rounded text-[10px] uppercase tracking-wider transition border flex items-center gap-1.5"
              style={{
                background: tab === f.id ? "var(--shop-gold-dim)" : "transparent",
                borderColor: tab === f.id ? "var(--shop-gold-stroke)" : "var(--shop-border-2)",
                color: tab === f.id ? "var(--shop-gold)" : "var(--shop-text-3)",
              }}
            >
              {f.label}
              {f.id === "unread" && THREADS.filter((t) => t.unread).length > 0 && (
                <span className="shop-mono">({THREADS.filter((t) => t.unread).length})</span>
              )}
            </button>
          ))}
        </div>
        <div
          className="flex-1 rounded-xl border overflow-y-auto divide-y"
          style={{
            background: "var(--shop-surface)",
            borderColor: "var(--shop-border)",
          }}
        >
          {filtered.map((t, i) => {
            const c = getCustomer(t.customerId);
            const isActive = t.id === activeId;
            return (
              <button
                key={t.id}
                onClick={() => setActiveId(t.id)}
                className="w-full text-left flex items-start gap-3 px-3 py-3 transition relative shop-fade-up"
                style={{
                  background: isActive ? "var(--shop-gold-dim)" : "transparent",
                  borderColor: "var(--shop-border)",
                  animationDelay: `${i * 25}ms`,
                }}
              >
                {isActive && (
                  <span
                    className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r"
                    style={{ background: "var(--shop-gold)" }}
                  />
                )}
                <TechAvatar initials={c ? customerInitials(c) : "?"} size={36} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-[13px] truncate" style={{ color: "var(--shop-text)" }}>
                      {c ? customerName(c) : "Unknown"}
                    </span>
                    <span className="shop-mono text-[10px] shrink-0" style={{ color: "var(--shop-text-4)" }}>
                      {timeAgo(t.lastMessageAt)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider mt-0.5" style={{ color: "var(--shop-text-3)" }}>
                    {t.channel === "sms" ? <Smartphone size={10} /> : <Mail size={10} />}
                    {t.channel}
                    {t.workOrderId && <span className="shop-mono">· {t.workOrderId}</span>}
                  </div>
                  <div className="text-[12px] mt-1 line-clamp-1" style={{ color: t.unread ? "var(--shop-text)" : "var(--shop-text-3)" }}>
                    {t.preview}
                  </div>
                </div>
                {t.unread && (
                  <span
                    className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                    style={{ background: "var(--shop-gold)" }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-xl border flex flex-col min-h-0" style={{ background: "var(--shop-surface)", borderColor: "var(--shop-border)" }}>
        {!active ? (
          <EmptyState title="Pick a thread" hint="Conversation will land here." />
        ) : (
          <>
            <div className="px-5 py-3 border-b flex items-center justify-between gap-3 flex-wrap" style={{ borderColor: "var(--shop-border)" }}>
              <div className="flex items-center gap-3 min-w-0">
                {activeCustomer && <TechAvatar initials={customerInitials(activeCustomer)} size={36} />}
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="shop-display text-lg uppercase truncate" style={{ color: "var(--shop-text)" }}>
                      {activeCustomer ? customerName(activeCustomer) : ""}
                    </span>
                    {active.channel === "sms" ? (
                      <span className="shop-mono text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded" style={{ background: "var(--shop-surface-2)", color: "var(--shop-text-3)" }}>SMS</span>
                    ) : (
                      <span className="shop-mono text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded" style={{ background: "var(--shop-surface-2)", color: "var(--shop-text-3)" }}>EMAIL</span>
                    )}
                    {activeOrder && (
                      <Link
                        href={`/shop/workflow/${activeOrder.id}`}
                        className="shop-mono text-[10px] uppercase tracking-wider hover:underline"
                        style={{ color: "var(--shop-gold)" }}
                      >
                        {activeOrder.id} →
                      </Link>
                    )}
                  </div>
                  {activeCustomer && (
                    <div className="text-[11px]" style={{ color: "var(--shop-text-3)" }}>
                      {activeCustomer.phone} · {activeCustomer.city}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  className="p-2 rounded hover:bg-white/5 transition"
                  style={{ color: "var(--shop-text-3)" }}
                  title="Call"
                >
                  <Phone size={14} />
                </button>
                {activeCustomer && (
                  <Link
                    href={`/shop/customers/${activeCustomer.id}`}
                    className="px-3 h-8 rounded-md text-[11px] uppercase tracking-wider border flex items-center hover:bg-white/5 transition"
                    style={{
                      borderColor: "var(--shop-border-2)",
                      color: "var(--shop-text-2)",
                    }}
                  >
                    View customer
                  </Link>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {active.messages.map((m, i) => (
                <div key={i} className={`flex ${m.direction === "out" ? "justify-end" : "justify-start"}`}>
                  <div
                    className="max-w-[75%] rounded-2xl px-4 py-2.5"
                    style={{
                      background:
                        m.direction === "out"
                          ? "color-mix(in srgb, var(--shop-gold) 20%, transparent)"
                          : "var(--shop-surface-2)",
                      color:
                        m.direction === "out" ? "var(--shop-text)" : "var(--shop-text-2)",
                      border:
                        m.direction === "out"
                          ? "1px solid var(--shop-gold-stroke)"
                          : "1px solid var(--shop-border-2)",
                    }}
                  >
                    <div className="text-[13px] leading-relaxed">{m.body}</div>
                    <div
                      className="shop-mono text-[9px] uppercase tracking-wider mt-1.5 opacity-60 flex items-center gap-1"
                    >
                      {m.direction === "out" && "✓"} {timeAgo(m.at)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t p-4" style={{ borderColor: "var(--shop-border)" }}>
              <div className="flex items-center justify-between mb-2">
                <div
                  className="flex items-center rounded border p-0.5"
                  style={{
                    background: "var(--shop-surface-2)",
                    borderColor: "var(--shop-border-2)",
                  }}
                >
                  {(["sms", "email"] as const).map((c) => (
                    <button
                      key={c}
                      className="px-2.5 py-1 text-[10px] uppercase tracking-wider rounded transition shop-mono"
                      style={{
                        background: c === active.channel ? "var(--shop-surface-3)" : "transparent",
                        color: c === active.channel ? "var(--shop-gold)" : "var(--shop-text-3)",
                      }}
                    >
                      {c}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <button
                    onClick={() => setShowTpl((v) => !v)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] uppercase tracking-wider hover:bg-white/5 transition border"
                    style={{
                      borderColor: "var(--shop-border-2)",
                      color: "var(--shop-text-3)",
                    }}
                  >
                    Template
                    <ChevronDown size={11} />
                  </button>
                  {showTpl && (
                    <div
                      className="absolute right-0 bottom-9 w-64 rounded-md border z-30 shop-slide-in"
                      style={{
                        background: "var(--shop-surface)",
                        borderColor: "var(--shop-border-2)",
                      }}
                    >
                      {TEMPLATES.map((t) => (
                        <button
                          key={t}
                          onClick={() => {
                            setComposer(t);
                            setShowTpl(false);
                          }}
                          className="w-full text-left px-3 py-2 text-[12px] hover:bg-white/5 transition"
                          style={{ color: "var(--shop-text-2)" }}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div
                className="flex items-end gap-2 rounded-md border focus-within:border-[var(--shop-gold-stroke)] transition"
                style={{
                  background: "var(--shop-surface-2)",
                  borderColor: "var(--shop-border-2)",
                }}
              >
                <textarea
                  value={composer}
                  onChange={(e) => setComposer(e.target.value)}
                  rows={2}
                  placeholder="Type your message…"
                  className="flex-1 bg-transparent outline-none text-[13px] resize-none px-3 py-2"
                  style={{ color: "var(--shop-text)" }}
                />
                <button
                  onClick={() => setComposer("")}
                  className="m-1.5 px-3 h-9 rounded-md flex items-center gap-1.5 text-[11px] font-bold tracking-wide hover:brightness-110 transition shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--shop-gold) 0%, var(--shop-gold-2) 100%)",
                    color: "#0a0a0b",
                  }}
                >
                  <Send size={12} />
                  SEND
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

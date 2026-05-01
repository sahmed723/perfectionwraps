"use client";

import { useEffect, useMemo, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Filter, LayoutGrid, List, Plus, Sparkles } from "lucide-react";
import {
  ORDERS,
  STATUS_LABELS,
  STATUS_ORDER,
  STATUS_VAR,
  type WorkOrder,
  type WorkflowStatus,
} from "@/data/shop/orders";
import WorkflowCard from "@/components/shop/WorkflowCard";

const LS_KEY = "shop-order-overrides";

function readOverrides(): Record<string, WorkflowStatus> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeOverrides(o: Record<string, WorkflowStatus>) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LS_KEY, JSON.stringify(o));
  } catch {
    /* ignore */
  }
}

function Column({
  status,
  orders,
  pulseId,
}: {
  status: WorkflowStatus;
  orders: WorkOrder[];
  pulseId: string | null;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: status });
  const c = STATUS_VAR[status];
  return (
    <div className="min-w-[280px] w-[280px] shrink-0 flex flex-col">
      <div
        className="flex items-center justify-between mb-2 px-2 py-1.5 rounded-md"
        style={{
          background: `color-mix(in srgb, ${c} 8%, transparent)`,
          border: `1px solid color-mix(in srgb, ${c} 25%, transparent)`,
        }}
      >
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />
          <span
            className="shop-display text-sm uppercase tracking-wider"
            style={{ color: c }}
          >
            {STATUS_LABELS[status]}
          </span>
        </div>
        <span
          className="shop-mono text-[10px] px-1.5 py-0.5 rounded"
          style={{
            background: "var(--shop-surface-2)",
            color: "var(--shop-text-3)",
          }}
        >
          {orders.length}
        </span>
      </div>
      <div
        ref={setNodeRef}
        className={`flex-1 space-y-2 p-2 rounded-md min-h-[200px] transition-all ${
          isOver ? "ring-1 ring-[var(--shop-gold)]" : ""
        }`}
        style={{
          background: isOver ? "var(--shop-gold-dim)" : "transparent",
          border: "1px dashed var(--shop-border)",
        }}
      >
        {orders.length === 0 ? (
          <div
            className="text-[11px] text-center py-8"
            style={{ color: "var(--shop-text-4)" }}
          >
            Drop here
          </div>
        ) : (
          orders.map((o) => (
            <div
              key={o.id}
              className={pulseId === o.id ? "shop-pulse-gold rounded-lg" : ""}
            >
              <WorkflowCard order={o} draggable />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default function WorkflowPage() {
  const [overrides, setOverrides] = useState<Record<string, WorkflowStatus>>({});
  const [activeId, setActiveId] = useState<string | null>(null);
  const [pulseId, setPulseId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "my-bays" | "vips" | "rush">("all");
  const [view, setView] = useState<"columns" | "list">("columns");

  useEffect(() => {
    setOverrides(readOverrides());
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  );

  const orders = useMemo(() => {
    return ORDERS.map((o) => ({ ...o, status: overrides[o.id] || o.status }));
  }, [overrides]);

  const filtered = useMemo(() => {
    if (filter === "vips") return orders.filter((o) => o.tags.includes("vip"));
    if (filter === "rush") return orders.filter((o) => o.tags.includes("rush"));
    if (filter === "my-bays")
      return orders.filter((o) => o.technicianId === "t-001");
    return orders;
  }, [orders, filter]);

  const byStatus: Record<WorkflowStatus, WorkOrder[]> = useMemo(() => {
    const map = Object.fromEntries(STATUS_ORDER.map((s) => [s, [] as WorkOrder[]])) as Record<
      WorkflowStatus,
      WorkOrder[]
    >;
    filtered.forEach((o) => map[o.status].push(o));
    return map;
  }, [filtered]);

  function handleDragStart(e: DragStartEvent) {
    setActiveId(String(e.active.id));
  }
  function handleDragEnd(e: DragEndEvent) {
    setActiveId(null);
    if (!e.over) return;
    const newStatus = e.over.id as WorkflowStatus;
    const orderId = String(e.active.id);
    setOverrides((prev) => {
      const next = { ...prev, [orderId]: newStatus };
      writeOverrides(next);
      return next;
    });
    setPulseId(orderId);
    setTimeout(() => setPulseId(null), 800);
  }

  const activeOrder = orders.find((o) => o.id === activeId);

  return (
    <div className="space-y-5 max-w-full">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 shop-mono text-[11px] uppercase tracking-wider">
          <Filter size={12} style={{ color: "var(--shop-text-4)" }} />
          {(["all", "my-bays", "vips", "rush"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-2.5 py-1 rounded transition"
              style={{
                background: filter === f ? "var(--shop-gold-dim)" : "var(--shop-surface)",
                color: filter === f ? "var(--shop-gold)" : "var(--shop-text-3)",
                border: `1px solid ${
                  filter === f ? "var(--shop-gold-stroke)" : "var(--shop-border)"
                }`,
              }}
            >
              {f === "my-bays" ? "MY BAYS" : f.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div
            className="flex items-center rounded-md border p-0.5"
            style={{
              background: "var(--shop-surface)",
              borderColor: "var(--shop-border-2)",
            }}
          >
            <button
              onClick={() => setView("columns")}
              className="p-1.5 rounded transition"
              style={{
                background: view === "columns" ? "var(--shop-surface-3)" : "transparent",
                color: view === "columns" ? "var(--shop-gold)" : "var(--shop-text-3)",
              }}
            >
              <LayoutGrid size={14} />
            </button>
            <button
              onClick={() => setView("list")}
              className="p-1.5 rounded transition"
              style={{
                background: view === "list" ? "var(--shop-surface-3)" : "transparent",
                color: view === "list" ? "var(--shop-gold)" : "var(--shop-text-3)",
              }}
            >
              <List size={14} />
            </button>
          </div>
          <button
            className="flex items-center gap-1.5 px-3 h-8 rounded-md text-[12px] font-bold tracking-wide transition hover:brightness-110"
            style={{
              background:
                "linear-gradient(135deg, var(--shop-gold) 0%, var(--shop-gold-2) 100%)",
              color: "#0a0a0b",
            }}
          >
            <Plus size={13} strokeWidth={2.5} />
            NEW ESTIMATE
          </button>
        </div>
      </div>

      {Object.keys(overrides).length > 0 && (
        <div
          className="rounded-md px-3 py-2 text-[11px] flex items-center justify-between"
          style={{
            background: "var(--shop-gold-dim)",
            border: "1px solid var(--shop-gold-stroke)",
            color: "var(--shop-gold)",
          }}
        >
          <span className="flex items-center gap-2">
            <Sparkles size={12} /> Demo edits saved locally — moves persist for this browser.
          </span>
          <button
            onClick={() => {
              setOverrides({});
              writeOverrides({});
            }}
            className="shop-mono uppercase tracking-wider hover:underline"
          >
            Reset
          </button>
        </div>
      )}

      {view === "columns" ? (
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="overflow-x-auto pb-4 -mx-4 px-4 md:-mx-8 md:px-8">
            <div className="flex gap-3 min-w-min">
              {STATUS_ORDER.map((s) => (
                <Column key={s} status={s} orders={byStatus[s]} pulseId={pulseId} />
              ))}
            </div>
          </div>
          <DragOverlay>
            {activeOrder && (
              <div className="opacity-80 rotate-1 w-[260px]">
                <WorkflowCard order={activeOrder} />
              </div>
            )}
          </DragOverlay>
        </DndContext>
      ) : (
        <div
          className="rounded-xl border overflow-hidden"
          style={{
            background: "var(--shop-surface)",
            borderColor: "var(--shop-border)",
          }}
        >
          <div
            className="grid grid-cols-12 gap-2 px-4 py-2 text-[10px] uppercase tracking-[0.2em]"
            style={{ color: "var(--shop-text-4)" }}
          >
            <span className="col-span-2">Order</span>
            <span className="col-span-2">Customer</span>
            <span className="col-span-3">Service</span>
            <span className="col-span-2">Status</span>
            <span className="col-span-2">Tech</span>
            <span className="col-span-1 text-right">Total</span>
          </div>
          <div className="divide-y" style={{ borderColor: "var(--shop-border)" }}>
            {filtered.map((o) => (
              <a
                key={o.id}
                href={`/shop/workflow/${o.id}`}
                className="grid grid-cols-12 gap-2 px-4 py-3 hover:bg-white/[0.02] transition items-center"
                style={{ borderColor: "var(--shop-border)" }}
              >
                <span className="col-span-2 shop-mono text-[11px]" style={{ color: "var(--shop-gold)" }}>
                  {o.id}
                </span>
                <span className="col-span-2 text-[12px]" style={{ color: "var(--shop-text)" }}>
                  {o.customerId}
                </span>
                <span className="col-span-3 text-[12px] truncate" style={{ color: "var(--shop-text-2)" }}>
                  {o.primaryService}
                </span>
                <span className="col-span-2 shop-mono text-[10px] uppercase" style={{ color: STATUS_VAR[o.status] }}>
                  {STATUS_LABELS[o.status]}
                </span>
                <span className="col-span-2 shop-mono text-[11px]" style={{ color: "var(--shop-text-3)" }}>
                  {o.technicianId}
                </span>
                <span className="col-span-1 shop-mono text-[12px] text-right" style={{ color: "var(--shop-gold)" }}>
                  ${o.lineItems.reduce((s, li) => s + li.quantity * li.unitPrice, 0).toLocaleString()}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

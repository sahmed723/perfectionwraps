"use client";

import Link from "next/link";
import { Clock } from "lucide-react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import type { WorkOrder } from "@/data/shop/orders";
import {
  getCustomer,
  getVehicle,
  getTech,
  vehicleGradient,
  vehicleLabel,
  fmtUsd,
  orderTotal,
  customerName,
  timeAgo,
  isSoon,
} from "@/data/shop/helpers";
import { TagChip, TechAvatar } from "./primitives";

export default function WorkflowCard({
  order,
  draggable = false,
}: {
  order: WorkOrder;
  draggable?: boolean;
}) {
  const customer = getCustomer(order.customerId);
  const vehicle = getVehicle(order.vehicleId);
  const tech = getTech(order.technicianId);
  const total = orderTotal(order);
  const promisedSoon = isSoon(order.promisedBy, 24);

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: order.id,
    disabled: !draggable,
    data: { order },
  });

  const style: React.CSSProperties = transform
    ? { transform: CSS.Translate.toString(transform), zIndex: 50 }
    : {};

  if (!customer || !vehicle) return null;

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        opacity: isDragging ? 0.4 : 1,
        background: "var(--shop-surface)",
        borderColor: "var(--shop-border)",
      }}
      {...listeners}
      {...attributes}
      className={`group rounded-lg border overflow-hidden transition-all duration-150 ${
        draggable ? "cursor-grab active:cursor-grabbing" : ""
      } hover:border-[var(--shop-gold-stroke)] hover:-translate-y-0.5`}
    >
      <Link href={`/shop/workflow/${order.id}`} onClick={(e) => isDragging && e.preventDefault()}>
        <div
          className="h-[60px] relative flex items-end px-3 py-2"
          style={{ background: vehicleGradient(vehicle.imageHint) }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.6) 100%)",
            }}
          />
          <div className="relative">
            <div
              className="shop-display text-base uppercase leading-none"
              style={{ color: "#fff" }}
            >
              {vehicleLabel(vehicle)}
            </div>
            <div
              className="shop-mono text-[9px] tracking-[0.18em] mt-1 opacity-80"
              style={{ color: "#fff" }}
            >
              {order.id}
            </div>
          </div>
        </div>
        <div className="p-3 space-y-2">
          <div className="text-[13px] font-bold" style={{ color: "var(--shop-text)" }}>
            {customerName(customer)}
          </div>
          <div className="text-[11px] leading-snug" style={{ color: "var(--shop-text-3)" }}>
            {order.primaryService}
          </div>
          <div className="flex items-center justify-between gap-2">
            <span
              className="shop-mono text-[13px] font-bold"
              style={{ color: "var(--shop-gold)" }}
            >
              {fmtUsd(total)}
            </span>
            <div className="flex gap-1 flex-wrap justify-end">
              {order.tags.slice(0, 2).map((t) => (
                <TagChip key={t} tag={t} />
              ))}
            </div>
          </div>
          <div
            className="flex items-center justify-between gap-2 pt-2 border-t"
            style={{ borderColor: "var(--shop-border)" }}
          >
            <div className="flex items-center gap-2">
              {tech && <TechAvatar initials={tech.initials} size={20} />}
              <span
                className="shop-mono text-[10px] uppercase tracking-wider"
                style={{ color: "var(--shop-text-3)" }}
              >
                {tech?.initials || "—"}
              </span>
            </div>
            <div
              className="shop-mono text-[10px] flex items-center gap-1"
              style={{
                color: promisedSoon ? "var(--status-lost)" : "var(--shop-text-4)",
              }}
            >
              <Clock size={10} />
              {order.promisedBy ? timeAgo(order.promisedBy).replace(" ago", "") : timeAgo(order.createdAt)}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

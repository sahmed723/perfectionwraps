import Link from "next/link";
import { notFound } from "next/navigation";
import { Phone, Mail, MapPin } from "lucide-react";
import { CUSTOMERS } from "@/data/shop/customers";
import {
  customerInitials,
  customerName,
  customerOrders,
  customerVehicles,
  fmtUsd,
  orderTotal,
  vehicleGradient,
  vehicleLabel,
} from "@/data/shop/helpers";
import {
  StatusPill,
  TechAvatar,
  VehicleHero,
  TagChip,
  KpiCard,
} from "@/components/shop/primitives";
import CustomerList from "@/components/shop/CustomerList";

export function generateStaticParams() {
  return CUSTOMERS.map((c) => ({ customerId: c.id }));
}

export default function CustomerDetail({
  params,
}: {
  params: { customerId: string };
}) {
  const c = CUSTOMERS.find((x) => x.id === params.customerId);
  if (!c) notFound();
  const vehicles = customerVehicles(c.id);
  const orders = customerOrders(c.id);
  const aov = c.totalJobs ? Math.round(c.ltv / c.totalJobs) : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1500px] mx-auto w-full">
      <div className="lg:col-span-5">
        <CustomerList activeId={c.id} />
      </div>

      <div className="lg:col-span-7 space-y-5">
        <div
          className="rounded-xl border p-6 shop-fade-up"
          style={{
            background: "var(--shop-surface)",
            borderColor: "var(--shop-border)",
          }}
        >
          <div className="flex items-start gap-4 flex-wrap">
            <TechAvatar initials={customerInitials(c)} size={64} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1
                  className="shop-display text-3xl md:text-4xl uppercase leading-none"
                  style={{ color: "var(--shop-text)" }}
                >
                  {customerName(c)}
                </h1>
                {c.tags.map((t) => (
                  <TagChip key={t} tag={t} />
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[12.5px]" style={{ color: "var(--shop-text-2)" }}>
                <a href={`tel:${c.phone}`} className="flex items-center gap-1.5 hover:text-white transition shop-mono">
                  <Phone size={11} /> {c.phone}
                </a>
                {c.email && (
                  <a href={`mailto:${c.email}`} className="flex items-center gap-1.5 hover:text-white transition">
                    <Mail size={11} /> {c.email}
                  </a>
                )}
                <span className="flex items-center gap-1.5">
                  <MapPin size={11} /> {c.city}, GA
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <KpiCard title="Lifetime Value" value={fmtUsd(c.ltv)} delay={0} />
          <KpiCard title="Total Jobs" value={c.totalJobs} delay={60} />
          <KpiCard title="Avg Order" value={fmtUsd(aov)} delay={120} />
          <KpiCard
            title="First Job"
            value={new Date(c.firstJobAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
            delay={180}
          />
        </div>

        <div
          className="rounded-xl border overflow-hidden shop-fade-up"
          style={{
            background: "var(--shop-surface)",
            borderColor: "var(--shop-border)",
          }}
        >
          <div className="px-5 py-3 border-b flex items-center justify-between" style={{ borderColor: "var(--shop-border)" }}>
            <h3 className="shop-display text-lg uppercase" style={{ color: "var(--shop-text)" }}>
              Garage · {vehicles.length}
            </h3>
          </div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {vehicles.map((v) => (
              <VehicleHero
                key={v.id}
                hint={v.imageHint}
                label={vehicleLabel(v)}
                sub={`${v.color} · ${v.plate || ""}`}
                height={120}
              />
            ))}
          </div>
        </div>

        <div
          className="rounded-xl border overflow-hidden shop-fade-up"
          style={{
            background: "var(--shop-surface)",
            borderColor: "var(--shop-border)",
          }}
        >
          <div className="px-5 py-3 border-b flex items-center justify-between" style={{ borderColor: "var(--shop-border)" }}>
            <h3 className="shop-display text-lg uppercase" style={{ color: "var(--shop-text)" }}>
              Job history · {orders.length}
            </h3>
          </div>
          {orders.length === 0 ? (
            <div className="px-5 py-8 text-center text-[12px]" style={{ color: "var(--shop-text-3)" }}>
              No jobs yet — this is a fresh lead.
            </div>
          ) : (
            <table className="w-full text-[12px]">
              <thead>
                <tr style={{ color: "var(--shop-text-4)" }}>
                  <th className="text-left px-5 py-2 text-[10px] uppercase tracking-wider font-normal">Order</th>
                  <th className="text-left px-5 py-2 text-[10px] uppercase tracking-wider font-normal">Service</th>
                  <th className="text-left px-5 py-2 text-[10px] uppercase tracking-wider font-normal">Status</th>
                  <th className="px-5 py-2 text-right text-[10px] uppercase tracking-wider font-normal">Total</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-t" style={{ borderColor: "var(--shop-border)" }}>
                    <td className="px-5 py-3">
                      <Link
                        href={`/shop/workflow/${o.id}`}
                        className="shop-mono hover:text-white transition"
                        style={{ color: "var(--shop-gold)" }}
                      >
                        {o.id}
                      </Link>
                    </td>
                    <td className="px-5 py-3" style={{ color: "var(--shop-text-2)" }}>
                      {o.primaryService}
                    </td>
                    <td className="px-5 py-3">
                      <StatusPill status={o.status} />
                    </td>
                    <td className="px-5 py-3 text-right shop-mono font-bold" style={{ color: "var(--shop-text)" }}>
                      {fmtUsd(orderTotal(o))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {c.notes && (
          <div
            className="rounded-xl border p-5 shop-fade-up"
            style={{
              background: "var(--shop-surface)",
              borderColor: "var(--shop-border)",
            }}
          >
            <h3 className="shop-display text-lg uppercase mb-2" style={{ color: "var(--shop-text)" }}>
              Notes
            </h3>
            <p className="text-[13px] leading-relaxed" style={{ color: "var(--shop-text-2)" }}>
              {c.notes}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

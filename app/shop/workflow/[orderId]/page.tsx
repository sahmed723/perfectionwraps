import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Send,
  FileText,
  Printer,
  CheckCircle2,
  Camera,
  Clock,
} from "lucide-react";
import {
  ORDERS,
  STATUS_LABELS,
  type WorkOrder,
} from "@/data/shop/orders";
import {
  customerName,
  customerInitials,
  fmtUsd,
  getCustomer,
  getTech,
  getVehicle,
  orderTotal,
  vehicleGradient,
  vehicleLabel,
  timeAgo,
} from "@/data/shop/helpers";
import {
  StatusPill,
  TagChip,
  TechAvatar,
  VehicleHero,
} from "@/components/shop/primitives";

export function generateStaticParams() {
  return ORDERS.map((o) => ({ orderId: o.id }));
}

const STAGE_LABEL = { before: "BEFORE", "in-progress": "IN PROGRESS", after: "AFTER" } as const;
const STAGE_COLOR: Record<string, string> = {
  before: "var(--status-new)",
  "in-progress": "var(--status-progress)",
  after: "var(--status-won)",
};

function lineGroup(order: WorkOrder, type: "service" | "material" | "labor" | "fee") {
  return order.lineItems.filter((li) => li.type === type);
}

export default function OrderDetail({ params }: { params: { orderId: string } }) {
  const order = ORDERS.find((o) => o.id === params.orderId);
  if (!order) notFound();

  const customer = getCustomer(order.customerId)!;
  const vehicle = getVehicle(order.vehicleId)!;
  const tech = getTech(order.technicianId)!;
  const subtotal = orderTotal(order);
  const tax = +(subtotal * 0.07).toFixed(2);
  const total = subtotal + tax;

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto w-full">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3 flex-wrap">
          <Link
            href="/shop/workflow"
            className="flex items-center gap-1.5 px-2 py-1 rounded text-[11px] uppercase tracking-wider hover:bg-white/5 transition"
            style={{ color: "var(--shop-text-3)" }}
          >
            <ArrowLeft size={12} /> Workflow
          </Link>
          <span
            className="shop-mono text-[12px] font-bold"
            style={{ color: "var(--shop-gold)" }}
          >
            {order.id}
          </span>
          <StatusPill status={order.status} large />
          <div className="flex gap-1">
            {order.tags.map((t) => (
              <TagChip key={t} tag={t} />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-1.5 px-3 h-8 rounded-md text-[11px] font-bold uppercase tracking-wider border hover:bg-white/5 transition"
            style={{
              borderColor: "var(--shop-border-2)",
              color: "var(--shop-text-2)",
            }}
          >
            <Send size={12} /> Send Update
          </button>
          <button
            className="flex items-center gap-1.5 px-3 h-8 rounded-md text-[11px] font-bold uppercase tracking-wider border hover:bg-white/5 transition"
            style={{
              borderColor: "var(--shop-border-2)",
              color: "var(--shop-text-2)",
            }}
          >
            <FileText size={12} /> Convert to Invoice
          </button>
          <button
            className="flex items-center gap-1.5 px-3 h-8 rounded-md text-[11px] font-bold uppercase tracking-wider border hover:bg-white/5 transition"
            style={{
              borderColor: "var(--shop-border-2)",
              color: "var(--shop-text-2)",
            }}
          >
            <Printer size={12} /> Print
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-5">
          <div
            className="rounded-xl border overflow-hidden shop-fade-up"
            style={{
              background: "var(--shop-surface)",
              borderColor: "var(--shop-border)",
            }}
          >
            <VehicleHero
              hint={vehicle.imageHint}
              label={vehicleLabel(vehicle)}
              sub={vehicle.color}
              height={200}
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5">
              <div>
                <div className="text-[10px] uppercase tracking-[0.25em]" style={{ color: "var(--shop-text-4)" }}>VIN</div>
                <div className="shop-mono text-[12px] mt-1" style={{ color: "var(--shop-text-2)" }}>
                  {vehicle.vin || "—"}
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.25em]" style={{ color: "var(--shop-text-4)" }}>Plate</div>
                <div className="shop-mono text-[12px] mt-1" style={{ color: "var(--shop-text-2)" }}>
                  {vehicle.plate || "—"}
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.25em]" style={{ color: "var(--shop-text-4)" }}>Scheduled</div>
                <div className="shop-mono text-[12px] mt-1" style={{ color: "var(--shop-text-2)" }}>
                  {order.scheduledFor
                    ? new Date(order.scheduledFor).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                    : "Not yet"}
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.25em]" style={{ color: "var(--shop-text-4)" }}>Promised</div>
                <div className="shop-mono text-[12px] mt-1" style={{ color: "var(--shop-text-2)" }}>
                  {order.promisedBy
                    ? new Date(order.promisedBy).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                    : "—"}
                </div>
              </div>
            </div>
          </div>

          <div
            className="rounded-xl border overflow-hidden shop-fade-up"
            style={{
              background: "var(--shop-surface)",
              borderColor: "var(--shop-border)",
              animationDelay: "80ms",
            }}
          >
            <div
              className="px-5 py-3 border-b flex items-center justify-between"
              style={{ borderColor: "var(--shop-border)" }}
            >
              <h3 className="shop-display text-lg uppercase" style={{ color: "var(--shop-text)" }}>
                Services & Line Items
              </h3>
              <span className="shop-mono text-[10px] uppercase tracking-wider" style={{ color: "var(--shop-text-4)" }}>
                {order.lineItems.length} ITEMS
              </span>
            </div>
            <table className="w-full text-[12px]">
              <thead>
                <tr style={{ color: "var(--shop-text-4)" }}>
                  <th className="text-left px-5 py-2 text-[10px] uppercase tracking-wider font-normal">Description</th>
                  <th className="px-5 py-2 text-right text-[10px] uppercase tracking-wider font-normal">Qty</th>
                  <th className="px-5 py-2 text-right text-[10px] uppercase tracking-wider font-normal">Unit</th>
                  <th className="px-5 py-2 text-right text-[10px] uppercase tracking-wider font-normal">Total</th>
                </tr>
              </thead>
              <tbody>
                {(["service", "material", "labor", "fee"] as const).map((type) => {
                  const rows = lineGroup(order, type);
                  if (rows.length === 0) return null;
                  return (
                    <>
                      <tr key={`${type}-h`}>
                        <td colSpan={4} className="px-5 pt-4 pb-2 text-[10px] uppercase tracking-[0.25em]" style={{ color: "var(--shop-gold)" }}>
                          {type === "service"
                            ? "Services"
                            : type === "material"
                            ? "Materials"
                            : type === "labor"
                            ? "Labor"
                            : "Fees"}
                        </td>
                      </tr>
                      {rows.map((li) => (
                        <tr
                          key={li.id}
                          className="border-t"
                          style={{ borderColor: "var(--shop-border)" }}
                        >
                          <td className="px-5 py-3" style={{ color: "var(--shop-text)" }}>
                            {li.description}
                          </td>
                          <td className="px-5 py-3 text-right shop-mono" style={{ color: "var(--shop-text-2)" }}>
                            {li.quantity}{li.unit ? ` ${li.unit}` : ""}
                          </td>
                          <td className="px-5 py-3 text-right shop-mono" style={{ color: "var(--shop-text-2)" }}>
                            {fmtUsd(li.unitPrice, true)}
                          </td>
                          <td className="px-5 py-3 text-right shop-mono font-bold" style={{ color: "var(--shop-text)" }}>
                            {fmtUsd(li.quantity * li.unitPrice)}
                          </td>
                        </tr>
                      ))}
                    </>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="border-t" style={{ borderColor: "var(--shop-border)" }}>
                  <td colSpan={3} className="px-5 py-2 text-right text-[11px] uppercase tracking-wider" style={{ color: "var(--shop-text-3)" }}>
                    Subtotal
                  </td>
                  <td className="px-5 py-2 text-right shop-mono" style={{ color: "var(--shop-text-2)" }}>
                    {fmtUsd(subtotal)}
                  </td>
                </tr>
                <tr>
                  <td colSpan={3} className="px-5 py-1 text-right text-[11px] uppercase tracking-wider" style={{ color: "var(--shop-text-3)" }}>
                    Tax (7%)
                  </td>
                  <td className="px-5 py-1 text-right shop-mono" style={{ color: "var(--shop-text-2)" }}>
                    {fmtUsd(tax, true)}
                  </td>
                </tr>
                <tr className="border-t" style={{ borderColor: "var(--shop-border)" }}>
                  <td colSpan={3} className="px-5 py-3 text-right text-[11px] uppercase tracking-[0.25em]" style={{ color: "var(--shop-gold)" }}>
                    TOTAL
                  </td>
                  <td className="px-5 py-3 text-right shop-mono text-2xl font-bold" style={{ color: "var(--shop-gold)" }}>
                    {fmtUsd(total)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div
            className="rounded-xl border overflow-hidden shop-fade-up"
            style={{
              background: "var(--shop-surface)",
              borderColor: "var(--shop-border)",
              animationDelay: "160ms",
            }}
          >
            <div className="px-5 py-3 border-b flex items-center justify-between" style={{ borderColor: "var(--shop-border)" }}>
              <h3 className="shop-display text-lg uppercase flex items-center gap-2" style={{ color: "var(--shop-text)" }}>
                <Camera size={14} /> Photo timeline
              </h3>
              <span className="shop-mono text-[10px] uppercase tracking-wider" style={{ color: "var(--shop-text-4)" }}>
                {order.photos.length} PHOTOS
              </span>
            </div>
            <div className="p-5">
              {order.photos.length === 0 ? (
                <div className="text-center py-10 text-[12px]" style={{ color: "var(--shop-text-3)" }}>
                  No photos yet — they'll appear as the tech uploads them from the bay.
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {order.photos.map((p) => (
                    <div
                      key={p.id}
                      className="aspect-video rounded-md overflow-hidden relative border"
                      style={{
                        background: vehicleGradient(vehicle.imageHint),
                        borderColor: "var(--shop-border-2)",
                      }}
                    >
                      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.8) 100%)" }} />
                      <div
                        className="absolute top-2 left-2 px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider font-bold"
                        style={{
                          background: `color-mix(in srgb, ${STAGE_COLOR[p.stage]} 20%, transparent)`,
                          color: STAGE_COLOR[p.stage],
                        }}
                      >
                        {STAGE_LABEL[p.stage]}
                      </div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <div className="text-[11px] font-bold text-white truncate">{p.caption}</div>
                        <div className="shop-mono text-[9px] uppercase tracking-wider text-white/70">
                          {timeAgo(p.takenAt)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {order.notes && (
            <div
              className="rounded-xl border p-5 shop-fade-up"
              style={{
                background: "var(--shop-surface)",
                borderColor: "var(--shop-border)",
                animationDelay: "240ms",
              }}
            >
              <h3 className="shop-display text-lg uppercase mb-2" style={{ color: "var(--shop-text)" }}>
                Notes
              </h3>
              <p className="text-[13px] leading-relaxed" style={{ color: "var(--shop-text-2)" }}>
                {order.notes}
              </p>
              <button
                className="mt-3 text-[11px] uppercase tracking-wider hover:text-white transition"
                style={{ color: "var(--shop-gold)" }}
              >
                + Add note
              </button>
            </div>
          )}
        </div>

        <div className="lg:col-span-4 space-y-5">
          <div
            className="rounded-xl border p-5 shop-fade-up"
            style={{
              background: "var(--shop-surface)",
              borderColor: "var(--shop-border)",
              animationDelay: "60ms",
            }}
          >
            <Link
              href={`/shop/customers/${customer.id}`}
              className="flex items-center gap-3 mb-4 group"
            >
              <TechAvatar initials={customerInitials(customer)} size={42} />
              <div>
                <div className="shop-display text-xl uppercase group-hover:text-[var(--shop-gold)] transition" style={{ color: "var(--shop-text)" }}>
                  {customerName(customer)}
                </div>
                <div className="text-[11px]" style={{ color: "var(--shop-text-3)" }}>
                  {customer.tags.length > 0 && customer.tags.join(" · ").toUpperCase()}
                </div>
              </div>
            </Link>
            <div className="space-y-2 text-[12px]" style={{ color: "var(--shop-text-2)" }}>
              <div className="flex items-center gap-2">
                <Phone size={11} style={{ color: "var(--shop-text-4)" }} />
                <a href={`tel:${customer.phone}`} className="shop-mono hover:text-white transition">
                  {customer.phone}
                </a>
              </div>
              {customer.email && (
                <div className="flex items-center gap-2">
                  <Mail size={11} style={{ color: "var(--shop-text-4)" }} />
                  <a href={`mailto:${customer.email}`} className="hover:text-white transition truncate">
                    {customer.email}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-2">
                <MapPin size={11} style={{ color: "var(--shop-text-4)" }} />
                <span>{customer.city}</span>
              </div>
            </div>
            <div
              className="mt-4 pt-4 border-t flex justify-between text-[11px]"
              style={{ borderColor: "var(--shop-border)" }}
            >
              <span style={{ color: "var(--shop-text-3)" }}>
                LTV{" "}
                <span className="shop-mono font-bold" style={{ color: "var(--shop-gold)" }}>
                  {fmtUsd(customer.ltv)}
                </span>
              </span>
              <span style={{ color: "var(--shop-text-3)" }}>
                <span className="shop-mono font-bold" style={{ color: "var(--shop-text)" }}>
                  {customer.totalJobs}
                </span>{" "}
                jobs
              </span>
            </div>
          </div>

          <div
            className="rounded-xl border p-5 shop-fade-up"
            style={{
              background: "var(--shop-surface)",
              borderColor: "var(--shop-border)",
              animationDelay: "120ms",
            }}
          >
            <h3 className="shop-display text-lg uppercase mb-3" style={{ color: "var(--shop-text)" }}>
              Activity
            </h3>
            <ol className="space-y-3 relative">
              <span
                className="absolute left-[7px] top-2 bottom-2 w-px"
                style={{ background: "var(--shop-border)" }}
              />
              <ActivityRow done at={order.authorizedAt || order.createdAt} label="Estimate signed" />
              {order.scheduledFor && (
                <ActivityRow done at={order.scheduledFor} label={`Scheduled for ${new Date(order.scheduledFor).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`} />
              )}
              <ActivityRow
                done={order.status !== "scheduled" && order.status !== "approved" && order.status !== "quote"}
                pulse={order.status === "in-bay"}
                at={order.scheduledFor || order.createdAt}
                label="Tech clocked in"
              />
              {order.photos[0] && (
                <ActivityRow done at={order.photos[0].takenAt} label={`First photo · ${order.photos[0].stage}`} />
              )}
              <ActivityRow
                done={order.status === "ready" || order.status === "invoiced"}
                pulse={order.status === "photo-qc" || order.status === "ready"}
                at={order.photos[order.photos.length - 1]?.takenAt || order.createdAt}
                label="Photo QC"
              />
              <ActivityRow
                done={order.status === "invoiced"}
                pulse={order.status === "ready"}
                at={order.paidAt || order.createdAt}
                label={order.paidAt ? "Invoice paid" : "Awaiting pickup"}
              />
            </ol>
          </div>

          <div
            className="rounded-xl border shop-fade-up"
            style={{
              background: "var(--shop-surface)",
              borderColor: "var(--shop-border)",
              animationDelay: "180ms",
            }}
          >
            <div className="px-5 py-3 border-b flex items-center justify-between" style={{ borderColor: "var(--shop-border)" }}>
              <h3 className="shop-display text-lg uppercase" style={{ color: "var(--shop-text)" }}>
                Messages
              </h3>
              <Link
                href="/shop/messages"
                className="text-[11px] uppercase tracking-wider hover:text-white transition"
                style={{ color: "var(--shop-gold)" }}
              >
                Full thread →
              </Link>
            </div>
            <div className="p-3 space-y-2 max-h-[280px] overflow-y-auto">
              {order.messages.slice(-3).map((m) => (
                <div
                  key={m.id}
                  className="rounded-md px-3 py-2 max-w-[85%] text-[12px]"
                  style={{
                    background:
                      m.direction === "out"
                        ? "color-mix(in srgb, var(--shop-gold) 14%, transparent)"
                        : "var(--shop-surface-2)",
                    color: m.direction === "out" ? "var(--shop-text)" : "var(--shop-text-2)",
                    marginLeft: m.direction === "out" ? "auto" : 0,
                  }}
                >
                  {m.body}
                  <div
                    className="shop-mono text-[9px] uppercase tracking-wider mt-1 opacity-60 flex items-center gap-1"
                  >
                    <Clock size={9} /> {timeAgo(m.sentAt)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {order.authorizedAt && (
            <div
              className="rounded-xl border p-5 shop-fade-up"
              style={{
                background: "var(--shop-surface)",
                borderColor: "var(--shop-border)",
                animationDelay: "240ms",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 size={14} style={{ color: "var(--status-won)" }} />
                <span className="text-[12px] font-bold" style={{ color: "var(--shop-text)" }}>
                  Customer authorized
                </span>
              </div>
              <div className="text-[11px]" style={{ color: "var(--shop-text-3)" }}>
                {new Date(order.authorizedAt).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
              </div>
              <div
                className="mt-3 px-4 py-3 italic text-lg"
                style={{
                  fontFamily: "cursive",
                  color: "var(--shop-gold)",
                  borderBottom: "1px solid var(--shop-border-2)",
                }}
              >
                {customer.firstName} {customer.lastName}
              </div>
              <div className="shop-mono text-[10px] uppercase tracking-wider mt-1" style={{ color: "var(--shop-text-4)" }}>
                E-signature on file
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ActivityRow({
  label,
  at,
  done,
  pulse,
}: {
  label: string;
  at: string;
  done?: boolean;
  pulse?: boolean;
}) {
  const color = done
    ? "var(--status-won)"
    : pulse
    ? "var(--shop-gold)"
    : "var(--shop-text-4)";
  return (
    <li className="relative pl-6 flex items-start justify-between gap-2">
      <span
        className={`absolute left-0 top-1 w-3.5 h-3.5 rounded-full border-2 ${pulse ? "shop-pulse-gold" : ""}`}
        style={{
          borderColor: color,
          background: done ? color : "transparent",
        }}
      />
      <div className="flex-1 min-w-0">
        <div className="text-[12px]" style={{ color: "var(--shop-text)" }}>
          {label}
        </div>
        <div className="shop-mono text-[10px] uppercase tracking-wider" style={{ color: "var(--shop-text-4)" }}>
          {timeAgo(at)}
        </div>
      </div>
    </li>
  );
}

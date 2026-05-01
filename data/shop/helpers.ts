import { CUSTOMERS, type Customer } from "./customers";
import { VEHICLES, type Vehicle } from "./vehicles";
import { ORDERS, TECHNICIANS, type WorkOrder, type Technician } from "./orders";

export function getCustomer(id: string): Customer | undefined {
  return CUSTOMERS.find((c) => c.id === id);
}
export function getVehicle(id: string): Vehicle | undefined {
  return VEHICLES.find((v) => v.id === id);
}
export function getOrder(id: string): WorkOrder | undefined {
  return ORDERS.find((o) => o.id === id);
}
export function getTech(id: string): Technician | undefined {
  return TECHNICIANS.find((t) => t.id === id);
}
export function customerVehicles(customerId: string): Vehicle[] {
  return VEHICLES.filter((v) => v.customerId === customerId);
}
export function customerOrders(customerId: string): WorkOrder[] {
  return ORDERS.filter((o) => o.customerId === customerId).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}
export function orderTotal(o: WorkOrder): number {
  return o.lineItems.reduce((s, li) => s + li.quantity * li.unitPrice, 0);
}
export function orderMaterialCost(o: WorkOrder): number {
  return o.lineItems
    .filter((li) => li.type === "material" || li.type === "labor")
    .reduce((s, li) => s + li.quantity * li.unitCost, 0);
}
export function fmt(n: number, opts: Intl.NumberFormatOptions = {}): string {
  return new Intl.NumberFormat("en-US", opts).format(n);
}
export function fmtUsd(n: number, withCents = false): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: withCents ? 2 : 0,
    maximumFractionDigits: withCents ? 2 : 0,
  }).format(n);
}
export function timeAgo(iso: string): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const s = Math.max(1, Math.round((now - then) / 1000));
  if (s < 60) return `${s}s ago`;
  const m = Math.round(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.round(h / 24);
  if (d < 7) return `${d}d ago`;
  const w = Math.round(d / 7);
  if (w < 5) return `${w}w ago`;
  const mo = Math.round(d / 30);
  if (mo < 12) return `${mo}mo ago`;
  return `${Math.round(d / 365)}y ago`;
}
export function vehicleGradient(hint: string): string {
  const map: Record<string, string> = {
    "tesla-white": "linear-gradient(135deg, #E8E4DC 0%, #B8B4AC 100%)",
    "bmw-white": "linear-gradient(135deg, #F2EFEA 0%, #ABA89F 100%)",
    "porsche-red": "linear-gradient(135deg, #C41E3A 0%, #5C0E1B 100%)",
    "truck-black": "linear-gradient(135deg, #2A2A2D 0%, #0A0A0B 100%)",
    "truck-white": "linear-gradient(135deg, #EFEDE7 0%, #B0AEA6 100%)",
    "van-white": "linear-gradient(135deg, #E5E3DD 0%, #ACA9A0 100%)",
    "bmw-grey": "linear-gradient(135deg, #6E7173 0%, #2E3133 100%)",
    "audi-grey": "linear-gradient(135deg, #6E7173 0%, #383B3D 100%)",
    "suv-grey": "linear-gradient(135deg, #65696B 0%, #303335 100%)",
    "cyber-silver": "linear-gradient(135deg, #C8CCD0 0%, #6A6E72 100%)",
    "civic-blue": "linear-gradient(135deg, #2C5F9E 0%, #122E4A 100%)",
  };
  return map[hint] || "linear-gradient(135deg, #2A2A2D 0%, #0A0A0B 100%)";
}
export function vehicleLabel(v: Vehicle): string {
  return [v.year, v.make, v.model, v.trim].filter(Boolean).join(" ");
}
export function customerName(c: Customer): string {
  return `${c.firstName} ${c.lastName}`;
}
export function customerInitials(c: Customer): string {
  return `${c.firstName[0]}${c.lastName[0]}`;
}
export function pct(part: number, whole: number): number {
  if (!whole) return 0;
  return Math.round((part / whole) * 100);
}
export function isOverdue(iso?: string): boolean {
  if (!iso) return false;
  return new Date(iso).getTime() < Date.now();
}
export function isSoon(iso?: string, hours = 24): boolean {
  if (!iso) return false;
  const diff = new Date(iso).getTime() - Date.now();
  return diff > 0 && diff < hours * 3600 * 1000;
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  KanbanSquare,
  Calendar,
  Users,
  Package,
  BarChart3,
  MessageSquare,
  HelpCircle,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { ORDERS } from "@/data/shop/orders";
import { INVENTORY } from "@/data/shop/inventory";
import { THREADS } from "@/data/shop/messages";

const baseLinks = [
  { href: "/shop", label: "Dashboard", Icon: LayoutDashboard, exact: true },
  { href: "/shop/workflow", label: "Workflow", Icon: KanbanSquare },
  { href: "/shop/calendar", label: "Calendar", Icon: Calendar },
  { href: "/shop/customers", label: "Customers", Icon: Users },
  { href: "/shop/inventory", label: "Inventory", Icon: Package },
  { href: "/shop/reports", label: "Reports", Icon: BarChart3 },
  { href: "/shop/messages", label: "Messages", Icon: MessageSquare },
];

export default function ShopSidebar() {
  const pathname = usePathname();
  const inProgress = ORDERS.filter(
    (o) => o.status === "in-bay" || o.status === "photo-qc"
  ).length;
  const lowStock = INVENTORY.filter((i) => i.onHand <= i.reorderAt).length;
  const unread = THREADS.filter((t) => t.unread).length;

  const badges: Record<string, { count: number; tone?: "gold" | "danger" }> = {
    "/shop/workflow": { count: inProgress, tone: "gold" },
    "/shop/inventory": { count: lowStock, tone: "danger" },
    "/shop/messages": { count: unread, tone: "gold" },
  };

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <aside
      className="hidden md:flex flex-col w-[260px] shrink-0 h-screen sticky top-0 border-r"
      style={{ background: "var(--shop-surface)", borderColor: "var(--shop-border)" }}
    >
      <div className="p-5 border-b" style={{ borderColor: "var(--shop-border)" }}>
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-md flex items-center justify-center shrink-0"
            style={{
              background:
                "linear-gradient(135deg, var(--shop-gold) 0%, var(--shop-gold-2) 100%)",
            }}
          >
            <Sparkles size={18} className="text-black" />
          </div>
          <div className="min-w-0">
            <div
              className="shop-display text-lg leading-none uppercase truncate"
              style={{ color: "var(--shop-text)" }}
            >
              Perfection Wraps
            </div>
            <div
              className="text-[10px] mt-1 uppercase tracking-[0.2em]"
              style={{ color: "var(--shop-text-4)" }}
            >
              Shop OS · Beta
            </div>
          </div>
        </div>

        <div
          className="mt-4 flex items-center gap-2 p-2 rounded-md"
          style={{ background: "var(--shop-surface-2)" }}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold"
            style={{
              background:
                "linear-gradient(135deg, var(--shop-gold) 0%, var(--shop-gold-2) 100%)",
              color: "#000",
            }}
          >
            HD
          </div>
          <div className="text-xs">
            <div style={{ color: "var(--shop-text)" }} className="font-semibold">
              HD Patel
            </div>
            <div style={{ color: "var(--shop-text-3)" }} className="text-[10px] uppercase tracking-wider">
              Owner · Online
            </div>
          </div>
          <span
            className="ml-auto w-2 h-2 rounded-full"
            style={{ background: "var(--status-won)" }}
          />
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-0.5">
        {baseLinks.map(({ href, label, Icon, exact }) => {
          const active = isActive(href, exact);
          const badge = badges[href];
          return (
            <Link
              key={href}
              href={href}
              className="group relative flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-150"
              style={{
                background: active ? "var(--shop-gold-dim)" : "transparent",
                color: active ? "var(--shop-text)" : "var(--shop-text-3)",
              }}
            >
              {active && (
                <span
                  className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r-sm"
                  style={{ background: "var(--shop-gold)" }}
                />
              )}
              <Icon
                size={16}
                strokeWidth={1.6}
                className="shrink-0 transition-colors"
                style={{ color: active ? "var(--shop-gold)" : "currentColor" }}
              />
              <span className="text-[13px] tracking-wide font-medium flex-1">
                {label}
              </span>
              {badge && badge.count > 0 && (
                <span
                  className="text-[10px] px-1.5 py-0.5 rounded shop-mono font-bold"
                  style={{
                    background:
                      badge.tone === "danger"
                        ? "rgba(229,96,92,0.15)"
                        : "var(--shop-gold-dim)",
                    color:
                      badge.tone === "danger" ? "var(--status-lost)" : "var(--shop-gold)",
                  }}
                >
                  {badge.count}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t space-y-1" style={{ borderColor: "var(--shop-border)" }}>
        <button
          className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-[12px] hover:bg-white/5 transition"
          style={{ color: "var(--shop-text-3)" }}
        >
          <HelpCircle size={14} strokeWidth={1.6} />
          Help & shortcuts
        </button>
        <Link
          href="/"
          className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-[12px] hover:bg-white/5 transition"
          style={{ color: "var(--shop-text-3)" }}
        >
          <ExternalLink size={14} strokeWidth={1.6} />
          Public site
        </Link>
      </div>
    </aside>
  );
}

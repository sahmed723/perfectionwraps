"use client";

import { Bell, Plus, Search, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

const titleMap: Record<string, string> = {
  "/shop": "Dashboard",
  "/shop/workflow": "Workflow",
  "/shop/calendar": "Calendar",
  "/shop/customers": "Customers",
  "/shop/inventory": "Inventory",
  "/shop/reports": "Reports",
  "/shop/messages": "Messages",
};

function pageTitle(pathname: string) {
  if (pathname.startsWith("/shop/workflow/")) return "Work Order";
  if (pathname.startsWith("/shop/customers/")) return "Customer";
  return titleMap[pathname] || "Shop";
}

export default function ShopTopBar() {
  const pathname = usePathname();
  const [openNew, setOpenNew] = useState(false);
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <header
      className="sticky top-0 z-30 h-[60px] flex items-center px-4 md:px-6 gap-3 border-b backdrop-blur"
      style={{
        background: "rgba(10,10,11,0.85)",
        borderColor: "var(--shop-border)",
      }}
    >
      <button
        className="md:hidden p-2 rounded hover:bg-white/5 transition"
        style={{ color: "var(--shop-text-3)" }}
        aria-label="menu"
      >
        <Menu size={18} />
      </button>
      <h1
        className="shop-display text-2xl uppercase shrink-0"
        style={{ color: "var(--shop-text)" }}
      >
        {pageTitle(pathname)}
      </h1>

      <div
        className="hidden md:flex items-center flex-1 max-w-xl mx-6 rounded-md px-3 h-9 gap-2 border"
        style={{
          background: "var(--shop-surface)",
          borderColor: "var(--shop-border-2)",
        }}
      >
        <Search size={14} style={{ color: "var(--shop-text-4)" }} />
        <input
          type="text"
          placeholder="Search vehicles, customers, work orders…"
          className="bg-transparent outline-none text-[13px] flex-1"
          style={{ color: "var(--shop-text)" }}
        />
        <span
          className="hidden lg:block shop-mono text-[10px] px-1.5 py-0.5 rounded border"
          style={{
            color: "var(--shop-text-4)",
            borderColor: "var(--shop-border-2)",
          }}
        >
          ⌘K
        </span>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <span
          className="hidden md:inline shop-mono text-[10px] uppercase tracking-[0.2em]"
          style={{ color: "var(--shop-text-4)" }}
        >
          {today}
        </span>
        <button
          className="relative p-2 rounded hover:bg-white/5 transition"
          style={{ color: "var(--shop-text-3)" }}
          aria-label="notifications"
        >
          <Bell size={16} />
          <span
            className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--status-lost)" }}
          />
        </button>
        <div className="relative">
          <button
            onClick={() => setOpenNew((v) => !v)}
            className="flex items-center gap-1.5 px-3 h-8 rounded-md text-[12px] font-bold tracking-wide transition hover:brightness-110"
            style={{
              background:
                "linear-gradient(135deg, var(--shop-gold) 0%, var(--shop-gold-2) 100%)",
              color: "#0a0a0b",
            }}
          >
            <Plus size={13} strokeWidth={2.5} />
            NEW
          </button>
          {openNew && (
            <div
              className="absolute right-0 top-9 w-48 rounded-md border shop-slide-in z-40"
              style={{
                background: "var(--shop-surface)",
                borderColor: "var(--shop-border-2)",
              }}
            >
              {["Estimate", "Appointment", "Customer", "Inventory item"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setOpenNew(false)}
                  className="w-full text-left px-3 py-2 text-[13px] hover:bg-white/5 transition"
                  style={{ color: "var(--shop-text-2)" }}
                >
                  + {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

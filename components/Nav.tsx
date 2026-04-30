"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-ink/85 backdrop-blur-md border-b border-bone/5" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-14 md:h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group">
          <div className="w-7 h-7 relative">
            <div className="absolute inset-0 bg-giallo rotate-45" />
            <div className="absolute inset-1 bg-ink rotate-45" />
            <div className="absolute inset-2 bg-giallo rotate-45" />
          </div>
          <div className="text-bone font-black text-sm md:text-base tracking-[0.18em]">
            PERFECTION<span className="text-giallo">WRAPS</span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-[12px] tracking-[0.2em] font-mono text-bone/70">
          <a href="#wraps" className="hover:text-bone transition">WRAPS</a>
          <a href="#services" className="hover:text-bone transition">SERVICES</a>
          <a href="#process" className="hover:text-bone transition">PROCESS</a>
          <a href="#reviews" className="hover:text-bone transition">REVIEWS</a>
          <a href="#area" className="hover:text-bone transition">AREA</a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:6783842956"
            className="hidden md:inline-flex items-center gap-2 text-[12px] tracking-[0.18em] font-mono text-bone/70 hover:text-bone"
          >
            <Phone size={14} /> 678.384.2956
          </a>
          <a
            href="#quote"
            className="px-3 md:px-4 py-2 bg-giallo text-ink text-[11px] md:text-[12px] font-black tracking-[0.18em] hover:bg-ambra transition"
          >
            FREE QUOTE
          </a>
          <button
            className="md:hidden text-bone/70"
            aria-label="menu"
            onClick={() => setOpen(!open)}
          >
            <div className="w-5 h-px bg-bone mb-1" />
            <div className="w-5 h-px bg-bone mb-1" />
            <div className="w-5 h-px bg-bone" />
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-ink/95 border-t border-bone/5 px-4 py-4 flex flex-col gap-3 text-[13px] font-mono tracking-[0.18em] text-bone/80">
          <a onClick={() => setOpen(false)} href="#wraps">WRAPS</a>
          <a onClick={() => setOpen(false)} href="#services">SERVICES</a>
          <a onClick={() => setOpen(false)} href="#process">PROCESS</a>
          <a onClick={() => setOpen(false)} href="#reviews">REVIEWS</a>
          <a onClick={() => setOpen(false)} href="#area">AREA</a>
          <a onClick={() => setOpen(false)} href="tel:6783842956" className="text-giallo">678.384.2956</a>
        </div>
      )}
    </header>
  );
}

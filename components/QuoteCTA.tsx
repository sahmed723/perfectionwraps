import { Phone, Instagram } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

export default function QuoteCTA() {
  return (
    <section
      id="quote"
      className="relative overflow-hidden py-24 md:py-36 px-4 md:px-8 border-y border-bone/5"
    >
      <div className="absolute inset-0 grain opacity-[0.04]" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-giallo/40 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-giallo/40 to-transparent" />

      <div className="relative max-w-6xl mx-auto text-center">
        <div className="text-[11px] tracking-[0.4em] font-mono text-giallo mb-5">07 / QUOTE</div>
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95]">
          READY TO TRANSFORM
          <br />
          <span className="giallo-text">YOUR RIDE?</span>
        </h2>

        <a
          href={`tel:${siteConfig.brand.phoneTel}`}
          className="mt-12 md:mt-16 inline-flex items-center gap-4 group"
        >
          <Phone className="text-giallo" size={28} />
          <span className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight chrome-text">
            {siteConfig.brand.phone.replace(/-/g, ".")}
          </span>
        </a>

        <div className="mt-10 flex items-center justify-center gap-3 text-bone/55">
          <a
            href={siteConfig.brand.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:text-bone transition text-sm font-mono tracking-[0.15em]"
          >
            <Instagram size={16} />
            {siteConfig.brand.social.instagram.split("/").pop()}
          </a>
        </div>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
          {["FREE QUOTE", "MOBILE CONSULT", "FINANCING AVAILABLE", "24HR RESPONSE"].map((b) => (
            <div
              key={b}
              className="border border-bone/10 px-3 py-3 text-[10px] md:text-[11px] tracking-[0.18em] font-mono text-bone/70"
            >
              {b}
            </div>
          ))}
        </div>

        <div className="mt-10">
          <a
            href="/free-quote"
            className="inline-flex items-center justify-center bg-giallo text-ink px-8 py-4 font-black tracking-[0.18em] text-sm hover:bg-ambra transition"
          >
            REQUEST QUOTE ONLINE →
          </a>
        </div>
      </div>
    </section>
  );
}

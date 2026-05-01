"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { siteConfig } from "@/lib/siteConfig";

type Status = "idle" | "submitting" | "ok" | "err";

export default function QuoteForm() {
  const params = useSearchParams();
  const [status, setStatus] = useState<Status>("idle");
  const [errMsg, setErrMsg] = useState<string>("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    city: "",
    vehicle: "",
    notes: "",
    consent_sms: false,
  });

  useEffect(() => {
    setForm((f) => ({
      ...f,
      service: params.get("service") || f.service || siteConfig.services[0].slug,
      city: params.get("city") || f.city,
    }));
  }, [params]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrMsg("");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...form,
          source: typeof document !== "undefined" ? document.referrer : undefined,
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Submit failed");
      }
      setStatus("ok");
    } catch (e: unknown) {
      setStatus("err");
      setErrMsg(e instanceof Error ? e.message : "Submit failed");
    }
  }

  if (status === "ok") {
    return (
      <div className="text-center py-10">
        <div className="text-[10px] tracking-[0.4em] font-mono text-giallo mb-3">RECEIVED</div>
        <div className="text-3xl md:text-4xl font-black chrome-text tracking-tight">
          Thanks. We'll be in touch.
        </div>
        <p className="mt-4 text-bone/60 text-sm md:text-base max-w-sm mx-auto leading-relaxed">
          Most quotes go out within 24 hours. If it's urgent, call{" "}
          <a href={`tel:${siteConfig.brand.phoneTel}`} className="text-giallo">
            {siteConfig.brand.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  const inputCls =
    "w-full bg-ink border border-bone/10 px-4 py-3 text-bone placeholder:text-bone/30 focus:border-giallo outline-none transition";
  const labelCls = "block text-[10px] tracking-[0.25em] font-mono text-bone/50 mb-2";

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>NAME *</label>
          <input
            required
            type="text"
            className={inputCls}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
          />
        </div>
        <div>
          <label className={labelCls}>PHONE *</label>
          <input
            required
            type="tel"
            className={inputCls}
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="(770) 555-0123"
          />
        </div>
      </div>

      <div>
        <label className={labelCls}>EMAIL</label>
        <input
          type="email"
          className={inputCls}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="you@example.com"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>SERVICE *</label>
          <select
            required
            className={inputCls}
            value={form.service}
            onChange={(e) => setForm({ ...form, service: e.target.value })}
          >
            <option value="" disabled>
              Pick one
            </option>
            {siteConfig.services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls}>CITY</label>
          <select
            className={inputCls}
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          >
            <option value="">Anywhere in north metro</option>
            {siteConfig.cities.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelCls}>VEHICLE / PROJECT</label>
        <input
          type="text"
          className={inputCls}
          value={form.vehicle}
          onChange={(e) => setForm({ ...form, vehicle: e.target.value })}
          placeholder="2023 Tesla Model Y, full satin black wrap"
        />
      </div>

      <div>
        <label className={labelCls}>NOTES</label>
        <textarea
          rows={3}
          className={inputCls + " resize-none"}
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          placeholder="Coverage, color preference, deadline, anything else"
        />
      </div>

      <label className="flex items-start gap-3 text-bone/60 text-xs leading-relaxed cursor-pointer select-none">
        <input
          type="checkbox"
          required
          checked={form.consent_sms}
          onChange={(e) => setForm({ ...form, consent_sms: e.target.checked })}
          className="mt-0.5 accent-giallo"
        />
        <span>
          I agree to receive SMS messages about my quote from {siteConfig.brand.name}. Message and data rates may apply. Reply STOP to opt out.
        </span>
      </label>

      {status === "err" && (
        <div className="text-cut text-sm font-mono">{errMsg || "Something broke. Try again."}</div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-giallo text-ink px-8 py-4 font-black tracking-[0.18em] text-sm hover:bg-ambra transition disabled:opacity-60"
      >
        {status === "submitting" ? "SENDING…" : "SEND QUOTE REQUEST"}
      </button>
    </form>
  );
}

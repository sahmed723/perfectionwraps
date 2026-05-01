import { NextResponse } from "next/server";
import { z } from "zod";
import { siteConfig } from "@/lib/siteConfig";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(7).max(40),
  email: z.string().trim().email().max(180).optional().or(z.literal("")),
  service: z.string().trim().min(1).max(64),
  city: z.string().trim().max(64).optional().or(z.literal("")),
  vehicle: z.string().trim().max(240).optional().or(z.literal("")),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
  source: z.string().trim().max(400).optional().or(z.literal("")),
  consent_sms: z.boolean(),
});

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.issues.slice(0, 5) },
      { status: 422 }
    );
  }
  const lead = parsed.data;
  if (!lead.consent_sms) {
    return NextResponse.json({ error: "SMS consent required" }, { status: 422 });
  }

  const summary = [
    `New ${siteConfig.brand.name} lead`,
    `Service: ${lead.service}${lead.city ? ` · ${lead.city}` : ""}`,
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    lead.email ? `Email: ${lead.email}` : null,
    lead.vehicle ? `Vehicle: ${lead.vehicle}` : null,
    lead.notes ? `Notes: ${lead.notes}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const errors: string[] = [];

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE;
  if (supabaseUrl && supabaseKey) {
    try {
      const r = await fetch(`${supabaseUrl}/rest/v1/leads`, {
        method: "POST",
        headers: {
          apikey: supabaseKey,
          authorization: `Bearer ${supabaseKey}`,
          "content-type": "application/json",
          prefer: "return=minimal",
        },
        body: JSON.stringify({
          name: lead.name,
          phone: lead.phone,
          email: lead.email || null,
          service_slug: lead.service,
          city_slug: lead.city || null,
          vehicle: lead.vehicle || null,
          notes: lead.notes || null,
          source: lead.source || null,
          consent_sms: lead.consent_sms,
        }),
      });
      if (!r.ok) errors.push(`supabase ${r.status}`);
    } catch (e) {
      errors.push(`supabase fetch: ${e instanceof Error ? e.message : "unknown"}`);
    }
  } else {
    console.log("[quote] Supabase env not configured — lead not persisted:\n" + summary);
  }

  const twilioSid = process.env.TWILIO_SID;
  const twilioToken = process.env.TWILIO_TOKEN;
  const twilioFrom = process.env.TWILIO_FROM;
  const ownerSms = process.env.OWNER_SMS;
  if (twilioSid && twilioToken && twilioFrom && ownerSms) {
    try {
      const auth = Buffer.from(`${twilioSid}:${twilioToken}`).toString("base64");
      const body = new URLSearchParams({
        From: twilioFrom,
        To: ownerSms,
        Body: summary,
      });
      const r = await fetch(
        `https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`,
        {
          method: "POST",
          headers: {
            authorization: `Basic ${auth}`,
            "content-type": "application/x-www-form-urlencoded",
          },
          body,
        }
      );
      if (!r.ok) errors.push(`twilio ${r.status}`);
    } catch (e) {
      errors.push(`twilio fetch: ${e instanceof Error ? e.message : "unknown"}`);
    }
  }

  const resendKey = process.env.RESEND_KEY;
  const fromAddr = process.env.RESEND_FROM || `quotes@${siteConfig.brand.domain}`;
  if (resendKey && lead.email) {
    try {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          authorization: `Bearer ${resendKey}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          from: fromAddr,
          to: [lead.email],
          subject: `We got your quote · ${siteConfig.brand.name}`,
          text: `Hi ${lead.name.split(" ")[0]},\n\nWe received your quote request and will get back to you within 24 hours.\n\nQuestions? Reply to this email or call ${siteConfig.brand.phone}.\n\n— ${siteConfig.brand.name}`,
        }),
      });
      if (!r.ok) errors.push(`resend ${r.status}`);
    } catch (e) {
      errors.push(`resend fetch: ${e instanceof Error ? e.message : "unknown"}`);
    }
  }

  if (errors.length) console.warn("[quote] partial integration errors:", errors.join("; "));

  return NextResponse.json({ ok: true, persisted: !!supabaseUrl }, { status: 200 });
}

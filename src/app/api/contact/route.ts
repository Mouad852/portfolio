import { NextResponse } from "next/server";

import { person } from "@/resources";

/**
 * Contact form handler.
 *
 * The browser posts here rather than straight to the mail provider, so the
 * access key stays server-side instead of being inlined into the client
 * bundle. Everything is re-validated here — client-side checks are for the
 * visitor's benefit, not a security boundary.
 */

const CHANNELS = ["email", "phone", "whatsapp", "linkedin", "other"] as const;
const NEEDS = ["backend", "cloud", "platform", "unsure"] as const;

/** Generous enough for a real enquiry, tight enough to stop payload abuse. */
const LIMITS = {
  name: 100,
  detail: 200,
  message: 5000,
} as const;

type Payload = {
  name?: unknown;
  channel?: unknown;
  detail?: unknown;
  need?: unknown;
  message?: unknown;
  /** Honeypot: a real person never fills this, bots usually do. */
  company?: unknown;
};

function asString(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > max) return null;
  return trimmed;
}

export async function POST(request: Request) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    // Misconfiguration, not the visitor's fault — say so without detail.
    console.error("WEB3FORMS_ACCESS_KEY is not set; contact form cannot send.");
    return NextResponse.json({ ok: false, error: "unavailable" }, { status: 500 });
  }

  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  // Honeypot tripped: accept silently so a bot learns nothing from the reply.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = asString(body.name, LIMITS.name);
  const detail = asString(body.detail, LIMITS.detail);
  const message = asString(body.message, LIMITS.message);
  const channel = typeof body.channel === "string" ? body.channel : "";
  const need = typeof body.need === "string" ? body.need : "";

  const valid =
    name &&
    detail &&
    message &&
    (CHANNELS as readonly string[]).includes(channel) &&
    (NEEDS as readonly string[]).includes(need);

  if (!valid) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const channelLabel = channel.charAt(0).toUpperCase() + channel.slice(1);

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `Portfolio enquiry — ${name} (${need})`,
        from_name: `${person.name} portfolio`,
        // Labelled so the email reads cleanly without a template.
        Name: name,
        "Preferred channel": channelLabel,
        "Reach them at": detail,
        "Looking for": need,
        Message: message,
      }),
    });

    if (!response.ok) {
      console.error("Web3Forms rejected the submission:", response.status);
      return NextResponse.json({ ok: false, error: "upstream" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form send failed:", error);
    return NextResponse.json({ ok: false, error: "upstream" }, { status: 502 });
  }
}

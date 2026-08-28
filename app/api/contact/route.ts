import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactPayload = {
  name?: string;
  email?: string;
  organization?: string;
  phone?: string;
};

export async function POST(request: Request) {
  let body: ContactPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const organization = body.organization?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";

  if (!name || !email || !organization || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid_fields" }, { status: 422 });
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;

  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          organization,
          phone,
          source: "landing-page-mathis",
          submittedAt: new Date().toISOString(),
        }),
      });
    } catch (error) {
      console.error("[contact] failed to forward lead to webhook", error);
    }
  } else {
    console.info("[contact] new lead", { name, email, organization, phone });
  }

  return NextResponse.json({ ok: true });
}

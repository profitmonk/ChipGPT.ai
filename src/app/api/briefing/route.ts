import { Resend } from "resend";

export const runtime = "nodejs";

// Config (override in Vercel env without touching code):
//   RESEND_API_KEY  — required to actually send (set in Vercel + .env.local)
//   BRIEFING_TO     — destination inbox (default connect@chipgpt.ai)
//   BRIEFING_FROM   — verified sender. Until chipgpt.ai is verified in Resend,
//                     keep the onboarding sender; then switch to your domain, e.g.
//                     "ChipGPT Briefings <briefings@chipgpt.ai>".
const TO = process.env.BRIEFING_TO || "connect@chipgpt.ai";
const FROM = process.env.BRIEFING_FROM || "ChipGPT Briefings <onboarding@resend.dev>";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function POST(req: Request) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const { name, email, company, stage, message, website } = body ?? {};

  // Honeypot: real users never fill this hidden field; bots do. Drop silently.
  if (website) return Response.json({ ok: true });

  if (!name?.trim() || !email?.trim() || !EMAIL_RE.test(email)) {
    return Response.json(
      { ok: false, error: "Please provide your name and a valid email." },
      { status: 400 },
    );
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    // Not yet configured — fail clearly instead of pretending it sent.
    return Response.json(
      { ok: false, error: "Briefing form isn't connected yet. Please email connect@chipgpt.ai." },
      { status: 503 },
    );
  }

  const text = [
    "New briefing request from chipgpt.ai",
    "",
    `Name:    ${name}`,
    `Email:   ${email}`,
    `Company: ${company?.trim() || "—"}`,
    `Stage:   ${stage?.trim() || "—"}`,
    "",
    "Message:",
    message?.trim() || "—",
  ].join("\n");

  try {
    const resend = new Resend(key);
    const { error } = await resend.emails.send({
      from: FROM,
      to: [TO],
      replyTo: email, // reply goes straight to the lead
      subject: `Briefing request — ${name}${company?.trim() ? `, ${company}` : ""}`,
      text,
    });
    if (error) {
      return Response.json(
        { ok: false, error: "Couldn't send right now. Please email connect@chipgpt.ai." },
        { status: 502 },
      );
    }
    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { ok: false, error: "Couldn't send right now. Please email connect@chipgpt.ai." },
      { status: 502 },
    );
  }
}

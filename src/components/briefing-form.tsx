"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type Status = "idle" | "sending" | "sent" | "error";

export const inputCls =
  "w-full rounded-md border border-rule-strong bg-surface px-3 py-2.5 text-[14px] " +
  "text-ink placeholder:text-ink-3 outline-none transition-colors " +
  "focus:border-accent/50 focus:ring-1 focus:ring-accent/40";
export const labelCls = "mb-1.5 block text-[12px] font-medium text-ink-2";

export function BriefingForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    try {
      const res = await fetch("/api/briefing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus("sent");
      } else {
        setStatus("error");
        setError(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setError("Network error. Please email connect@chipgpt.ai.");
    }
  }

  if (status === "sent") {
    return (
      <div className="panel p-8">
        <p className="mono-label text-accent">Request received</p>
        <p className="mt-4 text-[15px] leading-relaxed text-ink">
          Thanks — we&apos;ll be in touch shortly. You can also reach us directly at{" "}
          <a href="mailto:connect@chipgpt.ai" className="text-accent hover:text-accent">
            connect@chipgpt.ai
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="panel p-8" noValidate>
      <p className="mono-label text-ink-3">Request a Briefing</p>
      <div className="mt-5 grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={labelCls}>Name *</label>
            <input id="name" name="name" required className={inputCls} placeholder="Jane Doe" />
          </div>
          <div>
            <label htmlFor="email" className={labelCls}>Work email *</label>
            <input id="email" name="email" type="email" required className={inputCls} placeholder="jane@company.com" />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="company" className={labelCls}>Company</label>
            <input id="company" name="company" className={inputCls} placeholder="Acme Silicon" />
          </div>
          <div>
            <label htmlFor="stage" className={labelCls}>Program stage</label>
            <input id="stage" name="stage" className={inputCls} placeholder="e.g. pre-tapeout, in DV" />
          </div>
        </div>
        <div>
          <label htmlFor="interest" className={labelCls}>Interested in</label>
          <select id="interest" name="interest" defaultValue="coworkers" className={inputCls}>
            <option value="coworkers">AI co-workers for my engineering team</option>
            <option value="rle">Engineering RLE — evaluating or training AI agents</option>
            <option value="other">Something else</option>
          </select>
        </div>
        <div>
          <label htmlFor="message" className={labelCls}>What&apos;s your primary use case?</label>
          <textarea id="message" name="message" rows={4} className={inputCls} placeholder="Team structure, primary use case, timelines…" />
        </div>
        {/* honeypot — hidden from users, catches bots */}
        <input type="text" name="website" tabIndex={-1} autoComplete="off"
          className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden="true" />

        {status === "error" && (
          <p className="text-[13px] text-danger">{error}</p>
        )}

        <div className="mt-1 flex flex-wrap items-center gap-3">
          <Button type="submit" variant="primary" size="lg" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send request"}
          </Button>
          <span className="text-[12px] text-ink-3">
            or email{" "}
            <a href="mailto:connect@chipgpt.ai" className="text-accent hover:text-accent">
              connect@chipgpt.ai
            </a>
          </span>
        </div>
      </div>
    </form>
  );
}

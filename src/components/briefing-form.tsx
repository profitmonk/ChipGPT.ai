"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type Status = "idle" | "sending" | "sent" | "error";

const inputCls =
  "w-full rounded-md border border-white/[0.12] bg-[#0c0c0c] px-3 py-2.5 text-[14px] " +
  "text-zinc-200 placeholder:text-zinc-600 outline-none transition-colors " +
  "focus:border-green-600/70 focus:ring-1 focus:ring-green-600/40";
const labelCls = "mb-1.5 block text-[12px] font-medium text-zinc-400";

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
        <p className="mono-label text-green-600">Request received</p>
        <p className="mt-4 text-[15px] leading-relaxed text-zinc-300">
          Thanks — we&apos;ll be in touch shortly. You can also reach us directly at{" "}
          <a href="mailto:connect@chipgpt.ai" className="text-green-600 hover:text-green-500">
            connect@chipgpt.ai
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="panel p-8" noValidate>
      <p className="mono-label text-zinc-600">Request a Briefing</p>
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
          <label htmlFor="message" className={labelCls}>What&apos;s your primary use case?</label>
          <textarea id="message" name="message" rows={4} className={inputCls} placeholder="Team structure, primary use case, timelines…" />
        </div>
        {/* honeypot — hidden from users, catches bots */}
        <input type="text" name="website" tabIndex={-1} autoComplete="off"
          className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden="true" />

        {status === "error" && (
          <p className="text-[13px] text-red-400">{error}</p>
        )}

        <div className="mt-1 flex flex-wrap items-center gap-3">
          <Button type="submit" variant="primary" size="lg" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send request"}
          </Button>
          <span className="text-[12px] text-zinc-600">
            or email{" "}
            <a href="mailto:connect@chipgpt.ai" className="text-green-600 hover:text-green-500">
              connect@chipgpt.ai
            </a>
          </span>
        </div>
      </div>
    </form>
  );
}

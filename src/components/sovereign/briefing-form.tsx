"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { inputCls, labelCls } from "@/components/briefing-form";
import { track } from "@/lib/analytics";
import {
  SOVEREIGN_DEPLOYMENTS,
  SOVEREIGN_OBJECTIVES,
  SOVEREIGN_TIMELINES,
} from "@/lib/sovereign-content";

type Status = "idle" | "sending" | "sent" | "error";
type FieldErrors = Partial<Record<"name" | "email" | "company", string>>;

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const errorCls = "mt-1.5 text-[12px] text-danger";

function validate(fd: FormData): FieldErrors {
  const errors: FieldErrors = {};
  const name = String(fd.get("name") ?? "").trim();
  const email = String(fd.get("email") ?? "").trim();
  const company = String(fd.get("company") ?? "").trim();
  if (!name) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid work email.";
  if (!company) errors.company = "Please enter your company.";
  return errors;
}

/** Briefing request for /sovereign-ai. Posts to the shared /api/briefing endpoint with interest=sovereign. */
export function SovereignBriefingForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const started = useRef(false);

  function onStart() {
    if (started.current) return;
    started.current = true;
    track("sovereign_form_start");
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const errors = validate(fd);
    setFieldErrors(errors);
    const firstInvalid = (["name", "email", "company"] as const).find((k) => errors[k]);
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`#sv-${firstInvalid}`)?.focus();
      return;
    }

    setStatus("sending");
    setError("");
    const payload = { ...Object.fromEntries(fd.entries()), interest: "sovereign" };
    // Analytics gets categorical fields only — never names, companies, models, or free text.
    const categorical = {
      objective: String(fd.get("objective") || "unspecified"),
      deployment: String(fd.get("deployment") || "unspecified"),
      timeline: String(fd.get("timeline") || "unspecified"),
    };
    try {
      const res = await fetch("/api/briefing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus("sent");
        track("sovereign_form_submit_success", categorical);
      } else {
        setStatus("error");
        setError(data.error || "Something went wrong. Please email connect@chipgpt.ai.");
        track("sovereign_form_submit_error", { status: res.status });
      }
    } catch {
      setStatus("error");
      setError("Network error. Please email connect@chipgpt.ai.");
      track("sovereign_form_submit_error", { status: 0 });
    }
  }

  if (status === "sent") {
    return (
      <div className="panel p-8" role="status">
        <p className="mono-label text-accent">Request received</p>
        <p className="mt-4 text-[15px] leading-relaxed text-ink">
          Thanks — we&apos;ll follow up to schedule a technical briefing. You can also
          reach us directly at{" "}
          <a href="mailto:connect@chipgpt.ai" className="text-accent hover:text-accent">
            connect@chipgpt.ai
          </a>
          .
        </p>
      </div>
    );
  }

  const field = (key: keyof FieldErrors) => ({
    "aria-invalid": fieldErrors[key] ? true : undefined,
    "aria-describedby": fieldErrors[key] ? `sv-${key}-error` : undefined,
  });

  return (
    <form
      onSubmit={onSubmit}
      onFocus={onStart}
      onInput={onStart}
      className="panel p-6 sm:p-8"
      noValidate
      aria-labelledby="sv-form-title"
    >
      <p id="sv-form-title" className="mono-label text-ink-2">
        Request a Briefing
      </p>
      <div className="mt-5 grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="sv-name" className={labelCls}>Name *</label>
            <input id="sv-name" name="name" required autoComplete="name" className={inputCls} {...field("name")} />
            {fieldErrors.name && <p id="sv-name-error" className={errorCls}>{fieldErrors.name}</p>}
          </div>
          <div>
            <label htmlFor="sv-email" className={labelCls}>Work email *</label>
            <input id="sv-email" name="email" type="email" required autoComplete="email" className={inputCls} {...field("email")} />
            {fieldErrors.email && <p id="sv-email-error" className={errorCls}>{fieldErrors.email}</p>}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="sv-company" className={labelCls}>Company *</label>
            <input id="sv-company" name="company" required autoComplete="organization" className={inputCls} {...field("company")} />
            {fieldErrors.company && <p id="sv-company-error" className={errorCls}>{fieldErrors.company}</p>}
          </div>
          <div>
            <label htmlFor="sv-role" className={labelCls}>Role</label>
            <input id="sv-role" name="role" autoComplete="organization-title" className={inputCls} placeholder="e.g. VP Engineering, Head of DV" />
          </div>
        </div>
        <div>
          <label htmlFor="sv-model" className={labelCls}>Models or agents in use today</label>
          <input id="sv-model" name="model" className={inputCls} placeholder="e.g. frontier API, in-house open-weight model" />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="sv-objective" className={labelCls}>Primary objective</label>
            <select id="sv-objective" name="objective" defaultValue="" className={inputCls}>
              <option value="">Select…</option>
              {SOVEREIGN_OBJECTIVES.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="sv-deployment" className={labelCls}>Deployment constraint</label>
            <select id="sv-deployment" name="deployment" defaultValue="" className={inputCls}>
              <option value="">Select…</option>
              {SOVEREIGN_DEPLOYMENTS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="sv-timeline" className={labelCls}>Target timeline</label>
            <select id="sv-timeline" name="timeline" defaultValue="" className={inputCls}>
              <option value="">Select…</option>
              {SOVEREIGN_TIMELINES.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="sv-priorities" className={labelCls}>What should your AI get better at?</label>
          <textarea
            id="sv-priorities"
            name="priorities"
            rows={4}
            className={inputCls}
            placeholder="Goals, capability gaps, data you want it to learn from…"
          />
        </div>
        {/* honeypot — hidden from users, catches bots */}
        <input type="text" name="website" tabIndex={-1} autoComplete="off"
          className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden="true" />

        <p className="text-[12px] leading-relaxed text-ink-2">
          Deployment choices are for discovery only; listing an option does not mean it is
          available for every engagement. We use these details only to respond to your request.
          Please don&apos;t include confidential source, model weights, or credentials.
        </p>

        <div role="alert" aria-live="assertive">
          {status === "error" && <p className="text-[13px] text-danger">{error}</p>}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button type="submit" variant="primary" size="lg" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Request a Briefing"}
          </Button>
          <span className="text-[12px] text-ink-2">
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

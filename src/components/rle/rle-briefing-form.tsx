"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { inputCls, labelCls } from "@/components/briefing-form";
import { track } from "@/lib/analytics";
import {
  RLE_DEPLOYMENTS,
  RLE_OBJECTIVES,
  RLE_TIMELINES,
} from "@/lib/rle-content";

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

/** Briefing request for /rle. Posts to the shared /api/briefing endpoint with interest=rle. */
export function RleBriefingForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const started = useRef(false);

  function onStart() {
    if (started.current) return;
    started.current = true;
    track("rle_form_start");
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const errors = validate(fd);
    setFieldErrors(errors);
    const firstInvalid = (["name", "email", "company"] as const).find((k) => errors[k]);
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`#rle-${firstInvalid}`)?.focus();
      return;
    }

    setStatus("sending");
    setError("");
    const payload = { ...Object.fromEntries(fd.entries()), interest: "rle" };
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
        track("rle_form_submit_success", categorical);
      } else {
        setStatus("error");
        setError(data.error || "Something went wrong. Please email connect@chipgpt.ai.");
        track("rle_form_submit_error", { status: res.status });
      }
    } catch {
      setStatus("error");
      setError("Network error. Please email connect@chipgpt.ai.");
      track("rle_form_submit_error", { status: 0 });
    }
  }

  if (status === "sent") {
    return (
      <div className="panel p-8" role="status">
        <p className="mono-label text-accent">Request received</p>
        <p className="mt-4 text-[15px] leading-relaxed text-ink">
          Thanks — we&apos;ll follow up to schedule a 25-minute technical briefing. You can also
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
    "aria-describedby": fieldErrors[key] ? `rle-${key}-error` : undefined,
  });

  return (
    <form
      onSubmit={onSubmit}
      onFocus={onStart}
      onInput={onStart}
      className="panel p-6 sm:p-8"
      noValidate
      aria-labelledby="rle-form-title"
    >
      <p id="rle-form-title" className="mono-label text-ink-2">
        Request an RLE Briefing
      </p>
      <div className="mt-5 grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="rle-name" className={labelCls}>Name *</label>
            <input id="rle-name" name="name" required autoComplete="name" className={inputCls} {...field("name")} />
            {fieldErrors.name && <p id="rle-name-error" className={errorCls}>{fieldErrors.name}</p>}
          </div>
          <div>
            <label htmlFor="rle-email" className={labelCls}>Work email *</label>
            <input id="rle-email" name="email" type="email" required autoComplete="email" className={inputCls} {...field("email")} />
            {fieldErrors.email && <p id="rle-email-error" className={errorCls}>{fieldErrors.email}</p>}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="rle-company" className={labelCls}>Company *</label>
            <input id="rle-company" name="company" required autoComplete="organization" className={inputCls} {...field("company")} />
            {fieldErrors.company && <p id="rle-company-error" className={errorCls}>{fieldErrors.company}</p>}
          </div>
          <div>
            <label htmlFor="rle-role" className={labelCls}>Role</label>
            <input id="rle-role" name="role" autoComplete="organization-title" className={inputCls} placeholder="e.g. Head of post-training" />
          </div>
        </div>
        <div>
          <label htmlFor="rle-model" className={labelCls}>Model, agent, or product being evaluated</label>
          <input id="rle-model" name="model" className={inputCls} placeholder="e.g. in-house coding agent, EDA assistant" />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="rle-objective" className={labelCls}>Primary objective</label>
            <select id="rle-objective" name="objective" defaultValue="" className={inputCls}>
              <option value="">Select…</option>
              {RLE_OBJECTIVES.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="rle-deployment" className={labelCls}>Deployment constraint</label>
            <select id="rle-deployment" name="deployment" defaultValue="" className={inputCls}>
              <option value="">Select…</option>
              {RLE_DEPLOYMENTS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="rle-timeline" className={labelCls}>Target timeline</label>
            <select id="rle-timeline" name="timeline" defaultValue="" className={inputCls}>
              <option value="">Select…</option>
              {RLE_TIMELINES.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="rle-priorities" className={labelCls}>Capability priorities</label>
          <textarea
            id="rle-priorities"
            name="priorities"
            rows={4}
            className={inputCls}
            placeholder="Which engineering capabilities matter most — RTL repair, DV, firmware, coverage…"
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
            {status === "sending" ? "Sending…" : "Request an RLE Briefing"}
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

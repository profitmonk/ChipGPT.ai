// Minimal, provider-agnostic event hook. The site has no analytics provider
// wired up yet, so events are forwarded to whichever one is present at runtime
// (Vercel Web Analytics `window.va`, or a GTM-style `window.dataLayer`) and are
// otherwise a no-op. A `chipgpt:analytics` DOM event is always dispatched so a
// provider can be attached later without touching call sites.
//
// Privacy rule: only pass non-sensitive categorical values. Never send names,
// emails, companies, model names, or any free-text field.

export type AnalyticsProps = Record<string, string | number | boolean>;

type WindowWithAnalytics = Window & {
  va?: (event: "event", payload: { name: string; data?: AnalyticsProps }) => void;
  dataLayer?: Record<string, unknown>[];
};

export function track(name: string, props: AnalyticsProps = {}) {
  if (typeof window === "undefined") return;
  const w = window as WindowWithAnalytics;
  try {
    w.va?.("event", { name, data: props });
    w.dataLayer?.push({ event: name, ...props });
    window.dispatchEvent(
      new CustomEvent("chipgpt:analytics", { detail: { name, props } }),
    );
  } catch {
    /* analytics must never break the page */
  }
}

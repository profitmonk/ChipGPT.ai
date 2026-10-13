"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";
import { SOVEREIGN_STACK_ID } from "@/lib/sovereign-content";

/** Fires sovereign_page_view on mount and sovereign_stack_view once the stack section is seen. */
export function SovereignPageTracking() {
  useEffect(() => {
    track("sovereign_page_view");

    const el = document.getElementById(SOVEREIGN_STACK_ID);
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          track("sovereign_stack_view");
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return null;
}

/** Anchor that records a CTA click before following the link. */
export function TrackedAnchor({
  event,
  placement,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { event: string; placement: string }) {
  return (
    <a
      {...props}
      onClick={(e) => {
        track(event, { placement });
        props.onClick?.(e);
      }}
    />
  );
}

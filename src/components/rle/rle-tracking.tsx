"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";
import { RLE_GRADING_ID } from "@/lib/rle-content";

/** Fires rle_page_view on mount and rle_grading_section_view once the grading section is seen. */
export function RlePageTracking() {
  useEffect(() => {
    track("rle_page_view");

    const el = document.getElementById(RLE_GRADING_ID);
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          track("rle_grading_section_view");
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

"use client";

import { track } from "@/lib/analytics";
import { RLE_FAQ } from "@/lib/rle-content";

export function RleFaq() {
  return (
    <div className="border-t border-white/[0.08]">
      {RLE_FAQ.map((item, i) => (
        <details
          key={item.q}
          className="group border-b border-white/[0.08]"
          onToggle={(e) => {
            if ((e.currentTarget as HTMLDetailsElement).open) {
              track("rle_faq_expand", { question: i + 1 });
            }
          }}
        >
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-[1.02rem] font-medium text-white outline-none focus-visible:ring-1 focus-visible:ring-green-500/60 [&::-webkit-details-marker]:hidden">
            <span>{item.q}</span>
            <span
              aria-hidden
              className="mt-0.5 shrink-0 font-mono text-[14px] text-green-600 group-open:rotate-45 motion-safe:transition-transform"
            >
              +
            </span>
          </summary>
          <div className="max-w-[68ch] space-y-3 pb-6 text-[15px] leading-[1.7] text-zinc-400">
            {item.a.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}

// Shared end-of-page call to action -> the existing briefing form at /demo.
// Reuses the primary Button; does not build a new form or scheduling embed.
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function BlogCTA() {
  return (
    <div
      className="panel mt-14 rounded-md p-7"
      style={{ borderLeft: "2px solid var(--accent)" }}
    >
      <p className="mono-label text-zinc-500">See it live</p>
      <h3 className="mt-3 text-[1.15rem] font-semibold tracking-[-0.01em] text-white">
        Watch the co-worker catch a bug like this
      </h3>
      <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-zinc-400">
        ChipGPT reads the spec and the RTL, finds the bug, and proves it on a real
        open-source core. Request a briefing to see it on your own flow.
      </p>
      <div className="mt-5">
        <Button variant="primary" size="lg" asChild>
          <Link href="/demo">
            Request a briefing <span aria-hidden>→</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}

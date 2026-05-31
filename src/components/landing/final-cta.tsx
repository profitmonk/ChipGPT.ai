import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CTA_LABEL, CTA_SUPPORTING, DEMO_HREF } from "@/lib/content";

export function FinalCta({ compact = false }: { compact?: boolean }) {
  return (
    <section className="border-b border-white/[0.06]">
      <div
        className={`mx-auto max-w-7xl px-6 lg:px-10 ${
          compact ? "py-20" : "py-28 lg:py-36"
        }`}
      >
        <div className="max-w-2xl">
          <h2 className="text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.02em] text-white sm:text-[2rem]">
            Accelerate Engineering Through Specialized AI Co-Workers
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-zinc-500">
            {CTA_SUPPORTING}
          </p>
          <Button size="lg" variant="primary" className="mt-9" asChild>
            <Link href={DEMO_HREF}>{CTA_LABEL}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

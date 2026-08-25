import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ManifestoHero() {
  return (
    <section className="relative flex min-h-[86svh] items-center border-b border-white/[0.06] pt-14">
      <div
        className="pointer-events-none absolute inset-0 grid-circuit opacity-30"
        aria-hidden
      />
      {/* Wafer-diffraction sheen — the one decorative motif, used once. */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-full w-2/3 opacity-70 blur-3xl"
        aria-hidden
        style={{
          background:
            "radial-gradient(55% 55% at 78% 26%, rgba(34,197,94,0.12), transparent 70%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-5xl px-6 py-28 lg:px-10">
        <h1 className="max-w-[16ch] text-balance font-serif text-[2.6rem] font-medium leading-[1.04] tracking-[-0.02em] text-white sm:text-[3.4rem] lg:text-[4.25rem]">
          AI is built on silicon. The world can&rsquo;t design enough of it.
        </h1>
        <p className="mt-8 max-w-xl text-[1.05rem] leading-[1.6] text-zinc-400">
          ChipGPT is the foundation for designing silicon with AI &mdash; higher
          quality, fewer bugs, and far greater speed.
        </p>
        <div className="mt-11 flex flex-wrap items-center gap-x-7 gap-y-4">
          <Button size="lg" variant="primary" asChild>
            <Link href="#why">Read the vision</Link>
          </Button>
          <Link
            href="/coworker"
            className="inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-wider text-zinc-400 transition-colors hover:text-white"
          >
            Watch a co-worker find real bugs
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
          </Link>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ManifestoHero() {
  return (
    <section className="relative flex min-h-[86svh] items-center pt-14">
      <div className="relative mx-auto w-full max-w-5xl px-6 py-28 lg:px-10">
        <h1 className="max-w-[16ch] text-balance font-serif text-[2.6rem] leading-[1.04] tracking-[-0.02em] text-ink sm:text-[3.4rem] lg:text-[4.25rem]">
          AI is built on silicon. The world can&rsquo;t design enough of it.
        </h1>
        <p className="mt-8 max-w-xl text-[1.05rem] leading-[1.6] text-ink-2">
          ChipGPT is the foundation for designing silicon with AI &mdash; higher
          quality, fewer bugs, and far greater speed.
        </p>
        <div className="mt-11 flex flex-wrap items-center gap-x-7 gap-y-4">
          <Button size="lg" variant="primary" asChild>
            <Link href="#why">Read the vision</Link>
          </Button>
          <Link
            href="/coworker"
            className="inline-flex items-center gap-1.5 font-sans text-[15px] font-medium text-ink-2 underline decoration-current/30 underline-offset-4 transition-colors hover:decoration-current hover:text-ink"
          >
            Watch a co-worker find real bugs
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
          </Link>
        </div>
      </div>
    </section>
  );
}

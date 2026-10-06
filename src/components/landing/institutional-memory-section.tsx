import { INSTITUTIONAL_MEMORY_TAGLINE } from "@/lib/content";

export function InstitutionalMemorySection() {
  return (
    <section className="border-b border-rule bg-paper-2">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-28">
        <p className="mono-label mb-6 text-accent">
          Institutional Memory for Silicon
        </p>
        <blockquote className="max-w-3xl border-l-2 border-accent/25 pl-6 sm:pl-8">
          <p className="text-[1.75rem] font-semibold leading-[1.2] tracking-[-0.03em] text-ink sm:text-[2rem] lg:text-[2.25rem]">
            {INSTITUTIONAL_MEMORY_TAGLINE}
          </p>
        </blockquote>
      </div>
    </section>
  );
}

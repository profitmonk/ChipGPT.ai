import { DATA_OWNERSHIP_STATEMENT } from "@/lib/content";

export function DataOwnershipStatement() {
  return (
    <section className="border-y border-accent/25 bg-accent-soft">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-16">
        <p className="mono-label mb-4 text-accent">Trust</p>
        <p className="max-w-3xl text-[17px] font-medium leading-[1.55] tracking-[-0.01em] text-ink sm:text-[18px]">
          {DATA_OWNERSHIP_STATEMENT}
        </p>
      </div>
    </section>
  );
}

import { DATA_OWNERSHIP_STATEMENT } from "@/lib/content";

export function DataOwnershipStatement() {
  return (
    <section className="border-y border-green-900/30 bg-[#0a120a]">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-16">
        <p className="mono-label mb-4 text-green-600">Trust</p>
        <p className="max-w-3xl text-[17px] font-medium leading-[1.55] tracking-[-0.01em] text-white sm:text-[18px]">
          {DATA_OWNERSHIP_STATEMENT}
        </p>
      </div>
    </section>
  );
}

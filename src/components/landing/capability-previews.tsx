import { LearnMoreLink } from "@/components/layout/site-shell";
import { SectionHeader } from "@/components/landing/section-header";
import { HOME_CAPABILITIES } from "@/lib/content";

export function CapabilityPreviews() {
  return (
    <section className="border-b border-rule">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-28">
        <SectionHeader
          eyebrow="Platform"
          title="Engineering Infrastructure, Not Software"
          description="ChipGPT is the operating layer for semiconductor teams. Explore each capability in depth."
        />

        <div className="grid gap-px border border-rule bg-rule md:grid-cols-2 lg:grid-cols-3">
          {HOME_CAPABILITIES.map((cap) => (
            <article
              key={cap.href}
              className="flex min-h-full flex-col bg-surface p-7 transition-colors hover:bg-surface"
            >
              <p className="mono-label text-accent">{cap.eyebrow}</p>
              <h3 className="mt-3 text-[15px] font-semibold text-ink">
                {cap.title}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-3">
                {cap.description}
              </p>
              <div className="mt-auto pt-5">
                <LearnMoreLink href={cap.href} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

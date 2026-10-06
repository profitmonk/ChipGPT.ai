import { OPERATIONAL_OUTCOMES } from "@/lib/content";

export function OperationalOutcomeCards() {
  return (
    <div className="grid gap-px border border-rule bg-rule lg:grid-cols-2">
      {OPERATIONAL_OUTCOMES.map((outcome) => (
        <article
          key={outcome.domain}
          className="flex min-h-full flex-col bg-surface p-6"
        >
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-[15px] font-semibold text-ink">
              {outcome.domain}
            </h3>
            <span className="mono-label shrink-0 text-ink-3">Operational</span>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <p className="mono-label mb-2 text-ink-3">Signals monitored</p>
              <ul className="space-y-1.5">
                {outcome.signals.map((signal) => (
                  <li
                    key={signal}
                    className="flex gap-2 text-[12px] leading-snug text-ink-3"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent/60" />
                    {signal}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mono-label mb-2 text-ink-3">Artifacts produced</p>
              <ul className="space-y-1.5">
                {outcome.artifacts.map((artifact) => (
                  <li
                    key={artifact}
                    className="flex gap-2 font-mono text-[11px] leading-snug text-ink-3"
                  >
                    <span className="text-accent">→</span>
                    {artifact}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-5 border-t border-rule pt-4">
            <p className="mono-label mb-2 text-ink-3">Participating agents</p>
            <div className="flex flex-wrap gap-2">
              {outcome.agents.map((agent) => (
                <span
                  key={agent}
                  className="border border-rule bg-surface px-2 py-1 font-mono text-[10px] text-accent"
                >
                  {agent}
                </span>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

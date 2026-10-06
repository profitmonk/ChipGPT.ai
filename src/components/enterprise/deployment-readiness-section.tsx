import { DEPLOYMENT_MODELS, DEPLOYMENT_READINESS } from "@/lib/content";

export function DeploymentReadinessSection() {
  return (
    <div className="space-y-6">
      <div className="grid gap-px border border-rule bg-rule lg:grid-cols-3">
        {DEPLOYMENT_MODELS.map((model) => (
          <div key={model.title} className="flex min-h-full flex-col bg-surface p-6">
            <h3 className="text-[14px] font-semibold text-ink">
              {model.title}
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed text-ink-3">
              {model.description}
            </p>
          </div>
        ))}
      </div>

      <div className="panel overflow-hidden">
        <div className="border-b border-rule bg-surface px-5 py-3">
          <p className="mono-label text-ink-3">Deployment Readiness</p>
          <p className="mt-1 text-[12px] text-ink-3">
            Documentation and configuration artifacts for enterprise rollout
          </p>
        </div>
        <div className="grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-4">
          {DEPLOYMENT_READINESS.map((group) => (
            <div key={group.category} className="bg-surface p-5">
              <p className="mono-label text-accent">{group.category}</p>
              <ul className="mt-3 space-y-2">
                {group.items.map((item) => (
                  <li
                    key={item.label}
                    className="flex items-start justify-between gap-2 border-b border-rule pb-2 last:border-b-0 last:pb-0"
                  >
                    <span className="text-[12px] leading-snug text-ink-3">
                      {item.label}
                    </span>
                    <span className="shrink-0 font-mono text-[9px] text-ink-3">
                      {item.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

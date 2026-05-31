import { DEPLOYMENT_MODELS, DEPLOYMENT_READINESS } from "@/lib/content";

export function DeploymentReadinessSection() {
  return (
    <div className="space-y-6">
      <div className="grid gap-px border border-white/[0.07] bg-white/[0.07] lg:grid-cols-3">
        {DEPLOYMENT_MODELS.map((model) => (
          <div key={model.title} className="flex min-h-full flex-col bg-[#080808] p-6">
            <h3 className="text-[14px] font-semibold text-white">
              {model.title}
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed text-zinc-500">
              {model.description}
            </p>
          </div>
        ))}
      </div>

      <div className="panel overflow-hidden">
        <div className="border-b border-white/[0.06] bg-[#0a0a0a] px-5 py-3">
          <p className="mono-label text-zinc-600">Deployment Readiness</p>
          <p className="mt-1 text-[12px] text-zinc-500">
            Documentation and configuration artifacts for enterprise rollout
          </p>
        </div>
        <div className="grid gap-px bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-4">
          {DEPLOYMENT_READINESS.map((group) => (
            <div key={group.category} className="bg-[#080808] p-5">
              <p className="mono-label text-green-700">{group.category}</p>
              <ul className="mt-3 space-y-2">
                {group.items.map((item) => (
                  <li
                    key={item.label}
                    className="flex items-start justify-between gap-2 border-b border-white/[0.04] pb-2 last:border-b-0 last:pb-0"
                  >
                    <span className="text-[12px] leading-snug text-zinc-500">
                      {item.label}
                    </span>
                    <span className="shrink-0 font-mono text-[9px] text-zinc-600">
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

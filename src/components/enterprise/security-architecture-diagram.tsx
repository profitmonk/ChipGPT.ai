import { SECURITY_ARCHITECTURE_LAYERS } from "@/lib/content";

export function SecurityArchitectureDiagram() {
  return (
    <div className="panel overflow-hidden">
      <div className="border-b border-white/[0.06] bg-[#0a0a0a] px-5 py-3">
        <p className="mono-label text-zinc-600">Security Architecture</p>
        <p className="mt-1 text-[12px] text-zinc-500">
          Defense-in-depth controls from perimeter to audit
        </p>
      </div>

      <div className="divide-y divide-white/[0.06]">
        {SECURITY_ARCHITECTURE_LAYERS.map((layer, index) => (
          <div
            key={layer.layer}
            className={`grid gap-4 px-5 py-4 sm:grid-cols-[180px_1fr] sm:items-start ${
              index === 2 ? "bg-[#0a120a]/40" : "bg-[#080808]"
            }`}
          >
            <div>
              <span className="font-mono text-[10px] text-zinc-700">
                L{index + 1}
              </span>
              <p className="mt-1 text-[13px] font-medium text-white">
                {layer.layer}
              </p>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {layer.controls.map((control) => (
                <div
                  key={control}
                  className="border border-white/[0.07] bg-[#0a0a0a] px-3 py-2 font-mono text-[11px] text-zinc-400"
                >
                  {control}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-px border-t border-white/[0.06] bg-white/[0.06] text-center sm:grid-cols-4">
        {[
          { label: "Data residency", value: "Customer-controlled" },
          { label: "Model training", value: "Zero shared" },
          { label: "Encryption", value: "CMK at rest" },
          { label: "Compliance", value: "SOC 2 aligned" },
        ].map((item) => (
          <div key={item.label} className="bg-[#080808] px-3 py-3">
            <p className="mono-label text-zinc-700">{item.label}</p>
            <p className="mt-1 text-[11px] font-medium text-zinc-400">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

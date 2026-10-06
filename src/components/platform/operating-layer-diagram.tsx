import { OPERATING_LAYER_DIAGRAM } from "@/lib/content";

const { applications, intelligence, dataSources } = OPERATING_LAYER_DIAGRAM;

function LayerLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mono-label mb-4 text-ink-3">{children}</p>
  );
}

function LayerCell({
  label,
  variant = "default",
}: {
  label: string;
  variant?: "default" | "agent" | "intelligence" | "source";
}) {
  const styles = {
    default: "border-rule bg-surface text-ink-2",
    agent: "border-rule-strong bg-surface text-ink",
    intelligence: "border-accent/25 bg-accent-soft text-accent",
    source: "border-rule bg-surface text-ink-3",
  };

  return (
    <div
      className={`flex min-h-[44px] items-center justify-center border px-2 py-2.5 text-center text-[11px] font-medium leading-tight sm:text-[12px] ${styles[variant]}`}
    >
      {label}
    </div>
  );
}

/** SVG connector band between two grid rows */
function ConnectorBand({
  fromCount,
  toCount,
  direction,
}: {
  fromCount: number;
  toCount: number;
  direction: "up-ingest" | "up-output";
}) {
  const width = 1000;
  const height = 56;

  const fromXs = Array.from({ length: fromCount }, (_, i) =>
    ((i + 0.5) / fromCount) * width
  );
  const toXs = Array.from({ length: toCount }, (_, i) =>
    ((i + 0.5) / toCount) * width
  );

  const hubY = direction === "up-ingest" ? height - 4 : 4;
  const leafY = direction === "up-ingest" ? 4 : height - 4;

  return (
    <div className="relative border-y border-rule bg-paper-2" aria-hidden>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-14 w-full"
        preserveAspectRatio="none"
      >
        {/* Hub line */}
        <line
          x1={width * 0.05}
          y1={hubY}
          x2={width * 0.95}
          y2={hubY}
          stroke={
            direction === "up-ingest"
              ? "rgba(255,255,255,0.06)"
              : "rgba(34,197,94,0.15)"
          }
          strokeWidth="1"
        />
        {fromXs.map((fromX, i) => {
          const targetX =
            direction === "up-ingest"
              ? toXs[Math.floor((i / fromCount) * toCount)] ??
                toXs[toXs.length - 1]
              : toXs[i % toCount];

          return (
            <line
              key={i}
              x1={fromX}
              y1={leafY}
              x2={targetX}
              y2={hubY}
              stroke={
                direction === "up-ingest"
                  ? "rgba(35,64,142,0.3)"
                  : "rgba(35,64,142,0.35)"
              }
              strokeWidth="1"
            />
          );
        })}
        {/* Flow arrows on hub */}
        {direction === "up-ingest" &&
          [0.2, 0.4, 0.6, 0.8].map((pct) => (
            <polygon
              key={pct}
              points={`${width * pct},${hubY - 6} ${width * pct - 4},${hubY + 2} ${width * pct + 4},${hubY + 2}`}
              fill="rgba(35,64,142,0.45)"
            />
          ))}
      </svg>
      <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-center">
        <span className="bg-paper-2 px-3 font-mono text-[9px] uppercase tracking-widest text-ink-3">
          {direction === "up-ingest" ? "Data ingest ↑" : "Agent output ↑"}
        </span>
      </div>
    </div>
  );
}

export function OperatingLayerDiagram() {
  return (
    <div className="w-full border border-rule bg-paper-2">
      {/* ── Top: Engineering Applications ── */}
      <div className="border-b border-rule px-5 py-6 sm:px-8 sm:py-8">
        <LayerLabel>Engineering Applications</LayerLabel>
        <div className="overflow-x-auto">
          <div className="grid min-w-[640px] grid-cols-6 gap-px bg-rule">
            {applications.map((agent) => (
              <LayerCell key={agent} label={agent} variant="agent" />
            ))}
          </div>
        </div>
      </div>

      <ConnectorBand
        fromCount={intelligence.length}
        toCount={applications.length}
        direction="up-output"
      />

      {/* ── Middle: Intelligence Layer ── */}
      <div className="border-y border-accent/25 bg-accent-soft px-5 py-7 sm:px-8 sm:py-9">
        <p className="text-center font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-accent">
          ChipGPT Intelligence Layer
        </p>
        <div className="mt-6 overflow-x-auto">
          <div className="grid min-w-[640px] grid-cols-5 gap-px bg-accent-soft">
            {intelligence.map((component) => (
              <LayerCell
                key={component}
                label={component}
                variant="intelligence"
              />
            ))}
          </div>
        </div>
        <p className="mt-5 text-center font-mono text-[10px] text-ink-3">
          Governed reasoning · Permission gates · Audit logging
        </p>
      </div>

      <ConnectorBand
        fromCount={dataSources.length}
        toCount={intelligence.length}
        direction="up-ingest"
      />

      {/* ── Bottom: Data Sources ── */}
      <div className="px-5 py-6 sm:px-8 sm:py-8">
        <LayerLabel>Engineering Data Sources</LayerLabel>
        <div className="overflow-x-auto">
          <div className="grid min-w-[720px] grid-cols-7 gap-px bg-rule">
            {dataSources.map((source) => (
              <LayerCell key={source} label={source} variant="source" />
            ))}
          </div>
        </div>
      </div>

      {/* Side annotations */}
      <div className="grid grid-cols-2 gap-px border-t border-rule bg-rule text-center">
        <div className="bg-surface px-4 py-3">
          <p className="mono-label text-ink-3">Input</p>
          <p className="mt-1 text-[11px] text-ink-3">
            Engineering data flows upward into the intelligence layer
          </p>
        </div>
        <div className="bg-surface px-4 py-3">
          <p className="mono-label text-ink-3">Output</p>
          <p className="mt-1 text-[11px] text-ink-3">
            Structured insights flow into specialized agents
          </p>
        </div>
      </div>
    </div>
  );
}

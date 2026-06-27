// TL;DR card rendered directly under a bug post's title (the 10-second skim layer).
// Driven by flat frontmatter fields (tldr_bug / tldr_miss / tldr_fix) because the
// blog renders markdown, not MDX. Uses the repo's real tokens: .panel + --accent
// (the site's green accent), with --danger / --pass for the cue dots.

type Props = {
  bug: string;
  miss: string;
  fix: string;
};

const ROWS: { label: string; color: string }[] = [
  { label: "The bug", color: "var(--danger)" },
  { label: "Why tests miss it", color: "var(--muted)" },
  { label: "The fix", color: "var(--pass)" },
];

export function BugTLDR({ bug, miss, fix }: Props) {
  const values = [bug, miss, fix];
  return (
    <aside
      aria-label="In brief"
      className="panel mb-12 rounded-md"
      style={{ borderLeft: "2px solid var(--accent)" }}
    >
      <div className="px-6 py-6 sm:px-7">
        <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">
          In brief
        </p>
        <dl className="grid gap-5">
          {ROWS.map((r, i) => (
            <div
              key={r.label}
              className="grid gap-1.5 sm:grid-cols-[132px_1fr] sm:gap-5"
            >
              <dt
                className="flex items-center gap-2 pt-0.5 font-mono text-[12px] uppercase tracking-[0.05em]"
                style={{ color: r.color }}
              >
                <span
                  aria-hidden
                  className="inline-block h-[7px] w-[7px] shrink-0 rounded-full"
                  style={{ background: r.color }}
                />
                {r.label}
              </dt>
              <dd className="text-[15px] leading-[1.6] text-zinc-200">
                {values[i]}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </aside>
  );
}

// TL;DR card rendered directly under a bug post's title (the 10-second skim layer).
// Driven by flat frontmatter fields (tldr_bug / tldr_miss / tldr_fix) because the
// blog renders markdown, not MDX. Uses the repo's real tokens: .panel + --accent
// (the site's green accent), --mono-label, with --danger / --pass for the cue dots.

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
      className="panel mb-10 rounded-md"
      style={{ borderLeft: "2px solid var(--accent)" }}
    >
      <div className="px-5 py-5 sm:px-6">
        <p className="mono-label mb-4 text-zinc-500">In brief</p>
        <dl className="grid gap-3.5">
          {ROWS.map((r, i) => (
            <div
              key={r.label}
              className="grid gap-1 sm:grid-cols-[160px_1fr] sm:gap-4"
            >
              <dt
                className="mono-label flex items-center gap-2 pt-px"
                style={{ color: r.color }}
              >
                <span
                  aria-hidden
                  className="inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: r.color }}
                />
                {r.label}
              </dt>
              <dd className="text-[14px] leading-relaxed text-zinc-300">
                {values[i]}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </aside>
  );
}

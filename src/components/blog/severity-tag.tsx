// Small severity pill for the series listing. Colored by the leading word of the
// severity string ("critical · silent failure" -> critical -> danger red).
const LEVEL_COLOR: Record<string, string> = {
  critical: "#f0716a",
  high: "#f0716a",
  medium: "#d9a441",
  low: "#86c166",
  method: "#22c55e",
};

export function SeverityTag({ severity }: { severity: string }) {
  const level = severity.split(/[·\s]/)[0]?.toLowerCase() ?? "";
  const color = LEVEL_COLOR[level] ?? "#9aa4b2";
  return (
    <span
      className="mono-label shrink-0 self-start rounded-full px-2.5 py-1"
      style={{ color, border: `1px solid ${color}55`, background: `${color}1f` }}
    >
      {severity}
    </span>
  );
}

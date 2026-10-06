// Small severity pill for the series listing. Colored by the leading word of the
// severity string ("critical · silent failure" -> critical -> danger red).
const LEVEL_COLOR: Record<string, string> = {
  critical: "#b42318",
  high: "#b42318",
  medium: "#8a5a00",
  low: "#3f7d20",
  method: "#23408e",
};

export function SeverityTag({ severity }: { severity: string }) {
  const level = severity.split(/[·\s]/)[0]?.toLowerCase() ?? "";
  const color = LEVEL_COLOR[level] ?? "#6b675e";
  return (
    <span
      className="mono-label shrink-0 self-start rounded-full px-2.5 py-1"
      style={{ color, border: `1px solid ${color}55`, background: `${color}12` }}
    >
      {severity}
    </span>
  );
}

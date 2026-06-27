// Previous/next case links so readers binge the Silicon Bug Files series.
import Link from "next/link";

export type SeriesLink = {
  slug: string;
  title: string;
  codename?: string;
  bugNumber?: string;
} | null;

function label(p: NonNullable<SeriesLink>) {
  return `No. ${p.bugNumber} · ${p.codename ?? p.title}`;
}

export function SeriesNav({ prev, next }: { prev: SeriesLink; next: SeriesLink }) {
  if (!prev && !next) return null;
  return (
    <nav className="mt-12 grid gap-3 sm:grid-cols-2" aria-label="Series navigation">
      {prev ? (
        <Link
          href={`/blog/${prev.slug}`}
          className="panel group rounded-md p-4 transition-colors hover:border-white/20"
        >
          <span className="mono-label text-zinc-500">
            <span aria-hidden>←</span> previous case
          </span>
          <span className="mt-1.5 block text-[14px] text-zinc-300 transition-colors group-hover:text-white">
            {label(prev)}
          </span>
        </Link>
      ) : (
        <span aria-hidden />
      )}
      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          className="panel group rounded-md p-4 transition-colors hover:border-white/20 sm:text-right"
        >
          <span className="mono-label text-zinc-500">
            next case <span aria-hidden>→</span>
          </span>
          <span className="mt-1.5 block text-[14px] text-zinc-300 transition-colors group-hover:text-white">
            {label(next)}
          </span>
        </Link>
      ) : (
        <span aria-hidden />
      )}
    </nav>
  );
}

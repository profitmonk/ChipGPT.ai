import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/site-shell";
import { BlogCTA } from "@/components/blog/blog-cta";
import { SeverityTag } from "@/components/blog/severity-tag";
import { getAllPosts, getSeriesPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Silicon Bug Files — ChipGPT",
  description:
    "A bingeable field guide to the bug classes that cause respins — and the verification that catches each one.",
};

export default function BlogIndexPage() {
  const series = getSeriesPosts();
  const featured = getAllPosts().find((p) => p.featured);

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Silicon Bug Files"
        description="A bingeable field guide to the bug classes that cause respins — and the verification that catches each one."
      />

      <section>
        <div className="mx-auto max-w-3xl px-6 py-14 lg:px-10 lg:py-20">
          {/* Featured thesis post, visually distinct from the numbered files. */}
          {featured && (
            <Link
              href={`/blog/${featured.slug}`}
              className="panel group mb-12 block rounded-md p-6 transition-colors hover:border-white/20 sm:p-7"
            >
              <p className="mono-label text-green-600">
                Featured{featured.author && ` · ${featured.author}`}
              </p>
              <h2 className="mt-3 text-[1.35rem] font-semibold tracking-[-0.02em] text-white transition-colors group-hover:text-green-400">
                {featured.title}
              </h2>
              <p className="mt-2 text-[14px] leading-[1.7] text-zinc-400">
                {featured.description}
              </p>
            </Link>
          )}

          {/* The numbered, bingeable series. */}
          <p className="mono-label mb-1 text-zinc-600">The series</p>
          <p className="mb-6 text-[13px] text-zinc-500">
            {series.length} cases · read them in order, or jump to a bug class.
          </p>
          <ol className="divide-y divide-white/[0.07]">
            {series.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group flex gap-5 py-6 first:pt-0"
                >
                  <span className="mt-0.5 font-mono text-[15px] tabular-nums text-zinc-600 transition-colors group-hover:text-green-500">
                    {p.bugNumber}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                      <h3 className="text-[1.05rem] font-semibold tracking-[-0.01em] text-white transition-colors group-hover:text-green-400">
                        {p.codename ?? p.title}
                      </h3>
                      {p.severity && <SeverityTag severity={p.severity} />}
                    </div>
                    <p className="mt-1.5 text-[14px] leading-[1.6] text-zinc-500">
                      {p.teaser ?? p.description}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ol>

          <BlogCTA />
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/site-shell";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — ChipGPT",
  description:
    "Perspectives on the AI-native chip lifecycle, and verification engineering deep-dives on the bug classes that cause respins.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Perspectives & Engineering Notes"
        description="Where the chip industry is heading in the age of AI — and the verification engineering that gets us there."
      />

      <section>
        <div className="mx-auto max-w-3xl px-6 py-14 lg:px-10 lg:py-20">
          <ul className="divide-y divide-white/[0.07]">
            {posts.map((p) => (
              <li key={p.slug} className="py-7 first:pt-0">
                <Link href={`/blog/${p.slug}`} className="group block">
                  <p className="mono-label mb-2 text-zinc-600">
                    {p.featured && <span className="text-green-600">Featured · </span>}
                    {p.date}
                    {p.author && ` · ${p.author}`}
                  </p>
                  <h2 className="text-[1.25rem] font-semibold tracking-[-0.02em] text-white transition-colors group-hover:text-green-400">
                    {p.title}
                  </h2>
                  <p className="mt-2 text-[14px] leading-[1.7] text-zinc-500">
                    {p.description}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-green-600">
                    Read <span aria-hidden>→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

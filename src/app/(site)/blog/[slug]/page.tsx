import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/site-shell";
import { BugTLDR } from "@/components/blog/bug-tldr";
import { HeroDiagram } from "@/components/blog/hero-diagram";
import { SeriesNav } from "@/components/blog/series-nav";
import { BlogCTA } from "@/components/blog/blog-cta";
import { getAllPosts, getPost, getSeriesPosts } from "@/lib/blog";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Blog — ChipGPT" };
  return { title: `${post.meta.title} — ChipGPT`, description: post.meta.description };
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const series = getSeriesPosts();
  const idx = series.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? series[idx - 1] : null;
  const next = idx >= 0 && idx < series.length - 1 ? series[idx + 1] : null;

  return (
    <>
      <PageHeader
        eyebrow={post.meta.date || "Blog"}
        title={post.meta.title}
        description={post.meta.description}
      />

      <section>
        <div className="mx-auto max-w-3xl px-6 py-14 lg:px-10 lg:py-20">
          {post.meta.tldrBug && post.meta.tldrMiss && post.meta.tldrFix && (
            <BugTLDR
              bug={post.meta.tldrBug}
              miss={post.meta.tldrMiss}
              fix={post.meta.tldrFix}
            />
          )}
          <HeroDiagram slug={slug} />
          {post.meta.author && (
            <p className="mono-label mb-8 text-zinc-500">By {post.meta.author}</p>
          )}
          <article
            className="blogpost"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
          {idx >= 0 && <SeriesNav prev={prev} next={next} />}
          <BlogCTA />
          <div className="mt-14 border-t border-white/[0.07] pt-8">
            <Link
              href="/blog"
              className="font-mono text-[11px] uppercase tracking-wider text-green-600 transition-colors hover:text-green-500"
            >
              <span aria-hidden>←</span> All posts
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

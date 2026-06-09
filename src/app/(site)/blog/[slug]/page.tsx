import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/site-shell";
import { getAllPosts, getPost } from "@/lib/blog";

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

  return (
    <>
      <PageHeader
        eyebrow={post.meta.date || "Blog"}
        title={post.meta.title}
        description={post.meta.description}
      />

      <section>
        <div className="mx-auto max-w-3xl px-6 py-14 lg:px-10 lg:py-20">
          <article
            className="blogpost"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
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

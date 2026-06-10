import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // /coworker is a real Next page (site shell + demo iframe); the raw demo lives
  // at /coworker-app/ (static, served directly from public/). No rewrite needed.
  // /blogs (and /blogs/<slug>) -> /blog — the public teaser links to /blogs.
  async redirects() {
    return [
      { source: "/blogs", destination: "/blog", permanent: false },
      { source: "/blogs/:slug", destination: "/blog/:slug", permanent: false },
    ];
  },
};

export default nextConfig;

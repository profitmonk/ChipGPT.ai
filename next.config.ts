import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Serve the standalone RTL/DV co-worker demo (static files in public/coworker)
  // at the clean URL /coworker. /coworker/index.html also works as a fallback.
  async rewrites() {
    return [{ source: "/coworker", destination: "/coworker/index.html" }];
  },
  // /blogs (and /blogs/<slug>) -> /blog — the public teaser links to /blogs.
  async redirects() {
    return [
      { source: "/blogs", destination: "/blog", permanent: false },
      { source: "/blogs/:slug", destination: "/blog/:slug", permanent: false },
    ];
  },
};

export default nextConfig;

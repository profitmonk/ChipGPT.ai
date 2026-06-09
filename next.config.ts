import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Serve the standalone RTL/DV co-worker demo (static files in public/coworker)
  // at the clean URL /coworker. /coworker/index.html also works as a fallback.
  async rewrites() {
    return [{ source: "/coworker", destination: "/coworker/index.html" }];
  },
};

export default nextConfig;

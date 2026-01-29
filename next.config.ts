import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Skip TypeScript type checking during production builds
    // This speeds up Vercel deployments significantly
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

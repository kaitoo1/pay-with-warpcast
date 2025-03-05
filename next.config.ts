import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // This ignores all ESLint errors during build
    // Or you can use a more specific configuration:
    // dirs: ['pages', 'components'] // Only lint these directories
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "place-hold.it",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

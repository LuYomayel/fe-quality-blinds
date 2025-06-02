import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Output configuration for Netlify
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static export
  },

  // Enable experimental features for better performance
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["framer-motion", "@heroicons/react"],
  },

  // Compression
  compress: true,

  // Disable server-side features for static export
  // async headers() and async redirects() are not supported with output: 'export'
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuración para Netlify con server-side functions
  // output: "export", // Remover para usar funciones de servidor
  trailingSlash: true,
  images: {
    domains: ["example.com"], // Añadir dominios externos si es necesario
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // Enable experimental features for better performance
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["framer-motion", "@heroicons/react"],
  },

  // Compression
  compress: true,

  // Headers y redirects se manejan en netlify.toml
};

export default nextConfig;

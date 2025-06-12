import type { NextConfig } from "next";
import path from "path";

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

  // Configuración de Webpack para resolver path mappings explícitamente
  webpack: (config) => {
    // Configurar alias para path mapping
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "src"),
    };

    return config;
  },

  // Headers y redirects se manejan en netlify.toml
};

export default nextConfig;

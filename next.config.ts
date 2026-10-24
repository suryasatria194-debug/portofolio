import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  experimental: {
    optimizePackageImports: ["react-icons/si", "react-icons/fa", "react-icons/vsc", "react-icons/lu"],
  },
  // ...config lain yang sudah ada
};

export default nextConfig;
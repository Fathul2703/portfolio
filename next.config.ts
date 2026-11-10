import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    globalNotFound: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // Bahasa default: Indonesia. Ganti ke "/en" jika ingin default English.
      { source: "/", destination: "/id", permanent: false },
    ];
  },
};

export default nextConfig;

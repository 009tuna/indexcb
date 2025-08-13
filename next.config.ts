import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["http://localhost:3000", "http://172.20.41.70:3000"],
  images: {
    // Geçici olarak image optimization’ı kapatıyoruz
    unoptimized: true,
  },
};

export default nextConfig;

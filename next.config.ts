import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // 모든 HTTPS 도메인 허용 (프로덕션에서는 특정 도메인만 지정 권장)
      },
    ],
  },
};

export default nextConfig;

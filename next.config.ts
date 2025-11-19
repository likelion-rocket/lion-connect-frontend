import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lion-connect-files.s3.ap-northeast-2.amazonaws.com",
        pathname: "/**", // profiles/ 안만 허용하고 싶으면 "/profiles/**"
      },
    ],
  },
};

export default nextConfig;

import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://like-lion.netlify.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/dashboard", "/dashboard/job-board"],
        disallow: [
          // 기업 회원 전용 (본인 공고 관리)
          "/jobs",
          "/jobs/*",
          // 개인 이력서 (로그인 필요)
          "/talents",
          "/talents/*",
          // 개인정보 보호
          "/dashboard/applications",
          "/dashboard/applications/*",
          "/dashboard/profile",
          "/dashboard/profile/*",
          // 인증 페이지
          "/login",
          "/signup",
          "/signup/*",
          "/forgot-email",
          "/forgot-password",
          // 관리자 페이지
          "/admin",
          "/admin/*",
          // API 엔드포인트
          "/api",
          "/api/*",
        ],
      },
      {
        userAgent: "GPTBot",
        disallow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

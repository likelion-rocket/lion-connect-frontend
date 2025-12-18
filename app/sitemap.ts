import { MetadataRoute } from "next";
import { fetchPublicJobPostings } from "@/lib/api/jobPostings";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://like-lion.netlify.app";

  // 1. 정적 페이지
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/dashboard`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0, // 최우선 (인재용 랜딩)
    },
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9, // 기업용 랜딩
    },
  ];

  try {
    // 2. 동적 채용공고 페이지 (/dashboard/job-board/[jobId])
    const jobsResponse = await fetchPublicJobPostings({
      page: 0,
      size: 1000, // 모든 공고 가져오기
    });

    const jobRoutes: MetadataRoute.Sitemap = jobsResponse.content.map((job) => ({
      url: `${baseUrl}/dashboard/job-board/${job.jobPostingId}`,
      lastModified: new Date(job.publishedAt || job.updatedAt),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    return [...staticRoutes, ...jobRoutes];
  } catch (error) {
    console.error("Sitemap generation error:", error);
    // 에러 발생 시 정적 페이지만 반환
    return staticRoutes;
  }
}

// ISR: 1시간마다 sitemap 갱신
export const revalidate = 3600;

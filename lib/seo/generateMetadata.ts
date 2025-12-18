import { Metadata } from "next";
import { SEO } from "@/app/(company)/seo/index";
import type { JobDetailResponse } from "@/types/job";

/**
 * 채용공고 메타데이터 생성
 */
export function generateJobPostingMetadata(job: JobDetailResponse): Metadata {
  const title = `${job.title} - ${job.companyName} | ${job.jobRoleName}`;
  const description = job.jobDescription.slice(0, 160); // 160자 제한

  return {
    title,
    description,
    keywords: [
      job.jobRoleName,
      job.companyName,
      job.employmentType === "FULL_TIME" ? "정규직" : "인턴",
      "채용",
      "멋쟁이사자처럼",
      "라이언 커넥트",
      job.jobGroupName,
    ],
    openGraph: {
      type: "article",
      url: `${SEO.url}/dashboard/job-board/${job.jobPostingId}`,
      title,
      description,
      siteName: SEO.siteName,
      publishedTime: job.publishedAt,
      images: [
        {
          url: `/api/og/job/${job.jobPostingId}`, // 동적 OG 이미지 (Phase 2에서 구현)
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/api/og/job/${job.jobPostingId}`],
    },
    alternates: {
      canonical: `${SEO.url}/dashboard/job-board/${job.jobPostingId}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

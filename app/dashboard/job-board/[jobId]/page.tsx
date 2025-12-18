import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchPublicJobPosting } from "@/lib/api/jobPostings";
import { generateJobPostingMetadata } from "@/lib/seo/generateMetadata";
import { generateJobPostingSchema } from "@/lib/seo/generateJobPostingSchema";
import JobBoardDetailClient from "./_components/JobBoardDetailClient";

/**
 * generateMetadata - 동적 메타데이터 생성
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ jobId: string }>;
}): Promise<Metadata> {
  const { jobId } = await params;

  try {
    const job = await fetchPublicJobPosting(jobId);
    return generateJobPostingMetadata(job);
  } catch (error) {
    return {
      title: "채용 공고를 찾을 수 없습니다",
    };
  }
}

/**
 * Server Component - JSON-LD 삽입
 */
export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = await params;

  let job;
  try {
    job = await fetchPublicJobPosting(jobId);
  } catch (error) {
    notFound();
  }

  const jobPostingSchema = generateJobPostingSchema(job);

  return (
    <>
      {/* JSON-LD 구조화 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jobPostingSchema),
        }}
      />

      {/* 기존 UI는 client component로 */}
      <JobBoardDetailClient jobId={jobId} />
    </>
  );
}

// ISR - 1시간마다 재생성
export const revalidate = 3600;

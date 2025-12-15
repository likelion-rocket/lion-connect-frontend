"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { useJobPosting } from "@/hooks/company/useJobPosting";
import BackButton from "@/components/buttons/BackButton";
import JobImageCarousel from "../_components/JobImageCarousel";
import JobDetailInfo from "../_components/JobDetailInfo";
import JobDetailSection from "../_components/JobDetailSection";
import JobCopyright from "../_components/JobCopyright";
import OrangeBgButton from "@/components/ui/OrangeBgButton";
import JobApplicationPanel from "../_components/JobApplicationPanel";

export default function JobDetailPage({ params }: { params: Promise<{ jobId: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { data: job, isLoading, error } = useJobPosting(resolvedParams.jobId);
  const [isApplicationPanelOpen, setIsApplicationPanelOpen] = useState(false);

  const handleApply = () => {
    setIsApplicationPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsApplicationPanelOpen(false);
  };

  const handleSubmitApplication = (resumeId: string) => {
    // TODO: 지원하기 API 호출
    console.log("지원하기 제출:", resumeId);
    setIsApplicationPanelOpen(false);
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-white flex justify-center items-center">
        <div className="text-neutral-500 text-lg font-['Pretendard']">로딩 중...</div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="w-full min-h-screen bg-white flex flex-col justify-center items-center gap-4">
        <div className="text-neutral-800 text-lg font-['Pretendard']">
          채용 공고를 불러올 수 없습니다.
        </div>
        <button
          onClick={() => router.back()}
          className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
        >
          돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="w-full relative bg-white overflow-hidden py-[120px] flex flex-col items-center">
      {/* 뒤로가기 버튼 */}
      <div className="w-full h-14 overflow-hidden">
        <div className="w-[1160px] mx-auto pt-1">
          <BackButton />
        </div>
      </div>

      {/* 이미지 캐러셀 */}
      {job.images && job.images.length > 0 && (
        <div className="w-full flex justify-center mt-12 mb-16">
          <JobImageCarousel images={job.images.map((img) => img.url || "")} />
        </div>
      )}

      {/* 메인 컨텐츠 */}
      <div className="w-[1160px] inline-flex justify-start items-start gap-5 pb-16">
        {/* 좌측 컨텐츠 영역 */}
        <div className="w-[767px] inline-flex flex-col justify-start items-start gap-16 overflow-hidden">
          {/* 회사명 및 공고 제목 */}
          <JobDetailInfo companyName={job.companyName || "기업"} jobTitle={job.title} />

          {/* 상세 정보 섹션들 */}
          <div className="self-stretch px-4 flex flex-col justify-start items-start">
            <div className="self-stretch pb-16 flex flex-col justify-start items-start gap-12 overflow-hidden">
              {/* 회사/직무 소개 */}
              <div className="self-stretch flex flex-col justify-start items-start gap-12">
                <div className="self-stretch justify-start text-neutral-800 text-2xl font-semibold font-['Pretendard'] leading-8">
                  회사/직무 소개
                </div>
                <div className="self-stretch min-h-11 inline-flex justify-start items-start gap-2.5">
                  <div className="flex-1 justify-start text-neutral-800 text-base font-normal font-['Pretendard'] leading-6 whitespace-pre-wrap">
                    {job.jobDescription}
                  </div>
                </div>
              </div>

              {/* 주요 업무 */}
              {job.mainTasks && <JobDetailSection title="주요 업무" content={job.mainTasks} />}

              {/* 자격 요건 */}
              {job.requirements && (
                <JobDetailSection title="자격 요건" content={job.requirements} />
              )}

              {/* 우대 사항 */}
              {job.preferred && <JobDetailSection title="우대 사항" content={job.preferred} />}

              {/* 혜택 및 복지 */}
              {job.benefits && <JobDetailSection title="혜택 및 복지" content={job.benefits} />}

              {/* 채용 전형 */}
              {job.hiringProcess && (
                <JobDetailSection title="채용 전형" content={job.hiringProcess} />
              )}
            </div>

            {/* 근무지 */}
            <div className="self-stretch flex flex-col justify-start items-start gap-16 overflow-hidden">
              <div className="self-stretch flex flex-col justify-start items-start gap-6">
                <div className="self-stretch justify-start text-neutral-800 text-2xl font-semibold font-['Pretendard'] leading-8">
                  근무지
                </div>
                <div className="self-stretch min-h-11 justify-start text-neutral-800 text-base font-normal font-['Pretendard'] leading-6">
                  {job.workplace}
                </div>
              </div>
            </div>
          </div>

          {/* 저작권 안내 */}
          <JobCopyright />
        </div>

        {/* 우측 지원하기 영역 */}
        <div className="sticky top-24">
          {!isApplicationPanelOpen ? (
            <OrangeBgButton onClick={handleApply} isActive className="w-96">
              지원 하기
            </OrangeBgButton>
          ) : (
            <JobApplicationPanel
              isOpen={isApplicationPanelOpen}
              onClose={handleClosePanel}
              onSubmit={handleSubmitApplication}
            />
          )}
        </div>
      </div>
    </div>
  );
}

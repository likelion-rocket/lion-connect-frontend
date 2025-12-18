"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePublicJobPosting } from "@/hooks/company/useJobPosting";
import { useApplyToJob } from "@/hooks/useJobApplications";
import { useConfirm } from "@/contexts/ConfirmContext";
import { useToastStore } from "@/store/toastStore";
import BackButton from "@/components/buttons/BackButton";
import JobImageCarousel from "@/app/dashboard/job-board/_components/JobImageCarousel";
import JobDetailInfo from "@/app/dashboard/job-board/_components/JobDetailInfo";
import JobDetailSection from "@/app/dashboard/job-board/_components/JobDetailSection";
import JobCopyright from "@/app/dashboard/job-board/_components/JobCopyright";
import OrangeBgButton from "@/components/ui/OrangeBgButton";
import JobApplicationPanel from "@/app/dashboard/job-board/_components/JobApplicationPanel";

interface JobBoardDetailClientProps {
  jobId: string;
}

export default function JobBoardDetailClient({ jobId }: JobBoardDetailClientProps) {
  const router = useRouter();
  const confirm = useConfirm();
  const showToast = useToastStore((state) => state.showToast);
  const { data: job, isLoading, error } = usePublicJobPosting(jobId);
  const { mutateAsync: applyToJob, isPending } = useApplyToJob();
  const [isApplicationPanelOpen, setIsApplicationPanelOpen] = useState(false);

  const handleApply = () => {
    setIsApplicationPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsApplicationPanelOpen(false);
  };

  const handleSubmitApplication = async (resumeId: string) => {
    try {
      // 지원하기 API 호출
      await applyToJob({
        jobId,
        data: { talentProfileId: Number(resumeId) },
      });

      // 확인 모달 표시
      const goToApplications = await confirm({
        title: "지원 접수 되었습니다.",
        description: "지원 현황 페이지로 이동하시겠습니까?",
        confirmLabel: "지원 현황 바로가기",
        cancelLabel: "취소",
      });

      if (goToApplications) {
        router.push("/applications");
      }
    } catch (error: any) {
      console.error("지원하기 실패:", error);

      // 500 에러인 경우 토스트 메시지 표시
      if (error?.response?.status === 500) {
        showToast("취소한 요청에는 다시 지원할 수 없습니다.", "error");
      } else {
        showToast("지원하기에 실패했습니다. 다시 시도해주세요.", "error");
      }

      // 패널 닫기
      setIsApplicationPanelOpen(false);
    }
  };

  if (error) {
    // ApiError에서 message 추출
    const errorMessage = (error as any)?.message || "채용 공고를 불러올 수 없습니다.";

    return (
      <div className="w-full min-h-screen bg-white flex flex-col justify-center items-center gap-4">
        <div className="text-neutral-800 text-lg font-['Pretendard']">{errorMessage}</div>
        <button
          onClick={() => router.back()}
          className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
        >
          돌아가기
        </button>
      </div>
    );
  }

  if (isLoading || !job) {
    return (
      <div className="w-full min-h-screen bg-white flex justify-center items-center">
        <div className="text-neutral-500 text-lg font-['Pretendard']">로딩 중...</div>
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
            <OrangeBgButton
              onClick={handleApply}
              isActive={!job.applied}
              disabled={job.applied}
              className="w-96"
            >
              {job.applied ? "지원 완료" : "지원 하기"}
            </OrangeBgButton>
          ) : (
            <JobApplicationPanel
              isOpen={isApplicationPanelOpen}
              onClose={handleClosePanel}
              onSubmit={handleSubmitApplication}
              isSubmitting={isPending}
              isApplied={job.applied}
            />
          )}
        </div>
      </div>
    </div>
  );
}

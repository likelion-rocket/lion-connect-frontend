"use client";

import { useState } from "react";
// import { use } from "react";
import { useRouter } from "next/navigation";
// import { useJobPosting } from "@/hooks/company/useJobPosting";
import BackButton from "@/components/buttons/BackButton";
import JobImageCarousel from "../_components/JobImageCarousel";
import JobDetailInfo from "../_components/JobDetailInfo";
import JobDetailSection from "../_components/JobDetailSection";
import JobCopyright from "../_components/JobCopyright";
import OrangeBgButton from "@/components/ui/OrangeBgButton";
import JobApplicationPanel from "../_components/JobApplicationPanel";

// 목데이터
const mockJob = {
  id: "1",
  title: "게임 PM(채용 공고 제목)",
  companyName: "멋쟁이사자처럼",
  imageUrls: [
    "/images/hero-image.png",
    "/images/hero-image.png",
    "/images/hero-image.png",
    "/images/hero-image.png",
    "/images/hero-image.png",
  ],
  description: `"Possibility to Reality"
  멋쟁이사자처럼은 AI 시대의 핵심, 'AI 인재'에 집중합니다.우리는 어떻게 하면 더 많은 AI 인재를, 더 잘 육성할 수 있을지 매일 고민합니다.그리고 이들과 함께 AI 생태계를 확장해 나가고자 합니다.우리는 AI 시대의 교육을 새롭게 정의하고,그 교육을 통해 성장한 인재들과 함께 세상의 문제를 해결하는 AI 프로덕트를 만들어냅니다.단순한 교육 회사를 넘어, AI 시대의 주역을 함께 만들어가는 플랫폼을 지향합니다.너무나도 빠르게 변화하는 흐름 속에서 새로운 정답을 함께 찾아가실 분 들과 함께 하고 싶습니다.[합류하게 될 팀을 소개 드려요.]우리는 이제 "무엇을 아는가"보다 "AI를 통해 무엇을 해낼 수 있는가"가 더 중요한 시대를 맞이했어요.멋쟁이사자처럼은 학습을 단순한 지식의 습득이 아니라 '경험'으로 새롭게 정의하며,AI 기반의 초개인화 학습 플랫폼 AXP(AI Experience Platform)를 함께 만들고 있어요.AXP에서는 모든 학습자가 자신만의 속도와 방식으로 배우고 성장할 수 있도록개인에게 최적화된 학습 여정을 만들어나가고 있답니다.우리는 이 비전을 함께 실현하고 기술과 교육의 경계를 허무는 여정에 동참할 DevOps 엔지니어를 모시고 싶어요.이 역할은 단순히 기능을 구현하는 자리가 아니에요.당신은 사람들이 배우는 방식 자체를 새롭게 설계하는 사람이 될 거예요.`,
  responsibilities: `[함께 만들어갈 업무예요.]
  • AWS EKS 기반의 Kubernetes 클러스터를 설계·구축하고, 네트워크 및 보안 정책을 수립해요.
  • VPC, Subnet, Security Group, VPN 등 클라우드 네트워크 전체를 직접 설계하며, 서버와 서비스를 안전하게 보호해요.
  • Terraform 등 IaC 도구로 인프라를 코드로 관리하고, 일관된 클라우드 환경을 구축 및 고도화해요.
  • CI/CD 파이프라인(GitHub Actions, ArgoCD 등)을 설계하고, 서비스의 빌드·배포 자동화 및 안정성을 책임져요.
  • Prometheus, Grafana 등으로 시스템과 리소스 상태를 모니터링하며, 비용 최적화 및 장애 예방 방안까지 함께 고민해요.`,
  requirements: `[이런 분이면 정말 잘 어울려요]             
  • AWS 등 클라우드 환경에서 인프라를 설계하고 구축·운영해본 경험이 있으시면 좋아요.             
  • Kubernetes(EKS 등) 클러스터를 직접 다뤄보시고, 네트워크나 보안 정책(CNI, Network Policy 등)까지 챙겨본 경험이 있다면 큰 도움이 돼요.
  • Terraform 중심의 IaC 도구로 인프라를 자동화해본 경험이 있으시면 좋아요.             • CI/CD 환경을 직접 설계·운영해보셨고, Linux 기반의 트러블슈팅이나 Shell/Python 자동화 스크립트를 작성해본 분을 선호해요.
  • 팀과 긴밀하게 소통하면서 아키텍처 방향을 함께 만들고, 서비스 안정성과 비용 효율성을 균형 있게 고민해오신 분이라면 특히 잘 맞을 거예요.`,
  preferredQualifications: `• Kubernetes Operator 개발 경험 또는 Helm Chart 작성 경험이 있으면 좋아요.
• AWS 외 GCP, Azure 등 멀티 클라우드 환경 경험이 있다면 더욱 환영합니다.
• 보안 관련 인증(AWS Certified Security 등)을 보유하신 분이라면 플러스 요인이에요.
• GitOps 방식의 배포 전략을 실제로 적용해본 경험이 있다면 좋습니다.`,
  benefits: `• 업계 최고 수준의 연봉 및 스톡옵션 제공
• 최신 장비 지원 (MacBook Pro, 듀얼 모니터 등)
• 자율 출퇴근제 및 재택근무 가능
• 도서 구입비 및 교육비 전액 지원
• 점심 식대 및 간식 제공
• 4대 보험 및 퇴직연금 가입
• 건강검진 지원`,
  hiringProcess: `1차 서류 전형 → 2차 화상 면접 → 3차 실무 면접 → 최종 합격

• 전형별 합격자에 한해 개별 안내 드립니다.
• 전형 일정은 상황에 따라 변경될 수 있습니다.
• 제출된 서류는 채용 전형 이외의 용도로 사용되지 않습니다.`,
  location: "서울특별시 종로구 종로3길 17, D1동 16층(청진동, D타워)",
};

export default function JobDetailPage() {
  // {
  // params,
  // }: {
  //   params: Promise<{ jobId: string }>;
  // }
  // const resolvedParams = use(params);
  const router = useRouter();
  // const { data: job, isLoading, error } = useJobPosting(resolvedParams.jobId);
  const job = mockJob;
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

  // if (isLoading) {
  //   return (
  //     <div className="w-full min-h-screen bg-white flex justify-center items-center">
  //       <div className="text-neutral-500 text-lg font-['Pretendard']">
  //         로딩 중...
  //       </div>
  //     </div>
  //   );
  // }

  // if (error || !job) {
  //   return (
  //     <div className="w-full min-h-screen bg-white flex flex-col justify-center items-center gap-4">
  //       <div className="text-neutral-800 text-lg font-['Pretendard']">
  //         채용 공고를 불러올 수 없습니다.
  //       </div>
  //       <button
  //         onClick={() => router.back()}
  //         className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
  //       >
  //         돌아가기
  //       </button>
  //     </div>
  //   );
  // }

  return (
    <div className="w-full relative bg-white overflow-hidden py-[120px] flex flex-col items-center">
      {/* 뒤로가기 버튼 */}
      <div className="w-full h-14 overflow-hidden">
        <div className="w-[1160px] mx-auto pt-1">
          <BackButton />
        </div>
      </div>

      {/* 이미지 캐러셀 */}
      {job.imageUrls && job.imageUrls.length > 0 && (
        <div className="w-full flex justify-center mt-12 mb-16">
          <JobImageCarousel images={job.imageUrls} />
        </div>
      )}

      {/* 메인 컨텐츠 */}
      <div className="w-[1160px] inline-flex justify-start items-start gap-5 pb-16">
        {/* 좌측 컨텐츠 영역 */}
        <div className="w-[767px] inline-flex flex-col justify-start items-start gap-16 overflow-hidden">
          {/* 회사명 및 공고 제목 */}
          <JobDetailInfo companyName="멋쟁이사자처럼" jobTitle={job.title} />

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
                    {job.description}
                  </div>
                </div>
              </div>

              {/* 주요 업무 */}
              {job.responsibilities && (
                <JobDetailSection title="주요 업무" content={job.responsibilities} />
              )}

              {/* 자격 요건 */}
              {job.requirements && (
                <JobDetailSection title="자격 요건" content={job.requirements} />
              )}

              {/* 우대 사항 */}
              {job.preferredQualifications && (
                <JobDetailSection title="우대 사항" content={job.preferredQualifications} />
              )}

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
                  {job.location}
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

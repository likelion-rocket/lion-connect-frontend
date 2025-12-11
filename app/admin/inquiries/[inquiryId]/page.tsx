import { ChevronLeft, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

function InquiryDetailPage() {
  return (
    <div className="flex flex-col mx-auto w-[907px]">
      {/* 서브 헤더 */}
      <div className="relative flex h-[71px] items-center justify-between rounded-t-lg bg-brand-02 px-6">
        <Link href="/admin/inquiries" className="flex cursor-pointer items-center gap-4">
          <ChevronLeft className="size-6 text-text-primary" />
          <span className="text-sm font-medium text-text-primary">이전 페이지</span>
        </Link>

        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-medium text-text-primary">
          기업 문의 상세
        </span>

        <div className="flex items-center rounded-lg bg-bg-accent">
          <button className="flex size-10 items-center justify-center rounded-l-lg transition-colors hover:bg-brand-06">
            <Image src="/icons/solid-check-circle-white.svg" alt="완료" width={20} height={20} />
          </button>
          <div className="h-10 w-px bg-white/30" />
          <button className="flex size-10 items-center justify-center rounded-r-lg transition-colors hover:bg-brand-06">
            <Trash2 className="size-5 text-white" />
          </button>
        </div>
      </div>

      {/* 컨텐츠 영역 */}
      <div className="flex flex-col gap-3 rounded-b-lg bg-bg-primary p-8 shadow-md">
        {/* 작성일 */}
        <p className="px-4 text-sm text-text-tertiary">YYYY . MM(기업 문의가 온 날자)</p>

        {/* 회사명 & 담당자명 */}
        <div className="flex gap-9">
          <div className="flex h-16 flex-1 items-center rounded-lg bg-bg-primary px-4 py-3">
            <p className="text-sm text-text-primary">회사명</p>
          </div>
          <div className="flex h-16 flex-1 items-center rounded-lg bg-bg-primary px-4 py-3 shadow-sm">
            <p className="text-sm text-text-primary">담당자명</p>
          </div>
        </div>

        {/* 부서 & 직책 */}
        <div className="flex gap-9">
          <div className="flex h-16 flex-1 items-center rounded-lg bg-bg-primary px-4 py-3">
            <p className="text-sm text-text-primary">부서</p>
          </div>
          <div className="flex h-16 flex-1 items-center rounded-lg bg-bg-primary px-4 py-3">
            <p className="text-sm text-text-primary">직책</p>
          </div>
        </div>

        {/* 전화번호 & 이메일 */}
        <div className="flex gap-9">
          <div className="flex h-16 flex-1 items-center rounded-lg bg-bg-primary px-4 py-3">
            <p className="text-sm text-text-primary">전화번호</p>
          </div>
          <div className="flex h-16 flex-1 items-center rounded-lg bg-bg-primary px-4 py-3">
            <p className="text-sm text-text-primary">이메일</p>
          </div>
        </div>

        {/* 문의 사항 */}
        <div className="mt-5 flex flex-col gap-3">
          <p className="px-4 text-sm font-semibold text-text-primary">문의 사항</p>
          <p className="whitespace-pre-wrap px-4 py-3 text-sm leading-relaxed text-text-primary">
            안녕하세요 기업문의 관련해서 글 남깁니다. show field 입니다. 안녕하세요 기업문의
            관련해서 글 남깁니다.안녕하세요 기업문의 관련해서 글 남깁니다.안녕하세요 기업문의
            관련해서 글 남깁니다.안녕하세요 기업문의 관련해서 글 남깁니다.안녕하세요 기업문의
            관련해서 글 남깁니다.안녕하세요 기업문의 관련해서 글 남깁니다.안녕하세요 기업문의
            관련해서 글 남깁니다.안녕하세요 기업문의 관련해서 글 남깁니다.안녕하세요 기업문의
            관련해서 글 남깁니다.안녕하세요 기업문의 관련해서 글 남깁니다.안녕하세요 기업문의
            관련해서 글 남깁니다.안녕하세요 기업문의 관련해서 글 남깁니다.안녕하세요 기업문의
            관련해서 글 남깁니다.안녕하세요 기업문의 관련해서 글 남깁니다.안녕하세요 기업문의
            관련해서 글 남깁니다.안녕하세요 기업문의 관련해서 글 남깁니다.안녕하세요 기업문의
            관련해서 글 남깁니다.안녕하세요 기업문의 관련해서 글 남깁니다.안녕하세요 기업문의
            관련해서 글 남깁니다.안녕하세요 기업문의 관련해서 글 남깁니다.안녕하세요 기업문의
            관련해서 글 남깁니다.안녕하세요 기업문의 관련해서 글 남깁니다.안녕하세요 기업문의
            관련해서 글 남깁니다.안녕하세요 기업문의 관련해서 글 남깁니다.안녕하세요 기업문의
            관련해서 글 남깁니다.안녕하세요 기업문의 관련해서 글 남깁니다.안녕하세요 기업문의
            관련해서 글 남깁니다.안녕하세요 기업문의 관련해서 글 남깁니다.안녕하세요 기업문의
            관련해서 글 남깁니다.안녕하세요 기업문의 관련해서 글 남깁니다.안녕하세요 기업문의
            관련해서 글 남깁니다.안녕하세요 기업문의 관련해서 글 남깁니다.안녕하세요 기업문의
            관련해서 글 남깁니다.안녕하세요 기업문의 관련해서 글 남깁니다.안녕하세요 기업문의
            관련해서 글 남깁니다.안녕하세요 기업문의 관련해서 글 남깁니다.안녕하세요 기업문의
            관련해서 글 남깁니다.안녕하세요 기업문의 관련해서 글 남깁니다.안녕하세요 기업문의
            관련해서 글 남깁니다.안녕하세요 기업문의 관련해서 글 남깁니다.안녕하세요 기업문의
            관련해서 글 남깁니다.안녕하세요 기업문의 관련해서 글 남깁니다.안녕하세요 기업문의
            관련해서 글 남깁니다.안녕하세요 기업문의 관련해서 글 남깁니다.안녕하세요 기업문의
            관련해서 글 남깁니다.안녕하세요 기업문의 관련해서 글 남깁니다.안녕하세요 기업문의
            관련해서 글 남깁니다.
          </p>
        </div>

        {/* 내부용 담당자 메모 */}
        <div className="mt-2 flex flex-col gap-3">
          <div className="flex items-center gap-3 px-4">
            <p className="text-sm font-semibold text-text-primary">내부용 담당자 메모</p>
            <p className="text-sm text-text-tertiary">YYYY . MM(기업 문의가 온 날자)</p>
          </div>
          <p className="min-h-[252px] whitespace-pre-wrap px-4 py-3 text-sm leading-relaxed text-text-primary">
            내부용 담당자 메모 input 입니다.
          </p>
        </div>
      </div>
    </div>
  );
}

export default InquiryDetailPage;

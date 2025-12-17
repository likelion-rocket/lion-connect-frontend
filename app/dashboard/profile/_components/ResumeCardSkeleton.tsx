export function ResumeCardSkeleton() {
  return (
    <div className="self-stretch p-8 rounded-lg outline-[0.80px] outline-offset-[-0.80px] outline-border-quaternary shadow flex flex-col justify-start items-start gap-8 overflow-hidden">
      {/* 공개 상태 배너 스켈레톤 (랜덤으로 표시/숨김) */}
      <div className="px-6 py-1 bg-neutral-200 rounded-lg inline-flex justify-center items-center gap-2.5 animate-pulse">
        <div className="w-5 h-5 rounded-full bg-neutral-300" />
        <div className="w-48 h-6 rounded bg-neutral-300" />
      </div>

      {/* 헤더: 이름, 상태, 버튼들 스켈레톤 */}
      <div className="self-stretch inline-flex justify-between items-center">
        <div className="flex justify-start items-center gap-4">
          {/* 제목 스켈레톤 */}
          <div className="w-40 h-9 rounded bg-neutral-200 animate-pulse" />
          {/* 상태 스켈레톤 */}
          <div className="w-20 h-6 rounded bg-neutral-200 animate-pulse" />
        </div>

        <div className="flex justify-start items-center gap-4">
          {/* 버튼들 스켈레톤 */}
          <div className="w-24 h-9 rounded-lg bg-neutral-200 animate-pulse" />
          <div className="w-9 h-9 rounded-lg bg-neutral-200 animate-pulse" />
          <div className="w-9 h-9 rounded-lg bg-neutral-200 animate-pulse" />
        </div>
      </div>

      {/* 스카우트 안내 스켈레톤 */}
      <div className="w-full h-20 rounded-lg bg-neutral-200 animate-pulse" />
    </div>
  );
}

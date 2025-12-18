export function JobCardSkeleton() {
  return (
    <div className="w-[275px] inline-flex flex-col justify-start items-start gap-2 overflow-hidden">
      {/* 이미지 스켈레톤 */}
      <div className="w-[275px] h-[184px] relative bg-neutral-200 rounded-lg overflow-hidden animate-pulse" />

      {/* 정보 스켈레톤 */}
      <div className="w-full px-1.5 bg-white flex flex-col justify-start items-start gap-2.5 overflow-hidden">
        <div className="w-full flex flex-col justify-start items-start gap-1">
          {/* 직무명 */}
          <div className="w-32 h-5 rounded bg-neutral-200 animate-pulse" />
          {/* 회사명 */}
          <div className="w-24 h-4 rounded bg-neutral-200 animate-pulse" />
          {/* 위치 */}
          <div className="w-20 h-4 rounded bg-neutral-200 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

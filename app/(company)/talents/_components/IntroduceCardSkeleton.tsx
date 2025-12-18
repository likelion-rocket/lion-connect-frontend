export default function IntroduceCardSkeleton() {
  return (
    <section className="mx-auto mb-6 rounded-2xl bg-white p-8">
      <div className="inline-flex justify-start items-center gap-12">
        {/* 왼쪽: 프로필 스켈레톤 */}
        <div className="w-40 inline-flex flex-col justify-start items-start gap-8">
          <div className="w-40 h-48 rounded-lg bg-neutral-200 animate-pulse" />
          <div className="w-40 h-10 rounded-lg bg-neutral-200 animate-pulse" />
        </div>

        {/* 중간: 본문 컨텐츠 스켈레톤 */}
        <div className="px-2.5 w-[599px] inline-flex flex-col justify-start items-start gap-2.5">
          <div className="flex flex-col justify-start items-start gap-6 w-full">
            {/* 이름 & 배지 */}
            <div className="inline-flex justify-start items-center gap-8">
              <div className="p-2 flex justify-center items-center gap-2.5">
                <div className="w-20 h-7 rounded bg-neutral-200 animate-pulse" />
              </div>
              <div className="flex justify-start items-center gap-3">
                <div className="w-24 h-6 rounded-full bg-neutral-200 animate-pulse" />
                <div className="w-20 h-6 rounded-full bg-neutral-200 animate-pulse" />
              </div>
            </div>

            {/* 상세 정보 */}
            <div className="self-stretch px-2 flex flex-col justify-start items-start gap-4">
              {/* 연락처 */}
              <div className="self-stretch h-9 inline-flex justify-start items-center gap-8">
                <div className="flex justify-start items-center gap-2">
                  <div className="w-4 h-4 rounded bg-neutral-200 animate-pulse" />
                  <div className="w-28 h-5 rounded bg-neutral-200 animate-pulse" />
                </div>
                <div className="flex justify-start items-center gap-2">
                  <div className="w-4 h-4 rounded bg-neutral-200 animate-pulse" />
                  <div className="w-40 h-5 rounded bg-neutral-200 animate-pulse" />
                </div>
              </div>

              {/* 학교 · 전공 */}
              <div className="self-stretch inline-flex justify-start items-center gap-16">
                <div className="flex justify-start items-center gap-2">
                  <div className="w-4 h-4 rounded bg-neutral-200 animate-pulse" />
                  <div className="w-16 h-5 rounded bg-neutral-200 animate-pulse" />
                </div>
                <div className="w-48 h-5 rounded bg-neutral-200 animate-pulse" />
              </div>

              {/* 직군 · 직무 */}
              <div className="self-stretch inline-flex justify-start items-center gap-16">
                <div className="flex justify-start items-center gap-2">
                  <div className="w-4 h-4 rounded bg-neutral-200 animate-pulse" />
                  <div className="w-16 h-5 rounded bg-neutral-200 animate-pulse" />
                </div>
                <div className="w-40 h-5 rounded bg-neutral-200 animate-pulse" />
              </div>

              {/* 스킬 */}
              <div className="self-stretch inline-flex justify-start items-start gap-16">
                <div className="flex justify-start items-center gap-2">
                  <div className="w-4 h-4 rounded bg-neutral-200 animate-pulse" />
                  <div className="min-w-14 w-14 h-5 rounded bg-neutral-200 animate-pulse" />
                </div>
                <div className="flex justify-start items-center gap-4">
                  <div className="w-16 h-6 rounded-full bg-neutral-200 animate-pulse" />
                  <div className="w-20 h-6 rounded-full bg-neutral-200 animate-pulse" />
                  <div className="w-24 h-6 rounded-full bg-neutral-200 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Work Driven Level Card 스켈레톤 */}
        <div className="w-72 h-72 relative bg-neutral-200 rounded-2xl overflow-hidden animate-pulse" />
      </div>
    </section>
  );
}

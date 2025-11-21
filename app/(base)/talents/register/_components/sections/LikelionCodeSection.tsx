/**
 * 멋사 수료생 코드 입력 섹션 컴포넌트
 * 필드: likelion.code
 */

export default function LikelionCodeSection() {
  return (
    <section className="section section-likelion-code flex flex-col gap-6 md:gap-8">
      <h2 className="text-lg font-bold text-text-primary">멋사 수료생 코드 입력</h2>

      <div className="flex items-center gap-4">
        <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shrink-0">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect
              x="4"
              y="4"
              width="7"
              height="7"
              rx="1"
              stroke="currentColor"
              className="text-icon-secondary"
              strokeWidth="2"
            />
            <rect
              x="13"
              y="4"
              width="7"
              height="7"
              rx="1"
              stroke="currentColor"
              className="text-icon-secondary"
              strokeWidth="2"
            />
            <rect
              x="4"
              y="13"
              width="7"
              height="7"
              rx="1"
              stroke="currentColor"
              className="text-icon-secondary"
              strokeWidth="2"
            />
            <rect
              x="13"
              y="13"
              width="7"
              height="7"
              rx="1"
              stroke="currentColor"
              className="text-icon-secondary"
              strokeWidth="2"
            />
          </svg>
        </div>

        <div className="field flex-1 max-w-md">
          <label htmlFor="likelion-code" className="sr-only">
            멋사 수료생 코드
          </label>
          <input
            id="likelion-code"
            name="likelion.code"
            type="text"
            placeholder="인재코드를 입력해주세요"
            className="lc-input w-full h-14 md:h-16 px-4 py-3 bg-bg-primary rounded-lg border border-border-quaternary text-base text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-border-accent transition-colors"
          />
          <p className="field-error text-sm text-text-error mt-1"></p>
        </div>
      </div>
    </section>
  );
}

/**
 * 경력 섹션 컴포넌트
 * 필드: career.company, career.startDate, career.endDate, career.description
 */

export default function CareerSection() {
  return (
    <section className="section section-career flex flex-col gap-6 md:gap-8">
      <h2 className="text-lg md:text-xl font-bold text-text-primary">경력</h2>

      {/* 경력 항목 (반복 가능 구조) */}
      <div className="career-list flex flex-col gap-6">
        <div className="career-item flex items-start gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-bg-tertiary rounded-lg flex items-center justify-center shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 9H21V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V9Z"
                stroke="currentColor"
                className="text-icon-secondary"
                strokeWidth="2"
              />
              <path
                d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V9H9V5Z"
                stroke="currentColor"
                className="text-icon-secondary"
                strokeWidth="2"
              />
            </svg>
          </div>

          <div className="flex-1 bg-bg-primary rounded-xl shadow-md p-4 md:p-6 flex flex-col gap-4">
            {/* 회사명 */}
            <div className="field">
              <label
                htmlFor="career-company"
                className="block text-sm font-medium text-text-secondary mb-2"
              >
                회사명
              </label>
              <input
                id="career-company"
                name="career.company"
                type="text"
                placeholder="회사명을 입력해주세요"
                className="lc-input w-full h-14 px-4 py-3 bg-bg-primary rounded-lg border border-border-quaternary text-base text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-border-accent transition-colors"
              />
              <p className="field-error text-sm text-text-error mt-1"></p>
            </div>

            {/* 근무 기간 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="field">
                <label
                  htmlFor="career-start-date"
                  className="block text-sm font-medium text-text-secondary mb-2"
                >
                  근무 시작일
                </label>
                <input
                  id="career-start-date"
                  name="career.startDate"
                  type="text"
                  placeholder="YYYY.MM"
                  className="lc-input w-full h-14 px-4 py-3 bg-bg-primary rounded-lg border border-border-quaternary text-base text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-border-accent transition-colors"
                />
                <p className="field-error text-sm text-text-error mt-1"></p>
              </div>

              <div className="field">
                <label
                  htmlFor="career-end-date"
                  className="block text-sm font-medium text-text-secondary mb-2"
                >
                  근무 종료일
                </label>
                <input
                  id="career-end-date"
                  name="career.endDate"
                  type="text"
                  placeholder="YYYY.MM"
                  className="lc-input w-full h-14 px-4 py-3 bg-bg-primary rounded-lg border border-border-quaternary text-base text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-border-accent transition-colors"
                />
                <p className="field-error text-sm text-text-error mt-1"></p>
              </div>
            </div>

            {/* 담당 업무 */}
            <div className="field">
              <label
                htmlFor="career-description"
                className="block text-sm font-medium text-text-secondary mb-2"
              >
                담당 업무/설명
              </label>
              <textarea
                id="career-description"
                name="career.description"
                placeholder="담당 업무를 입력해주세요"
                rows={3}
                className="lc-input w-full px-4 py-3 bg-bg-primary rounded-lg border border-border-quaternary text-base text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-border-accent transition-colors resize-none"
              />
              <p className="field-error text-sm text-text-error mt-1"></p>
            </div>
          </div>
        </div>
      </div>

      {/* 경력 추가 버튼 */}
      <button
        type="button"
        className="self-end flex items-center gap-2 md:gap-4 px-3 py-3 hover:opacity-80 transition-opacity"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 6V18M6 12H18"
            stroke="currentColor"
            className="text-icon-accent"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <span className="text-base md:text-lg font-bold text-text-accent">경력 추가</span>
      </button>
    </section>
  );
}

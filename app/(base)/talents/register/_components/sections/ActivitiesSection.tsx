/**
 * 수상/활동/기타 섹션 컴포넌트
 * 필드: activities[0].title, activities[0].startDate, activities[0].endDate, activities[0].description
 * 배열 구조로 여러 개 활동 추가 가능
 */

export default function ActivitiesSection() {
  return (
    <section className="section section-activities flex flex-col gap-6">
      <h2 className="text-lg md:text-xl font-bold text-text-primary">수상 / 활동 / 기타</h2>

      <div className="activities-list flex flex-col gap-6">
        <div className="activity-item flex items-start gap-4 md:gap-8">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-bg-tertiary rounded-lg flex items-center justify-center shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L14.5 9H22L16 14L18.5 21L12 16L5.5 21L8 14L2 9H9.5L12 2Z"
                stroke="currentColor"
                className="text-icon-secondary"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="flex-1 bg-bg-primary rounded-xl shadow-md p-4 md:p-6 flex flex-col gap-4">
            {/* 활동명 */}
            <div className="field">
              <label
                htmlFor="activities-0-title"
                className="block text-sm font-medium text-text-secondary mb-2"
              >
                활동명
              </label>
              <input
                id="activities-0-title"
                name="activities[0].title"
                type="text"
                placeholder="활동명을 입력해주세요"
                className="lc-input w-full h-14 px-4 py-3 bg-bg-primary rounded-lg border border-border-quaternary text-base text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-border-accent transition-colors"
              />
              <p className="field-error text-sm text-text-error mt-1"></p>
            </div>

            {/* 활동 기간 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="field">
                <label
                  htmlFor="activities-0-start-date"
                  className="block text-sm font-medium text-text-secondary mb-2"
                >
                  활동기간 시작
                </label>
                <input
                  id="activities-0-start-date"
                  name="activities[0].startDate"
                  type="text"
                  placeholder="YYYY.MM"
                  className="lc-input w-full h-14 px-4 py-3 bg-bg-primary rounded-lg border border-border-quaternary text-base text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-border-accent transition-colors"
                />
                <p className="field-error text-sm text-text-error mt-1"></p>
              </div>

              <div className="field">
                <label
                  htmlFor="activities-0-end-date"
                  className="block text-sm font-medium text-text-secondary mb-2"
                >
                  활동기간 종료
                </label>
                <input
                  id="activities-0-end-date"
                  name="activities[0].endDate"
                  type="text"
                  placeholder="YYYY.MM"
                  className="lc-input w-full h-14 px-4 py-3 bg-bg-primary rounded-lg border border-border-quaternary text-base text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-border-accent transition-colors"
                />
                <p className="field-error text-sm text-text-error mt-1"></p>
              </div>
            </div>

            {/* 활동 내용 */}
            <div className="field">
              <label
                htmlFor="activities-0-description"
                className="block text-sm font-medium text-text-secondary mb-2"
              >
                활동 내용
              </label>
              <textarea
                id="activities-0-description"
                name="activities[0].description"
                placeholder="활동 내용을 입력해주세요"
                rows={3}
                className="lc-input w-full px-4 py-3 bg-bg-primary rounded-lg border border-border-quaternary text-base text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-border-accent transition-colors resize-none"
              />
              <p className="field-error text-sm text-text-error mt-1"></p>
            </div>
          </div>
        </div>
      </div>

      {/* 활동 추가 버튼 */}
      <button
        type="button"
        className="self-end flex items-center gap-2 md:gap-4 hover:opacity-80 transition-opacity"
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
        <span className="text-base md:text-lg font-bold text-text-accent">활동 추가</span>
      </button>
    </section>
  );
}

/**
 * 언어 섹션 컴포넌트
 * 필드: languages[0].name, languages[0].acquiredAt
 * 배열 구조로 여러 개 언어 추가 가능
 */

export default function LanguagesSection() {
  return (
    <section className="section section-languages flex flex-col gap-6">
      <h2 className="text-lg md:text-xl font-bold text-text-primary">언어</h2>

      <div className="languages-list flex flex-col gap-6">
        <div className="language-item flex items-start gap-4 md:gap-8">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-bg-tertiary rounded-lg flex items-center justify-center shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="currentColor"
                className="text-icon-secondary"
                strokeWidth="2"
              />
              <path
                d="M2 12H22M12 2C14.5 5 15.5 8 15.5 12C15.5 16 14.5 19 12 22M12 2C9.5 5 8.5 8 8.5 12C8.5 16 9.5 19 12 22"
                stroke="currentColor"
                className="text-icon-secondary"
                strokeWidth="2"
              />
            </svg>
          </div>

          <div className="flex-1 bg-bg-primary rounded-xl p-4 flex flex-col gap-4">
            <div className="field">
              <label
                htmlFor="languages-0-name"
                className="block text-sm font-medium text-text-secondary mb-2"
              >
                언어명
              </label>
              <input
                id="languages-0-name"
                name="languages[0].name"
                type="text"
                placeholder="언어를 입력해주세요"
                className="lc-input w-full h-14 px-4 py-3 bg-bg-primary rounded-lg border border-border-quaternary text-base text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-border-accent transition-colors"
              />
              <p className="field-error text-sm text-text-error mt-1"></p>
            </div>

            <div className="field">
              <label
                htmlFor="languages-0-acquired-at"
                className="block text-sm font-medium text-text-secondary mb-2"
              >
                취득/검정 일자
              </label>
              <input
                id="languages-0-acquired-at"
                name="languages[0].acquiredAt"
                type="text"
                placeholder="YYYY.MM"
                className="lc-input w-full h-14 px-4 py-3 bg-bg-primary rounded-lg border border-border-quaternary text-base text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-border-accent transition-colors"
              />
              <p className="field-error text-sm text-text-error mt-1"></p>
            </div>
          </div>
        </div>
      </div>

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
        <span className="text-base md:text-lg font-bold text-text-accent">언어 추가</span>
      </button>
    </section>
  );
}

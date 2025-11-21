/**
 * 링크 섹션 컴포넌트
 * 필드: links.general (포트폴리오, 블로그 등 자유 입력 링크)
 */

export default function LinksSection() {
  return (
    <section className="section section-links flex flex-col gap-6">
      <h2 className="text-lg md:text-xl font-bold text-text-primary">링크</h2>

      <div className="links-list flex flex-col gap-4">
        <div className="link-item flex items-start gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-bg-tertiary rounded-lg flex items-center justify-center shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M10 13L14 9M9 9H9.01M15 15H15.01M16.5 7.5L19.5 4.5M4.5 19.5L7.5 16.5"
                stroke="currentColor"
                className="text-icon-secondary"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="flex-1 bg-bg-primary border border-border-quaternary rounded-lg p-4 flex items-center gap-4">
            <div className="field flex-1">
              <label htmlFor="links-general" className="sr-only">
                일반 링크
              </label>
              <input
                id="links-general"
                name="links.general"
                type="url"
                placeholder="포트폴리오, 블로그 등 링크를 입력해주세요"
                className="lc-input w-full h-14 px-4 py-3 bg-bg-primary rounded-lg text-base text-text-primary placeholder:text-text-tertiary focus:outline-none transition-colors"
              />
              <p className="field-error text-sm text-text-error mt-1"></p>
            </div>
            <button
              type="button"
              className="bg-brand-01 p-3 rounded-lg hover:opacity-80 transition-opacity shrink-0"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 7H5C3.89543 7 3 7.89543 3 9V19C3 20.1046 3.89543 21 5 21H15C16.1046 21 17 20.1046 17 19V18M10 14L21 3M21 3L15 3M21 3V9"
                  stroke="currentColor"
                  className="text-icon-secondary"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
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
        <span className="text-base md:text-lg font-bold text-text-accent">링크 추가</span>
      </button>
    </section>
  );
}

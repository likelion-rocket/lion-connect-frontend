/**
 * 포트폴리오 섹션 컴포넌트
 * 필드: links.portfolio
 */

export default function PortfolioSection() {
  return (
    <section className="section section-portfolio flex flex-col gap-6">
      <h2 className="text-lg md:text-xl font-bold text-text-primary">
        포트폴리오<span className="text-text-error">*</span>
      </h2>

      <div className="flex items-start gap-4">
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

        <div className="flex-1">
          <div className="field">
            <label
              htmlFor="links-portfolio"
              className="block text-sm font-medium text-text-secondary mb-2"
            >
              포트폴리오 링크<span className="required text-text-error">*</span>
            </label>
            <input
              id="links-portfolio"
              name="links.portfolio"
              type="url"
              placeholder="포트폴리오 링크를 입력해주세요"
              className="lc-input w-full h-14 px-4 py-3 bg-bg-primary border border-border-quaternary rounded-lg text-base text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-border-accent transition-colors"
            />
            <p className="field-error text-sm text-text-error mt-1"></p>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * 직무 스킬 섹션 컴포넌트
 * 필드: skills.main (입력 가능한 드롭다운, 태그 형식 다중 선택)
 */

export default function SkillsSection() {
  return (
    <section className="section section-skills flex flex-col gap-6">
      <h2 className="text-lg md:text-xl font-bold text-text-primary">직무 스킬</h2>

      <div className="flex items-start gap-4">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-bg-tertiary rounded-lg flex items-center justify-center shrink-0">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M8 6L4 12L8 18M16 6L20 12L16 18"
              stroke="currentColor"
              className="text-icon-secondary"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="flex-1 flex flex-col gap-4">
          {/* 스킬 검색/입력 드롭다운 구조 */}
          <div className="field relative">
            <label
              htmlFor="skills-main"
              className="block text-sm font-medium text-text-secondary mb-2"
            >
              주요 스킬 (다중 선택)
            </label>
            <div className="relative">
              <input
                id="skills-main"
                name="skills.main"
                type="text"
                placeholder="스킬을 검색하거나 입력해주세요"
                className="lc-input w-full h-14 px-4 py-3 bg-bg-primary rounded-lg border border-border-quaternary text-base text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-border-accent transition-colors"
                autoComplete="off"
              />
              {/* 드롭다운 옵션 리스트 (구조만) */}
              <div className="skill-dropdown hidden absolute top-full left-0 right-0 mt-1 bg-bg-primary border border-border-quaternary rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                <div className="skill-option px-4 py-3 hover:bg-bg-tertiary cursor-pointer text-base text-text-primary">
                  JavaScript
                </div>
                <div className="skill-option px-4 py-3 hover:bg-bg-tertiary cursor-pointer text-base text-text-primary">
                  TypeScript
                </div>
                <div className="skill-option px-4 py-3 hover:bg-bg-tertiary cursor-pointer text-base text-text-primary">
                  React
                </div>
                <div className="skill-option px-4 py-3 hover:bg-bg-tertiary cursor-pointer text-base text-text-primary">
                  Next.js
                </div>
              </div>
            </div>
            <p className="field-error text-sm text-text-error mt-1"></p>

            {/* 선택된 스킬 태그 목록 (구조만) */}
            <div className="skill-tags flex flex-wrap gap-2 mt-3">
              {/* 예시 태그 */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-01 text-text-accent rounded-full text-sm font-medium">
                React
                <button type="button" className="hover:opacity-70">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M4 4L10 10M10 4L4 10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

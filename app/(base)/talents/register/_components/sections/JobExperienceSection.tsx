/**
 * 직무 관련 경험 선택 섹션 컴포넌트
 * 필드: job.experiences (체크박스 다중 선택)
 * 옵션: bootcamp, startup, certificate, major
 */

export default function JobExperienceSection() {
  return (
    <section className="section section-experiences flex flex-col gap-6 md:gap-8">
      <h2 className="text-lg md:text-xl font-bold text-text-primary">직무 관련 경험 선택</h2>

      <div className="flex items-start gap-4">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-bg-tertiary rounded-lg flex items-center justify-center shrink-0">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M17 3L20 6M17 3L8 12L5 13L6 10L15 1M17 3L15 1"
              stroke="currentColor"
              className="text-icon-secondary"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 20H20"
              stroke="currentColor"
              className="text-icon-secondary"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <fieldset className="flex-1">
          <legend className="sr-only">직무 관련 경험</legend>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {/* 부트캠프 경험자 */}
            <label className="field flex items-center gap-3 cursor-pointer">
              <input
                id="experience-bootcamp"
                name="job.experiences"
                type="checkbox"
                value="bootcamp"
                className="w-5 h-5 rounded border-2 border-border-secondary accent-bg-accent"
              />
              <span className="text-sm md:text-base text-text-primary">부트캠프 경험자</span>
            </label>

            {/* 창업 경험자 */}
            <label className="field flex items-center gap-3 cursor-pointer">
              <input
                id="experience-startup"
                name="job.experiences"
                type="checkbox"
                value="startup"
                className="w-5 h-5 rounded border-2 border-border-secondary accent-bg-accent"
              />
              <span className="text-sm md:text-base text-text-primary">창업 경험자</span>
            </label>

            {/* 자격증 보유자 */}
            <label className="field flex items-center gap-3 cursor-pointer">
              <input
                id="experience-certificate"
                name="job.experiences"
                type="checkbox"
                value="certificate"
                className="w-5 h-5 rounded border-2 border-border-secondary accent-bg-accent"
              />
              <span className="text-sm md:text-base text-text-primary">자격증 보유자</span>
            </label>

            {/* 전공자 */}
            <label className="field flex items-center gap-3 cursor-pointer">
              <input
                id="experience-major"
                name="job.experiences"
                type="checkbox"
                value="major"
                className="w-5 h-5 rounded border-2 border-border-secondary accent-bg-accent"
              />
              <span className="text-sm md:text-base text-text-primary">전공자</span>
            </label>
          </div>
        </fieldset>
      </div>
    </section>
  );
}

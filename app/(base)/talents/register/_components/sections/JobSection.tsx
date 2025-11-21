/**
 * 직군 및 직무 선택 섹션 컴포넌트
 * 필드: job.category, job.role
 */

export default function JobSection() {
  return (
    <section className="section section-job flex flex-col gap-6 md:gap-8">
      <h2 className="text-lg md:text-xl font-bold text-text-primary">
        직군 및 직무 선택<span className="text-text-error">*</span>
      </h2>

      <div className="flex items-start gap-4">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-bg-tertiary rounded-lg flex items-center justify-center shrink-0">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect
              x="5"
              y="4"
              width="14"
              height="16"
              rx="2"
              stroke="currentColor"
              className="text-icon-secondary"
              strokeWidth="2"
            />
            <path
              d="M9 2V6M15 2V6M5 9H19"
              stroke="currentColor"
              className="text-icon-secondary"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 직군 선택 */}
          <div className="field">
            <label
              htmlFor="job-category"
              className="block text-sm font-medium text-text-secondary mb-2"
            >
              직군<span className="required text-text-error">*</span>
            </label>
            <select
              id="job-category"
              name="job.category"
              className="w-full h-14 px-4 bg-bg-tertiary rounded-lg border border-transparent text-base text-text-primary focus:outline-none focus:border-border-accent transition-colors"
            >
              <option value="">직군 선택</option>
              <option value="develop">개발</option>
              <option value="design">디자인</option>
              <option value="data">데이터 분석</option>
              <option value="marketing">마케팅</option>
              <option value="pm">PM</option>
            </select>
            <p className="field-error text-sm text-text-error mt-1"></p>
          </div>

          {/* 직무 선택 */}
          <div className="field">
            <label
              htmlFor="job-role"
              className="block text-sm font-medium text-text-secondary mb-2"
            >
              직무<span className="required text-text-error">*</span>
            </label>
            <select
              id="job-role"
              name="job.role"
              className="w-full h-14 px-4 bg-bg-tertiary rounded-lg border border-transparent text-base text-text-tertiary focus:outline-none focus:border-border-accent transition-colors"
            >
              <option value="">직무 선택</option>
              <option value="frontend">프론트엔드</option>
              <option value="backend">백엔드</option>
              <option value="ios">iOS</option>
              <option value="android">Android</option>
              <option value="unity">Unity</option>
              <option value="ai">AI</option>
            </select>
            <p className="field-error text-sm text-text-error mt-1"></p>
          </div>
        </div>
      </div>
    </section>
  );
}

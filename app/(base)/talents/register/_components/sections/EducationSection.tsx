/**
 * 학력 섹션 컴포넌트
 * 필드: education.school, education.startDate, education.endDate
 */

import AddButton from "../AddButton";

export default function EducationSection() {
  return (
    <section className="section section-education flex flex-col gap-6 md:gap-8">
      <h2 className="text-lg md:text-xl font-bold text-text-primary">
        학력<span className="text-text-error">*</span>
      </h2>

      {/* 학력 항목 (반복 가능 구조) */}
      <div className="education-list flex flex-col gap-6">
        <div className="education-item flex items-start gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-bg-tertiary rounded-lg flex items-center justify-center shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 10L12 4L20 10V17C20 18.1046 19.1046 19 18 19H6C4.89543 19 4 18.1046 4 17V10Z"
                stroke="currentColor"
                className="text-icon-secondary"
                strokeWidth="2"
              />
              <path
                d="M9 19V14H15V19"
                stroke="currentColor"
                className="text-icon-secondary"
                strokeWidth="2"
              />
            </svg>
          </div>

          <div className="flex-1 bg-bg-primary rounded-xl shadow-md p-4 md:p-6 flex flex-col gap-4">
            {/* 학교명 */}
            <div className="field">
              <label
                htmlFor="education-school"
                className="block text-sm font-medium text-text-secondary mb-2"
              >
                학교명<span className="required text-text-error">*</span>
              </label>
              <input
                id="education-school"
                name="education.school"
                type="text"
                placeholder="학교명을 입력해주세요"
                className="lc-input w-full h-14 px-4 py-3 bg-bg-primary rounded-lg border border-border-quaternary text-base text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-border-accent transition-colors"
              />
              <p className="field-error text-sm text-text-error mt-1"></p>
            </div>

            {/* 재학 기간 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="field">
                <label
                  htmlFor="education-start-date"
                  className="block text-sm font-medium text-text-secondary mb-2"
                >
                  재학 시작일
                </label>
                <input
                  id="education-start-date"
                  name="education.startDate"
                  type="text"
                  placeholder="YYYY.MM"
                  className="lc-input w-full h-14 px-4 py-3 bg-bg-primary rounded-lg border border-border-quaternary text-base text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-border-accent transition-colors"
                />
                <p className="field-error text-sm text-text-error mt-1"></p>
              </div>

              <div className="field">
                <label
                  htmlFor="education-end-date"
                  className="block text-sm font-medium text-text-secondary mb-2"
                >
                  재학 종료일
                </label>
                <input
                  id="education-end-date"
                  name="education.endDate"
                  type="text"
                  placeholder="YYYY.MM"
                  className="lc-input w-full h-14 px-4 py-3 bg-bg-primary rounded-lg border border-border-quaternary text-base text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-border-accent transition-colors"
                />
                <p className="field-error text-sm text-text-error mt-1"></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 학력 추가 버튼 */}
      <AddButton label="학력 추가" className="self-end" />
    </section>
  );
}

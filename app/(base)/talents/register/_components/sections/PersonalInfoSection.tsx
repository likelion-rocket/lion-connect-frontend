/**
 * 인적사항 섹션 컴포넌트
 * 필드: profile.name, profile.phone, profile.email
 */

export default function PersonalInfoSection() {
  return (
    <section className="section section-personal-info flex flex-col gap-6 md:gap-8">
      <h2 className="text-lg md:text-xl font-bold text-text-primary">
        인적 사항<span className="text-text-error">*</span>
      </h2>

      <div className="flex items-start gap-4">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-bg-tertiary rounded-lg flex items-center justify-center shrink-0">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle
              cx="12"
              cy="8"
              r="4"
              stroke="currentColor"
              className="text-icon-secondary"
              strokeWidth="2"
            />
            <path
              d="M4 20C4 16.134 7.134 13 11 13H13C16.866 13 20 16.134 20 20"
              stroke="currentColor"
              className="text-icon-secondary"
              strokeWidth="2"
            />
          </svg>
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* 이름 */}
          <div className="field">
            <label
              htmlFor="profile-name"
              className="block text-sm font-medium text-text-secondary mb-2"
            >
              이름<span className="required text-text-error">*</span>
            </label>
            <input
              id="profile-name"
              name="profile.name"
              type="text"
              placeholder="이름을 입력해주세요"
              className="lc-input w-full h-14 md:h-16 px-4 py-3 bg-bg-primary rounded-lg border border-border-quaternary text-base text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-border-accent transition-colors"
            />
            <p className="field-error text-sm text-text-error mt-1"></p>
          </div>

          {/* 전화번호 */}
          <div className="field">
            <label
              htmlFor="profile-phone"
              className="block text-sm font-medium text-text-secondary mb-2"
            >
              전화번호<span className="required text-text-error">*</span>
            </label>
            <input
              id="profile-phone"
              name="profile.phone"
              type="tel"
              placeholder="010-0000-0000"
              className="lc-input w-full h-14 md:h-16 px-4 py-3 bg-bg-primary rounded-lg border border-border-quaternary text-base text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-border-accent transition-colors"
            />
            <p className="field-error text-sm text-text-error mt-1"></p>
          </div>

          {/* 이메일 */}
          <div className="field">
            <label
              htmlFor="profile-email"
              className="block text-sm font-medium text-text-secondary mb-2"
            >
              이메일<span className="required text-text-error">*</span>
            </label>
            <input
              id="profile-email"
              name="profile.email"
              type="email"
              placeholder="email@example.com"
              className="lc-input w-full h-14 md:h-16 px-4 py-3 bg-bg-primary rounded-lg border border-border-quaternary text-base text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-border-accent transition-colors"
            />
            <p className="field-error text-sm text-text-error mt-1"></p>
          </div>
        </div>
      </div>
    </section>
  );
}

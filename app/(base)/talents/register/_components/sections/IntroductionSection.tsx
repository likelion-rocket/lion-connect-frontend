/**
 * 간단 소개 섹션 컴포넌트
 * 필드: profile.introduction
 */

export default function IntroductionSection() {
  return (
    <section className="section section-introduction flex flex-col gap-4 md:gap-6">
      <h2 className="text-lg md:text-xl font-bold text-text-primary">
        간단 소개<span className="text-text-error">*</span>
      </h2>

      <div className="field">
        <label htmlFor="profile-introduction" className="sr-only">
          자기소개
        </label>
        <textarea
          id="profile-introduction"
          name="profile.introduction"
          placeholder="자기소개를 입력해주세요 (최대 500자)"
          rows={4}
          className="lc-input w-full px-4 py-3 bg-bg-primary rounded-lg border border-border-quaternary text-base text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-border-accent transition-colors resize-none"
        />
        <p className="field-error text-sm text-text-error mt-1"></p>
      </div>
    </section>
  );
}

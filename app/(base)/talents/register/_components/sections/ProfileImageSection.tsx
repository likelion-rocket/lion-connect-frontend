/**
 * 프로필 사진 섹션 컴포넌트
 * 필드: profile.avatar (파일 업로드)
 */

export default function ProfileImageSection() {
  return (
    <section className="section section-profile-image flex flex-col gap-6 md:gap-8">
      <h2 className="text-lg md:text-xl font-bold text-text-primary">프로필 사진</h2>

      <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
        {/* 프로필 이미지 미리보기 */}
        <div className="w-32 h-40 md:w-40 md:h-[199px] bg-bg-tertiary rounded-lg overflow-hidden flex items-center justify-center shrink-0">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <circle
              cx="32"
              cy="24"
              r="8"
              stroke="currentColor"
              className="text-icon-tertiary"
              strokeWidth="2"
            />
            <path
              d="M16 48C16 40.268 22.268 34 30 34H34C41.732 34 48 40.268 48 48"
              stroke="currentColor"
              className="text-icon-tertiary"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* 파일 업로드 필드 */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="field">
            <label htmlFor="profile-avatar" className="sr-only">
              프로필 사진 업로드
            </label>
            <input
              id="profile-avatar"
              name="profile.avatar"
              type="file"
              accept="image/jpeg,image/png"
              className="hidden"
            />
            <div className="flex items-center gap-4">
              <div className="flex-1 h-14 md:h-16 px-4 py-3 bg-bg-primary border border-border-quaternary rounded-lg flex items-center">
                <p className="text-sm md:text-base text-text-tertiary">
                  jpg 나 png 사진을 첨부해주세요.
                </p>
              </div>
              <button
                type="button"
                className="flex items-center gap-2 md:gap-4 px-3 py-3 hover:opacity-80 transition-opacity"
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
                <span className="text-base md:text-lg font-bold text-text-accent whitespace-nowrap">
                  사진 업로드
                </span>
              </button>
            </div>
            <p className="field-error text-sm text-text-error mt-1"></p>
          </div>
        </div>
      </div>
    </section>
  );
}

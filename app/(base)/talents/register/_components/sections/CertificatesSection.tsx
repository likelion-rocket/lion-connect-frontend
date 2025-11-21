/**
 * 자격증 섹션 컴포넌트
 * 필드: certificates[0].name, certificates[0].acquiredAt
 * 배열 구조로 여러 개 자격증 추가 가능
 */

import AddButton from "../AddButton";

export default function CertificatesSection() {
  return (
    <section className="section section-certificates flex flex-col gap-6">
      <h2 className="text-lg md:text-xl font-bold text-text-primary">자격증</h2>

      <div className="certificates-list flex flex-col gap-6">
        <div className="certificate-item flex items-start gap-4 md:gap-8">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-bg-tertiary rounded-lg flex items-center justify-center shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect
                x="3"
                y="5"
                width="18"
                height="14"
                rx="2"
                stroke="currentColor"
                className="text-icon-secondary"
                strokeWidth="2"
              />
              <path
                d="M3 10H21"
                stroke="currentColor"
                className="text-icon-secondary"
                strokeWidth="2"
              />
            </svg>
          </div>

          <div className="flex-1 bg-bg-primary rounded-xl p-4 flex flex-col gap-4">
            <div className="field">
              <label
                htmlFor="certificates-0-name"
                className="block text-sm font-medium text-text-secondary mb-2"
              >
                자격증명
              </label>
              <input
                id="certificates-0-name"
                name="certificates[0].name"
                type="text"
                placeholder="자격증을 입력해주세요"
                className="lc-input w-full h-14 px-4 py-3 bg-bg-primary rounded-lg border border-border-quaternary text-base text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-border-accent transition-colors"
              />
              <p className="field-error text-sm text-text-error mt-1"></p>
            </div>

            <div className="field">
              <label
                htmlFor="certificates-0-acquired-at"
                className="block text-sm font-medium text-text-secondary mb-2"
              >
                취득일자
              </label>
              <input
                id="certificates-0-acquired-at"
                name="certificates[0].acquiredAt"
                type="text"
                placeholder="YYYY.MM"
                className="lc-input w-full h-14 px-4 py-3 bg-bg-primary rounded-lg border border-border-quaternary text-base text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-border-accent transition-colors"
              />
              <p className="field-error text-sm text-text-error mt-1"></p>
            </div>
          </div>
        </div>
      </div>

      <AddButton label="자격증 추가" className="self-end" />
    </section>
  );
}

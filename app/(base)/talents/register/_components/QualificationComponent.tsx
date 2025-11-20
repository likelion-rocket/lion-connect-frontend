// app/(base)/talents/register/_components/QualificationComponent.tsx
"use client";

import PremierSection from "./section/PremierSection";
import LanguageSection from "./section/LanguageSection";
import CertificateSection from "./section/CertificateSection";

import type { LangForm, LangError } from "@/hooks/talent/register/sections/useLanguageSection";
import type { CertForm, CertError } from "@/hooks/talent/register/sections/useCertificationSection";
import type { AwardForm, AwardError } from "@/hooks/talent/register/sections/useAwardSection";

type Props = {
  // ✅ 수상
  awards: AwardForm[];
  awardErrors?: AwardError[];
  hasAnyAwardValue: (item: AwardForm) => boolean;
  onAwardChange: (
    index: number,
    field: keyof AwardForm
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAwardAdd: () => void;
  onAwardClear: (index: number) => void;
  onAwardDelete: (index: number) => void;

  // 언어
  langs: LangForm[];
  langErrors?: LangError[];
  hasAnyValue: (item: LangForm) => boolean;
  onLangChange: (
    index: number,
    field: keyof LangForm
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLangAdd: () => void;
  onLangClear: (index: number) => void;
  onLangDelete: (index: number) => void;

  // 자격증
  certs: CertForm[];
  certErrors?: CertError[];
  hasAnyCertValue: (item: CertForm) => boolean;
  onCertChange: (
    index: number,
    field: keyof CertForm
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCertAdd: () => void;
  onCertClear: (index: number) => void;
  onCertDelete: (index: number) => void;
};

export default function QualificationComponent({
  // 수상
  awards,
  awardErrors = [],
  hasAnyAwardValue,
  onAwardChange,
  onAwardAdd,
  onAwardClear,
  onAwardDelete,

  // 언어
  langs,
  langErrors = [],
  hasAnyValue,
  onLangChange,
  onLangAdd,
  onLangClear,
  onLangDelete,

  // 자격증
  certs,
  certErrors = [],
  hasAnyCertValue,
  onCertChange,
  onCertAdd,
  onCertClear,
  onCertDelete,
}: Props) {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-[18px] font-bold text-text-primary mb-4 flex items-center gap-1">
        <span>수상 / 활동 / 기타</span>
      </div>

      {/* ✅ 수상 섹션 (PremierSection) */}
      <PremierSection
        awards={awards}
        errors={awardErrors}
        hasAnyValue={hasAnyAwardValue}
        onChange={onAwardChange}
        onAdd={onAwardAdd}
        onClear={onAwardClear}
        onDelete={onAwardDelete}
      />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <LanguageSection
          langs={langs}
          errors={langErrors}
          hasAnyValue={hasAnyValue}
          onChange={onLangChange}
          onAdd={onLangAdd}
          onClear={onLangClear}
          onDelete={onLangDelete}
        />
        <CertificateSection
          certs={certs}
          errors={certErrors}
          hasAnyValue={hasAnyCertValue}
          onChange={onCertChange}
          onAdd={onCertAdd}
          onClear={onCertClear}
          onDelete={onCertDelete}
        />
      </div>
    </section>
  );
}

"use client";

import PremierSection from "./section/PremierSection";
import LanguageSection from "./section/LanguageSection";
import CertificateSection from "./section/CertificateSection";
import type { LangForm, LangError } from "@/hooks/useLanguageSection";

type Props = {
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
};

export default function QualificationComponent({
  langs,
  langErrors = [],
  hasAnyValue,
  onLangChange,
  onLangAdd,
  onLangClear,
  onLangDelete,
}: Props) {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-[18px] font-bold text-text-primary mb-4 flex items-center gap-1">
        <span>수상 / 활동 / 기타</span>
      </div>

      <PremierSection />

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
        <CertificateSection />
      </div>
    </section>
  );
}

"use client";

import { cn } from "@/utils/utils";

interface TalentRegisterNavProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  onBack?: () => void;
  onTempSave?: () => void;
  onSubmit?: () => void;
  formId?: string;
}

export default function TalentRegisterNav({
  title = "인재 등록",
  onBack,
  onTempSave,
  onSubmit,
  formId,
  className,
  ...props
}: TalentRegisterNavProps) {
  const handleGoBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  return (
    <nav
      className={cn(
        "max-w-[1440px] mx-auto px-4 md:px-8 h-14 flex items-center justify-between mt-8",
        className
      )}
      {...props}
    >
      {/* 왼쪽: 뒤로가기 버튼 */}
      <button
        type="button"
        onClick={handleGoBack}
        className="flex items-center gap-2 md:gap-4 hover:opacity-80 transition-opacity"
      >
        <span className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M14 7L9 12L14 17"
              stroke="currentColor"
              className="text-icon-secondary"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="text-base md:text-lg font-bold text-text-primary">이전 페이지</span>
      </button>

      {/* 중앙: 페이지 제목 */}
      <h1 className="absolute left-1/2 -translate-x-1/2 text-lg md:text-xl font-bold text-text-primary">
        {title}
      </h1>

      {/* 오른쪽: 임시 저장 + 작성 완료 버튼 */}
      <div className="flex items-center gap-2 md:gap-3">
        {onTempSave && (
          <button
            type="button"
            onClick={onTempSave}
            className="px-4 py-2.5 md:py-3 border border-border-secondary bg-bg-primary rounded-lg text-base md:text-lg font-bold text-text-primary hover:bg-bg-secondary transition-colors"
          >
            임시 저장
          </button>
        )}
        <button
          type={formId ? "submit" : "button"}
          form={formId}
          onClick={!formId ? onSubmit : undefined}
          className="px-4 py-2.5 md:py-3 bg-bg-accent text-text-inverse-primary rounded-lg text-base md:text-lg font-bold hover:bg-brand-06 transition-colors"
        >
          작성 완료
        </button>
      </div>
    </nav>
  );
}

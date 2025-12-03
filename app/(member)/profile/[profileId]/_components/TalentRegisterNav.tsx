"use client";

import { cn } from "@/utils/utils";
import { useToastStore } from "@/store/toastStore";
import { useRouter } from "next/navigation";
import { useFormContext, useWatch } from "react-hook-form";

interface TalentRegisterNavProps extends React.HTMLAttributes<HTMLElement> {
  onTempSave?: () => void;
  onSubmit?: () => void;
  formId?: string;
  isSubmitDisabled?: boolean;
}

export default function TalentRegisterNav({
  onTempSave,
  onSubmit,
  formId,
  isSubmitDisabled = false,
  className,
  ...props
}: TalentRegisterNavProps) {
  const { showToast } = useToastStore();
  const router = useRouter();
  const { register, control } = useFormContext();

  // Watch the title value from the form using useWatch
  const titleValue = useWatch({ control, name: "profile.title" }) || "인재 등록";

  const handleGoBack = () => {
    router.push("/profile");
  };

  const handleTempSave = async () => {
    if (onTempSave) {
      await onTempSave();
      showToast("임시 저장되었습니다!");
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
        className="flex cursor-pointer items-center gap-2 md:gap-4 hover:opacity-80 transition-opacity"
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

      {/* 중앙: 편집 가능한 페이지 제목 */}
      <input
        type="text"
        {...register("profile.title")}
        placeholder="이력서 제목"
        className={cn(
          "absolute left-1/2 -translate-x-1/2 text-lg md:text-xl font-bold text-text-primary",
          "text-center bg-transparent border-2 border-transparent rounded px-3 py-1",
          "hover:border-accent focus:border-accent focus:outline-none",
          "transition-colors duration-200",
          "min-w-[200px] max-w-[400px]"
        )}
      />

      {/* 오른쪽: 임시 저장 + 작성 완료 버튼 */}
      <div className="flex items-center gap-2 md:gap-3">
        {onTempSave && (
          <button
            type="button"
            onClick={handleTempSave}
            className="px-4 py-2.5 md:py-3 border border-border-accent bg-bg-primary rounded-lg text-base md:text-lg font-bold text-text-accent hover:bg-bg-secondary transition-colors hover:cursor-pointer"
          >
            임시 저장
          </button>
        )}
        <button
          type={formId ? "submit" : "button"}
          form={formId}
          onClick={!formId ? onSubmit : undefined}
          disabled={isSubmitDisabled}
          className={cn(
            "px-4 py-2.5 md:py-3 rounded-lg text-base md:text-lg font-bold transition-colors",
            isSubmitDisabled
              ? "bg-bg-tertiary text-text-quaternary outline-1 outline-border-quaternary -outline-offset-1 cursor-not-allowed"
              : "bg-bg-accent text-text-inverse-primary hover:bg-brand-06 cursor-pointer"
          )}
        >
          작성 완료
        </button>
      </div>
    </nav>
  );
}

/**
 * 추가 버튼 공통 컴포넌트
 * 인재 등록 폼의 각 섹션에서 항목 추가에 사용
 */

import { cn } from "@/utils/utils";

interface AddButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export default function AddButton({ label, className, ...props }: AddButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex items-center gap-2 md:gap-4 px-3 py-3 cursor-pointer hover:opacity-80 transition-opacity",
        className
      )}
      {...props}
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
        {label}
      </span>
    </button>
  );
}

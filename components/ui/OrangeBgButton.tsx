import { cn } from "@/utils/utils";

interface OrangeBgButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 버튼 활성화 상태
   * - true: 주황색 배경 + hover 효과
   * - false: 회색 배경 + cursor-not-allowed
   */
  isActive?: boolean;
}

/**
 * Orange Background Button Component
 *
 * @description
 * 폼 검증 완료 여부에 따라 활성화/비활성화 상태를 시각적으로 표현하는 버튼입니다.
 * disabled 속성 대신 isActive prop으로 스타일을 제어하며,
 * 모든 button HTML attributes를 지원합니다.
 *
 * @example
 * // 기본 사용 (비활성화 상태)
 * <OrangeBgButton>로그인</OrangeBgButton>
 *
 * // 활성화 상태
 * <OrangeBgButton isActive>로그인</OrangeBgButton>
 *
 * // 폼 검증과 연동
 * <OrangeBgButton
 *   isActive={isValid && !isLoading}
 *   type="submit"
 * >
 *   {isLoading ? "처리 중..." : "제출"}
 * </OrangeBgButton>
 *
 * // 커스텀 스타일 추가
 * <OrangeBgButton isActive className="w-full">
 *   확인
 * </OrangeBgButton>
 */
export default function OrangeBgButton({
  isActive = false,
  className,
  children,
  ...props
}: OrangeBgButtonProps) {
  return (
    <button
      data-state={isActive ? "active" : "deactivate"}
      className={cn(
        // 기본 스타일
        "py-4 rounded-lg inline-flex justify-between items-center transition-colors",
        "text-center text-lg font-bold font-['Pretendard'] leading-7",
        // 활성화 상태
        isActive && "bg-bg-accent text-white hover:bg-brand-04 cursor-pointer",
        // 비활성화 상태
        !isActive && "bg-neutral-100 text-neutral-400 cursor-not-allowed",
        className
      )}
      {...props}
    >
      <div className="text-center justify-center flex-1">{children}</div>
    </button>
  );
}

import { cn } from "@/utils/utils";

interface OrangeBgButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 버튼 활성화 상태
   * - true: 주황색 배경 + hover 효과
   * - false: 회색 배경 + cursor-not-allowed
   */
  isActive?: boolean;
  /**
   * 버튼 크기
   * - "large": 큰 버튼 (py-4, text-lg) - 기본값
   * - "small": 작은 버튼 (w-28 px-6 py-2, text-xs)
   */
  size?: "large" | "small";
  /**
   * data-type attribute
   */
  dataType?: string;
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
  size = "large",
  dataType,
  className,
  children,
  ...props
}: OrangeBgButtonProps) {
  const isLarge = size === "large";
  const isSmall = size === "small";

  return (
    <button
      data-state={isActive ? "active" : "deactivate"}
      data-type={dataType}
      className={cn(
        // 기본 스타일
        "rounded-lg inline-flex justify-center items-center transition-colors",
        // 크기별 스타일
        isLarge && "py-4 text-lg font-bold font-ko-body leading-7",
        isSmall && "w-28 px-6 py-2 text-xs font-bold font-ko-body leading-4",
        // 활성화 상태
        isActive && "bg-bg-accent text-white active:bg-brand-06 cursor-pointer",
        // 비활성화 상태
        !isActive && "bg-neutral-100 text-neutral-400 cursor-not-allowed",
        // small size에만 outline 추가
        isSmall &&
          isActive &&
          "outline outline-[0.80px] outline-offset-[-0.80px] outline-neutral-300",
        isSmall && !isActive && "outline outline-1 outline-offset-[-1px] outline-neutral-300",
        className
      )}
      {...props}
    >
      {isLarge ? (
        <div className="text-center justify-center flex-1">{children}</div>
      ) : (
        <span className="justify-start">{children}</span>
      )}
    </button>
  );
}

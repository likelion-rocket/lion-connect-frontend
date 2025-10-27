import { forwardRef, InputHTMLAttributes } from "react";

/**
 * Input 컴포넌트
 * 재사용 가능한 입력 필드 컴포넌트
 *
 * @example
 * // 기본 사용
 * <Input type="email" placeholder="Example@email.com" />
 *
 * // react-hook-form과 함께 사용
 * <Input {...register("email")} type="email" placeholder="Example@email.com" />
 *
 * // 에러 상태
 * <Input type="email" error />
 */

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * 에러 상태 여부
   */
  error?: boolean;
  /**
   * Input 래퍼에 적용할 추가 클래스
   */
  wrapperClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, wrapperClassName, error, type = "text", ...props }, ref) => {
    return (
      <div className={wrapperClassName}>
        <input
          ref={ref}
          type={type}
          className={`
            w-full px-4 py-3 rounded-[12px]
            border border-[#E5E5E5]
            ${error ? "border-border-error" : ""}
            placeholder-text-tertiary
            text-text-primary
            bg-[#F7FBFF]
            focus:outline-none
            focus:border-blue-base
            hover:border-blue-base
            transition-colors
            disabled:opacity-50
            disabled:cursor-not-allowed
            ${className || ""}
          `}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;

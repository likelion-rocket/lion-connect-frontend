import { InputHTMLAttributes, Ref } from "react";

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

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
  wrapperClassName?: string;
  ref?: Ref<HTMLInputElement>;
};

function Input({ className, wrapperClassName, error, type = "text", ref, ...props }: InputProps) {
  return (
    <div className={wrapperClassName}>
      <input
        ref={ref}
        type={type}
        className={`
          lc-input
          w-full px-4 py-3 rounded-[12px]
          border border-[#E5E5E5]
          ${error ? "border-border-error!" : ""}
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

export default Input;

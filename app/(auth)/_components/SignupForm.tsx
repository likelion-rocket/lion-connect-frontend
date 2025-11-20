"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupSchemaType } from "@/schemas/auth/signupSchema";
import { useSignup } from "@/hooks/useSignup";
import Input from "@/app/(auth)/_components/Input";
import PasswordInput from "@/app/(auth)/_components/PasswordInput";

/**
 * 회원가입 폼 컴포넌트
 * UI 레이어 - 폼 렌더링과 사용자 입력만 담당
 * 비즈니스 로직은 useSignup 훅에서 처리 (TanStack Query)
 */
export default function SignupForm() {
  const { signup, isLoading, error } = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupSchemaType>({
    resolver: zodResolver(signupSchema),
    mode: "onChange", // 실시간 유효성 검사
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      agreeTerms: false,
    },
  });

  const onSubmit = (data: SignupSchemaType) => {
    signup(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 w-full">
      {/* 이메일 입력 */}
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-xs font-medium text-text-primary">
            E mail
          </label>
          <Input
            id="email"
            type="email"
            placeholder="이메일을 입력해주세요."
            error={!!errors.email}
            {...register("email")}
          />
        </div>
        {errors.email && <p className="text-xs text-text-secondary">*{errors.email.message}</p>}
        {!errors.email && (
          <p className="text-sm text-brand-05">*기업에게 스카우트 받을 이메일을 입력하세요</p>
        )}
      </div>

      {/* 비밀번호 입력 */}
      <PasswordInput
        id="password"
        label="비밀번호"
        placeholder="비밀번호를 입력해주세요."
        error={errors.password}
        register={register("password")}
      />

      {/* 비밀번호 확인 입력 */}
      <PasswordInput
        id="confirmPassword"
        label="비밀번호 확인"
        placeholder="비밀번호를 한 번 더 입력해주세요."
        error={errors.confirmPassword}
        register={register("confirmPassword")}
      />

      {/* 전화번호 입력 */}
      <div className="space-y-2">
        <label htmlFor="phone" className="block text-xs font-medium text-text-primary">
          전화번호
        </label>
        <Input
          id="phone"
          type="tel"
          placeholder="01012345678"
          error={!!errors.phone}
          {...register("phone")}
        />
        {errors.phone && <p className="text-sm text-text-error">{errors.phone.message}</p>}
        {!errors.phone && (
          <p className="text-sm text-brand-05">*기업에게 스카우트 받을 전화번호를 입력하세요</p>
        )}
      </div>

      {/* 이용약관 동의 체크박스 */}
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 rounded-sm border-2 border-border-tertiary accent-text-primary"
            {...register("agreeTerms")}
          />
          <span className="text-sm text-text-primary">회원가입에 동의합니다.</span>
        </label>
      </div>
      {errors.agreeTerms && <p className="text-sm text-text-error">{errors.agreeTerms.message}</p>}

      {/* 에러 메시지 */}
      {error && (
        <div className="p-3 rounded-lg bg-bg-secondary border border-border-error">
          <p className="text-sm text-text-error">{error}</p>
        </div>
      )}

      {/* 회원가입 버튼 */}
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-4 rounded-xl text-text-inverse-primary font-bold text-lg disabled:cursor-not-allowed transition-colors ${
          isValid
            ? "bg-bg-accent hover:bg-brand-06 disabled:bg-bg-accent"
            : "bg-text-tertiary hover:bg-text-secondary disabled:bg-text-tertiary"
        }`}
      >
        {isLoading ? "회원가입 중..." : "회원가입"}
      </button>
    </form>
  );
}

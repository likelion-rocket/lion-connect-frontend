"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginSchema, LoginSchemaType } from "@/lib/validations/loginSchema";
import { useLogin } from "@/hooks/useLogin";
import Image from "next/image";
import Input from "@/app/(auth)/_components/Input";

/**
 * 로그인 폼 컴포넌트
 * UI 레이어 - 폼 렌더링과 사용자 입력만 담당
 * 비즈니스 로직은 useLogin 훅(TanStack Query)에서 처리
 */
export default function LoginForm() {
  const router = useRouter();
  const { login, isLoading, error, isSuccess } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    mode: "onChange", // 실시간 유효성 검사
  });

  // 로그인 성공 시 리다이렉트
  useEffect(() => {
    if (isSuccess) {
      reset();
      router.push("/");
    }
  }, [isSuccess, reset, router]);

  const onSubmit = (data: LoginSchemaType) => {
    // TanStack Query mutation 실행
    login(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
      {/* 이메일 입력 */}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-text-primary">
          Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="이메일을 입력해주세요."
          error={!!errors.email}
          {...register("email")}
        />
        {errors.email && <p className="text-sm text-text-error">{errors.email.message}</p>}
      </div>

      {/* 비밀번호 입력 */}
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium text-text-primary">
          Password
        </label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="비밀번호를 입력해주세요."
            error={!!errors.password}
            className="pr-12"
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-icon-secondary hover:text-icon-primary transition-colors group"
            aria-label="Toggle password visibility"
          >
            <div className="absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 px-2 py-1 bg-[#162D3A] text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-[#162D3A]">
              {showPassword ? "비밀번호 숨기기" : "비밀번호 표시"}
            </div>
            {showPassword ? (
              <Image
                src="/icons/solid-eye-off.svg"
                alt="비밀번호 표시 해제"
                width={20}
                height={20}
                className="w-5 h-5"
              />
            ) : (
              <Image
                src="/icons/solid-eye.svg"
                alt="비밀번호 표시"
                width={20}
                height={20}
                className="w-5 h-5"
              />
            )}
          </button>
        </div>
        {errors.password && <p className="text-sm text-text-error">{errors.password.message}</p>}
      </div>

      {/* 로그인 유지 체크박스 */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-border-quaternary"
            {...register("rememberMe")}
          />
          <span className="text-sm text-text-primary">로그인 상태 유지</span>
        </label>
        <Link
          href="/auth/forgot-password"
          className="text-sm text-blue-base hover:underline transition-colors"
        >
          아이디/비밀번호 찾기
        </Link>
      </div>

      {/* 에러 메시지 */}
      {error && (
        <div className="p-3 rounded-lg bg-bg-secondary border border-border-error">
          <p className="text-sm text-text-error">{error}</p>
        </div>
      )}

      {/* 로그인 버튼 */}
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-3 rounded-[12px] text-text-inverse-primary font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${
          isValid ? "bg-bg-accent hover:bg-brand-06" : "bg-icon-tertiary hover:bg-icon-secondary"
        }`}
      >
        {isLoading ? "로그인 중..." : "로그인"}
      </button>

      {/* 회원가입 링크 */}
      <div className="text-center text-sm text-text-secondary">
        회원이 아니신가요?{" "}
        <Link href="/signup" className="text-blue-base hover:underline transition-colors">
          회원가입 가입하기
        </Link>
      </div>
    </form>
  );
}

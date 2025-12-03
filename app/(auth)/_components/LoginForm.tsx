"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginSchema, LoginSchemaType } from "@/schemas/auth/loginSchema";
import { useLogin } from "@/hooks/auth/useLogin";
import { setAuthCookies } from "@/actions/auth";
import Image from "next/image";
import Input from "@/app/(auth)/_components/Input";
import OrangeBgButton from "@/components/ui/OrangeBgButton";

/**
 * 로그인 폼 컴포넌트
 * UI 레이어 - 폼 렌더링과 사용자 입력만 담당
 * 비즈니스 로직은 useLogin 훅(TanStack Query)에서 처리
 */
export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  // useLogin 훅에 onSuccess 콜백 전달
  const { login, isLoading, error } = useLogin({
    onSuccess: async (data) => {
      try {
        // 1. Server Action으로 쿠키 설정 (서버에서 HttpOnly, Secure 플래그와 함께 설정)
        await setAuthCookies(data.user.roles);

        // 3. 서버 컴포넌트 캐시 갱신 (새 쿠키 값 인식)
        router.refresh();

        // 4. 쿠키 설정 완료 후 리다이렉트 (타이밍 이슈 해결)
        router.push("/");
      } catch (e) {
        console.error("로그인 후처리 실패:", e);
        // 쿠키 설정 실패 시에도 일단 홈으로 이동 (백엔드 JWT가 더 중요)
        router.push("/");
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    mode: "onChange", // 실시간 유효성 검사
  });

  // 버튼 활성화 상태 (폼 검증 완료 && 로딩 중이 아님)
  const isButtonActive = isValid && !isLoading;

  const onSubmit = (data: LoginSchemaType) => {
    // TanStack Query mutation 실행
    login(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="self-stretch flex flex-col justify-start items-start gap-16 w-full"
    >
      {/* 입력 필드 그룹 */}
      <div className="self-stretch flex flex-col justify-start items-start gap-8">
        {/* 이메일 입력 */}
        <div className="self-stretch">
          <Input
            id="email"
            type="email"
            placeholder="이메일을 입력해주세요."
            error={!!errors.email}
            {...register("email")}
            className="h-16 px-4 py-5 text-base bg-white border border-border-quaternary rounded-lg placeholder:text-text-tertiary text-text-primary"
          />
          {errors.email && <p className="text-sm text-text-error mt-2">{errors.email.message}</p>}
        </div>

        {/* 비밀번호 입력 */}
        <div className="self-stretch">
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호를 입력해주세요."
              error={!!errors.password}
              className="h-16 px-4 py-5 text-base bg-white border border-border-quaternary rounded-lg placeholder:text-text-tertiary text-text-primary pr-14"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-icon-secondary hover:text-icon-primary transition-colors"
              aria-label="Toggle password visibility"
            >
              {showPassword ? (
                <Image
                  src="/icons/solid-eye-off.svg"
                  alt="비밀번호 표시 해제"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              ) : (
                <Image
                  src="/icons/solid-eye.svg"
                  alt="비밀번호 표시"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-text-error mt-2">{errors.password.message}</p>
          )}
        </div>
      </div>

      {/* 에러 메시지 */}
      {error && (
        <div className="p-3 rounded-lg bg-bg-secondary border border-border-error">
          <p className="text-sm text-text-error">{error}</p>
        </div>
      )}

      {/* 로그인 버튼 */}
      <OrangeBgButton type="submit" isActive={isButtonActive} className="self-stretch">
        {isLoading ? "로그인 중..." : "로그인"}
      </OrangeBgButton>

      {/* 하단 네비게이션 */}
      <div className="self-stretch inline-flex justify-between items-center">
        <div className="flex justify-center items-center">
          <Link
            href="/signup"
            className="justify-start text-orange-600 text-sm font-medium font-['Pretendard'] leading-5 hover:opacity-80 transition-opacity"
          >
            회원가입
          </Link>
        </div>
        <div className="flex justify-start items-center gap-8">
          <Link
            href="/auth/forgot-password"
            className="justify-start text-neutral-800 text-sm font-medium font-['Pretendard'] leading-5 pr-8 border-r border-neutral-800 hover:opacity-80 transition-opacity"
          >
            계정 찾기
          </Link>

          <Link
            href="/auth/forgot-password"
            className="justify-start text-neutral-800 text-sm font-medium font-['Pretendard'] leading-5 hover:opacity-80 transition-opacity"
          >
            비밀번호 재설정
          </Link>
        </div>
      </div>
    </form>
  );
}

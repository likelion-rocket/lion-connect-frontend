"use client";

import Link from "next/link";

/**
 * 회원가입 완료 페이지
 */
export default function SignupCompletePage() {
  return (
    <main className="relative min-h-screen bg-bg-primary">
      <div className="absolute left-1/2 top-[229px] -translate-x-1/2 flex flex-col gap-12 items-center">
        {/* 제목 및 설명 섹션 */}
        <div className="flex flex-col gap-7">
          <h1 className="font-bold text-[30px] leading-tight text-center text-text-primary">
            회원가입을 축하드립니다
          </h1>
          <p className="font-medium text-lg leading-normal text-[#313957]">
            로그인하여 라이언 커넥트를 이용해주세요
          </p>
        </div>

        {/* 버튼 섹션 */}
        <div className="flex flex-col gap-6 w-[442px]">
          {/* 메인으로 돌아가기 버튼 */}
          <Link
            href="/"
            className="bg-bg-accent rounded-xl py-4 flex items-center justify-center transition-colors hover:bg-[#e05600]"
          >
            <span className="font-bold text-lg leading-normal text-text-inverse-primary">
              메인으로 돌아가기
            </span>
          </Link>

          {/* 로그인으로 돌아가기 링크 */}
          <Link
            href="/login"
            className="font-normal text-lg leading-normal text-text-accent text-center transition-colors hover:text-[#e05600]"
          >
            로그인으로 돌아가기
          </Link>
        </div>

        {/* Copyright */}
        <p className="absolute -bottom-[145px] left-1/2 -translate-x-1/2 translate-y-1/2 font-normal text-base leading-normal text-text-tertiary text-center w-[382px]">
          © 2025 ALL RIGHTS RESERVED
        </p>
      </div>
    </main>
  );
}

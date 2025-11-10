import { Metadata } from "next";
import SignupForm from "@/app/(auth)/_components/SignupForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "회원가입 - Lion Connect",
  description: "라이언 커넥트 회원가입",
};

export default function SignUpPage() {
  return (
    <>
      <main className=" h-[1000px] flex flex-col items-center justify-center bg-bg-primary px-4 py-8">
        {/* 제목 및 설명 섹션 */}
        <div className="w-96 mb-12">
          <div className="space-y-8 mb-8">
            <div className="space-y-7">
              <h1 className="text-center text-3xl font-bold text-text-primary">
                회원이 아니신가요?
              </h1>
              <p className="text-center text-lg text-text-secondary">
                라이언 커넥트를 이용하려면 회원가입이 필요합니다.
              </p>
            </div>
          </div>

          {/* 회원가입 폼 */}
          <SignupForm />
        </div>

        {/* 하단 콘텐츠 */}
        <Link
          href="/login"
          className="text-center text-base text-text-accent cursor-pointer hover:underline transition-colors"
        >
          로그인으로 돌아가기
        </Link>

        <p className="text-center text-base text-text-tertiary mt-auto mb-4">
          © 2025 ALL RIGHTS RESERVED
        </p>
      </main>
    </>
  );
}

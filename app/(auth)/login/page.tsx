import { Metadata } from "next";
import { Suspense } from "react";
import LoginForm from "../_components/LoginForm";

export const metadata: Metadata = {
  title: "로그인 - Lion Connect",
  description: "라이언 커넥트 로그인",
};

export default function SignInPage() {
  return (
    <>
      <main className="flex flex-col items-center bg-bg-primary px-4 pt-20 pb-96">
        <div className="w-[570px] inline-flex flex-col justify-start items-start gap-16">
          {/* 페이지 제목 */}
          <div className="self-stretch flex flex-col justify-start items-start gap-16">
            <div className="self-stretch inline-flex justify-start items-center">
              <h1 className="flex-1 justify-start text-neutral-800 text-3xl font-bold font-['Pretendard'] leading-9">
                로그인
              </h1>
            </div>
            <div className="self-stretch inline-flex justify-start items-center">
              <p className="justify-start text-neutral-500 text-base font-semibold font-['Pretendard'] leading-6">
                라이언 커넥트를 이용하려면 로그인이 필요합니다.
              </p>
            </div>
          </div>

          {/* 로그인 폼 */}
          <Suspense fallback={<div className="self-stretch flex justify-center items-center py-8">로딩 중...</div>}>
            <LoginForm />
          </Suspense>
        </div>
      </main>
    </>
  );
}

import { Metadata } from "next";
import LoginForm from "../../_components/LoginForm";

export const metadata: Metadata = {
  title: "로그인 - Lion Connect",
  description: "라이언 커넥트 로그인",
};

export default function SignInPage() {
  return (
    <>
      <main className="h-[90vh] flex flex-col items-center bg-bg-primary px-4 py-5">
        <div className="w-full max-w-md mt-20">
          {/* 페이지 제목 */}
          <div className="mb-8 ">
            <h1 className="text-3xl font-bold text-text-primary mb-2">로그인 하세요</h1>
            <p className="text-text-secondary">라이언 커넥트를 이용하려면 로그인이 필요합니다.</p>
          </div>

          {/* 로그인 폼 */}
          <LoginForm />
        </div>

        <p className="text-sm text-text-tertiary text-center mt-auto mb-0">
          © 2025 ALL RIGHTS RESERVED
        </p>
      </main>
    </>
  );
}

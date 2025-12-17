"use client";

import { Suspense } from "react";
import { SignupTypeSelector } from "@/app/(auth)/_components/SignupTypeSelector";
import { useRouter, useSearchParams } from "next/navigation";

function SignUpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo");

  const buildUrl = (path: string) => {
    return returnTo ? `${path}?returnTo=${encodeURIComponent(returnTo)}` : path;
  };

  return (
    <SignupTypeSelector
      onUserSignup={() => router.push(buildUrl("/signup/personal/step1"))}
      onCompanySignup={() => router.push(buildUrl("/signup/company/step1"))}
      onBackToLogin={() => router.push(buildUrl("/login"))}
    />
  );
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen">로딩 중...</div>}>
      <SignUpContent />
    </Suspense>
  );
}

"use client";

import { SignupTypeSelector } from "@/app/(auth)/_components/SignupTypeSelector";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();

  return (
    <SignupTypeSelector
      onUserSignup={() => router.push("/signup/personal/step1")}
      onCompanySignup={() => router.push("/signup/company/step1")}
      onBackToLogin={() => router.push("/login")}
    />
  );
}

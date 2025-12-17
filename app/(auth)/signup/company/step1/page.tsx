"use client";

import { Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import Input from "@/app/(auth)/_components/Input";
import { z } from "zod";
import { useSignupStore } from "@/store/signupStore";

// Step 1 schema: 기업 기본 정보
const companyStep1Schema = z.object({
  companyName: z.string().min(1, "기업명을 입력해주세요."),
  businessNumber: z
    .string()
    .regex(/^\d{10}$/, "사업자등록번호는 10자리 숫자여야 합니다."),
  employeeCount: z.string().min(1, "직원 수를 입력해주세요."),
});

type CompanyStep1Type = z.infer<typeof companyStep1Schema>;

function CompanySignupStep1Content() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo");
  const setCompanyStep1 = useSignupStore((state) => state.setCompanyStep1);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CompanyStep1Type>({
    resolver: zodResolver(companyStep1Schema),
    mode: "onChange",
    defaultValues: {
      companyName: "",
      businessNumber: "",
      employeeCount: "",
    },
  });

  const onSubmit = (data: CompanyStep1Type) => {
    // Zustand 스토어에 저장
    setCompanyStep1(data);
    // Step 2로 이동
    const step2Url = returnTo
      ? `/signup/company/step2?returnTo=${encodeURIComponent(returnTo)}`
      : "/signup/company/step2";
    router.push(step2Url);
  };

  const handleCancel = () => {
    const signupUrl = returnTo
      ? `/signup?returnTo=${encodeURIComponent(returnTo)}`
      : "/signup";
    router.push(signupUrl);
  };

  return (
    <main className="flex flex-col items-center bg-bg-primary px-4 pt-20 pb-96">
      <div className="w-[570px] inline-flex flex-col justify-start items-start gap-16">
        {/* 페이지 제목 */}
        <div className="self-stretch flex flex-col gap-8">
          <div className="inline-flex justify-center items-center gap-2.5">
            <div className="flex-1 justify-start text-neutral-800 text-3xl font-bold font-['Pretendard'] leading-9">
              기업 회원가입
            </div>
          </div>
          <div className="flex w-full h-0.5">
            <div className="w-1/2 bg-bg-accent" />
            <div className="w-1/2 bg-neutral-200" />
          </div>
        </div>

        {/* 회원가입 폼 */}
        <form onSubmit={handleSubmit(onSubmit)} className="self-stretch flex flex-col gap-16">
          <div className="self-stretch px-2 flex flex-col justify-start items-start gap-8">
            {/* 기업명 입력 */}
            <div className="self-stretch flex flex-col justify-start items-start gap-4">
              <label
                htmlFor="companyName"
                className="justify-center text-neutral-800 text-sm font-normal font-['Pretendard'] leading-5"
              >
                기업명
              </label>
              <Input
                id="companyName"
                type="text"
                placeholder="기업명을 입력해주세요."
                error={!!errors.companyName}
                {...register("companyName")}
              />
              {errors.companyName && (
                <p className="text-sm text-text-error">{errors.companyName.message}</p>
              )}
            </div>

            {/* 사업자등록번호 입력 */}
            <div className="self-stretch flex flex-col justify-start items-start gap-4">
              <label
                htmlFor="businessNumber"
                className="justify-center text-neutral-800 text-sm font-normal font-['Pretendard'] leading-5"
              >
                사업자등록번호
              </label>
              <Input
                id="businessNumber"
                type="text"
                placeholder="-제외 10자리"
                error={!!errors.businessNumber}
                {...register("businessNumber")}
              />
              {errors.businessNumber && (
                <p className="text-sm text-text-error">{errors.businessNumber.message}</p>
              )}
            </div>

            {/* 기업 직원 수 입력 */}
            <div className="self-stretch flex flex-col justify-start items-start gap-4">
              <label
                htmlFor="employeeCount"
                className="justify-center text-neutral-800 text-sm font-normal font-['Pretendard'] leading-5"
              >
                기업 직원 수
              </label>
              <Input
                id="employeeCount"
                type="text"
                placeholder="총직원 수를 입력해 주세요."
                error={!!errors.employeeCount}
                {...register("employeeCount")}
              />
              {errors.employeeCount && (
                <p className="text-sm text-text-error">{errors.employeeCount.message}</p>
              )}
            </div>
          </div>

          {/* 버튼 그룹 */}
          <div className="self-stretch inline-flex justify-start items-center gap-5">
            <button
              type="button"
              onClick={handleCancel}
              className="w-44 px-8 py-4 bg-white rounded-lg outline outline-[0.80px] outline-offset-[-0.80px] outline-neutral-300 flex justify-center items-center gap-2.5 cursor-pointer hover:bg-neutral-50 transition-colors"
            >
              <div className="justify-center text-orange-600 text-lg font-bold font-['Pretendard'] leading-7">
                취소
              </div>
            </button>
            <button
              type="submit"
              disabled={!isValid}
              className={`flex-1 px-8 py-4 rounded-lg flex justify-center items-center gap-2.5 transition-colors ${
                isValid
                  ? "bg-bg-accent cursor-pointer hover:bg-brand-06"
                  : "bg-neutral-100 cursor-not-allowed"
              }`}
            >
              <div
                className={`justify-center text-lg font-bold font-['Pretendard'] leading-7 ${
                  isValid ? "text-white" : "text-neutral-400"
                }`}
              >
                계속하기
              </div>
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default function CompanySignupStep1Page() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen">로딩 중...</div>}>
      <CompanySignupStep1Content />
    </Suspense>
  );
}

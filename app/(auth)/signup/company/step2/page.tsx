"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Input from "@/app/(auth)/_components/Input";
import { z } from "zod";
import { useSignupStore } from "@/store/signupStore";

// Step 2 schema: 담당자 정보
const companyStep2Schema = z
  .object({
    email: z.string().email("올바른 이메일 형식이 아닙니다."),
    name: z.string().min(1, "이름을 입력해주세요."),
    phoneNumber: z
      .string()
      .regex(/^010\d{8}$/, "올바른 전화번호 형식이 아닙니다. (예: 01012345678)"),
    password: z.string().min(8, "비밀번호는 최소 8자 이상이어야 합니다."),
    passwordConfirm: z.string(),
    agreeTerms: z.boolean().refine((val) => val === true, {
      message: "이용약관에 동의해주세요.",
    }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  });

type CompanyStep2Type = z.infer<typeof companyStep2Schema>;

export default function CompanySignupStep2Page() {
  const router = useRouter();
  const companyStep1 = useSignupStore((state) => state.companyStep1);
  const clearCompanyStep1 = useSignupStore((state) => state.clearCompanyStep1);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CompanyStep2Type>({
    resolver: zodResolver(companyStep2Schema),
    mode: "onChange",
    defaultValues: {
      email: "",
      name: "",
      phoneNumber: "",
      password: "",
      passwordConfirm: "",
      agreeTerms: false,
    },
  });

  // Step 1 데이터가 없으면 Step 1로 리다이렉트
  useEffect(() => {
    if (!companyStep1) {
      router.push("/signup/company/step1");
    }
  }, [companyStep1, router]);

  const onSubmit = async (data: CompanyStep2Type) => {
    if (!companyStep1) {
      router.push("/signup/company/step1");
      return;
    }

    const completeData = {
      ...companyStep1,
      ...data,
      userType: "COMPANY", // 기업 회원 타입 명시
    };

    console.log("Complete company signup data:", completeData);

    // TODO: API 호출로 회원가입 처리
    // await signupMutation.mutateAsync(completeData);

    // 스토어 데이터 삭제
    clearCompanyStep1();

    // 완료 페이지로 이동
    router.push("/signup/complete");
  };

  return (
    <main className="flex flex-col items-center bg-bg-primary px-4 pt-20 pb-96">
      <div className="w-[570px] relative inline-flex flex-col justify-start items-start gap-16">
        {/* 페이지 제목 */}
        <div className="self-stretch flex flex-col gap-8">
          <div className="inline-flex justify-center items-center gap-2.5">
            <div className="flex-1 justify-start text-neutral-800 text-3xl font-bold font-['Pretendard'] leading-9">
              기업 회원가입
            </div>
          </div>
          <div className="flex w-full h-0.5">
            <div className="w-1/2 bg-neutral-200" />
            <div className="w-1/2 bg-bg-accent" />
          </div>
        </div>

        {/* Step 1 데이터 표시 */}
        {companyStep1 && (
          <div className="self-stretch px-4 py-6 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-neutral-200 flex flex-col justify-start items-start gap-6">
            <div className="inline-flex justify-start items-center gap-8">
              <div className="w-28 justify-start text-neutral-400 text-sm font-normal font-['Pretendard'] leading-5">
                기업명
              </div>
              <div className="justify-start text-neutral-800 text-sm font-normal font-['Pretendard'] leading-5">
                {companyStep1.companyName}
              </div>
            </div>
            <div className="self-stretch inline-flex justify-start items-center gap-8">
              <div className="w-28 justify-start text-neutral-400 text-sm font-normal font-['Pretendard'] leading-5">
                사업자 등록번호
              </div>
              <div className="justify-start text-neutral-800 text-sm font-normal font-['Pretendard'] leading-5">
                {companyStep1.businessNumber}
              </div>
            </div>
          </div>
        )}

        {/* 회원가입 폼 */}
        <form onSubmit={handleSubmit(onSubmit)} className="self-stretch flex flex-col gap-16">
          <div className="self-stretch px-2 flex flex-col justify-start items-start gap-8">
            {/* 업무용 이메일 입력 */}
            <div className="self-stretch flex flex-col justify-start items-start gap-4">
              <label
                htmlFor="email"
                className="justify-center text-neutral-800 text-sm font-normal font-['Pretendard'] leading-5"
              >
                업무용 이메일
              </label>
              <Input
                id="email"
                type="email"
                placeholder="기업 이메일을 입력해주세요."
                error={!!errors.email}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-text-error">{errors.email.message}</p>
              )}
            </div>

            {/* 이름 입력 */}
            <div className="self-stretch flex flex-col justify-start items-start gap-4">
              <label
                htmlFor="name"
                className="justify-center text-neutral-800 text-sm font-normal font-['Pretendard'] leading-5"
              >
                이름
              </label>
              <Input
                id="name"
                type="text"
                placeholder="이름을 입력해주세요."
                error={!!errors.name}
                {...register("name")}
              />
              {errors.name && (
                <p className="text-sm text-text-error">{errors.name.message}</p>
              )}
            </div>

            {/* 휴대폰 번호 입력 */}
            <div className="self-stretch flex flex-col justify-start items-start gap-4">
              <label
                htmlFor="phoneNumber"
                className="justify-center text-neutral-800 text-sm font-normal font-['Pretendard'] leading-5"
              >
                휴대폰 번호
              </label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="(예시) 01012345678"
                error={!!errors.phoneNumber}
                {...register("phoneNumber")}
              />
              {errors.phoneNumber && (
                <p className="text-sm text-text-error">{errors.phoneNumber.message}</p>
              )}
            </div>

            {/* 비밀번호 입력 */}
            <div className="self-stretch flex flex-col justify-start items-start gap-4">
              <label
                htmlFor="password"
                className="justify-center text-neutral-800 text-sm font-normal font-['Pretendard'] leading-5"
              >
                비밀번호
              </label>
              <Input
                id="password"
                type="password"
                placeholder="비밀번호를 입력해주세요."
                error={!!errors.password}
                {...register("password")}
              />
              <Input
                id="passwordConfirm"
                type="password"
                placeholder="비밀번호를 한 번 더 입력해주세요."
                error={!!errors.passwordConfirm}
                {...register("passwordConfirm")}
              />
              {errors.password && (
                <p className="text-sm text-text-error">{errors.password.message}</p>
              )}
              {errors.passwordConfirm && (
                <p className="text-sm text-text-error">{errors.passwordConfirm.message}</p>
              )}
              {!errors.password && !errors.passwordConfirm && (
                <p className="text-sm text-neutral-500">
                  영문 대소문자와 특수문자를 포함해 8자 이상 입력해주세요.
                </p>
              )}
            </div>

            {/* 이용약관 동의 체크박스 */}
            <div className="self-stretch inline-flex justify-start items-center gap-4">
              <label className="p-3 flex justify-start items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded-[3px] border-2 border-neutral-400 accent-bg-accent"
                  {...register("agreeTerms")}
                />
              </label>
              <span className="justify-center text-neutral-800 text-base font-semibold font-['Pretendard'] leading-6">
                회원가입에 동의합니다.
              </span>
            </div>
            {errors.agreeTerms && <p className="text-sm text-text-error">{errors.agreeTerms.message}</p>}
          </div>

          {/* 버튼 그룹 */}
          <div className="self-stretch inline-flex justify-start items-center gap-5">
            <button
              type="button"
              onClick={() => router.push("/signup/company/step1")}
              className="w-44 px-8 py-4 bg-white rounded-lg outline outline-[0.80px] outline-offset-[-0.80px] outline-neutral-300 flex justify-center items-center gap-2.5 cursor-pointer hover:bg-neutral-50 transition-colors"
            >
              <div className="justify-center text-orange-600 text-lg font-bold font-['Pretendard'] leading-7">
                이전
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
                가입하기
              </div>
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

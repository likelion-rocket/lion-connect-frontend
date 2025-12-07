"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Input from "@/app/(auth)/_components/Input";
import { z } from "zod";
import { useSignupStore } from "@/store/signupStore";
import { useEffect } from "react";

// Step 1 schema: 기본 정보
const personalStep1Schema = z.object({
  name: z.string().min(1, "이름을 입력해주세요."),
  courseName: z.string().optional(),
  courseNumber: z.string().optional(),
});

type PersonalStep1Type = z.infer<typeof personalStep1Schema>;

export default function PersonalSignupStep1Page() {
  const router = useRouter();
  const { personalStep1, setPersonalStep1 } = useSignupStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<PersonalStep1Type>({
    resolver: zodResolver(personalStep1Schema),
    mode: "onChange",
    defaultValues: {
      name: "",
      courseName: "",
      courseNumber: "",
    },
  });

  // 저장된 데이터가 있으면 폼에 복원
  useEffect(() => {
    if (personalStep1) {
      reset(personalStep1);
    }
  }, [personalStep1, reset]);

  const onSubmit = (data: PersonalStep1Type) => {
    // Zustand 스토어에 저장 (localStorage에 자동 persist)
    setPersonalStep1(data);
    // Step 2로 이동
    router.push("/signup/personal/step2");
  };

  const handleCancel = () => {
    router.push("/signup");
  };

  return (
    <main className="flex flex-col items-center bg-bg-primary px-4 pt-20 pb-96">
      <div className="w-[570px] inline-flex flex-col justify-start items-start gap-16">
        {/* 페이지 제목 */}
        <div className="self-stretch flex flex-col gap-8">
          <div className="inline-flex justify-center items-center gap-2.5">
            <div className="flex-1 justify-start text-neutral-800 text-3xl font-bold font-['Pretendard'] leading-9">
              일반 회원가입
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
              {errors.name && <p className="text-sm text-text-error">{errors.name.message}</p>}
            </div>

            {/* 수료 과정명 입력 */}
            <div className="self-stretch flex flex-col justify-start items-start gap-4">
              <label
                htmlFor="courseName"
                className="justify-center text-neutral-800 text-sm font-normal font-['Pretendard'] leading-5"
              >
                수료 과정명
              </label>
              <Input
                id="courseName"
                type="text"
                placeholder="수료 과정명을 입력해주세요. (ex. UXUI)"
                error={!!errors.courseName}
                {...register("courseName")}
              />
              {errors.courseName && (
                <p className="text-sm text-text-error">{errors.courseName.message}</p>
              )}
            </div>

            {/* 수료 기수 입력 */}
            <div className="self-stretch flex flex-col justify-start items-start gap-4">
              <label
                htmlFor="courseNumber"
                className="justify-center text-neutral-800 text-sm font-normal font-['Pretendard'] leading-5"
              >
                수료 기수
              </label>
              <Input
                id="courseNumber"
                type="text"
                placeholder="수료 기수를 입력해주세요. (ex. 4)"
                error={!!errors.courseNumber}
                {...register("courseNumber")}
              />
              {errors.courseNumber && (
                <p className="text-sm text-text-error">{errors.courseNumber.message}</p>
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

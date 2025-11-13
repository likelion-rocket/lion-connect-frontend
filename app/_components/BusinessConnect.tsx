"use client";

import { useBusinessConnect } from "../../hooks/useBusinessConnect";
import { FormField, FormTextarea } from "./FormField";

export default function BusinessConnect() {
  const { register, handleSubmit, errors } = useBusinessConnect();

  return (
    <section
      id="business-connect"
      className="w-full min-w-[1444px] bg-bg-tertiary py-20 flex flex-col items-center"
    >
      {/* Header */}
      <div className="max-w-[1078px] flex flex-col items-center gap-8 mb-[142px]">
        <h2 className="text-center text-4xl font-bold leading-[45px]">
          <span className="text-text-accent">멋쟁이사자처럼</span>
          <span className="text-text-primary">과 함께 어떤 혁신을 이뤄보고 싶으신가요?</span>
        </h2>
        <p className="text-center text-text-secondary text-sm font-medium leading-[21px]">
          맞춤형 솔루션을 제공하기 위해 영업일 기준 2일 내에 전담 매니저가 연락 드리겠습니다.
        </p>
      </div>

      {/* Form Container with Shadow */}
      <div className="w-[994px] p-8 bg-white shadow-[0px_4px_6px_-2px_rgba(0,0,0,0.05)]">
        <form onSubmit={handleSubmit} className="w-[910px] flex flex-col gap-6">
          {/* Form Fields Grid */}
          <div className="flex flex-wrap gap-6">
            <FormField
              label="담당자명"
              name="managerName"
              placeholder="담당자명을 입력해주세요."
              error={errors.managerName}
              required
              register={register}
              className="w-[443px]"
            />
            <FormField
              label="회사명"
              name="companyName"
              placeholder="회사/단체명을 입력해주세요."
              error={errors.companyName}
              required
              register={register}
              className="w-[443px]"
            />
            <FormField
              label="부서/직책"
              name="department"
              placeholder="부서/직책을 입력해주세요."
              error={errors.department}
              required
              register={register}
              className="w-[443px]"
            />
            <FormField
              label="이메일"
              name="email"
              type="email"
              placeholder="이메일을 입력해주세요."
              error={errors.email}
              required
              register={register}
              className="w-[443px]"
            />
            <FormField
              label="연락처"
              name="contact"
              type="tel"
              placeholder="연락처를 입력해주세요."
              error={errors.contact}
              required
              register={register}
              className="w-full"
            />
          </div>

          {/* Textarea */}
          <FormTextarea
            label="문의 내용"
            name="message"
            placeholder="문의내용을 입력해주세요."
            error={errors.message}
            required
            rows={15}
            register={register}
          />

          {/* Privacy Agreement */}
          <div className="px-5 py-4 bg-white rounded-lg flex flex-col gap-8">
            <div className="flex items-start gap-2">
              <label className="text-base font-semibold text-text-primary leading-6">
                개인정보처리방침
              </label>
              <div className="w-2 h-2 bg-text-error rounded-full" />
            </div>

            <div className="flex flex-col gap-0 border-b-2 border-[#BFBFBF]">
              <div className="px-4 py-[29px] flex items-center gap-2.5 border-b-2 border-[#DEDEDE]">
                <input
                  type="checkbox"
                  id="agreePrivacy"
                  className="w-6 h-6 rounded border-2 border-text-secondary accent-text-accent cursor-pointer"
                  {...register("agreePrivacy")}
                />
                <label
                  htmlFor="agreePrivacy"
                  className="text-base text-text-primary leading-6 cursor-pointer"
                >
                  개인 정보 수집 및 이용에 동의합니다.
                </label>
              </div>
            </div>

            {errors.agreePrivacy && (
              <p className="text-text-error text-sm">{errors.agreePrivacy.message}</p>
            )}

            <div className="px-3 py-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 relative overflow-hidden">
                  <div className="w-[5.33px] h-[5.33px] absolute left-[5.33px] top-[5.33px] bg-text-secondary rounded-full" />
                </div>
                <p className="text-text-secondary text-sm leading-[21px]">
                  수집 주체 : (주)멋쟁이사자처럼 라이언 커넥트
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-4 h-4 relative overflow-hidden">
                  <div className="w-[5.33px] h-[5.33px] absolute left-[5.33px] top-[5.33px] bg-text-secondary rounded-full" />
                </div>
                <p className="text-text-secondary text-sm leading-[21px]">
                  수집 목적 : 기업 문의 내용에 대한 확인 및 답변
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-4 h-4 relative overflow-hidden">
                  <div className="w-[5.33px] h-[5.33px] absolute left-[5.33px] top-[5.33px] bg-text-secondary rounded-full" />
                </div>
                <p className="text-text-secondary text-sm leading-[21px]">
                  수집 항목 : 기업 문의 내용에 대한 확인 및 답변
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-4 h-4 relative overflow-hidden">
                  <div className="w-[5.33px] h-[5.33px] absolute left-[5.33px] top-[5.33px] bg-text-secondary rounded-full" />
                </div>
                <p className="text-text-secondary text-sm leading-[21px]">
                  보유기간 : 기업 문의 내용에 대한 확인 및 답변
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-6 bg-bg-accent rounded-lg flex justify-center items-center text-text-inverse-primary text-xl font-bold leading-[27.5px] hover:opacity-90 transition-opacity"
          >
            기업 문의하기
          </button>
        </form>
      </div>
    </section>
  );
}

"use client";

import { useBusinessConnect } from "../../hooks/useBusinessConnect";
import { FormField, FormTextarea } from "./FormField";

export default function BusinessConnect() {
  const { register, handleSubmit, errors } = useBusinessConnect();

  return (
    <section id="business-connect" className="w-full min-w-[1444px] bg-[#F5F5F5] py-20">
      <div className="max-w-[960px] mx-auto">
        <h2 className="text-[32px] font-bold text-[#FF5C00] text-center mb-3">
          멋쟁이사자처럼과 함께 어떤 혁신을 이뤄보고 싶으신가요?
        </h2>
        <p className="text-center text-[#666] mb-12">
          맞춤형 솔루션을 제공하기 위해 영업일 기준 2일 내에 전담 매니저가 연락 드리겠습니다.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <FormField
              label="회사명"
              name="companyName"
              placeholder="회사/단체명을 입력해주세요."
              error={errors.companyName}
              required
              register={register}
            />
            <FormField
              label="담당자명"
              name="managerName"
              placeholder="담당자명을 입력해주세요."
              error={errors.managerName}
              required
              register={register}
            />
            <FormField
              label="부서/직책"
              name="department"
              placeholder="부서/직책을 입력해주세요."
              error={errors.department}
              required
              register={register}
            />
            <FormField
              label="이메일"
              name="email"
              type="email"
              placeholder="이메일을 입력해주세요."
              error={errors.email}
              required
              register={register}
            />
            <FormField
              label="연락처"
              name="contact"
              type="tel"
              placeholder="연락처를 입력해주세요."
              error={errors.contact}
              required
              register={register}
              className="col-span-2"
            />
          </div>

          <FormTextarea
            label="문의 내용"
            name="message"
            placeholder="문의 내용을 입력해주세요."
            error={errors.message}
            required
            rows={10}
            register={register}
          />

          <div className="bg-white p-6 rounded-lg">
            <div className="flex items-start gap-2 mb-4">
              <input
                type="checkbox"
                id="agreePrivacy"
                className="mt-1 w-4 h-4 accent-[#FF5C00]"
                {...register("agreePrivacy")}
              />
              <label htmlFor="agreePrivacy" className="text-sm">
                개인 정보 수집 및 이용에 동의합니다.
              </label>
            </div>
            {errors.agreePrivacy && (
              <p className="text-red-500 text-sm mb-4">{errors.agreePrivacy.message}</p>
            )}

            <ul className="space-y-2 text-sm text-[#666] ml-6">
              <li className="list-disc">수집 주체 : (주)멋쟁이사자처럼 라이언 커넥트</li>
              <li className="list-disc">수집 목적 : 기업 문의 내용에 대한 확인 및 답변</li>
              <li className="list-disc">수집 항목 : 기업 문의 내용에 대한 확인 및 답변</li>
              <li className="list-disc">보유기간 : 기업 문의 내용에 대한 확인 및 답변</li>
            </ul>
          </div>

          <button
            type="submit"
            className="w-full bg-[#FF5C00] text-white py-4 rounded-lg font-bold text-lg hover:bg-[#E54F00] transition-colors"
          >
            기업 문의하기
          </button>
        </form>
      </div>
    </section>
  );
}

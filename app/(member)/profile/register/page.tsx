"use client";

/**
 * 인재 등록 폼 페이지
 * React Hook Form (FormProvider) + API 연동
 *
 * 데이터 흐름:
 * 1. useTalentRegisterData 훅으로 페이지 진입 시 모든 데이터 조회
 * 2. 조회한 데이터는 useTalentRegisterStore에 자동 저장
 * 3. 각 섹션은 store에서 필요한 데이터만 선택적으로 구독
 * 4. authStore에서 user 정보(전화번호, 이메일) 가져옴
 *
 * API 호출 순서:
 * 1. POST api/profile/me → 프로필 생성 (await, ID 획득)
 * 2. 나머지 병렬 저장 (Promise.all)
 *
 * formState.dirtyFields로 dirty checking하여 필요한 API만 호출
 */

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  talentRegisterSchema,
  defaultTalentRegisterValues,
  type TalentRegisterFormValues,
} from "@/schemas/talent/talentRegisterSchema";

// 폼 제출 액션
import { submitTalentRegister } from "./_actions/submitTalentRegister";

// 훅
import { useTalentRegisterData } from "@/hooks/talent/queries/useTalentRegisterData";
import { useInitializeTalentForm } from "@/hooks/talent/queries/useInitializeTalentForm";

// Store
import { useTalentRegisterStore } from "@/store/talentRegisterStore";
import { useAuthStore } from "@/store/authStore";
import { useToastStore } from "@/store/toastStore";

// 컴포넌트
import TalentRegisterNav from "./_components/TalentRegisterNav";

// 섹션 컴포넌트
import ProfileImageSection from "./_components/sections/ProfileImageSection";
import PersonalInfoSection from "./_components/sections/PersonalInfoSection";
import IntroductionSection from "./_components/sections/IntroductionSection";
import JobSection from "./_components/sections/JobSection";
import JobExperienceSection from "./_components/sections/JobExperienceSection";
import EducationSection from "./_components/sections/EducationSection";
import CareerSection from "./_components/sections/CareerSection";
import SkillsSection from "./_components/sections/SkillsSection";
import ActivitiesSection from "./_components/sections/ActivitiesSection";
import LanguagesSection from "./_components/sections/LanguagesSection";
import CertificatesSection from "./_components/sections/CertificatesSection";
import LinksSection from "./_components/sections/LinksSection";
import PortfolioSection from "./_components/sections/PortfolioSection";
import LikelionCodeSection from "./_components/sections/LikelionCodeSection";
import WorkDrivenTestSection from "./_components/sections/WorkDrivenTestSection";

// resolver를 컴포넌트 외부로 이동 (재생성 방지)
const formResolver = zodResolver(talentRegisterSchema);

export default function TalentRegisterPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const [isUserVerified, setIsUserVerified] = useState(false);
  const showToast = useToastStore((state) => state.showToast);

  // 인증 상태 초기화 완료 후 사용자 확인
  useEffect(() => {
    // 아직 초기화 중이면 대기
    if (!isInitialized) {
      return;
    }

    // 초기화 완료 후 사용자 확인
    if (user) {
      setIsUserVerified(true);
    } else {
      // user가 없으면 로그인 페이지로 리다이렉트
      router.push("/login");
    }
  }, [isInitialized, user, router]);

  // 페이지 진입 시 모든 데이터 조회 (자동으로 store에 저장됨)
  // 각 섹션 컴포넌트에서 useTalentRegisterStore로 직접 사용
  const { isLoading, error } = useTalentRegisterData();

  // 프로필 존재 여부 확인 (POST vs PUT 분기용)
  const existingProfile = useTalentRegisterStore((state) => state.profile);

  const methods = useForm<TalentRegisterFormValues>({
    resolver: formResolver,
    defaultValues: defaultTalentRegisterValues,
    mode: "onSubmit", // 값 변경 시마다 validation 실행
    shouldFocusError: true, // 에러 발생 시 첫 번째 필드로 자동 포커스
    // shouldUnregister: true를 제거 - 등록되지 않은 필드가 isValid를 false로 만드는 문제 해결
  });

  // 데이터가 로드되면 자동으로 React Hook Form을 초기화
  useInitializeTalentForm(methods, isLoading);

  const handleGoBack = () => {
    // window.history.back();
  };

  /**
   * 서버에서 생성된 ID만 폼에 업데이트
   * dirty/valid 상태를 유지하면서 ID만 동기화
   */
  const updateFormWithServerIds = (serverData: TalentRegisterFormValues) => {
    // 학력 ID 업데이트
    if (serverData.educations) {
      serverData.educations.forEach((edu, index) => {
        if (edu.id) {
          methods.setValue(`educations.${index}.id`, edu.id, {
            shouldDirty: false,
            shouldValidate: false,
          });
        }
      });
    }

    // 경력 ID 업데이트
    if (serverData.careers) {
      serverData.careers.forEach((career, index) => {
        if (career.id) {
          methods.setValue(`careers.${index}.id`, career.id, {
            shouldDirty: false,
            shouldValidate: false,
          });
        }
      });
    }

    // 수상/활동 ID 업데이트
    if (serverData.activities) {
      serverData.activities.forEach((activity, index) => {
        if (activity.id) {
          methods.setValue(`activities.${index}.id`, activity.id, {
            shouldDirty: false,
            shouldValidate: false,
          });
        }
      });
    }

    // 언어 ID 업데이트
    if (serverData.languages) {
      serverData.languages.forEach((lang, index) => {
        if (lang.id) {
          methods.setValue(`languages.${index}.id`, lang.id, {
            shouldDirty: false,
            shouldValidate: false,
          });
        }
      });
    }

    // 자격증 ID 업데이트
    if (serverData.certificates) {
      serverData.certificates.forEach((cert, index) => {
        if (cert.id) {
          methods.setValue(`certificates.${index}.id`, cert.id, {
            shouldDirty: false,
            shouldValidate: false,
          });
        }
      });
    }
  };

  /**
   * 임시 저장 핸들러
   * - validation 체크 없이 현재 입력된 값으로 submit
   * - 현재 페이지에 머무르면서 데이터만 저장
   * - dirty/valid 상태를 유지하고 서버에서 생성된 ID만 업데이트
   */
  const handleTempSave = async () => {
    const currentValues = methods.getValues();
    const result = await submitTalentRegister({
      values: currentValues,
      methods,
      existingProfileId: existingProfile?.id,
      isTempSave: true,
    });

    if (result.success) {
      if (result.data) {
        // 임시 저장: 서버에서 받은 전체 데이터(ID 포함)로 reset하여 defaultValues 업데이트
        // 이렇게 해야 다시 임시저장 시 POST가 아닌 PUT이 호출됨
        methods.reset(result.data, { keepDirty: true, keepTouched: true, keepErrors: true });
      }
      showToast("임시 저장되었습니다!");
    } else {
      // TODO: 에러 처리
    }
  };

  // 사용자 인증 확인 중 로딩 상태 처리
  if (!isUserVerified) {
    return (
      <div className="min-h-screen bg-bg-page flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-border-tertiary border-t-bg-accent rounded-full animate-spin" />
          <p className="text-text-secondary">인증을 확인하는 중입니다...</p>
        </div>
      </div>
    );
  }

  // 로딩 상태 처리
  if (isLoading) {
  }

  // 에러 상태 처리
  if (error) {
  }

  /**
   * 폼 제출 핸들러
   * submitTalentRegister 액션을 호출하여 처리
   */
  const onSubmit = async (values: TalentRegisterFormValues) => {
    const result = await submitTalentRegister({
      values,
      methods,
      existingProfileId: existingProfile?.id,
    });

    if (result.success) {
      if (result.data) {
        methods.reset(result.data);
      }
      // 성공 시 토스트 표시 후 랜딩페이지로 이동
      showToast("인재 프로필이 성공적으로 등록되었습니다!");
      router.push("/");
    } else {
      // TODO: 에러 처리
    }
  };

  /**
   * validation 에러 발생 시 가장 위에 있는 에러 필드로 스크롤 + 토스트 알림
   */
  const onError = (errors: any) => {
    // 모든 에러 정보 수집 (key와 message)
    const getAllErrors = (obj: any, prefix = ""): { key: string; message: string }[] => {
      const result: { key: string; message: string }[] = [];

      for (const key in obj) {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        const value = obj[key];

        // 배열인 경우 (예: educations.0.schoolName)
        if (Array.isArray(value)) {
          for (let i = 0; i < value.length; i++) {
            if (value[i]) {
              result.push(...getAllErrors(value[i], `${fullKey}.${i}`));
            }
          }
        }
        // 에러 객체인 경우 (message가 있음)
        else if (value?.message) {
          result.push({ key: fullKey, message: value.message });
        }
        // 중첩 객체인 경우
        else if (typeof value === "object" && value !== null) {
          result.push(...getAllErrors(value, fullKey));
        }
      }
      return result;
    };

    const allErrors = getAllErrors(errors);

    if (allErrors.length > 0) {
      // DOM에서 가장 위에 있는 에러 필드 찾기
      let topErrorElement: Element | null = null;
      let topErrorMessage = allErrors[0].message;
      let minTop = Infinity;

      for (const error of allErrors) {
        const element = document.querySelector(`[name="${error.key}"]`);
        if (element) {
          const rect = element.getBoundingClientRect();
          const absoluteTop = rect.top + window.scrollY;

          if (absoluteTop < minTop) {
            minTop = absoluteTop;
            topErrorElement = element;
            topErrorMessage = error.message;
          }
        }
      }

      // 토스트 알림 표시 (가장 위에 있는 에러 메시지)
      showToast(topErrorMessage, "error");

      // 가장 위에 있는 에러 필드로 스크롤
      if (topErrorElement) {
        topErrorElement.scrollIntoView({ behavior: "smooth", block: "center" });
        (topErrorElement as HTMLElement).focus?.();
      }
    }
  };

  // mode: "onSubmit"에서는 submit 전까지 isValid가 정확하지 않음
  // 버튼은 항상 활성화하고, validation은 handleSubmit에서 처리
  const isSubmitDisabled = false;

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-bg-page">
        {/* Navigation Bar */}
        <TalentRegisterNav
          onBack={handleGoBack}
          onTempSave={handleTempSave}
          formId="talent-register-form"
          isSubmitDisabled={isSubmitDisabled}
        />

        {/* Main Form */}
        <main className="max-w-[1440px] mx-auto px-4 md:px-8 py-8 md:py-16">
          <form
            id="talent-register-form"
            onSubmit={methods.handleSubmit(onSubmit, onError)}
            className="talent-register-form max-w-[1142px] mx-auto flex flex-col gap-60"
          >
            {/* 프로필 사진 섹션 */}
            <ProfileImageSection />

            {/* 인적사항 섹션 */}
            <PersonalInfoSection />

            {/* 간단 소개 섹션 */}
            <IntroductionSection />

            {/* 직군 및 직무 선택 섹션 */}
            <JobSection />

            {/* 직무 관련 경험 섹션 */}
            <JobExperienceSection />

            {/* 학력 섹션 */}
            <EducationSection />

            {/* 경력 섹션 */}
            <CareerSection />

            {/* 직무 스킬 섹션 */}
            <SkillsSection />

            {/* 수상/활동/기타 섹션 */}
            <ActivitiesSection />

            {/* 언어 & 자격증 섹션 (2열 레이아웃) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
              <LanguagesSection />
              <CertificatesSection />
            </div>

            {/* 링크 섹션 */}
            <LinksSection />

            {/* 포트폴리오 섹션 */}
            <PortfolioSection />

            {/* 멋사 수료생 코드 섹션 */}
            {/* <LikelionCodeSection /> */}

            {/* Work Driven 테스트 섹션 */}
            <WorkDrivenTestSection />

            {/* Page Footer */}
            <footer className="page-footer flex flex-col md:flex-row items-center justify-end gap-4 pt-8">
              <button
                type="button"
                onClick={handleGoBack}
                className="w-full cursor-pointer md:w-auto px-8 py-3 border border-border-quaternary rounded-lg text-base font-medium text-text-secondary hover:bg-bg-tertiary transition-colors"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={isSubmitDisabled}
                className={`w-full md:w-auto px-8 py-3 rounded-lg text-base font-bold transition-colors ${
                  isSubmitDisabled
                    ? "bg-bg-tertiary text-text-quaternary outline-1 outline-border-quaternary -outline-offset-1 cursor-not-allowed"
                    : "bg-bg-accent text-text-inverse-primary hover:bg-brand-06 cursor-pointer"
                }`}
              >
                작성 완료
              </button>
            </footer>
          </form>
        </main>
      </div>
    </FormProvider>
  );
}

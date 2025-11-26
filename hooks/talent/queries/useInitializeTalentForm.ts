"use client";

import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { useTalentRegisterStore } from "@/store/talentRegisterStore";
import { useAuthStore } from "@/store/authStore";
import { mapApiDataToFormValues } from "@/utils/talentRegisterMapper";
import type { TalentRegisterFormValues } from "@/schemas/talent/talentRegisterSchema";

/**
 * 인재 등록 폼 초기화 훅
 *
 * Store 데이터가 로드되면 자동으로 React Hook Form을 초기화
 *
 * @param methods - React Hook Form의 methods 객체
 * @param isLoading - 데이터 로딩 상태
 */
export function useInitializeTalentForm(
  methods: UseFormReturn<TalentRegisterFormValues>,
  isLoading: boolean
) {
  const profile = useTalentRegisterStore((state) => state.profile);
  const educations = useTalentRegisterStore((state) => state.educations);
  const experiences = useTalentRegisterStore((state) => state.experiences);
  const languages = useTalentRegisterStore((state) => state.languages);
  const certifications = useTalentRegisterStore((state) => state.certifications);
  const awards = useTalentRegisterStore((state) => state.awards);
  const expTags = useTalentRegisterStore((state) => state.expTags);
  const jobCategories = useTalentRegisterStore((state) => state.jobCategories);
  const profileLinks = useTalentRegisterStore((state) => state.profileLinks);
  const skills = useTalentRegisterStore((state) => state.skills);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    // 로딩 중이거나 프로필이 없으면 초기화하지 않음
    if (isLoading || !profile) return;

    const storeData = {
      profile,
      educations,
      experiences,
      languages,
      certifications,
      awards,
      expTags,
      jobCategories,
      profileLinks,
      skills,
    };

    // API 데이터를 폼 형식으로 변환
    const formValues = mapApiDataToFormValues(storeData, user);

    console.log("mapper 결과 formValues:", formValues);
    if (formValues.educations) {
      console.log("educations 배열:", formValues.educations);
      formValues.educations.forEach((edu, idx) => {
        console.log(`educations[${idx}]:`, { id: (edu as any).id, schoolName: edu.schoolName });
      });
    }

    // React Hook Form 초기화
    methods.reset(formValues);

    // reset 후 id 값이 제거되었으므로 명시적으로 복구
    if (formValues.educations && formValues.educations.length > 0) {
      formValues.educations.forEach((edu, idx) => {
        if ((edu as any).id !== undefined) {
          methods.setValue(`educations.${idx}.id`, (edu as any).id);
        }
      });
    }

    // reset 직후 폼 값 확인
    setTimeout(() => {
      const resetValues = methods.getValues("educations");
      console.log("reset 후 educations:", resetValues);
      if (resetValues && resetValues.length > 0) {
        resetValues.forEach((edu, idx) => {
          console.log(`reset 후 educations[${idx}]:`, {
            id: (edu as any).id,
            schoolName: edu.schoolName,
          });
        });
      }
    }, 0);
  }, [
    isLoading,
    profile,
    educations,
    experiences,
    languages,
    certifications,
    awards,
    expTags,
    jobCategories,
    profileLinks,
    skills,
    user,
    methods,
  ]);
}

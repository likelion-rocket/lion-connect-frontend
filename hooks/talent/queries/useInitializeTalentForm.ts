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
    console.log("mapper 결과 formValues.skills:", formValues.skills);

    if (formValues.educations) {
      console.log("educations 배열:", formValues.educations);
      formValues.educations.forEach((edu, idx) => {
        console.log(`educations[${idx}]:`, { id: (edu as any).id, schoolName: edu.schoolName });
      });
    }

    // React Hook Form 초기화
    methods.reset(formValues);

    // reset 후 id 값이 제거되었으므로 명시적으로 복구
    // 모든 배열 필드에 대해 동일하게 처리

    // 직무 카테고리 (job.category, job.role)
    // jobCategories[0]은 직군, jobCategories[1]은 직무
    if (formValues.job) {
      console.log("job 필드 복구:", {
        category: formValues.job.category,
        role: formValues.job.role,
      });
      if (formValues.job.category) {
        methods.setValue("job.category", formValues.job.category);
      }
      if (formValues.job.role) {
        methods.setValue("job.role", formValues.job.role);
      }
    }

    // 경력 (배열 필드 - id 포함 전체 필드 복구)
    if (formValues.careers && formValues.careers.length > 0) {
      formValues.careers.forEach((career, idx) => {
        const careerItem = career as any;
        if (careerItem.id !== undefined) {
          methods.setValue(`careers.${idx}.id`, careerItem.id);
        }
      });
    }

    // 학력 (배열 필드 - id 포함 전체 필드 복구)
    if (formValues.educations && formValues.educations.length > 0) {
      formValues.educations.forEach((edu, idx) => {
        const eduItem = edu as any;
        if (eduItem.id !== undefined) {
          methods.setValue(`educations.${idx}.id`, eduItem.id);
        }
      });
    }

    // 어학 (배열 필드 - id 포함 전체 필드 복구)
    if (formValues.languages && formValues.languages.length > 0) {
      formValues.languages.forEach((lang, idx) => {
        const langItem = lang as any;
        if (langItem.id !== undefined) {
          methods.setValue(`languages.${idx}.id`, langItem.id);
        }
      });
    }

    // 자격증 (배열 필드 - id 포함 전체 필드 복구)
    if (formValues.certificates && formValues.certificates.length > 0) {
      formValues.certificates.forEach((cert, idx) => {
        const certItem = cert as any;
        if (certItem.id !== undefined) {
          methods.setValue(`certificates.${idx}.id`, certItem.id);
        }
      });
    }

    // 수상/활동 (배열 필드 - id 포함 전체 필드 복구)
    if (formValues.activities && formValues.activities.length > 0) {
      formValues.activities.forEach((activity, idx) => {
        const activityItem = activity as any;
        if (activityItem.id !== undefined) {
          methods.setValue(`activities.${idx}.id`, activityItem.id);
        }
      });
    }

    // 링크 (id, url 명시적 복구)
    if (formValues.links && formValues.links.length > 0) {
      formValues.links.forEach((link, idx) => {
        const linkItem = link as { id?: number; url?: string };
        if (linkItem.id !== undefined) {
          methods.setValue(`links.${idx}.id`, linkItem.id);
        }
        if (linkItem.url !== undefined) {
          methods.setValue(`links.${idx}.url`, linkItem.url);
        }
      });
    }

    // 스킬 (id, name 명시적 복구)
    if (formValues.skills?.main && formValues.skills.main.length > 0) {
      formValues.skills.main.forEach((skill, idx) => {
        const skillItem = skill as { id?: number; name?: string };
        if (skillItem.id !== undefined) {
          methods.setValue(`skills.main.${idx}.id`, skillItem.id);
        }
        if (skillItem.name !== undefined) {
          methods.setValue(`skills.main.${idx}.name`, skillItem.name);
        }
      });
    }

    // reset 직후 폼 값 확인
    setTimeout(() => {
      const jobCategory = methods.getValues("job.category");
      const jobRole = methods.getValues("job.role");
      console.log("reset 후 job 필드:", { category: jobCategory, role: jobRole });

      const skillsValues = methods.getValues("skills.main");
      console.log("reset 후 skills.main:", skillsValues);
      if (skillsValues && skillsValues.length > 0) {
        skillsValues.forEach((skill, idx) => {
          console.log(`reset 후 skills.main[${idx}]:`, {
            id: (skill as any).id,
            name: (skill as any).name,
          });
        });
      }

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

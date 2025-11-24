/**
 * 인재 등록 폼 제출 액션
 *
 * 이 파일은 인재 등록 페이지의 폼 제출 로직을 담당합니다.
 * React Hook Form의 FormMethods와 함께 사용됩니다.
 *
 * 주요 역할:
 * 1. formState.dirtyFields 기반으로 변경된 필드만 API 호출
 * 2. API 호출 순서 제어 (프로필 생성 → 나머지 병렬 저장)
 * 3. 에러 처리 및 성공/실패 응답 반환
 */

import type { UseFormReturn } from "react-hook-form";
import type { TalentRegisterFormValues } from "@/schemas/talent/talentRegisterSchema";

// API 함수들
import { createProfile, updateMyProfile } from "@/lib/api/profiles";
import { createEducation } from "@/lib/api/educations";
import { createExperience } from "@/lib/api/experiences";
import { createLanguage } from "@/lib/api/languages";
import { createCertification } from "@/lib/api/certifications";
import { createAward } from "@/lib/api/awards";
import { updateMyExpTags } from "@/lib/api/expTags";
import { updateJobs } from "@/lib/api/jobs";

interface SubmitTalentRegisterParams {
  values: TalentRegisterFormValues;
  methods: UseFormReturn<TalentRegisterFormValues>;
  existingProfileId?: number;
}

/**
 * 인재 등록 폼 제출 핸들러
 *
 * @param params.values - React Hook Form의 폼 값
 * @param params.methods - React Hook Form의 메서드 (formState 접근용)
 * @param params.existingProfileId - 기존 프로필 ID (있으면 PUT, 없으면 POST)
 * @returns 성공 시 { success: true }, 실패 시 { success: false, error }
 */
export async function submitTalentRegister({
  values,
  methods,
  existingProfileId,
}: SubmitTalentRegisterParams): Promise<{ success: boolean; error?: unknown }> {
  const { dirtyFields } = methods.formState;

  try {
    // 1. 프로필 생성 또는 수정 (최우선 호출)
    const profilePayload = {
      name: values.profile.name,
      introduction: values.profile.introduction || "",
      storageUrl: values.links.portfolio || "", // 포트폴리오 URL
      likelionCode: values.likelion.code,
      visibility: "PUBLIC" as const,
    };

    let profileResponse;

    if (existingProfileId) {
      // ✅ 프로필이 이미 존재 → PUT 요청
      profileResponse = await updateMyProfile(profilePayload);
      console.log("프로필 수정 완료:", profileResponse.id);
    } else {
      // ✅ 프로필이 없음 → POST 요청
      profileResponse = await createProfile(profilePayload);
      console.log("프로필 생성 완료:", profileResponse.id);
    }

    // 2. 나머지 병렬 저장
    const parallelPromises: Promise<unknown>[] = [];

    // 직무 카테고리 (PUT)
    if (dirtyFields.job?.category || dirtyFields.job?.role) {
      // TODO: job.category, job.role을 job-categories API 형식으로 매핑
      // parallelPromises.push(updateMyJobs([{ id: 0, name: values.job.category }]));
    }

    // 경험 태그 (PUT)
    if (dirtyFields.job?.experiences) {
      // TODO: job.experiences를 exp-tags API 형식으로 매핑
      // parallelPromises.push(updateMyExpTags([...]));
    }

    // 학력 (POST)
    if (dirtyFields.education) {
      // TODO: education 필드를 educations API 형식으로 매핑
      // parallelPromises.push(createEducation({...}));
    }

    // 경력 (POST)
    if (dirtyFields.career) {
      // TODO: career 필드를 experiences API 형식으로 매핑
      // parallelPromises.push(createExperience({...}));
    }

    // 수상/활동 (POST)
    if (dirtyFields.activities) {
      // TODO: activities 배열을 awards API 형식으로 매핑
      // values.activities?.forEach(activity => {...});
    }

    // 언어 (POST)
    if (dirtyFields.languages) {
      // TODO: languages 배열을 languages API 형식으로 매핑
      // values.languages?.forEach(lang => {...});
    }

    // 자격증 (POST)
    if (dirtyFields.certificates) {
      // TODO: certificates 배열을 certifications API 형식으로 매핑
      // values.certificates?.forEach(cert => {...});
    }

    // 링크 (POST /profile/me/links/{type})
    if (dirtyFields.links) {
      // TODO: links를 profile-links API 형식으로 매핑
    }

    // 병렬 호출 실행
    if (parallelPromises.length > 0) {
      await Promise.all(parallelPromises);
    }

    console.log("인재 등록 완료!");
    // TODO: 성공 시 리다이렉트 또는 토스트 메시지
    return { success: true };
  } catch (error) {
    console.error("인재 등록 실패:", error);
    // TODO: 에러 처리 (ApiError 타입 체크)
    return { success: false, error };
  }
}

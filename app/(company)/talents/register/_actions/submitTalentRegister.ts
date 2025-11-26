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
import { createEducations } from "@/lib/api/educations";
import { createExperiences } from "@/lib/api/experiences";
import { createLanguages } from "@/lib/api/languages";
import { createCertifications } from "@/lib/api/certifications";
import { createAwards } from "@/lib/api/awards";
import { updateMyExpTags } from "@/lib/api/expTags";
import { updateJobs } from "@/lib/api/jobs";
import { updateMySkills } from "@/lib/api/skills";
import { SKILL_OPTIONS } from "@/constants/skills";
import {
  presignThumbnail,
  uploadThumbnailToS3,
  upsertMyThumbnailLink,
  upsertMyProfileLink,
} from "@/lib/api/profileThumbnail";

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
    // 0. 프로필 사진 업로드 (프로필 생성보다 먼저 처리)
    if (dirtyFields.profile?.avatar && values.profile.avatar instanceof File) {
      const file = values.profile.avatar;

      // Presign URL 발급
      const presignResponse = await presignThumbnail({
        originalFilename: file.name,
        contentType: file.type,
      });

      // S3에 업로드
      await uploadThumbnailToS3(presignResponse.uploadUrl, file);

      // 프로필 링크 저장 (API spec: 배열 형식)
      await upsertMyThumbnailLink({
        type: "THUMBNAIL",
        url: presignResponse.fileUrl,
        originalFilename: file.name,
        contentType: file.type,
        fileSize: file.size,
      });

      console.log("프로필 사진 업로드 완료:", presignResponse.fileUrl);
    }

    // 1. 프로필 생성 또는 수정 (최우선 호출)
    const profilePayload = {
      name: values.profile.name,
      introduction: values.profile.introduction || "",
      storageUrl: values.portfolio || "", // 포트폴리오 URL
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
      // parallelPromises.push(updateJobs([{ id: 0, name: values.job.category }]));
    }

    // 경험 태그 (PUT)
    if (dirtyFields.job?.experiences) {
      // TODO: job.experiences를 exp-tags API 형식으로 매핑
      // parallelPromises.push(updateMyExpTags([...]));
    }

    // 스킬 (PUT) - 배열
    if (dirtyFields.skills?.main && values.skills.main && values.skills.main.length > 0) {
      // skill name을 skill id로 변환
      const skillIds = values.skills.main
        .map((skillName) => {
          const skill = SKILL_OPTIONS.find((s) => s.name === skillName);
          return skill?.id;
        })
        .filter((id): id is number => id !== undefined);

      if (skillIds.length > 0) {
        parallelPromises.push(updateMySkills({ ids: skillIds }));
      }
    }

    // 학력 (POST) - 배열
    if (dirtyFields.education && values.education.schoolName) {
      const educations = [
        {
          schoolName: values.education.schoolName,
          major: values.education.major,
          status: values.education.status,
          startDate: values.education.startDate,
          endDate: values.education.endDate,
          description: values.education.description,
          degree: values.education.degree,
        },
      ];
      parallelPromises.push(createEducations(educations));
    }

    // 경력 (POST) - 배열
    if (dirtyFields.career && values.career.companyName) {
      const experiences = [
        {
          companyName: values.career.companyName,
          department: values.career.department,
          position: values.career.position,
          startDate: values.career.startDate || "",
          endDate: values.career.endDate,
          isCurrent: values.career.isCurrent || false,
          description: values.career.description,
        },
      ];
      parallelPromises.push(createExperiences(experiences));
    }

    // 수상/활동 (POST) - 배열
    if (dirtyFields.activities && values.activities && values.activities.length > 0) {
      const awards = values.activities
        .filter((activity) => activity.title || activity.organization)
        .map((activity) => ({
          title: activity.title || "",
          organization: activity.organization || "",
          awardDate: activity.awardDate || "",
          description: activity.description || "",
        }));

      if (awards.length > 0) {
        parallelPromises.push(createAwards(awards));
      }
    }

    // 언어 (POST) - 배열
    if (dirtyFields.languages && values.languages && values.languages.length > 0) {
      const languages = values.languages
        .filter((lang) => lang.languageName || lang.level)
        .map((lang) => ({
          languageName: lang.languageName || "",
          level: lang.level || "",
          issueDate: lang.issueDate || "",
        }));

      if (languages.length > 0) {
        parallelPromises.push(createLanguages(languages));
      }
    }

    // 자격증 (POST) - 배열
    if (dirtyFields.certificates && values.certificates && values.certificates.length > 0) {
      const certifications = values.certificates
        .filter((cert) => cert.name || cert.issuer)
        .map((cert) => ({
          name: cert.name || "",
          issuer: cert.issuer || "",
          issueDate: cert.issueDate || "",
        }));

      if (certifications.length > 0) {
        parallelPromises.push(createCertifications(certifications));
      }
    }

    // 링크 (POST /profile/me/links/{type})
    if (dirtyFields.links && values.links && values.links.length > 0) {
      const validLinks = values.links.filter((link) => link.url && link.url.trim() !== "");

      // 각 링크를 개별적으로 저장 (타입: LINK)
      for (const link of validLinks) {
        if (!link.url) continue; // TypeScript 타입 가드

        parallelPromises.push(
          upsertMyProfileLink(
            "LINK",
            {
              type: "LINK",
              url: link.url,
              originalFilename: "", // URL 링크는 파일명 없음
              contentType: "text/uri-list", // URI 목록 MIME 타입
              fileSize: 0,
            },
            link.id ? "PUT" : "POST" // ID가 있으면 수정, 없으면 생성
          )
        );
      }
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

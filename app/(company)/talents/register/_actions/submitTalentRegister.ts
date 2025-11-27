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
import type { QueryClient } from "@tanstack/react-query";

// API 함수들
import { createProfile, updateMyProfile } from "@/lib/api/profiles";
import { createEducations, updateEducation } from "@/lib/api/educations";
import { createExperiences, updateExperience } from "@/lib/api/experiences";
import { createLanguages, updateLanguage } from "@/lib/api/languages";
import { createCertifications, updateCertification } from "@/lib/api/certifications";
import { createAwards, updateAward } from "@/lib/api/awards";
import { updateMyExpTags } from "@/lib/api/expTags";
import { updateJobs } from "@/lib/api/jobs";
import { updateMySkills } from "@/lib/api/skills";
import { updateProfileLink } from "@/lib/api/profileThumbnail";
import { SKILL_OPTIONS } from "@/constants/skills";
import { EXP_TAG_ID_MAP, type ExpTagKey } from "@/lib/expTags/map";
import { findJobGroupByCode, findJobRoleByCode } from "@/constants/jobMapping";
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
    // 1. 프로필 생성 또는 수정 (최우선 호출 - 프로필이 생성되어야 다른 데이터를 저장할 수 있음)
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
    } else {
      // ✅ 프로필이 없음 → POST 요청
      profileResponse = await createProfile(profilePayload);
    }

    // 2. 프로필 사진 업로드 (프로필 생성 후 처리)
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
    }

    // 3. 나머지 병렬 저장
    const parallelPromises: Promise<unknown>[] = [];

    // 직무 카테고리 (PUT)
    if (dirtyFields.job?.category || dirtyFields.job?.role) {
      const jobIds: number[] = [];

      // 직군 ID 추가
      if (values.job.category) {
        const jobGroup = findJobGroupByCode(values.job.category);
        if (jobGroup) {
          jobIds.push(jobGroup.id);
        }
      }

      // 직무 ID 추가
      if (values.job.role) {
        const jobRoleResult = findJobRoleByCode(values.job.role);
        if (jobRoleResult) {
          jobIds.push(jobRoleResult.role.id);
        }
      }

      if (jobIds.length > 0) {
        parallelPromises.push(updateJobs({ ids: jobIds }));
      }
    }

    // 경험 태그 (PUT)
    if (
      dirtyFields.job?.experiences &&
      values.job.experiences &&
      values.job.experiences.length > 0
    ) {
      // 문자열 키를 숫자 ID로 변환
      const expTagIds = values.job.experiences
        .map((key) => EXP_TAG_ID_MAP[key as ExpTagKey])
        .filter((id) => id !== undefined);

      if (expTagIds.length > 0) {
        parallelPromises.push(updateMyExpTags({ ids: expTagIds }));
      }
    }

    // 스킬 (PUT) - 배열
    // 주의: Skills는 {ids: [id1, id2, ...]} 형식으로 전송하며, DELETE 요청이 없음
    // 모든 스킬을 한번에 보내서 덮어씀
    //
    // 중요: dirtyFields.skills?.main만으로는 배열 길이 변화(삭제)를 감지하지 못함
    // → values.skills.main이 존재하면 항상 API 호출 (삭제 감지 위해)
    const skillsChanged =
      dirtyFields.skills?.main || (values.skills?.main && values.skills.main.length > 0);

    if (skillsChanged) {
      // 기존 스킬 (id가 있는 것) + 신규 스킬 (name으로 조회한 id) 통합
      const skillIds: number[] = [];

      values.skills?.main?.forEach((skill) => {
        const skillItem = skill as { id?: number; name: string };
        // 기존 스킬: id가 있으면 그대로 사용
        if (skillItem.id !== undefined) {
          skillIds.push(skillItem.id);
        } else if (skillItem.name && skillItem.name.trim() !== "") {
          // 신규 스킬: name을 SKILL_OPTIONS에서 조회하여 id로 변환
          const foundSkill = SKILL_OPTIONS.find((s) => s.name === skillItem.name);
          if (foundSkill?.id) {
            skillIds.push(foundSkill.id);
          }
        }
      });

      // 빈 문자열 필드는 제외
      const validSkillIds = skillIds.filter((id) => id !== undefined);

      if (validSkillIds.length > 0) {
        parallelPromises.push(updateMySkills({ ids: validSkillIds }));
      }
    }

    // 학력 (POST/PUT) - 배열
    // id가 있으면 PUT으로 개별 수정, 없으면 POST로 일괄 생성
    // 주의: dirtyFields.educations는 배열 길이 변화(삭제)를 감지하지 못함
    // → values.educations이 존재하면 항상 체크 (삭제 감지 위해)
    if (values.educations && values.educations.length > 0) {
      const validEducations = values.educations.filter(
        (edu) => edu.schoolName || edu.major || edu.degree
      );

      if (validEducations.length > 0) {
        // 기존 학력 (id가 있는 것)과 신규 학력 (id가 없는 것) 분리
        const existingEducations = validEducations.filter((edu) => edu.id);
        const newEducations = validEducations.filter((edu) => !edu.id);

        // 기존 학력: 각각 PUT 요청 (id 값이 동일하거나 변경된 경우)
        existingEducations.forEach((edu) => {
          if (edu.id) {
            parallelPromises.push(
              updateEducation(edu.id, {
                schoolName: edu.schoolName || "",
                major: edu.major,
                status: edu.status,
                startDate: edu.startDate,
                endDate: edu.endDate,
                description: edu.description,
                degree: edu.degree,
              })
            );
          }
        });

        // 신규 학력: POST 배열 요청
        if (newEducations.length > 0) {
          parallelPromises.push(
            createEducations(
              newEducations.map((edu) => ({
                schoolName: edu.schoolName || "",
                major: edu.major,
                status: edu.status,
                startDate: edu.startDate,
                endDate: edu.endDate,
                description: edu.description,
                degree: edu.degree,
              }))
            )
          );
        }
      }
    }

    // 경력 (POST/PUT) - 배열
    // id가 있으면 PUT으로 개별 수정, 없으면 POST로 일괄 생성
    // 주의: dirtyFields.careers는 배열 길이 변화(삭제)를 감지하지 못함
    // → values.careers이 존재하면 항상 체크 (삭제 감지 위해)
    if (values.careers && values.careers.length > 0) {
      const validCareers = values.careers.filter((career) => career.companyName || career.position);

      if (validCareers.length > 0) {
        // 기존 경력 (id가 있는 것)과 신규 경력 (id가 없는 것) 분리
        const existingCareers = validCareers.filter((career) => career.id);
        const newCareers = validCareers.filter((career) => !career.id);

        // 기존 경력: 각각 PUT 요청 (id 값이 동일하거나 변경된 경우)
        existingCareers.forEach((career) => {
          if (career.id) {
            parallelPromises.push(
              updateExperience(career.id, {
                companyName: career.companyName || "",
                department: career.department,
                position: career.position,
                startDate: career.startDate || "",
                endDate: career.endDate,
                isCurrent: career.isCurrent || false,
                description: career.description,
              })
            );
          }
        });

        // 신규 경력: POST 배열 요청
        if (newCareers.length > 0) {
          parallelPromises.push(
            createExperiences(
              newCareers.map((career) => ({
                companyName: career.companyName || "",
                department: career.department,
                position: career.position,
                startDate: career.startDate || "",
                endDate: career.endDate,
                isCurrent: career.isCurrent || false,
                description: career.description,
              }))
            )
          );
        }
      }
    }

    // 수상/활동 (POST/PUT) - 배열
    // id가 있으면 PUT으로 개별 수정, 없으면 POST로 일괄 생성
    // 주의: dirtyFields.activities는 배열 길이 변화(삭제)를 감지하지 못함
    // → values.activities이 존재하면 항상 체크 (삭제 감지 위해)
    if (values.activities && values.activities.length > 0) {
      const validActivities = values.activities.filter(
        (activity) => activity.title || activity.organization
      );

      if (validActivities.length > 0) {
        // 기존 활동 (id가 있는 것)과 신규 활동 (id가 없는 것) 분리
        const existingActivities = validActivities.filter((activity) => activity.id);
        const newActivities = validActivities.filter((activity) => !activity.id);

        // 기존 활동: 각각 PUT 요청 (id 값이 동일하거나 변경된 경우)
        existingActivities.forEach((activity) => {
          if (activity.id) {
            parallelPromises.push(
              updateAward(activity.id, {
                title: activity.title || "",
                organization: activity.organization || "",
                awardDate: activity.awardDate || "",
                description: activity.description || "",
              })
            );
          }
        });

        // 신규 활동: POST 배열 요청
        if (newActivities.length > 0) {
          parallelPromises.push(
            createAwards(
              newActivities.map((activity) => ({
                title: activity.title || "",
                organization: activity.organization || "",
                awardDate: activity.awardDate || "",
                description: activity.description || "",
              }))
            )
          );
        }
      }
    }

    // 언어 (POST/PUT) - 배열
    // id가 있으면 PUT으로 개별 수정, 없으면 POST로 일괄 생성
    // 주의: dirtyFields.languages는 배열 길이 변화(삭제)를 감지하지 못함
    // → values.languages이 존재하면 항상 체크 (삭제 감지 위해)
    if (values.languages && values.languages.length > 0) {
      const validLanguages = values.languages.filter((lang) => lang.languageName || lang.level);

      if (validLanguages.length > 0) {
        // 기존 언어 (id가 있는 것)과 신규 언어 (id가 없는 것) 분리
        const existingLanguages = validLanguages.filter((lang) => lang.id);
        const newLanguages = validLanguages.filter((lang) => !lang.id);

        // 기존 언어: 각각 PUT 요청 (id 값이 동일하거나 변경된 경우)
        existingLanguages.forEach((lang) => {
          if (lang.id) {
            parallelPromises.push(
              updateLanguage(lang.id, {
                languageName: lang.languageName || "",
                level: lang.level || "",
                issueDate: lang.issueDate || "",
              })
            );
          }
        });

        // 신규 언어: POST 배열 요청
        if (newLanguages.length > 0) {
          parallelPromises.push(
            createLanguages(
              newLanguages.map((lang) => ({
                languageName: lang.languageName || "",
                level: lang.level || "",
                issueDate: lang.issueDate || "",
              }))
            )
          );
        }
      }
    }

    // 자격증 (POST/PUT) - 배열
    // id가 있으면 PUT으로 개별 수정, 없으면 POST로 일괄 생성
    // 주의: dirtyFields.certificates는 배열 길이 변화(삭제)를 감지하지 못함
    // → values.certificates이 존재하면 항상 체크 (삭제 감지 위해)
    if (values.certificates && values.certificates.length > 0) {
      const validCertificates = values.certificates.filter((cert) => cert.name || cert.issuer);

      if (validCertificates.length > 0) {
        // 기존 자격증 (id가 있는 것)과 신규 자격증 (id가 없는 것) 분리
        const existingCertificates = validCertificates.filter((cert) => cert.id);
        const newCertificates = validCertificates.filter((cert) => !cert.id);

        // 기존 자격증: 각각 PUT 요청 (id 값이 동일하거나 변경된 경우)
        existingCertificates.forEach((cert) => {
          if (cert.id) {
            parallelPromises.push(
              updateCertification(cert.id, {
                name: cert.name || "",
                issuer: cert.issuer || "",
                issueDate: cert.issueDate || "",
              })
            );
          }
        });

        // 신규 자격증: POST 배열 요청
        if (newCertificates.length > 0) {
          parallelPromises.push(
            createCertifications(
              newCertificates.map((cert) => ({
                name: cert.name || "",
                issuer: cert.issuer || "",
                issueDate: cert.issueDate || "",
              }))
            )
          );
        }
      }
    }

    // 링크 (POST/PUT) - 배열
    // id가 있으면 PUT으로 개별 수정, 없으면 POST로 일괄 생성
    // 주의: dirtyFields.links는 배열 길이 변화(삭제)를 감지하지 못함
    // → values.links이 존재하면 항상 체크 (삭제 감지 위해)
    if (values.links && values.links.length > 0) {
      const validLinks = values.links.filter((link) => link.url && link.url.trim() !== "");

      if (validLinks.length > 0) {
        // 기존 링크 (id가 있는 것)과 신규 링크 (id가 없는 것) 분리
        const existingLinks = validLinks.filter((link) => link.id);
        const newLinks = validLinks.filter((link) => !link.id);

        // 기존 링크: 각각 PUT 요청 (id 값이 동일하거나 변경된 경우)
        existingLinks.forEach((link) => {
          if (link.id) {
            parallelPromises.push(
              updateProfileLink(link.id, {
                url: link.url || "",
                originalFilename: link.originalFilename || "text/uri",
                contentType: link.contentType || "text/uri-list",
                fileSize: link.fileSize || 0,
              })
            );
          }
        });

        // 신규 링크: 개별 POST 요청 (타입: LINK)
        for (const link of newLinks) {
          if (!link.url) continue;

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
              "POST" // 신규 링크는 POST
            )
          );
        }
      }
    }

    // 병렬 호출 실행
    if (parallelPromises.length > 0) {
      await Promise.all(parallelPromises);
    }

    // TODO: 성공 시 리다이렉트 또는 토스트 메시지
    return { success: true };
  } catch (error) {
    // TODO: 에러 처리 (ApiError 타입 체크)
    return { success: false, error };
  }
}

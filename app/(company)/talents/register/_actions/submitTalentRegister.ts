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
import { createEducations, updateEducation } from "@/lib/api/educations";
import { createExperiences, updateExperience } from "@/lib/api/experiences";
import { createLanguages, updateLanguage } from "@/lib/api/languages";
import { createCertifications, updateCertification } from "@/lib/api/certifications";
import { createAwards, updateAward } from "@/lib/api/awards";
import { updateMyExpTags } from "@/lib/api/expTags";
import { updateJobs } from "@/lib/api/jobs";
import { updateMyCustomSkills } from "@/lib/api/customSkills";
import { EXP_TAG_ID_MAP, type ExpTagKey } from "@/lib/expTags/map";
import { findJobRoleByCode } from "@/constants/jobMapping";
import {
  presignThumbnail,
  uploadThumbnailToS3,
  upsertMyThumbnailLink,
  upsertMyProfileLink,
} from "@/lib/api/profileThumbnail";
import { presignPortfolio, uploadPortfolioToS3 } from "@/lib/api/profilePortfolio";
import { submitWorkDrivenTest } from "@/lib/api/workDriven";

interface SubmitTalentRegisterParams {
  values: TalentRegisterFormValues;
  methods: UseFormReturn<TalentRegisterFormValues>;
  existingProfileId?: number;
  isTempSave?: boolean; // 임시 저장 여부 (true: validation 우회, false: 최종 제출)
}

/**
 * yyyy-mm 형식을 yyyy-mm-dd 형식으로 변환
 * @param dateString - yyyy-mm 형식의 날짜 문자열
 * @returns yyyy-mm-dd 형식의 날짜 문자열 (빈 값이면 undefined)
 */
function convertMonthToFullDate(dateString?: string): string | undefined {
  if (!dateString || dateString.trim() === "") {
    return undefined;
  }
  // yyyy-mm 형식이면 -01 추가
  if (/^\d{4}-\d{2}$/.test(dateString)) {
    return `${dateString}-01`;
  }
  // 이미 yyyy-mm-dd 형식이면 그대로 반환
  return dateString;
}

/**
 * yyyy-mm-dd 형식을 yyyy-mm 형식으로 변환
 * @param dateString - yyyy-mm-dd 형식의 날짜 문자열
 * @returns yyyy-mm 형식의 날짜 문자열 (빈 값이면 빈 문자열)
 */
function convertFullDateToMonth(dateString?: string | null): string {
  if (!dateString || dateString.trim() === "") {
    return "";
  }
  // yyyy-mm-dd 형식이면 yyyy-mm만 추출
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return dateString.substring(0, 7); // "2025-01-01" → "2025-01"
  }
  // 이미 yyyy-mm 형식이면 그대로 반환
  return dateString;
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
  isTempSave = false,
}: SubmitTalentRegisterParams): Promise<{
  success: boolean;
  error?: unknown;
  data?: TalentRegisterFormValues;
  isTempSave?: boolean;
}> {
  const { dirtyFields } = methods.formState;
  const updatedValues = JSON.parse(JSON.stringify(values)) as TalentRegisterFormValues;

  try {
    // 1. 프로필 생성 또는 수정 (최우선 호출 - 프로필이 생성되어야 다른 데이터를 저장할 수 있음)
    const profilePayload = {
      name: values.profile.name,
      introduction: values.profile.introduction || "",
      storageUrl: values.portfolio || "", // 포트폴리오 URL
      likelionCode: values.likelion.code,
      visibility: "PUBLIC" as const,
    };

    // let profileResponse;
    // await createProfile(profilePayload);
    // if (existingProfileId) {
    //   // ✅ 프로필이 이미 존재 → PUT 요청
    await updateMyProfile(profilePayload);
    // } else {
    // ✅ 프로필이 없음 → POST 요청
    //   profileResponse =
    // }

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

    // 3. 포트폴리오 PDF 업로드 (프로필 생성 후 처리)
    if (dirtyFields.portfolioFile && values.portfolioFile instanceof File) {
      const file = values.portfolioFile;

      // Presign URL 발급
      const presignResponse = await presignPortfolio({
        originalFilename: file.name,
        contentType: file.type,
      });

      // S3에 업로드
      await uploadPortfolioToS3(presignResponse.uploadUrl, file);

      // 프로필 링크 저장 (API spec: 배열 형식)
      await upsertMyProfileLink(
        "PORTFOLIO",
        {
          type: "PORTFOLIO",
          url: presignResponse.fileUrl,
          originalFilename: file.name,
          contentType: file.type,
          fileSize: file.size,
        },
        "PUT"
      );
    }

    // 4. 나머지 병렬 저장
    const parallelPromises: Promise<unknown>[] = [];

    // 직무 카테고리 (PUT)
    // 직무(job role) ID만 전송 (직군은 직무에 포함되어 있으므로 불필요)
    if (dirtyFields.job?.category || dirtyFields.job?.role) {
      // 직무 ID만 추가
      if (values.job.role) {
        const jobRoleResult = findJobRoleByCode(values.job.role);
        if (jobRoleResult) {
          parallelPromises.push(updateJobs({ ids: [jobRoleResult.role.id] }));
        }
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

    // 커스텀 스킬 (PUT) - 배열
    // 주의: Custom Skills는 {customSkills: [name1, name2, ...]} 형식으로 전송하며, DELETE 요청이 없음
    // 모든 커스텀 스킬을 한번에 보내서 덮어씀
    //
    // 중요: Controller가 개별 필드(skills.main.0.name)로 등록되어 있어서
    // getValues('skills.main')을 사용해서 배열 전체를 가져옴
    const currentSkills = methods.getValues("skills.main" as any);

    // 개별 필드 값도 확인
    if (currentSkills && Array.isArray(currentSkills)) {
      currentSkills.forEach((_, idx) => {
        const fieldValue = methods.getValues(`skills.main.${idx}.name` as any);
      });
    }

    // 전체 formValues도 확인
    const allFormValues = methods.getValues();

    if (currentSkills && Array.isArray(currentSkills)) {
      // 스킬 이름 추출 (빈 문자열 제외)
      const skillNames: string[] = [];

      currentSkills.forEach((skill: any, idx: number) => {
        // Controller가 개별 name 필드로 등록되어 있어서 skill 자체가 string일 수 있음
        const skillName = typeof skill === "string" ? skill : skill?.name;
        if (skillName && skillName.trim() !== "") {
          skillNames.push(skillName);
        }
      });

      // 항상 API 호출 (빈 배열이라도 보내서 모든 스킬 삭제 처리)
      parallelPromises.push(updateMyCustomSkills({ customSkills: skillNames }));
    }

    // 학력 (POST/PUT) - 배열
    // 변경된 항목만 처리 (dirtyFields 대신 값 비교 사용)
    // dirtyFields는 배열 요소 삭제/이동 시 인덱스 문제로 정확하지 않을 수 있음
    if (values.educations && values.educations.length > 0) {
      const newEducationsToPost: { data: any; index: number }[] = [];
      const defaultEducations = methods.formState.defaultValues?.educations || [];

      values.educations.forEach((edu, index) => {
        // 유효하지 않은 데이터(빈 값)는 건너뜀
        if (!edu.schoolName && !edu.major && !edu.degree) {
          return;
        }

        if (edu.id) {
          // 기존 학력: defaultValues와 비교하여 변경된 경우만 PUT
          const originalEdu = Array.isArray(defaultEducations)
            ? defaultEducations.find((e) => e?.id === edu.id)
            : undefined;

          // 변경 여부 확인
          const isChanged =
            !originalEdu ||
            originalEdu.schoolName !== edu.schoolName ||
            originalEdu.major !== edu.major ||
            originalEdu.status !== edu.status ||
            originalEdu.startDate !== edu.startDate ||
            originalEdu.endDate !== edu.endDate ||
            originalEdu.description !== edu.description ||
            originalEdu.degree !== edu.degree;

          if (isChanged) {
            parallelPromises.push(
              updateEducation(Number(edu.id), {
                schoolName: edu.schoolName || "",
                major: edu.major,
                status: edu.status,
                startDate: convertMonthToFullDate(edu.startDate),
                endDate: convertMonthToFullDate(edu.endDate),
                description: edu.description,
                degree: edu.degree,
              }).then((updatedEdu) => {
                // 업데이트된 값 반영
                if (updatedValues.educations && updatedValues.educations[index]) {
                  updatedValues.educations[index] = {
                    ...updatedValues.educations[index],
                    id: updatedEdu.id,
                    schoolName: updatedEdu.schoolName,
                    major: updatedEdu.major || "",
                    status:
                      updatedEdu.status === "GRADUATED" ||
                      updatedEdu.status === "ENROLLED" ||
                      updatedEdu.status === "COMPLETED"
                        ? updatedEdu.status
                        : ("ENROLLED" as "ENROLLED" | "GRADUATED" | "COMPLETED"),
                    startDate: convertFullDateToMonth(updatedEdu.startDate),
                    endDate: convertFullDateToMonth(updatedEdu.endDate),
                    description: updatedEdu.description || "",
                    degree: updatedEdu.degree || "",
                  };
                }
              })
            );
          }
        } else {
          // 신규 학력: POST 요청을 위해 수집
          newEducationsToPost.push({
            data: {
              schoolName: edu.schoolName || "",
              major: edu.major,
              status: edu.status,
              startDate: convertMonthToFullDate(edu.startDate),
              endDate: convertMonthToFullDate(edu.endDate),
              description: edu.description,
              degree: edu.degree,
            },
            index,
          });
        }
      });

      // 신규 학력 일괄 POST
      if (newEducationsToPost.length > 0) {
        parallelPromises.push(
          createEducations(newEducationsToPost.map((item) => item.data)).then(
            (createdEducations) => {
              // 생성된 학력 ID 반영
              createdEducations.forEach((createdEdu, i) => {
                const originalIndex = newEducationsToPost[i].index;
                if (updatedValues.educations && updatedValues.educations[originalIndex]) {
                  updatedValues.educations[originalIndex] = {
                    ...updatedValues.educations[originalIndex],
                    id: createdEdu.id,
                    schoolName: createdEdu.schoolName,
                    major: createdEdu.major || "",
                    status:
                      createdEdu.status === "GRADUATED" ||
                      createdEdu.status === "ENROLLED" ||
                      createdEdu.status === "COMPLETED"
                        ? createdEdu.status
                        : ("ENROLLED" as "ENROLLED" | "GRADUATED" | "COMPLETED"),
                    startDate: convertFullDateToMonth(createdEdu.startDate),
                    endDate: convertFullDateToMonth(createdEdu.endDate),
                    description: createdEdu.description || "",
                    degree: createdEdu.degree || "",
                  };
                }
              });
            }
          )
        );
      }
    }

    // 경력 (POST/PUT) - 배열
    if (values.careers && values.careers.length > 0) {
      const newCareersToPost: { data: any; index: number }[] = [];
      const defaultCareers = methods.formState.defaultValues?.careers || [];

      values.careers.forEach((career, index) => {
        if (!career.companyName && !career.position) {
          return;
        }

        if (career.id) {
          // 기존 경력: defaultValues와 비교
          const originalCareer = Array.isArray(defaultCareers)
            ? defaultCareers.find((c) => c?.id === career.id)
            : undefined;

          const isChanged =
            !originalCareer ||
            originalCareer.companyName !== career.companyName ||
            originalCareer.department !== career.department ||
            originalCareer.position !== career.position ||
            originalCareer.startDate !== career.startDate ||
            originalCareer.endDate !== career.endDate ||
            originalCareer.isCurrent !== career.isCurrent ||
            originalCareer.description !== career.description;

          if (isChanged) {
            parallelPromises.push(
              updateExperience(Number(career.id), {
                companyName: career.companyName || "",
                department: career.department,
                position: career.position,
                startDate: convertMonthToFullDate(career.startDate) || "",
                endDate: convertMonthToFullDate(career.endDate),
                isCurrent: career.isCurrent || false,
                description: career.description,
              }).then((updatedCareer) => {
                if (updatedValues.careers && updatedValues.careers[index]) {
                  updatedValues.careers[index] = {
                    ...updatedValues.careers[index],
                    id: updatedCareer.id,
                    companyName: updatedCareer.companyName,
                    department: updatedCareer.department || "",
                    position: updatedCareer.position || "",
                    startDate: convertFullDateToMonth(updatedCareer.startDate),
                    endDate: convertFullDateToMonth(updatedCareer.endDate),
                    isCurrent: updatedCareer.isCurrent,
                    description: updatedCareer.description || "",
                  };
                }
              })
            );
          }
        } else {
          // 신규 경력
          newCareersToPost.push({
            data: {
              companyName: career.companyName || "",
              department: career.department,
              position: career.position,
              startDate: convertMonthToFullDate(career.startDate) || "",
              endDate: convertMonthToFullDate(career.endDate),
              isCurrent: career.isCurrent || false,
              description: career.description,
            },
            index,
          });
        }
      });

      if (newCareersToPost.length > 0) {
        parallelPromises.push(
          createExperiences(newCareersToPost.map((item) => item.data)).then((createdCareers) => {
            createdCareers.forEach((createdCareer, i) => {
              const originalIndex = newCareersToPost[i].index;
              if (updatedValues.careers && updatedValues.careers[originalIndex]) {
                updatedValues.careers[originalIndex] = {
                  ...updatedValues.careers[originalIndex],
                  id: createdCareer.id,
                  companyName: createdCareer.companyName,
                  department: createdCareer.department || "",
                  position: createdCareer.position || "",
                  startDate: convertFullDateToMonth(createdCareer.startDate),
                  endDate: convertFullDateToMonth(createdCareer.endDate),
                  isCurrent: createdCareer.isCurrent,
                  description: createdCareer.description || "",
                };
              }
            });
          })
        );
      }
    }

    // 수상/활동 (POST/PUT) - 배열
    if (values.activities && values.activities.length > 0) {
      const newActivitiesToPost: { data: any; index: number }[] = [];
      const defaultActivities = methods.formState.defaultValues?.activities || [];

      values.activities.forEach((activity, index) => {
        if (!activity.title) {
          return;
        }

        if (activity.id) {
          // 기존 활동: defaultValues와 비교
          const originalActivity = Array.isArray(defaultActivities)
            ? defaultActivities.find((a) => a?.id === activity.id)
            : undefined;

          const isChanged =
            !originalActivity ||
            originalActivity.title !== activity.title ||
            originalActivity.awardDate !== activity.awardDate ||
            originalActivity.description !== activity.description;

          if (isChanged) {
            parallelPromises.push(
              updateAward(Number(activity.id), {
                title: activity.title || "",
                organization: "default",
                awardDate: convertMonthToFullDate(activity.awardDate) || "",
                description: activity.description || "",
              }).then((updatedAward) => {
                if (updatedValues.activities && updatedValues.activities[index]) {
                  updatedValues.activities[index] = {
                    ...updatedValues.activities[index],
                    id: updatedAward.id,
                    title: updatedAward.title,
                    organization: updatedAward.organization,
                    awardDate: convertFullDateToMonth(updatedAward.awardDate),
                    description: updatedAward.description,
                  };
                }
              })
            );
          }
        } else {
          // 신규 활동
          newActivitiesToPost.push({
            data: {
              title: activity.title || "",
              organization: "default",
              awardDate: convertMonthToFullDate(activity.awardDate) || "",
              description: activity.description || "",
            },
            index,
          });
        }
      });

      if (newActivitiesToPost.length > 0) {
        parallelPromises.push(
          createAwards(newActivitiesToPost.map((item) => item.data)).then((createdAwards) => {
            createdAwards.forEach((createdAward, i) => {
              const originalIndex = newActivitiesToPost[i].index;
              if (updatedValues.activities && updatedValues.activities[originalIndex]) {
                updatedValues.activities[originalIndex] = {
                  ...updatedValues.activities[originalIndex],
                  id: createdAward.id,
                  title: createdAward.title,
                  organization: createdAward.organization,
                  awardDate: convertFullDateToMonth(createdAward.awardDate),
                  description: createdAward.description,
                };
              }
            });
          })
        );
      }
    }

    // 언어 (POST/PUT) - 배열
    if (values.languages && values.languages.length > 0) {
      const newLanguagesToPost: { data: any; index: number }[] = [];
      const defaultLanguages = methods.formState.defaultValues?.languages || [];

      values.languages.forEach((lang, index) => {
        if (!lang.languageName && !lang.level) {
          return;
        }

        if (lang.id) {
          // 기존 언어: defaultValues와 비교
          const originalLang = Array.isArray(defaultLanguages)
            ? defaultLanguages.find((l) => l?.id === lang.id)
            : undefined;

          const isChanged =
            !originalLang ||
            originalLang.languageName !== lang.languageName ||
            originalLang.level !== lang.level ||
            originalLang.issueDate !== lang.issueDate;

          if (isChanged) {
            parallelPromises.push(
              updateLanguage(Number(lang.id), {
                languageName: lang.languageName || "",
                level: lang.level || "",
                issueDate: convertMonthToFullDate(lang.issueDate) || "",
              }).then((updatedLang) => {
                if (updatedValues.languages && updatedValues.languages[index]) {
                  updatedValues.languages[index] = {
                    ...updatedValues.languages[index],
                    id: updatedLang.id,
                    languageName: updatedLang.languageName,
                    level: updatedLang.level,
                    issueDate: convertFullDateToMonth(updatedLang.issueDate),
                  };
                }
              })
            );
          }
        } else {
          // 신규 언어
          newLanguagesToPost.push({
            data: {
              languageName: lang.languageName || "",
              level: lang.level || "",
              issueDate: convertMonthToFullDate(lang.issueDate) || "",
            },
            index,
          });
        }
      });

      if (newLanguagesToPost.length > 0) {
        parallelPromises.push(
          createLanguages(newLanguagesToPost.map((item) => item.data)).then((createdLanguages) => {
            createdLanguages.forEach((createdLang, i) => {
              const originalIndex = newLanguagesToPost[i].index;
              if (updatedValues.languages && updatedValues.languages[originalIndex]) {
                updatedValues.languages[originalIndex] = {
                  ...updatedValues.languages[originalIndex],
                  id: createdLang.id,
                  languageName: createdLang.languageName,
                  level: createdLang.level,
                  issueDate: convertFullDateToMonth(createdLang.issueDate),
                };
              }
            });
          })
        );
      }
    }

    // 자격증 (POST/PUT) - 배열
    if (values.certificates && values.certificates.length > 0) {
      const newCertificatesToPost: { data: any; index: number }[] = [];
      const defaultCertificates = methods.formState.defaultValues?.certificates || [];

      values.certificates.forEach((cert, index) => {
        if (!cert.name) {
          return;
        }

        if (cert.id) {
          // 기존 자격증: defaultValues와 비교
          const originalCert = Array.isArray(defaultCertificates)
            ? defaultCertificates.find((c) => c?.id === cert.id)
            : undefined;

          const isChanged =
            !originalCert ||
            originalCert.name !== cert.name ||
            originalCert.issuer !== cert.issuer ||
            originalCert.issueDate !== cert.issueDate;

          if (isChanged) {
            parallelPromises.push(
              updateCertification(Number(cert.id), {
                name: cert.name || "",
                issuer: cert.issuer || "default",
                issueDate: convertMonthToFullDate(cert.issueDate) || "",
              }).then((updatedCert) => {
                if (updatedValues.certificates && updatedValues.certificates[index]) {
                  updatedValues.certificates[index] = {
                    ...updatedValues.certificates[index],
                    id: updatedCert.id,
                    name: updatedCert.name,
                    issuer: updatedCert.issuer || "default",
                    issueDate: convertFullDateToMonth(updatedCert.issueDate),
                  };
                }
              })
            );
          }
        } else {
          // 신규 자격증
          newCertificatesToPost.push({
            data: {
              name: cert.name || "",
              issuer: cert.issuer || "default",
              issueDate: convertMonthToFullDate(cert.issueDate) || "",
            },
            index,
          });
        }
      });

      if (newCertificatesToPost.length > 0) {
        parallelPromises.push(
          createCertifications(newCertificatesToPost.map((item) => item.data)).then(
            (createdCertificates) => {
              createdCertificates.forEach((createdCert, i) => {
                const originalIndex = newCertificatesToPost[i].index;
                if (updatedValues.certificates && updatedValues.certificates[originalIndex]) {
                  updatedValues.certificates[originalIndex] = {
                    ...updatedValues.certificates[originalIndex],
                    id: createdCert.id,
                    name: createdCert.name,
                    issuer: createdCert.issuer || "default",
                    issueDate: convertFullDateToMonth(createdCert.issueDate),
                  };
                }
              });
            }
          )
        );
      }
    }

    // 링크 (PUT) - 배열
    // type 기반으로 각 링크를 PUT /api/profile/me/links/{type}로 저장
    // 주의: dirtyFields.links는 배열 길이 변화(삭제)를 감지하지 못함
    // → values.links이 존재하면 항상 체크 (삭제 감지 위해)
    if (values.links && values.links.length > 0) {
      const validLinks = values.links.filter((link) => link.url && link.url.trim() !== "");

      // 각 링크를 PUT 요청으로 개별 저장
      for (const link of validLinks) {
        if (!link.type || !link.url) continue;

        parallelPromises.push(
          upsertMyProfileLink(
            link.type, // LINK, LINK2, LINK3, ...
            {
              type: link.type,
              url: link.url,
              originalFilename: "", // URL 링크는 파일명 없음
              contentType: "text/uri-list", // URI 목록 MIME 타입
              fileSize: 0,
            },
            "PUT" // type 기반 API는 PUT 사용
          )
        );
      }
    }

    // Work Driven 테스트 (POST)
    // workDrivenTest 객체의 q1~q16 값이 있으면 API 호출
    if (values.workDrivenTest) {
      const answers = [];

      // q1~q16을 questionId와 score로 변환
      for (let i = 1; i <= 16; i++) {
        const score = (values.workDrivenTest as any)[`q${i}`];
        if (score !== undefined && score !== null) {
          answers.push({
            questionId: i,
            score: score,
          });
        }
      }

      // 모든 질문에 답변이 있으면 API 호출
      if (answers.length === 16) {
        parallelPromises.push(submitWorkDrivenTest({ answers }));
      }
    }

    // 병렬 호출 실행
    if (parallelPromises.length > 0) {
      await Promise.all(parallelPromises);
    }

    // TODO: 성공 시 리다이렉트 또는 토스트 메시지
    return { success: true, data: updatedValues, isTempSave };
  } catch (error) {
    // TODO: 에러 처리 (ApiError 타입 체크)
    return { success: false, error, isTempSave };
  }
}

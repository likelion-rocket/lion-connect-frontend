/**
 * 인재 등록 폼 통합 Zod 스키마
 * talent-register-api SKILL 가이드 기반
 */

import { z } from "zod";

export const talentRegisterSchema = z.object({
  profile: z.object({
    avatar: z.any().nullable(),
    name: z.string().min(1, "이름은 필수입니다."),
    phone: z.string().min(1, "전화번호는 필수입니다."),
    email: z.string().email("이메일 형식이 올바르지 않습니다."),
    introduction: z.string().min(1, "간단 소개는 필수입니다."),
  }),
  job: z.object({
    category: z.string().min(1, "직군을 선택해 주세요."),
    role: z.string().min(1, "직무를 선택해 주세요."),
    experiences: z.array(z.string()).optional(),
  }),
  educations: z
    .array(
      z.object({
        id: z.number().optional(), // 기존 학력인 경우 id 존재 (수정 시 필요)
        schoolName: z.string().min(1, "학교명은 필수입니다."),
        major: z.string().min(1, "전공은 필수입니다."),
        status: z.enum(["ENROLLED", "GRADUATED", "COMPLETED"]),
        startDate: z.string().min(1, "시작일은 필수입니다."),
        endDate: z.string().min(1, "종료일은 필수입니다."),
        description: z.string().min(1, "설명은 필수입니다."),
        degree: z.string().min(1, "학위는 필수입니다."),
      })
    )
    .min(1, "최소 1개의 학력을 입력해주세요."),
  careers: z
    .array(
      z.object({
        id: z.number().optional(), // 기존 경력인 경우 id 존재 (삭제 시 필요)
        companyName: z.string().optional(),
        department: z.string().optional(),
        position: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        isCurrent: z.boolean().optional(),
        description: z.string().optional(),
      })
    )
    .optional(),
  skills: z.object({
    main: z
      .array(
        z.object({
          id: z.number().optional(), // 기존 스킬인 경우 id 존재 (수정/삭제 시 필요)
          name: z.string().optional(),
        })
      )
      .optional(),
  }),
  activities: z
    .array(
      z.object({
        id: z.number().optional(), // 기존 수상/활동인 경우 id 존재 (삭제 시 필요)
        title: z.string().optional(),
        organization: z.string().optional(),
        awardDate: z.string().optional(),
        description: z.string().optional(),
      })
    )
    .optional(),
  languages: z
    .array(
      z.object({
        id: z.number().optional(), // 기존 언어인 경우 id 존재 (삭제 시 필요)
        languageName: z.string().optional(),
        level: z.string().optional(),
        issueDate: z.string().optional(),
      })
    )
    .optional(),
  certificates: z
    .array(
      z.object({
        id: z.number().optional(), // 기존 자격증인 경우 id 존재 (삭제 시 필요)
        name: z.string().optional(),
        issuer: z.string().optional(),
        issueDate: z.string().optional(),
      })
    )
    .optional(),
  links: z
    .array(
      z.object({
        type: z.string(), // 링크 타입 (LINK, LINK2, LINK3, ...) - DELETE/PUT API에 필요
        url: z.string().url().optional().or(z.literal("")),
        originalFilename: z.string().optional(), // 파일명 (PUT 요청 시 필요)
        contentType: z.string().optional(), // MIME 타입 (PUT 요청 시 필요)
        fileSize: z.number().optional(), // 파일 크기 (PUT 요청 시 필요)
      })
    )
    .optional(),
  portfolio: z.string().optional().or(z.literal("")),
  portfolioFile: z.any().optional(),
  likelion: z.object({
    code: z.string().optional(),
  }),
  workDrivenTest: z.record(z.string(), z.number().min(1).max(5)).optional(),
});

export type TalentRegisterFormValues = z.infer<typeof talentRegisterSchema>;

/** 폼 기본값 */
export const defaultTalentRegisterValues: TalentRegisterFormValues = {
  profile: {
    avatar: null,
    name: "",
    phone: "",
    email: "",
    introduction: "",
  },
  job: {
    category: "",
    role: "",
    experiences: [],
  },
  educations: [
    {
      schoolName: "",
      major: "",
      status: "ENROLLED" as "ENROLLED" | "GRADUATED" | "COMPLETED",
      startDate: "",
      endDate: "",
      description: "",
      degree: "",
    },
  ],
  careers: [],
  skills: {
    main: [],
  },
  activities: [],
  languages: [],
  certificates: [],
  links: [],
  portfolio: "",
  portfolioFile: null,
  likelion: {
    code: "",
  },
  workDrivenTest: {},
};

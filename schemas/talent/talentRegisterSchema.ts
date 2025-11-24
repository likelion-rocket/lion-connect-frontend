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
    introduction: z.string().optional(),
  }),
  job: z.object({
    category: z.string().min(1, "직무를 선택해 주세요."),
    role: z.string().min(1, "직군을 선택해 주세요."),
    experiences: z.array(z.string()).optional(),
  }),
  education: z.object({
    schoolName: z.string().optional(),
    major: z.string().optional(),
    status: z.enum(["ENROLLED", "GRADUATED", "WITHDRAWN", "LEAVE_OF_ABSENCE"]).optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    description: z.string().optional(),
    degree: z.string().optional(),
  }),
  career: z.object({
    companyName: z.string().optional(),
    department: z.string().optional(),
    position: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    isCurrent: z.boolean().optional(),
    description: z.string().optional(),
  }),
  skills: z.object({
    main: z.array(z.string()).optional(),
  }),
  activities: z
    .array(
      z.object({
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
        languageName: z.string().optional(),
        level: z.string().optional(),
        issueDate: z.string().optional(),
      })
    )
    .optional(),
  certificates: z
    .array(
      z.object({
        name: z.string().optional(),
        issuer: z.string().optional(),
        issueDate: z.string().optional(),
      })
    )
    .optional(),
  links: z
    .array(
      z.object({
        id: z.number().optional(), // 기존 링크인 경우 id 존재 (삭제 시 필요)
        url: z.string().url().optional().or(z.literal("")),
      })
    )
    .optional(),
  portfolio: z.string().url().optional().or(z.literal("")),
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
  education: {
    schoolName: "",
    major: "",
    status: undefined,
    startDate: "",
    endDate: "",
    description: "",
    degree: "",
  },
  career: {
    companyName: "",
    department: "",
    position: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    description: "",
  },
  skills: {
    main: [],
  },
  activities: [{ title: "", organization: "", awardDate: "", description: "" }],
  languages: [{ languageName: "", level: "", issueDate: "" }],
  certificates: [{ name: "", issuer: "", issueDate: "" }],
  links: [{ url: "" }],
  portfolio: "",
  likelion: {
    code: "",
  },
  workDrivenTest: {},
};

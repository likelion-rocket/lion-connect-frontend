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
    school: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
  }),
  career: z.object({
    company: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    description: z.string().optional(),
  }),
  skills: z.object({
    main: z.array(z.string()).optional(),
  }),
  activities: z
    .array(
      z.object({
        title: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        description: z.string().optional(),
      })
    )
    .optional(),
  languages: z
    .array(
      z.object({
        name: z.string().optional(),
        acquiredAt: z.string().optional(),
      })
    )
    .optional(),
  certificates: z
    .array(
      z.object({
        name: z.string().optional(),
        acquiredAt: z.string().optional(),
      })
    )
    .optional(),
  links: z.object({
    general: z.string().url().optional().or(z.literal("")),
    portfolio: z.string().url().optional().or(z.literal("")),
  }),
  likelion: z.object({
    code: z.string().optional(),
  }),
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
    school: "",
    startDate: "",
    endDate: "",
  },
  career: {
    company: "",
    startDate: "",
    endDate: "",
    description: "",
  },
  skills: {
    main: [],
  },
  activities: [{ title: "", startDate: "", endDate: "", description: "" }],
  languages: [{ name: "", acquiredAt: "" }],
  certificates: [{ name: "", acquiredAt: "" }],
  links: {
    general: "",
    portfolio: "",
  },
  likelion: {
    code: "",
  },
};

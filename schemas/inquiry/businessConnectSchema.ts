import { z } from "zod";

export const businessConnectSchema = z.object({
  companyName: z.string().min(1, "회사명을 입력해주세요."),
  managerName: z.string().min(1, "담당자명을 입력해주세요."),
  department: z.string().min(1, "부서/직책을 입력해주세요."),
  email: z.string().min(1, "이메일을 입력해주세요.").email("올바른 이메일 형식이 아닙니다."),
  contact: z.string().min(1, "연락처를 입력해주세요."),
  message: z.string().min(1, "문의 내용을 입력해주세요."),
  agreePrivacy: z.boolean().refine((val) => val === true, {
    message: "개인정보 수집 및 이용에 동의해주세요.",
  }),
});

export type BusinessConnectFormData = z.infer<typeof businessConnectSchema>;

import { z } from "zod";

export const companyFormSchema = z.object({
  company: z.string().min(1, { message: "회사명을 입력하세요." }),
  period: z.string().min(1, { message: "근속 기간을 입력하세요." }),
  dept: z.string().min(1, { message: "부서/직무를 입력해주세요" }),
  role: z.string().min(1, { message: "직급/직책을 입력하세요." }),
  desc: z.string().min(1, { message: "담당 업무를 적어주세요." }),
});

export type CompanyFormType = z.infer<typeof companyFormSchema>;

// 배열 스키마 (여러 회사 입력)
export const companyArraySchema = z.array(companyFormSchema);
export type CompanyArrayType = z.infer<typeof companyArraySchema>;

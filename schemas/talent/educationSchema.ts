import { z } from "zod";

export const educationFormSchema = z.object({
  schoolName: z.string().min(1, { message: "학교명을 입력하세요." }),
  periodText: z.string().min(1, { message: "학부 기간을 입력하세요." }),
  status: z.string().min(1, { message: "졸업 상태를 선택하세요." }),
  major: z.string().min(1, { message: "전공을 입력하세요." }),
  description: z.string().optional(),
});

export type EducationFormType = z.infer<typeof educationFormSchema>;

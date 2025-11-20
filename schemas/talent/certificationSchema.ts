import { z } from "zod";

export const certificationFormSchema = z.object({
  title: z.string().min(1, { message: "자격증명을 입력하세요." }),
  issueDate: z
    .string()
    .min(1, { message: "취득월을 입력하세요." })
    .regex(/^\d{4}\.(0[1-9]|1[0-2])$/, { message: "형식은 YYYY.MM 입니다. 예) 2024.07" }),
});

export type CertificationFormType = z.infer<typeof certificationFormSchema>;

// 배열 스키마
export const certificationArraySchema = z.array(certificationFormSchema);
export type CertificationArrayType = z.infer<typeof certificationArraySchema>;

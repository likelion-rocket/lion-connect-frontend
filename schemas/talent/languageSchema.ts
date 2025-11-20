import { z } from "zod";

export const languageFormSchema = z.object({
  name: z.string().min(1, { message: "언어명을 입력하세요." }),
  issueDate: z
    .string()
    .min(1, { message: "취득월을 입력하세요." })
    .regex(/^\d{4}\.(0[1-9]|1[0-2])$/, { message: "형식은 YYYY.MM 입니다. 예) 2024.07" }),
});

export type LanguageFormType = z.infer<typeof languageFormSchema>;

// 배열 스키마
export const languageArraySchema = z.array(languageFormSchema);
export type LanguageArrayType = z.infer<typeof languageArraySchema>;

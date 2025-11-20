import { z } from "zod";

export const awardFormSchema = z.object({
  title: z.string().min(1, { message: "수상/활동명을 입력하세요" }),
  period: z
    .string()
    .min(1, { message: "수상/활동일을 입력하세요" })
    .regex(/^\d{4}\.(0[1-9]|1[0-2])$/, { message: "형식은 YYYY.MM 입니다. 예) 2024.07" }),
  desc: z.string().min(1, { message: "설명을 입력하세요" }),
});

export type AwardFormType = z.infer<typeof awardFormSchema>;

// 배열 스키마
export const awardArraySchema = z.array(awardFormSchema);
export type AwardArrayType = z.infer<typeof awardArraySchema>;

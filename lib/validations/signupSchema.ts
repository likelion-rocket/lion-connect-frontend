import { z } from "zod";

export const signupSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "이메일을 입력해주세요" })
      .email({ message: "유효한 이메일 주소를 입력해주세요" }),
    password: z
      .string()
      .min(1, { message: "비밀번호를 입력해주세요" })
      .min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다" })
      .regex(/[A-Z]/, { message: "비밀번호에 대문자를 포함해주세요" })
      .regex(/[0-9]/, { message: "비밀번호에 숫자를 포함해주세요" })
      .regex(/[!@#$%^&*]/, { message: "비밀번호에 특수문자(!@#$%^&*)를 포함해주세요" }),
    confirmPassword: z.string().min(1, { message: "비밀번호 확인을 입력해주세요" }),
    phone: z
      .string()
      .min(1, { message: "전화번호를 입력해주세요" })
      .regex(/^01[0-9]-?\d{3,4}-?\d{4}$/, { message: "유효한 전화번호를 입력해주세요" }),
    agreeTerms: z.boolean().refine((value) => value === true, {
      message: "회원가입에 동의해주세요",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["confirmPassword"],
  });

export type SignupSchemaType = z.infer<typeof signupSchema>;

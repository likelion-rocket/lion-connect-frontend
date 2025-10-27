import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "이메일을 입력해주세요" })
    .email({ message: "유효한 이메일 주소를 입력해주세요" }),
  password: z
    .string()
    .min(1, { message: "비밀번호를 입력해주세요" })
    .min(6, { message: "비밀번호는 최소 6자 이상이어야 합니다" }),
  rememberMe: z.boolean().optional(),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

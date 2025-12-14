// lib/validations/job.ts
import { z } from "zod";

/**
 * 채용 공고 폼 유효성 검증 스키마 (등록용)
 */
export const jobFormSchema = z.object({
  // 공고 노출 이미지
  images: z
    .array(z.instanceof(File))
    .min(1, "이미지를 최소 1개 이상 업로드해주세요")
    .max(5, "이미지는 최대 5개까지 업로드 가능합니다"),

  // 공고명
  title: z
    .string()
    .min(1, "공고명을 입력해주세요")
    .min(2, "공고명은 최소 2자 이상이어야 합니다")
    .max(100, "공고명은 최대 100자까지 입력 가능합니다"),

  // 고용 형태
  employmentType: z.enum(["FULL_TIME", "INTERN"], {
    message: "고용 형태를 선택해주세요",
  }),

  // 직무 ID
  jobRoleId: z
    .number({
      message: "직무를 선택해주세요",
    })
    .min(1, "직무를 선택해주세요"),

  // 회사/직무 소개
  description: z
    .string()
    .min(1, "회사/직무 소개를 입력해주세요")
    .max(2000, "회사/직무 소개는 최대 2000자까지 입력 가능합니다")
    .refine(
      (val) => !/https?:\/\//.test(val),
      "URL을 입력할 수 없습니다"
    ),

  // 주요 업무
  responsibilities: z
    .string()
    .min(1, "주요 업무를 입력해주세요")
    .max(2000, "주요 업무는 최대 2000자까지 입력 가능합니다")
    .refine(
      (val) => !/https?:\/\//.test(val),
      "URL을 입력할 수 없습니다"
    ),

  // 자격요건
  requirements: z
    .string()
    .min(1, "자격요건을 입력해주세요")
    .max(2000, "자격요건은 최대 2000자까지 입력 가능합니다"),

  // 우대사항
  preferredQualifications: z
    .string()
    .min(1, "우대사항을 입력해주세요")
    .max(2000, "우대사항은 최대 2000자까지 입력 가능합니다"),

  // 혜택 및 복지
  benefits: z
    .string()
    .min(1, "혜택 및 복지를 입력해주세요")
    .max(2000, "혜택 및 복지는 최대 2000자까지 입력 가능합니다"),

  // 채용 전형
  hiringProcess: z
    .string()
    .min(1, "채용 전형을 입력해주세요")
    .max(2000, "채용 전형은 최대 2000자까지 입력 가능합니다"),

  // 근무지
  location: z
    .string()
    .min(1, "근무지를 입력해주세요")
    .max(200, "근무지는 최대 200자까지 입력 가능합니다"),
});

/**
 * 채용 공고 수정용 스키마
 * - 수정 모드에서는 기존 이미지가 있으면 새 이미지 업로드가 선택사항
 */
export const jobFormEditSchema = jobFormSchema.extend({
  images: z
    .array(z.instanceof(File))
    .max(5, "이미지는 최대 5개까지 업로드 가능합니다")
    .default([]),
  // 기존 이미지 URL 추가 (validation에는 사용하지 않음)
  imageUrls: z.array(z.string()).optional(),
}).refine(
  (data) => {
    // 기존 이미지(imageUrls) + 새 이미지(images) 합쳐서 최소 1개 이상
    const totalImages = (data.imageUrls?.length || 0) + data.images.length;
    return totalImages >= 1;
  },
  {
    message: "이미지를 최소 1개 이상 업로드해주세요",
    path: ["images"],
  }
);

export type JobFormSchema = z.infer<typeof jobFormSchema>;
export type JobFormEditSchema = z.infer<typeof jobFormEditSchema>;

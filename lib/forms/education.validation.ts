// lib/forms/education.validation.ts
import { parseYYYYMMRange } from "@/lib/date/ym";
import type { EducationRequest } from "@/lib/api/educations";

export type EducationFormState = {
  schoolName: string;
  periodText: string; // "YYYY.MM - YYYY.MM"
  status: string;
  major: string;
  description: string;
};

export type EducationErrors = Partial<{
  schoolName: string;
  periodText: string;
  status: string;
  major: string;
  description: string; // 선택 필드면 안 써도 됨
}>;

export function hasAnyInput(f: EducationFormState): boolean {
  return (
    !!f.schoolName.trim() ||
    !!f.periodText.trim() ||
    !!f.status.trim() ||
    !!f.major.trim() ||
    !!f.description.trim()
  );
}

export function validateEducation(f: EducationFormState): EducationErrors {
  const errors: EducationErrors = {};
  if (!hasAnyInput(f)) return errors; // 섹션 전체 비었으면 검증 스킵

  if (!f.schoolName.trim()) errors.schoolName = "학교명을 입력해주세요.";

  if (!f.periodText.trim()) {
    errors.periodText = "재학 기간을 입력해주세요.";
  } else {
    const ok = /^\s*\d{4}\.\d{2}\s*-\s*\d{4}\.\d{2}\s*$/.test(f.periodText);
    if (!ok) errors.periodText = "재학 기간은 'YYYY.MM - YYYY.MM' 형식으로 입력해주세요.";
  }

  if (!f.status.trim()) errors.status = "졸업 상태를 입력해주세요.";
  if (!f.major.trim()) errors.major = "전공을 입력해주세요.";
  // description은 선택이라면 검증 안 함

  return errors;
}

export function buildEducationPayload(
  f: EducationFormState
): { shouldSubmit: false } | { shouldSubmit: true; payload: EducationRequest } {
  if (!hasAnyInput(f)) return { shouldSubmit: false };

  // periodText가 있다면 날짜 변환
  let startDate: string | undefined;
  let endDate: string | undefined;
  if (f.periodText.trim()) {
    const parsed = parseYYYYMMRange(f.periodText);
    if (parsed) {
      startDate = parsed.startDate;
      endDate = parsed.endDate;
    }
  }

  const trimOrUndef = (s: string) => (s.trim() ? s.trim() : undefined);

  return {
    shouldSubmit: true,
    payload: {
      schoolName: f.schoolName.trim(),
      status: trimOrUndef(f.status),
      major: trimOrUndef(f.major),
      description: trimOrUndef(f.description),
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
    },
  };
}

// lib/forms/education.validation.ts
import { parseYYYYMMRange } from "@/lib/date/ym";
import type { EducationRequest } from "@/lib/api/educations";

export type EducationFormState = {
  schoolName: string;
  periodText: string; // "YYYY.MM - YYYY.MM" 또는 "YYYY.MM - 재학|현재"
  status: string; // "졸업|수료|재학" 또는 "GRADUATED|COMPLETED|ENROLLED"
  major: string;
  description: string;
};

export type EducationErrors = Partial<{
  schoolName: string;
  periodText: string;
  status: string;
  major: string;
  description: string;
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

/** ✅ 한글 라벨/영문 코드 모두 허용 → 서버 enum 코드로 표준화 */
const KR_TO_CODE: Record<string, "GRADUATED" | "COMPLETED" | "ENROLLED"> = {
  졸업: "GRADUATED",
  수료: "COMPLETED",
  재학: "ENROLLED",
};
function normalizeStatusToCode(input: string | undefined) {
  const s = (input ?? "").trim();
  if (!s) return undefined;
  if (KR_TO_CODE[s]) return KR_TO_CODE[s];
  const up = s.toUpperCase();
  if (up === "GRADUATED" || up === "COMPLETED" || up === "ENROLLED") return up;
  return undefined;
}

export function validateEducation(f: EducationFormState): EducationErrors {
  const errors: EducationErrors = {};
  if (!hasAnyInput(f)) return errors; // 섹션 전체 비었으면 검증 스킵

  if (!f.schoolName.trim()) errors.schoolName = "학교명을 입력해주세요.";

  if (!f.periodText.trim()) {
    errors.periodText = "재학 기간을 입력해주세요.";
  } else {
    // "YYYY.MM - YYYY.MM" 또는 "YYYY.MM - 재학|현재" 허용
    const ok = /^\s*\d{4}\.\d{2}\s*-\s*(\d{4}\.\d{2}|재학|현재)\s*$/.test(f.periodText);
    if (!ok)
      errors.periodText =
        "재학 기간은 'YYYY.MM - YYYY.MM' 또는 'YYYY.MM - 재학' 형식으로 입력해주세요.";
  }

  const code = normalizeStatusToCode(f.status);
  if (!code) errors.status = "졸업/수료/재학 중에서 입력하거나 선택해주세요.";

  if (!f.major.trim()) errors.major = "전공을 입력해주세요.";
  return errors;
}

export function buildEducationPayload(
  f: EducationFormState
): { shouldSubmit: false } | { shouldSubmit: true; payload: EducationRequest } {
  if (!hasAnyInput(f)) return { shouldSubmit: false };

  const { startDate, endDate } = parseYYYYMMRange(f.periodText) ?? {};

  const statusCode = normalizeStatusToCode(f.status);
  const trimOrUndef = (s: string) => (s?.trim() ? s.trim() : undefined);

  return {
    shouldSubmit: true,
    payload: {
      schoolName: f.schoolName.trim(),
      status: statusCode, // ✅ 서버 enum 코드로 전송
      major: trimOrUndef(f.major),
      description: trimOrUndef(f.description),
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
    },
  };
}

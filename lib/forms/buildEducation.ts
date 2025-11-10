import { hasAny, normalizeStr, OptionalSubmit } from "./optionalSection";
import { parseYYYYMMRange } from "@/lib/date/ym";
import type { EducationRequest } from "@/lib/api/educations";

// 폼 상태 타입 (page.tsx의 상태들을 모은 형태)
export type EducationFormState = {
  schoolName: string;
  periodText: string; // "YYYY.MM - YYYY.MM"
  status: string;
  major: string;
  description: string;
};

/**
 * 선택 섹션: 학력
 * - 아무 것도 안 적었으면 shouldSubmit:false
 * - 뭔가 적었다면 최소 검증 후 payload 생성
 * - 날짜는 입력했을 때만 검증/전송 (API가 필수면 여기서 강제)
 */
export function buildEducationPayload(f: EducationFormState): OptionalSubmit<EducationRequest> {
  // 1) 섹션 전체가 비었는지 체크
  const any = hasAny([f.schoolName, f.periodText, f.status, f.major, f.description]);
  if (!any) return { shouldSubmit: false };

  // 2) 일부라도 입력됐다면 최소 검증
  const schoolName = normalizeStr(f.schoolName);
  if (!schoolName) {
    throw new Error("학교명을 입력해주세요.");
  }

  let startDate: string | undefined;
  let endDate: string | undefined;

  const periodText = normalizeStr(f.periodText);
  if (periodText) {
    const parsed = parseYYYYMMRange(periodText);
    if (!parsed) {
      throw new Error(
        "재학 기간을 'YYYY.MM - YYYY.MM' 형식으로 입력해주세요. (예: 2019.03 - 2023.02)"
      );
    }
    startDate = parsed.startDate;
    endDate = parsed.endDate;
  }

  // 3) payload 생성 (빈 문자열은 undefined로 정규화)
  const payload: EducationRequest = {
    schoolName,
    ...(normalizeStr(f.major) && { major: normalizeStr(f.major)! }),
    ...(normalizeStr(f.status) && { status: normalizeStr(f.status)! }),
    ...(startDate && { startDate }),
    ...(endDate && { endDate }),
    ...(normalizeStr(f.description) && { description: normalizeStr(f.description)! }),
  };

  return { shouldSubmit: true, payload };
}

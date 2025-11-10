// 값이 비었는지 판단 (문자열은 trim 기준)
export function isBlank(v: unknown): boolean {
  if (typeof v === "string") return v.trim().length === 0;
  return v === undefined || v === null;
}

// 섹션에 "하나라도 값이 있는지" 검사
export function hasAny(values: unknown[]): boolean {
  return values.some((v) => !isBlank(v));
}

// "빈 문자열 → undefined" 표준화
export function normalizeStr(v: string | undefined | null): string | undefined {
  if (v == null) return undefined;
  const t = v.trim();
  return t.length ? t : undefined;
}

// 선택 섹션 빌더 결과 타입
export type OptionalSubmit<T> = { shouldSubmit: false } | { shouldSubmit: true; payload: T };

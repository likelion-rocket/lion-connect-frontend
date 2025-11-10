// lib/date/ym.ts
/** "2025", "11" -> "2025-11-01" */
export function ymToYYYYMMDD(year: string, month: string) {
  const y = (year || "").trim();
  const m = (month || "").trim().padStart(2, "0");
  return `${y}-${m}-01`;
}

/** 개월 수 차이(음수 방지) */
export function diffInMonths(aYYYYMM: [string, string], bYYYYMM: [string, string]) {
  const [ay, am] = aYYYYMM.map((v) => parseInt(v || "0", 10));
  const [by, bm] = bYYYYMM.map((v) => parseInt(v || "0", 10));
  if (!ay || !am || !by || !bm) return 0;
  return Math.max(0, (by - ay) * 12 + (bm - am));
}

/** 0개월 -> "0년 0개월" */
export function monthsToKorLabel(total: number) {
  const y = Math.floor(total / 12);
  const m = total % 12;
  return `${y}년 ${m}개월`;
}

export function parseYYYYMMRange(input: string) {
  // 허용 포맷: "2021.03 - 2025.02" (공백 유연)
  const m = input.match(/^\s*(\d{4})\.(\d{2})\s*-\s*(\d{4})\.(\d{2})\s*$/);
  if (!m) return null;
  const [, sy, sm, ey, em] = m;
  const startDate = `${sy}-${sm}-01`;
  const endDate = `${ey}-${em}-01`; // 일(day)은 01로 고정
  return { startDate, endDate };
}

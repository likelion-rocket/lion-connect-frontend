// lib/date/ym.ts
// "YYYY.MM - YYYY.MM" 또는 "YYYY.MM - 재학|현재"를 파싱해
// startDate = 해당월 1일, endDate = 해당월 말일(또는 재학/현재면 undefined)로 반환
export function parseYYYYMMRange(text: string): { startDate: string; endDate?: string } | null {
  const raw = (text || "").trim();
  const m =
    raw.match(/^(\d{4})\.(\d{2})\s*-\s*(\d{4})\.(\d{2})$/) ||
    raw.match(/^(\d{4})\.(\d{2})\s*-\s*(재학|현재)$/);

  if (!m) return null;

  const toStart = (y: string, mm: string) => `${y}-${mm}-01`;
  const toEnd = (y: string, mm: string) => {
    const year = Number(y);
    const month = Number(mm); // 1~12
    const last = new Date(year, month, 0).getDate(); // 다음달 0일 = 말일
    const two = (n: number) => (n < 10 ? `0${n}` : `${n}`);
    return `${y}-${mm}-${two(last)}`;
  };

  // case 1: YYYY.MM - YYYY.MM
  if (m.length === 5) {
    const [, y1, m1, y2, m2] = m;
    return { startDate: toStart(y1, m1), endDate: toEnd(y2, m2) };
  }
  // case 2: YYYY.MM - 재학|현재
  if (m.length === 4) {
    const [, y1, m1] = m;
    return { startDate: toStart(y1, m1), endDate: undefined };
  }
  return null;
}

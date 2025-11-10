// lib/education/statusMap.ts
export type EduEnum = "ENROLLED" | "COMPLETED" | "GRADUATED";

const KO_FROM_ENUM: Record<EduEnum, string> = {
  ENROLLED: "재학",
  COMPLETED: "수료",
  GRADUATED: "졸업",
};

const ENUM_FROM_KO: Record<string, EduEnum> = {
  재학: "ENROLLED",
  수료: "COMPLETED",
  졸업: "GRADUATED",
};

export function enumToKo(v?: string | null): string {
  if (!v) return "";
  const key = v.toUpperCase() as EduEnum;
  return KO_FROM_ENUM[key] ?? "";
}

export function koToEnum(v?: string | null): EduEnum | undefined {
  if (!v) return undefined;
  const s = v.trim();
  if (!s) return undefined;

  // 한글 → enum
  if (ENUM_FROM_KO[s]) return ENUM_FROM_KO[s];

  // 이미 enum 이면 그대로
  const up = s.toUpperCase();
  if (up === "ENROLLED" || up === "COMPLETED" || up === "GRADUATED") {
    return up as EduEnum;
  }
  return undefined;
}

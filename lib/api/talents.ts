// lib/api/talents.ts

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

// 🔹 education 객체 타입 분리
export type TalentEducation = {
  schoolName: string;
  major: string;
};

// ───────────────── DTO 타입들 ─────────────────

export type TalentListItem = {
  id: number;
  name: string;
  introduction: string;
  experiences: string[];
  tendencies: string[];
  education: TalentEducation | null; // ← 응답 예시 기준
  jobRoles: string[];
  skills: string[];
  thumbnailUrl: string | null;
};

export type TalentListResponse = {
  totalElements: number;
  totalPages: number;
  size: number;
  content: TalentListItem[];
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  last: boolean;
  numberOfElements: number;
  pageable: {
    offset: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  empty: boolean;
};

type FetchTalentsParams = {
  page?: number;
  size?: number;
};
/**
 * 공개 인재 목록 조회 API
 * GET {BASE_URL}/profiles?page={page}&size={size}
 */
export async function fetchTalents({
  page = 0,
  size = 20,
}: FetchTalentsParams = {}): Promise<TalentListResponse> {
  const url = `${BASE_URL}/profiles?page=${page}&size=${size}`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("🔥 [fetchTalents] 호출 실패", res.status, text);
    throw new Error("인재 목록을 불러오는 데 실패했습니다.");
  }

  return (await res.json()) as TalentListResponse;
}

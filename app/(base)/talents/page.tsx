// app/(base)/talents/page.tsx
import Pager from "@/components/Pager";
import TalentSearchHeader from "./_components/TalentSearchHeader";
import IntroduceCard from "./[talentId]/_components/IntroduceCard";
import { fetchTalents } from "@/lib/api/talents";
import type { BadgeType } from "@/components/ui/badge";
import { generateDummyTalents, type DummyTalent } from "@/constants/dummyTalents";
import { JOB_ROLE_ID_BY_NAME, findJobGroupByJobName } from "@/constants/jobs";

/* ================================
 * 1. 경험 배지 매핑
 * ================================ */

const EXPERIENCE_BADGE_BY_NAME: Record<string, { label: string; type: BadgeType }> = {
  "부트캠프 경험자": { label: "부트캠프 경험자", type: "bootcamp" },
  "창업 경험자": { label: "창업 경험자", type: "startup" },
  "자격증 보유자": { label: "자격증 보유자", type: "certified" },
  전공자: { label: "전공자", type: "major" },
};

export function mapExperiencesToBadges(
  experiences?: string[]
): { label: string; type: BadgeType }[] {
  if (!experiences || experiences.length === 0) return [];

  return experiences
    .map((name) => EXPERIENCE_BADGE_BY_NAME[name])
    .filter((b): b is { label: string; type: BadgeType } => !!b);
}

/* ================================
 * 2. 직무/직군 헬퍼
 * ================================ */

/** 역할 ID -> 직무명 역매핑 */
const JOB_NAME_BY_ID: Record<number, string> = Object.fromEntries(
  Object.entries(JOB_ROLE_ID_BY_NAME).map(([name, id]) => [id, name])
) as Record<number, string>;

/* ================================
 * 3. API 응답 타입 (이 파일 안에서만 사용)
 * ================================ */

type ApiEducation = {
  schoolName?: string | null;
  major?: string | null;
} | null;

type ApiTalent = {
  id: number;
  name: string;
  introduction: string;
  experiences?: string[] | null;
  tendencies?: string[] | null;
  education?: ApiEducation;
  /** 숫자 ID 배열이거나 문자열 배열 */
  jobRoles?: (number | string)[] | null;
  skills?: string[] | null;
  /** 🔥 백엔드에서 내려주는 썸네일 URL */
  thumbnailUrl?: string | null;
};

type FetchTalentsResponse = {
  content: ApiTalent[];
  totalElements?: number;
  totalPages?: number;
  size?: number;
  number?: number;
};

/* ================================
 * 4. 카드용 타입
 * ================================ */

type TalentsPageProps = {
  searchParams?: Promise<{
    page?: string;
    q?: string;
    group?: string;
    job?: string;
  }>;
};

type TalentCardItem = {
  talentId: string;
  id: number;
  name: string;
  viewCount: number;
  university?: string | null;
  major?: string | null;
  jobGroup?: string | null;
  job?: string | null;
  badges?: { label: string; type: BadgeType }[];
  tendencies: string[];
  skills: string[];
  summary: string;
  /** 🔥 카드에서도 썸네일 보관 */
  thumbnailUrl?: string | null;
};

/* ================================
 * 5. 페이지 컴포넌트
 * ================================ */

export default async function TalentsPage({ searchParams }: TalentsPageProps) {
  const resolved = await searchParams;

  const currentPage = resolved?.page ? Number(resolved.page) : 1;
  const backendPage = currentPage - 1;

  const data = (await fetchTalents({
    page: backendPage,
    size: 20,
  })) as FetchTalentsResponse;

  const apiTalents: TalentCardItem[] = data.content.map((t) => {
    const universityRaw = t.education?.schoolName ?? null;
    const majorRaw = t.education?.major ?? null;

    // ---------------------------
    // 직무/직군 변환 로직
    // ---------------------------
    const rawJobRoles = t.jobRoles ?? [];

    let jobName: string | null = null;
    let jobGroup: string | null = null;

    if (Array.isArray(rawJobRoles) && rawJobRoles.length > 0) {
      const lastRole = rawJobRoles[rawJobRoles.length - 1];

      if (typeof lastRole === "number") {
        jobName = JOB_NAME_BY_ID[lastRole] ?? null;
      } else if (typeof lastRole === "string") {
        jobName = lastRole;
      }

      if (jobName) {
        const group = findJobGroupByJobName(jobName);
        jobGroup = group || null;
      }
    }

    return {
      talentId: String(t.id),
      id: t.id,
      name: t.name,
      viewCount: 0, // TODO: 조회수 붙이면 교체
      university: universityRaw,
      major: majorRaw,
      jobGroup,
      job: jobName,
      badges: mapExperiencesToBadges(t.experiences ?? undefined),
      tendencies: t.tendencies ?? [],
      skills: t.skills ?? [],
      summary: t.introduction,
      /** 🔥 썸네일 URL 그대로 보관 (없으면 null) */
      thumbnailUrl: t.thumbnailUrl ?? null,
    };
  });

  const dummyTalents: DummyTalent[] = generateDummyTalents(24);

  /** 🔥 실제로 화면에 쓸 전체 리스트 (API + 더미) */
  const talents: TalentCardItem[] = [...apiTalents, ...dummyTalents];

  /* ================================
   * 6. 프론트단 필터링 로직
   *    - 검색어(q)
   *    - 직군(group)
   *    - 직무(job)
   * ================================ */

  const keyword = resolved?.q?.trim().toLowerCase() ?? "";
  const groupFilter = resolved?.group?.trim() || "";
  const jobFilter = resolved?.job?.trim() || "";

  const filteredTalents = talents.filter((t) => {
    // 1) 직군 필터 (예: group=frontend 같은 값이라고 가정)
    if (groupFilter && groupFilter !== "all") {
      if (!t.jobGroup || t.jobGroup !== groupFilter) {
        return false;
      }
    }

    // 2) 직무 필터
    if (jobFilter && jobFilter !== "all") {
      if (!t.job || t.job !== jobFilter) {
        return false;
      }
    }

    // 3) 검색어 필터 (없으면 통과)
    if (!keyword) return true;

    const haystack = [
      t.name,
      t.summary,
      t.university ?? "",
      t.major ?? "",
      t.jobGroup ?? "",
      t.job ?? "",
      ...t.skills,
      ...t.tendencies,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(keyword);
  });

  const totalCount = filteredTalents.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / 20));

  // 현재 페이지에 보여줄 것만 슬라이스
  const paginatedTalents = filteredTalents.slice((currentPage - 1) * 20, currentPage * 20);

  return (
    <main className="w-full text-black mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="mb-8 space-y-4">
          {/* 🔥 총 개수도 필터링 이후 기준으로 넘김 */}
          <TalentSearchHeader totalCount={totalCount} />

          <div className="mt-6 flex flex-col gap-12">
            {paginatedTalents.map((t) => (
              <IntroduceCard
                key={t.talentId}
                talentId={t.talentId}
                name={t.name}
                viewCount={t.viewCount}
                badges={t.badges}
                tendencies={t.tendencies}
                university={t.university ?? undefined}
                major={t.major ?? undefined}
                jobGroup={t.jobGroup ?? undefined}
                job={t.job ?? undefined}
                skills={t.skills}
                /** 🔥 여기서 프로필 이미지로 썸네일 전달 */
                thumbnailUrl={t.thumbnailUrl ?? "/images/default-profile.png"}
                showContacts={false}
                className="
                  w-full
                  transition-shadow
                  hover:shadow-[0_4px_6px_-2px_rgba(0,0,0,0.05),0_10px_15px_-3px_rgba(0,0,0,0.10)]
                  hover:border-border-secondary
                "
                summary={t.summary}
              />
            ))}
          </div>
        </section>

        <Pager currentPage={currentPage} totalPages={totalPages} className="mt-10 mb-20" />
      </div>
    </main>
  );
}

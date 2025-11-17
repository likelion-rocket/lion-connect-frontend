// app/(base)/talents/page.tsx
import Pager from "@/components/Pager";
import TalentSearchHeader from "./_components/TalentSearchHeader";
import IntroduceCard from "./[slug]/_components/IntroduceCard";
import { fetchTalents } from "@/lib/api/talents";
import type { BadgeType } from "@/components/ui/badge";
import { generateDummyTalents } from "@/constants/dummyTalents";

const EXPERIENCE_BADGE_BY_NAME: Record<string, { label: string; type: BadgeType }> = {
  "부트캠프 경험자": { label: "부트캠프 경험자", type: "bootcamp" },
  "창업 경험자": { label: "창업 경험자", type: "startup" },
  "자격증 보유자": { label: "자격증 보유자", type: "certified" },
  전공자: { label: "전공자", type: "major" },
};

/** API experiences(string[]) -> IntroduceCard용 badges로 변경 */
export function mapExperiencesToBadges(
  experiences?: string[]
): { label: string; type: BadgeType }[] {
  if (!experiences || experiences.length === 0) return [];

  return experiences
    .map((name) => EXPERIENCE_BADGE_BY_NAME[name])
    .filter((b): b is { label: string; type: BadgeType } => !!b);
}

type TalentsPageProps = {
  searchParams?: Promise<{
    page?: string;
    q?: string;
    group?: string;
    job?: string;
  }>;
};

type TalentCardItem = {
  slug: string;
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
};

export default async function TalentsPage({ searchParams }: TalentsPageProps) {
  const resolved = await searchParams; // ✅ 여기서 한 번 await

  const currentPage = resolved?.page ? Number(resolved.page) : 1;
  const backendPage = currentPage - 1;

  // 🔥 API 호출
  const data = await fetchTalents({ page: backendPage, size: 20 });

  const apiTalents: TalentCardItem[] = data.content.map((t) => {
    const universityRaw = t.education?.schoolName ?? null;
    const majorRaw = t.education?.major ?? null;

    return {
      slug: String(t.id),
      id: t.id,
      name: t.name,
      viewCount: 0, // 🔥 나중에 조회수 붙으면 여기 교체
      university: universityRaw,
      major: majorRaw,
      // 지금 응답에는 jobGroup/job이 따로 없고 jobRoles만 있으니 일단 첫 번째를 둘 다에 사용
      jobGroup: t.jobRoles?.[0] ?? null,
      job: t.jobRoles?.[0] ?? null,
      badges: mapExperiencesToBadges(t.experiences) ?? [], // 추후 experiences / tendencies 기반으로 배지 만들어도 됨
      tendencies: t.tendencies ?? [],
      skills: t.skills ?? [],
      summary: t.introduction,
    };
  });

  const dummyTalents = generateDummyTalents(24);

  // 🔥 서버 + 더미 합치기
  const talents = [...apiTalents, ...dummyTalents];

  const totalCount = talents.length;
  const totalPages = Math.ceil(totalCount / 20);

  return (
    <main className="w-full text-black mt-8">
      {/* 👉 디테일 페이지랑 완전 같은 컨테이너 패턴 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="mb-8 space-y-4">
          <TalentSearchHeader totalCount={totalCount} />

          <div className="mt-6 flex flex-col gap-12">
            {talents.slice((currentPage - 1) * 20, currentPage * 20).map((t) => (
              <IntroduceCard
                key={t.slug}
                slug={t.slug}
                name={t.name}
                viewCount={t.viewCount}
                badges={t.badges}
                tendencies={t.tendencies}
                university={t.university ?? undefined}
                major={t.major ?? undefined}
                jobGroup={t.jobGroup ?? undefined}
                job={t.job ?? undefined}
                skills={t.skills}
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

        <Pager
          currentPage={currentPage}
          totalPages={totalPages}
          className="mt-10 mb-20" // ← 여기에 하단 마진 추가
        />
      </div>
    </main>
  );
}

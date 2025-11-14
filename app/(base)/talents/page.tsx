// app/(base)/talents/page.tsx
import Pager from "@/components/Pager";
import TalentSearchHeader from "./_components/TalentSearchHeader";
import IntroduceCard from "./[slug]/_components/IntroduceCard";
import { fetchTalents } from "@/lib/api/talents";
import type { BadgeType } from "@/components/ui/badge";
import { generateDummyTalents } from "@/constants/dummyTalents";

/** ================= 공통 타입 ================= */

type TalentsPageProps = {
  searchParams?: {
    page?: string;
    q?: string;
    group?: string;
    job?: string;
  };
};

// IntroduceCard에 넘겨줄 카드 데이터 타입
type TalentCardItem = {
  slug: string;
  id: number;
  name: string;
  viewCount: number;
  university?: string | null;
  major?: string | null;
  jobGroup?: string | null;
  job?: string | null;
  badges: { label: string; type: BadgeType }[];
  tendencies: string[];
  skills: string[];
  summary: string;
};

/** ================= 페이지 컴포넌트 ================= */

export default async function TalentsPage(props: TalentsPageProps) {
  const searchParams = await props.searchParams; // 🔥 Next.js가 요구하는 resolve 과정
  const currentPage = searchParams?.page ? Number(searchParams.page) : 1;
  const backendPage = currentPage - 1;

  // 🔥 API 호출
  const data = await fetchTalents({ page: backendPage, size: 20 });

  // 🔥 서버 데이터 매핑
  const apiTalents: TalentCardItem[] = data.content.map((t) => {
    // "숭실대학교 * 소프트웨어" → ["숭실대학교 ", " 소프트웨어"]
    const [universityRaw, majorRaw] = (t.education ?? "").split("*").map((s) => s.trim());

    return {
      slug: String(t.id),
      id: t.id,
      name: t.name,
      viewCount: 0,
      university: universityRaw || null,
      major: majorRaw || null,
      jobGroup: t.jobRoles?.[0] ?? null,
      job: t.jobRoles?.[0] ?? null,
      badges: [],
      tendencies: t.tendencies ?? [],
      skills: t.skills ?? [],
      summary: t.introduction,
    };
  });

  const dummyTalents = generateDummyTalents(24);

  // 🔥 서버 + 더미 합치기
  const talents = [...apiTalents, ...dummyTalents];

  // 🔥 총 인원 = 서버 총 인원 + 더미 인원
  const totalCount = talents.length;

  // 🔥 총 페이지 = 20개씩
  const totalPages = Math.ceil(totalCount / 20);

  return (
    <main className="py-8 flex flex-col gap-10 mx-40">
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

      <Pager currentPage={currentPage} totalPages={totalPages} className="mt-10" />
    </main>
  );
}

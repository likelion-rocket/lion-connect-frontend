import Pager from "@/components/Pager";
import TalentSearchHeader from "./_components/TalentSearchHeader";
import IntroduceCard from "./[slug]/_components/IntroduceCard";

type TalentsPageProps = {
  searchParams?:
    | {
        page?: string;
        q?: string;
        group?: string;
        job?: string;
      }
    | Promise<{
        page?: string;
        q?: string;
        group?: string;
        job?: string;
      }>;
};

export default async function TalentsPage(props: TalentsPageProps) {
  const resolvedSearchParams =
    props.searchParams instanceof Promise ? await props.searchParams : (props.searchParams ?? {});
  const pageParam = resolvedSearchParams.page;
  const currentPage = pageParam ? Number(pageParam) : 1;

  // 실제 서비스에서는 q/group/job 서버 필터 결과로 계산
  const totalPages = 20;
  const totalCount = 6;

  // 데모용 리스트 데이터 (slug는 상세 경로에 사용)
  const talents = [
    {
      slug: "lee-gyuwon",
      name: "이규원",
      viewCount: 245,
      university: "숭실대",
      major: "소프트웨어",
      jobGroup: "개발",
      job: "프론트엔드",
      badges: [
        { label: "창업 경험자", type: "startup" as const },
        { label: "자격증 보유자", type: "certified" as const },
        { label: "전공자", type: "major" as const },
      ],
      tendencies: ["속도형", "수직적 문화형", "결과 중심형"],
      skills: ["JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "Zustand"],
      summary: `
      저는 문제를 해결하며 가치를 창출하는 프론트엔드 개발자입니다.
      사용자 경험을 최우선으로 고려하며, 복잡한 UI를 효율적이고 유지보수 가능한 구조로 만드는 것에 관심이 많습니다.
      협업 과정에서 커뮤니케이션을 중시하며, 디자이너 및 백엔드 개발자와의 긴밀한 협업을 통해 더 나은 제품을 만드는 것을 즐깁니다.
      최근에는 성능 최적화와 접근성 개선, 그리고 디자인 시스템 구축에도 깊은 관심을 두고 있습니다.asdfasdfasdff
      fffffffffffffffffffffffffffffffffff.
      fffffffffffffffffffffffffffffasdfasdfasdfa
      sdfasdfasdfasdfasdfasdf
    `,
    },
    // 나머지 항목은 그대로
    {
      slug: "kim-yujin",
      name: "김유진",
      viewCount: 189,
      university: "제니얼리스트",
      jobGroup: "개발",
      job: "프론트엔드",
      badges: [{ label: "부트캠프 수료자", type: "bootcamp" as const }],
      tendencies: ["속도형", "수직적 문화형"],
      skills: ["JavaScript", "React", "Vue.js"],
      summary:
        "저는 문제를 해결하며 가치를 창출하는 프론트엔드 개발자입니다. 학부 시절 프로젝트와 인턴 경험으로...",
    },
    {
      slug: "yoon-jaeseong",
      name: "윤재성",
      viewCount: 189,
      university: "제니얼리스트",
      jobGroup: "개발",
      job: "프론트엔드",
      badges: [{ label: "부트캠프 수료자", type: "bootcamp" as const }],
      skills: ["JavaScript", "Node", "Node.js"],
      summary:
        "저는 문제를 해결하며 가치를 창출하는 프론트엔드 개발자입니다. 학부 시절 프로젝트와 인턴 경험으로...",
    },
    {
      slug: "lee-minho",
      name: "이민호",
      viewCount: 215,
      university: "연세대",
      jobGroup: "백엔드",
      job: "백엔드",
      badges: [{ label: "부트캠프 수료자", type: "bootcamp" as const }],
      skills: ["Python", "Django", "PostgreSQL"],
      summary:
        "저는 문제를 해결하며 가치를 창출하는 프론트엔드 개발자입니다. 학부 시절 프로젝트와 인턴 경험으로...",
    },
    {
      slug: "kim-hyemin",
      name: "김혜민",
      viewCount: 178,
      university: "이화여대",
      jobGroup: "UX/UI 디자인",
      job: "UX/UI 디자인",
      badges: [{ label: "부트캠프 수료자", type: "bootcamp" as const }],
      skills: ["Figma", "Adobe XD", "Sketch"],
      summary:
        "저는 문제를 해결하며 가치를 창출하는 프론트엔드 개발자입니다. 학부 시절 프로젝트와 인턴 경험으로...",
    },
    {
      slug: "park-junseo",
      name: "박준서",
      viewCount: 202,
      university: "부산대",
      jobGroup: "풀스택 개발",
      job: "풀스택 개발",
      badges: [{ label: "부트캠프 수료자", type: "bootcamp" as const }],
      skills: ["Java", "Spring", "MySQL"],
      summary:
        "저는 문제를 해결하며 가치를 창출하는 프론트엔드 개발자입니다. 학부 시절 프로젝트와 인턴 경험으로...",
    },
  ];

  return (
    <main className="py-8 flex flex-col gap-10 mx-40">
      <section className="mb-8 space-y-4">
        <TalentSearchHeader totalCount={totalCount} />

        {/* 카드 리스트: 간격 48px */}
        <div className="mt-6 flex flex-col gap-12">
          {talents.map((t) => (
            <IntroduceCard
              key={t.slug}
              slug={t.slug}
              name={t.name}
              viewCount={t.viewCount}
              badges={t.badges}
              tendencies={t.tendencies ?? []}
              university={t.university}
              major={t.major}
              jobGroup={t.jobGroup}
              job={t.job}
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

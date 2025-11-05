import Pager from "@/components/Pager";
import TalentSearchHeader from "./_components/TalentSearchHeader";

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

  // 실제 서비스에선 resolvedSearchParams(q, group, job)를 사용해 서버에서 검색/필터 후 총 인원 계산
  const totalPages = 20;
  const totalCount = 6; // 스샷 예시값

  return (
    <main className="py-8 flex flex-col gap-10 mx-40">
      <section className="mb-8 space-y-4">
        <TalentSearchHeader totalCount={totalCount} />

        <div className="border border-border-quaternary rounded-lg p-4">
          현재 {currentPage} 페이지 데이터
          <div className="mt-2 text-sm text-[#666]">
            (q: <strong>{resolvedSearchParams.q ?? "-"}</strong>, group:{" "}
            <strong>{resolvedSearchParams.group ?? "-"}</strong>, job:{" "}
            <strong>{resolvedSearchParams.job ?? "-"}</strong>)
          </div>
        </div>
      </section>

      <Pager currentPage={currentPage} totalPages={totalPages} className="mt-10" />
    </main>
  );
}

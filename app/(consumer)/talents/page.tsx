import Pager from "@/components/Pager";

type TalentsPageProps = {
  searchParams?:
    | {
        page?: string;
      }
    | Promise<{
        page?: string;
      }>;
};

export default async function TalentsPage(props: TalentsPageProps) {
  // 1) searchParams가 Promise일 수도 있다고 보고 안전하게 처리
  const resolvedSearchParams =
    props.searchParams instanceof Promise ? await props.searchParams : (props.searchParams ?? {});

  // 2) page 문자열 꺼내고 기본값 처리
  const pageParam = resolvedSearchParams.page;
  const currentPage = pageParam ? Number(pageParam) : 1;

  // 3) 페이지네이션 전체 페이지 수 (예시값)
  const totalPages = 20;

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-text-primary mb-6">인재탐색</h1>

      <section className="mb-8 space-y-4">
        <div className="border border-border-quaternary rounded-lg p-4">
          현재 {currentPage} 페이지 데이터
        </div>
      </section>

      <Pager currentPage={currentPage} totalPages={totalPages} className="mt-10" />
    </main>
  );
}

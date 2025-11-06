import { Metadata } from "next";
import AdminTable from "./_components/AdminTable";
import SearchBar from "./_components/SearchBar";
import Pager from "@/components/Pager";
import { AdminTableRow } from "@/types/admin";

export const metadata: Metadata = {
  title: "관리자",
  description: "Lion Connect 관리자 페이지",
};

type AdminPageProps = {
  searchParams?:
    | {
        page?: string;
        search?: string;
      }
    | Promise<{
        page?: string;
        search?: string;
      }>;
};

/**
 * 관리자 페이지
 * - 서버 컴포넌트로 데이터 페칭
 * - 검색 및 페이지네이션 지원
 */
async function AdminPage(props: AdminPageProps) {
  // searchParams 안전하게 처리
  const resolvedSearchParams =
    props.searchParams instanceof Promise ? await props.searchParams : (props.searchParams ?? {});

  const pageParam = resolvedSearchParams.page;
  const searchParam = resolvedSearchParams.search;

  const currentPage = pageParam ? Number(pageParam) : 1;

  // TODO: 실제 API 호출로 교체
  // 예시: const response = await fetchAdminData({ page: currentPage, search: searchParam });
  // const { data, totalPages } = response;

  // 현재는 searchParam을 사용하지 않지만, API 연동 시 필요
  console.log("검색어:", searchParam);

  // 임시 목업 데이터
  const mockData: AdminTableRow[] = Array.from({ length: 14 }, (_, i) => ({
    id: i + 1,
    name: `이름`,
    companyName: `회사명`,
    phoneNumber: `전화번호`,
    position: `직책`,
    keywords: `이메일`,
    description: `안녕하세요 기업문의 관련해서 글 남깁니다.안녕하세요 기업문의 관련해서 글 남깁니다.안녕하세요 기업문의 관련해서 글 남깁니다.안녕하세요 기업문의 관련해서 글 남깁니다.안녕하세요 기업문의 관련해서 글 남깁니다.안녕하세요 기업문의 관련해서 글 남깁니다.안녕하세요 기업문의 관련해서 글 남깁니다.`,
  }));

  const totalPages = 20; // 임시값

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* 검색바 */}
      <div className="mb-6 flex justify-center">
        <SearchBar />
      </div>

      {/* 테이블 */}
      <div className="mb-8 border border-border-quaternary rounded-lg overflow-hidden">
        <AdminTable data={mockData} />
      </div>

      {/* 페이지네이션 */}
      <Pager currentPage={currentPage} totalPages={totalPages} className="mt-10" />
    </main>
  );
}

export default AdminPage;

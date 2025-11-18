/**
 * 문의 목록 페이지네이션 컴포넌트
 */

import { useQueryParams } from "@/hooks/useQueryParams";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationArrow,
  PaginationPageButton,
} from "@/components/ui/pagination";

interface InquiryPaginationProps {
  currentPage: number;
  totalPages: number;
}

/**
 * 페이지 번호 버튼 배열 생성
 * - 현재 페이지 기준으로 앞뒤로 최대 2개씩 표시
 */
function generatePageNumbers(currentPage: number, totalPages: number): number[] {
  const pages: number[] = [];
  const range = 2; // 현재 페이지 기준 앞뒤로 표시할 개수

  for (
    let i = Math.max(1, currentPage - range);
    i <= Math.min(totalPages, currentPage + range);
    i++
  ) {
    pages.push(i);
  }

  return pages;
}

export default function InquiryPagination({ currentPage, totalPages }: InquiryPaginationProps) {
  const { setParam } = useQueryParams();

  const handlePageChange = (page: number) => {
    // Convert to 0-based index for API
    setParam("page", String(page - 1));
  };

  const pageNumbers = generatePageNumbers(currentPage, totalPages);

  if (totalPages <= 1) {
    return null; // Don't show pagination if there's only one page
  }

  return (
    <Pagination className="mt-8">
      <PaginationContent>
        {/* 이전 버튼 */}
        <PaginationItem>
          <PaginationArrow
            direction="prev"
            disabled={currentPage <= 1}
            onClick={() => handlePageChange(currentPage - 1)}
          />
        </PaginationItem>

        {/* 페이지 번호 버튼들 */}
        {pageNumbers.map((page) => (
          <PaginationItem key={page}>
            <PaginationPageButton
              variant={page === currentPage ? "accentFilled" : "default"}
              onClick={() => handlePageChange(page)}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </PaginationPageButton>
          </PaginationItem>
        ))}

        {/* 다음 버튼 */}
        <PaginationItem>
          <PaginationArrow
            direction="next"
            disabled={currentPage >= totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

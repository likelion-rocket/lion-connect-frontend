"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationArrow,
  PaginationPageButton,
} from "@/components/ui/pagination";

type PagerProps = {
  currentPage: number; // 현재 페이지 (1-based)
  totalPages: number; // 전체 페이지 수
  onPageChange: (page: number) => void;
  className?: string;
};

export default function Pager({ currentPage, totalPages, onPageChange, className }: PagerProps) {
  const page = Math.max(1, Math.min(currentPage, totalPages));
  const canPrev = page > 1;
  const canNext = page < totalPages;

  // 가운데에 보여줄 3개 페이지 (page-1, page, page+1) 기반
  // but 첫/끝 근처 보정
  let start = page - 1;
  let end = page + 1;

  if (page <= 1) {
    start = 1;
    end = Math.min(3, totalPages);
  } else if (page >= totalPages) {
    end = totalPages;
    start = Math.max(totalPages - 2, 1);
  }

  const pagesToRender: number[] = [];
  for (let p = start; p <= end; p++) {
    pagesToRender.push(p);
  }

  return (
    <Pagination className={className}>
      <PaginationContent className="gap-4">
        {/* ← 화살표 */}
        <PaginationItem>
          <PaginationArrow
            direction="prev"
            disabled={!canPrev}
            onClick={() => canPrev && onPageChange(page - 1)}
          />
        </PaginationItem>

        {/* 페이지 번호 3개 */}
        {pagesToRender.map((p) => {
          // variant 결정:
          // 가운데(=현재 페이지)는 accentFilled
          // 현재보다 왼쪽이면 accentOutline
          // 현재보다 오른쪽이면 default
          let variant: "accentOutline" | "accentFilled" | "default" = "default";

          if (p === page) {
            variant = "accentFilled";
          } else {
            variant = "default";
          }

          return (
            <PaginationItem key={p}>
              <PaginationPageButton
                onClick={() => onPageChange(p)}
                variant={variant}
                aria-current={p === page ? "page" : undefined}
              >
                {p}
              </PaginationPageButton>
            </PaginationItem>
          );
        })}

        {/* → 화살표 */}
        <PaginationItem>
          <PaginationArrow
            direction="next"
            disabled={!canNext}
            onClick={() => canNext && onPageChange(page + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

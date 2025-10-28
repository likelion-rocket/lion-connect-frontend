// components/Pager.tsx
// ✅ use client 없음 (서버 컴포넌트로 사용 가능)

import Link from "next/link";
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
  className?: string;
};

export default function Pager({ currentPage, totalPages, className }: PagerProps) {
  // 현재 페이지를 유효 범위로 클램프
  const page = Math.max(1, Math.min(currentPage, totalPages));

  const canPrev = page > 1;
  const canNext = page < totalPages;

  // 가운데 3개의 페이지 번호 계산
  // (page-1, page, page+1) 기준으로, 처음/끝 근처 보정
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

  // "/talents?page=X" 형태를 만들 helper
  // (필요하다면 basePath나 다른 쿼리도 쉽게 확장 가능)
  const hrefFor = (p: number) => {
    return `?page=${p}`;
  };

  return (
    <Pagination className={className}>
      <PaginationContent className="gap-3">
        {/* ← 이전 화살표 */}
        <PaginationItem>
          {canPrev ? (
            <Link href={hrefFor(page - 1)} aria-label="이전 페이지">
              <PaginationArrow direction="prev" />
            </Link>
          ) : (
            // 첫 페이지에서는 disabled 스타일만 보여주고 링크는 없음
            <PaginationArrow direction="prev" disabled />
          )}
        </PaginationItem>

        {/* 가운데 페이지 번호 3개 */}
        {pagesToRender.map((p) => {
          const isActive = p === page;

          // 현재 페이지는 주황색 배경 (accentFilled)
          // 나머지는 검정 outline / hover 시 주황 (default)
          const variant: "accentFilled" | "default" = isActive ? "accentFilled" : "default";

          const buttonEl = (
            <PaginationPageButton variant={variant} aria-current={isActive ? "page" : undefined}>
              {p}
            </PaginationPageButton>
          );

          return (
            <PaginationItem key={p}>
              {isActive ? (
                // 현재 페이지는 그냥 span처럼만 보여줘서 클릭 안 되게
                buttonEl
              ) : (
                // 다른 페이지는 <Link>로 감싸서 이동 가능하게
                <Link href={hrefFor(p)} aria-label={`${p} 페이지`}>
                  {buttonEl}
                </Link>
              )}
            </PaginationItem>
          );
        })}

        {/* → 다음 화살표 */}
        <PaginationItem>
          {canNext ? (
            <Link href={hrefFor(page + 1)} aria-label="다음 페이지">
              <PaginationArrow direction="next" />
            </Link>
          ) : (
            <PaginationArrow direction="next" disabled />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

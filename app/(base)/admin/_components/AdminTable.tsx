"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { AdminTableRow } from "@/types/admin";
import { useState } from "react";

type AdminTableProps = {
  data: AdminTableRow[];
};

/**
 * 관리자 페이지 테이블 컴포넌트
 * - 체크박스를 통한 다중 선택 지원
 * - 클라이언트 컴포넌트 (상태 관리 필요)
 */
export default function AdminTable({ data }: AdminTableProps) {
  // 선택된 행 ID 관리
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  // 전체 선택 토글
  const handleSelectAll = () => {
    if (selectedIds.size === data.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(data.map((row) => row.id)));
    }
  };

  // 개별 행 선택 토글
  const handleSelectRow = (id: number) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const isAllSelected = data.length > 0 && selectedIds.size === data.length;

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        {/* 테이블 헤더 */}
        <thead>
          <tr className="border-b border-border-quaternary">
            <th className="py-3 px-4 text-left">
              <Checkbox checked={isAllSelected} onCheckedChange={handleSelectAll} />
            </th>
            <th className="py-3 px-4 text-left text-[14px] font-semibold text-text-secondary">
              이름
            </th>
            <th className="py-3 px-4 text-left text-[14px] font-semibold text-text-secondary">
              회사명
            </th>
            <th className="py-3 px-4 text-left text-[14px] font-semibold text-text-secondary">
              전화번호
            </th>
            <th className="py-3 px-4 text-left text-[14px] font-semibold text-text-secondary">
              직책
            </th>
            <th className="py-3 px-4 text-left text-[14px] font-semibold text-text-secondary">
              이메일
            </th>
            <th className="py-3 px-4 text-left text-[14px] font-semibold text-text-secondary">
              문의 사항
            </th>
          </tr>
        </thead>

        {/* 테이블 바디 */}
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={7} className="py-8 text-center text-text-tertiary">
                데이터가 없습니다
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr
                key={row.id}
                className="border-b border-border-quaternary hover:bg-bg-secondary transition-colors"
              >
                <td className="py-3 px-4">
                  <Checkbox
                    checked={selectedIds.has(row.id)}
                    onCheckedChange={() => handleSelectRow(row.id)}
                  />
                </td>
                <td className="py-3 px-4 text-[14px] text-text-primary">{row.name}</td>
                <td className="py-3 px-4 text-[14px] text-text-primary">{row.companyName}</td>
                <td className="py-3 px-4 text-[14px] text-text-primary">{row.phoneNumber}</td>
                <td className="py-3 px-4 text-[14px] text-text-primary">{row.position}</td>
                <td className="py-3 px-4 text-[14px] text-text-primary">{row.keywords}</td>
                <td className="py-3 px-4 text-[14px] text-text-primary">
                  <div className="max-w-xs truncate" title={row.description}>
                    {row.description}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* 선택된 항목 수 표시 (개발/디버깅용) */}
      {selectedIds.size > 0 && (
        <div className="mt-4 text-sm text-text-secondary">{selectedIds.size}개 항목 선택됨</div>
      )}
    </div>
  );
}

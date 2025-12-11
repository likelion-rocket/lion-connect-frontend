"use client";

import ImageToggleButton from "@/components/ui/ImageToggleButton";
import { useCompanyLockStatus } from "@/hooks/admin/useCompanyLockStatus";
import { useConfirm } from "@/contexts/ConfirmContext";

interface CompanyTableRowProps {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
  joinDate: string;
  companyLocked?: boolean;
}

/**
 * Company Table Row Component
 *
 * @description
 * 기업 회원 관리 테이블의 개별 행 컴포넌트입니다.
 * 기업 회원 정보와 잠금 상태 토글 버튼을 표시합니다.
 * - companyLocked=false: Orange icon (active, 잠금 해제) → 클릭 시 잠금 처리
 * - companyLocked=true: Gray icon (inactive, 잠금) → 클릭 시 잠금 해제 처리
 *
 * @example
 * <CompanyTableRow
 *   id={1}
 *   name="유재민"
 *   phoneNumber="010-1234-5678"
 *   email="1234@gmail.com"
 *   joinDate="2025. 11.25"
 *   companyLocked={false}
 * />
 */
export default function CompanyTableRow({
  id,
  name,
  phoneNumber,
  email,
  joinDate,
  companyLocked = false,
}: CompanyTableRowProps) {
  const confirm = useConfirm();
  const lockMutation = useCompanyLockStatus(id);

  /**
   * 잠금 토글 핸들러
   * - 활성화/비활성화 전 confirm 모달 표시
   * @param willBeActive - ImageToggleButton의 토글 후 상태
   *                       - true (orange, 잠금 해제): 클릭 시 false로 변경 → 잠금 처리
   *                       - false (gray, 잠금): 클릭 시 true로 변경 → 잠금 해제 처리
   */
  const handleLockToggle = async (willBeActive: boolean) => {
    const ok = await confirm({
      title: willBeActive
        ? "계정을 다시 활성화 하시겠습니까?"
        : "계정을 비활성화 하시겠습니까?",
      description: willBeActive
        ? "확인을 누르면 해당 계정이 다시 활성화 됩니다."
        : "확인을 누르면 해당 계정은 비활성화 됩니다.",
      confirmLabel: "확인",
      cancelLabel: "아니오",
    });

    if (ok) {
      lockMutation.mutate(!willBeActive);
    }
  };

  return (
    <tr data-state="state3" data-type="company" className="bg-white border-b-2 border-neutral-100">
      <td className="px-4 py-4 text-neutral-800 text-sm font-normal font-['Pretendard'] leading-5">
        {name}
      </td>
      <td className="px-4 py-4 text-neutral-800 text-sm font-normal font-['Pretendard'] leading-5">
        {phoneNumber}
      </td>
      <td className="px-4 py-4 text-neutral-800 text-sm font-normal font-['Pretendard'] leading-5">
        {email}
      </td>
      <td className="px-4 py-4 text-neutral-800 text-sm font-normal font-['Pretendard'] leading-5">
        {joinDate}
      </td>
      <td className="px-4 py-4">
        <span
          data-type="companyUser"
          className="inline-flex px-2.5 py-0.5 rounded justify-center items-center bg-fuchsia-500/20 text-fuchsia-500 text-sm font-normal font-['Pretendard'] leading-5"
        >
          기업 회원
        </span>
      </td>
      <td className="px-4 py-4">
        <div className="flex justify-start items-center gap-4">
          {/* Lock Status Toggle (Controlled Mode)
              - companyLocked=false → isActive=true (orange icon, 잠금 해제) → 클릭 시 잠금
              - companyLocked=true → isActive=false (gray icon, 잠금) → 클릭 시 잠금 해제
          */}
          <ImageToggleButton
            isActive={!companyLocked}
            onToggle={handleLockToggle}
            grayImageSrc="/icons/solid-lock-closed.svg"
            orangeImageSrc="/icons/solid-lock-open-orange.svg"
            size={20}
            alt="잠금 상태"
          />
        </div>
      </td>
    </tr>
  );
}

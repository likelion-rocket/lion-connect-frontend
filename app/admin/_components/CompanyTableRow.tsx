"use client";

import ImageToggleButton from "@/components/ui/ImageToggleButton";
import { useCompanyLockStatus } from "@/hooks/admin/useCompanyLockStatus";

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
  const lockMutation = useCompanyLockStatus(id);

  /**
   * 잠금 토글 핸들러
   * @param isActive - ImageToggleButton의 현재 active 상태 (토글 전)
   *                   - true (orange, 잠금 해제): 클릭 시 false로 변경 → 잠금 처리
   *                   - false (gray, 잠금): 클릭 시 true로 변경 → 잠금 해제 처리
   */
  const handleLockToggle = (isActive: boolean) => {
    // isActive가 true면 잠금(false), false면 잠금 해제(true)
    // UserTableRow와 동일한 로직: mutate(!isActive)
    lockMutation.mutate(!isActive);
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

"use client";

import ImageToggleButton from "@/components/ui/ImageToggleButton";
import { useProfileLockStatus } from "@/hooks/admin/useProfileLockStatus";

interface CompanyTableRowProps {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
  joinDate: string;
  locked?: boolean;
}

/**
 * Company Table Row Component
 *
 * @description
 * 기업 회원 관리 테이블의 개별 행 컴포넌트입니다.
 * 기업 회원 정보와 잠금 상태 토글 버튼을 표시합니다.
 *
 * @example
 * <CompanyTableRow
 *   id={1}
 *   name="유재민"
 *   phoneNumber="010-1234-5678"
 *   email="1234@gmail.com"
 *   joinDate="2025. 11.25"
 *   locked={false}
 * />
 */
export default function CompanyTableRow({
  id,
  name,
  phoneNumber,
  email,
  joinDate,
  locked = false,
}: CompanyTableRowProps) {
  const lockMutation = useProfileLockStatus(id);

  const handleLockToggle = (isLocked: boolean) => {
    lockMutation.mutate(isLocked);
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
          {/* Lock Status Toggle */}
          <ImageToggleButton
            defaultActive={!locked}
            onToggle={(isActive) => handleLockToggle(!isActive)}
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

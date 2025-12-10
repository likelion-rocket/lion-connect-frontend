"use client";

import ImageToggleButton from "@/components/ui/ImageToggleButton";
import { useProfileLockStatus } from "@/hooks/admin/useProfileLockStatus";

interface UserTableRowProps {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
  joinDate: string;
  roles: string[];
  locked?: boolean; // 프로필 잠금 상태
  initialAdminPermission?: boolean;
}

/**
 * User Table Row Component
 *
 * @description
 * 사용자 관리 테이블의 개별 행 컴포넌트입니다.
 * 사용자 정보와 권한 관리 토글 버튼을 표시합니다.
 *
 * @example
 * <UserTableRow
 *   name="유재민"
 *   company="멋쟁이사자처럼(기업명)"
 *   email="1234@gmail.com"
 *   joinDate="2025. 11.25"
 *   role="admin"
 *   initialAdminPermission={true}
 *   initialActivePermission={true}
 * />
 */
export default function UserTableRow({
  id,
  name,
  phoneNumber,
  email,
  joinDate,
  roles,
  locked = false,
  initialAdminPermission = false,
}: UserTableRowProps) {
  // 프로필 잠금/해제 mutation
  const lockMutation = useProfileLockStatus(id);

  // roles 배열에서 admin 여부 확인
  const isAdmin = roles.includes("ROLE_ADMIN") || roles.includes("ADMIN");

  // 디버깅
  console.log(`[UserTableRow ${id}] locked:`, locked, "isActive:", !locked);

  return (
    <tr data-state="default" data-type="normal" className="bg-white border-b-2 border-neutral-100">
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
          data-type={isAdmin ? "admin" : "normalUser"}
          className={`inline-flex px-2.5 py-0.5 w-24 rounded justify-center items-center ${
            isAdmin ? "bg-red-600/20 text-red-600" : "bg-teal-500/20 text-teal-500"
          } text-sm font-normal font-['Pretendard'] leading-5`}
        >
          {isAdmin ? "관리자" : "일반 회원"}
        </span>
      </td>
      <td className="px-4 py-4">
        <div className="flex justify-start items-center gap-4">
          {/* Admin Permission Toggle */}
          <ImageToggleButton
            defaultActive={initialAdminPermission}
            grayImageSrc="/icons/solid-key.svg"
            orangeImageSrc="/icons/solid-key-orange.svg"
            size={20}
            alt="관리자 권한"
          />

          {/* Active Status Toggle (Lock/Unlock) */}
          <ImageToggleButton
            isActive={!locked}
            onToggle={(isActive) => lockMutation.mutate(!isActive)}
            grayImageSrc="/icons/solid-lock-closed.svg"
            orangeImageSrc="/icons/solid-lock-open-orange.svg"
            size={20}
            alt="활성화 상태"
            disabled={lockMutation.isPending}
          />
        </div>
      </td>
    </tr>
  );
}

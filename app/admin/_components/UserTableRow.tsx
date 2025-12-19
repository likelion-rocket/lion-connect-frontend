"use client";

import ImageToggleButton from "@/components/ui/ImageToggleButton";
import { useProfileLockStatus } from "@/hooks/admin/useProfileLockStatus";
import { useAdminPermission } from "@/hooks/admin/useAdminPermission";
import { useConfirm } from "@/contexts/ConfirmContext";

interface UserTableRowProps {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
  joinDate: string;
  roles: string[];
  locked?: boolean; // 프로필 잠금 상태
  courseName?: string; // 수료 과정
  courseGeneration?: number; // 기수
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
  courseName,
  courseGeneration,
}: UserTableRowProps) {
  const confirm = useConfirm();

  // 프로필 잠금/해제 mutation
  const lockMutation = useProfileLockStatus(id);

  // 관리자 권한 부여/제거 mutation
  const adminMutation = useAdminPermission(id);

  // roles 배열에서 admin 여부 확인
  const isAdmin = roles.includes("ROLE_ADMIN") || roles.includes("ADMIN");

  /**
   * 관리자 권한 토글 핸들러
   * - 권한 부여/제거 전 confirm 모달 표시
   */
  const handleAdminToggle = async (willBeAdmin: boolean) => {
    const ok = await confirm({
      title: willBeAdmin
        ? "관리자 권한을 부여하시겠습니까?"
        : "관리자 권한을 삭제하시겠습니까?",
      description: willBeAdmin
        ? "확인을 누르면 해당 계정에게 관리자 권한이 부여됩니다."
        : "확인을 누르면 해당 계정의 관리자 권한이 삭제됩니다.",
      confirmLabel: "확인",
      cancelLabel: "아니오",
    });

    if (ok) {
      adminMutation.mutate(willBeAdmin);
    }
  };

  /**
   * 계정 활성화/비활성화 토글 핸들러
   * - 활성화/비활성화 전 confirm 모달 표시
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
      <td className="px-4 py-4 text-neutral-800 text-sm font-normal font-['Pretendard'] leading-5">
        {courseName || "-"}
      </td>
      <td className="px-4 py-4 text-neutral-800 text-sm font-normal font-['Pretendard'] leading-5">
        {courseGeneration ? `${courseGeneration}기` : "-"}
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
            isActive={isAdmin}
            onToggle={handleAdminToggle}
            grayImageSrc="/icons/solid-key.svg"
            orangeImageSrc="/icons/solid-key-orange.svg"
            size={20}
            alt="관리자 권한"
            disabled={adminMutation.isPending}
          />

          {/* Active Status Toggle (Lock/Unlock) */}
          <ImageToggleButton
            isActive={!locked}
            onToggle={handleLockToggle}
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

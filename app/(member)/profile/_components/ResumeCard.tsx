"use client";

import { cn } from "@/utils/utils";
import { AlertCircle } from "lucide-react";
import { PublicButton } from "./PublicButton";
import { EditButton } from "./EditButton";
import { DeleteButton } from "./DeleteButton";
import { CompanyViewingAlert } from "./CompanyViewingAlert";
import { ScoutNotice } from "./ScoutNotice";

interface ResumeCardProps {
  name: string;
  status: "작성 완료" | "작성 미완료";
  isPublic: boolean;
  isViewing?: boolean;
  onTogglePublic?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onCloseAlert?: () => void;
}

export function ResumeCard({
  name,
  status,
  isPublic,
  isViewing = false,
  onTogglePublic,
  onEdit,
  onDelete,
  onCloseAlert,
}: ResumeCardProps) {
  const isCompleted = status === "작성 완료";

  return (
    <div
      className={cn(
        "self-stretch p-8 rounded-lg outline-[0.80px] outline-offset-[-0.80px]",
        "flex flex-col justify-start items-start gap-8 overflow-hidden transition-all",
        // Shadow: hover일 때 shadow-lg, default일 때 shadow
        "shadow hover:shadow-lg",
        "outline-border-quaternary hover:outline-accent"
      )}
    >
      {/* 공개 상태 배너 */}
      {isPublic && (
        <div className="px-6 py-1 bg-brand-01 rounded-lg inline-flex justify-center items-center gap-2.5">
          <AlertCircle className="w-5 h-5 text-accent" />
          <div className="text-accent text-base font-bold font-ko-body leading-6">
            이력서가 공개 중입니다.
          </div>
        </div>
      )}

      {/* 헤더: 이름, 상태, 버튼들 */}
      <div className="self-stretch inline-flex justify-between items-center">
        <div className="flex justify-start items-center gap-4">
          <h3 className="text-primary text-3xl font-bold font-ko-body leading-9">{name}</h3>
          <span className="text-quaternary text-base font-normal font-ko-body leading-6">
            {status}
          </span>
        </div>

        <div className="flex justify-start items-center gap-4">
          <PublicButton isPublic={isPublic} onClick={onTogglePublic} disabled={!isCompleted} />
          <EditButton onClick={onEdit} />
          <DeleteButton onClick={onDelete} />
        </div>
      </div>

      {/* 기업 열람 알림 */}
      {isViewing && <CompanyViewingAlert onClose={onCloseAlert} />}

      {/* 스카우트 안내 (비공개 + 작성 완료) */}
      {!isViewing && <ScoutNotice />}
    </div>
  );
}

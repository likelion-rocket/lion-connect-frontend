"use client";

import { ResumeCard } from "./ResumeCard";

export interface Resume {
  id: string;
  title: string;
  status: "작성 완료" | "작성 미완료";
  isPublic: boolean;
  isViewing?: boolean;
}

interface ResumeListProps {
  resumes: Resume[];
  onTogglePublic?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onCloseAlert?: (id: string) => void;
}

export function ResumeList({
  resumes,
  onTogglePublic,
  onEdit,
  onDelete,
  onCloseAlert,
}: ResumeListProps) {
  if (resumes.length === 0) {
    return (
      <div className="w-full py-20 flex justify-center items-center text-neutral-400 text-lg font-medium">
        생성된 이력서가 없습니다.
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1158px] inline-flex flex-col justify-start items-start gap-16">
      {resumes.map((resume) => (
        <ResumeCard
          key={resume.id}
          title={resume.title}
          status={resume.status}
          isPublic={resume.isPublic}
          isViewing={resume.isViewing}
          onTogglePublic={onTogglePublic ? () => onTogglePublic(resume.id) : undefined}
          onEdit={onEdit ? () => onEdit(resume.id) : undefined}
          onDelete={onDelete ? () => onDelete(resume.id) : undefined}
          onCloseAlert={onCloseAlert ? () => onCloseAlert(resume.id) : undefined}
        />
      ))}
    </div>
  );
}

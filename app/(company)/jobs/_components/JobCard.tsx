"use client";

import { cn } from "@/utils/utils";
import Image from "next/image";
import { JobActionButton } from "@/components/ui/JobActionButton";
import { EditDeleteButton } from "@/components/ui/EditDeleteButton";

interface ApplicantStats {
  total: number;
  applied: number;
  firstInterview: number;
  secondInterview: number;
  offer: number;
}

interface JobCardProps {
  title: string;
  category: string;
  isPublished: boolean;
  stats: ApplicantStats;
  onPublishToggle?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onViewApplicants?: () => void;
  className?: string;
}

export function JobCard({
  title,
  category,
  isPublished,
  stats,
  onPublishToggle,
  onEdit,
  onDelete,
  onViewApplicants,
  className,
}: JobCardProps) {
  return (
    <div
      className={cn(
        "self-stretch px-8 pt-8 bg-white rounded-lg flex flex-col justify-start items-start gap-8 overflow-hidden transition-all",
        "outline outline-[0.80px] outline-offset-[-0.80px] outline-neutral-200",
        isPublished ? "lc-card-shadow-hoverable hover:outline-accent" : "lc-card-shadow",
        className
      )}
    >
      {/* Status Badge */}
      <div
        data-type={isPublished ? "current" : "default"}
        className={cn(
          "px-4 py-0.5 rounded-lg inline-flex justify-start items-center gap-2.5",
          isPublished ? "bg-orange-50" : "bg-neutral-100"
        )}
      >
        <Image
          src={
            isPublished
              ? "/icons/solid-exclamation-circle-orange.svg"
              : "/icons/solid-exclamation-circle-white-gray.svg"
          }
          alt="Status icon"
          width={14}
          height={14}
          className="w-3.5 h-3.5"
        />
        <div
          className={cn(
            "justify-start text-xs font-bold font-ko-body leading-4",
            isPublished ? "text-accent" : "text-neutral-400"
          )}
        >
          {isPublished ? "채용 공고가 게시 중입니다." : "채용 공고가 게시 중이 아닙니다."}
        </div>
      </div>

      {/* Title and Actions */}
      <div className="self-stretch inline-flex justify-between items-center">
        <div className="flex justify-start items-center gap-4">
          <h3 className="justify-start text-text-primary text-2xl font-bold font-ko-body leading-8">
            {title}
          </h3>
          <div
            className={cn(
              "px-4 py-0.5 rounded-lg flex justify-center items-center gap-2.5",
              isPublished ? "bg-neutral-500" : "bg-neutral-300"
            )}
          >
            <span className="justify-start text-white text-sm font-normal font-ko-body leading-5">
              {category}
            </span>
          </div>
        </div>

        <div className="flex justify-start items-center gap-4">
          {/* Publish/Unpublish Button */}
          <JobActionButton
            variant={isPublished ? "active" : "default"}
            dataType={isPublished ? "current" : "default"}
            onClick={onPublishToggle}
          >
            {isPublished ? "게시 중" : "게시 하기"}
          </JobActionButton>

          {/* Edit Button */}
          <EditDeleteButton variant="edit" onClick={onEdit} />

          {/* Delete Button */}
          <EditDeleteButton variant="delete" onClick={onDelete} />
        </div>
      </div>

      {/* Applicant Stats */}
      <div
        data-type={isPublished ? "upload" : "notUpload"}
        className={cn(
          "w-full px-6 py-4 rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.06)] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.10)] inline-flex justify-start items-center gap-4",
          isPublished ? "bg-orange-50" : "bg-neutral-100"
        )}
      >
        <div className="flex-1 flex justify-start items-center gap-6">
          {/* Total */}
          <div className="flex justify-start items-center gap-2">
            <span
              className={cn(
                "justify-start text-sm font-medium font-ko-body leading-5",
                isPublished ? "text-neutral-500" : "text-neutral-400"
              )}
            >
              전체
            </span>
            <span
              className={cn(
                "justify-start text-sm font-bold font-ko-body leading-5",
                isPublished ? "text-text-primary" : "text-neutral-500"
              )}
            >
              {stats.total}
            </span>
          </div>

          <div
            className={cn(
              "w-4 h-0 origin-top-left rotate-90 outline outline-[0.80px] outline-offset-[-0.40px]",
              isPublished ? "outline-text-primary" : "outline-neutral-500"
            )}
          />

          {/* Applied */}
          <div className="flex justify-start items-center gap-2">
            <span
              className={cn(
                "justify-start text-sm font-medium font-ko-body leading-5",
                isPublished ? "text-neutral-500" : "text-neutral-400"
              )}
            >
              지원 접수
            </span>
            <span
              className={cn(
                "justify-start text-sm font-bold font-ko-body leading-5",
                isPublished ? "text-text-primary" : "text-neutral-500"
              )}
            >
              {stats.applied}
            </span>
          </div>

          <div
            className={cn(
              "w-4 h-0 origin-top-left rotate-90 outline outline-[0.80px] outline-offset-[-0.40px]",
              isPublished ? "outline-text-primary" : "outline-neutral-500"
            )}
          />

          {/* First Interview */}
          <div className="flex justify-start items-center gap-2">
            <span
              className={cn(
                "justify-start text-sm font-medium font-ko-body leading-5",
                isPublished ? "text-neutral-500" : "text-neutral-400"
              )}
            >
              1차 인터뷰
            </span>
            <span
              className={cn(
                "justify-start text-sm font-bold font-ko-body leading-5",
                isPublished ? "text-text-primary" : "text-neutral-500"
              )}
            >
              {stats.firstInterview}
            </span>
          </div>

          <div
            className={cn(
              "w-4 h-0 origin-top-left rotate-90 outline outline-[0.80px] outline-offset-[-0.40px]",
              isPublished ? "outline-text-primary" : "outline-neutral-500"
            )}
          />

          {/* Second Interview */}
          <div className="flex justify-start items-center gap-2">
            <span
              className={cn(
                "justify-start text-sm font-medium font-ko-body leading-5",
                isPublished ? "text-neutral-500" : "text-neutral-400"
              )}
            >
              2차 인터뷰
            </span>
            <span
              className={cn(
                "justify-start text-sm font-bold font-ko-body leading-5",
                isPublished ? "text-text-primary" : "text-neutral-500"
              )}
            >
              {stats.secondInterview}
            </span>
          </div>

          <div
            className={cn(
              "w-4 h-0 origin-top-left rotate-90 outline outline-[0.80px] outline-offset-[-0.40px]",
              isPublished ? "outline-text-primary" : "outline-neutral-500"
            )}
          />

          {/* Offer */}
          <div className="flex justify-start items-center gap-2">
            <span
              className={cn(
                "justify-start text-sm font-medium font-ko-body leading-5",
                isPublished ? "text-neutral-500" : "text-neutral-400"
              )}
            >
              입사 제안
            </span>
            <span
              className={cn(
                "justify-start text-sm font-bold font-ko-body leading-5",
                isPublished ? "text-text-primary" : "text-neutral-500"
              )}
            >
              {stats.offer}
            </span>
          </div>
        </div>

        {/* View Applicants Link */}
        <button
          data-state="default"
          onClick={onViewApplicants}
          className="h-5 cursor-pointer flex justify-start items-center gap-2 hover:opacity-70 transition-opacity"
        >
          <span className="justify-start text-neutral-500 text-sm font-medium font-ko-body leading-5">
            지원자 현황 바로가기
          </span>
          <Image
            src="/icons/outline-cheveron-right.svg"
            alt="Arrow right"
            width={18}
            height={18}
            className="w-[18px] h-[18px]"
          />
        </button>
      </div>
    </div>
  );
}

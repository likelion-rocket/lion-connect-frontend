"use client";

import Link from "next/link";
import { formatDate } from "@/utils/utils";
import type { CompanyApplicant } from "@/types/jobApplication";

interface ApplicantTableProps {
  applicants: CompanyApplicant[];
}

export default function ApplicantTable({ applicants }: ApplicantTableProps) {
  if (applicants.length === 0) {
    return (
      <div className="w-full py-16 text-center">
        <p className="text-neutral-500 text-base font-normal font-['Pretendard']">
          아직 지원자가 없습니다.
        </p>
      </div>
    );
  }

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-neutral-50 border-b-[0.80px] border-neutral-300">
          <th className="px-8 py-4 text-center text-neutral-800 text-sm font-semibold font-['Pretendard'] leading-5 w-48">
            지원자
          </th>
          <th className="px-8 py-4 text-center text-neutral-800 text-sm font-semibold font-['Pretendard'] leading-5 w-48">
            지원 포지션
          </th>
          <th className="px-8 py-4 text-center text-neutral-800 text-sm font-semibold font-['Pretendard'] leading-5 w-48">
            지원 일시
          </th>
          <th className="px-8 py-4 text-center text-neutral-800 text-sm font-semibold font-['Pretendard'] leading-5 w-48">
            이력서 바로가기
          </th>
        </tr>
      </thead>
      <tbody>
        {applicants.map((applicant, index) => (
          <tr key={`${applicant.talentProfileId}-${index}`} className="bg-white border-b-[0.80px] border-neutral-300">
            <td className="px-8 py-4">
              <div className="flex justify-start items-center gap-4">
                <span className="text-neutral-800 text-sm font-normal font-['Pretendard'] leading-5">
                  {applicant.applicantName}
                </span>
              </div>
            </td>
            <td className="px-8 py-4 text-center text-neutral-800 text-sm font-normal font-['Pretendard'] leading-5">
              {applicant.jobGroupName}/{applicant.jobRoleName}
            </td>
            <td className="px-8 py-4 text-center text-neutral-800 text-sm font-normal font-['Pretendard'] leading-5">
              {formatDate(applicant.appliedAt)}
            </td>
            <td className="px-8 py-4 text-center">
              <Link
                href={`/talents/${applicant.talentProfileId}`}
                className="bg-orange-600 w-[128px] h-[41px] rounded-lg inline-flex justify-center items-center px-5 py-2.5 text-white hover:shadow-[0px_4px_6px_-2px_rgba(255,96,0,0.05),0px_10px_15px_-3px_rgba(255,96,0,0.20)] active:text-neutral-300 text-sm font-bold font-['Pretendard'] leading-5"
              >
                이력서 바로가기
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

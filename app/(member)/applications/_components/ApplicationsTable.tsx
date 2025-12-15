"use client";

import Image from "next/image";
import Link from "next/link";
import { useJobApplications } from "@/hooks/useJobApplications";
import { formatDate } from "@/utils/utils";
import type { JobApplication } from "@/types/jobApplication";

interface ApplicationsTableProps {
  page: number;
  size: number;
}

export default function ApplicationsTable({ page = 0, size = 10 }: ApplicationsTableProps) {
  const { data, isLoading, error } = useJobApplications({ page, size });

  if (isLoading) {
    return (
      <div className="w-full py-20 text-center text-neutral-500">
        <p>로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-20 text-center text-red-500">
        <p>데이터를 불러오는데 실패했습니다.</p>
      </div>
    );
  }

  if (!data || data.content.length === 0) {
    return (
      <div className="w-full py-20 text-center text-neutral-500">
        <p>지원 내역이 없습니다.</p>
      </div>
    );
  }
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-neutral-50 border-b-[0.80px] border-neutral-300">
          <th className="px-8 py-4 text-center text-neutral-800 text-sm font-semibold font-['Pretendard'] leading-5 w-48">
            지원 회사
          </th>
          <th className="px-8 py-4 text-center text-neutral-800 text-sm font-semibold font-['Pretendard'] leading-5 w-48">
            지원 포지션
          </th>
          <th className="px-8 py-4 text-center text-neutral-800 text-sm font-semibold font-['Pretendard'] leading-5 w-48">
            지원 일시
          </th>
          <th className="px-8 py-4 text-center text-neutral-800 text-sm font-semibold font-['Pretendard'] leading-5 w-48">
            지원 취소
          </th>
          <th className="px-8 py-4 text-center text-neutral-800 text-sm font-semibold font-['Pretendard'] leading-5 w-48">
            해당 공고 바로가기
          </th>
        </tr>
      </thead>
      <tbody>
        {data.content.map((application: JobApplication) => (
          <tr
            key={application.jobApplicationId}
            className="bg-white border-b-[0.80px] border-neutral-300"
          >
            <td className="px-8 py-4">
              <div className="flex justify-start items-center gap-4">
                <Image
                  className="w-6 h-6 relative rounded"
                  src="/images/companyLogo.png"
                  alt={application.companyName}
                  width={24}
                  height={24}
                />
                <span className="text-neutral-800 text-sm font-normal font-['Pretendard'] leading-5">
                  {application.companyName}
                </span>
              </div>
            </td>
            <td className="px-8 py-4 text-center text-neutral-800 text-sm font-normal font-['Pretendard'] leading-5">
              {application.jobGroupName}/{application.jobRoleName}
            </td>
            <td className="px-8 py-4 text-center text-neutral-800 text-sm font-normal font-['Pretendard'] leading-5">
              {formatDate(application.appliedAt)}
            </td>
            <td className="px-8 py-4 text-center text-neutral-800 text-sm font-normal font-['Pretendard'] leading-5">
              <button className="cursor-pointer">
                <span className="text-orange-600 hover:underline">지원 취소</span>
              </button>
            </td>
            <td className="px-8 py-4 text-center">
              <Link
                href={`/job-board/${application.jobApplicationId}`}
                className="bg-orange-600 w-[150px] h-[41px] rounded-lg inline-flex justify-center items-center px-5 py-2.5 text-white hover:shadow-[0px_4px_6px_-2px_rgba(255,96,0,0.05),0px_10px_15px_-3px_rgba(255,96,0,0.20)] active:text-neutral-300 text-sm font-bold font-['Pretendard'] leading-5 active:bg-orange-700"
              >
                해당 공고 바로가기
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

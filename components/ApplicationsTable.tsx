"use client";

import Image from "next/image";

interface Application {
  id: number;
  companyName: string;
  position: string;
  appliedDate: string;
  hasButton: boolean;
}

interface ApplicationsTableProps {
  applications: Application[];
}

export default function ApplicationsTable({ applications }: ApplicationsTableProps) {
  const handleCancelApplication = (id: number) => {
    // TODO: 지원 취소 API 호출
    console.log("지원 취소:", id);
  };

  return (
    <div className="flex flex-col">
      {/* 테이블 헤더 */}
      <div className="self-stretch px-8 py-6 border-b-[0.80px] border-border-quaternary flex items-center gap-5">
        <div className="w-48 flex items-center gap-4">
          <div className="w-6 h-6" />
          <div className="flex-1 text-text-primary text-base font-semibold font-body leading-6">
            지원 회사
          </div>
        </div>
        <div className="w-48 flex justify-center items-center">
          <div className="text-text-primary text-base font-semibold font-body leading-6">
            지원 포지션
          </div>
        </div>
        <div className="w-48 flex justify-center items-center">
          <div className="text-text-primary text-base font-semibold font-body leading-6">
            작성시간
          </div>
        </div>
        <div className="w-48" />
      </div>

      {/* 테이블 바디 */}
      <div className="flex flex-col">
        {applications.map((application) => (
          <div
            key={application.id}
            className="h-[65px] px-8 bg-bg-primary border-b-[0.80px] border-border-quaternary flex items-center gap-8"
          >
            <div className="flex-1 flex items-center gap-5">
              <div className="w-48 flex items-center gap-4">
                <Image
                  className="rounded"
                  src="/images/companyLogo.png"
                  alt={`${application.companyName} 로고`}
                  width={24}
                  height={24}
                />
                <div className="flex-1 text-text-primary text-sm font-normal font-body leading-5">
                  {application.companyName}
                </div>
              </div>
              <div className="w-48 flex justify-center items-center">
                <div className="text-text-primary text-sm font-normal font-body leading-5">
                  {application.position}
                </div>
              </div>
              <div className="w-48 flex justify-center items-center">
                <div className="text-text-primary text-sm font-normal font-body leading-5">
                  {application.appliedDate}
                </div>
              </div>
              <div className="w-48" />
            </div>
            {application.hasButton && (
              <div className="w-28 flex justify-center">
                <button
                  onClick={() => handleCancelApplication(application.id)}
                  className="px-4 py-1.5 bg-bg-primary rounded-lg outline outline-[0.80px] outline-offset-[-0.80px] outline-text-inverse-primary flex justify-center items-center hover:outline-text-accent transition-colors group"
                >
                  <span className="text-text-inverse-primary text-sm font-normal font-body leading-5 group-hover:text-text-accent transition-colors">
                    지원 취소
                  </span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

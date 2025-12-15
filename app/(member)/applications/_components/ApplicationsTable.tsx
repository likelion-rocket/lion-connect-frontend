"use client";

import Image from "next/image";
import Link from "next/link";

type ApplicationStatus = "지원 접수" | "서류 통과" | "최종 합격" | "불합격";

interface Application {
  id: number;
  name: string;
  profileImage: string;
  position: string;
  appliedDate: string;
  status: ApplicationStatus;
}

const MOCK_DATA: Application[] = [
  {
    id: 1,
    name: "최유진",
    profileImage: "/images/companyLogo.png",
    position: "주니어 디자이너",
    appliedDate: "2024. 03. 15",
    status: "지원 접수",
  },
  {
    id: 2,
    name: "홍길동",
    profileImage: "/images/companyLogo.png",
    position: "주니어 디자이너",
    appliedDate: "YYYY. MM. DD",
    status: "서류 통과",
  },
  {
    id: 3,
    name: "김철수",
    profileImage: "/images/companyLogo.png",
    position: "주니어 디자이너",
    appliedDate: "YYYY. MM. DD",
    status: "서류 통과",
  },
  {
    id: 4,
    name: "김하나",
    profileImage: "/images/companyLogo.png",
    position: "주니어 디자이너",
    appliedDate: "YYYY. MM. DD",
    status: "불합격",
  },
  {
    id: 5,
    name: "신동엽",
    profileImage: "/images/companyLogo.png",
    position: "주니어 디자이너",
    appliedDate: "YYYY. MM. DD",
    status: "지원 접수",
  },
  {
    id: 6,
    name: "류진아",
    profileImage: "/images/companyLogo.png",
    position: "주니어 디자이너",
    appliedDate: "YYYY. MM. DD",
    status: "지원 접수",
  },
  {
    id: 7,
    name: "신현준",
    profileImage: "/images/companyLogo.png",
    position: "주니어 디자이너",
    appliedDate: "YYYY. MM. DD",
    status: "지원 접수",
  },
  {
    id: 8,
    name: "손동엽",
    profileImage: "/images/companyLogo.png",
    position: "주니어 디자이너",
    appliedDate: "YYYY. MM. DD",
    status: "서류 통과",
  },
  {
    id: 9,
    name: "손동엽",
    profileImage: "/images/companyLogo.png",
    position: "주니어 디자이너",
    appliedDate: "YYYY. MM. DD",
    status: "서류 통과",
  },
  {
    id: 10,
    name: "손하엽",
    profileImage: "/images/companyLogo.png",
    position: "주니어 디자이너",
    appliedDate: "YYYY. MM. DD",
    status: "서류 통과",
  },
  {
    id: 11,
    name: "손동엽",
    profileImage: "/images/companyLogo.png",
    position: "주니어 디자이너",
    appliedDate: "YYYY. MM. DD",
    status: "서류 통과",
  },
];

export default function ApplicationsTable() {
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
            해당 공고 바로가기
          </th>
        </tr>
      </thead>
      <tbody>
        {MOCK_DATA.map((applicant) => (
          <tr key={applicant.id} className="bg-white border-b-[0.80px] border-neutral-300">
            <td className="px-8 py-4">
              <div className="flex justify-start items-center gap-4">
                <Image
                  className="w-6 h-6 relative rounded"
                  src={applicant.profileImage}
                  alt={applicant.name}
                  width={24}
                  height={24}
                />
                <span className="text-neutral-800 text-sm font-normal font-['Pretendard'] leading-5">
                  {applicant.name}
                </span>
              </div>
            </td>
            <td className="px-8 py-4 text-center text-neutral-800 text-sm font-normal font-['Pretendard'] leading-5">
              {applicant.position}
            </td>
            <td className="px-8 py-4 text-center text-neutral-800 text-sm font-normal font-['Pretendard'] leading-5">
              {applicant.appliedDate}
            </td>
            <td className="px-8 py-4 text-center">
              <Link
                href={`/job-board/${applicant.id}`}
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

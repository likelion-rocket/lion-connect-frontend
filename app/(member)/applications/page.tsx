import ApplicationsTable from "@/components/ApplicationsTable";
import Pager from "@/components/Pager";

// 목 데이터
const mockApplications = [
  {
    id: 1,
    companyName: "멋쟁이사자처럼",
    position: "주니어 디자이너",
    appliedDate: "YYYY. MM. DD",
    hasButton: true,
  },
  {
    id: 2,
    companyName: "멋쟁이기린처럼",
    position: "주니어 디자이너",
    appliedDate: "YYYY. MM. DD",
    hasButton: false,
  },
  {
    id: 3,
    companyName: "멋쟁이하마처럼",
    position: "주니어 디자이너",
    appliedDate: "YYYY. MM. DD",
    hasButton: true,
  },
  {
    id: 4,
    companyName: "멋쟁이쿼카처럼",
    position: "주니어 디자이너",
    appliedDate: "YYYY. MM. DD",
    hasButton: true,
  },
  {
    id: 5,
    companyName: "멋쟁이강아지처럼",
    position: "주니어 디자이너",
    appliedDate: "YYYY. MM. DD",
    hasButton: true,
  },
  {
    id: 6,
    companyName: "멋쟁이늑대처럼",
    position: "주니어 디자이너",
    appliedDate: "YYYY. MM. DD",
    hasButton: false,
  },
  {
    id: 7,
    companyName: "멋쟁이호랑이처럼",
    position: "주니어 디자이너",
    appliedDate: "YYYY. MM. DD",
    hasButton: false,
  },
];

export default function ApplicationsPage() {
  return (
    <div className="flex flex-col gap-8 w-[1160px]">
      <div className="w-[1157.56px] inline-flex justify-between items-center">
    <div className="justify-start text-neutral-800 text-xl font-bold font-['Pretendard'] leading-7">지원 현황</div>
</div>
      <ApplicationsTable applications={mockApplications} />
      <Pager currentPage={1} totalPages={5} className="mt-8" />
    </div>
  );
}

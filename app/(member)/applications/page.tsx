import ApplicationsTable from "./_components/ApplicationsTable";
import BackButton from "@/components/buttons/BackButton";
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
    <div className="w-full min-h-screen bg-white pb-[168px]">
      <div className="max-w-[1160px] mx-auto px-4 py-8 flex flex-col gap-12">
        <BackButton />
        <h1 className="text-2xl font-bold text-neutral-800">지원자 현황</h1>
        <ApplicationsTable />
        <Pager currentPage={1} totalPages={1} />
      </div>
    </div>
  );
}

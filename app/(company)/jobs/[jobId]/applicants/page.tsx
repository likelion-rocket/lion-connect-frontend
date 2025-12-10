import Pager from "@/components/Pager";
import ApplicantStats from "./_components/ApplicantStats";
import ApplicantTable from "./_components/ApplicantTable";
import BackButton from "../../../../../components/buttons/BackButton";

export default async function ApplicantsPage({ params }: { params: Promise<{ jobId: string }> }) {
  return (
    <div className="w-full min-h-screen bg-white pb-[168px]">
      <div className="max-w-[1160px] mx-auto px-4 py-8 flex flex-col gap-12">
        <BackButton />
        <h1 className="text-2xl font-bold text-neutral-800">지원자 현황</h1>
        <ApplicantTable />
        <Pager currentPage={1} totalPages={1} />
      </div>
    </div>
  );
}

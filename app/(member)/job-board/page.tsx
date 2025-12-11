import { JobSelector } from "@/components/ui/job-selector";
import { JobList } from "./_components/JobList";

export default function JobBoardPage() {
  return (
    <div className="container mx-auto pt-[80px] pb-[90px]">
      <div className="w-[1160px] mx-auto">
        <JobSelector />
        <JobList />
      </div>
    </div>
  );
}

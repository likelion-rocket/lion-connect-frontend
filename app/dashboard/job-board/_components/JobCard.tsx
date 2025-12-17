"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/utils/utils";

interface JobCardProps extends React.HTMLAttributes<HTMLDivElement> {
  jobPostingId: number;
  title: string;
  company: string;
  location: string;
  jobRoleName?: string;
  imageUrl?: string;
}

export function JobCard({
  jobPostingId,
  title,
  company,
  location,
  jobRoleName,
  imageUrl = "/images/3_2.png",
  className,
  ...props
}: JobCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/dashboard/job-board/${jobPostingId}`);
  };

  return (
    <div
      className={cn(
        "w-[275px] inline-flex flex-col justify-start items-start gap-2 overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      <div className="w-[275px] h-[184px] relative bg-gradient-to-l from-black/10 via-black/0 to-black/20 rounded-lg overflow-hidden">
        <Image src={imageUrl} alt={title} fill className="object-cover" sizes="275px" />
        <div className="w-6 h-6 left-[222px] top-[10px] absolute" />
      </div>
      <div className="w-full px-1.5 bg-white flex flex-col justify-start items-start gap-2.5 overflow-hidden">
        <div className="w-full flex flex-col justify-start items-start gap-1">
          <div className="w-full justify-start text-neutral-800 text-sm font-semibold font-['Pretendard'] leading-5">
            {jobRoleName}
          </div>
          <div className="w-full justify-start text-neutral-500 text-xs font-medium font-['Pretendard'] leading-4">
            {company || "기업"}
          </div>
          <div className="w-full justify-start text-neutral-500 text-xs font-medium font-['Pretendard'] leading-4">
            {location}
          </div>
        </div>
      </div>
    </div>
  );
}

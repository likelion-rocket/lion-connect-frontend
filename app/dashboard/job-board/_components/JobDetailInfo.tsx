interface JobDetailInfoProps {
  companyName: string;
  jobTitle: string;
}

export default function JobDetailInfo({
  companyName,
  jobTitle,
}: JobDetailInfoProps) {
  return (
    <div className="self-stretch flex flex-col justify-start items-center gap-8">
      <div className="self-stretch inline-flex justify-start items-center">
        <div className="border-b-[0.80px] border-neutral-800 flex justify-center items-center gap-2.5">
          <div className="justify-start text-neutral-800 text-lg font-semibold font-['Pretendard'] leading-7">
            {companyName}
          </div>
        </div>
      </div>
      <div className="self-stretch justify-start text-neutral-800 text-3xl font-bold font-['Pretendard'] leading-9">
        {jobTitle}
      </div>
    </div>
  );
}

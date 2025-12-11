interface JobDetailSectionProps {
  title: string;
  content: string;
}

export default function JobDetailSection({
  title,
  content,
}: JobDetailSectionProps) {
  return (
    <div className="self-stretch flex flex-col justify-start items-start gap-6">
      <div className="self-stretch justify-start text-neutral-800 text-lg font-semibold font-['Pretendard'] leading-7">
        {title}
      </div>
      <div className="self-stretch min-h-11 inline-flex justify-start items-start gap-2.5">
        <div className="flex-1 justify-start text-neutral-800 text-sm font-normal font-['Pretendard'] leading-5 whitespace-pre-wrap">
          {content}
        </div>
      </div>
    </div>
  );
}

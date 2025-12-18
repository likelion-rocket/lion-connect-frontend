export function JobCardSkeleton() {
  return (
    <div className="self-stretch p-8 bg-white rounded-lg flex flex-col justify-start items-start gap-8 overflow-hidden outline outline-[0.80px] outline-offset-[-0.80px] outline-neutral-200 lc-card-shadow">
      {/* Status Badge Skeleton */}
      <div className="px-4 py-0.5 rounded-lg inline-flex justify-start items-center gap-2.5 bg-neutral-100">
        <div className="w-3.5 h-3.5 rounded-full bg-neutral-200 animate-pulse" />
        <div className="w-48 h-4 rounded bg-neutral-200 animate-pulse" />
      </div>

      {/* Title and Actions Skeleton */}
      <div className="self-stretch inline-flex justify-between items-center">
        <div className="flex justify-start items-center gap-4">
          {/* Title Skeleton */}
          <div className="w-52 h-8 rounded bg-neutral-200 animate-pulse" />
          {/* Category Badge Skeleton */}
          <div className="px-4 py-0.5 rounded-lg bg-neutral-200 animate-pulse">
            <div className="w-20 h-5 opacity-0" />
          </div>
        </div>

        <div className="flex justify-start items-center gap-4">
          {/* Buttons Skeleton */}
          <div className="w-24 h-9 rounded-lg bg-neutral-200 animate-pulse" />
          <div className="w-9 h-9 rounded-lg bg-neutral-200 animate-pulse" />
          <div className="w-9 h-9 rounded-lg bg-neutral-200 animate-pulse" />
        </div>
      </div>

      {/* View Applicants Button Skeleton */}
      <div className="w-60 h-12 px-6 py-4 rounded-lg bg-neutral-200 animate-pulse" />
    </div>
  );
}

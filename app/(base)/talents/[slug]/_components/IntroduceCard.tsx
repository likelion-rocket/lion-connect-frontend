// components/talents/IntroduceCard.tsx
import Link from "next/link";
import Image from "next/image";
import Badge from "@/components/ui/badge";
import type { BadgeType } from "@/components/ui/badge";
import Slider from "../../../../../components/Slider.client";
import SkillChips from "@/components/chips/SkillChips";

type BadgeItem = { label: string; type: BadgeType };

type IntroduceCardProps = {
  name: string;
  profileImageUrl?: string | null;
  badges?: BadgeItem[];
  tendencies?: string[];
  phone?: string | null;
  email?: string | null;
  university?: string | null;
  major?: string | null;
  jobGroup?: string | null;
  job?: string | null;
  skills?: string[];
  className?: string;
  viewCount?: number;
  detailHref?: string;
  slug?: string;
  showContacts?: boolean;
  ctaLabel?: string;
  summary?: string;
  showSummary?: boolean;
};

export default async function IntroduceCard(props: IntroduceCardProps) {
  const {
    name,
    profileImageUrl,
    badges = [],
    tendencies = [],
    phone,
    email,
    university,
    major,
    jobGroup,
    job,
    skills = [],
    className = "",
    detailHref,
    slug,
    showContacts = true,
    ctaLabel = "상세 보기",
    summary,
    showSummary = true,
  } = props;

  const src = profileImageUrl || "/images/default-profile.png";
  const href = detailHref ?? (slug ? `/talents/${slug}` : undefined);

  const CardBody = (
    <section
      className={`w-[910px] mx-auto mb-6 rounded-2xl shadow-[0px_1px_2px_rgba(0,0,0,0.06),0px_1px_3px_rgba(0,0,0,0.10)] bg-white p-8 ${className}`}
    >
      <div className="flex items-start gap-[88px]">
        {/* 왼쪽: 프로필 + 버튼 자리 */}
        <div className="shrink-0">
          <div className="w-40 h-48 relative rounded-md overflow-hidden bg-[#F5F5F5] border border-border-quaternary">
            <Image src={src} alt={`${name} 프로필 이미지`} fill className="object-cover" priority />
          </div>

          {href && (
            <span
              className="mt-3 block h-10 w-40 rounded-md bg-[#FF6000] text-white text-center leading-10 font-semibold
                         hover:opacity-90 transition"
            >
              {ctaLabel}
            </span>
          )}
        </div>

        {/* 오른쪽: 본문 */}
        <div className="flex-1 min-w-0 mb-4">
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-[18px] sm:text-[20px] font-bold text-black">{name}</h2>
            {badges.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {badges.map((b) => (
                  <Badge key={`${b.type}-${b.label}`} label={b.label} type={b.type} />
                ))}
              </div>
            )}
          </div>

          {tendencies.length > 0 && <Slider items={tendencies} className="mt-4" />}

          {showSummary && !!summary && (
            <p
              className="mt-4 text-[14px] leading-6 text-[#111] border-none outline-none bg-transparent"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {summary}
            </p>
          )}

          {showContacts && (phone || email) && (
            <div className="mt-4 flex items-center gap-12 text-[14px] text-black">
              {phone && (
                <span className="flex items-center gap-2">
                  <Image src="/icons/solid-phone.svg" alt="phone" width={16} height={16} />
                  <span>{phone}</span>
                </span>
              )}
              {email && (
                <span className="flex items-center gap-2">
                  <Image src="/icons/solid-mail.svg" alt="mail" width={16} height={16} />
                  <span>{email}</span>
                </span>
              )}
            </div>
          )}

          {/* 🔹 학교·전공 / 직무·직군 / 스킬: 하나의 컬럼으로 묶어서 간격 통일 */}
          <div className="mt-6 flex flex-col gap-3 text-[14px]">
            {/* 학교 · 전공 */}
            <div className="flex items-center gap-10">
              <span className="text-[#888] w-[72px]">학교 · 전공</span>
              {university || major ? (
                <span className="text-[#111] font-medium">
                  {university ?? "-"}
                  {university && major ? " · " : ""}
                  {major ?? (university ? "" : "-")}
                </span>
              ) : (
                <span className="text-[#B0B0B0]">등록된 학교·전공 정보가 없습니다.</span>
              )}
            </div>

            {/* 직무 · 직군 */}
            <div className="flex items-center gap-10">
              <span className="text-[#888] w-[72px]">직무 · 직군</span>
              {jobGroup || job ? (
                <span className="text-[#111] font-medium">
                  {jobGroup ?? "-"}
                  {jobGroup && job ? " · " : ""}
                  {job ?? (jobGroup ? "" : "-")}
                </span>
              ) : (
                <span className="text-[#B0B0B0]">등록된 직무·직군 정보가 없습니다.</span>
              )}
            </div>

            {/* 스킬 */}
            <div className="flex items-start gap-10">
              <span className="text-[#888] w-[72px]">스킬</span>
              {skills.length > 0 ? (
                <SkillChips skills={skills} />
              ) : (
                <span className="text-[#B0B0B0] text-[14px]">등록된 스킬이 없습니다.</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  return href ? (
    <Link href={href} aria-label={`${name} 상세 페이지로 이동`} className="block rounded-2xl">
      {CardBody}
    </Link>
  ) : (
    CardBody
  );
}

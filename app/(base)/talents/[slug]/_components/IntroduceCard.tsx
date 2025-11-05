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

  /** 🔹 리스트 전용 옵션들 */
  /** 이름 오른쪽에 조회수 표기 (예: 245) */
  viewCount?: number;
  /** 상세 페이지 경로. slug만 주면 /talents/[slug] 로 만듭니다 */
  detailHref?: string;
  slug?: string;
  /** 연락처 노출 여부 (기본 true). 리스트에선 false로 넘기세요 */
  showContacts?: boolean;
  /** 상세 버튼 텍스트 (기본: "상세 보기") */
  ctaLabel?: string;
  // ✅ 리스트 전용: 간단소개 (탐색 페이지에서만 넘겨줌)
  summary?: string;
  showSummary?: boolean; // 기본 true
};

export default async function IntroduceCard({
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
  // 리스트 전용
  viewCount,
  detailHref,
  slug,
  showContacts = true,
  ctaLabel = "상세 보기",
  summary,
  showSummary = true,
}: IntroduceCardProps) {
  const src = profileImageUrl || "/images/default-profile.png";
  const href = detailHref ?? (slug ? `/talents/${slug}` : undefined);

  return (
    <section
      className={`w-[910px] mx-auto mb-6 rounded-2xl shadow-[0px_1px_2px_rgba(0,0,0,0.06),0px_1px_3px_rgba(0,0,0,0.10)] bg-white p-8 ${className}`}
    >
      <div className="flex items-start gap-[88px]">
        {/* 왼쪽: 프로필 이미지 + 상세 버튼 */}
        <div className="shrink-0">
          <div className="w-40 h-48 relative rounded-md overflow-hidden bg-[#F5F5F5] border border-border-quaternary">
            <Image src={src} alt={`${name} 프로필 이미지`} fill className="object-cover" priority />
          </div>

          {/* 🔸 리스트: 상세 보기 버튼 */}
          {href && (
            <Link
              href={href}
              className="mt-3 block h-10 w-40 rounded-md bg-[#FF6000] text-white text-center leading-10 font-semibold hover:opacity-90 transition"
            >
              {ctaLabel}
            </Link>
          )}
        </div>

        {/* 오른쪽: 본문 */}
        <div className="flex-1 min-w-0 mb-4">
          {/* 이름 / (조회수 슬롯) / 배지들 */}
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-[18px] sm:text-[20px] font-bold text-black">{name}</h2>

            {/* ✅ 조회수 슬롯: 값 없으면 invisible로 가려 '자리만' 유지 */}
            <span
              className={[
                "flex items-center gap-1 text-[13px] text-[#666]",
                viewCount == null ? "invisible" : "",
              ].join(" ")}
              aria-hidden={viewCount == null}
            >
              <Image src="/icons/outline-eye.svg" alt="views" width={16} height={16} />
              {/* 폭 역동성 줄이려고 tabular-nums + min-w 지정 */}
              <span className="tabular-nums min-w-8 text-center">
                {(viewCount ?? 0).toLocaleString()}
              </span>
            </span>

            {/* ✅ 배지는 항상 노출 */}
            {badges.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {badges.map((b) => (
                  <Badge key={`${b.type}-${b.label}`} label={b.label} type={b.type} />
                ))}
              </div>
            )}
          </div>

          {/* 성향 칩 */}
          {tendencies.length > 0 && <Slider items={tendencies} className="mt-4" />}
          {/* ✅ 리스트 전용: 간단소개 (summary가 있을 때만) */}
          {showSummary && !!summary && (
            <p
              className="mt-4 text-[14px] leading-6 text-[#111]"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2, // 2줄 말줄임
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {summary}
            </p>
          )}

          {/* 연락처 (옵션) */}
          {showContacts && (phone || email) && (
            <div className="mt-4 flex items-center gap-12 text-[14px] text-black">
              {phone && (
                <a
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-2 hover:opacity-80"
                >
                  <Image src="/icons/solid-phone.svg" alt="phone" width={16} height={16} />
                  <span>{phone}</span>
                </a>
              )}
              {email && (
                <a href={`mailto:${email}`} className="flex items-center gap-2 hover:opacity-80">
                  <Image src="/icons/solid-mail.svg" alt="mail" width={16} height={16} />
                  <span>{email}</span>
                </a>
              )}
            </div>
          )}

          {/* 학교 / 전공 / 직무 */}
          {(university || major || job || jobGroup) && (
            <div className="mt-6 flex flex-col gap-2 text-[14px]">
              {(university || major) && (
                <div className="flex items-center gap-10">
                  <span className="text-[#888] w-[72px]">학교/전공</span>
                  <span className="text-[#111] font-medium">
                    {university ?? "-"} {major && `/${major}`}
                  </span>
                </div>
              )}
              {(job || jobGroup) && (
                <div className="flex items-center gap-10">
                  <span className="text-[#888] w-[72px]">직무/직군</span>
                  <span className="text-[#111] font-medium">
                    {jobGroup ?? "-"} {job && `/${job}`}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* 스킬 */}
          {skills.length > 0 && (
            <div className="mt-4 flex items-start gap-10">
              <span className="text-[#888] w-[72px]">스킬</span>
              <SkillChips skills={skills} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

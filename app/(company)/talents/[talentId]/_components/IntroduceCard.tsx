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
  phoneNumber?: string | null;
  email?: string | null;
  university?: string | null;
  major?: string | null;
  jobGroup?: string | null;
  job?: string | null;
  skills?: string[];
  className?: string;
  viewCount?: number;
  detailHref?: string;
  talentId?: string;
  showContacts?: boolean;
  ctaLabel?: string;
  summary?: string;
  showSummary?: boolean;
  /** 🔥 API에서 오는 썸네일 URL */
  thumbnailUrl?: string | null;
  /** Work Driven Level (1-5) */
  workDrivenLevel?: number;
  /** 경험 타입 배열 (서버에서 받아오는 데이터) */
  experiences?: string[];
  /** 리스팅 페이지에서 상세보기 버튼 표시 여부 */
  showDetailButton?: boolean;
};

export default function IntroduceCard(props: IntroduceCardProps) {
  const {
    name,
    profileImageUrl,
    badges = [],
    tendencies = [],
    phoneNumber,
    email,
    university,
    major,
    jobGroup,
    job,
    skills = [],
    className = "",
    detailHref,
    talentId,
    showContacts = true,
    ctaLabel = "상세 보기",
    summary,
    showSummary = true,
    thumbnailUrl,
    workDrivenLevel,
    experiences = [],
    showDetailButton = false,
  } = props;

  // 프로필 이미지 URL 처리: thumbnailUrl 우선, 없으면 profileImageUrl, 둘 다 없으면 기본 이미지
  const getValidImageSrc = (url?: string | null): string => {
    if (!url || !url.trim()) return "/images/default-profile.png";

    const trimmedUrl = url.trim();

    // 로컬 경로인 경우 (/, . 으로 시작)
    if (trimmedUrl.startsWith("/") || trimmedUrl.startsWith(".")) {
      return trimmedUrl;
    }

    // 외부 URL 유효성 검증
    try {
      new URL(trimmedUrl);
      return trimmedUrl;
    } catch {
      return "/images/default-profile.png";
    }
  };

  const src = getValidImageSrc(thumbnailUrl ?? profileImageUrl);
  const href = detailHref ?? (talentId ? `/talents/${talentId}` : undefined);

  // 경험 텍스트를 Badge 타입으로 매핑
  const EXPERIENCE_TO_BADGE_TYPE: Record<string, BadgeType> = {
    "부트캠프 경험자": "bootcamp",
    "창업 경험자": "startup",
    "자격증 보유자": "certified",
    전공자: "major",
  };

  // Badge 타입별 우선순위 (밝은색부터 어두운색 순)
  const badgeOrder: Record<BadgeType, number> = {
    bootcamp: 1,
    startup: 2,
    certified: 3,
    major: 4,
  };

  // experiences 배열을 Badge 형태로 변환
  const experienceBadges: BadgeItem[] = experiences
    .map((exp) => {
      const type = EXPERIENCE_TO_BADGE_TYPE[exp];
      if (!type) return null;
      return { label: exp, type };
    })
    .filter((badge): badge is BadgeItem => badge !== null);

  // experiences가 있으면 우선 사용, 없으면 기존 badges 사용
  const finalBadges = experienceBadges.length > 0 ? experienceBadges : badges;
  const sortedBadges = finalBadges.sort((a, b) => badgeOrder[a.type] - badgeOrder[b.type]);

  // Work Driven Level 이미지 경로
  const validLevel = workDrivenLevel ? Math.min(Math.max(1, Math.round(workDrivenLevel)), 5) : null;
  const levelImagePath = validLevel ? `/images/detailpage-type=level${validLevel}.svg` : null;

  const CardBody = (
    <section className={`mx-auto mb-6 rounded-2xl bg-white p-8 ${className}`}>
      <div className="inline-flex justify-start items-center gap-12">
        {/* 왼쪽: 프로필 */}
        <div className="w-40 inline-flex flex-col justify-start items-start gap-8">
          <div className="w-40 h-48 relative rounded-lg overflow-hidden bg-[#F5F5F5] border border-border-quaternary">
            <Image src={src} alt={`${name} 프로필 이미지`} fill className="object-cover" priority />
          </div>
          {/* 리스팅 페이지에서만 상세보기 버튼 표시 */}
          {showDetailButton && href && (
            <Link
              href={href}
              className="w-40 px-8 py-2 bg-orange-600 rounded-lg inline-flex justify-center items-center gap-2.5 hover:bg-orange-700 transition"
            >
              <span className="text-white text-base font-bold">{ctaLabel}</span>
            </Link>
          )}
        </div>

        {/* 중간: 본문 컨텐츠 */}
        <div className="px-2.5 inline-flex flex-col justify-start items-start gap-2.5">
          <div className="flex flex-col justify-start items-start gap-6">
            {/* 이름 & 배지 */}
            <div className="inline-flex justify-start items-center gap-8">
              <div className="p-2 flex justify-center items-center gap-2.5">
                <h2 className="text-xl font-semibold text-neutral-800">{name}</h2>
              </div>
              {sortedBadges.length > 0 && (
                <div className="w-[471px] flex justify-start items-center gap-3 flex-wrap">
                  {sortedBadges.map((b) => (
                    <Badge key={`${b.type}-${b.label}`} label={b.label} type={b.type} />
                  ))}
                </div>
              )}
            </div>

            {/* 상세 정보 */}
            <div className="self-stretch px-2 flex flex-col justify-start items-start gap-4">
              {/* 연락처 */}
              {showContacts && (phoneNumber || email) && (
                <div className="self-stretch h-9 inline-flex justify-start items-center gap-8">
                  {phoneNumber && (
                    <div className="flex justify-start items-center gap-2">
                      <Image src="/icons/solid-phone.svg" alt="phone" width={16} height={16} />
                      <div className="text-sm font-medium text-neutral-800">{phoneNumber}</div>
                    </div>
                  )}
                  {email && (
                    <div className="flex justify-start items-center gap-2">
                      <Image src="/icons/solid-mail.svg" alt="mail" width={16} height={16} />
                      <div className="text-sm font-medium text-neutral-800">{email}</div>
                    </div>
                  )}
                </div>
              )}

              {/* 학교 · 전공 */}
              {(university || major) && (
                <div className="self-stretch inline-flex justify-start items-center gap-16">
                  <div className="flex justify-start items-center gap-2">
                    <Image
                      src="/icons/outline-academic-cap.svg"
                      alt="academic"
                      width={16}
                      height={16}
                    />
                    <div className="text-sm text-gray-500">학교 · 전공</div>
                  </div>
                  <div className="text-sm font-medium text-neutral-800">
                    {university ?? "-"}
                    {university && major ? " · " : ""}
                    {major ?? (university ? "" : "-")}
                  </div>
                </div>
              )}

              {/* 직군 · 직무 */}
              {(jobGroup || job) && (
                <div className="self-stretch inline-flex justify-start items-center gap-16">
                  <div className="flex justify-start items-center gap-2">
                    <Image
                      src="/icons/outline-briefcase.svg"
                      alt="briefcase"
                      width={16}
                      height={16}
                    />
                    <div className="text-sm text-gray-500">직군 · 직무</div>
                  </div>
                  <div className="text-sm font-medium text-neutral-800">
                    {jobGroup ?? "-"}
                    {jobGroup && job ? " · " : ""}
                    {job ?? (jobGroup ? "" : "-")}
                  </div>
                </div>
              )}

              {/* 스킬 */}
              {skills.length > 0 && (
                <div className="self-stretch inline-flex justify-start items-start gap-16">
                  <div className="flex justify-start items-center gap-2">
                    <Image src="/icons/outline-code.svg" alt="code" width={16} height={16} />
                    <div className="min-w-14 text-sm text-gray-500">스킬</div>
                  </div>
                  <div className="flex justify-start items-center gap-4">
                    <SkillChips skills={skills} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Work Driven Level Card */}
        {levelImagePath && (
          <div className="w-72 h-72 relative bg-white rounded-2xl overflow-hidden">
            <Image
              src={levelImagePath}
              alt={`Work Driven Level ${validLevel}`}
              width={288}
              height={288}
              className="w-72 h-72 object-contain"
              priority
            />
          </div>
        )}
      </div>
    </section>
  );

  // showDetailButton이 true면 버튼이 있으므로 Link로 감싸지 않음
  return href && !showDetailButton ? (
    <Link href={href} aria-label={`${name} 상세 페이지로 이동`} className="block rounded-2xl">
      {CardBody}
    </Link>
  ) : (
    CardBody
  );
}

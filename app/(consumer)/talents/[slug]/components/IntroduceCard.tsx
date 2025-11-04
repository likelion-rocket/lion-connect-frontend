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
  /** ✅ 스킬 목록 추가 */
  skills?: string[];
  className?: string;
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
}: IntroduceCardProps) {
  const src = profileImageUrl || "/images/default-profile.png";

  return (
    <section
      className={`w-[910px] mx-auto mb-6 rounded-2xl border border-border-quaternary bg-white p-8 ${className}`}
    >
      <div className="flex items-start gap-[88px]">
        {/* 왼쪽: 프로필 이미지 */}
        <div className="w-40 h-48 relative rounded-md overflow-hidden bg-[#F5F5F5] border border-border-quaternary shrink-0">
          <Image src={src} alt={`${name} 프로필 이미지`} fill className="object-cover" priority />
        </div>

        {/* 오른쪽: 본문 */}
        <div className="flex-1 min-w-0 mb-4">
          {/* 이름 + 배지 */}
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-[18px] sm:text-[20px] font-bold text-black">{name}</h2>
            <div className="flex flex-wrap gap-3">
              {badges.map((b) => (
                <Badge key={`${b.type}-${b.label}`} label={b.label} type={b.type} />
              ))}
            </div>
          </div>

          {/* 성향 칩 */}
          {tendencies.length > 0 && <Slider items={tendencies} className="mt-4" />}

          {/* 연락처 */}
          {(phone || email) && (
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

          {/* ✅ 스킬 섹션 (SkillChips 사용) */}
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

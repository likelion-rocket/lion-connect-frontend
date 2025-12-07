// components/talent/ResumeCard.tsx
"use client";

import Image from "next/image";
import IconCard from "./IconCard";

export type Education = {
  school: string;
  start: string;
  end: string;
  major?: string | null;
  graduate?: string;
  note?: string | null;
};

export type Career = {
  company: string;
  start: string;
  end: string;
  deptOrTeam?: string | null;
  title?: string | null;
  desc?: string | null;
  rank?: string;
};

export type Award = { title: string; start: string; end: string; desc?: string };
export type Language = { name: string; start: string; end: string };
export type Certificate = { name: string; start: string; end: string };
export type LinkItem = { url: string };

export type ResumeCardProps = {
  summary: string;
  education?: Education | null;
  careers: Career[];
  awards: Award[];
  languages: Language[];
  certificates: Certificate[];
  links: LinkItem[];
  skills?: string[];
  className?: string;
  defaultOpen?: boolean;
};

// 섹션 헤더
function SectionHeader({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <div className="py-3 border-b border-border-quaternary">
      <h4
        id={id}
        className="justify-start text-neutral-800 text-lg font-bold font-['Pretendard'] leading-7"
      >
        {children}
      </h4>
    </div>
  );
}

// "·" 구분자 메타 라인
function MetaLine({ items }: { items: (string | undefined | null)[] }) {
  const list = items.filter(Boolean) as string[];
  if (list.length === 0) return null;
  return (
    <>
      {list.map((t, i) => (
        <span key={`${t}-${i}`}>
          {i > 0 && <span className="mx-1.5">·</span>}
          {t}
        </span>
      ))}
    </>
  );
}

export default function ResumeCard({
  summary,
  education,
  careers,
  awards,
  languages,
  certificates,
  links,
  skills = [],
  className = "",
  defaultOpen = false,
}: ResumeCardProps) {
  return (
    <details
      className={`group w-[910px] mx-auto rounded-2xl border border-border-quaternary bg-white ${className}`}
      {...(defaultOpen ? { open: true } : {})}
    >
      <summary className="list-none cursor-pointer">
        <div className="flex items-center justify-between px-6 py-4">
          <h3 className="text-[16px] font-bold text-black">이력서</h3>
          <div className="relative w-5 h-5">
            <Image
              src="/icons/outline-cheveron-down.svg"
              alt="펼치기"
              fill
              className="absolute inset-0 transition-opacity duration-150 opacity-100 group-open:opacity-0"
            />
            <Image
              src="/icons/outline-cheveron-up.svg"
              alt="접기"
              fill
              className="absolute inset-0 transition-opacity duration-150 opacity-0 group-open:opacity-100"
            />
          </div>
        </div>
      </summary>

      {/* 본문 */}
      <div className="px-6 pb-6 space-y-6 text-[14px] leading-6 text-[#333]">
        {/* 간단소개 */}
        <section aria-labelledby="resume-summary">
          <SectionHeader id="resume-summary">간단 소개</SectionHeader>
          <p className="whitespace-pre-wrap p-4">{summary || "간단 소개가 없습니다."}</p>
        </section>

        {/* 학력 (단일) */}
        {education && (
          <section aria-labelledby="resume-edu">
            <SectionHeader id="resume-edu">학력</SectionHeader>

            <IconCard
              icon="/icons/outline-library.svg"
              alt="education"
              className="border-0"
              title={education.school}
              subtitle={
                <span>
                  <MetaLine
                    items={[
                      `${education.start} - ${education.end}`,
                      education.major ? `전공(${education.major})` : undefined,
                      education.graduate,
                    ]}
                  />
                </span>
              }
            >
              {education.note && (
                <p className="text-[13px] text-[#666] leading-5">{education.note}</p>
              )}
            </IconCard>
          </section>
        )}

        {/* 경력 */}
        {careers.length > 0 && (
          <section aria-labelledby="resume-career">
            <SectionHeader id="resume-career">경력</SectionHeader>

            <div className="space-y-3">
              {careers.map((c, i) => (
                <IconCard
                  key={`${c.company}-${i}`}
                  icon="/icons/solid-briefcase.svg"
                  alt="career"
                  className="border-0"
                  title={c.company}
                  subtitle={
                    <span>
                      <MetaLine items={[`${c.start} - ${c.end}`, c.deptOrTeam, c.title]} />
                    </span>
                  }
                >
                  {c.desc && <p className="text-[13px] text-[#555] leading-5">{c.desc}</p>}
                </IconCard>
              ))}
            </div>
          </section>
        )}

        {/* 수상 / 활동 / 기타 */}
        {awards.length > 0 && (
          <section aria-labelledby="resume-award">
            <SectionHeader id="resume-award">수상 / 활동 / 기타</SectionHeader>

            <div className="space-y-3">
              {awards.map((a, i) => (
                <IconCard
                  key={`${a.title}-${i}`}
                  icon="/icons/solid-star.svg"
                  alt="award"
                  className="border-0"
                  title={a.title}
                  subtitle={<span>획득일: {a.start}</span>}
                >
                  {a.desc && <p className="text-[13px] text-[#555] leading-5">{a.desc}</p>}
                </IconCard>
              ))}
            </div>
          </section>
        )}

        {/* 언어 */}
        {languages.length > 0 && (
          <section aria-labelledby="resume-lang">
            <SectionHeader id="resume-lang">언어</SectionHeader>

            <div className="space-y-3">
              {languages.map((l, i) => (
                <IconCard
                  key={`${l.name}-${i}`}
                  icon="/icons/solid-globe.svg"
                  alt="language"
                  className="border-0"
                  title={l.name}
                  subtitle={<span>획득일: {l.start}</span>}
                />
              ))}
            </div>
          </section>
        )}

        {/* 자격증 */}
        {certificates.length > 0 && (
          <section aria-labelledby="resume-cert">
            <SectionHeader id="resume-cert">자격증</SectionHeader>

            <div className="space-y-3">
              {certificates.map((c, i) => (
                <IconCard
                  key={`${c.name}-${i}`}
                  icon="/icons/outline-star.svg"
                  alt="certificate"
                  className="border-0"
                  title={c.name}
                  subtitle={<span>획득일: {c.start}</span>}
                />
              ))}
            </div>
          </section>
        )}

        {/* 링크 */}
        {links.length > 0 && (
          <section aria-labelledby="resume-link">
            <SectionHeader id="resume-link">링크</SectionHeader>

            <div className="space-y-3">
              {links.map((l, i) => (
                <IconCard
                  key={`${l.url}-${i}`}
                  icon="/icons/outline-paper-clip.svg"
                  alt="link"
                  className="border-0"
                  title={
                    <a
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0b5fff] underline break-all font-medium"
                    >
                      {l.url}
                    </a>
                  }
                />
              ))}
            </div>
          </section>
        )}

        {/* 스킬 */}
        {skills.length > 0 && (
          <section aria-labelledby="resume-skill">
            <SectionHeader id="resume-skill">스킬</SectionHeader>
            <div className="p-4 inline-flex justify-start items-center gap-4 flex-wrap">
              {skills.map((skill, i) => (
                <div
                  key={`${skill}-${i}`}
                  className="px-3 py-1.5 bg-white rounded-lg outline outline-[0.80px] outline-offset-[-0.80px] outline-neutral-300 flex justify-start items-center gap-4"
                >
                  <div className="text-center justify-center text-neutral-800 text-sm font-semibold">
                    {skill}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </details>
  );
}

// components/talent/ResumeCard.tsx
import IconCard from "./IconCard";
import Image from "next/image";

export type Education = {
  school: string;
  start: string;
  end: string;
  major?: string;
  graduate?: string;
  note?: string;
};

export type Career = {
  company: string;
  start: string;
  end: string;
  deptOrTeam?: string;
  title?: string;
  desc?: string;
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
  className?: string;
  defaultOpen?: boolean;
};

export default function ResumeCard({
  summary,
  education,
  careers,
  awards,
  languages,
  certificates,
  links,
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
            {/* 닫힘(기본) 아이콘 */}
            <Image
              src="/icons/outline-cheveron-down.svg"
              alt="펼치기"
              fill
              className="absolute inset-0 transition-opacity duration-150 opacity-100 group-open:opacity-0"
            />
            {/* 열림 아이콘 */}
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
      <div className="px-6 pb-6 space-y-6">
        {/* 간단소개 */}
        <section aria-labelledby="resume-summary">
          <div className="py-3 border-t border-border-quaternary">
            <h4 id="resume-summary" className="text-[14px] font-semibold text-[#333]">
              간단소개
            </h4>
          </div>
          <div className="w-full rounded-xl border border-border-quaternary bg-white p-5">
            <p className="text-[14px] leading-[1.7] text-[#333] whitespace-pre-wrap">
              {summary || "간단 소개가 없습니다."}
            </p>
          </div>
        </section>

        {/* 학력 (IconCard 패턴, 단일) */}
        <section aria-labelledby="resume-edu">
          <div className="py-3 border-t border-border-quaternary">
            <h4 id="resume-edu" className="text-[14px] font-semibold text-[#333]">
              학력
            </h4>
          </div>

          <IconCard icon="/icons/outline-library.svg" alt="education" className="border-0">
            {!education ? (
              <div className="text-[14px] text-[#111]">입력받은 학교명이 뜹니다.</div>
            ) : (
              <div className="space-y-1">
                <div className="text-[14px] font-medium text-[#111]">{education.school}</div>
                <div className="grid grid-cols-4 gap-6 text-[13px] text-[#444]">
                  <div>{`${education.start} - ${education.end}`}</div>
                  <div>{education.major ? `전공(${education.major})` : ""}</div>
                  <div>{education.graduate ? education.graduate : ""}</div>
                  <div />
                </div>
                {education.note && <p className="text-[13px] text-[#666]">{education.note}</p>}
              </div>
            )}
          </IconCard>
        </section>

        {/* 경력 */}
        <section aria-labelledby="resume-career">
          <div className="py-3 border-t border-border-quaternary">
            <h4 id="resume-career" className="text-[14px] font-semibold text-[#333]">
              경력
            </h4>
          </div>

          {careers.length === 0 ? (
            <IconCard icon="/icons/solid-briefcase.svg" alt="career">
              <div className="text-[14px] text-[#111]">입력받은 회사명이 뜹니다.</div>
            </IconCard>
          ) : (
            <div className="space-y-3">
              {careers.map((c, i) => (
                <IconCard
                  key={i}
                  icon="/icons/solid-briefcase.svg"
                  alt="career"
                  className="border-0"
                >
                  <div className="text-[14px] font-semibold text-[#111]">{c.company}</div>

                  <div className="grid grid-cols-4 gap-6 text-[13px] text-[#444]">
                    <div>{`${c.start} - ${c.end}`}</div>
                  </div>

                  <div className="grid grid-cols-4 gap-6 text-[13px] text-[#444] mt-1">
                    <div>{c.deptOrTeam || ""}</div>
                    <div>{c.rank || ""}</div>
                    <div>{c.title || ""}</div>
                    <div />
                  </div>

                  {c.desc && <p className="text-[13px] text-[#555] mt-2">{c.desc}</p>}
                </IconCard>
              ))}
            </div>
          )}
        </section>

        {/* 수상 */}
        <section aria-labelledby="resume-award">
          <div className="py-3 border-t border-border-quaternary">
            <h4 id="resume-award" className="text-[14px] font-semibold text-[#333]">
              수상
            </h4>
          </div>

          {awards.length === 0 ? (
            <IconCard icon="/icons/solid-star.svg" alt="award">
              <div className="text-[14px] text-[#111]">활동명이 뜹니다.</div>
            </IconCard>
          ) : (
            <div className="space-y-3">
              {awards.map((a, i) => (
                <IconCard key={i} icon="/icons/solid-star.svg" alt="award" className="border-0">
                  <div className="text-[14px] font-medium text-[#111]">{a.title}</div>
                  <div className="text-[13px] text-[#666]">
                    {a.start} - {a.end}
                  </div>
                  {a.desc && <p className="text-[13px] text-[#555] mt-1">{a.desc}</p>}
                </IconCard>
              ))}
            </div>
          )}
        </section>

        {/* 언어 */}
        <section aria-labelledby="resume-lang">
          <div className="py-3 border-t border-border-quaternary">
            <h4 id="resume-lang" className="text-[14px] font-semibold text-[#333]">
              언어
            </h4>
          </div>

          {languages.length === 0 ? (
            <IconCard icon="/icons/solid-globe.svg" alt="language">
              <div className="text-[14px] text-[#111]">언어명이 뜹니다.</div>
            </IconCard>
          ) : (
            <div className="space-y-3">
              {languages.map((l, i) => (
                <IconCard key={i} icon="/icons/solid-globe.svg" alt="language" className="border-0">
                  <div className="grid grid-cols-4 gap-6 text-[13px] text-[#444]">
                    <div className="font-medium">{l.name}</div>
                    <div>{`${l.start} - ${l.end}`}</div>
                    <div />
                    <div />
                  </div>
                </IconCard>
              ))}
            </div>
          )}
        </section>

        {/* 자격증 */}
        <section aria-labelledby="resume-cert">
          <div className="py-3 border-t border-border-quaternary">
            <h4 id="resume-cert" className="text-[14px] font-semibold text-[#333]">
              자격증
            </h4>
          </div>

          {certificates.length === 0 ? (
            <IconCard icon="/icons/outline-star.svg" alt="certificate">
              <div className="text-[14px] text-[#111]">입력받은 자격증명이 뜹니다.</div>
            </IconCard>
          ) : (
            <div className="space-y-3">
              {certificates.map((c, i) => (
                <IconCard
                  key={i}
                  icon="/icons/outline-star.svg"
                  alt="certificate"
                  className="border-0"
                >
                  <div className="grid grid-cols-4 gap-6 text-[13px] text-[#444]">
                    <div className="font-medium">{c.name}</div>
                    <div>{`${c.start} - ${c.end}`}</div>
                    <div />
                    <div />
                  </div>
                </IconCard>
              ))}
            </div>
          )}
        </section>

        {/* 링크 */}
        <section aria-labelledby="resume-link">
          <div className="py-3 border-t border-border-quaternary">
            <h4 id="resume-link" className="text-[14px] font-semibold text-[#333]">
              링크
            </h4>
          </div>

          {links.length === 0 ? (
            <IconCard icon="/icons/outline-paper-clip.svg" alt="link">
              <div className="text-[14px] text-[#111]">입력받은 링크 주소가 뜹니다.</div>
            </IconCard>
          ) : (
            <div className="space-y-3">
              {links.map((l, i) => (
                <IconCard
                  key={i}
                  icon="/icons/outline-paper-clip.svg"
                  alt="link"
                  className="border-0"
                >
                  <a
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0b5fff] underline break-all"
                  >
                    {l.url}
                  </a>
                </IconCard>
              ))}
            </div>
          )}
        </section>
      </div>
    </details>
  );
}

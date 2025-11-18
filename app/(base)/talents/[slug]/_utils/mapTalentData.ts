/**
 * API 응답 데이터를 컴포넌트 Props로 변환하는 유틸리티
 */

import type { TalentDetailResponse } from "@/types/talent";
import type { BadgeType } from "@/components/ui/badge";

type BadgeItem = { label: string; type: BadgeType };

/**
 * 경험 태그를 Badge 형식으로 변환
 */
function mapExperiencesToBadges(experiences: string[]): BadgeItem[] {
  const badgeMap: Record<string, BadgeType> = {
    "부트캠프 수료자": "bootcamp",
    창업자: "startup",
    "창업 경험자": "startup",
    전공자: "major",
    "자격증 보유자": "certified",
  };

  return experiences.map((exp) => ({
    label: exp,
    type: badgeMap[exp] || "certified",
  }));
}

/**
 * 날짜 형식 변환 (YYYY-MM-DD -> YYYY.MM)
 */
function formatDate(dateString: string): string {
  if (!dateString) return "";
  const [year, month] = dateString.split("-");
  return `${year}.${month}`;
}

/**
 * 학력 상태 한글 변환
 */
function mapEducationStatus(status: string): string {
  const statusMap: Record<string, string> = {
    GRADUATED: "졸업",
    ENROLLED: "재학",
    WITHDRAWN: "중퇴",
    LEAVE_OF_ABSENCE: "휴학",
  };
  return statusMap[status] || status;
}

/**
 * API 응답을 IntroduceCard props로 변환
 */
function mapToIntroduceCardProps(data: TalentDetailResponse) {
  // 첫 번째 학력 정보 추출
  const primaryEducation = data.educations?.[0];

  return {
    name: data.name,
    profileImageUrl: data.thumbnailUrl,
    badges: mapExperiencesToBadges(data.experiences),
    tendencies: data.tendencies,
    phone: null, // API에서 제공하지 않음
    email: null, // API에서 제공하지 않음
    university: primaryEducation?.schoolName || null,
    major: primaryEducation?.major || null,
    jobGroup: null, // API 응답에서 jobRoles만 제공됨
    job: data.jobRoles?.[0] || null,
    skills: data.skills,
    summary: data.introduction,
    showSummary: true,
    showContacts: false, // 연락처 정보가 없으므로 숨김
  };
}

/**
 * API 응답을 ResumeCard props로 변환
 */
function mapToResumeCardProps(data: TalentDetailResponse) {
  // 학력 (첫 번째 항목만)
  const primaryEducation = data.educations?.[0];
  const education = primaryEducation
    ? {
        school: primaryEducation.schoolName,
        start: formatDate(primaryEducation.startDate),
        end: formatDate(primaryEducation.endDate),
        major: primaryEducation.major,
        graduate: mapEducationStatus(primaryEducation.status),
        note: primaryEducation.description,
      }
    : null;

  // 경력
  const careers = data.workExperiences.map((work) => ({
    company: work.companyName,
    start: formatDate(work.startDate),
    end: work.isCurrent ? "현재" : formatDate(work.endDate),
    deptOrTeam: work.department,
    title: work.position,
    desc: work.description,
  }));

  // 수상
  const awards = data.awards.map((award) => ({
    title: award.name,
    start: formatDate(award.issueDate),
    end: formatDate(award.issueDate),
    desc: award.description,
  }));

  // 언어
  const languages = data.languageDetails.map((lang) => ({
    name: lang.languageName,
    start: formatDate(lang.issueDate),
    end: lang.level || "현재",
  }));

  // 자격증
  const certificates = data.certifications.map((cert) => ({
    name: cert.name,
    start: formatDate(cert.issueDate),
    end: formatDate(cert.issueDate),
  }));

  // 링크
  const links = data.externalLink ? [{ url: data.externalLink }] : [];

  return {
    summary: data.introduction,
    education,
    careers,
    awards,
    languages,
    certificates,
    links,
    defaultOpen: true, // 기본적으로 열린 상태
  };
}

/**
 * API 응답을 PortfolioCard props로 변환
 */
function mapToPortfolioCardProps(data: TalentDetailResponse) {
  return {
    fileName: data.portfolioUrl ? data.portfolioUrl.split("/").pop() : undefined,
    fileUrl: data.portfolioUrl || undefined,
    defaultOpen: false,
  };
}

/**
 * 인재 상세 데이터를 모든 컴포넌트 props로 변환
 */
export function mapTalentDataToComponents(data: TalentDetailResponse) {
  return {
    introduceCardProps: mapToIntroduceCardProps(data),
    resumeCardProps: mapToResumeCardProps(data),
    portfolioCardProps: mapToPortfolioCardProps(data),
  };
}

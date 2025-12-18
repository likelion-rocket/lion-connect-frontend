import type { JobDetailResponse } from "@/types/job";
import { SEO } from "@/app/(company)/seo/index";

/**
 * JobPosting 스키마 생성 (Google Jobs Rich Results)
 * https://developers.google.com/search/docs/appearance/structured-data/job-posting
 */
export function generateJobPostingSchema(job: JobDetailResponse) {
  const baseUrl = SEO.url;

  // validThrough: 게시일로부터 3개월 후
  const publishedDate = new Date(job.publishedAt);
  const validThrough = new Date(publishedDate);
  validThrough.setMonth(validThrough.getMonth() + 3);

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.jobDescription,
    identifier: {
      "@type": "PropertyValue",
      name: job.companyName,
      value: job.jobPostingId.toString(),
    },
    datePosted: job.publishedAt,
    validThrough: validThrough.toISOString(),
    employmentType: job.employmentType === "FULL_TIME" ? "FULL_TIME" : "INTERN",
    hiringOrganization: {
      "@type": "Organization",
      name: job.companyName,
      sameAs: baseUrl,
      logo: SEO.organization.logo,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.workplace,
        addressCountry: "KR",
      },
    },
    // 급여 정보는 선택 사항 (향후 추가 가능)
    // baseSalary: {
    //   "@type": "MonetaryAmount",
    //   currency: "KRW",
    //   value: {
    //     "@type": "QuantitativeValue",
    //     value: 40000000,
    //     unitText: "YEAR",
    //   },
    // },
    occupationalCategory: job.jobRoleName,
    responsibilities: job.mainTasks,
    qualifications: job.requirements,
    skills: job.preferred,
    jobBenefits: job.benefits,
    applicantLocationRequirements: {
      "@type": "Country",
      name: "KR",
    },
    // jobLocationType: "TELECOMMUTE", // 원격 근무 가능 시 추가
  };
}

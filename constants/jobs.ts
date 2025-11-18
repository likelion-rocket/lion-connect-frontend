// /constants/jobs.ts

/** 직군별 직무 목록 (UI 셀렉트용) */
export const JOB_OPTIONS: Record<string, string[]> = {
  개발: ["프론트앤드", "백앤드", "IOS", "Android", "Unity", "AI"],
  디자인: ["UX/UI"],
  "데이터 분석": ["데이터 분석"],
  마케팅: ["그로스 마케팅"],
  기획: ["PM"],
};

export const JOB_KEYS = Object.keys(JOB_OPTIONS);

/** 직무명 → 역할 ID 매핑 (관리자 API 예시 JSON 기준) */
export const JOB_ROLE_ID_BY_NAME: Record<string, number> = {
  프론트앤드: 1,
  백앤드: 2,
  IOS: 3,
  Android: 4,
  Unity: 5,
  AI: 6,
  "UX/UI": 7,
  "데이터 분석": 8,
  "그로스 마케팅": 9,
  PM: 10,
};

/** 직무명으로 직군(개발/디자인/...) 찾기 */
export function findJobGroupByJobName(jobName: string): string | "" {
  for (const [group, roles] of Object.entries(JOB_OPTIONS)) {
    if (roles.includes(jobName)) return group;
  }
  return "";
}

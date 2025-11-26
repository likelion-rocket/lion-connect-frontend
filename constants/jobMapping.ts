/**
 * 직군/직무 ID 매핑 상수
 * API 응답 데이터를 기반으로 생성
 */

export type JobRole = {
  id: number;
  name: string;
  code: string;
};

export type JobGroup = {
  id: number;
  name: string;
  code: string;
  roles: JobRole[];
};

export const JOB_GROUPS: JobGroup[] = [
  {
    id: 1,
    name: "개발",
    code: "development",
    roles: [
      { id: 1, name: "프론트앤드", code: "frontend" },
      { id: 2, name: "백앤드", code: "backend" },
      { id: 3, name: "IOS", code: "ios" },
      { id: 4, name: "Android", code: "android" },
      { id: 5, name: "Unity", code: "unity" },
      { id: 6, name: "AI", code: "ai" },
    ],
  },
  {
    id: 2,
    name: "디자인",
    code: "design",
    roles: [{ id: 7, name: "UX/UI", code: "ux/ui" }],
  },
  {
    id: 3,
    name: "데이터 분석",
    code: "data",
    roles: [{ id: 8, name: "데이터 분석", code: "data" }],
  },
  {
    id: 4,
    name: "마케팅",
    code: "marketing",
    roles: [{ id: 9, name: "그로스 마케팅", code: "growth marketing" }],
  },
  {
    id: 5,
    name: "기획",
    code: "project",
    roles: [{ id: 10, name: "PM", code: "pm" }],
  },
];

/**
 * 직군 ID로 직군 찾기
 */
export function findJobGroupById(id: number): JobGroup | undefined {
  return JOB_GROUPS.find((group) => group.id === id);
}

/**
 * 직무 ID로 직무 찾기 (모든 직군에서 검색)
 */
export function findJobRoleById(id: number): { group: JobGroup; role: JobRole } | undefined {
  for (const group of JOB_GROUPS) {
    const role = group.roles.find((r) => r.id === id);
    if (role) {
      return { group, role };
    }
  }
  return undefined;
}

/**
 * 직군 code로 직군 찾기
 */
export function findJobGroupByCode(code: string): JobGroup | undefined {
  return JOB_GROUPS.find((group) => group.code === code);
}

/**
 * 직무 code로 직무 찾기 (모든 직군에서 검색)
 */
export function findJobRoleByCode(code: string): { group: JobGroup; role: JobRole } | undefined {
  for (const group of JOB_GROUPS) {
    const role = group.roles.find((r) => r.code === code);
    if (role) {
      return { group, role };
    }
  }
  return undefined;
}

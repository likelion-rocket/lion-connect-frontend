// /constants/dummyTalents.ts
import type { BadgeType } from "@/components/ui/badge";

export type DummyTalent = {
  id: number;
  slug: string;
  name: string;
  viewCount: number;
  university: string;
  major: string;
  jobGroup: string;
  job: string;
  badges: { label: string; type: BadgeType }[];
  tendencies: string[];
  skills: string[];
  summary: string;
};

/** ================= 성향(Tendency) ================= */

type TendencyPair = {
  id: string;
  left: string;
  right: string;
};

const TENDENCY_ROWS: TendencyPair[] = [
  { id: "company_type", left: "안정 기업형", right: "성장 기업형" },
  { id: "task_style", left: "수직적 문화형", right: "수평적 문화형" },
  { id: "work_speed", left: "속도형", right: "퀄리티형" },
  { id: "method", left: "에자일형", right: "워터폴형" },
  { id: "rule", left: "규칙형", right: "창의형" },
  { id: "lead", left: "리더형", right: "팔로워형" },
  { id: "list", left: "스프린트 리스트형", right: "제너럴 리스트형" },
  { id: "focus", left: "결과 중심형", right: "과정 중심형" },
  { id: "lifestyle", left: "현실주의형", right: "이상주의형" },
];

function buildDummyTendencies(seed: number): string[] {
  return TENDENCY_ROWS.map((row, idx) => ((seed + idx) % 2 === 0 ? row.left : row.right));
}

/** ================= 직군/직무 ================= */

const JOB_OPTIONS: Record<string, string[]> = {
  개발: ["프론트 엔드", "백엔드", "IOS", "Android", "Unity", "AI"],
  디자인: ["UX/UI"],
  "데이터 분석": ["데이터 분석"],
  마케팅: ["그로스 마케팅"],
  PM: ["PM"],
};

const JOB_KEYS = Object.keys(JOB_OPTIONS);

/** ================= 한국인 이름 / 학교 / 전공 ================= */

const KOREAN_NAMES = [
  "김민준",
  "이서연",
  "박지훈",
  "정하린",
  "최윤우",
  "강다은",
  "조민서",
  "한지호",
  "윤서현",
  "임도윤",
  "오지아",
  "신하준",
  "권시윤",
  "문예진",
  "유주원",
  "장민재",
  "배예린",
  "송지후",
  "홍서아",
  "노윤아",
  "서하진",
  "주민규",
  "안채원",
  "표지훈",
];

const UNIVERSITIES = [
  "서울대학교",
  "연세대학교",
  "고려대학교",
  "한양대학교",
  "성균관대학교",
  "숭실대학교",
  "홍익대학교",
  "카이스트",
];

const MAJORS = [
  "컴퓨터공학",
  "소프트웨어학",
  "정보보호학",
  "산업공학",
  "경영학",
  "시각디자인학",
  "데이터사이언스",
  "전자공학",
];

/** ================= 스킬 / 요약 / 뱃지 ================= */

const SKILLS_BY_GROUP: Record<string, string[]> = {
  개발: ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Spring Boot"],
  디자인: ["Figma", "Sketch", "Photoshop", "UX 리서치"],
  "데이터 분석": ["Python", "Pandas", "SQL", "Tableau"],
  마케팅: ["Google Analytics", "GA4", "A/B 테스트", "그로스 해킹"],
  PM: ["Jira", "Notion", "Agile", "Scrum", "프로덕트 기획"],
};

const SUMMARY_TEMPLATES = [
  "사용자 경험을 최우선으로 생각하며, 작은 디테일까지 챙기는 개발자입니다.\n기획 단계부터 참여하는 것을 좋아하고, 협업을 중요하게 생각합니다.",

  "문제를 끝까지 파고드는 스타일입니다.\n새로운 스택에도 도전하며 코드 리뷰 문화를 중요하게 생각합니다.",

  "팀과 함께 성장하는 것을 즐깁니다.\n주도적으로 일을 찾고, 지식을 나누는 문화를 선호합니다.",

  "데이터 기반으로 의사결정하는 것을 선호합니다.\n실험과 검증을 반복하며 꾸준히 개선하고 싶습니다.",
];

const BADGE_SETS: { label: string; type: BadgeType }[][] = [
  [
    { label: "부트캠프 수료자", type: "bootcamp" as BadgeType },
    { label: "전공자", type: "major" as BadgeType },
  ],
  [{ label: "전공자", type: "major" as BadgeType }],
  [{ label: "부트캠프 수료자", type: "bootcamp" as BadgeType }],
  [],
];

/** ================= 🔥 더미 데이터 생성 함수 ================= */

export function generateDummyTalents(count = 24): DummyTalent[] {
  return Array.from({ length: count }).map((_, idx) => {
    const name = KOREAN_NAMES[idx % KOREAN_NAMES.length];
    const university = UNIVERSITIES[idx % UNIVERSITIES.length];
    const major = MAJORS[idx % MAJORS.length];

    const jobGroup = JOB_KEYS[idx % JOB_KEYS.length];
    const jobList = JOB_OPTIONS[jobGroup];
    const job = jobList[idx % jobList.length];

    return {
      id: 1000 + idx,
      slug: String(1000 + idx),
      name,
      viewCount: 30 + ((idx * 17) % 400),
      university,
      major,
      jobGroup,
      job,
      badges: BADGE_SETS[idx % BADGE_SETS.length],
      tendencies: buildDummyTendencies(idx),
      skills: SKILLS_BY_GROUP[jobGroup] ?? [],
      summary: SUMMARY_TEMPLATES[idx % SUMMARY_TEMPLATES.length],
    };
  });
}

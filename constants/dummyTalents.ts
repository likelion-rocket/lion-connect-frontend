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
  /** 🔥 더미 프로필 이미지는 전부 이 경로 사용 */
  thumbnailUrl: string;
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
  개발: ["프론트앤드", "백앤드", "IOS", "Android", "Unity", "AI"],
  디자인: ["UX/UI"],
  "데이터 분석": ["데이터 분석"],
  마케팅: ["그로스 마케팅"],
  기획: ["PM"],
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

/** ✨ 일부 더미만 3줄 이상 되도록 훨씬 긴 텍스트 */
const LONG_SUMMARY_TEMPLATES = [
  "실제 서비스 환경에서 성능 최적화와 접근성 개선을 경험했습니다. " +
    "특히 페이지 로딩 속도 개선과 번들 크기 관리에 관심이 많으며, " +
    "사용자 피드백을 바탕으로 UI 구성과 인터랙션을 여러 번 리디자인해 본 경험이 있습니다. " +
    "사내 해커톤과 사이드 프로젝트를 통해 다양한 직군과 협업해 왔고, " +
    "서비스 초반 지표가 좋지 않았던 경험을 바탕으로 온보딩 플로우를 개선해 전환율을 끌어올린 적도 있습니다.",

  "크로스 기능 협업에 익숙하며, 디자이너·기획자·마케터와 함께 작은 실험을 빠르게 돌리는 문화를 좋아합니다. " +
    "A/B 테스트와 퍼널 분석을 통해 가설을 검증해 왔고, " +
    "실제 숫자에 근거해 우선순위를 조정하는 일을 즐깁니다. " +
    "장기적으로는 제품의 방향성까지 함께 고민하는 프로덕트 마인드셋을 지향하며, " +
    "팀 내에서 기술적인 논의뿐 아니라 일하는 방식 자체를 개선하는 데도 관심이 많습니다.",

  "새로운 기술을 단순히 도입하는 것보다 팀의 맥락에 맞게 녹여내는 것을 중요하게 생각합니다. " +
    "레거시 코드를 단계적으로 리팩토링하고, 테스트 코드를 도입해 안정적인 배포 파이프라인을 만든 경험이 있습니다. " +
    "문서화와 코드 리뷰를 통해 지식을 공유하는 것을 좋아하며, " +
    "주니어 개발자와 함께 페어 프로그래밍을 하며 성장하는 환경을 선호합니다. " +
    "결국 유지보수가 쉬운 코드를 통해 팀 전체의 생산성을 높이는 것이 목표입니다.",
];

/** 뱃지 */
const BADGE_SETS: { label: string; type: BadgeType }[][] = [
  [
    { label: "부트캠프 경험자", type: "bootcamp" as BadgeType },
    { label: "전공자", type: "major" as BadgeType },
  ],
  [
    { label: "창업 경험자", type: "startup" as BadgeType },
    { label: "전공자", type: "major" as BadgeType },
  ],
  [
    { label: "자격증 보유자", type: "certified" as BadgeType },
    { label: "전공자", type: "major" as BadgeType },
  ],
  [{ label: "부트캠프 경험자", type: "bootcamp" as BadgeType }],
  [{ label: "창업 경험자", type: "startup" as BadgeType }],
  [{ label: "자격증 보유자", type: "certified" as BadgeType }],
  [{ label: "전공자", type: "major" as BadgeType }],
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

    let summary = SUMMARY_TEMPLATES[idx % SUMMARY_TEMPLATES.length];

    if (idx % 2 === 0) {
      const longExtra = LONG_SUMMARY_TEMPLATES[idx % LONG_SUMMARY_TEMPLATES.length];
      summary = `${summary}\n${longExtra}`;
    }

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
      summary,
      /** 🔥 더미는 항상 기본 이미지 사용 */
      thumbnailUrl: "/images/default-profile.png",
    };
  });
}

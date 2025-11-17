// 프론트에서만 쓰는 상수 스킬 목록
export type SkillOption = {
  id: number;
  name: string;
  category: "frontendSkills" | "backendSkills";
};

// 원본 배열
const RAW_SKILL_OPTIONS: SkillOption[] = [
  { id: 9, name: "Angular", category: "frontendSkills" },
  { id: 32, name: "API 연동", category: "frontendSkills" },
  { id: 17, name: "C", category: "backendSkills" },
  { id: 19, name: "C#", category: "backendSkills" },
  { id: 18, name: "C++", category: "backendSkills" },
  { id: 2, name: "CSS", category: "frontendSkills" },
  { id: 22, name: "Go", category: "backendSkills" },
  { id: 30, name: "Groovy", category: "backendSkills" },
  { id: 1, name: "HTML", category: "frontendSkills" },
  { id: 20, name: "Java", category: "backendSkills" },
  { id: 5, name: "JavaScript", category: "frontendSkills" },
  { id: 23, name: "Kotlin", category: "backendSkills" },
  { id: 10, name: "Next.js", category: "frontendSkills" },
  { id: 25, name: "Objective-C", category: "backendSkills" },
  { id: 28, name: "Perl", category: "backendSkills" },
  { id: 27, name: "PHP", category: "backendSkills" },
  { id: 4, name: "PostCSS", category: "frontendSkills" },
  { id: 21, name: "Python", category: "backendSkills" },
  { id: 31, name: "R", category: "backendSkills" },
  { id: 16, name: "Radix UI", category: "frontendSkills" },
  { id: 7, name: "React", category: "frontendSkills" },
  { id: 11, name: "React Native", category: "frontendSkills" },
  { id: 13, name: "React Query", category: "frontendSkills" },
  { id: 26, name: "Rust", category: "backendSkills" },
  { id: 29, name: "Scala", category: "backendSkills" },
  { id: 14, name: "ShadCN/UI", category: "frontendSkills" },
  { id: 24, name: "Swift", category: "backendSkills" },
  { id: 3, name: "TailWind", category: "frontendSkills" },
  { id: 6, name: "TypeScript", category: "frontendSkills" },
  { id: 8, name: "Vue.js", category: "frontendSkills" },
  { id: 12, name: "Zustand", category: "frontendSkills" },
];

// ⭐️ 정렬된 최종 배열
export const SKILL_OPTIONS: SkillOption[] = [...RAW_SKILL_OPTIONS].sort((a, b) => a.id - b.id);

// 편의 함수들
export const findSkillById = (id: number) => SKILL_OPTIONS.find((s) => s.id === id);

export const searchSkillsByName = (keyword: string) => {
  const q = keyword.trim().toLowerCase();
  if (!q) return SKILL_OPTIONS;
  return SKILL_OPTIONS.filter((s) => s.name.toLowerCase().includes(q));
};

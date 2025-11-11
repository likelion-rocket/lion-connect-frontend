/**
 * 각 행의 좌/우 항목이 백엔드에서 가진 정수 id를 연결합니다.
 * TODO: 아래 숫자를 실제 운영 값으로 교체하세요.
 */
export const TENDENCY_ID_MAP: Record<string, { leftId: number; rightId: number }> = {
  company_type: { leftId: 1, rightId: 2 },
  task_style: { leftId: 3, rightId: 4 },
  work_speed: { leftId: 5, rightId: 6 },
  method: { leftId: 7, rightId: 8 },
  rule: { leftId: 9, rightId: 10 },
  lead: { leftId: 11, rightId: 12 },
  list: { leftId: 13, rightId: 14 },
  focus: { leftId: 15, rightId: 16 },
  lifestyle: { leftId: 17, rightId: 18 },
};

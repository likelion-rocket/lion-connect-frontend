// lib/expTags/map.ts
export const EXP_TAG_ID_MAP = {
  bootcamp: 1,
  startup: 2,
  certificate: 3,
  major: 4,
} as const;

export type ExpTagKey = keyof typeof EXP_TAG_ID_MAP;

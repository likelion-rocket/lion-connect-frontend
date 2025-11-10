// hooks/useEducationSection.ts
import { useState, useCallback } from "react";
import {
  type EducationFormState,
  type EducationErrors,
  validateEducation,
  buildEducationPayload,
} from "@/lib/forms/education.validation";

export function useEducationSection() {
  const [form, setForm] = useState<EducationFormState>({
    schoolName: "",
    periodText: "",
    status: "",
    major: "",
    description: "",
  });
  const [errors, setErrors] = useState<EducationErrors>({});

  // 필드 변경 + 해당 에러 해제
  const setField = useCallback(<K extends keyof EducationFormState>(key: K, val: string) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  }, []);

  const handlers = {
    onChangeSchoolName: (v: string) => setField("schoolName", v),
    onChangePeriodText: (v: string) => setField("periodText", v),
    onChangeStatus: (v: string) => setField("status", v),
    onChangeMajor: (v: string) => setField("major", v),
    onChangeDescription: (v: string) => setField("description", v),
  };

  // 검증 후 payload 생성. 에러 있으면 null 반환
  const validateAndBuild = useCallback(() => {
    const v = validateEducation(form);
    setErrors(v);
    if (Object.values(v).some(Boolean)) return null; // 에러 존재
    return buildEducationPayload(form);
  }, [form]);

  return {
    form,
    errors,
    ...handlers,
    setErrors, // 필요시 수동 설정
    setForm, // 필요시 일괄 변경
    validateAndBuild, // 제출 시 사용
  };
}

// hooks/useCareerSection.ts
"use client";

import { useCallback, useMemo, useState } from "react";
import type { ExperienceRequest } from "@/lib/api/experiences";
import { parseYYYYMMRange } from "@/lib/date/ym"; // ✅ 공용 유틸 사용

export type CompanyForm = {
  company: string;
  period: string; // "YYYY.MM - YYYY.MM" 또는 "YYYY.MM - 현재|재직"
  dept: string;
  role: string;
  desc: string;
};

export type CompanyErrors = Partial<Record<keyof CompanyForm, string>>;

function isRowEmpty(c: CompanyForm) {
  return (
    !c.company.trim() && !c.period.trim() && !c.dept.trim() && !c.role.trim() && !c.desc.trim()
  );
}

export function useCareerSection(initial?: CompanyForm[]) {
  const [companies, setCompanies] = useState<CompanyForm[]>(
    initial?.length ? initial : [{ company: "", period: "", dept: "", role: "", desc: "" }]
  );
  const [errors, setErrors] = useState<CompanyErrors[]>([]);

  const hasAnyValue = useCallback((c: CompanyForm) => !isRowEmpty(c), []);

  const addCompany = useCallback(() => {
    setCompanies((prev) => [...prev, { company: "", period: "", dept: "", role: "", desc: "" }]);
    setErrors((prev) => [...prev, {}]);
  }, []);

  const clearCompany = useCallback((index: number) => {
    setCompanies((prev) => {
      const next = [...prev];
      next[index] = { company: "", period: "", dept: "", role: "", desc: "" };
      return next;
    });
    setErrors((prev) => {
      const next = [...prev];
      next[index] = {};
      return next;
    });
  }, []);

  const removeCompany = useCallback((index: number) => {
    setCompanies((prev) => prev.filter((_, i) => i !== index));
    setErrors((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // ✅ 메모이즈 해서 exhaustive-deps 경고 방지
  const onChange = useCallback(
    (index: number, field: keyof CompanyForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setCompanies((prev) => {
        const next = [...prev];
        next[index] = { ...next[index], [field]: value };
        return next;
      });
      setErrors((prev) => {
        const next = [...prev];
        next[index] = { ...next[index], [field]: undefined };
        return next;
      });
    },
    []
  );

  const validateAndBuild = useCallback(():
    | { shouldSubmit: false }
    | { shouldSubmit: true; payloads: ExperienceRequest[] } => {
    const newErrors: CompanyErrors[] = companies.map(() => ({}));
    const payloads: ExperienceRequest[] = [];

    const allEmpty = companies.every(isRowEmpty);
    if (allEmpty) {
      setErrors(newErrors);
      return { shouldSubmit: false };
    }

    companies.forEach((row, idx) => {
      if (isRowEmpty(row)) return; // 완전 빈 행은 무시

      // 필수값
      if (!row.company.trim()) newErrors[idx].company = "회사명을 입력하세요.";
      if (!row.role.trim()) newErrors[idx].role = "직급/직책을 입력하세요.";
      if (!row.period.trim()) newErrors[idx].period = "근속 기간을 입력하세요.";
      if (!row.dept.trim()) newErrors[idx].dept = "부서/직무를 입력해주세요";
      if (!row.desc.trim()) newErrors[idx].desc = "담당 업무를 적어주세요.";

      // ✅ 공용 유틸로 기간 파싱
      const parsed = parseYYYYMMRange(row.period);
      if (!parsed) {
        newErrors[idx].period =
          "기간은 ‘YYYY.MM - YYYY.MM’ 또는 ‘YYYY.MM - 현재’ 형식으로 입력하세요.";
      } else {
        // 역전 검증 (endDate가 있으면)
        if (parsed.endDate) {
          const sd = new Date(parsed.startDate).getTime();
          const ed = new Date(parsed.endDate).getTime();
          if (ed < sd) {
            newErrors[idx].period = "퇴사일은 입사일 이후여야 합니다.";
          }
        }
      }

      // 에러 없으면 payload 변환
      const hasErr = Object.keys(newErrors[idx]).length > 0;
      if (!hasErr && parsed) {
        payloads.push({
          companyName: row.company.trim(),
          department: row.dept.trim() || undefined,
          position: row.role.trim(),
          startDate: parsed.startDate, // e.g. 2025-03-01
          endDate: parsed.endDate ?? null, // 현재/재직이면 null
          isCurrent: parsed.endDate === undefined,
          description: row.desc.trim() || undefined,
        });
      }
    });

    setErrors(newErrors);
    if (payloads.length === 0) return { shouldSubmit: false };
    return { shouldSubmit: true, payloads };
  }, [companies]);

  const computed = useMemo(
    () => ({
      companies,
      errors,
      hasAnyValue,
      addCompany,
      clearCompany,
      removeCompany,
      onChange,
      setCompanies,
      setErrors,
      validateAndBuild,
    }),
    [
      companies,
      errors,
      hasAnyValue,
      addCompany,
      clearCompany,
      removeCompany,
      onChange,
      validateAndBuild,
    ]
  );

  return computed;
}

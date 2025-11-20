"use client";

import { useState } from "react";

export type CertForm = { name: string; issueDate: string }; // YYYY.MM
export type CertError = { name?: string; issueDate?: string };

export function useCertificationSection() {
  const [certs, setCerts] = useState<CertForm[]>([{ name: "", issueDate: "" }]);
  const [errors, setErrors] = useState<CertError[]>([{}]);

  const onChange =
    (index: number, field: keyof CertForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setCerts((prev) => {
        const next = [...prev];
        next[index] = { ...next[index], [field]: value };
        return next;
      });
    };

  const add = () => {
    setCerts((prev) => [...prev, { name: "", issueDate: "" }]);
    setErrors((prev) => [...prev, {}]);
  };

  const clear = (index: number) => {
    setCerts((prev) => {
      const next = [...prev];
      next[index] = { name: "", issueDate: "" };
      return next;
    });
    setErrors((prev) => {
      const next = [...prev];
      next[index] = {};
      return next;
    });
  };

  const hasAnyValue = (c: CertForm) => !!c.name.trim() || !!c.issueDate.trim();

  // 언어 섹션과 동일한 규칙: 둘 중 하나만 채우면 에러, 형식 체크(YYYY.MM)
  const validateAndBuild = () => {
    const nextErr: CertError[] = certs.map(() => ({}));
    let ok = true;

    certs.forEach((row, i) => {
      const filled = row.name.trim() || row.issueDate.trim();
      const both = row.name.trim() && row.issueDate.trim();
      if (filled && !both) {
        ok = false;
        if (!row.name.trim()) nextErr[i].name = "자격증명을 입력하세요.";
        if (!row.issueDate.trim()) nextErr[i].issueDate = "취득월을 입력하세요.";
      }
      if (row.issueDate.trim() && !/^\d{4}\.(0[1-9]|1[0-2])$/.test(row.issueDate.trim())) {
        ok = false;
        nextErr[i].issueDate = "형식은 YYYY.MM 입니다. 예) 2024.07";
      }
    });

    setErrors(nextErr);
    return { ok };
  };

  return {
    certs,
    setCerts,
    errors,
    setErrors,
    onChange,
    add,
    clear,
    hasAnyValue,
    validateAndBuild,
  };
}

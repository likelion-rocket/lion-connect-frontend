"use client";

import { useState } from "react";

export type LangForm = { name: string; issueDate: string }; // issueDate: "YYYY.MM"
export type LangError = { name?: string; issueDate?: string };

export function useLanguageSection() {
  const [langs, setLangs] = useState<LangForm[]>([{ name: "", issueDate: "" }]);
  const [errors, setErrors] = useState<LangError[]>([{}]);

  const onChange =
    (index: number, field: keyof LangForm) => (v: string | React.ChangeEvent<HTMLInputElement>) => {
      const value = typeof v === "string" ? v : v.target.value;
      setLangs((prev) => {
        const next = [...prev];
        next[index] = { ...next[index], [field]: value };
        return next;
      });
    };

  const add = () => {
    setLangs((prev) => [...prev, { name: "", issueDate: "" }]);
    setErrors((prev) => [...prev, {}]);
  };

  const clear = (index: number) => {
    setLangs((prev) => {
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

  const hasAnyValue = (item: LangForm) => !!item.name.trim() || !!item.issueDate.trim();

  // 아주 가벼운 유효성(둘 중 하나만 채운 경우 경고)
  const validateAndBuild = () => {
    const nextErr: LangError[] = langs.map(() => ({}));
    let ok = true;

    langs.forEach((row, i) => {
      const filled = row.name.trim() || row.issueDate.trim();
      const both = row.name.trim() && row.issueDate.trim();
      if (filled && !both) {
        ok = false;
        if (!row.name.trim()) nextErr[i].name = "언어명을 입력하세요.";
        if (!row.issueDate.trim()) nextErr[i].issueDate = "취득월을 입력하세요.";
      }
      // 포맷 간단 체크: YYYY.MM
      if (row.issueDate.trim() && !/^\d{4}\.(0[1-9]|1[0-2])$/.test(row.issueDate.trim())) {
        ok = false;
        nextErr[i].issueDate = "형식은 YYYY.MM 입니다. 예) 2024.07";
      }
    });

    setErrors(nextErr);
    return { ok };
  };

  return {
    langs,
    setLangs,
    errors,
    setErrors,
    onChange,
    add,
    clear,
    hasAnyValue,
    validateAndBuild,
  };
}

"use client";

import { useState } from "react";

export type AwardForm = {
  title: string;
  period: string; // YYYY.MM
  desc: string; // DB description 과 연결
};

export type AwardError = {
  title?: string;
  period?: string;
  desc?: string;
};

export function useAwardSection() {
  const [awards, setAwards] = useState<AwardForm[]>([{ title: "", period: "", desc: "" }]);

  const [errors, setErrors] = useState<AwardError[]>([{}]);

  const onChange =
    (index: number, field: keyof AwardForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      setAwards((prev) => {
        const next = [...prev];
        next[index] = { ...next[index], [field]: v };
        return next;
      });
    };

  const add = () => {
    setAwards((prev) => [...prev, { title: "", period: "", desc: "" }]);
    setErrors((prev) => [...prev, {}]);
  };

  const clear = (index: number) => {
    setAwards((prev) => {
      const next = [...prev];
      next[index] = { title: "", period: "", desc: "" };
      return next;
    });
    setErrors((prev) => {
      const next = [...prev];
      next[index] = {};
      return next;
    });
  };

  const hasAnyValue = (a: AwardForm) => !!a.title.trim() || !!a.period.trim() || !!a.desc.trim();

  // validate
  const validateAndBuild = () => {
    const nextErr: AwardError[] = awards.map(() => ({}));
    let ok = true;

    awards.forEach((row, i) => {
      const filled = row.title.trim() || row.period.trim() || row.desc.trim();
      const both = row.title.trim() && row.period.trim() && row.desc.trim();

      // 필수 3개 title + period + desc
      if (filled && !both) {
        ok = false;
        if (!row.title.trim()) nextErr[i].title = "수상/활동명을 입력하세요.";
        if (!row.period.trim()) nextErr[i].period = "수상일을 입력하세요.";
        if (!row.desc.trim()) nextErr[i].desc = "설명을 입력하세요.";
      }

      // 기간 검사
      if (row.period.trim() && !/^\d{4}\.(0[1-9]|1[0-2])$/.test(row.period.trim())) {
        ok = false;
        nextErr[i].period = "형식은 YYYY.MM 입니다. 예) 2024.07";
      }
    });

    setErrors(nextErr);
    return { ok };
  };

  return {
    awards,
    setAwards,
    errors,
    setErrors,
    onChange,
    add,
    clear,
    hasAnyValue,
    validateAndBuild,
  };
}

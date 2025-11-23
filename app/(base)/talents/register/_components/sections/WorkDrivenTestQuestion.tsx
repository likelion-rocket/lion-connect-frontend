/**
 * Work Driven 테스트 개별 질문 컴포넌트 (재사용 가능)
 * 1-5점 척도의 라디오 버튼 그룹
 */

"use client";

import { cn } from "@/utils/utils";

interface WorkDrivenTestQuestionProps {
  questionNumber: number;
  questionText: string;
  name: string;
  value?: number;
  onChange: (value: number) => void;
}

export default function WorkDrivenTestQuestion({
  questionNumber,
  questionText,
  name,
  value,
  onChange,
}: WorkDrivenTestQuestionProps) {
  const scores = [1, 2, 3, 4, 5];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <ol
          className="font-medium text-base text-text-primary list-decimal list-inside"
          start={questionNumber}
        >
          <li>{questionText}</li>
        </ol>
      </div>

      <div className="relative w-full">
        <div className="flex items-center justify-between">
          {scores.map((score) => (
            <button
              key={score}
              type="button"
              onClick={() => onChange(score)}
              className={cn(
                "w-16 h-16 flex items-center justify-center rounded-full transition-all",
                "border border-border-quaternary",
                "text-base font-medium",
                value === score
                  ? "bg-bg-accent text-text-inverse-primary border-bg-accent"
                  : "bg-bg-primary text-text-primary hover:border-bg-accent"
              )}
            >
              {score}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-text-primary">전혀 아니다</p>
          <p className="text-sm text-text-primary">매우 그렇다</p>
        </div>
      </div>
    </div>
  );
}

/**
 * Work Driven 테스트 섹션 컴포넌트
 * 16개의 질문을 2열 그리드 레이아웃으로 표시
 */

"use client";

import { useFormContext } from "react-hook-form";
import { type TalentRegisterFormValues } from "@/schemas/talent/talentRegisterSchema";
import WorkDrivenTestQuestion from "./WorkDrivenTestQuestion";

const QUESTIONS = [
  "새로운 일을 보면 자동으로 손이 먼저 움직인다",
  "일이 없으면 오히려 불안하고 뭔가 만들어서라도 진행하고 싶다.",
  "여러 일을 동시에 시작해도 에너지가 쉽게 고갈되지 않는다.",
  "주변보다 속도를 더 내는 것이 기분 좋다.",
  "일할 때 시간이 어떻게 지나가는지 모를 때가 많다.",
  "집중이 시작되면 방해를 거의 인식하지 못한다.",
  "일을 끊김 없이 오랫동안 이어서 하는 편이다.",
  "난관을 만나면 오히려 더 깊게 몰입하게 된다.",
  "맡은 일을 끝낼 때까지 머릿속에서 잊히지 않는다.",
  "내가 아니면 안 되는 일처럼 느끼는 순간이 자주 있다.",
  "작은 일이라도 완성도가 낮으면 잠이 잘 안 온다.",
  "문제를 발견하면 내 일이 아니어도 해결하려 든다.",
  "목표 달성을 위해 잠이나 휴식을 줄이는 것에 거부감이 적다.",
  "개인 일정보다 업무 목표를 우선순위로 두는 편이다.",
  '체력적으로 힘들어도 "조금만 더" 하면서 지속할 수 있다.',
  "일이 잘 풀릴 때는 주말도 잊을 정도로 일에 빠져든다.",
];

export default function WorkDrivenTestSection() {
  const {
    watch,
    setValue,
    register,
    formState: { errors },
  } = useFormContext<TalentRegisterFormValues>();
  const workDrivenTest = watch("workDrivenTest") || {};

  // 필드를 React Hook Form에 등록 (isValid 계산에 포함되도록)
  register("workDrivenTest");

  const handleScoreChange = (questionIndex: number, score: number) => {
    setValue(`workDrivenTest.q${questionIndex + 1}` as any, score, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  // workDrivenTest 에러 메시지
  const workDrivenTestError = errors.workDrivenTest?.message as string | undefined;

  return (
    <section className="section section-work-driven-test flex flex-col gap-4 md:gap-6">
      <div className="flex items-center gap-2">
        <h2 className="text-lg md:text-xl font-bold text-text-primary">
          Work Driven 테스트<span className="text-text-error">*</span>
        </h2>
        {workDrivenTestError && <p className="text-sm text-text-error">({workDrivenTestError})</p>}
      </div>

      <div className="flex gap-4 items-start rounded-lg p-4">
        <div className="w-12 h-12 bg-bg-tertiary  flex items-center justify-center bg-bg-primary rounded-lg shrink-0">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-icon-secondary"
          >
            <path
              d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M12 12H15M12 16H15M9 12H9.01M9 16H9.01"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="flex flex-col gap-8 flex-1">
          {/* 질문들을 2열 그리드로 배치 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-40 gap-y-16 lg:gap-y-24">
            {QUESTIONS.map((question, index) => (
              <WorkDrivenTestQuestion
                key={index}
                questionNumber={index + 1}
                questionText={question}
                name={`workDrivenTest.q${index + 1}`}
                value={(workDrivenTest as any)[`q${index + 1}`]}
                onChange={(score) => handleScoreChange(index, score)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

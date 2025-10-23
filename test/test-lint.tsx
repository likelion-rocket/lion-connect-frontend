// 의도적으로 린트 규칙 위반이 있는 테스트 파일
export const TestComponent = () => {
  const unusedVariable: string = "unused";
  const oldStyleVar: string = "var를 사용한 구식 코드";
  const myVar: string =
    "너무 긴 변수 이름이지만 정말로 너무 긴 라인을 만들기 위해 의도적으로 긴 문장을 작성하고 있습니다";

  console.log("개발 중에 로그를 남겼는데 이걸 지우지 않음");

  return (
    <div>
      <p>테스트</p>
    </div>
  );
};

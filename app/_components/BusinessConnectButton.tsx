"use client";

/**
 * @description
 * 기업 문의 섹션으로 스크롤하는 클라이언트 컴포넌트입니다.
 * 클릭 시 smooth scroll을 통해 business-connect 섹션으로 이동합니다.
 */
export default function BusinessConnectButton() {
  /**
   * 기업문의 버튼 클릭 핸들러
   */
  const handleBusinessConnectClick = () => {
    const element = document.getElementById("business-connect");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <button
      onClick={handleBusinessConnectClick}
      className="h-12 px-8 bg-white/10 rounded-full outline-[0.80px] outline-offset-[-0.80px] outline-white/30 inline-flex justify-center items-center hover:bg-white/20 transition-colors text-text-inverse-primary text-lg font-semibold leading-7"
    >
      기업 문의하기
    </button>
  );
}

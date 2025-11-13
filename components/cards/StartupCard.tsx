"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Startup } from "@/types/startup";

type StartupCardProps = {
  startup: Startup;
  index?: number;
  totalCards?: number;
};

/**
 * 스타트업 정보를 표시하는 카드 컴포넌트
 * - 위치 기반 투명도: 컨테이너 양쪽 끝으로 갈수록 투명해짐
 * - 클릭 시 스타트업 웹사이트로 이동 (새 탭에서 열림)
 * - Hover 효과: 스케일 확대, 테두리/배경색 변경, 그림자 추가
 * @param startup - 스타트업 데이터
 * @param index - 카드의 인덱스 (무한 슬라이드에서 투명도 계산용)
 * @param totalCards - 전체 카드 개수
 */
function StartupCard({ startup, index = 0, totalCards = 1 }: StartupCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const updateOpacity = () => {
      const rect = card.getBoundingClientRect();
      const container = card.closest(".overflow-hidden");
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const fadeDistance = 256; // 페이드 영역 거리 (기존 그라데이션 w-64와 동일)

      // 카드의 중앙 위치 계산
      const cardCenter = rect.left + rect.width / 2;
      const containerLeft = containerRect.left;
      const containerRight = containerRect.right;

      let newOpacity = 1;

      // 왼쪽 페이드
      if (cardCenter < containerLeft + fadeDistance) {
        const distance = cardCenter - containerLeft;
        newOpacity = Math.max(0, Math.min(1, distance / fadeDistance));
      }
      // 오른쪽 페이드
      else if (cardCenter > containerRight - fadeDistance) {
        const distance = containerRight - cardCenter;
        newOpacity = Math.max(0, Math.min(1, distance / fadeDistance));
      }

      setOpacity(newOpacity);
    };

    // 초기 투명도 설정
    updateOpacity();

    // 애니메이션 중 지속적으로 업데이트 (60fps)
    const intervalId = setInterval(updateOpacity, 16);

    return () => clearInterval(intervalId);
  }, [index, totalCards]);

  return (
    <a
      ref={cardRef}
      href={startup.websiteUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{ opacity }}
      className="group flex h-[328px] w-[270px] shrink-0 flex-col gap-[10px] rounded-lg border border-border-quaternary bg-bg-secondary p-5 shadow-lg transition-all duration-200 ease-out hover:border-brand-01 hover:bg-white hover:shadow-lg"
    >
      {/* 상단 영역: 로고 + 화살표 버튼 */}
      <div className="relative flex w-full items-start gap-[69px]">
        {/* 로고 이미지 */}
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
          <Image
            src={startup.logoUrl}
            alt={`${startup.name} 로고`}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>

        {/* 화살표 버튼 */}
        <div className="absolute right-0 top-0 flex items-center gap-[10px]">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center transition-transform duration-200 group-hover:translate-x-1">
            <div className="relative h-6 w-6 overflow-hidden">
              <Image src="/landing/arrow-button.svg" alt="" fill className="object-contain" />
            </div>
          </div>
        </div>
      </div>

      {/* 하단 영역: 텍스트 정보 */}
      <div className="flex flex-col gap-4">
        {/* 제목 + 소속 정보 */}
        <div className="flex flex-col gap-1 whitespace-pre-wrap">
          {/* 스타트업 이름 */}
          <h3 className="w-full text-2xl font-medium leading-snug text-black">{startup.name}</h3>

          {/* 조직명 */}
          <p className="w-full text-xs font-normal leading-normal text-text-secondary">
            {startup.organization}
          </p>

          {/* 기수 */}
          <p className="w-full text-xs font-normal leading-normal text-text-secondary">
            {startup.generation}
          </p>
        </div>

        {/* 설명 */}
        <p className="w-full whitespace-pre-wrap text-sm font-normal leading-normal text-text-primary">
          {startup.description}
        </p>
      </div>
    </a>
  );
}

export default StartupCard;

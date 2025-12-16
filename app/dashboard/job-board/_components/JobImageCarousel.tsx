"use client";

import Image from "next/image";
import { useState } from "react";

interface JobImageCarouselProps {
  images: string[];
}

export default function JobImageCarousel({ images }: JobImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => {
      // 2개씩 보이는 캐러셀이므로 마지막 인덱스는 images.length - 2
      const maxIndex = Math.max(0, images.length - 2);
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, images.length - 2);
      return prev <= 0 ? maxIndex : prev - 1;
    });
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="w-[1160px] h-96 relative overflow-hidden">
      <div
        className="absolute inline-flex justify-start items-center gap-5 transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 590}px)` }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={`w-[570px] h-96 relative ${
              index === 0
                ? "rounded-tl-xl rounded-bl-xl"
                : index === images.length - 1
                  ? "rounded-tr-xl rounded-br-xl"
                  : ""
            }`}
          >
            <Image src={image} alt={`채용 이미지 ${index + 1}`} fill className="object-cover" />
          </div>
        ))}
      </div>

      {images.length > 2 && (
        <button
          onClick={handleNext}
          className="w-12 h-12 cursor-pointer absolute right-6 top-[168px] bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all duration-200 flex justify-center items-center group"
          aria-label="다음 이미지"
        >
          <Image
            src="/icons/solid-cheveron-right.svg"
            alt="다음"
            width={24}
            height={24}
            className="group-hover:opacity-80 transition-opacity"
          />
        </button>
      )}

      {images.length > 1 && currentIndex > 0 && (
        <button
          onClick={handlePrev}
          className="w-12 h-12 absolute cursor-pointer left-6 top-[168px] bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all duration-200 flex justify-center items-center group"
          aria-label="이전 이미지"
        >
          <Image
            src="/icons/solid-cheveron-left.svg"
            alt="이전"
            width={24}
            height={24}
            className="group-hover:opacity-80 transition-opacity"
          />
        </button>
      )}
    </div>
  );
}

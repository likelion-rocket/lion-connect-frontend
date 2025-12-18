import { ImageResponse } from "next/og";
import { fetchPublicJobPosting } from "@/lib/api/jobPostings";

export const runtime = "edge";
export const alt = "채용 공고";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = await params;

  try {
    const job = await fetchPublicJobPosting(jobId);

    // Pretendard 폰트 로드
    const fontData = await fetch(
      new URL("../../../../public/fonts/PretendardVariable.woff2", import.meta.url)
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#FFF9F5", // brand-01
            padding: "60px 80px",
            position: "relative",
          }}
        >
          {/* 배경 그라데이션 */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "linear-gradient(135deg, #FFF9F5 0%, #FFE5D1 100%)",
              opacity: 0.5,
            }}
          />

          {/* 로고 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "40px",
              zIndex: 1,
            }}
          >
            <div
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                color: "#FF6B00",
              }}
            >
              라이언 커넥트
            </div>
          </div>

          {/* 회사명 */}
          <div
            style={{
              fontSize: "28px",
              color: "#666",
              marginBottom: "16px",
              zIndex: 1,
            }}
          >
            {job.companyName}
          </div>

          {/* 공고 제목 */}
          <div
            style={{
              fontSize: "56px",
              fontWeight: "bold",
              color: "#1A1A1A",
              lineHeight: 1.2,
              marginBottom: "24px",
              maxWidth: "900px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              zIndex: 1,
            }}
          >
            {job.title}
          </div>

          {/* 직무 및 고용 형태 */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              zIndex: 1,
            }}
          >
            <div
              style={{
                backgroundColor: "#FF6B00",
                color: "white",
                padding: "12px 24px",
                borderRadius: "8px",
                fontSize: "24px",
              }}
            >
              {job.jobRoleName}
            </div>
            <div
              style={{
                backgroundColor: "#333",
                color: "white",
                padding: "12px 24px",
                borderRadius: "8px",
                fontSize: "24px",
              }}
            >
              {job.employmentType === "FULL_TIME" ? "정규직" : "인턴"}
            </div>
          </div>

          {/* 하단 멋쟁이사자처럼 문구 */}
          <div
            style={{
              position: "absolute",
              bottom: "60px",
              right: "80px",
              fontSize: "20px",
              color: "#999",
            }}
          >
            멋쟁이사자처럼 출신 인재 우대
          </div>
        </div>
      ),
      {
        ...size,
        fonts: [
          {
            name: "Pretendard",
            data: fontData,
            style: "normal",
            weight: 400,
          },
        ],
      }
    );
  } catch (error) {
    // 에러 발생 시 기본 이미지 반환
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FFF9F5",
            fontSize: "48px",
            color: "#FF6B00",
          }}
        >
          라이언 커넥트
        </div>
      ),
      size
    );
  }
}

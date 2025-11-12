/**
 * ⚠️ 목데이터 파일 - 디자인 확인용
 * ⚠️ 실제 API 연동 시 이 파일 전체를 삭제하세요
 */

import type { Inquiry, InquiryListResponse } from "@/types/inquiry";

export const MOCK_INQUIRIES: Inquiry[] = [
  {
    id: "1",
    companyName: "김철수",
    position: "(주)테크노베이션",
    attribute: "010-1234-5678",
    description: "cskim@technovation.com",
    category: "개발팀 / 팀장",
    status: "new",
    content:
      "안녕하세요. 저희 회사에서 기업 채용 서비스를 이용하고자 문의드립니다. 현재 백엔드 개발자 3명, 프론트엔드 개발자 2명을 채용하려고 합니다.",
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30분 전
  },
  {
    id: "2",
    companyName: "박민지",
    position: "스타트업코리아",
    attribute: "010-9876-5432",
    description: "mj.park@startupkorea.io",
    category: "인사팀 / 과장",
    status: "done",
    content: "채용 공고 등록 관련 문의드립니다. 여러 포지션을 동시에 올릴 수 있는지 궁금합니다.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5시간 전
  },
  {
    id: "3",
    companyName: "이정훈",
    position: "글로벌소프트",
    attribute: "02-1234-5678",
    description: "jhlee@globalsoft.co.kr",
    category: "경영지원팀 / 부장",
    status: "new",
    content: "채용 서비스 가격 정책에 대해 자세히 알고 싶습니다. 연간 계약 시 할인이 있나요?",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1일 전
  },
  {
    id: "4",
    companyName: "최수진",
    position: "디자인스튜디오",
    attribute: "010-5555-6666",
    description: "sujin@designstudio.com",
    category: "디자인팀 / 실장",
    status: "done",
    content: "UI/UX 디자이너 채용 관련 문의입니다. 포트폴리오 제출 기능도 지원되나요?",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2일 전
  },
  {
    id: "5",
    companyName: "강태양",
    position: "에이아이벤처스",
    attribute: "010-7777-8888",
    description: "kty@aiventures.ai",
    category: "연구개발팀 / 수석연구원",
    status: "new",
    content:
      "머신러닝 엔지니어와 데이터 사이언티스트를 채용하려고 합니다. 전문 분야별 필터링이 가능한가요?",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3일 전
  },
  {
    id: "6",
    companyName: "윤서연",
    position: "마케팅플러스",
    attribute: "010-3333-4444",
    description: "yoon@marketingplus.kr",
    category: "마케팅팀 / 차장",
    status: "new",
    content: "채용 공고 작성 시 참고할 수 있는 템플릿이 제공되나요?",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5일 전
  },
  {
    id: "7",
    companyName: "정우성",
    position: "핀테크이노베이션",
    attribute: "02-9999-0000",
    description: "ws.jung@fintechinno.com",
    category: "기획팀 / 팀장",
    status: "done",
    content: "금융권 경력자 채용을 진행하려고 합니다. 보안 관련 특별한 요구사항이 있나요?",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), // 7일 전
  },
  {
    id: "8",
    companyName: "한지민",
    position: "에듀케이션테크",
    attribute: "010-1111-2222",
    description: "jmhan@edutech.edu",
    category: "교육컨텐츠팀 / 과장",
    status: "new",
    content: "교육 관련 IT 인력 채용을 위한 맞춤형 서비스가 있나요?",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(), // 10일 전
  },
  {
    id: "9",
    companyName: "오민석",
    position: "헬스케어솔루션",
    attribute: "010-8888-9999",
    description: "msoh@healthcaresol.net",
    category: "서비스기획팀 / 부장",
    status: "done",
    content: "의료 IT 분야 전문가를 찾고 있습니다. 관련 경력 필터링이 세분화되어 있나요?",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(), // 14일 전
  },
  {
    id: "10",
    companyName: "신동엽",
    position: "콘텐츠크리에이터스",
    attribute: "02-5555-7777",
    description: "dysin@contentcreators.tv",
    category: "제작팀 / 프로듀서",
    status: "new",
    content: "영상 제작 관련 인력 채용 문의드립니다. 프리랜서 채용도 가능한가요?",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString(), // 20일 전
  },
  {
    id: "11",
    companyName: "배수지",
    position: "이커머스플랫폼",
    attribute: "010-4444-5555",
    description: "sjbae@ecomplatform.shop",
    category: "운영팀 / 매니저",
    status: "done",
    content: "CS 담당자와 물류 관리자를 동시에 채용하려고 합니다.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 25).toISOString(), // 25일 전
  },
  {
    id: "12",
    companyName: "송중기",
    position: "게임스튜디오",
    attribute: "010-6666-7777",
    description: "jksong@gamestudio.game",
    category: "게임개발팀 / 리드",
    status: "new",
    content: "게임 개발자(Unity, Unreal) 채용을 진행하려고 합니다. 포트폴리오 심사 지원이 되나요?",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 35).toISOString(), // 35일 전
  },
];

/**
 * 목데이터 필터링 함수
 */
export function filterMockInquiries(
  search?: string,
  status?: "new" | "done",
  period?: string,
  page = 1,
  limit = 20
): InquiryListResponse {
  let filtered = [...MOCK_INQUIRIES];

  // 검색 필터링
  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(
      (inquiry) =>
        inquiry.companyName.toLowerCase().includes(searchLower) ||
        inquiry.position.toLowerCase().includes(searchLower) ||
        inquiry.attribute.toLowerCase().includes(searchLower) ||
        inquiry.description.toLowerCase().includes(searchLower) ||
        inquiry.category.toLowerCase().includes(searchLower) ||
        inquiry.content.toLowerCase().includes(searchLower)
    );
  }

  // 상태 필터링
  if (status) {
    filtered = filtered.filter((inquiry) => inquiry.status === status);
  }

  // 기간 필터링
  if (period) {
    const now = Date.now();
    filtered = filtered.filter((inquiry) => {
      const createdTime = new Date(inquiry.createdAt).getTime();
      const diff = now - createdTime;

      switch (period) {
        case "12h":
          return diff <= 1000 * 60 * 60 * 12;
        case "24h":
          return diff <= 1000 * 60 * 60 * 24;
        case "2d":
          return diff <= 1000 * 60 * 60 * 24 * 2;
        case "3d":
          return diff <= 1000 * 60 * 60 * 24 * 3;
        case "1w":
          return diff <= 1000 * 60 * 60 * 24 * 7;
        case "1m":
          return diff <= 1000 * 60 * 60 * 24 * 30;
        case "over":
          return diff > 1000 * 60 * 60 * 24 * 30;
        default:
          return true;
      }
    });
  }

  // 페이지네이션
  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const end = start + limit;
  const data = filtered.slice(start, end);

  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages,
    },
  };
}

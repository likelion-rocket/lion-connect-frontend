import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-indigo-50 px-4">
      <div className="text-center max-w-md">
        {/* 404 텍스트 */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-indigo-600 mb-4">404</h1>
          <p className="text-3xl font-bold text-gray-800 mb-2">페이지를 찾을 수 없습니다</p>
          <p className="text-lg text-gray-600">요청하신 페이지가 존재하지 않거나 이동되었습니다.</p>
        </div>

        {/* 일러스트레이션 */}
        <div className="mb-8">
          <svg
            className="w-48 h-48 mx-auto text-indigo-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* 액션 버튼 */}
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            홈으로 돌아가기
          </Link>
          <Link
            href="/talents"
            className="inline-block w-full px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg border-2 border-indigo-600 hover:bg-indigo-50 transition-colors duration-200"
          >
            인재 찾기
          </Link>
        </div>

        {/* 추가 정보 */}
        <p className="mt-8 text-sm text-gray-500">
          문제가 계속되면{" "}
          <a href="mailto:support@lionconnect.com" className="text-indigo-600 hover:underline">
            고객지원
          </a>
          에 문의해주세요.
        </p>
      </div>
    </div>
  );
}

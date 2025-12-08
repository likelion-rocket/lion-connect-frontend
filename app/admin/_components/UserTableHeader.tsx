/**
 * User Table Header Component
 * 
 * @description
 * 사용자 관리 테이블의 헤더 컴포넌트입니다.
 * 이름, 기업명, 이메일, 가입일, 역할, 권한 관리 컬럼을 표시합니다.
 */
export default function UserTableHeader() {
  return (
    <thead className="bg-neutral-50 rounded-tl-lg rounded-tr-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.06)] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.10)]">
      <tr className="h-20">
        <th className="px-9 py-2 text-left text-neutral-800 text-sm font-normal font-['Pretendard'] leading-5">
          이름
        </th>
        <th className="px-9 py-2 text-left text-neutral-800 text-sm font-normal font-['Pretendard'] leading-5">
          기업명
        </th>
        <th className="px-9 py-2 text-left text-neutral-800 text-sm font-normal font-['Pretendard'] leading-5">
          이메일
        </th>
        <th className="px-9 py-2 text-left text-neutral-800 text-sm font-normal font-['Pretendard'] leading-5">
          가입일
        </th>
        <th className="px-9 py-2 text-left text-neutral-800 text-sm font-normal font-['Pretendard'] leading-5">
          역할
        </th>
        <th className="px-9 py-2 text-left text-neutral-800 text-sm font-normal font-['Pretendard'] leading-5">
          권한 관리
        </th>
      </tr>
    </thead>
  );
}

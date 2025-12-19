import CompanyTableHeader from "./CompanyTableHeader";
import CompanyTableRow from "./CompanyTableRow";
import { AdminCompanyItem } from "@/types/admin";

interface CompanyTableProps {
  companies: AdminCompanyItem[];
}

/**
 * Company Table Component
 *
 * @description
 * 기업 회원 관리 테이블 컴포넌트입니다.
 * 헤더와 기업 회원 목록을 표시합니다.
 *
 * @example
 * <CompanyTable companies={companies} />
 */
export default function CompanyTable({ companies }: CompanyTableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <CompanyTableHeader />
        <tbody className="bg-white rounded-bl-lg rounded-br-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.06)] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.10)]">
          {companies.map((company) => {
            // joinedAt을 "YYYY. MM.DD" 형식으로 변환
            const formattedDate = new Date(company.joinedAt).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            }).replace(/\. /g, '. ');

            return (
              <CompanyTableRow
                key={company.id}
                id={company.id}
                name={company.name}
                companyName={company.companyName}
                phoneNumber={company.phoneNumber}
                email={company.email}
                joinDate={formattedDate}
                companyLocked={company.companyLocked}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

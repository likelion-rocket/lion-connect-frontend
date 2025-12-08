import UserTableHeader from './UserTableHeader';
import CompanyTableRow from './CompanyTableRow';

interface Company {
  id: string;
  name: string;
  company: string;
  email: string;
  joinDate: string;
  isActive: boolean;
}

interface CompanyTableProps {
  companies: Company[];
}

/**
 * Company Table Component
 * 
 * @description
 * 기업 회원 관리 테이블 컴포넌트입니다.
 * 헤더와 기업 회원 목록을 표시합니다.
 * 
 * @example
 * <CompanyTable companies={mockCompanies} />
 */
export default function CompanyTable({ companies }: CompanyTableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <UserTableHeader />
        <tbody className="bg-white rounded-bl-lg rounded-br-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.06)] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.10)]">
          {companies.map((company) => (
            <CompanyTableRow
              key={company.id}
              name={company.name}
              company={company.company}
              email={company.email}
              joinDate={company.joinDate}
              initialActivePermission={company.isActive}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

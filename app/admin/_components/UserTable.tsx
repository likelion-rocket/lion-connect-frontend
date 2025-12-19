import UserTableHeader from './UserTableHeader';
import UserTableRow from './UserTableRow';
import { AdminUserItem } from '@/types/admin';

interface UserTableProps {
  users: AdminUserItem[];
}

/**
 * User Table Component
 * 
 * @description
 * 사용자 관리 테이블 컴포넌트입니다.
 * 헤더와 사용자 목록을 표시합니다.
 * 
 * @example
 * <UserTable users={mockUsers} />
 */
export default function UserTable({ users }: UserTableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <UserTableHeader />
        <tbody className="bg-white rounded-bl-lg rounded-br-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.06)] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.10)]">
          {users.map((user) => {
            // joinedAt을 "YYYY. MM.DD" 형식으로 변환
            const formattedDate = new Date(user.joinedAt).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            }).replace(/\. /g, '. ');

            return (
              <UserTableRow
                key={user.id}
                id={user.id}
                name={user.name}
                phoneNumber={user.phoneNumber}
                email={user.email}
                joinDate={formattedDate}
                roles={user.roles}
                locked={user.locked}
                courseName={user.courseName}
                courseGeneration={user.courseGeneration}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

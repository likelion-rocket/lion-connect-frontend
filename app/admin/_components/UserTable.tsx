import UserTableHeader from './UserTableHeader';
import UserTableRow from './UserTableRow';

interface User {
  id: string;
  name: string;
  company: string;
  email: string;
  joinDate: string;
  role: 'admin' | 'normalUser';
  hasAdminPermission: boolean;
  isActive: boolean;
}

interface UserTableProps {
  users: User[];
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
          {users.map((user) => (
            <UserTableRow
              key={user.id}
              name={user.name}
              company={user.company}
              email={user.email}
              joinDate={user.joinDate}
              role={user.role}
              initialAdminPermission={user.hasAdminPermission}
              initialActivePermission={user.isActive}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

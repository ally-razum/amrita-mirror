import { userColumns } from "../../../entities/users/userColumns";
import useUserList from "../../../features/user-list/model/useUserList";
import ColumnSelector from "../../../shared/ui/ColumnSelector/ColumnSelector";
import UserTableRow from "../../../features/user-list/ui/UserTableRow";
import "./UserList.css";

function UserList() {
  const { users, selectedColumns, handleColumnChange, handleViewUser } =
    useUserList();

  return (
    <div className="user-list">
      <h2 className="user-list__title">Все пользователи</h2>

      <ColumnSelector
        columns={userColumns}
        selectedColumns={selectedColumns}
        onChange={handleColumnChange}
      />

      <div className="user-list__scroll">
        <table className="user-list__table">
          <thead>
            <tr>
              {userColumns.map(
                (column) =>
                  selectedColumns.includes(column.id) && (
                    <th key={column.id} className="user-list__th">
                      {column.label}
                    </th>
                  ),
              )}
              <th className="user-list__th">Действия</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <UserTableRow
                key={user.id}
                user={user}
                index={index}
                selectedColumns={selectedColumns}
                onView={handleViewUser}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserList;

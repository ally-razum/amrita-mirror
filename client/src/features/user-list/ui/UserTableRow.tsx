import "./UserTableRow.css";
import type { User } from "../../../entities/users/user";

interface Props {
  user: User;
  index: number;
  selectedColumns: string[];
  onView: (id: number) => void;
}

function UserTableRow({ user, index, selectedColumns, onView }: Props) {
  return (
    <tr className="user-row">
      {selectedColumns.includes("id") && <td>{user.id}</td>}
      {selectedColumns.includes("userFullName") && <td>{user.userFullName}</td>}
      {selectedColumns.includes("userLogin") && <td>{user.userLogin}</td>}
      {selectedColumns.includes("userRole") && <td>{user.userRole}</td>}
      <td>
        {index >= 1 ? (
          <button
            className="user-row__btn user-row__btn--view"
            onClick={() => onView(user.id)}
          >
            Открыть
          </button>
        ) : (
          <button className="user-row__btn" disabled>
            Недоступно
          </button>
        )}
      </td>
    </tr>
  );
}

export default UserTableRow;

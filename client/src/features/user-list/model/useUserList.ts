import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { users } from "../../../entities/users/mockUsers";
import { userColumns } from "../../../entities/users/userColumns";

function useUserList() {
  const navigate = useNavigate();
  const [selectedColumns, setSelectedColumns] = useState(
    userColumns.map((col) => col.id),
  );

  const handleColumnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setSelectedColumns((prev) =>
      checked ? [...prev, name] : prev.filter((col) => col !== name),
    );
  };

  const handleViewUser = (id: number) => navigate(`/dashboard/users/${id}`);

  return { users, selectedColumns, handleColumnChange, handleViewUser };
}

export default useUserList;

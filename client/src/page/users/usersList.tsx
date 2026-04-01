import React, { useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useNavigate } from "react-router-dom";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";

import { users } from "../../entities/users/mockUsers";
import { userColumns } from "../../entities/users/column";

function UserList() {
  console.log("THIS is UserList");

  const navigate = useNavigate();
  const [selectedColumns, setSelectedColumns] = useState(
    userColumns.map((col) => col.id),
  );

  const handleColumnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setSelectedColumns((prev) =>
      checked ? [...prev, name] : prev.filter((col) => col !== name),
    );
  };

  // Функция для просмотра карточки
  const handleViewUser = async (userId: number) => {
    console.log("VIEW CARD", userId);
    navigate(`/users/${userId}`);
  };

  return (
    <>
      <Typography variant="h5" gutterBottom align="center">
        Все  пользователи 
      </Typography>

      <FormGroup row sx={{ justifyContent: "center", marginBottom: "20px" }}>
        {userColumns.map((column) => (
          <FormControlLabel
            key={column.id}
            control={
              <Checkbox
                checked={selectedColumns.includes(column.id)}
                onChange={handleColumnChange}
                name={column.id}
              />
            }
            label={column.label}
          />
        ))}
      </FormGroup>

      <TableContainer
        component={Paper}
        sx={{
          maxWidth: "95%",
          margin: "16px auto",
          padding: "16px",
          overflowX: "auto", // Включаем горизонтальный скролл при необходимости
        }}
      >
        <Table stickyHeader sx={{ minWidth: "80%" }}>
          {" "}
          {/* Устанавливаем минимальную ширину */}
          <TableHead>
            <TableRow>
              {userColumns.map(
                (column) =>
                  selectedColumns.includes(column.id) && (
                    <TableCell
                      key={column.id}
                      sx={{
                        whiteSpace: "nowrap",
                        backgroundColor: "#e0e0e0",
                        fontSize: "16px",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ),
              )}
              <TableCell
                sx={{
                  whiteSpace: "nowrap",
                  backgroundColor: "#e0e0e0",
                  fontSize: "16px",
                }}
              >
                Действия
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((u, index) => (
              <TableRow
                key={u.id}
                sx={{
                  "&:hover": {
                    backgroundColor: "#e1bee7", // цвет выделения при наведении
                    cursor: "pointer", // указатель мыши
                    transition: "background-color 0.2s ease-in-out", // плавный переход
                  },
                }}
              >
                {selectedColumns.includes("id") && (
                  <TableCell>{u.id}</TableCell>
                )}
                {selectedColumns.includes("userFullName") && (
                  <TableCell>{u.userFullName}</TableCell>
                )}

                {selectedColumns.includes("userLogin") && (
                  <TableCell>{u.userLogin}</TableCell>
                )}
                {selectedColumns.includes("userRole") && (
                  <TableCell>{u.userRole}</TableCell>
                )}

                <TableCell sx={{ whiteSpace: "nowrap" }}>
                  <Box display={"flex"} gap={2}>
                    {index >= 1 ? (
                      <Button
                        variant="contained"
                        onClick={() => handleViewUser(u.id)}
                        sx={{
                          textTransform: "none",
                          backgroundColor: "#f06292",
                          borderRadius: 20,
                        }}
                      >
                        <OpenInNewIcon />
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        sx={{
                          textTransform: "none",
                          backgroundColor: "#f06292",
                          borderRadius: 20,
                        }}
                      >
                        <DoNotDisturbAltIcon />
                      </Button>
                    )}{" "}
                    {index >= 3 && (
                      <Button
                        variant="contained"
                        // Вызов confirmDelete для подтверждения удаления
                        sx={{
                          textTransform: "none",
                          borderRadius: 20,
                          backgroundColor: "#ad1457",
                        }}
                      >
                        <DeleteIcon />
                      </Button>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default UserList;

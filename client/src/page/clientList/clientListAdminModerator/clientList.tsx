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
  Checkbox,
  FormControlLabel,
  FormGroup,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useNavigate } from "react-router-dom";
import { mockCards } from "../../../entities/card/model/mockCards.ts";
import { cadrColumn } from "../../../shared/mocks/cardColumn.ts";
import { diagnosis } from "../../../shared/mocks/diagnosis.ts";
import { oils } from "../../../shared/mocks/oils.ts";

function ClientTable() {
  const navigate = useNavigate();
  const [selectedColumns, setSelectedColumns] = useState(
    cadrColumn.map((col) => col.id),
  );

  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
  }>({
    open: false,
    message: "",
  });

  const handleColumnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setSelectedColumns((prev) =>
      checked ? [...prev, name] : prev.filter((col) => col !== name),
    );
  };

  const handleViewClient = (clientId: number) => {
    navigate(`/dashboard/cards/${clientId}`);
  };

  const handleCloseNotification = () => {
    setNotification({ open: false, message: "" });
  };

  return (
    <>
      {/* Snackbar для уведомлений */}
      <Snackbar
        open={notification.open}
        autoHideDuration={3000} // Закрывается через 3 секунды
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity="success"
          sx={{
            minWidth: "300px",
            minHeight: "50px",
            fontFamily: "Arial, sans-serif",
            fontSize: "18px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <b>{notification.message}</b>
        </Alert>
      </Snackbar>
      {/* Фиксированный блок с выбором колонок */}
      <Box
        sx={{
          position: "sticky",
          top: 65,
          zIndex: 10,
          backgroundColor: "white",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <FormGroup row sx={{ justifyContent: "center", marginBottom: "10px" }}>
          {cadrColumn.map((column) => (
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
      </Box>

      {/* Контейнер для таблицы с прокруткой только данных */}
      <TableContainer
        component={Paper}
        sx={{ maxWidth: "95%", margin: "16px auto", padding: "16px" }}
      >
        <Box sx={{ maxHeight: "1000px", overflowY: "auto" }}>
          <Table stickyHeader sx={{ minWidth: "80%" }}>
            <TableHead>
              <TableRow>
                {cadrColumn.map(
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
                        <b>{column.label}</b>
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
                  <b>Действия</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockCards.map((client) => (
                <TableRow
                  key={`${client.id}`}
                  sx={{
                    backgroundColor: client.card_IsChecked
                      ? "white"
                      : "#FFCDF0",
                    "&:hover": {
                      backgroundColor: "#e1bee7", // цвет выделения при наведении
                      cursor: "pointer", // указатель мыши
                      transition: "background-color 0.2s ease-in-out", // плавный переход
                    },
                  }}
                >
                  {selectedColumns.includes("cardFullName") && (
                    <TableCell>{client.cardFullName}</TableCell>
                  )}
                  {selectedColumns.includes("cardPhone") && (
                    <TableCell>{client.cardPhone}</TableCell>
                  )}

                  {selectedColumns.includes("cardHealthComplaints") && (
                    <TableCell>{client.cardHealthComplaints}</TableCell>
                  )}
                  {selectedColumns.includes("cardDeliveryAddress") && (
                    <TableCell>{client.cardDeliveryAddress}</TableCell>
                  )}
                  {selectedColumns.includes("cardFinalDiagnosis") && (
                    <TableCell>
                      {diagnosis.find(
                        (diagnosListItems) =>
                          diagnosListItems.id === client.cardFinalDiagnosis,
                      )?.dName || "-"}
                    </TableCell>
                  )}
                  {selectedColumns.includes("cardOilFromList") && (
                    <TableCell>
                      {oils.find(
                        (oilListItems) =>
                          oilListItems.id === client.cardOilFromList,
                      )?.oilName || "-"}
                    </TableCell>
                  )}
                  {selectedColumns.includes("cardRecepi") && (
                    <TableCell>{client.cardRecepi}</TableCell>
                  )}

                  <TableCell sx={{ whiteSpace: "nowrap" }}>
                    <Box display={"flex"} gap={2}>
                      <Button
                        variant="contained"
                        onClick={() => handleViewClient(client.id)}
                        sx={{
                          textTransform: "none",
                          backgroundColor: "#bc4747",
                          borderRadius: 20,
                        }}
                      >
                        <OpenInNewIcon />
                      </Button>
                      <Button
                        variant="contained"
                        color="warning"
                        sx={{ textTransform: "none", borderRadius: 20 }}
                      >
                        <DeleteIcon />
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </TableContainer>
    </>
  );
}

export default ClientTable;

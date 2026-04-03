//только сборка!!!

import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { cadrColumn } from "../../../shared/mocks/cardColumn";
import useClientList from "../../../features/client-list/model/useClientList";
import ColumnSelector from "../../../features/client-list/ui/ColumnSelector";
import CardTableRow from "../../../features/client-list/ui/CardTableRow";

function ClientList() {
  const {
    cards,
    selectedColumns,
    notification,
    handleColumnChange,
    handleViewClient,
    handleDeleteClient,
    handleCloseNotification,
  } = useClientList();

  return (
    <>
      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity="success"
          sx={{
            minWidth: "300px",
            minHeight: "50px",
            fontSize: "18px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <b>{notification.message}</b>
        </Alert>
      </Snackbar>

      <ColumnSelector
        selectedColumns={selectedColumns}
        onChange={handleColumnChange}
      />

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
              {cards.map((client) => (
                <CardTableRow
                  key={client.id}
                  client={client}
                  selectedColumns={selectedColumns}
                  onView={handleViewClient}
                  onDelete={handleDeleteClient}
                />
              ))}
            </TableBody>
          </Table>
        </Box>
      </TableContainer>
    </>
  );
}

export default ClientList;
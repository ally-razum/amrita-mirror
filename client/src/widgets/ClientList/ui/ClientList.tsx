//только сборка!!!
import { cadrColumn } from "../../../shared/mocks/cardColumn";
import useClientList from "../../../features/client-list/model/useClientList";
import ColumnSelector from "../../../shared/ui/ColumnSelector/ColumnSelector";
import CardTableRow from "../../../features/client-list/ui/CardTableRow";
import "./ClientList.css";

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
      {notification.open && (
        <div className="notification">
          <span>{notification.message}</span>
          <button onClick={handleCloseNotification}>✕</button>
        </div>
      )}

      <ColumnSelector
        selectedColumns={selectedColumns}
        onChange={handleColumnChange}
        columns={cadrColumn}  
      />

      <div className="client-list">
        <div className="client-list__scroll">
          <table className="client-list__table">
            <thead>
              <tr>
                {cadrColumn.map(
                  (column) =>
                    selectedColumns.includes(column.id) && (
                      <th key={column.id} className="client-list__th">
                        {column.label}
                      </th>
                    ),
                )}
                <th className="client-list__th">Действия</th>
              </tr>
            </thead>
            <tbody>
              {cards.map((client) => (
                <CardTableRow
                  key={client.id}
                  client={client}
                  selectedColumns={selectedColumns}
                  onView={handleViewClient}
                  onDelete={handleDeleteClient}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ClientList;
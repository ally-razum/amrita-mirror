//только сборка!!!
import { cadrColumn } from "../../../features/client-list/model/cardColumn";
import useClientList from "../../../features/client-list/model/useClientList";
import ColumnSelector from "../../../features/client-list/ui/ColumnSelector/ColumnSelector";
import "./ClientList.css";
import CardTableRow from "../../../entities/card/ui/CardTableRow/CardTableRow";
import { useGetQuestionsQuery } from "../../../features/get-questions/api/api";

function ClientList() {
  const {
    // cards,
    selectedColumns,
    notification,
    handleColumnChange,
    handleViewClient,
    handleDeleteClient,
    handleCloseNotification,
  } = useClientList();

  const {data} = useGetQuestionsQuery({
    page: 1,
    title: "React",
  });
  console.log(data);
  

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
              {data?.data?.map((client) => (
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

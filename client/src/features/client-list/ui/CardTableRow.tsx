import "./CardTableRow.css";
import { diagnosis } from "../../../shared/mocks/diagnosis";
import { oils } from "../../../shared/mocks/oils";
import type { Card } from "../../../entities/card/model/types";

interface Props {
  client: Card;
  selectedColumns: string[];
  onView: (id: number) => void;
  onDelete: (id: number) => void;
}

function CardTableRow({ client, selectedColumns, onView, onDelete }: Props) {
  return (
    <tr
      className={`card-row ${client.card_IsChecked ? "" : "card-row--unchecked"}`}
    >
      {selectedColumns.includes("cardFullName") && (
        <td>{client.cardFullName}</td>
      )}
      {selectedColumns.includes("cardPhone") && <td>{client.cardPhone}</td>}
      {selectedColumns.includes("cardHealthComplaints") && (
        <td>{client.cardHealthComplaints}</td>
      )}
      {selectedColumns.includes("cardDeliveryAddress") && (
        <td>{client.cardDeliveryAddress}</td>
      )}
      {selectedColumns.includes("cardFinalDiagnosis") && (
        <td>
          {diagnosis.find((d) => d.id === client.cardFinalDiagnosis)?.dName ||
            "-"}
        </td>
      )}
      {selectedColumns.includes("cardOilFromList") && (
        <td>
          {oils.find((o) => o.id === client.cardOilFromList)?.oilName || "-"}
        </td>
      )}
      {selectedColumns.includes("cardRecepi") && <td>{client.cardRecepi}</td>}

      <td className="card-row__actions">
        <button
          className="card-row__btn card-row__btn--view"
          onClick={() => onView(client.id)}
        >
          ✏️ Открыть
        </button>
        <button
          className="card-row__btn card-row__btn--delete"
          onClick={() => onDelete(client.id)}
        >
          ❌ Удалить
        </button>
      </td>
    </tr>
  );
}

export default CardTableRow;
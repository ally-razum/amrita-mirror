//чекбоксы с колонками без MUI
import "./ColumnSelector.css";
import { cadrColumn } from "../../../shared/mocks/cardColumn";

interface Props {
  selectedColumns: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function ColumnSelector({ selectedColumns, onChange }: Props) {
  return (
    <div className="column-selector">
      {cadrColumn.map((column) => (
        <label key={column.id} className="column-selector__item">
          <input
            type="checkbox"
            checked={selectedColumns.includes(column.id)}
            onChange={onChange}
            name={column.id}
          />
          {column.label}
        </label>
      ))}
    </div>
  );
}

export default ColumnSelector;
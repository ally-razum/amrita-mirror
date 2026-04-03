import "./ColumnSelector.css";

interface Column {
  id: string;
  label: string;
}

interface Props {
  columns: Column[];
  selectedColumns: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function ColumnSelector({ columns, selectedColumns, onChange }: Props) {
  return (
    <div className="column-selector">
      {columns.map((column) => (
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

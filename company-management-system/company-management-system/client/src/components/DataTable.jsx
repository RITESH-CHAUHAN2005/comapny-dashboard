// placeholder for client/src/components/DataTable.jsx
const DataTable = ({ data, columns, onEdit, onDelete }) => {
    return (
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col} className="border-b p-2">{col}</th>
            ))}
            <th className="border-b p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="hover:bg-gray-100">
              {columns.map(col => (
                <td key={col} className="p-2 border-b">{row[col]}</td>
              ))}
              <td className="p-2 border-b space-x-2">
                <button onClick={() => onEdit(row)} className="text-blue-500">Edit</button>
                <button onClick={() => onDelete(row.id)} className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default DataTable;
  
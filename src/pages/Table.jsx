import React, { useState } from "react";

function Table() {
  const [tables, setTables] = useState([
    {
      numRows: 5,
      numCols: 1,
      tableData: Array.from({ length: 1 }, () =>
        Array.from({ length: 1 }, () => "")
      ),
    },
  ]);

  const handleNumRowsChange = (event, tableIndex) => {
    const value = Number(event.target.value);
    setTables((prevTables) => {
      const newTables = [...prevTables];
      const table = newTables[tableIndex];
      table.numRows = value;
      table.tableData = table.tableData
        .slice(0, value)
        .map((row) =>
          table.numCols > row.length
            ? [
                ...row,
                ...Array.from({ length: table.numCols - row.length }, () => ""),
              ]
            : row.slice(0, table.numCols)
        );
      if (value > table.tableData.length) {
        table.tableData.push(
          ...Array.from({ length: value - table.tableData.length }, () =>
            Array.from({ length: table.numCols }, () => "")
          )
        );
      }
      return newTables;
    });
  };

  const handleNumColsChange = (event, tableIndex) => {
    const value = Number(event.target.value);
    setTables((prevTables) => {
      const newTables = [...prevTables];
      const table = newTables[tableIndex];
      table.numCols = value;
      table.tableData = table.tableData.map((row) =>
        value > row.length
          ? [...row, ...Array.from({ length: value - row.length }, () => "")]
          : row.slice(0, value)
      );
      return newTables;
    });
  };

  const handleCellValueChange = (event, tableIndex, rowIndex, colIndex) => {
    const value = event.target.value;
    setTables((prevTables) => {
      const newTables = [...prevTables];
      newTables[tableIndex].tableData = newTables[tableIndex].tableData.map(
        (row, i) =>
          i === rowIndex
            ? [...row.slice(0, colIndex), value, ...row.slice(colIndex + 1)]
            : row
      );
      return newTables;
    });
  };

  const handleAddTable = () => {
    setTables((prevTables) => [
      ...prevTables,
      {
        numRows: 1,
        numCols: 1,
        tableData: Array.from({ length: 1 }, () =>
          Array.from({ length: 1 }, () => "")
        ),
      },
    ]);
  };

  const handleRemoveTable = (tableIndex) => {
    setTables((prevTables) =>
      prevTables.filter((table, index) => index !== tableIndex)
    );
  };

  return (
    <div className="mx-10">
       <div className="flex flex-wrap">
        {tables.map((table, tableIndex) => (
          <div key={tableIndex} className="mr-10 min-w-[29%]" >
            <div>
              <label htmlFor={`numRows-${tableIndex}`}>Number of Rows:</label>
              <input
                type="number"
                id={`numRows-${tableIndex}`}
                value={table.numRows}
                onChange={(event) => handleNumRowsChange(event, tableIndex)}
              />
            </div>
            <div>
              <label htmlFor={`numCols-${tableIndex}`}>
                Number of Columns:
              </label>
              <input
                type="number"
                id={`numCols-${tableIndex}`}
                value={table.numCols}
                onChange={(event) => handleNumColsChange(event, tableIndex)}
              />
            </div>
            <table>
              <tbody>
                {table.tableData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, colIndex) => (
                      <td key={colIndex}>
                        <input
                          type="text"
                          className="border border-black"
                          value={cell}
                          onChange={(event) =>
                            handleCellValueChange(
                              event,
                              tableIndex,
                              rowIndex,
                              colIndex
                            )
                          }
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={() => handleRemoveTable(tableIndex)}>
              Remove Table
            </button>
          </div>
        ))}
      </div>
      <button onClick={handleAddTable}>Add Table</button>
      <br />
      <button
      //  onClick={()=>console.log(tables)} 
       className="border border-black">Submit</button>
    </div>
  );
}
export default Table;

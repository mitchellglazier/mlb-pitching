"use client"

import React, { useState } from 'react';

interface SortableTableProps {
    columns: string[];
    data: any[];
    onRowClick?: (rowData: any) => void;
  }

const SortableTable:  React.FC<SortableTableProps> = ({ columns, data, onRowClick }) => {

    const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);
    const [sortColumn, setSortColumn] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handleColumnClick = (column: string) => {
        if (sortColumn === column) {
          setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
          setSortColumn(column);
          setSortOrder('asc');
        }
    };

    const sortedData = data.slice().sort((a, b) => {
        const order = sortOrder === 'asc' ? 1 : -1;
        if (a[sortColumn] < b[sortColumn]) return -1 * order;
        if (a[sortColumn] > b[sortColumn]) return 1 * order;
        return 0;
    });
    
  return (
    <div className="table-container">
        <table>
      <thead>
        <tr>
          {columns.map((column: string, index: number) => (
            <th 
                key={index} 
                onClick={() => handleColumnClick(column)} 
                className={column === sortColumn ? `sortable ${sortOrder}` : 'sortable'}
                >
                    {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row: any, rowIndex: number) => (
          <tr 
            key={rowIndex} 
            className={`${onRowClick ? "clickable" : ""}`}
            onClick={() => {
                 onRowClick && onRowClick(row); 
                 setSelectedRowIndex(rowIndex)
            }}
            >
            {columns.map((column: string, colIndex: number) => (
              <td key={colIndex}>{row[column]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default SortableTable;
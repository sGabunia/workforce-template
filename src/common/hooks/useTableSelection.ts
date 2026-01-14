import { useState } from 'react';

export function useTableSelection<T = any>() {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);

  const handleSelectionChange = (rows: T[]) => {
    setSelectedRows(rows);
  };

  const clearSelection = () => {
    setSelectedRows([]);
  };

  return {
    selectedRows,
    handleSelectionChange,
    clearSelection
  };
}

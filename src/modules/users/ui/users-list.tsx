import { Table } from 'master-components-react-ts';
import { useState } from 'react';
import {
  useFetcher,
  useLocation,
  useNavigate,
  useSearchParams,
  useSubmit
} from 'react-router';

import type { Meta, UserList } from '../types';

function useTableManagement() {
  const fetcher = useFetcher();
  const submit = useSubmit();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = useLocation().search;

  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  const handleDelete = (id: number, intent: 'delete' | 'edit' = 'delete') => {
    fetcher.submit(
      { id, intent },
      {
        method: 'post'
      }
    );
  };

  const handlePaginationChange = ({ page, limit }: { page: number; limit: number }) => {
    submit(
      { page, limit },
      {
        method: 'get'
      }
    );
  };

  const handleEdit = ({ editBasePath, id }: { editBasePath: string; id: number }) => {
    navigate(`${editBasePath}/${id}${searchQuery}`, {
      preventScrollReset: true
    });
  };

  const handleSelectionChange = (rows: any[]) => {
    setSelectedRows(rows);
  };

  return {
    fetcherData: fetcher.data,
    fetcherState: fetcher.state,
    searchParams,
    searchQuery,
    selectedRows,
    handleSelectionChange,
    handleDelete,
    handlePaginationChange,
    handleEdit
  };
}

export function Users({ users, meta }: { users: UserList; meta: Meta }) {
  const { selectedRows, handleSelectionChange, handleDelete, handlePaginationChange, handleEdit } =
    useTableManagement();

  return (
    <div>
      users
      <Table
        currentPage={meta.current_page - 1}
        data={users}
        uniqueKey='id'
        withSelectAll={true}
        columns={[
          {
            key: 'id',
            label: 'ID',
            sortable: true,
            visible: true
          },
          {
            key: 'name',
            label: 'Name',
            sortable: true,
            visible: true
          },
          {
            key: 'year',
            label: 'Year',
            sortable: true
          },
          {
            key: 'price',
            label: 'Price',
            sortable: true
          }
        ]}
        onPageChange={(page) => {
          handlePaginationChange({ page: page + 1, limit: meta.per_page });
        }}
        onRowsPerPageChange={(limit) => {
          handlePaginationChange({ page: 1, limit });
        }}
        onSelectionChange={handleSelectionChange}
        paginationType='numbered'
        rowActions={[
          { text: 'Delete', onClick: (row) => handleDelete(row.id) },
          {
            text: 'Edit',
            onClick(row) {
              handleEdit({ editBasePath: '/users/edit', id: row.id });
            }
          }
        ]}
        rowsPerPage={meta.per_page}
        rowsPerPageOptions={[5, 10, 15]}
        selectedRows={selectedRows}
        showPagination={true}
        totalItems={meta.total_items}
        totalPages={meta.total_pages}
        withActions={true}
        withColumnConfiguration={true}
        withSortIcons={false}
        // actionButtons={[{ text: 'delete', icon: <p>i</p>, onClick: (row) => onDelete(row) }]}
      />
    </div>
  );
}

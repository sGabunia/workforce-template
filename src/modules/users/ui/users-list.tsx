import { Table } from 'master-components-react-ts';
import { useState } from 'react';
import { useSubmit } from 'react-router';

import { useEditTableData } from '~/common/hooks/useEditTableData';
import { useTableSelection } from '~/common/hooks/useTableSelection';

import type { Meta, UserList } from '../types';

import { UserCreate } from './user-create';

function useTablePagination() {
  const submit = useSubmit();

  const handlePaginationChange = ({ page, limit }: { page: number; limit: number }) => {
    submit(
      { page, limit },
      {
        method: 'get'
      }
    );
  };

  return {
    handlePaginationChange
  };
}

export function Users({ users, meta }: { users: UserList; meta: Meta }) {
  const [limit, setLimit] = useState(5);
  const { handlePaginationChange } = useTablePagination();
  const { handleEdit } = useEditTableData({ editBasePath: '/users/edit' });
  const { handleEdit: deleteRecord } = useEditTableData({ editBasePath: '/users/delete' });
  const { selectedRows, handleSelectionChange } = useTableSelection();

  return (
    <div>
      users
      <UserCreate />
      <Table
        currentPage={meta.current - 1}
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
            key: 'user',
            label: 'User',
            sortable: true
          },
          {
            key: 'role',
            label: 'Role',
            sortable: true
          },
          {
            key: 'group',
            label: 'User group',
            sortable: true
          },
          {
            key: 'shift',
            label: 'Shift bag',
            sortable: true
          },
          {
            key: 'status',
            label: 'Status',
            sortable: true
          }
        ]}
        onPageChange={(page) => {
          handlePaginationChange({ page: page + 1, limit });
        }}
        onRowsPerPageChange={(limit) => {
          setLimit(limit);
          handlePaginationChange({ page: 1, limit });
        }}
        onSelectionChange={handleSelectionChange}
        paginationType='numbered'
        rowActions={[
          { text: 'Delete', onClick: (row) => deleteRecord(row.id) },
          {
            text: 'Edit',
            onClick(row) {
              handleEdit(row.id);
            }
          }
        ]}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 15]}
        selectedRows={selectedRows}
        showPagination={true}
        totalItems={meta.count}
        totalPages={meta.pages}
        withActions={true}
        withColumnConfiguration={true}
        withSortIcons={false}
        // actionButtons={[{ text: 'delete', icon: <p>i</p>, onClick: (row) => onDelete(row) }]}
      />
    </div>
  );
}

import { Table } from 'master-components-react-ts';
import { useSubmit } from 'react-router';

import { useEditTableData } from '~/common/hooks/useEditTableData';
import { useTableSelection } from '~/common/hooks/useTableSelection';

import type { Meta, UserList } from '../types';

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
  const { handlePaginationChange } = useTablePagination();
  const { handleEdit } = useEditTableData({ editBasePath: '/users/edit' });
  const { handleEdit: deleteRecord } = useEditTableData({ editBasePath: '/users/delete' });
  const { selectedRows, handleSelectionChange } = useTableSelection();

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
          { text: 'Delete', onClick: (row) => deleteRecord(row.id) },
          {
            text: 'Edit',
            onClick(row) {
              handleEdit(row.id);
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

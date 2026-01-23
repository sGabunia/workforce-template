import { TextInput } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { Table } from 'master-components-react-ts';
import { useEffect } from 'react';
import { Form, useSearchParams, useSubmit } from 'react-router';

import { useEditTableData } from '~/common/hooks/useEditTableData';
import { useTableSelection } from '~/common/hooks/useTableSelection';
import { Link } from '~/common/ui/Link';

import type { Meta, UserList } from '../types';

function useTablePagination() {
  const submit = useSubmit();
  const [searchParams] = useSearchParams();
  const [limit, setLimit] = useLocalStorage({
    key: 'pagesLimit',
    defaultValue: 10
  });
  const q = searchParams.get('q') || '';

  useEffect(() => {
    const searchInput = document.getElementById('search');
    if (searchInput instanceof HTMLInputElement) {
      searchInput.value = q || '';
    }
  }, [q]);

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    submit(event.currentTarget, {
      method: 'get'
    });
  };

  const handlePaginationChange = ({ page, limit }: { page: number; limit: number }) => {
    submit(
      { page, limit },
      {
        method: 'get'
      }
    );
  };

  return {
    handlePaginationChange,
    handleSearch,
    handleLimitChange,
    limit,
    q
  };
}

export function Users({ users, meta }: { users: UserList; meta: Meta }) {
  const filters = useTablePagination();
  const tableSelection = useTableSelection();
  const { handleEdit } = useEditTableData({ editBasePath: '/users/edit' });
  const { handleEdit: deleteRecord } = useEditTableData({ editBasePath: '/users/delete' });

  return (
    <div>
      users
      <Link to='/users/new'>Create New User</Link>
      <Form onChange={filters.handleSearch}>
        <TextInput defaultValue={filters.q} id='search' name='q' placeholder='Search users' />
      </Form>
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
          filters.handlePaginationChange({ page: page + 1, limit: filters.limit });
        }}
        onRowsPerPageChange={(limit) => {
          filters.handleLimitChange(limit);
          filters.handlePaginationChange({ page: 1, limit });
        }}
        onSelectionChange={tableSelection.handleSelectionChange}
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
        rowsPerPage={filters.limit}
        rowsPerPageOptions={[5, 10, 15]}
        selectedRows={tableSelection.selectedRows}
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

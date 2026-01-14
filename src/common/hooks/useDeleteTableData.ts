import { useFetcher } from 'react-router';

export function useDeleteTableData() {
  const fetcher = useFetcher();

  const handleDelete = (id: number | string) => {
    fetcher.submit(
      { id, intent: 'delete' },
      {
        method: 'post'
      }
    );
  };

  return {
    handleDelete,
    deleteState: fetcher.state,
    deleteData: fetcher.data
  };
}

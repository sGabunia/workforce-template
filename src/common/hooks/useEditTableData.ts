import { useNavigateWithState } from './useNavigateWithState';

interface EditTableDataOptions {
  editBasePath: string;
  preventScrollReset?: boolean;
}

export function useEditTableData({
  editBasePath,
  preventScrollReset = true
}: EditTableDataOptions) {
  const navigate = useNavigateWithState();

  const handleEdit = (id: number | string) => {
    navigate(`${editBasePath}/${id}`, {
      preventScrollReset
    });
  };

  return {
    handleEdit
  };
}

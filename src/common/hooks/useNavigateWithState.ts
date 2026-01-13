import type { NavigateOptions } from 'react-router';

import { useLocation, useNavigate } from 'react-router';

interface NavigateWithParamsOptions extends NavigateOptions {
  preserveHash?: boolean;
  preserveParams?: boolean;
}

export function useNavigateWithState() {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateWithParams = (to: string, options?: NavigateWithParamsOptions) => {
    const { preserveParams = true, preserveHash = true, ...navigateOptions } = options || {};

    let targetPath = to;

    if (preserveParams) {
      targetPath += location.search;
    }

    if (preserveHash) {
      targetPath += location.hash;
    }

    navigate(targetPath, navigateOptions);
  };

  return navigateWithParams;
}

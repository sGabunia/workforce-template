import type { NavigateOptions } from 'react-router';

import { useLocation, useNavigate } from 'react-router';

interface NavigateWithParamsOptions extends NavigateOptions {
  preserveParams?: boolean;
}

export function useNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateWithParams = (to: string, options?: NavigateWithParamsOptions) => {
    const { preserveParams = true, ...navigateOptions } = options || {};

    const targetPath = preserveParams ? `${to}${location.search}` : to;

    navigate(targetPath, navigateOptions);
  };

  return navigateWithParams;
}

import type { LinkProps } from 'react-router';

import { Link as RouterLink, useLocation } from 'react-router';

interface LinkWithStateProps extends Omit<LinkProps, 'to'> {
  preserveHash?: boolean;
  preserveParams?: boolean;
  to: string;
}

export function Link({
  to,
  preserveParams = true,
  preserveHash = true,
  ...props
}: LinkWithStateProps) {
  const location = useLocation();

  let targetPath = to;

  if (preserveParams) {
    targetPath += location.search;
  }

  if (preserveHash) {
    targetPath += location.hash;
  }

  return <RouterLink to={targetPath} {...props} />;
}

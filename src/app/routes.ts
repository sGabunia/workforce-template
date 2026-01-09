import type { RouteConfig } from '@react-router/dev/routes';

import { index, route } from '@react-router/dev/routes';

export default [
  index('../pages/home/index.tsx'),
  route('about', '../pages/about/index.tsx'),
  route('activities', '../pages/activities/index.tsx'),
  route('users', '../pages/users/index.tsx', [route(':id', '../pages/users/[id]/index.tsx')])
] satisfies RouteConfig;

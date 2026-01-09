import type { RouteConfig } from '@react-router/dev/routes';

import { index, route } from '@react-router/dev/routes';

export default [
  index('pages/home/home.tsx', { id: 'home' }),
  route('about', 'pages/about/about.tsx'),
  route('activities', 'pages/activities/activities.tsx'),
  route('users', 'pages/users/users.tsx', [route(':id', 'pages/users/[user-id]/user-id.tsx')])
] satisfies RouteConfig;

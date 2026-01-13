import type { Route } from '.react-router/types/src/app/pages/users/+types/users';

import { api } from '~/common/api/api-instance';

import type { Meta, UserList } from '../types';

const getUsers = async ({ page, limit }: { page: string; limit: string }) => {
  return await api
    .get<{
    items: UserList;
    meta: Meta;
  }>('users', {
      query: { page, limit }
    })
    .then((response) => response.data);
};

export async function usersLoader({ request }: Route.ClientLoaderArgs) {
  const url = new URL(request.url);
  const page = url.searchParams.get('page') ?? '1';
  const limit = url.searchParams.get('limit') ?? '10';

  const result = await getUsers({ page, limit });
  return {
    users: result.items,
    meta: result.meta
  };
}

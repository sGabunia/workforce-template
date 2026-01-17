import type { Route } from '.react-router/types/src/app/pages/users/+types/users';

import { api } from '~/common/api/api-instance';
import { getCachedQuery } from '~/common/api/cache-client';

import type { Meta, UserList } from '../types';

const getUsers = async ({ page, limit }: { page: string; limit: string }) => {
  return await api
    .get<{
      results: UserList;
      _link: Meta;
    }>('users', {
      query: { _page: page, _limit: limit, _sort: 'id', _order: 'desc' }
    })
    .then((response) => response.data);
};

export const getUsersQueryKey = (page: string, limit: string) => ['users', page, limit];

export async function usersLoader({ request }: Route.ClientLoaderArgs) {
  const url = new URL(request.url);
  const page = url.searchParams.get('page') ?? '1';
  const limit = url.searchParams.get('limit') ?? '10';

  const result = await getCachedQuery({
    queryKey: getUsersQueryKey(page, limit),
    queryFn: () => getUsers({ page, limit })
  });

  return {
    users: result.results,
    meta: result._link
  };
}

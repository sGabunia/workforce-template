import type { Route } from '.react-router/types/src/app/pages/users/+types/users';

import { api } from '~/common/api/api-instance';
import { getCachedQuery } from '~/common/api/cache-client';
import { wait } from '~/common/utils/wait';

import type { Meta, UserList } from '../types';

const getUsers = async ({ page, limit, q }: { page: string; limit: string; q?: string }) => {
  return await api
    .get<{
      results: UserList;
      _link: Meta;
    }>('users', {
      query: { _page: page, _limit: limit, _sort: 'id', _order: 'desc', _q: q }
    })
    .then((response) => response.data);
};

export const getUsersQueryKey = (page: string, limit: string, q?: string) => [
  'users',
  page,
  limit,
  q
];

export async function usersLoader({ request }: Route.ClientLoaderArgs) {
  const url = new URL(request.url);
  const page = url.searchParams.get('page') ?? '1';
  const limit = url.searchParams.get('limit') ?? '10';
  const q = url.searchParams.get('q') ?? undefined;

  if (q) {
    await wait(300, request.signal);
  }

  const result = await getCachedQuery({
    queryKey: getUsersQueryKey(page, limit, q),
    queryFn: () => getUsers({ page, limit, q })
  });

  return {
    users: result.results,
    meta: result._link,
    q
  };
}

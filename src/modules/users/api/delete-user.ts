import type { Route } from '#types/users/delete/[id]/+types/user-delete';

import { replace } from 'react-router';

import { api } from '~/common/api/api-instance';
import { getCachedQuery, invalidateCache } from '~/common/api/cache-client';
import { getRedirectUrlAfterDeletion } from '~/common/utils/redirect';

import { getUsersQueryKey } from './get-users';

const deleteUser = async (id: string) => {
  try {
    const data = await api.delete(`users/${id}`).then((response) => response.data);
    return data;
  } catch (error) {
    console.warn(error);
  }
};

export async function userDeleteAction({ params, request }: Route.ClientActionArgs) {
  // Get current page data before deletion
  const url = new URL(request.url);
  const page = url.searchParams.get('page') ?? '1';
  const limit = url.searchParams.get('limit') ?? '10';
  const q = url.searchParams.get('q') ?? undefined;

  // Fetch current table metadata
  const currentData = await getCachedQuery({
    queryKey: getUsersQueryKey(page, limit),
    queryFn: async () => {
      return await api
        .get<{
          results: any[];
          _link: { count: number };
        }>('users', {
          query: { _page: page, _limit: limit }
        })
        .then((response) => response.data);
    }
  });

  await deleteUser(params.id);

  const redirectUrl = getRedirectUrlAfterDeletion(request, '/users', {
    totalCount: currentData._link.count,
    itemsPerPage: Number.parseInt(limit, 10)
  });

  invalidateCache(['users']);

  if (q) {
    throw replace('/users');
  }

  throw replace(redirectUrl);
}

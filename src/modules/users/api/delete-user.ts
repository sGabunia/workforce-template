import type { Route } from '#types/users/delete/[id]/+types/user-delete';

import { redirect } from 'react-router';

import { api } from '~/common/api/api-instance';
import { invalidateCache } from '~/common/api/cache-client';
import { getRedirectUrlWithParams } from '~/common/utils/redirect';

const deleteUser = async (id: string) => {
  try {
    const data = await api.delete(`users/${id}`).then((response) => response.data);
    return data;
  } catch (error) {
    console.warn(error);
  }
};

export async function userDeleteAction({ params, request }: Route.ClientActionArgs) {
  await deleteUser(params.id);

  const redirectUrl = getRedirectUrlWithParams(request, '/users');

  invalidateCache(['users']);

  throw redirect(redirectUrl);
}

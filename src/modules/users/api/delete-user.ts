import type { Route } from '.react-router/types/src/app/pages/users/+types/users';

import { api } from '~/common/api/api-instance';
import { invalidateCache } from '~/common/api/cache-client';

const deleteUser = async (id: string) => {
  return await api.delete(`users/${id}`).then((response) => response.data);
};

export async function userDeleteAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const id = formData.get('id');
  const users = await deleteUser(id as string);

  invalidateCache(['users']);

  return {
    users
  };
}

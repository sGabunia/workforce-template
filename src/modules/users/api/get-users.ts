import { api } from '~/common/api/api-instance';

import type { UserList } from '../types';

const getUsers = async () => {
  return await api.get<UserList>('users').then((response) => response.data);
};

export async function usersLoader() {
  const users = await getUsers();
  return {
    users
  };
}

import type { Route } from '.react-router/types/src/app/pages/users/+types/users';

import { redirect } from 'react-router';

import { api } from '~/common/api/api-instance';
import { invalidateCache } from '~/common/api/cache-client';

interface CreateUserDto {
  group: string;
  name: string;
  role: string;
  shift: string;
  status: string;
  user: string;
}

const createUser = async (userData: CreateUserDto) => {
  try {
    const data = await api.post('users', userData).then((response) => response.data);
    return data;
  } catch (error) {
    console.warn(error);
  }
};

export async function userCreateAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();

  const userData: CreateUserDto = {
    name: formData.get('name') as string,
    user: formData.get('user') as string,
    role: formData.get('role') as string,
    group: formData.get('group') as string,
    shift: formData.get('shift') as string,
    status: formData.get('status') as string
  };

  await createUser(userData);

  invalidateCache(['users']);

  throw redirect('/users');
}

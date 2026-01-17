import type { Route } from '.react-router/types/src/app/pages/users/+types/users';

import { redirect } from 'react-router';

import { api } from '~/common/api/api-instance';
import { invalidateCache } from '~/common/api/cache-client';
import { getRedirectUrlWithParams } from '~/common/utils/redirect';

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

  await createUser(Object.fromEntries(formData) as unknown as CreateUserDto);

  const redirectUrl = getRedirectUrlWithParams(request, '/users');

  invalidateCache(['users']);

  throw redirect(redirectUrl);
}

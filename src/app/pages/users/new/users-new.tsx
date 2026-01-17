import { UserCreate } from '~/modules/users';

export { userCreateAction as clientAction } from '~/modules/users';

export default function UsersNew() {
  return <UserCreate />;
}

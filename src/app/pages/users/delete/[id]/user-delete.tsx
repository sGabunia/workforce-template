import type { Route } from '#types/users/delete/[id]/+types/user-delete';

import { Center } from '@mantine/core';
import { isRouteErrorResponse, Link } from 'react-router';

import { UserDelete } from '~/modules/users';

export { userDeleteAction as clientAction } from '~/modules/users';
export default function UserDeletePage() {
  return <UserDelete />;
}
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error)) {
    return <Center>Error</Center>;
  } else if (error instanceof Error) {
    return (
      <div>
        <p>The stack trace is: can not delete users</p>
        <Link to='/'>Go back to home</Link>
        <Link to='/users'>Go back to users</Link>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}

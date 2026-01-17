import { isRouteErrorResponse, Link, Outlet } from 'react-router';

import { Users as UsersList } from '~/modules/users';

import type { Route } from './+types/users';

export { usersLoader as clientLoader } from '~/modules/users';

export default function Users({ loaderData }: Route.ComponentProps) {
  const { users, meta } = loaderData;

  return (
    <div>
      <Link to='/'>home</Link>
      <UsersList meta={meta} users={users} />
      <Outlet />
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error)) {
    return (
      <>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <p>The stack trace is: can not fetch users</p>
        <Link to='/'>Go back to home</Link>
        <Link to='/users'>Go back to users</Link>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}

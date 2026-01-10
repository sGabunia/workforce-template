import { Link, useFetcher } from 'react-router';

import type { UserList } from '../types';

export function Users({ users }: { users: UserList }) {
  const fetcher = useFetcher();
  const onDelete = (id: number) => {
    fetcher.submit(
      { id },
      {
        method: 'POST'
      }
    );
  };
  return (
    <>
      users
      {users.map((user) => (
        <div key={user.id}>
          {user.name}
          <Link to={`/users/${user.id}`}>View</Link>
          <button type='button' onClick={() => onDelete(user.id)}>
            Delete
          </button>
        </div>
      ))}
    </>
  );
}
